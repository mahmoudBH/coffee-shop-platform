const { dbPromise } = require("../config/db");

// Récupérer tout le stock
const getAllStock = async (req, res) => {
  try {
    const [results] = await dbPromise.query("SELECT * FROM stock");
    res.json(results);
  } catch (error) {
    console.error("Erreur lors de la récupération du stock:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter un produit au stock
const addStockItem = async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
    return res.status(400).json({ message: "Nom et quantité sont requis" });
  }

  try {
    await dbPromise.query("INSERT INTO stock (name, quantity) VALUES (?, ?)", [name, quantity]);
    res.status(201).json({ message: "Produit ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout au stock:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour la quantité d'un ingrédient
const updateStockQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: "La quantité est requise" });
  }

  try {
    const [result] = await dbPromise.query("UPDATE stock SET quantity = ? WHERE id = ?", [quantity, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ingrédient introuvable" });
    }
    res.json({ message: "Quantité mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du stock:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer un produit du stock
const deleteStockItem = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await dbPromise.query("DELETE FROM stock WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ingrédient introuvable" });
    }
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du stock:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllStock,
  addStockItem,
  updateStockQuantity,
  deleteStockItem
};
