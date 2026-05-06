const { dbPromise } = require("../config/db");

// Créer un pack (Admin)
const createPack = async (req, res) => {
  const { name, description, price, points, menu_items } = req.body;
  
  try {
    JSON.parse(menu_items); // Vérification du JSON
  } catch (error) {
    return res.status(400).json({ error: 'Le champ menu_items doit être un JSON valide.' });
  }
  
  const query = `INSERT INTO pack (name, description, price, points, menu_items) VALUES (?, ?, ?, ?, ?)`;

  try {
    const [result] = await dbPromise.query(query, [name, description, price, points, menu_items]);
    res.status(201).json({ message: 'Pack créé avec succès', id: result.insertId });
  } catch (error) {
    console.error("Erreur création pack:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer tous les packs
const getAllPacks = async (req, res) => {
  try {
    const [packs] = await dbPromise.query('SELECT * FROM pack');

    const results = await Promise.all(packs.map(async (pack) => {
      let menuIds;
      try {
        menuIds = JSON.parse(pack.menu_items);
      } catch (e) {
        menuIds = [];
      }

      if (!Array.isArray(menuIds) || menuIds.length === 0) {
        return { ...pack, menus: [] };
      }

      const placeholders = menuIds.map(() => '?').join(',');
      const [menus] = await dbPromise.query(`SELECT * FROM menu WHERE id IN (${placeholders})`, menuIds);

      return { ...pack, menus };
    }));

    res.json(results);
  } catch (error) {
    console.error("Erreur récupération packs:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer un pack (Admin)
const deletePack = async (req, res) => {
  const packId = req.params.id;

  try {
    const [result] = await dbPromise.query('DELETE FROM pack WHERE id = ?', [packId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pack non trouvé' });
    }
    res.json({ message: 'Pack supprimé avec succès' });
  } catch (error) {
    console.error("Erreur suppression pack:", error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  createPack,
  getAllPacks,
  deletePack
};
