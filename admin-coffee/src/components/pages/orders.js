import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";
import { FiChevronDown, FiChevronUp, FiCheckCircle, FiClock } from "react-icons/fi";

const Commandes = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("day");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [processingPayment, setProcessingPayment] = useState(null);
  const { isDarkMode } = useTheme();

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
      color: isDarkMode ? "#fff" : "#2d2d2d",
    },
    title: {
      color: isDarkMode ? "#fff" : "#4B2C20",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    filterButton: (active) => ({
      background: active ? "linear-gradient(45deg, #6d28d9, #4B2C20)" : "transparent",
      color: active ? "#fff" : isDarkMode ? "#ccc" : "#666",
      padding: "12px 24px",
      border: `1px solid ${isDarkMode ? "#333" : "#eee"}`,
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }
    }),
    orderCard: {
      background: isDarkMode ? "rgba(40, 40, 40, 0.7)" : "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
      border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      ":hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
      }
    },
    statusIndicator: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      boxShadow: "0 0 8px currentColor"
    },
    paymentButton: {
      background: "linear-gradient(45deg, #4CAF50, #45a049)",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      ":hover": {
        transform: "scale(1.05)",
        boxShadow: "0 4px 12px rgba(76,175,80,0.3)"
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handlePayment = async (orderId) => {
    setProcessingPayment(orderId);
    try {
      // Optimistic UI update
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, payment_status: "paid" } 
            : order
        )
      );
      
      await axios.post(`http://localhost:4000/api/orders/${orderId}/pay`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du paiement", error);
      fetchOrders(); // Rollback if error
    } finally {
      setProcessingPayment(null);
    }
  };

  const filterOrders = (orders, filter) => {
    const now = new Date();
    return orders.filter((order) => {
      const orderDate = new Date(order.order_date);
      switch (filter) {
        case "day":
          return orderDate.toDateString() === now.toDateString();
        case "week": {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1));
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return orderDate >= startOfWeek && orderDate <= endOfWeek;
        }
        case "month":
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        case "year":
          return orderDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const renderItems = (items, orderId) => {
    const MAX_ITEMS = 3;
    const itemsArray = JSON.parse(items);
    const isExpanded = expandedOrders[orderId];
    const shouldTruncate = itemsArray.length > MAX_ITEMS && !isExpanded;

    return (
      <div style={{ marginTop: "16px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          color: isDarkMode ? "#ccc" : "#666"
        }}>
          <FiChevronDown size={16} />
          <h4 style={{ margin: 0 }}>Articles commandés</h4>
        </div>
        
        <div style={{
          display: "grid",
          gap: "8px",
          marginBottom: "12px"
        }}>
          {(shouldTruncate ? itemsArray.slice(0, MAX_ITEMS) : itemsArray).map((item, index) => (
            <div 
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                borderRadius: "8px",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontWeight: "500" }}>{item.name}</span>
              <span style={{ color: isDarkMode ? "#6d28d9" : "#4B2C20" }}>
                {item.price} €
              </span>
            </div>
          ))}
        </div>

        {itemsArray.length > MAX_ITEMS && (
          <button
            onClick={() => toggleExpand(orderId)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              color: isDarkMode ? "#6d28d9" : "#4B2C20",
              cursor: "pointer",
              padding: "8px 0",
              fontWeight: "600"
            }}
          >
            {isExpanded ? (
              <>
                <FiChevronUp size={16} />
                Voir moins
              </>
            ) : (
              <>
                <FiChevronDown size={16} />
                Voir plus ({itemsArray.length - MAX_ITEMS} autres articles)
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      padding: "32px",
      maxWidth: "1440px",
      margin: "-80px auto",
      minHeight: "100vh",
      ...dynamicStyles.container 
    }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 style={{ 
          fontSize: "32px",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "24px",
          ...dynamicStyles.title 
        }}>
          📋 Gestion des Commandes
        </h1>
        
        <div style={{ 
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap"
        }}>
          {["day", "week", "month", "year"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={dynamicStyles.filterButton(filter === f)}
            >
              {({
                day: "Aujourd'hui",
                week: "Cette semaine",
                month: "Ce mois",
                year: "Cette année",
              }[f])}
            </button>
          ))}
        </div>
      </header>

      <main>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "24px",
          padding: "16px"
        }}>
          {filterOrders(orders, filter).map((order) => {
            // Calcul du prix total à partir des items
            const itemsArray = JSON.parse(order.items);
            const totalPrice = itemsArray.reduce((acc, item) => acc + item.price, 0);

            return (
              <article 
                key={order.id}
                style={dynamicStyles.orderCard}
              >
                <div style={{ marginBottom: "20px" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px"
                  }}>
                    <h3 style={{ 
                      fontSize: "20px",
                      fontWeight: "700",
                      margin: 0,
                      color: isDarkMode ? "#fff" : "#2d2d2d"
                    }}>
                      Commande #{order.id}
                    </h3>
                    <div style={{
                      ...dynamicStyles.statusIndicator,
                      background: order.payment_status === "paid" ? "#4CAF50" : "#F44336",
                      boxShadow: `0 0 12px ${order.payment_status === "paid" ? "#4CAF50" : "#F44336"}`
                    }} />
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                    color: isDarkMode ? "#ccc" : "#666"
                  }}>
                    <div>
                      <label style={{ fontSize: "12px" }}>Table</label>
                      <p style={{ margin: 0, fontWeight: "500" }}>#{order.table_number}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px" }}>Date</label>
                      <p style={{ margin: 0, fontWeight: "500" }}>
                        {new Date(order.order_date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {renderItems(order.items, order.id)}

                {/* Affichage du prix total */}
                <div style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: `1px solid ${isDarkMode ? "#333" : "#eee"}`,
                  display: "flex",
                  justifyContent: "flex-end",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: isDarkMode ? "#fff" : "#2d2d2d"
                }}>
                  Total : {totalPrice.toFixed(0)} €
                </div>

                <div style={{ 
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: `1px solid ${isDarkMode ? "#333" : "#eee"}`
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {order.payment_status === "paid" ? (
                      <FiCheckCircle size={24} color="#4CAF50" />
                    ) : (
                      <FiClock size={24} color="#F44336" />
                    )}
                    <span style={{
                      fontWeight: "600",
                      color: isDarkMode ? "#fff" : "#2d2d2d"
                    }}>
                      {order.payment_status === "paid" ? "Payée" : "En attente"}
                    </span>
                  </div>
                  
                  {order.payment_status === "unpaid" && (
                    <button
                      onClick={() => handlePayment(order.id)}
                      style={dynamicStyles.paymentButton}
                      disabled={processingPayment === order.id}
                    >
                      {processingPayment === order.id ? (
                        <div className="spinner"></div>
                      ) : (
                        "Marquer comme payée"
                      )}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Commandes;
