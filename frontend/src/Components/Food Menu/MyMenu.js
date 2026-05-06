import React from "react";

const MyMenu = ({ description, img, title, price, onAddToCart }) => {
  return (
    <div className="p-2 lg:w-1/2 w-full">
      <div className="h-full flex items-center py-2 lg:py-3 rounded-lg">
        <img
          alt="menu-item"
          className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded mr-4"
          src={img} // Utiliser la prop `img` pour afficher l'image
        />
        <div className="flex-grow">
          <strong className="float-right font-black lg:text-2xl text-orange-400">
            {price}
          </strong>
          <h2 className="text-gray-900 title-font hero-text text-lg lg:text-2xl font-black mb-3">
            {title}
          </h2>
          <hr />
          <p className="text-gray-500 mt-2 italic">{description}</p>
          <button
            onClick={onAddToCart}
            className="bg-orange-400 text-white px-4 py-2 mt-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyMenu;