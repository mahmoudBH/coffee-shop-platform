import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationTriangle, FaSort, FaBoxOpen, FaCheckCircle, FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme();

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
    if (quantity < 10) return { label: "Critique", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", icon: <FaExclamationTriangle /> };
    if (quantity < 30) return { label: "Moyen", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", icon: <FaExclamationTriangle /> };
    return { label: "Suffisant", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", icon: <FaCheckCircle /> };
  };

  const handleSort = () => {
    const sortedStock = [...stock].sort((a, b) => {
      return sortOrder === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    });
    setStock(sortedStock);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredStock = stock.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = getStyles(isDarkMode);

  // Statistiques rapides
  const lowStockCount = stock.filter(item => item.quantity < 10).length;
  const mediumStockCount = stock.filter(item => item.quantity >= 10 && item.quantity < 30).length;

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.header}>📦 Gestion du Stock</h1>
          <p style={styles.subtitle}>Supervisez vos ingrédients et recevez des alertes en temps réel.</p>
        </div>

        <div style={styles.statsContainer}>
          <div style={{...styles.statBox, borderColor: '#ef4444'}}>
            <span style={{color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem'}}>{lowStockCount}</span>
            <span style={styles.statLabel}>Critiques</span>
          </div>
          <div style={{...styles.statBox, borderColor: '#f59e0b'}}>
            <span style={{color: '#f59e0b', fontWeight: 'bold', fontSize: '1.2rem'}}>{mediumStockCount}</span>
            <span style={styles.statLabel}>Moyens</span>
          </div>
          <div style={{...styles.statBox, borderColor: '#10b981'}}>
            <span style={{color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem'}}>{stock.length - lowStockCount - mediumStockCount}</span>
            <span style={styles.statLabel}>Suffisants</span>
          </div>
        </div>
      </div>

      <div style={styles.controlsSection}>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Rechercher un ingrédient..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <button onClick={handleSort} style={styles.sortButton}>
          <FaSort /> Trier par quantité ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={{...styles.th, width: '40%'}}>Ingrédient</th>
              <th style={{...styles.th, width: '30%', cursor: 'pointer'}} onClick={handleSort}>
                <div style={styles.thContent}>Quantité <FaSort style={{marginLeft: '8px', opacity: 0.5}}/></div>
              </th>
              <th style={{...styles.th, width: '30%'}}>État du stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item, index) => {
              const status = getStatus(item.quantity);
              return (
                <tr key={item.id} style={{
                  ...styles.row, 
                  backgroundColor: isDarkMode 
                    ? (index % 2 === 0 ? '#1f2937' : '#111827') 
                    : (index % 2 === 0 ? '#ffffff' : '#f9fafb')
                }}>
                  <td style={styles.td}>
                    <div style={styles.ingredientCell}>
                      <div style={styles.iconWrapper}>
                        <FaBoxOpen color={isDarkMode ? '#9ca3af' : '#6b7280'} />
                      </div>
                      <span style={{fontWeight: '600'}}>{item.name}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{item.quantity}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.statusBadge, 
                      color: status.color, 
                      backgroundColor: status.bg,
                      border: `1px solid ${status.color}40`
                    }}>
                      {status.icon} <span style={{marginLeft: '8px'}}>{status.label}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredStock.length === 0 && (
          <div style={styles.emptyState}>
            <FaBoxOpen size={48} color={isDarkMode ? '#4b5563' : '#d1d5db'} />
            <p>Aucun ingrédient ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const getStyles = (isDark) => ({
  container: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '-80px auto',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: isDark ? "#121212" : "#f8f9fa",
    color: isDark ? "#f3f4f6" : "#1f2937",
    minHeight: '100vh',
    transition: "all 0.3s ease",
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: isDark ? "#facc15" : "#1f2937",
    margin: "0 0 10px 0",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: isDark ? "#9ca3af" : "#6b7280",
    margin: 0,
  },
  statsContainer: {
    display: 'flex',
    gap: '12px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '12px',
    borderBottom: '3px solid',
    boxShadow: isDark ? "0 4px 6px -1px rgba(0,0,0,0.5)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  statLabel: {
    fontSize: '0.8rem',
    color: isDark ? '#9ca3af' : '#6b7280',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: '4px'
  },
  controlsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    padding: '12px 20px',
    borderRadius: '12px',
    flex: '1',
    minWidth: '250px',
    boxShadow: isDark ? "inset 0 2px 4px rgba(0,0,0,0.5)" : "inset 0 2px 4px rgba(0,0,0,0.05)",
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
  },
  searchIcon: {
    color: isDark ? '#9ca3af' : '#9ca3af',
    marginRight: '12px'
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    color: isDark ? '#fff' : '#1f2937',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
  },
  sortButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: isDark ? '#374151' : '#e5e7eb',
    color: isDark ? '#fff' : '#1f2937',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  tableContainer: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: isDark ? "0 10px 15px -3px rgba(0,0,0,0.5)" : "0 10px 15px -3px rgba(0,0,0,0.1)",
    border: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerRow: {
    backgroundColor: isDark ? '#111827' : '#f9fafb',
    borderBottom: `2px solid ${isDark ? '#374151' : '#e5e7eb'}`,
  },
  th: {
    padding: "20px",
    textAlign: "left",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: isDark ? '#9ca3af' : '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  thContent: {
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    transition: "background-color 0.2s ease",
    borderBottom: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
  },
  td: {
    padding: "16px 20px",
    verticalAlign: "middle",
  },
  ingredientCell: {
    display: 'flex',
    alignItems: 'center',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6',
    borderRadius: '10px',
    marginRight: '16px'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: isDark ? '#9ca3af' : '#6b7280',
    textAlign: 'center'
  }
});

export default Stock;
