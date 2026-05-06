import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";
import { FaCalendarPlus, FaCalendarAlt, FaImage, FaAlignLeft, FaClock } from "react-icons/fa";

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

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.header}>🎉 Événements du Café</h1>
          <p style={styles.subtitle}>Gérez les événements spéciaux et les soirées à thème.</p>
        </div>
      </div>

      <div style={styles.layout}>
        {/* Formulaire d'ajout */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}><FaCalendarPlus /> Nouvel Événement</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}><FaCalendarAlt /> Titre</label>
              <input
                type="text"
                placeholder="Ex: Soirée Jazz & Café"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}><FaClock /> Date et Heure</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}><FaAlignLeft /> Description</label>
              <textarea
                placeholder="Détails de l'événement..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}><FaImage /> Affiche / Photo</label>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                style={styles.fileInput}
                accept="image/*"
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Publier l'événement
            </button>
          </form>
        </div>

        {/* Liste des événements */}
        <div style={styles.eventsGrid}>
          {events.map((event) => (
            <div key={event.id} style={styles.card}>
              <div style={styles.cardImageWrapper}>
                {event.photo ? (
                  <img
                    src={`http://localhost:4000/uploads/${event.photo}`}
                    alt={event.title}
                    style={styles.cardImage}
                  />
                ) : (
                  <div style={styles.noImagePlaceholder}>
                    <FaImage size={40} opacity={0.3} />
                  </div>
                )}
                <span style={{
                  ...styles.statusBadge, 
                  backgroundColor: event.statut === 'fermer' ? '#ef4444' : '#10b981'
                }}>
                  {event.statut === 'fermer' ? 'Complet' : 'Ouvert'}
                </span>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{event.title}</h3>
                <div style={styles.cardDate}>
                  <FaClock style={{marginRight: '8px', color: isDarkMode ? '#facc15' : '#6d28d9'}} />
                  {new Date(event.date).toLocaleString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <p style={styles.cardDescription}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getStyles = (isDark) => ({
  container: {
    padding: '30px',
    maxWidth: '1400px',
    margin: '-80px auto',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: isDark ? "#121212" : "#f8f9fa",
    color: isDark ? "#f3f4f6" : "#1f2937",
    minHeight: '100vh',
    transition: "all 0.3s ease",
  },
  headerSection: {
    marginBottom: '30px',
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
  layout: {
    display: 'flex',
    gap: '30px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  formContainer: {
    flex: '1 1 350px',
    position: 'sticky',
    top: '20px',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: isDark ? "0 4px 6px -1px rgba(0, 0, 0, 0.5)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
  },
  formTitle: {
    margin: '0 0 20px 0',
    fontSize: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    fontSize: '0.9rem',
    color: isDark ? '#d1d5db' : '#4b5563',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
    backgroundColor: isDark ? '#111827' : '#f9fafb',
    color: isDark ? '#f3f4f6' : '#111827',
    fontSize: '1rem',
    outline: 'none',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
    backgroundColor: isDark ? '#111827' : '#f9fafb',
    color: isDark ? '#f3f4f6' : '#111827',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    outline: 'none',
  },
  fileInput: {
    padding: '10px',
    backgroundColor: isDark ? '#111827' : '#f9fafb',
    border: `1px dashed ${isDark ? '#4b5563' : '#d1d5db'}`,
    borderRadius: '8px',
    color: isDark ? '#d1d5db' : '#4b5563',
    cursor: 'pointer'
  },
  submitButton: {
    marginTop: '10px',
    padding: '14px',
    backgroundColor: '#6d28d9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    transition: 'all 0.2s',
    boxShadow: '0 4px 14px rgba(109, 40, 217, 0.3)'
  },
  eventsGrid: {
    flex: '2 1 600px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    background: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: isDark ? "0 4px 6px -1px rgba(0,0,0,0.5)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
    border: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
  },
  cardImageWrapper: {
    position: 'relative',
    height: '200px',
    width: '100%',
    backgroundColor: isDark ? '#111827' : '#f3f4f6'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  noImagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? '#374151' : '#e5e7eb'
  },
  statusBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '700',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: '1.3rem',
    fontWeight: '800',
    color: isDark ? '#f3f4f6' : '#111827'
  },
  cardDate: {
    fontSize: '0.9rem',
    color: isDark ? '#9ca3af' : '#6b7280',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontWeight: '600'
  },
  cardDescription: {
    fontSize: '0.95rem',
    color: isDark ? '#d1d5db' : '#4b5563',
    lineHeight: '1.6',
    margin: 0
  }
});

export default Event;