import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faTable } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeProvider"; // Import du mode dark

const Table = () => {
  const { isDarkMode } = useTheme(); // Récupération du mode sombre
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/events/tables");
      setTables(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tables", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "available" ? "reserved" : "available";
    try {
      await axios.put(`http://localhost:4000/api/events/tables/${id}`, {
        status: newStatus,
      });
      fetchTables();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  return (
    <div style={{ ...styles.container, backgroundColor: isDarkMode ? "#1E1E1E" : "#F8F9FA" }}>
      <h1 style={{ ...styles.title, color: isDarkMode ? "#FFF" : "#4B2C20" }}>
        🍽️ Gestion des Tables
      </h1>
      <div style={styles.tableGrid}>
        {tables.map((table) => (
          <div
            key={table.id}
            style={{
              ...styles.tableCard,
              backgroundColor: isDarkMode ? "#333" : "#FFF",
              color: isDarkMode ? "#FFF" : "#000",
            }}
          >
            <div style={styles.tableIcon}>
              <FontAwesomeIcon
                icon={faTable}
                size="3x"
                color={table.status === "available" ? "#6d28d9" : "#F44336"}
              />
              <div style={styles.chairs}>
                {Array.from({ length: table.capacity >= 6 ? 8 : 4 }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faChair} size="2x" color="#4B2C20" />
                ))}
              </div>
            </div>
            <p style={styles.tableNumber}>Table {table.table_number}</p>
            <p style={styles.tableCapacity}>Capacité : {table.capacity} personnes</p>
            <button
              onClick={() => toggleStatus(table.id, table.status)}
              style={{
                ...styles.statusButton,
                backgroundColor: table.status === "available" ? "#4CAF50" : "#F44336",
              }}
            >
              {table.status === "available" ? "Disponible" : "Réservée"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "-80px auto",
    margintop: "-50px",
    transition: "background 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "32px",
    transition: "color 0.3s ease",
  },
  tableGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  tableCard: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "background 0.3s ease, color 0.3s ease",
  },
  tableIcon: {
    position: "relative",
    margin: "0 auto 10px",
  },
  chairs: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
  },
  tableNumber: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  tableCapacity: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  statusButton: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
};

export default Table;
