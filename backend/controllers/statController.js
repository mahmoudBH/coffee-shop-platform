const { dbPromise } = require("../config/db");

// Récupérer les statistiques globales (Admin)
const getStatistics = async (req, res) => {
  const filter = req.query.filter || 'jour';
  const now = new Date();

  const getRange = () => {
    const start = new Date();
    let end = new Date();

    switch (filter) {
      case 'semaine':
        start.setDate(start.getDate() - start.getDay());
        end = new Date(start);
        end.setDate(end.getDate() + 6);
        break;
      case 'mois':
        start.setDate(1);
        end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        break;
      case 'annee':
        start.setMonth(0, 1);
        end = new Date(start.getFullYear(), 11, 31);
        break;
      default:
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
    }
    return [start, end];
  };

  const [start, end] = getRange();

  try {
    const [[{ totalOrders }]] = await dbPromise.query(`SELECT COUNT(*) as totalOrders FROM orders WHERE DATE(created_at) BETWEEN ? AND ?`, [start, end]);
    const [[{ totalRevenue }]] = await dbPromise.query(`SELECT SUM(total_price) as totalRevenue FROM orders WHERE DATE(created_at) BETWEEN ? AND ?`, [start, end]);
    const [[{ totalUsers }]] = await dbPromise.query(`SELECT COUNT(*) as totalUsers FROM users`);
    const [[{ totalReservations }]] = await dbPromise.query(`SELECT COUNT(*) as totalReservations FROM reservations`);
    const [[{ openEvents }]] = await dbPromise.query(`SELECT COUNT(*) as openEvents FROM events WHERE statut = 'ouvert'`);
    const [[{ stockItems }]] = await dbPromise.query(`SELECT COUNT(*) as stockItems FROM stock`);
    const [[{ lowStock }]] = await dbPromise.query(`SELECT COUNT(*) as lowStock FROM stock WHERE remaining_quantity < 30`);
    const [[{ capacity }]] = await dbPromise.query(`SELECT capacity FROM capacity ORDER BY id DESC LIMIT 1`);

    res.json({
      orders: totalOrders,
      users: totalUsers,
      reservations: totalReservations,
      openEvents,
      stock: stockItems,
      lowStock,
      totalCapacity: capacity,
      revenue: totalRevenue || 0
    });
  } catch (err) {
    console.error("Erreur stats:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getStatistics
};
