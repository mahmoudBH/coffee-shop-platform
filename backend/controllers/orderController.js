const { dbPromise } = require("../config/db");

// Récupérer toutes les commandes (Admin)
const getAllOrders = async (req, res) => {
  try {
    const [results] = await dbPromise.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(results);
  } catch (error) {
    console.error("Erreur de récupération des commandes:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une commande et mettre à jour le stock (Client)
const createOrder = async (req, res) => {
  const { tableNumber, items, totalPrice } = req.body;

  if (tableNumber === undefined || !items || items.length === 0 || !totalPrice) {
    return res.status(400).json({ message: "Données de la commande incomplètes" });
  }

  try {
    // 1. Démarrer la transaction
    await dbPromise.beginTransaction();

    // 2. Insérer la commande dans la table `orders`
    const orderSql = "INSERT INTO orders (table_number, items, total_price) VALUES (?, ?, ?)";
    await dbPromise.query(orderSql, [tableNumber, JSON.stringify(items), totalPrice]);

    // 3. Parcourir chaque article commandé pour mettre à jour le stock
    for (const item of items) {
      const [menuResult] = await dbPromise.query("SELECT ingredients FROM menu WHERE id = ?", [item.id]);

      if (menuResult.length > 0 && menuResult[0].ingredients) {
        let ingredients = [];
        try {
          ingredients = JSON.parse(menuResult[0].ingredients);
        } catch (e) {
          console.warn(`Erreur de parsing des ingrédients pour l'article ID ${item.id}`);
          continue; // Passer à l'article suivant en cas d'erreur de parsing
        }

        // Mettre à jour le stock pour chaque ingrédient
        for (const ingredient of ingredients) {
          const updateSql = `
            UPDATE stock 
            SET Quantity_used = Quantity_used + ?
            WHERE name = ?`;
          await dbPromise.query(updateSql, [ingredient.quantity, ingredient.name]);
        }
      }
    }

    // 4. Valider la transaction si tout s'est bien passé
    await dbPromise.commit();
    res.status(201).json({ message: "Commande enregistrée et stock mis à jour !" });

  } catch (error) {
    // En cas d'erreur, on annule toutes les opérations (Rollback)
    console.error("Erreur lors de la création de la commande :", error);
    await dbPromise.rollback();
    res.status(500).json({ message: "Erreur serveur. La commande a été annulée." });
  }
};

// Payer une commande (Admin)
const payOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const [result] = await dbPromise.query(
      'UPDATE orders SET payment_status = "paid" WHERE id = ?',
      [orderId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Commande marquée comme payée" });
    } else {
      res.status(404).json({ message: "Commande introuvable" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de paiement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  payOrder
};
