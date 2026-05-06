const { dbPromise } = require("../config/db");

// --- Événements ---
const addEvent = async (req, res) => {
  const { title, date, description } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const [result] = await dbPromise.query(
      'INSERT INTO events (title, date, description, photo) VALUES (?, ?, ?, ?)',
      [title, date, description, photo]
    );
    res.status(201).json({ id: result.insertId, title, date, description, photo });
  } catch (error) {
    console.error("Erreur ajout événement:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const [results] = await dbPromise.query('SELECT * FROM events');
    res.status(200).json(results);
  } catch (error) {
    console.error("Erreur récupération événements:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- Tables ---
const getAllTables = async (req, res) => {
  try {
    const [results] = await dbPromise.query('SELECT * FROM tables');
    res.status(200).json(results);
  } catch (error) {
    console.error("Erreur récupération tables:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateTableStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await dbPromise.query('UPDATE tables SET status = ? WHERE id = ?', [status, id]);
    res.status(200).json({ message: 'Statut mis à jour avec succès' });
  } catch (error) {
    console.error("Erreur mise à jour table:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- Capacité ---
const getCapacity = async (req, res) => {
  try {
    const [results] = await dbPromise.query('SELECT capacity FROM capacity ORDER BY id DESC LIMIT 1');
    res.json(results[0] || { capacity: 150 });
  } catch (error) {
    console.error("Erreur récupération capacité:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  getAllTables,
  updateTableStatus,
  getCapacity
};
