import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";

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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📊 Tableau de Bord</h1>

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

      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.cardTitle}>🛒 Commandes ({filter})</p>
          <p style={styles.cardValue}>{stats.orders || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>👥 Clients</p>
          <p style={styles.cardValue}>{stats.users || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>📅 Réservations</p>
          <p style={styles.cardValue}>{stats.reservations || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>🎉 Événements Ouverts</p>
          <p style={styles.cardValue}>{stats.openEvents || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>📦 Produits en Stock</p>
          <p style={styles.cardValue}>{stats.stock || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>⚠️ Stock Faible</p>
          <p style={styles.cardValue}>{stats.lowStock || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>🔋 Capacité du café</p>
          <p style={styles.cardValue}>{stats.totalCapacity || 0}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>💰 Bénéfice ({filter})</p>
          <p style={styles.cardValue}>{stats.revenue || 0} DA</p>
        </div>
      </div>
    </div>
  );
};

const getStyles = (isDarkMode) => ({
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "-80px auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: isDarkMode ? "#1e1e1e" : "#f4f4f4",
    minHeight: "100vh",
    color: isDarkMode ? "#fff" : "#333",
  },
  header: {
    textAlign: "center",
    fontSize: "2.2rem",
    marginBottom: "30px",
    color: isDarkMode ? "#f9d976" : "#333",
    transition: "color 0.3s",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  filterButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: isDarkMode ? "#444" : "#ddd",
    color: isDarkMode ? "#fff" : "#333",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeFilter: {
    backgroundColor: "#6d28d9",
    color: "#fff",
    transform: "scale(1.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "25px",
    backgroundColor: isDarkMode ? "#292929" : "#fff",
    borderRadius: "15px",
    boxShadow: isDarkMode
      ? "0 4px 12px rgba(255, 255, 255, 0.05)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
    color: isDarkMode ? "#f1f1f1" : "#444",
  },
  cardValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: isDarkMode ? "#facc15" : "#6d28d9",
  },
});

export default Dashboard;
