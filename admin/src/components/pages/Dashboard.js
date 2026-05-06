import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";
import { 
  FaShoppingCart, FaUsers, FaCalendarCheck, FaCalendarAlt, 
  FaBox, FaExclamationTriangle, FaChair, FaMoneyBillWave,
  FaArrowUp, FaArrowDown, FaClock, FaCheckCircle, FaSpinner
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("jour");
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await axios.get(`http://localhost:4000/api/statistics?filter=${filter}`);
      setStats(statsRes.data);

      // Fetch recent orders
      const ordersRes = await axios.get(`http://localhost:4000/api/orders`);
      const sortedOrders = ordersRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setRecentOrders(sortedOrders.slice(0, 5));

      // Fetch recent reservations
      const resRes = await axios.get(`http://localhost:4000/api/reservations`);
      const sortedRes = resRes.data.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date));
      setRecentReservations(sortedRes.slice(0, 5));
    } catch (error) {
      console.error("Erreur lors de la récupération des données du dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ["jour", "semaine", "mois", "annee"];
  const styles = getStyles(isDarkMode);

  const cardsData = [
    { title: `Revenus (${filter})`, value: `${stats.revenue || 0} DA`, icon: <FaMoneyBillWave size={24} color="#10b981" />, bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", trend: "+12%" },
    { title: `Commandes (${filter})`, value: stats.orders || 0, icon: <FaShoppingCart size={24} color="#8b5cf6" />, bg: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", trend: "+5%" },
    { title: "Réservations", value: stats.reservations || 0, icon: <FaCalendarCheck size={24} color="#3b82f6" />, bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", trend: "+2%" },
    { title: "Stock Faible", value: stats.lowStock || 0, icon: <FaExclamationTriangle size={24} color="#ef4444" />, bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", trend: "-1%" },
  ];

  // Simulation de données pour les graphiques basées sur les revenus actuels
  const baseRevenue = stats.revenue ? stats.revenue / 7 : 15000;
  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        type: 'line',
        label: 'Revenus (DA)',
        data: [baseRevenue*0.8, baseRevenue*1.2, baseRevenue*0.9, baseRevenue*1.5, baseRevenue*2.1, baseRevenue*2.5, baseRevenue*1.8].map(Math.round),
        borderColor: isDarkMode ? '#facc15' : '#6d28d9',
        backgroundColor: isDarkMode ? 'rgba(250, 204, 21, 0.1)' : 'rgba(109, 40, 217, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Commandes',
        data: [12, 19, 15, 25, 32, 45, 30],
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.5)',
        borderRadius: 4,
        yAxisID: 'y1',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: isDarkMode ? '#d1d5db' : '#4b5563', font: { family: 'Inter', size: 12 } }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
        ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' }
      },
      x: {
        grid: { display: false },
        ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' }
      }
    }
  };

  if (loading && !stats.revenue) {
    return (
      <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <FaSpinner className="spin" size={40} color={isDarkMode ? '#facc15' : '#6d28d9'} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.header}>Tableau de Bord Global</h1>
          <p style={styles.subtitle}>Supervisez les performances de votre café en temps réel.</p>
        </div>
        
        <div style={styles.filterContainer}>
          {filters.map((f) => (
            <button
              key={f}
              style={{
                ...styles.filterButton,
                ...(filter === f ? styles.activeFilter : {}),
              }}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        {cardsData.map((card, idx) => (
          <div key={idx} style={styles.kpiCard}>
            <div style={styles.kpiTop}>
              <div style={{ ...styles.iconWrapper, backgroundColor: card.bg }}>
                {card.icon}
              </div>
              <span style={{...styles.trend, color: card.trend.startsWith('+') ? '#10b981' : '#ef4444'}}>
                {card.trend.startsWith('+') ? <FaArrowUp size={10}/> : <FaArrowDown size={10}/>} {card.trend}
              </span>
            </div>
            <div style={styles.kpiContent}>
              <p style={styles.kpiValue}>{card.value}</p>
              <p style={styles.kpiTitle}>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div style={styles.chartSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Évolution des Revenus & Commandes</h2>
        </div>
        <div style={styles.chartContainer}>
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      {/* Two Columns: Recent Orders & Reservations */}
      <div style={styles.twoColumnGrid}>
        {/* Recent Orders */}
        <div style={styles.listCard}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Commandes Récentes</h2>
            <button style={styles.viewAllBtn}>Voir tout</button>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Client</th>
                  <th style={styles.th}>Montant</th>
                  <th style={styles.th}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? recentOrders.map(order => (
                  <tr key={order.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={{fontWeight: '600'}}>{order.name || 'Client Anonyme'}</div>
                      <div style={{fontSize: '0.8rem', color: isDarkMode ? '#9ca3af' : '#6b7280'}}>{new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>
                    <td style={{...styles.td, fontWeight: '700'}}>{order.total_price} DA</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        backgroundColor: order.status === 'Payé' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: order.status === 'Payé' ? '#10b981' : '#f59e0b'
                      }}>
                        {order.status === 'Payé' ? <FaCheckCircle/> : <FaClock/>} {order.status}
                      </span>
                    </td>
                  </tr>
                )) : <tr><td colSpan="3" style={{textAlign: 'center', padding: '20px'}}>Aucune commande</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div style={styles.listCard}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Réservations à venir</h2>
            <button style={styles.viewAllBtn}>Voir tout</button>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nom</th>
                  <th style={styles.th}>Date & Heure</th>
                  <th style={styles.th}>Personnes</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.length > 0 ? recentReservations.map(res => (
                  <tr key={res.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={{fontWeight: '600'}}>{res.name}</div>
                      <div style={{fontSize: '0.8rem', color: isDarkMode ? '#9ca3af' : '#6b7280'}}>{res.phone}</div>
                    </td>
                    <td style={styles.td}>
                      <div>{new Date(res.date).toLocaleDateString()}</div>
                      <div style={{fontSize: '0.85rem', fontWeight: 'bold'}}>{res.time}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <FaUsers color={isDarkMode ? '#9ca3af' : '#6b7280'}/> {res.guests}
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan="3" style={{textAlign: 'center', padding: '20px'}}>Aucune réservation</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* CSS in JS for spinner animation */}
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const getStyles = (isDarkMode) => ({
  container: {
    padding: "30px",
    maxWidth: "1400px",
    margin: "-80px auto",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
    minHeight: "100vh",
    color: isDarkMode ? "#f3f4f6" : "#1f2937",
    paddingBottom: "50px",
    transition: "all 0.3s ease",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: isDarkMode ? "#facc15" : "#111827",
    margin: "0 0 8px 0",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: isDarkMode ? "#9ca3af" : "#6b7280",
    margin: 0,
  },
  filterContainer: {
    display: "flex",
    gap: "5px",
    background: isDarkMode ? "#1f2937" : "#e5e7eb",
    padding: "6px",
    borderRadius: "12px",
    boxShadow: isDarkMode ? "inset 0 2px 4px rgba(0,0,0,0.5)" : "inset 0 2px 4px rgba(0,0,0,0.05)",
  },
  filterButton: {
    padding: "8px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: isDarkMode ? "#d1d5db" : "#4b5563",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeFilter: {
    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
    color: isDarkMode ? "#facc15" : "#6d28d9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "30px",
  },
  kpiCard: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    borderRadius: "20px",
    boxShadow: isDarkMode ? "0 10px 15px -3px rgba(0,0,0,0.5)" : "0 10px 15px -3px rgba(0,0,0,0.05)",
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    transition: "transform 0.2s ease",
  },
  kpiTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px"
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    borderRadius: "14px",
  },
  trend: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.85rem",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "20px",
    backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "#f9fafb"
  },
  kpiContent: {
    display: "flex",
    flexDirection: "column",
  },
  kpiValue: {
    fontSize: "2rem",
    fontWeight: "800",
    color: isDarkMode ? "#f3f4f6" : "#111827",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px"
  },
  kpiTitle: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: isDarkMode ? "#9ca3af" : "#6b7280",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  chartSection: {
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: isDarkMode ? "0 10px 15px -3px rgba(0,0,0,0.5)" : "0 10px 15px -3px rgba(0,0,0,0.05)",
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    marginBottom: "30px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: isDarkMode ? "#f3f4f6" : "#111827",
    margin: 0
  },
  chartContainer: {
    height: "350px",
    width: "100%"
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
  },
  listCard: {
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: isDarkMode ? "0 10px 15px -3px rgba(0,0,0,0.5)" : "0 10px 15px -3px rgba(0,0,0,0.05)",
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  },
  viewAllBtn: {
    background: "transparent",
    border: "none",
    color: isDarkMode ? "#facc15" : "#6d28d9",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    color: isDarkMode ? "#9ca3af" : "#6b7280",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  },
  tr: {
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    transition: "background-color 0.2s ease"
  },
  td: {
    padding: "16px",
    fontSize: "0.95rem",
    verticalAlign: "middle"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700"
  }
});

export default Dashboard;
