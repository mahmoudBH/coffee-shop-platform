import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeProvider';

const UserListAdmin = () => {
  const [users, setUsers] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      const sortedUsers = response.data.sort((a, b) => b.points - a.points);
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  return (
    <div style={{ ...styles.container, ...(isDarkMode ? styles.darkContainer : {}) }}>
      <h1 style={{ ...styles.title, ...(isDarkMode ? styles.darkTitle : {}) }}>🏆 Leaderboard des Utilisateurs</h1>
      <table style={{ ...styles.table }}>
        <thead>
          <tr>
            <th style={{ ...styles.th, ...(isDarkMode ? styles.darkTh : {}) }}>Nom</th>
            <th style={{ ...styles.th, ...(isDarkMode ? styles.darkTh : {}) }}>Prénom</th>
            <th style={{ ...styles.th, ...(isDarkMode ? styles.darkTh : {}) }}>Email</th>
            <th style={{ ...styles.th, ...(isDarkMode ? styles.darkTh : {}) }}>Mobile</th>
            <th style={{ ...styles.th, ...(isDarkMode ? styles.darkTh : {}) }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={{
                ...styles.tr,
                ...(index < 3 ? styles.topUser : {}),
                ...(isDarkMode ? styles.darkTr : {}),
              }}
            >
              <td style={{ ...styles.td, ...(isDarkMode ? styles.darkTd : {}) }}>{user.firstName}</td>
              <td style={{ ...styles.td, ...(isDarkMode ? styles.darkTd : {}) }}>{user.lastName}</td>
              <td style={{ ...styles.td, ...(isDarkMode ? styles.darkTd : {}) }}>{user.email}</td>
              <td style={{ ...styles.td, ...(isDarkMode ? styles.darkTd : {}) }}>{user.mobile}</td>
              <td style={{ ...styles.td, ...(isDarkMode ? styles.darkTd : {}) }}>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        tr:hover {
          background: ${isDarkMode ? '#555' : 'rgba(0,0,0,0.05)'};
          transform: translateX(10px);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '-80px auto',
    fontFamily: "'Segoe UI', sans-serif",
    transition: 'all 0.3s ease',
  },
  darkContainer: {
    background: '',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2.2rem',
    color: '#2c3e50',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  darkTitle: {
    color: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  th: {
    padding: '12px 15px',
    backgroundColor: '#6d28d9',
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #5a239a',
  },
  darkTh: {
    backgroundColor: '#444',
    borderBottom: '2px solid #666',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
    color: '#333',
    transition: 'all 0.3s ease',
  },
  darkTd: {
    borderBottom: '1px solid #555',
    color: '#eee',
  },
  tr: {
    transition: 'transform 0.3s ease, background 0.3s ease',
  },
  darkTr: {
    backgroundColor: 'rgb(51, 51, 51)',
  },
  topUser: {
    backgroundColor: '#f1c40f',
    fontWeight: 'bold',
  },
};

export default UserListAdmin;
