import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaMoon, FaSun, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // Importation du contexte

const Header = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Récupération du mode sombre
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false); // État pour gérer le focus de la barre de recherche

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={{ ...styles.header, backgroundColor: isDarkMode ? "#333" : "#d4d4d8" }}>
      {/* Icônes à gauche */}
      <div style={styles.leftIcons}>
        <div style={styles.iconContainer}>
          <FaBell style={styles.icon} />
        </div>
      </div>

      {/* Barre de recherche centrée */}
      <div
        style={{
          ...styles.searchContainer,
          backgroundColor: isDarkMode ? "#444" : "#fff",
          border: isSearchFocused ? "2px solid #6d28d9" : "2px solid transparent",
          boxShadow: isSearchFocused ? "0 0 10px rgba(109, 40, 217, 0.5)" : "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FaSearch style={{ ...styles.searchIcon, color: isDarkMode ? "#fff" : "#888" }} />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          style={{
            ...styles.searchInput,
            color: isDarkMode ? "#fff" : "#333",
          }}
        />
      </div>

      {/* Icônes à droite */}
      <div style={styles.rightIcons}>
        <div style={styles.iconContainer} onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun style={styles.icon} /> : <FaMoon style={styles.icon} />}
        </div>

        <div style={styles.iconContainer} onClick={() => navigate("/profile")}>
          <FaUserCircle style={styles.icon} />
        </div>

        <div style={styles.iconContainer} onClick={handleLogout}>
          <FaSignOutAlt style={styles.icon} />
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background 0.3s ease",
  },
  leftIcons: {
    display: "flex",
    alignItems: "center",
    flex: 1, // Permet d'occuper l'espace à gauche
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: "25px",
    padding: "8px 15px",
    transition: "all 0.3s ease",
    maxWidth: "400px",
    width: "100%",
    justifyContent: "center",
  },
  searchIcon: {
    fontSize: "16px",
    marginRight: "10px",
    transition: "color 0.3s ease",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "transparent",
    width: "100%",
    transition: "color 0.3s ease",
  },
  rightIcons: {
    display: "flex",
    alignItems: "center",
    flex: 1, // Permet d'équilibrer avec la partie gauche
    justifyContent: "flex-end",
  },
  iconContainer: {
    marginLeft: "15px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  icon: {
    fontSize: "23px",
    color: "white",
    transition: "color 0.3s ease",
  },
};

export default Header;