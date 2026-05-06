import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les données des commandes depuis l'API
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des commandes');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;

  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div>
      <h1>Liste des Commandes</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Table Number</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.table_number}</td>
              <td>
                <ul>
                  {JSON.parse(order.items).map((item, index) => (
                    <li key={index}>
                      <strong>{item.title}:</strong> {item.price} - {item.desc}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.total_price}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
