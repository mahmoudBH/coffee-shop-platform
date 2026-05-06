import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const token = localStorage.getItem('token');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    axios.get('http://localhost:4000/api/users/admin/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setEmail(response.data.email);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération du profil', error);
    });
  }, [token]);

  const handleEmailChange = () => {
    setIsEmailEditable(true);
  };

  const handlePasswordChange = () => {
    setIsPasswordEditable(true);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    if (password) {
      const data = { email: newEmail, password };

      axios.post('http://localhost:4000/api/users/admin/profile/update/email', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessage('Email mis à jour avec succès');
        setEmail(newEmail);
        setIsEmailEditable(false);
      })
      .catch((error) => {
        setMessage(error.response ? error.response.data.error : 'Erreur lors de la mise à jour de l\'email');
      });
    } else {
      setMessage('Veuillez entrer votre mot de passe actuel pour modifier l\'email');
    }
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const data = { newPassword, password };

    axios.post('http://localhost:4000/api/users/admin/profile/update/password', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setMessage('Mot de passe mis à jour avec succès');
      setPassword('');
      setNewPassword('');
      setIsPasswordEditable(false);
    })
    .catch((error) => {
      setMessage(error.response ? error.response.data.error : 'Erreur lors de la mise à jour du mot de passe');
    });
  };

  const styles = {
    profilePage: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      borderRadius: '15px',
      boxShadow: isDarkMode ? '0 8px 20px rgba(255, 255, 255, 0.1)' : '0 8px 20px rgba(0, 0, 0, 0.1)',
      color: isDarkMode ? '#fff' : '#333',
      transition: 'all 0.3s ease',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '28px',
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#6d28d9',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      fontSize: '16px',
      fontWeight: '500',
      color: isDarkMode ? '#ddd' : '#555',
    },
    input: {
      padding: '12px',
      borderRadius: '8px',
      border: isDarkMode ? '1px solid #555' : '1px solid #ddd',
      fontSize: '14px',
      backgroundColor: isDarkMode ? '#444' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
    },
    button: {
      padding: '12px',
      backgroundColor: '#6d28d9',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    cancelButton: {
      padding: '12px',
      backgroundColor: '#aaa',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    message: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
    },
    spacer: {
      margin: '20px 0', // Espace entre les sections
    },
  };

  return (
    <div style={styles.profilePage}>
      <h2 style={styles.title}>Profil</h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Email actuel :</label>
        <input
          type="email"
          value={email}
          disabled
          style={styles.input}
        />
      </div>
      <br></br>
      {!isEmailEditable && (
        <button 
          onClick={handleEmailChange} 
          style={styles.button}
        >
          Modifier l'email
        </button>
      )}
      
      {isEmailEditable && (
        <form onSubmit={handleSubmitEmail} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nouveau Email :</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mot de passe actuel :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Mettre à jour l'email</button>
          <button 
            type="button" 
            onClick={() => setIsEmailEditable(false)} 
            style={styles.cancelButton}
          >
            Annuler
          </button>
        </form>
      )}
      
      <div style={styles.spacer}></div> {/* Ajout d'espace entre les sections */}
      
      {!isPasswordEditable && (
        <button 
          onClick={handlePasswordChange} 
          style={styles.button}
        >
          Modifier le mot de passe
        </button>
      )}
      
      {isPasswordEditable && (
        <form onSubmit={handleSubmitPassword} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nouveau mot de passe :</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mot de passe actuel :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Mettre à jour le mot de passe</button>
          <button 
            type="button" 
            onClick={() => setIsPasswordEditable(false)} 
            style={styles.cancelButton}
          >
            Annuler
          </button>
        </form>
      )}
      
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default Profile;
