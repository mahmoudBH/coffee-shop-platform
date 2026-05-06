import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEvents([...events, response.data]);
      setTitle("");
      setDate("");
      setDescription("");
      setPhoto(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement", error);
    }
  };

  const getStyles = (isDark) => ({
    container: {
      padding: "2rem",
      fontFamily: "'Playfair Display', serif",
      maxWidth: "1200px",
      margin: "-80px auto",
      backgroundColor: isDark ? "" : "",
      minHeight: "100vh",
      transition: "all 0.5s ease",
    },
    title: {
      textAlign: "center",
      margin: "2rem 0",
      fontSize: "40px",
      color: isDark ? "#d4a972" : "#6f4e37",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      position: "relative",
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "120px",
        height: "3px",
        background: isDark ? "#d4a972" : "#6f4e37",
        borderRadius: "2px"
      }
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      marginBottom: "3rem",
      padding: "2rem",
      background: isDark ? "" : "",
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: `1px solid ${isDark ? "rgba(212, 169, 114, 0.2)" : "rgba(111, 78, 55, 0.2)"}`
    },
    input: {
      padding: "1rem",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#d4a972" : "#6f4e37"}`,
      fontSize: "1rem",
      background: "transparent",
      color: isDark ? "#fff" : "#4B2C20",
      transition: "all 0.3s ease",
      "&:focus": {
        outline: "none",
        boxShadow: `0 0 0 3px ${isDark ? "rgba(212, 169, 114, 0.3)" : "rgba(111, 78, 55, 0.3)"}`
      }
    },
    textarea: {
      padding: "1rem",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#d4a972" : "#6f4e37"}`,
      fontSize: "1rem",
      background: "transparent",
      color: isDark ? "#fff" : "#4B2C20",
      minHeight: "120px",
      transition: "all 0.3s ease"
    },
    fileInput: {
      padding: "1rem",
      color: isDark ? "#fff" : "#4B2C20",
      "&::file-selector-button": {
        padding: "0.5rem 1rem",
        background: isDark ? "#d4a972" : "#6f4e37",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)"
        }
      }
    },
    button: {
      padding: "1rem 2rem",
      backgroundColor: isDark ? "#d4a972" : "#6f4e37",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
      }
    },
    eventsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      padding: "1rem"
    },
    card: {
      background: isDark ? "rgba(40, 40, 40, 0.7)" : "rgba(255, 255, 255, 0.8)",
      padding: "1.5rem",
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: `1px solid ${isDark ? "rgba(212, 169, 114, 0.2)" : "rgba(111, 78, 55, 0.2)"}`,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
      }
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "1rem",
      border: `2px solid ${isDark ? "#d4a972" : "#6f4e37"}`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    },
    cardTitle: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
      color: isDark ? "#d4a972" : "#6f4e37",
      fontFamily: "'Playfair Display', serif"
    },
    cardDate: {
      fontSize: "0.9rem",
      color: isDark ? "#c4b7a6" : "#8c7261",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      "&:before": {
        content: '"⏳"',
        fontSize: "1.2rem"
      }
    },
    cardDescription: {
      fontSize: "1rem",
      color: isDark ? "#e0d7cc" : "#5a4a42",
      lineHeight: "1.6"
    }
  });

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📅 Événements du Café</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Titre de l'événement"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description détaillée..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          style={styles.fileInput}
          accept="image/*"
        />
        <button type="submit" style={styles.button}>
          Publier l'événement ☕
        </button>
      </form>

      <div style={styles.eventsContainer}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            {event.photo && (
              <img
                src={`http://localhost:4000/uploads/${event.photo}`}
                alt={event.title}
                style={styles.cardImage}
              />
            )}
            <h2 style={styles.cardTitle}>{event.title}</h2>
            <p style={styles.cardDate}>
              {new Date(event.date).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p style={styles.cardDescription}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;