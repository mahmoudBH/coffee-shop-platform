import React, { useState, useEffect } from "react";
import axios from "axios";

const StockManager = () => {
  const [stock, setStock] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Nouvel état pour la recherche

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/stock");
      setStock(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des stocks", error);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.quantity <= 0) {
      alert("Veuillez entrer un nom et une quantité valide.");
      return;
    }
    try {
      await axios.post("http://localhost:4000/api/stock", newProduct);
      setNewProduct({ name: "", quantity: 0 });
      fetchStock(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/stock/${id}`);
      fetchStock(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:4000/api/stock/${id}`, { quantity });
      fetchStock(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Mettre à jour la valeur de recherche
  };

  const filteredStock = stock.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrer par nom de produit
  );

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={styles.container}>
      <h1>Gérer mes Stocks</h1>

      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantité"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddProduct} style={styles.button}>Ajouter un produit</button>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher un produit"
          value={searchQuery}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Ingrédient</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStock.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  style={styles.input}
                />
              </td>
              <td>
                <button
                  onClick={() => handleDeleteProduct(item.id)}
                  style={styles.deleteButton}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "-80px auto",
    textAlign: "center",
  },
  formContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    textAlign: "left",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
  },
};

export default StockManager;
