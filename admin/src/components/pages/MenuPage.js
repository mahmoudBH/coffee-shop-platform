import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../../context/ThemeProvider";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage, FaTag, FaMoneyBillWave, FaListUl } from 'react-icons/fa';

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

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    axios.get('http://localhost:4000/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  };

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
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      axios.delete(`http://localhost:4000/api/menu/${id}`)
        .then(fetchMenu)
        .catch(error => console.error('Error deleting item:', error));
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      ingredients: item.ingredients ? JSON.parse(item.ingredients) : []
    });
    setShowForm(true);
  };

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.header}>🍽️ Gestion du Menu</h1>
          <p style={styles.subtitle}>Gérez votre catalogue de produits, prix et ingrédients.</p>
        </div>
        <button 
          style={styles.addButton}
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            setFormData({
              title: '', price: '', desc: '', img: '', category: '', ingredients: []
            });
          }}
        >
          <FaPlus style={{marginRight: '8px'}} /> Ajouter un Produit
        </button>
      </div>

      <div style={styles.filterContainer}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            style={{
              ...styles.filterButton,
              ...(selectedCategory === cat ? styles.activeFilter : {})
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'All' ? 'Tous les produits' : cat}
          </button>
        ))}
      </div>

      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={{margin: 0}}>{editingItem ? 'Modifier le Produit' : 'Nouveau Produit'}</h2>
              <button style={styles.closeButton} onClick={() => setShowForm(false)}><FaTimes size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}><FaTag /> Nom du produit</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="Ex: Espresso Double"
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}><FaMoneyBillWave /> Prix (DA)</label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="Ex: 350"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}><FaListUl /> Catégorie</label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="Ex: Coffee, Tea, Dessert..."
                    list="category-options"
                  />
                  <datalist id="category-options">
                    {categories.filter(c => c !== 'All').map((cat, idx) => <option key={idx} value={cat} />)}
                  </datalist>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}><FaImage /> URL de l'image</label>
                  <input
                    name="img"
                    value={formData.img}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="/assets/menu/image.png"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  required
                  placeholder="Description appétissante du produit..."
                />
              </div>

              <div style={styles.ingredientsSection}>
                <h3 style={{fontSize: '1.1rem', marginBottom: '15px'}}>Ingrédients (Pour le Stock)</h3>
                {formData.ingredients.map((ing, index) => (
                  <div key={index} style={styles.ingredientRow}>
                    <input
                      placeholder="Nom (ex: Café en grain)"
                      value={ing.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      style={{...styles.input, flex: 2, margin: 0}}
                    />
                    <input
                      type="number"
                      placeholder="Qté"
                      value={ing.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      style={{...styles.input, flex: 1, margin: 0}}
                    />
                    <select
                      value={ing.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      style={{...styles.input, flex: 1, margin: 0}}
                    >
                      <option value="g">Grammes (g)</option>
                      <option value="ml">Millilitres (ml)</option>
                      <option value="pcs">Pièces (pcs)</option>
                    </select>
                    <button type="button" onClick={() => removeIngredient(index)} style={styles.removeIngredientButton}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addIngredient} style={styles.addIngredientButton}>
                  <FaPlus size={12} style={{marginRight: '5px'}}/> Ajouter un ingrédient
                </button>
              </div>

              <div style={styles.formButtons}>
                <button type="button" onClick={() => setShowForm(false)} style={styles.cancelButton}>Annuler</button>
                <button type="submit" style={styles.saveButton}>Sauvegarder</button>
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
              <div style={styles.imageWrapper}>
                <img src={item.img || "https://via.placeholder.com/300x200?text=No+Image"} alt={item.title} style={styles.image} />
                <span style={styles.categoryBadge}>{item.category}</span>
              </div>
              <div style={styles.cardContent}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <span style={styles.price}>{item.price} DA</span>
                </div>
                <p style={styles.description}>{item.desc}</p>
                <div style={styles.itemControls}>
                  <button onClick={() => editItem(item)} style={styles.editButton}><FaEdit /> Modifier</button>
                  <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}><FaTrash /> Supprimer</button>
                </div>
              </div>
            </div>
          ))}
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
    margin: "0 0 10px 0",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: isDark ? "#9ca3af" : "#6b7280",
    margin: 0,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    padding: '6px',
    backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
    borderRadius: '12px',
    width: 'fit-content'
  },
  filterButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'transparent',
    color: isDark ? '#d1d5db' : '#4b5563',
    fontWeight: '600',
  },
  activeFilter: {
    backgroundColor: isDark ? '#374151' : '#ffffff',
    color: isDark ? '#facc15' : '#6d28d9',
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  menuItem: {
    background: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: isDark ? "0 4px 6px -1px rgba(0,0,0,0.5)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
    border: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
  },
  imageWrapper: {
    position: 'relative',
    height: '200px',
    width: '100%',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    backdropFilter: 'blur(4px)'
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  itemTitle: {
    margin: '0 0 8px 0',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: isDark ? '#f3f4f6' : '#111827'
  },
  price: {
    fontWeight: '800',
    color: isDark ? '#facc15' : '#6d28d9',
    fontSize: '1.2rem'
  },
  description: {
    fontSize: '0.95rem',
    color: isDark ? '#9ca3af' : '#6b7280',
    lineHeight: '1.5',
    marginBottom: '20px',
    flex: 1
  },
  itemControls: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto',
    borderTop: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
    paddingTop: '16px'
  },
  editButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: isDark ? '#374151' : '#f3f4f6',
    color: isDark ? '#e5e7eb' : '#374151',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  deleteButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
  },
  modalHeader: {
    padding: '24px',
    borderBottom: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: isDark ? '#9ca3af' : '#6b7280',
    cursor: 'pointer'
  },
  form: {
    padding: '24px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
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
    minHeight: '100px',
    resize: 'vertical',
    outline: 'none',
  },
  ingredientsSection: {
    backgroundColor: isDark ? '#111827' : '#f9fafb',
    padding: '20px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
    marginBottom: '24px'
  },
  ingredientRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    alignItems: 'center'
  },
  removeIngredientButton: {
    background: '#ef4444',
    border: 'none',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addIngredientButton: {
    background: isDark ? '#374151' : '#e5e7eb',
    border: 'none',
    color: isDark ? '#f3f4f6' : '#1f2937',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: isDark ? '#d1d5db' : '#4b5563',
    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  saveButton: {
    padding: '12px 32px',
    backgroundColor: '#6d28d9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 4px 14px rgba(109, 40, 217, 0.3)'
  }
});

export default MenuPage;