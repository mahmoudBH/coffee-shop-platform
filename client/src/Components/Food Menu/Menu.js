import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MyMenu from "./MyMenu";
import Fade from "react-reveal/Fade";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { MenuData } from "./MenuData";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeSection, setActiveSection] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get("table") || "Unknown";

  useEffect(() => {
    // Remplacer l'appel API par les données statiques
    setMenuItems(MenuData);
    setFilteredItems(MenuData);
  }, []);
  
  

  // Filtrer les données en fonction de la catégorie sélectionnée
  const filterMenu = (section) => {
    setActiveSection(section);
    if (section === "All") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter((item) => item.category === section));
    }
  };

  // Ajouter un article au panier
  const handleAddToCart = (item) => {
    const itemWithNumericPrice = {
      ...item,
      price: parseFloat(item.price), // Convertir en nombre
    };
    setCart((prevCart) => [...prevCart, itemWithNumericPrice]);
  };

  // Supprimer un article du panier
  const handleRemoveFromCart = (index) =>
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));

  // Calculer le total du panier
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0).toFixed(0);

  // Passer la commande (désactivé pour la version 100% statique)
  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    alert("Ceci est une version statique du site. Le système de commande en ligne est désactivé.");
    setCart([]);
    setShowCart(false);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container lg:max-w-[1324px] px-5 py-20 mx-auto">
        <div className="flex flex-col text-center w-full mb-12 lg:mb-20">
          <p className="title-font text-orange-400 sec-heading font-medium text-3xl mb-2">
            Food Menu (Table {tableNumber})
          </p>
          <h1 className="font-nunito hero-text font-black text-black text-3xl lg:text-5xl">
            Most Popular Items
          </h1>
        </div>
        <div className="flex justify-center items-center mb-8">
          <div className="flex justify-center">
            {[
              "All",
              "Coffee",
              "Tea",
              "Juices & Cocktails",
              "Ice Cream",
              "Pastries",
              "Crepes",
              "Extras",
            ].map((section) => (
              <button
                key={section}
                onClick={() => filterMenu(section)}
                className={`mx-2 px-4 py-2 rounded-lg ${
                  activeSection === section ? "bg-orange-400 text-white" : "bg-gray-200"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          <div className="relative ml-4">
            <button onClick={() => setShowCart(!showCart)} className="flex items-center">
              <FaShoppingCart size={24} className="text-orange-400 mr-2" />
              <span className="text-lg font-bold">{cart.length}</span>
            </button>
            {showCart && (
              <div className="absolute right-0 top-16 bg-white shadow-lg rounded-lg w-80 p-4 z-50 max-h-96 overflow-y-auto">
                <h2 className="text-lg font-bold mb-3">Votre Panier</h2>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                      <div className="flex items-center w-2/3">
                        <img src={item.img} alt={item.title} className="w-12 h-12 rounded-md mr-3" />
                        <span className="text-gray-700 font-medium truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 font-medium mr-3 whitespace-nowrap">
                          {typeof item.price === "number" ? item.price.toFixed(0) : "N/A"}
                        </span>
                        <button onClick={() => handleRemoveFromCart(index)} className="text-red-500 text-lg">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {cart.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold">Total :</span>
                      <span className="text-lg font-bold">{calculateTotal()} Dinars</span>
                    </div>
                    <button onClick={handleOrder} className="mt-4 w-full bg-orange-400 text-white text-sm px-3 py-2 rounded-lg hover:bg-orange-500 transition-all">
                      Valider la Commande
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm mt-4">Votre panier est vide.</p>
                )}
              </div>
            )}
          </div>
        </div>
        <Fade bottom>
          <div className="flex flex-wrap -m-2">
            {filteredItems.map((item) => (
              <MyMenu
                key={item.id}
                img={item.img}
                description={item.desc}
                title={item.title}
                price={item.price}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Menu;