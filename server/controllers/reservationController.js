const { dbPromise } = require("../config/db");

// Créer une réservation (Client)
const createReservation = async (req, res) => {
  const { name, email, mobile, table_type, children, date_time, special_request } = req.body;

  if (!name || !email || !mobile || !table_type || !date_time) {
    return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
  }

  const query = `
    INSERT INTO reservations (name, email, mobile, table_type, children, date_time, special_request)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  try {
    const [result] = await dbPromise.query(query, [name, email, mobile, table_type, children, date_time, special_request]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Réservation réussie' });
    } else {
      res.status(500).json({ message: 'Erreur lors de la réservation' });
    }
  } catch (error) {
    console.error("Erreur de réservation:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la réservation' });
  }
};

// Récupérer toutes les réservations (Admin)
const getAllReservations = async (req, res) => {
  try {
    const [results] = await dbPromise.query(`
      SELECT 
        r.*,
        e.title as event_title,
        CASE
          WHEN r.custom_event IS NOT NULL THEN 'special'
          WHEN r.event_id IS NOT NULL THEN 'event'
          ELSE 'other'
        END as reservation_type
      FROM reservations r
      LEFT JOIN events e ON r.event_id = e.id
      ORDER BY r.created_at DESC
    `);
    res.json(results);
  } catch (error) {
    console.error("Erreur récupération réservations:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour le statut d'une réservation (Admin)
const updateReservationStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await dbPromise.query('UPDATE reservations SET status = ? WHERE id = ?', [status, id]);
    
    // Vérifier la capacité totale pour fermer un événement si besoin
    const [capacityRows] = await dbPromise.query('SELECT capacity FROM capacity ORDER BY id DESC LIMIT 1');
    const totalCapacity = capacityRows.length > 0 ? capacityRows[0].capacity : 150;
    
    const [eventReservations] = await dbPromise.query(`
       SELECT event_id, SUM(table_type) as total 
       FROM reservations 
       WHERE status = 'accepter' AND event_id IS NOT NULL 
       GROUP BY event_id
    `);

    for (const event of eventReservations) {
      // Conversion de la somme (qui peut être une chaîne selon les données) en nombre
      if (parseInt(event.total) >= totalCapacity) {
        await dbPromise.query('UPDATE events SET statut = "fermé" WHERE id = ?', [event.event_id]);
      }
    }

    res.json({ success: true, message: "Statut mis à jour" });
  } catch (error) {
    console.error("Erreur mise à jour réservation:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  updateReservationStatus
};
