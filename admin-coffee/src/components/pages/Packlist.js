import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";

const PackList = () => {
  const { isDarkMode } = useTheme();
  const [packs, setPacks] = useState([]);

  const getStyles = (isDark) => ({
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '-80px auto',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      minHeight: '100vh',
      color: isDark ? '#e0e0e0' : '#333'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2rem',
      color: isDark ? '#d4a972' : '#6f4e37',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    card: {
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
      }
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    packName: {
      fontSize: '1.5rem',
      color: isDark ? '#d4a972' : '#6f4e37',
      margin: 0
    },
    points: {
      backgroundColor: isDark ? 'rgba(212, 169, 114, 0.2)' : 'rgba(111, 78, 55, 0.1)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontWeight: '600',
      color: isDark ? '#d4a972' : '#6f4e37',
      fontSize: '0.9rem'
    },
    description: {
      fontStyle: 'italic',
      color: isDark ? '#b0b0b0' : '#555',
      margin: '0.5rem 0',
      fontSize: '0.95rem'
    },
    price: {
      fontSize: '1.1rem',
      color: isDark ? '#81c784' : '#2e7d32',
      marginBottom: '1rem',
      '& strong': {
        color: isDark ? '#d4a972' : '#6f4e37'
      }
    },
    menuTitle: {
      marginBottom: '0.8rem',
      color: isDark ? '#d4a972' : '#6f4e37',
      fontSize: '1.1rem'
    },
    menuList: {
      listStyleType: 'none',
      paddingLeft: 0,
      display: 'grid',
      gap: '0.5rem'
    },
    menuItem: {
      backgroundColor: isDark ? '#363636' : '#f8f9fa',
      padding: '0.8rem',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s ease'
    },
    menuName: {
      fontWeight: '500',
      color: isDark ? '#e0e0e0' : '#2d3436'
    },
    menuDetails: {
      color: isDark ? '#b0b0b0' : '#636e72',
      fontSize: '0.9rem'
    },
    deleteButton: {
      marginTop: '1rem',
      padding: '0.6rem 1.2rem',
      backgroundColor: isDark ? '#c44536' : '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#c0392b',
        transform: 'translateY(-2px)'
      }
    }
  });

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = () => {
    axios.get('http://localhost:4000/api/packs')
      .then(res => setPacks(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce pack ?")) {
      axios.delete(`http://localhost:4000/api/packs/${id}`)
        .then(() => {
          alert("Pack supprimé !");
          fetchPacks(); // Recharger les packs
        })
        .catch(err => {
          console.error(err);
          alert("Erreur lors de la suppression.");
        });
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Packs Disponibles</h2>
      {packs.map((pack) => (
        <div key={pack.id} style={styles.card}>
          <div style={styles.header}>
            <h3 style={styles.packName}>{pack.name}</h3>
            <span style={styles.points}>{pack.points} pts</span>
          </div>
          <p style={styles.description}>{pack.description}</p>
          <p style={styles.price}><strong>💰 Prix :</strong> {pack.price} DZD</p>
          <div>
            <h4 style={styles.menuTitle}>🍽️ Menus inclus :</h4>
            <ul style={styles.menuList}>
              {pack.menus.map(menu => (
                <li key={menu.id} style={styles.menuItem}>
                  <span style={styles.menuName}>{menu.title}</span>
                  <span style={styles.menuDetails}>
                    ({menu.category} - {menu.price} DZD)
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button style={styles.deleteButton} onClick={() => handleDelete(pack.id)}>
            ❌ Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default PackList;