import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";

const Pack = () => {
  const { isDarkMode } = useTheme();
  const [groupedMenus, setGroupedMenus] = useState({});
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [packName, setPackName] = useState("");
  const [packDescription, setPackDescription] = useState("");
  const [packPrice, setPackPrice] = useState("");
  const [packPoints, setPackPoints] = useState("");
  const [message, setMessage] = useState("");

  // Styles dynamiques
  const getStyles = (isDark) => ({
    container: { 
      padding: "2rem",
      maxWidth: "800px", 
      margin: "-80px auto", 
      fontFamily: "'Inter', sans-serif",
      background: isDark ? "#2a2a2a" : "#f5f5f5",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      minHeight: "100vh",
      color: isDark ? "#e0e0e0" : "#333"
    },
    title: { 
      textAlign: "center", 
      marginBottom: "1.5rem", 
      fontSize: "2rem",
      color: isDark ? "#d4a972" : "#6f4e37",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    form: { 
      display: "flex", 
      flexDirection: "column", 
      gap: "1.5rem",
      padding: "1rem"
    },
    input: { 
      padding: "0.8rem",
      fontSize: "1rem",
      border: `1px solid ${isDark ? "#444" : "#ccc"}`,
      borderRadius: "8px",
      background: isDark ? "#363636" : "#fff",
      color: isDark ? "#fff" : "#333",
      transition: "all 0.3s ease",
      "&:focus": {
        outline: "none",
        boxShadow: `0 0 0 3px ${isDark ? "rgba(212, 169, 114, 0.3)" : "rgba(111, 78, 55, 0.3)"}`
      }
    },
    textarea: { 
      padding: "0.8rem",
      fontSize: "1rem",
      border: `1px solid ${isDark ? "#444" : "#ccc"}`,
      borderRadius: "8px",
      background: isDark ? "#363636" : "#fff",
      color: isDark ? "#fff" : "#333",
      minHeight: "100px",
      transition: "all 0.3s ease"
    },
    row: { 
      display: "flex", 
      gap: "1rem",
      "@media (max-width: 768px)": {
        flexDirection: "column"
      }
    },
    sectionTitle: {
      fontSize: "1.25rem",
      marginBottom: "1rem",
      color: isDark ? "#d4a972" : "#6f4e37",
      borderBottom: `2px solid ${isDark ? "#d4a972" : "#6f4e37"}`,
      paddingBottom: "0.5rem"
    },
    categoryBlock: {
      background: isDark ? "#363636" : "#fff",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      marginBottom: "1.5rem"
    },
    categoryTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "0.8rem",
      color: isDark ? "#d4a972" : "#6f4e37"
    },
    menuItems: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "0.8rem"
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      background: isDark ? "#444" : "#f7f7f7",
      padding: "0.8rem",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
      }
    },
    checkbox: {
      marginRight: "0.8rem",
      accentColor: isDark ? "#d4a972" : "#6f4e37",
      width: "1.2rem",
      height: "1.2rem"
    },
    menuTitle: {
      fontSize: "0.95rem",
      color: isDark ? "#e0e0e0" : "#444"
    },
    submitButton: {
      padding: "1rem",
      fontSize: "1rem",
      borderRadius: "8px",
      background: isDark ? "#d4a972" : "#6f4e37",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "600",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }
    },
    message: {
      textAlign: "center",
      marginTop: "1.5rem",
      fontSize: "1rem",
      color: isDark ? "#81c784" : "#2e7d32",
      padding: "1rem",
      borderRadius: "8px",
      background: isDark ? "rgba(129, 199, 132, 0.1)" : "rgba(46, 125, 50, 0.1)"
    }
  });

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/menu");
      groupMenusByCategory(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des menus:", error);
    }
  };

  const groupMenusByCategory = (menuList) => {
    const grouped = {};
    menuList.forEach(menu => {
      if (!grouped[menu.category]) {
        grouped[menu.category] = [];
      }
      grouped[menu.category].push(menu);
    });
    setGroupedMenus(grouped);
  };

  const toggleMenuSelection = (menuId) => {
    setSelectedMenus(prev =>
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packData = {
      name: packName,
      description: packDescription,
      price: parseFloat(packPrice),
      points: parseInt(packPoints),
      menu_items: JSON.stringify(selectedMenus)
    };

    try {
      await axios.post("http://localhost:4000/api/packs", packData);
      setMessage("Pack créé avec succès !");
      // Réinitialisation du formulaire
      setPackName("");
      setPackDescription("");
      setPackPrice("");
      setPackPoints("");
      setSelectedMenus([]);
    } catch (error) {
      console.error("Erreur lors de la création du pack:", error);
      setMessage("Erreur lors de la création du pack.");
    }
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Création d'un Pack de Menu</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text"
          placeholder="Nom du Pack"
          value={packName}
          onChange={(e) => setPackName(e.target.value)}
          style={styles.input}
          required
        />
        <textarea 
          placeholder="Description du Pack"
          value={packDescription}
          onChange={(e) => setPackDescription(e.target.value)}
          style={styles.textarea}
        />
        <div style={styles.row}>
          <input 
            type="number"
            placeholder="Prix du Pack (€)"
            value={packPrice}
            onChange={(e) => setPackPrice(e.target.value)}
            style={styles.input}
            required
          />
          <input 
            type="number"
            placeholder="Points requis"
            value={packPoints}
            onChange={(e) => setPackPoints(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <h3 style={styles.sectionTitle}>Sélectionnez les menus à inclure :</h3>
        {Object.keys(groupedMenus).map(category => (
          <div key={category} style={styles.categoryBlock}>
            <h4 style={styles.categoryTitle}>{category}</h4>
            <div style={styles.menuItems}>
              {groupedMenus[category].map(menu => (
                <label key={menu.id} style={styles.menuItem}>
                  <input 
                    type="checkbox" 
                    checked={selectedMenus.includes(menu.id)}
                    onChange={() => toggleMenuSelection(menu.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.menuTitle}>{menu.title} ({menu.price}€)</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" style={styles.submitButton}>Créer le Pack</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default Pack;