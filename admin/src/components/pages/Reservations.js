import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";
import { FaCheck, FaTimes, FaCalendarAlt, FaUser, FaPhoneAlt, FaStar, FaInfoCircle } from 'react-icons/fa';

const Reservations = () => {
  const { isDarkMode } = useTheme();
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/reservations/${id}`, { status: newStatus });
      const updatedReservations = reservations.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      );
      setReservations(updatedReservations);
      if (newStatus === "accepter") {
        await checkEventCapacity(updatedReservations);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const checkEventCapacity = async (currentReservations) => {
    try {
      const resCapacity = await axios.get('http://localhost:4000/api/events/capacity');
      const capacityValue = resCapacity.data.capacity || 150;

      const eventData = events.reduce((acc, event) => {
        if(event.statut === "ouvert") {
          acc[event.id] = { title: event.title, capacity: capacityValue, used: 0 };
        }
        return acc;
      }, {});

      currentReservations
        .filter(r => r.status === 'accepter' && r.event_id)
        .forEach(r => {
          if (eventData[r.event_id]) {
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
        fetchData();
      }
    } catch (error) {
      console.error('Error checking capacity:', error);
    }
  };

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

  const getEventCapacityData = () => {
    return events.filter(event => event.statut === "ouvert").map(event => ({
      id: event.id,
      title: event.title,
      capacity: event.capacity || 150,
      used: reservations
              .filter(r => r.status === "accepter" && r.event_id === event.id)
              .reduce((sum, r) => sum + parseInt(r.table_type), 0)
    }));
  };

  const styles = getStyles(isDarkMode);
  const capacityData = getEventCapacityData();

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.header}>Gestion des Réservations</h1>
        <div style={styles.filterContainer}>
          {[
            { id: 'all', label: 'Toutes', count: reservations.length },
            { id: 'event', label: 'Événements', count: reservations.filter(r => r.event_id).length },
            { id: 'special', label: 'Spéciales', count: reservations.filter(r => r.special_request && !r.event_id).length }
          ].map(f => (
            <button
              key={f.id}
              style={{ ...styles.filterButton, ...(filter === f.id ? styles.activeFilter : {}) }}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span style={styles.badge}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {capacityData.length > 0 && (
        <div style={styles.capacitySection}>
          <h3 style={styles.sectionTitle}><FaStar style={{marginRight: '8px', color: '#facc15'}}/> Capacité des Événements</h3>
          <div style={styles.capacityGrid}>
            {capacityData.map((event) => {
              const percentage = (event.used / event.capacity) * 100;
              const isFull = percentage >= 100;
              return (
                <div key={event.id} style={styles.capacityCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{event.title}</span>
                    <span style={{ fontWeight: 'bold', color: isFull ? '#ef4444' : (isDarkMode ? '#a7f3d0' : '#059669') }}>
                      {event.used} / {event.capacity}
                    </span>
                  </div>
                  <div style={styles.capacityBar}>
                    <div 
                      style={{
                        ...styles.capacityFill,
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isFull ? '#ef4444' : '#10b981',
                        boxShadow: `0 0 10px ${isFull ? '#ef4444' : '#10b981'}80`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {filteredReservations.map(reservation => {
          const statusFormatted = reservation.status.replace(/\s/g, '').toLowerCase();
          const isPending = statusFormatted === 'enattente';
          const isAccepted = statusFormatted === 'accepter';
          const isRejected = statusFormatted === 'refuser';

          return (
            <div key={reservation.id} style={styles.reservationCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.clientName}>{reservation.name}</h3>
                <span style={{ 
                  ...styles.statusBadge, 
                  ...(isPending ? styles.pending : isAccepted ? styles.accepted : styles.rejected)
                }}>
                  {reservation.status.toUpperCase()}
                </span>
              </div>
              
              <div style={styles.detailsGrid}>
                <div style={styles.detailRow}>
                  <FaCalendarAlt style={styles.icon} />
                  <span>{new Date(reservation.date_time).toLocaleDateString('fr-FR', {
                    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                  })}</span>
                </div>
                <div style={styles.detailRow}>
                  <FaPhoneAlt style={styles.icon} />
                  <span>{reservation.mobile}</span>
                </div>
                <div style={styles.detailRow}>
                  <FaUser style={styles.icon} />
                  <span>{reservation.table_type} Personnes</span>
                </div>
              </div>
              
              {reservation.event_id && (
                <div style={styles.specialBox}>
                  <FaStar style={{color: '#facc15', marginRight: '8px'}} />
                  <span><strong>Événement :</strong> {reservation.event_title || 'Non disponible'}</span>
                </div>
              )}
              
              {reservation.special_request && (
                <div style={{...styles.specialBox, backgroundColor: isDarkMode ? '#374151' : '#f3f4f6'}}>
                  <FaInfoCircle style={{color: '#3b82f6', marginRight: '8px'}} />
                  <span><strong>Demande :</strong> {reservation.special_request}</span>
                </div>
              )}
              
              {isPending && (
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.button, ...styles.acceptButton }}
                    onClick={() => handleStatusChange(reservation.id, 'accepter')}
                  >
                    <FaCheck /> Accepter
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.rejectButton }}
                    onClick={() => handleStatusChange(reservation.id, 'refuser')}
                  >
                    <FaTimes /> Refuser
                  </button>
                </div>
              )}
            </div>
          );
        })}
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
    margin: 0,
    letterSpacing: "-1px",
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    background: isDark ? "#1f2937" : "#e5e7eb",
    padding: "6px",
    borderRadius: "12px",
  },
  filterButton: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'transparent',
    color: isDark ? '#d1d5db' : '#4b5563',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  activeFilter: {
    backgroundColor: isDark ? '#374151' : '#ffffff',
    color: isDark ? '#facc15' : '#6d28d9',
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  badge: {
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.8rem'
  },
  capacitySection: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    marginBottom: '30px',
    boxShadow: isDark ? "0 4px 6px -1px rgba(0, 0, 0, 0.5)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center'
  },
  capacityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  capacityCard: {
    background: isDark ? '#111827' : '#f9fafb',
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
  },
  capacityBar: {
    height: '8px',
    backgroundColor: isDark ? '#374151' : '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  capacityFill: {
    height: '100%',
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '4px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px'
  },
  reservationCard: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: isDark ? "0 4px 6px -1px rgba(0, 0, 0, 0.5)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
    display: 'flex',
    flexDirection: 'column',
    transition: "transform 0.3s ease",
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  clientName: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: '700'
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '0.5px'
  },
  pending: {
    backgroundColor: isDark ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
    color: isDark ? '#fcd34d' : '#d97706'
  },
  accepted: {
    backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5',
    color: isDark ? '#6ee7b7' : '#059669'
  },
  rejected: {
    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2',
    color: isDark ? '#fca5a5' : '#dc2626'
  },
  detailsGrid: {
    display: 'grid',
    gap: '12px',
    marginBottom: '16px'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95rem',
    color: isDark ? '#9ca3af' : '#4b5563'
  },
  icon: {
    marginRight: '12px',
    color: isDark ? '#6d28d9' : '#8b5cf6',
    fontSize: '1.1rem'
  },
  specialBox: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: isDark ? 'rgba(250, 204, 21, 0.1)' : '#fef9c3',
    marginBottom: '12px',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`
  },
  button: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '700',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  },
  acceptButton: {
    backgroundColor: '#10b981',
    color: 'white',
    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
  },
  rejectButton: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444'
  }
});

export default Reservations;
