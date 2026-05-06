import coffee1 from '../../assests/menu/Coffee/coffee-1.png';
import coffee2 from '../../assests/menu/Coffee/coffee-2.png';
import tea1 from '../../assests/menu/Tea/tea-1.png';
import juice1 from '../../assests/menu/Juices/juice-1.jpg';
import icecream1 from '../../assests/menu/Ice/icecream-1.jpg';
import pastries1 from '../../assests/menu/Pastries/pastries-1.jpg';
import crepes1 from '../../assests/menu/Crepes/crepes-1.jpg';
import extras1 from '../../assests/menu/Extras/extras-1.jpg';

export const MenuData = [
  {
    id: 1,
    title: "Classic Espresso",
    category: "Coffee",
    price: 3.5,
    desc: "Un espresso riche et intense pour bien commencer la journée.",
    img: coffee1
  },
  {
    id: 2,
    title: "Cappuccino Mousse",
    category: "Coffee",
    price: 5.0,
    desc: "Un délicieux cappuccino avec une mousse de lait onctueuse.",
    img: coffee2
  },
  {
    id: 3,
    title: "Thé Vert Menthe",
    category: "Tea",
    price: 4.0,
    desc: "Thé vert infusé avec de la menthe fraîche.",
    img: tea1
  },
  {
    id: 4,
    title: "Jus d'Orange Pressé",
    category: "Juices & Cocktails",
    price: 6.0,
    desc: "100% pur jus d'oranges pressées.",
    img: juice1
  },
  {
    id: 5,
    title: "Coupe Glacée Vanille",
    category: "Ice Cream",
    price: 7.5,
    desc: "Trois boules de glace vanille avec coulis de chocolat.",
    img: icecream1
  },
  {
    id: 6,
    title: "Croissant au Beurre",
    category: "Pastries",
    price: 2.5,
    desc: "Un croissant frais et croustillant.",
    img: pastries1
  },
  {
    id: 7,
    title: "Crêpe Nutella Banane",
    category: "Crepes",
    price: 6.5,
    desc: "Une crêpe gourmande fourrée au Nutella et morceaux de banane.",
    img: crepes1
  },
  {
    id: 8,
    title: "Extra Sirop Caramel",
    category: "Extras",
    price: 1.0,
    desc: "Dose supplémentaire de sirop pour vos boissons.",
    img: extras1
  }
];
