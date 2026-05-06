-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 14 avr. 2025 à 23:16
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `coffee_shop`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`) VALUES
(1, 'admin@admin.com', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `capacity`
--

CREATE TABLE `capacity` (
  `id` int(11) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `capacity`
--

INSERT INTO `capacity` (`id`, `capacity`) VALUES
(1, 150);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `statut` enum('ouvert','fermé') NOT NULL DEFAULT 'ouvert'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `description`, `photo`, `statut`) VALUES
(1, 'Café Open Mic', '2025-04-20 18:00', 'Venez partager vos talents lors de notre soirée Open Mic au Coffee Shop.', 'openmic.jpg', 'ouvert'),
(2, 'Happy Hour', '2025-04-21 16:00', 'Profitez de réductions exceptionnelles sur nos boissons pendant l\'Happy Hour.', 'happyhour.jpg', 'ouvert'),
(3, 'Atelier de Dégustation', '2025-04-07 15:00', 'Participez à notre atelier de dégustation de cafés d\'origine pour découvrir nos meilleurs crus.', 'atelierdegustation.jpg', 'ouvert'),
(4, 'Soirée Jazz', '2025-04-08 20:00', 'Ambiance chaleureuse et musique live : rejoignez-nous pour une soirée jazz inoubliable.', 'soiréejazz.jpg', 'ouvert'),
(5, 'Brunch du Dimanche', '2025-04-09 11:00', 'Un brunch copieux et convivial pour bien commencer votre dimanche.', 'brunch.jpg', 'fermé');

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
(1, 2500.00, 'Espresso', 'Strong and rich espresso shot', '/menu/coffee-1.png', 'Coffee', '[{\"name\": \"Coffee Beans\", \"quantity\": 15, \"unit\": \"g\"}, {\"name\": \"Mineral Water\", \"quantity\": 50, \"unit\": \"ml\"}]'),
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

-- --------------------------------------------------------

--
-- Structure de la table `orderpack`
--

CREATE TABLE `orderpack` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `total_price` decimal(10,2) NOT NULL,
  `points_earned` int(11) NOT NULL,
  `type` enum('menu','pack') NOT NULL DEFAULT 'menu',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_date` datetime DEFAULT current_timestamp(),
  `payment_status` enum('paid','unpaid') DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `table_number`, `items`, `total_price`, `created_at`, `order_date`, `payment_status`) VALUES
(27, 0, '[{\"id\":1,\"price\":2500,\"name\":\"Espresso\"}]', 2500.00, '2025-02-08 20:30:56', '2025-04-01 13:30:56', 'paid'),
(28, 8, '[{\"id\":4,\"price\":3000,\"name\":\"Turkish Coffee\"}]', 3000.00, '2025-02-08 20:32:24', '2025-04-01 16:32:24', 'paid'),
(29, 8, '[{\"id\":2,\"price\":2000,\"name\":\"Filter Coffee\"}]', 2000.00, '2025-02-08 20:41:58', '2025-04-01 10:41:58', 'paid'),
(30, 8, '[{\"id\":14,\"price\":3500,\"name\":\"Pine Nut Tea\"},{\"id\":17,\"price\":5000,\"name\":\"Strawberry Juice\"}]', 8500.00, '2025-02-08 20:42:08', '2025-02-08 23:42:08', 'paid'),
(31, 8, '[{\"id\":19,\"price\":5000,\"name\":\"Banana Juice\"}]', 5000.00, '2025-02-08 20:42:15', '2025-02-08 23:42:15', 'paid'),
(32, 8, '[{\"id\":20,\"price\":8000,\"name\":\"Special Ice Cream\"},{\"id\":20,\"price\":6000,\"name\":\"Kiwi Juice\"}]', 14000.00, '2025-02-08 20:42:28', '2025-02-08 23:42:28', 'unpaid'),
(33, 8, '[{\"id\":43,\"price\":10000,\"name\":\"Shisha\"},{\"id\":20,\"price\":6000,\"name\":\"Kiwi Juice\"},{\"id\":41,\"price\":1500,\"name\":\"Half Liter Water\"}]', 17500.00, '2025-02-08 20:42:42', '2025-02-08 23:42:42', 'paid'),
(34, 0, '[{\"id\":17,\"price\":5000,\"name\":\"Strawberry Juice\"},{\"id\":18,\"price\":4500,\"name\":\"Orange Juice\"}]', 9500.00, '2025-02-08 22:00:11', '2025-02-09 01:00:11', 'paid'),
(35, 0, '[{\"id\":45,\"price\":2500,\"name\":\"1 Liter Water\"}]', 2500.00, '2025-02-09 00:45:01', '2025-02-09 03:45:01', 'unpaid'),
(36, 0, '[{\"id\":16,\"price\":3500,\"name\":\"Lemonade\"},{\"id\":19,\"price\":5000,\"name\":\"Banana Juice\"},{\"id\":17,\"price\":5000,\"name\":\"Strawberry Juice\"}]', 13500.00, '2025-02-13 11:19:27', '2025-02-13 14:19:27', 'unpaid'),
(37, 10, '[{\"id\":2,\"price\":2000,\"name\":\"Filter Coffee\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":5,\"price\":3500,\"name\":\"Café au Lait\"}]', 8000.00, '2025-02-13 11:20:53', '2025-02-13 14:20:53', 'paid'),
(38, 0, '[{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"},{\"id\":1,\"price\":2500,\"name\":\"Espresso\"}]', 20000.00, '2025-02-13 12:20:52', '2025-02-13 15:20:52', 'unpaid'),
(39, 6, '[{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"}]', 24000.00, '2025-02-13 12:23:04', '2025-02-13 15:23:04', 'paid'),
(40, 0, '[{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"},{\"id\":43,\"price\":6000,\"name\":\"Tuna Crepe\"}]', 30000.00, '2025-02-13 12:27:02', '2025-02-13 15:27:02', 'paid');

-- --------------------------------------------------------

--
-- Structure de la table `pack`
--

CREATE TABLE `pack` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `menu_items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`menu_items`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pack`
--

INSERT INTO `pack` (`id`, `name`, `description`, `price`, `points`, `menu_items`) VALUES
(5, 'Pack de la Semaine', 'Découvrez une sélection de nos meilleurs menus pour la semaine, incluant des cafés, thés et jus.', 15000, 200, '[1,3,5,7]'),
(6, 'Pack Détente', 'Idéal pour une pause relaxante, ce pack regroupe nos boissons les plus apaisantes et rafraîchissantes.', 12000, 150, '[2,4,8]'),
(7, 'Pack Découverte', 'Un assortiment varié pour découvrir l\'ensemble de notre offre, avec des cafés, thés, jus et douceurs.', 18000, 250, '[1,2,3,4,5]'),
(8, 'Pack Énergie Matinale', 'Un combo parfait pour bien commencer la journée : café, croissant et jus d\'orange.', 10000, 130, '[1, 6, 9]'),
(10, 'Pack Famille', 'Un pack généreux pour partager en famille : 2 cafés, 2 jus, 4 biscuits.', 22000, 300, '[1, 1, 3, 3, 7, 7, 7, 7]'),
(11, 'Pack Fête', 'Une combinaison festive de boissons et snacks pour célébrer les bons moments.', 25000, 350, '[2, 3, 5, 6, 8, 10]');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `table_type` varchar(50) NOT NULL,
  `date_time` datetime DEFAULT NULL,
  `special_request` text DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `custom_event` varchar(255) DEFAULT NULL,
  `custom_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('en attente','accepter','refuser') NOT NULL DEFAULT 'en attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `email`, `mobile`, `table_type`, `date_time`, `special_request`, `event_id`, `custom_event`, `custom_date`, `created_at`, `status`) VALUES
(25, 'Moez Hajjaji', 'moez@gmail.com', '+21658055938', '100', '0000-00-00 00:00:00', 'not special request ', 2, NULL, NULL, '2025-04-13 14:40:57', 'accepter'),
(26, 'Ahmed Mhani ', 'Ahmed25@gmail.com', '+21698743652', 'All Table', NULL, 'Not special request \n', NULL, 'Mariage ', '2025-06-25', '2025-04-13 14:42:23', 'en attente'),
(27, 'Mourad', 'Mourad@gmail.com', '+21642102478', '48', '0000-00-00 00:00:00', 'no spécial request', 2, NULL, NULL, '2025-04-13 14:49:42', 'en attente'),
(28, 'Mariem', 'mariem@gmail.com', '+21698120003', 'All Table', '2025-05-15 20:20:00', 'no spécial request ', NULL, 'Birthday', NULL, '2025-04-13 14:50:48', 'en attente'),
(29, 'Mounir ', 'mounir@gmail.com', '+21655421367', '1', '2025-04-21 16:00:00', 'not', 2, NULL, NULL, '2025-04-13 14:54:27', 'accepter');

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `Quantity_used` int(11) DEFAULT 0,
  `remaining_quantity` int(11) GENERATED ALWAYS AS (`quantity` - `Quantity_used`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`id`, `name`, `quantity`, `Quantity_used`) VALUES
(1, 'Coffee Beans', 1880, 1851),
(2, 'Milk', 15000, 2250),
(3, 'Sugar', 400, 380),
(4, 'Chocolate Powder', 1500, 20),
(5, 'Vanilla Syrup', 1000, 0),
(6, 'Caramel Syrup', 1200, 10),
(7, 'Green Tea', 2500, 15),
(8, 'Black Tea', 1800, 10),
(9, 'Mineral Water', 5000, 25350),
(10, 'Flour', 22000, 50),
(11, 'Butter', 1400, 0),
(12, 'Eggs', 3000, 1),
(13, 'Yeast', 8000, 0),
(14, 'Whipped Cream', 10000, 220),
(15, 'Honey', 6000, 0),
(16, 'Orange Juice', 12000, 0),
(17, 'Apple Juice', 10000, 0),
(18, 'Mint Syrup', 900, 40),
(19, 'Cocoa Powder', 7000, 0),
(20, 'Instant Coffee', 1500, 0),
(21, 'Almonds', 2000, 0),
(22, 'Pine Nuts', 1500, 15),
(23, 'Mascarpone', 1000, 0),
(24, 'Cream Cheese', 1000, 0),
(25, 'Biscuits', 2000, 0),
(26, 'Nutella', 1000, 0),
(27, 'Oreo', 1500, 0),
(28, 'Tuna', 1000, 50),
(29, 'Vegetables', 2000, 30),
(30, 'Shisha Tobacco', 5000, 40),
(31, 'Lime', 3000, 0),
(32, 'Fresh Mint', 2500, 0);

-- --------------------------------------------------------

--
-- Structure de la table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `status` enum('available','reserved') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tables`
--

INSERT INTO `tables` (`id`, `table_number`, `capacity`, `status`) VALUES
(1, 1, 8, 'reserved'),
(2, 2, 8, 'reserved'),
(3, 3, 8, 'reserved'),
(4, 4, 8, 'available'),
(5, 5, 6, 'reserved'),
(6, 6, 6, 'available'),
(7, 7, 6, 'available'),
(8, 8, 6, 'available'),
(9, 9, 6, 'reserved'),
(10, 10, 6, 'available'),
(11, 11, 4, 'available'),
(12, 12, 4, 'available'),
(13, 13, 4, 'reserved'),
(14, 14, 4, 'available'),
(15, 15, 4, 'reserved'),
(16, 16, 4, 'available'),
(17, 17, 4, 'reserved'),
(18, 18, 4, 'available'),
(19, 19, 4, 'available'),
(20, 20, 4, 'reserved'),
(21, 0, 4, 'available');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `mobile`, `password`, `points`) VALUES
(1, 'Ali', 'Ben Salah', 'ali1@gmail.com', '0612345671', 'pass123', 10),
(2, 'Sara', 'Khalil', 'sara2@gmail.com', '0612345672', 'pass123', 5),
(3, 'Mehdi', 'Trabelsi', 'mehdi3@gmail.com', '0612345673', 'pass123', 15),
(4, 'Lina', 'Bensalem', 'lina4@gmail.com', '0612345674', 'pass123', 20),
(5, 'Amine', 'Mansouri', 'amine5@gmail.com', '0612345675', 'pass123', 30),
(6, 'Nada', 'Jlassi', 'nada6@gmail.com', '0612345676', 'pass123', 12),
(7, 'Yassine', 'Zouari', 'yassine7@gmail.com', '0612345677', 'pass123', 8),
(8, 'Amina', 'Cherif', 'amina8@gmail.com', '0612345678', 'pass123', 25),
(9, 'Khaled', 'Belaid', 'khaled9@gmail.com', '0612345679', 'pass123', 18),
(10, 'Hana', 'Haddad', 'hana10@gmail.com', '0612345680', 'pass123', 22),
(11, 'Tarek', 'Abid', 'tarek11@gmail.com', '0612345681', 'pass123', 7),
(12, 'Meriem', 'Slimani', 'meriem12@gmail.com', '0612345682', 'pass123', 16),
(13, 'Walid', 'Ferjani', 'walid13@gmail.com', '0612345683', 'pass123', 14),
(14, 'Rania', 'Hammami', 'rania14@gmail.com', '0612345684', 'pass123', 9),
(15, 'Anis', 'Bayoudh', 'anis15@gmail.com', '0612345685', 'pass123', 21),
(16, 'Ines', 'Kefi', 'ines16@gmail.com', '0612345686', 'pass123', 11),
(17, 'Karim', 'Zribi', 'karim17@gmail.com', '0612345687', 'pass123', 6),
(18, 'Salma', 'Toumi', 'salma18@gmail.com', '0612345688', 'pass123', 17),
(19, 'Omar', 'Ayari', 'omar19@gmail.com', '0612345689', 'pass123', 19),
(20, 'Mouna', 'Chebbi', 'mouna20@gmail.com', '0612345690', 'pass123', 13),
(21, 'Bilel', 'Saidi', 'bilel21@gmail.com', '0612345691', 'pass123', 3),
(22, 'Samar', 'Fakih', 'samar22@gmail.com', '0612345692', 'pass123', 26),
(23, 'Fares', 'Jaziri', 'fares23@gmail.com', '0612345693', 'pass123', 4),
(24, 'Rim', 'Neji', 'rim24@gmail.com', '0612345694', 'pass123', 15),
(25, 'Zied', 'Hamdi', 'zied25@gmail.com', '0612345695', 'pass123', 8),
(26, 'Yasmine', 'Sassi', 'yasmine26@gmail.com', '0612345696', 'pass123', 7),
(27, 'Nader', 'Aouadi', 'nader27@gmail.com', '0612345697', 'pass123', 9),
(28, 'Sana', 'Belhaj', 'sana28@gmail.com', '0612345698', 'pass123', 16),
(29, 'Adem', 'Karray', 'adem29@gmail.com', '0612345699', 'pass123', 22),
(30, 'Marwa', 'Kraiem', 'marwa30@gmail.com', '0612345700', 'pass123', 10),
(31, 'Youssef', 'Gharbi', 'youssef31@gmail.com', '0612345701', 'pass123', 18),
(32, 'Rihab', 'Ben Rejeb', 'rihab32@gmail.com', '0612345702', 'pass123', 6),
(33, 'Chokri', 'Debbabi', 'chokri33@gmail.com', '0612345703', 'pass123', 19),
(34, 'Maha', 'Jouini', 'maha34@gmail.com', '0612345704', 'pass123', 20),
(35, 'Samy', 'Louati', 'samy35@gmail.com', '0612345705', 'pass123', 2),
(36, 'Layla', 'Majdoub', 'layla36@gmail.com', '0612345706', 'pass123', 12),
(37, 'Mohsen', 'Guesmi', 'mohsen37@gmail.com', '0612345707', 'pass123', 1),
(38, 'Ikram', 'Baccar', 'ikram38@gmail.com', '0612345708', 'pass123', 23),
(39, 'Slim', 'Triki', 'slim39@gmail.com', '0612345709', 'pass123', 7),
(40, 'Emna', 'Douiri', 'emna40@gmail.com', '0612345710', 'pass123', 14),
(41, 'Rayen', 'Fekih', 'rayen41@gmail.com', '0612345711', 'pass123', 13),
(42, 'Nour', 'Masmoudi', 'nour42@gmail.com', '0612345712', 'pass123', 11),
(43, 'Malek', 'Zoghlami', 'malek43@gmail.com', '0612345713', 'pass123', 5),
(44, 'Ghada', 'Sahnoun', 'ghada44@gmail.com', '0612345714', 'pass123', 24),
(45, 'Seif', 'Turki', 'seif45@gmail.com', '0612345715', 'pass123', 17),
(46, 'Ala', 'Zerrouki', 'ala46@gmail.com', '0612345716', 'pass123', 9),
(47, 'Sirine', 'Mehdi', 'sirine47@gmail.com', '0612345717', 'pass123', 26),
(48, 'Habib', 'Kassab', 'habib48@gmail.com', '0612345718', 'pass123', 8),
(49, 'Haifa', 'Barhoumi', 'haifa49@gmail.com', '0612345719', 'pass123', 14),
(50, 'Imen', 'Ben Hassen', 'imen50@gmail.com', '0612345720', 'pass123', 15);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `capacity`
--
ALTER TABLE `capacity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orderpack`
--
ALTER TABLE `orderpack`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_table_number` (`table_number`);

--
-- Index pour la table `pack`
--
ALTER TABLE `pack`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_event_reservation` (`event_id`);

--
-- Index pour la table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_table_number` (`table_number`),
  ADD UNIQUE KEY `table_number` (`table_number`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `capacity`
--
ALTER TABLE `capacity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `orderpack`
--
ALTER TABLE `orderpack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `pack`
--
ALTER TABLE `pack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orderpack`
--
ALTER TABLE `orderpack`
  ADD CONSTRAINT `orderpack_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_table_number` FOREIGN KEY (`table_number`) REFERENCES `tables` (`table_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
