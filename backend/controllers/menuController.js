const { dbPromise } = require("../config/db");

// Récupérer tout le menu (avec filtre de catégorie optionnel)
const getAllMenuItems = async (req, res) => {
  const { category } = req.query;
  let query = "SELECT * FROM menu";
  const params = [];

  if (category && category !== "All") {
    query += " WHERE category = ?";
    params.push(category);
  }

  try {
    const [results] = await dbPromise.query(query, params);
    
    // Formatage des chemins d'image (si nécessaire pour le frontend client)
    const formattedResults = results.map(item => {
      if (item.img && item.img.includes('/')) {
        const imageFileName = item.img.split('/').pop();
        return { ...item, img: `/menu/${imageFileName}` };
      }
      return item;
    });

    res.json(formattedResults);
  } catch (error) {
    console.error("Erreur lors de la récupération du menu:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter un nouvel élément au menu (Admin)
const addMenuItem = async (req, res) => {
  const { price, title, desc, img, category, ingredients } = req.body;
  
  // Validation basique
  if (!price || !title || !category) {
    return res.status(400).json({ message: "Les champs Prix, Titre et Catégorie sont requis." });
  }

  const query = `INSERT INTO menu (price, title, \`desc\`, img, category, ingredients) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [price, title, desc, img, category, ingredients];

  try {
    const [result] = await dbPromise.query(query, values);
    res.status(201).json({ message: "Élément du menu ajouté avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'ajout au menu:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour un élément du menu (Admin)
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { price, title, desc, img, category, ingredients } = req.body;

  const query = `UPDATE menu SET price = ?, title = ?, \`desc\` = ?, img = ?, category = ?, ingredients = ? WHERE id = ?`;
  const values = [price, title, desc, img, category, ingredients, id];

  try {
    const [result] = await dbPromise.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Élément introuvable" });
    }
    res.json({ message: "Élément du menu mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du menu:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer un élément du menu (Admin)
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await dbPromise.query("DELETE FROM menu WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Élément introuvable" });
    }
    res.json({ message: "Élément du menu supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du menu:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
};
