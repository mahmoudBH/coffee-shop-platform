import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";
import { 
  FaShoppingCart, FaUsers, FaCalendarCheck, FaCalendarAlt, 
  FaBox, FaExclamationTriangle, FaChair, FaMoneyBillWave 
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("jour");

  useEffect(() => {
    axios.get(`http://localhost:4000/api/statistics?filter=${filter}`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, [filter]);

  const filters = ["jour", "semaine", "mois", "annee"];
  const styles = getStyles(isDarkMode);

  const cardsData = [
    { title: `Commandes (${filter})`, value: stats.orders || 0, icon: <FaShoppingCart size={28} color="#8b5cf6" />, color: "#8b5cf6" },
    { title: "Nouveaux Clients", value: stats.users || 0, icon: <FaUsers size={28} color="#3b82f6" />, color: "#3b82f6" },
    { title: "Réservations", value: stats.reservations || 0, icon: <FaCalendarCheck size={28} color="#10b981" />, color: "#10b981" },
    { title: "Événements Ouverts", value: stats.openEvents || 0, icon: <FaCalendarAlt size={28} color="#f59e0b" />, color: "#f59e0b" },
    { title: "Produits en Stock", value: stats.stock || 0, icon: <FaBox size={28} color="#6366f1" />, color: "#6366f1" },
    { title: "Stock Faible (Alertes)", value: stats.lowStock || 0, icon: <FaExclamationTriangle size={28} color="#ef4444" />, color: "#ef4444" },
    { title: "Capacité (Tables)", value: stats.totalCapacity || 0, icon: <FaChair size={28} color="#ec4899" />, color: "#ec4899" },
    { title: `Revenus (${filter})`, value: `${stats.revenue || 0} €`, icon: <FaMoneyBillWave size={28} color="#14b8a6" />, color: "#14b8a6" },
  ];

  // Dummy data for the chart to make the dashboard look professional
  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        fill: true,
        label: 'Revenus (Dinars)',
        data: [12000, 19000, 15000, 22000, 29000, 35000, 31000],
        borderColor: isDarkMode ? '#facc15' : '#6d28d9',
        backgroundColor: isDarkMode ? 'rgba(250, 204, 21, 0.2)' : 'rgba(109, 40, 217, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Évolution des revenus cette semaine',
        color: isDarkMode ? '#f1f1f1' : '#333',
        font: { size: 16, family: 'Inter' }
      },
    },
    scales: {
      y: {
        grid: { color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
        ticks: { color: isDarkMode ? '#aaa' : '#666' }
      },
      x: {
        grid: { display: false },
        ticks: { color: isDarkMode ? '#aaa' : '#666' }
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.header}>Tableau de Bord</h1>
          <p style={styles.subtitle}>Bienvenue ! Voici un résumé de vos activités.</p>
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

      <div style={styles.grid}>
        {cardsData.map((card, idx) => (
          <div key={idx} style={styles.card}>
            <div style={{ ...styles.iconWrapper, backgroundColor: `${card.color}20` }}>
              {card.icon}
            </div>
            <div style={styles.cardContent}>
              <p style={styles.cardTitle}>{card.title}</p>
              <p style={styles.cardValue}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.chartContainer}>
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

const getStyles = (isDarkMode) => ({
  container: {
    padding: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
    minHeight: "100vh",
    color: isDarkMode ? "#fff" : "#1f2937",
    paddingBottom: "50px",
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
    color: isDarkMode ? "#facc15" : "#1f2937",
    margin: "0 0 10px 0",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: isDarkMode ? "#9ca3af" : "#6b7280",
    margin: 0,
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    background: isDarkMode ? "#1f2937" : "#e5e7eb",
    padding: "6px",
    borderRadius: "12px",
  },
  filterButton: {
    padding: "10px 20px",
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
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "24px",
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    borderRadius: "16px",
    boxShadow: isDarkMode
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.5)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    marginRight: "20px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: isDarkMode ? "#9ca3af" : "#6b7280",
    marginBottom: "4px",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  cardValue: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: isDarkMode ? "#f3f4f6" : "#111827",
    margin: 0,
  },
  chartContainer: {
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: isDarkMode
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.5)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    height: "400px",
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  }
});

export default Dashboard;
