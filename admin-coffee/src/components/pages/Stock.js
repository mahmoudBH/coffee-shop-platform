import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationTriangle, FaSort } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // Import du hook useTheme

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const { isDarkMode } = useTheme(); // Récupérer l'état du mode sombre

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/stock");
      setStock(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du stock", error);
    }
  };

  const getStatus = (quantity) => {
    if (quantity < 10) return "Stock Faible";
    if (quantity < 30) return "Stock Moyen";
    return "Stock Suffisant";
  };

  const getStatusColor = (status) => {
    if (status === "Stock Faible") return "red";
    if (status === "Stock Moyen") return "orange";
    return "green";
  };

  const handleSort = () => {
    const sortedStock = [...stock].sort((a, b) => {
      const statusA = getStatus(a.quantity);
      const statusB = getStatus(b.quantity);
      return sortOrder === "asc"
        ? statusA.localeCompare(statusB)
        : statusB.localeCompare(statusA);
    });
    setStock(sortedStock);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const themeStyles = isDarkMode
    ? {
        table: {
          backgroundColor: "#444",
          color: "#fff",
        },
        th: {
          backgroundColor: "#222",
          color: "#fff",
        },
        row: {
          backgroundColor: "#555",
        },
        td: {
          borderBottom: "1px solid #666",
        },
      }
    : {
        table: {
          backgroundColor: "#fff",
          color: "#333",
        },
        th: {
          backgroundColor: "#4B2C20",
          color: "white",
        },
        row: {
          backgroundColor: "#fff",
        },
        td: {
          borderBottom: "1px solid #ddd",
        },
      };

  // Style du titre qui s'adapte au mode sombre
  const titleStyle = {
    ...styles.title,
    color: isDarkMode ? "#fff" : "#333", // Blanc en mode sombre, noir en mode clair
  };

  return (
    <div style={styles.container}>
      <h1 style={titleStyle}>📦 Gestion du Stock</h1>

      <table style={{ ...styles.table, ...themeStyles.table }}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={{ ...styles.th, ...themeStyles.th }}>Ingrédient</th>
            <th style={{ ...styles.th, ...themeStyles.th }}>Quantité</th>
            <th
              style={{ ...styles.th, cursor: "pointer", ...themeStyles.th }}
              onClick={handleSort}
            >
              Statut <FaSort />
            </th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => {
            const status = getStatus(item.quantity);
            return (
              <tr key={item.id} style={{ ...styles.row, ...themeStyles.row }}>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td
                  style={{
                    ...styles.td,
                    color: getStatusColor(status),
                    fontWeight: "bold",
                  }}
                >
                  {status === "Stock Faible" && <FaExclamationTriangle />} {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1000px",
    margin: "auto",
    marginTop: "-70px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  headerRow: {
    backgroundColor: "#4B2C20",
    color: "white",
  },
  th: {
    padding: "15px",
    textAlign: "center",
    fontSize: "16px",
  },
  row: {
    backgroundColor: "#fff",
    transition: "background 0.3s ease",
  },
  td: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    textAlign: "center",
    verticalAlign: "middle",
  },
};

export default Stock;
