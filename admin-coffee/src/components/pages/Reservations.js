import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";

const Reservations = () => {
  const { isDarkMode } = useTheme();
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  // Charge les réservations et les événements au démarrage
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resReservations, resEvents] = await Promise.all([
        axios.get('http://localhost:4000/api/reservations'),
        axios.get('http://localhost:4000/api/events')
      ]);
      setReservations(resReservations.data);
      setEvents(resEvents.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Met à jour le statut d'une réservation et vérifie la capacité de l'événement
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/reservations/${id}`, { status: newStatus });
      const updatedReservations = reservations.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      );
      setReservations(updatedReservations);
      // Pour une réservation d'événement, vérifie la capacité après acceptation
      if (newStatus === "accepter") {
        await checkEventCapacity(updatedReservations);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Vérifie la capacité des événements ouverts et met à jour le statut à "fermer" si la capacité est atteinte.
  const checkEventCapacity = async (currentReservations) => {
    try {
      // Récupère la capacité totale du café via l'API
      const resCapacity = await axios.get('http://localhost:4000/api/events/capacity');
      const capacityValue = resCapacity.data.capacity || 150;

      // Pour chaque événement, calcule le nombre total de personnes réservées
      const eventData = events.reduce((acc, event) => {
        // On considère uniquement les événements ouverts
        if(event.statut === "ouvert") {
          acc[event.id] = {
            title: event.title,
            capacity: capacityValue, // capacité du café
            used: 0,
          };
        }
        return acc;
      }, {});

      currentReservations
        .filter(r => r.status === 'accepter' && r.event_id)
        .forEach(r => {
          if (eventData[r.event_id]) {
            // Le champ table_type représente le nombre de personnes réservées
            eventData[r.event_id].used += parseInt(r.table_type);
          }
        });

      const eventsToClose = [];
      Object.entries(eventData).forEach(([eventId, data]) => {
        if (data.used >= data.capacity) {
          eventsToClose.push(eventId);
        }
      });

      if (eventsToClose.length > 0) {
        await Promise.all(eventsToClose.map(id =>
          axios.put(`http://localhost:4000/api/events/${id}`, { statut: "fermer" })
        ));
        fetchData(); // Recharger les données
      }
    } catch (error) {
      console.error('Error checking capacity:', error);
    }
  };

  // Filtrage des réservations en fonction du type :
  // - 'all': toutes les réservations
  // - 'event': réclamations avec event_id et, en plus, on n'affiche que si l'événement est ouvert
  // - 'special': réservations avec special_request (et event_id est null)
  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    if (filter === 'special') return reservation.special_request && !reservation.event_id;
    if (filter === 'event') {
      if (!reservation.event_id) return false;
      const relatedEvent = events.find(e => e.id === reservation.event_id);
      return relatedEvent && relatedEvent.statut === "ouvert";
    }
    return true;
  });

  // Récupère les données de capacité pour chaque événement ouvert (pour affichage)
  const getEventCapacityData = () => {
    // On récupère la capacité via l'API capacity (id unique)
    // On suppose que capacity est récupéré dans checkEventCapacity, ici on fait une copie des events ouverts
    return events.filter(event => event.statut === "ouvert").map(event => ({
      id: event.id,
      title: event.title,
      capacity: event.capacity || 150, // si capacity n'est pas dans event, prendre 150
      used: reservations
              .filter(r => r.status === "accepter" && r.event_id === event.id)
              .reduce((sum, r) => sum + parseInt(r.table_type), 0)
    }));
  };

  const styles = getStyles(isDarkMode);
  const capacityData = getEventCapacityData();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Gestion des Réservations</h1>

      <div style={styles.filterContainer}>
        <button
          style={{ ...styles.filterButton, ...(filter === 'all' && styles.activeFilter) }}
          onClick={() => setFilter('all')}
        >
          Toutes ({reservations.length})
        </button>
        <button
          style={{ ...styles.filterButton, ...(filter === 'event' && styles.activeFilter) }}
          onClick={() => setFilter('event')}
        >
          Événements ({reservations.filter(r => r.event_id).length})
        </button>
        <button
          style={{ ...styles.filterButton, ...(filter === 'special' && styles.activeFilter) }}
          onClick={() => setFilter('special')}
        >
          Spéciales ({reservations.filter(r => r.special_request && !r.event_id).length})
        </button>
      </div>

      {/* Section Capacité des Événements */}
      <div style={styles.capacitySection}>
        <h3>Capacité des Événements (ouverts)</h3>
        {capacityData.map((event, index) => {
          const percentage = (event.used / event.capacity) * 100;
          return (
            <div key={event.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{event.title}</span>
                <span>{event.used}/{event.capacity}</span>
              </div>
              <div style={styles.capacityBar}>
                <div 
                  style={{
                    ...styles.capacityFill,
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: percentage >= 100 ? '#f44336' : '#4CAF50'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Liste des réservations */}
      {filteredReservations.map(reservation => (
        <div key={reservation.id} style={styles.reservationCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{reservation.name}</h3>
            <span style={{ ...styles.statusBadge, ...styles[reservation.status.replace(/\s/g, '')] }}>
              {reservation.status}
            </span>
          </div>
          
          <p style={styles.reservationDate}>
            📅 {new Date(reservation.date_time).toLocaleDateString('fr-FR', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
          
          <div style={styles.reservationDetails}>
            <div>
              📞 <strong>Téléphone:</strong> {reservation.mobile}
            </div>
            <div>
              👥 <strong>Personnes:</strong> {reservation.table_type}
            </div>
          </div>
          
          {reservation.event_id && (
            <div style={{ marginTop: '0.5rem' }}>
              🎪 <strong>Événement:</strong> {reservation.event_title || 'Événement non disponible'}
            </div>
          )}
          
          {reservation.special_request && (
            <div style={{ marginTop: '0.5rem' }}>
              📝 <strong>Demande spéciale:</strong> {reservation.special_request}
            </div>
          )}
          
          {reservation.status === 'en attente' && (
            <div style={styles.actionButtons}>
              <button
                style={{ ...styles.button, ...styles.acceptButton }}
                onClick={() => handleStatusChange(reservation.id, 'accepter')}
              >
                Accepter
              </button>
              <button
                style={{ ...styles.button, ...styles.rejectButton }}
                onClick={() => handleStatusChange(reservation.id, 'refuser')}
              >
                Refuser
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const getStyles = (isDark) => ({
  container: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '-80px auto',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: isDark ? "" : "#f7f7f7",
    color: isDark ? "#f4f4f4" : "#333",
    minHeight: '100vh',
    transition: "background 0.3s ease, color 0.3s ease",
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  filterButton: {
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isDark ? '#333' : '#ddd',
    color: isDark ? '#fff' : '#333'
  },
  activeFilter: {
    backgroundColor: isDark ? '#6d28d9' : '#4CAF50',
    color: 'white'
  },
  capacitySection: {
    backgroundColor: isDark ? '#2a2a2a' : '#fff',
    padding: '1.5rem',
    borderRadius: '15px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  capacityBar: {
    height: '15px',
    backgroundColor: isDark ? '#444' : '#eee',
    borderRadius: '10px',
    margin: '0.5rem 0',
    overflow: 'hidden'
  },
  capacityFill: {
    height: '100%',
    transition: 'width 0.5s ease',
    borderRadius: '10px'
  },
  reservationCard: {
    backgroundColor: isDark ? '#2a2a2a' : '#fff',
    padding: '1.5rem',
    borderRadius: '15px',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  pending: {
    backgroundColor: isDark ? '#ffeb3b' : '#fff3cd',
    color: isDark ? '#000' : '#856404'
  },
  accepted: {
    backgroundColor: isDark ? '#4CAF50' : '#d4edda',
    color: isDark ? '#fff' : '#155724'
  },
  rejected: {
    backgroundColor: isDark ? '#f44336' : '#f8d7da',
    color: isDark ? '#fff' : '#721c24'
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  button: {
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold'
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white'
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white'
  }
});

export default Reservations;
