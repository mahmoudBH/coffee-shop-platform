import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/admin/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Connexion Admin</h2>
        <img src="logo.png" alt="Coffee Logo" style={styles.logo} />

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Se connecter</button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to right, #4B2C20, #8C5A41)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  loginBox: {
    width: "100%",
    maxWidth: "350px",
    background: "white",
    padding: "30px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  },
  logo: {
    width: "120px",
    borderRadius: "50%",
    marginBottom: "15px",
  },
  title: {
    fontSize: "22px",
    color: "#4B2C20",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s ease",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    background: "#6D4C41",
    color: "white",
    fontSize: "14px",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default Login;
