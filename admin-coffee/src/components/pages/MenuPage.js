import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";

const MenuPage = () => {
  const { isDarkMode } = useTheme();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    desc: '',
    img: '',
    category: '',
    ingredients: []
  });

  // Récupérer les produits via l'API
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    axios.get('http://localhost:4000/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  };

  // Générer la liste des catégories uniques
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: 'g' }]
    }));
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingItem ? 'put' : 'post';
    const url = editingItem ? `http://localhost:4000/api/menu/${editingItem.id}` : 'http://localhost:4000/api/menu';

    axios[method](url, {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: JSON.stringify(formData.ingredients)
    })
    .then(() => {
      setShowForm(false);
      setEditingItem(null);
      fetchMenu();
    })
    .catch(error => console.error('Error saving item:', error));
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:4000/api/menu/${id}`)
      .then(fetchMenu)
      .catch(error => console.error('Error deleting item:', error));
  };

  const editItem = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      ingredients: JSON.parse(item.ingredients)
    });
    setShowForm(true);
  };

  

  // Déplacer les styles dans une fonction qui utilise isDarkMode
  const getStyles = (isDark) => ({
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '-80px auto',
      backgroundColor: isDark ? '#1a1a1a' : '#fff',
      color: isDark ? '#e0e0e0' : '#333',
      minHeight: '100vh'
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: isDark ? '#fff' : '#2c3e50'
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px 0',
      gap: '10px'
    },
    addButton: {
      padding: '10px 20px',
      backgroundColor: isDark ? '#388e3c' : '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)',
        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      backgroundColor: isDark ? '#2d2d2d' : 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '80%',
      maxWidth: '500px',
      color: isDark ? '#e0e0e0' : '#333'
    },
    ingredientRow: {
      display: 'flex',
      gap: '10px',
      margin: '10px 0',
      alignItems: 'center'
    },
    ingredientInput: {
      padding: '8px',
      width: '100%',
      border: `1px solid ${isDark ? '#444' : '#ccc'}`,
      borderRadius: '5px',
      backgroundColor: isDark ? '#404040' : '#fff',
      color: isDark ? '#fff' : '#333'
    },
    removeIngredientButton: {
      background: '#DC3545',
      border: 'none',
      color: 'white',
      padding: '8px',
      cursor: 'pointer',
      borderRadius: '5px'
    },
    addIngredientButton: {
      background: isDark ? '#8d6e63' : '#6D4C41',
      border: 'none',
      color: 'white',
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: '5px',
      marginTop: '10px'
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    menuItem: {
      background: isDark ? '#2d2d2d' : '#f4f4f4',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: isDark 
        ? '0px 2px 8px rgba(255,255,255,0.1)' 
        : '0px 2px 8px rgba(0,0,0,0.1)',
      border: isDark ? '1px solid #404040' : 'none'
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    itemTitle: {
      margin: '10px 0 5px 0',
      color: isDark ? '#fff' : '#2c3e50'
    },
    description: {
      fontSize: '14px',
      color: isDark ? '#b0b0b0' : '#555',
    },
    price: {
      fontWeight: 'bold',
      marginTop: '10px',
      color: isDark ? '#81c784' : '#2e7d32'
    },
    itemControls: {
      marginTop: '10px',
      display: 'flex',
      gap: '10px',
      justifyContent: 'center'
    },
    input: {
      padding: '10px',
      margin: '8px 0',
      width: '100%',
      borderRadius: '5px',
      border: `1px solid ${isDark ? '#444' : '#ccc'}`,
      backgroundColor: isDark ? '#404040' : '#fff',
      color: isDark ? '#fff' : '#333'
    },
    textarea: {
      padding: '10px',
      margin: '8px 0',
      width: '100%',
      borderRadius: '5px',
      border: `1px solid ${isDark ? '#444' : '#ccc'}`,
      backgroundColor: isDark ? '#404040' : '#fff',
      color: isDark ? '#fff' : '#333',
      minHeight: '80px'
    },
    select: {
      padding: '8px',
      fontSize: '16px',
      borderRadius: '5px',
      border: `1px solid ${isDark ? '#444' : '#ccc'}`,
      backgroundColor: isDark ? '#404040' : '#fff',
      color: isDark ? '#fff' : '#333'
    },
  });

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menu Management</h1>
      <div style={styles.controls}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <button 
          style={styles.addButton}
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            setFormData({
              title: '',
              price: '',
              desc: '',
              img: '',
              category: '',
              ingredients: []
            });
          }}
        >
          Add New Item
        </button>
      </div>

      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{editingItem ? 'Edit Item' : 'New Item'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              <textarea
                name="desc"
                placeholder="Description"
                value={formData.desc}
                onChange={handleInputChange}
                style={styles.textarea}
                required
              />
              <input
                name="img"
                placeholder="Image URL"
                value={formData.img}
                onChange={handleInputChange}
                style={styles.input}
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                style={styles.input}
              >
                <option value="">Select Category</option>
                {categories.filter(c => c !== 'All').map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>

              <div style={styles.ingredientsSection}>
                <h3>Ingredients:</h3>
                {formData.ingredients.map((ing, index) => (
                  <div key={index} style={styles.ingredientRow}>
                    <input
                      placeholder="Name"
                      value={ing.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      style={styles.ingredientInput}
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={ing.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      style={styles.ingredientInput}
                    />
                    <select
                      value={ing.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      style={styles.ingredientInput}
                    >
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                      <option value="pcs">pcs</option>
                    </select>
                    <button 
                      type="button"
                      onClick={() => removeIngredient(index)}
                      style={styles.removeIngredientButton}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addIngredient} style={styles.addIngredientButton}>
                  Add Ingredient
                </button>
              </div>

              <div style={styles.formButtons}>
                <button type="submit" style={styles.saveButton}>Save</button>
                <button type="button" onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.menuGrid}>
        {menuItems
          .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
          .map(item => (
            <div key={item.id} style={styles.menuItem}>
              <img src={item.img} alt={item.title} style={styles.image} />
              <h3 style={styles.itemTitle}>{item.title}</h3>
              <p style={styles.description}>{item.desc}</p>
              <p style={styles.price}>Price: {item.price} DA</p>
              <div style={styles.itemControls}>
                <button onClick={() => editItem(item)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuPage;