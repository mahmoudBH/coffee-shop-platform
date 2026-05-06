-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 03 avr. 2025 à 23:42
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restoran`
--

-- --------------------------------------------------------

--
-- Structure de la table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` text DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ingredients`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `menu`
--

INSERT INTO `menu` (`id`, `price`, `title`, `desc`, `img`, `category`, `ingredients`) VALUES
(1, 2500.00, 'Espresso', 'Strong and rich espresso shot', './../../assests/menu/coffee-1.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 50, \"unit\": \"ml\"}]'),
(2, 2000.00, 'Filter Coffee', 'Freshly brewed filter coffee', '/menu/coffee-2.jpg', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(3, 2500.00, 'Americano', 'Espresso with hot water', '/menu/coffee-3.jpg', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 100, \"unit\": \"ml\"}]'),
(4, 3000.00, 'Turkish Coffee', 'Traditional Turkish coffee', '/menu/coffee-4.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 18, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 60, \"unit\": \"ml\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}]'),
(5, 3500.00, 'Café au Lait', 'Coffee with steamed milk', '/menu/coffee-5.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Milk\", \"quantity\": 150, \"unit\": \"ml\"}]'),
(6, 3000.00, 'Cappuccino', 'Espresso with milk foam', '/menu/coffee-6.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Whipped Cream\", \"quantity\": 30, \"unit\": \"g\"}]'),
(7, 3500.00, 'Caramel Coffee', 'Coffee with caramel flavor', '/menu/coffee-7.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Caramel Syrup\", \"quantity\": 10, \"unit\": \"ml\"}]'),
(8, 3500.00, 'Hazelnut Coffee', 'Coffee with hazelnut flavor', '/menu/coffee-8.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Mint Syrup\", \"quantity\": 10, \"unit\": \"ml\"}]'),
(9, 3500.00, 'Chocolate Coffee', 'Coffee with chocolate flavor', '/menu/coffee-9.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Chocolate Powder\", \"quantity\": 10, \"unit\": \"g\"}]'),
(10, 3000.00, 'Iced Coffee', 'Cold and refreshing coffee', '/menu/coffee-10.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}]'),
(11, 2500.00, 'Green Tea', 'Healthy and refreshing green tea', '/menu/tea-1.png', 'Tea', '[{\"name\": \"Green Tea\", \"quantity\": 5, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(12, 3000.00, 'Mint Tea', 'Fresh mint-infused tea', '/menu/tea-2.png', 'Tea', '[{\"name\": \"Black Tea\", \"quantity\": 5, \"unit\": \"g\"}, {\"name\": \"Mint Syrup\", \"quantity\": 10, \"unit\": \"ml\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(13, 3000.00, 'Almond Tea', 'Tea infused with almond flavor', '/menu/tea-3.png', 'Tea', '[{\"name\": \"Black Tea\", \"quantity\": 5, \"unit\": \"g\"}, {\"name\": \"Almonds\", \"quantity\": 10, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(14, 3500.00, 'Pine Nut Tea', 'Tea topped with pine nuts', '/menu/tea-4.png', 'Tea', '[{\"name\": \"Black Tea\", \"quantity\": 5, \"unit\": \"g\"}, {\"name\": \"Pine Nuts\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(15, 5000.00, 'Baklava Tea', 'Sweet tea inspired by baklava flavors', '/menu/tea-5.png', 'Tea', '[{\"name\": \"Black Tea\", \"quantity\": 5, \"unit\": \"g\"}, {\"name\": \"Honey\", \"quantity\": 15, \"unit\": \"ml\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(16, 3500.00, 'Lemonade', 'Fresh and zesty homemade lemonade', '/menu/juice-1.jpg', 'Juices & Cocktails', '[{\"name\": \"Lime\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Sugar\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 300, \"unit\": \"ml\"}]'),
(17, 5000.00, 'Strawberry Juice', 'Sweet and refreshing strawberry juice', '/menu/juice-2.jpg', 'Juices & Cocktails', '[{\"name\": \"Strawberries\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(18, 4500.00, 'Orange Juice', 'Freshly squeezed orange juice', '/menu/juice-3.jpg', 'Juices & Cocktails', '[{\"name\": \"Oranges\", \"quantity\": 3, \"unit\": \"pcs\"}]'),
(19, 5000.00, 'Banana Juice', 'Smooth and creamy banana juice', '/menu/juice-4.jpg', 'Juices & Cocktails', '[{\"name\": \"Bananas\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Milk\", \"quantity\": 200, \"unit\": \"ml\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}]'),
(20, 6000.00, 'Kiwi Juice', 'Tangy and refreshing kiwi juice', '/menu/juice-5.jpg', 'Juices & Cocktails', '[{\"name\": \"Kiwis\", \"quantity\": 3, \"unit\": \"pcs\"}, {\"name\": \"Sugar\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(21, 7000.00, 'Cocktail Juice', 'Mixed fruit juice cocktail', '/menu/juice-6.jpg', 'Juices & Cocktails', '[{\"name\": \"Oranges\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Strawberries\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Kiwis\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Sugar\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(22, 8000.00, 'Milkshake', 'Creamy milkshake with your choice of flavor', '/menu/juice-7.jpg', 'Juices & Cocktails', '[{\"name\": \"Milk\", \"quantity\": 300, \"unit\": \"ml\"}, {\"name\": \"Ice Cream\", \"quantity\": 2, \"unit\": \"scoops\"}, {\"name\": \"Flavor Syrup\", \"quantity\": 20, \"unit\": \"ml\"}]'),
(23, 6000.00, 'Hot Chocolate', 'Rich and comforting hot chocolate', '/menu/juice-8.jpg', 'Juices & Cocktails', '[{\"name\": \"Milk\", \"quantity\": 200, \"unit\": \"ml\"}, {\"name\": \"Chocolate Powder\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}]'),
(24, 5000.00, 'Eggnog', 'Classic creamy eggnog', '/menu/juice-9.jpg', 'Juices & Cocktails', '[{\"name\": \"Milk\", \"quantity\": 200, \"unit\": \"ml\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Sugar\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Vanilla Syrup\", \"quantity\": 10, \"unit\": \"ml\"}]'),
(25, 7000.00, 'Mojito', 'Refreshing mint and lime mojito', '/menu/juice-10.jpg', 'Juices & Cocktails', '[{\"name\": \"Lime\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Mint Syrup\", \"quantity\": 15, \"unit\": \"ml\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 200, \"unit\": \"ml\"}]'),
(26, 5000.00, '2 Scoops', 'Two scoops of ice cream', '/menu/icecream-1.jpg', 'Ice Cream', '[{\"name\": \"Ice Cream\", \"quantity\": 2, \"unit\": \"scoops\"}]'),
(27, 6000.00, '3 Scoops', 'Three scoops of ice cream', '/menu/icecream-2.jpg', 'Ice Cream', '[{\"name\": \"Ice Cream\", \"quantity\": 3, \"unit\": \"scoops\"}]'),
(28, 8000.00, 'Special Ice Cream', 'Deluxe ice cream selection', '/menu/icecream-3.jpg', 'Ice Cream', '[{\"name\": \"Ice Cream\", \"quantity\": 3, \"unit\": \"scoops\"}, {\"name\": \"Whipped Cream\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Chocolate Syrup\", \"quantity\": 15, \"unit\": \"ml\"}]'),
(29, 5000.00, 'Cakes', 'Delicious and fluffy assorted cakes', '/menu/pastries-1.jpg', 'Pastries', '[{\"name\": \"Flour\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Butter\", \"quantity\": 30, \"unit\": \"g\"}]'),
(30, 7000.00, 'Fondant', 'Rich chocolate fondant with a molten center', '/menu/pastries-2.jpg', 'Pastries', '[{\"name\": \"Chocolate Powder\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Flour\", \"quantity\": 30, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 40, \"unit\": \"g\"}, {\"name\": \"Butter\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}]'),
(31, 6500.00, 'Chocolate Mousse', 'Smooth and creamy chocolate mousse', '/menu/pastries-3.jpg', 'Pastries', '[{\"name\": \"Chocolate Powder\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Whipped Cream\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 20, \"unit\": \"g\"}]'),
(32, 7000.00, 'Tiramisu', 'Classic Italian dessert with mascarpone and coffee', '/menu/pastries-4.jpg', 'Pastries', '[{\"name\": \"Mascarpone\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Coffee Beans\", \"quantity\": 10, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Sugar\", \"quantity\": 30, \"unit\": \"g\"}, {\"name\": \"Biscuits\", \"quantity\": 50, \"unit\": \"g\"}]'),
(33, 8000.00, 'Cheesecake', 'Creamy cheesecake with a biscuit crust', '/menu/pastries-5.jpg', 'Pastries', '[{\"name\": \"Cream Cheese\", \"quantity\": 150, \"unit\": \"g\"}, {\"name\": \"Biscuits\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 40, \"unit\": \"g\"}, {\"name\": \"Butter\", \"quantity\": 30, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}]'),
(34, 2000.00, 'Croissant', 'Flaky and buttery French croissant', '/menu/pastries-6.jpg', 'Pastries', '[{\"name\": \"Flour\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Butter\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Yeast\", \"quantity\": 5, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}]'),
(35, 4000.00, 'Classic Cake', 'Soft and moist classic cake', '/menu/pastries-7.jpg', 'Pastries', '[{\"name\": \"Flour\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Butter\", \"quantity\": 30, \"unit\": \"g\"}]'),
(36, 6500.00, 'Chocolate Cake', 'Decadent chocolate cake with rich frosting', '/menu/pastries-8.jpg', 'Pastries', '[{\"name\": \"Flour\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Chocolate Powder\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 60, \"unit\": \"g\"}, {\"name\": \"Butter\", \"quantity\": 40, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 3, \"unit\": \"pcs\"}]'),
(37, 5000.00, 'Waffles', 'Crispy waffles served with toppings of your choice', '/menu/pastries-9.jpg', 'Pastries', '[{\"name\": \"Flour\", \"quantity\": 100, \"unit\": \"g\"}, {\"name\": \"Sugar\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Butter\", \"quantity\": 30, \"unit\": \"g\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}]'),
(38, 5000.00, 'Sweet Crepe', 'Deliciously sweet crepe with sugar and toppings', '/menu/crepes-1.jpg', 'Crepes', '[{\"name\": \"Flour\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Sugar\", \"quantity\": 10, \"unit\": \"g\"}]'),
(39, 6000.00, 'Chocolate Crepe', 'Crepe filled with rich chocolate', '/menu/crepes-2.jpg', 'Crepes', '[{\"name\": \"Flour\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Chocolate Powder\", \"quantity\": 20, \"unit\": \"g\"}]'),
(40, 7000.00, 'Nutella Crepe', 'Crepe filled with Nutella and other sweet toppings', '/menu/crepes-3.jpg', 'Crepes', '[{\"name\": \"Flour\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Nutella\", \"quantity\": 30, \"unit\": \"g\"}]'),
(41, 6500.00, 'Oreo Crepe', 'Crepe filled with crushed Oreos and cream', '/menu/crepes-4.jpg', 'Crepes', '[{\"name\": \"Flour\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Oreo\", \"quantity\": 3, \"unit\": \"pcs\"}, {\"name\": \"Whipped Cream\", \"quantity\": 20, \"unit\": \"g\"}]'),
(42, 5500.00, 'Cheese Crepe', 'Savory crepe filled with melted cheese', '/menu/crepes-5.jpg', 'Crepes', '[{\"name\": \"Flour\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Cheese\", \"quantity\": 50, \"unit\": \"g\"}]'),
(43, 6000.00, 'Tuna Crepe', 'Savory crepe filled with tuna and vegetables', '/menu/crepes-6.jpg', 'Crepes', '[{\"name\": \"Flour\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Eggs\", \"quantity\": 1, \"unit\": \"pc\"}, {\"name\": \"Milk\", \"quantity\": 100, \"unit\": \"ml\"}, {\"name\": \"Tuna\", \"quantity\": 50, \"unit\": \"g\"}, {\"name\": \"Vegetables\", \"quantity\": 30, \"unit\": \"g\"}]'),
(44, 1500.00, 'Half Liter Water', 'Refreshing half liter bottle of water', '/menu/extras-1.jpg', 'Extras', '[{\"name\": \"Mineral Water\", \"quantity\": 500, \"unit\": \"ml\"}]'),
(45, 2500.00, '1 Liter Water', 'Refreshing 1 liter bottle of water', '/menu/extras-2.jpg', 'Extras', '[{\"name\": \"Mineral Water\", \"quantity\": 1000, \"unit\": \"ml\"}]'),
(46, 10000.00, 'Shisha', 'Traditional shisha for a relaxing experience', '/menu/extras-3.jpg', 'Extras', '[{\"name\": \"Shisha Tobacco\", \"quantity\": 20, \"unit\": \"g\"}, {\"name\": \"Charcoal\", \"quantity\": 2, \"unit\": \"pcs\"}, {\"name\": \"Mineral Water\", \"quantity\": 500, \"unit\": \"ml\"}]');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
