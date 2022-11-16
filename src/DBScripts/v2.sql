-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 13, 2019 at 06:42 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `token`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_user`
--

CREATE TABLE `add_user` (
  `user_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_admin` int(5) NOT NULL COMMENT '0=>normal user;1=>super admin',
  `status` tinyint(1) NOT NULL COMMENT '0=>inactive;1=>active',
  `user_lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_name` varchar(100) NOT NULL,
  `img_url` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `nick_name` text NOT NULL,
  `user_designation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `add_user`
--

INSERT INTO `add_user` (`user_id`, `password`, `is_admin`, `status`, `user_lastlogin`, `user_name`, `img_url`, `first_name`, `last_name`, `nick_name`, `user_designation`) VALUES
(1, '12345', 1, 1, '2019-07-10 03:27:25', '', '', '', '', '', ''),
(3, '12', 0, 0, '2019-07-10 16:47:07', 'asa', '', '', '', '', ''),
(4, '12', 0, 0, '2019-07-10 16:58:18', 'asa', '', '', '', '', ''),
(5, '12', 0, 0, '2019-07-10 16:59:09', 'asa', '', '', '', '', ''),
(6, '12', 0, 0, '2019-07-10 16:59:27', 'asa', '', '', '', '', ''),
(7, '12', 0, 0, '2019-07-10 16:59:42', 'asa', '', '', '', '', ''),
(8, '12', 0, 0, '2019-07-10 16:59:52', 'asa', '', '', '', '', ''),
(9, '12', 0, 0, '2019-07-10 17:03:10', 'asa', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `catagory_name` text NOT NULL,
  `catagory_type` tinyint(1) NOT NULL,
  `is_discount` tinyint(1) NOT NULL,
  `rating` float(5,5) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `catagory_desc` text NOT NULL,
  `is_popular` tinyint(1) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catagory`
--

INSERT INTO `catagory` (`catagory_name`, `catagory_type`, `is_discount`, `rating`, `status`, `catagory_desc`, `is_popular`, `cat_id`) VALUES
('test', 1, 1, 1.00000, 0, 'asas', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone_number` int(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `update` tinyint(1) NOT NULL COMMENT '0=>yes;1=>no'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `discount_id` int(11) NOT NULL,
  `discount_name` text NOT NULL,
  `discount_val` float(10,1) NOT NULL,
  `discount_type` text NOT NULL,
  `discount_key` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`discount_id`, `discount_name`, `discount_val`, `discount_type`, `discount_key`, `status`) VALUES
(1, 'Womens day discount', 1.0, 'percentage', 'WOMEN10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `flavoure`
--

CREATE TABLE `flavoure` (
  `flavoured_id` int(11) NOT NULL,
  `flavoured_name` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flavoure`
--

INSERT INTO `flavoure` (`flavoured_id`, `flavoured_name`, `status`) VALUES
(1, 'spaicy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredients_id` int(11) NOT NULL,
  `ingredients_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredients_id`, `ingredients_name`) VALUES
(1, 'chiken');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `dish_id` int(11) NOT NULL,
  `dish_name` varchar(255) NOT NULL,
  `item_type` tinyint(1) NOT NULL,
  `dish_price` float(10,2) NOT NULL,
  `is_discount` tinyint(1) NOT NULL,
  `rating` float NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0=>inactive;1=>active',
  `dish_desc` text NOT NULL,
  `is_popular` tinyint(1) NOT NULL COMMENT '0=>no;1=>yes',
  `dish_category` varchar(100) NOT NULL,
  `rate` float(10,10) NOT NULL,
  `img_url` text NOT NULL,
  `offer` int(10) NOT NULL,
  `ingredients` int(10) NOT NULL,
  `flavoured` int(10) NOT NULL,
  `is_veg` tinyint(1) NOT NULL,
  `dish_sub_category` text NOT NULL,
  `is_offer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`dish_id`, `dish_name`, `item_type`, `dish_price`, `is_discount`, `rating`, `status`, `dish_desc`, `is_popular`, `dish_category`, `rate`, `img_url`, `offer`, `ingredients`, `flavoured`, `is_veg`, `dish_sub_category`, `is_offer`) VALUES
(1, 'test3', 0, 12.20, 0, 5.5, 0, '11', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(2, 'test1', 0, 1.00, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(3, 'test1', 0, 1.00, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(4, 'test2', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(5, 'test1', 0, 1.00, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(6, 'test2', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(7, 'test12', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(8, 'test12', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(9, 'test12', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(10, 'sample12', 0, 1.10, 0, 4.2, 1, 'asa', 0, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(11, 'sample12', 0, 1.10, 0, 4.2, 1, 'asa', 0, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(12, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(13, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(14, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, 'localhost/image_storage/item_img-1563116958347.png', 0, 0, 0, 0, '', 0),
(15, 'sample121212', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(16, 'sample121212', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(17, 'sample9', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, 'localhost/image_storage/item_img-1564806289470.png', 0, 0, 0, 0, '', 0),
(18, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0),
(19, 'sample_test', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '', 0, 0, 0, 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_id` int(11) NOT NULL,
  `offer_name` text NOT NULL,
  `offer_val` text NOT NULL,
  `offer_type` text NOT NULL,
  `offer_key` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`offer_id`, `offer_name`, `offer_val`, `offer_type`, `offer_key`) VALUES
(1, 'Womens day offer', '10', 'percentage', 'WOMEN10');

-- --------------------------------------------------------

--
-- Table structure for table `order_`
--

CREATE TABLE `order_` (
  `order_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `total_amount` double(10,3) NOT NULL,
  `order_status` int(9) NOT NULL COMMENT '0=>order_placed;1=>order_accept;2=>ready_to_delivery;3=>delivery;4=>paid;9=>rejected',
  `orders` text NOT NULL,
  `tax` double(10,3) NOT NULL,
  `order_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_valid` tinyint(1) NOT NULL COMMENT '0=>open;1=>closed',
  `rating` float(1,1) NOT NULL,
  `discount` text NOT NULL,
  `offer` text NOT NULL,
  `bill_amount` double(10,3) NOT NULL,
  `currency_type` text NOT NULL,
  `currency_symbol` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_`
--

INSERT INTO `order_` (`order_id`, `table_id`, `total_amount`, `order_status`, `orders`, `tax`, `order_time`, `order_valid`, `rating`, `discount`, `offer`, `bill_amount`, `currency_type`, `currency_symbol`) VALUES
(1, 1, 1.000, 0, '[{\'item_price\':0.9999999999,\'item_name\':\'sample\',\'item_id\':2,\'quantity\':1,\'type\':\'1\',\'total_amount\':\'1.00\'}]', 1.000, '2019-08-03 05:25:08', 0, 0.0, '', '', 0.000, '', ''),
(2, 1, 1.000, 0, '[{\'item_price\':0.9999999999,\'item_name\':\'sample\',\'item_id\':2,\'quantity\':1,\'type\':\'1\',\'total_amount\':\'1.00\'}]', 1.000, '2019-08-03 05:26:01', 0, 0.0, '', '', 0.000, '', ''),
(3, 1, 1.000, 0, '[{\'item_price\':0.9999999999,\'item_name\':\'sample\',\'item_id\':2,\'quantity\':1,\'type\':\'1\',\'total_amount\':\'1.00\'}]', 1.000, '2019-08-03 05:27:19', 0, 0.0, '', '', 0.000, '', ''),
(4, 1, 2.100, 0, '[{\'item_price\':0.9999999999,\'item_name\':\'sample\',\'item_id\':2,\'quantity\':1,\'type\':\'1\',\'total_amount\':\'1.00\'}]', 10.000, '2019-08-03 05:30:13', 0, 0.0, '', '', 0.000, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `pay_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_method` tinyint(1) NOT NULL COMMENT '0=>cash;1=>paid',
  `pay_status` tinyint(1) NOT NULL COMMENT '0=>pending;1=>completed',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_catagory`
--

CREATE TABLE `sub_catagory` (
  `sub_catagory_id` int(11) NOT NULL,
  `sub_catagory_name` text NOT NULL,
  `sub_catagory_type` text NOT NULL,
  `sub_catagory_desc` text NOT NULL,
  `is_popular` tinyint(1) NOT NULL,
  `rating` float(1,1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `is_discount` tinyint(1) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_catagory`
--

INSERT INTO `sub_catagory` (`sub_catagory_id`, `sub_catagory_name`, `sub_catagory_type`, `sub_catagory_desc`, `is_popular`, `rating`, `status`, `is_discount`, `cat_id`) VALUES
(1, 'test', '1', 'asas', 1, 0.9, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `table_login`
--

CREATE TABLE `table_login` (
  `table_id` int(11) NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `login_status` tinyint(1) NOT NULL COMMENT '0=>not yet login;1=>already logged',
  `status` tinyint(1) NOT NULL COMMENT '0=>inactive;1=>active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_login`
--

INSERT INTO `table_login` (`table_id`, `table_name`, `password`, `login_status`, `status`) VALUES
(1, 'test1', 'asa', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_user`
--
ALTER TABLE `add_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discount_id`);

--
-- Indexes for table `flavoure`
--
ALTER TABLE `flavoure`
  ADD PRIMARY KEY (`flavoured_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredients_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`dish_id`),
  ADD UNIQUE KEY `item_id` (`dish_id`,`dish_name`,`item_type`,`dish_price`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`offer_id`);

--
-- Indexes for table `order_`
--
ALTER TABLE `order_`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`pay_id`);

--
-- Indexes for table `sub_catagory`
--
ALTER TABLE `sub_catagory`
  ADD PRIMARY KEY (`sub_catagory_id`);

--
-- Indexes for table `table_login`
--
ALTER TABLE `table_login`
  ADD PRIMARY KEY (`table_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_user`
--
ALTER TABLE `add_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `flavoure`
--
ALTER TABLE `flavoure`
  MODIFY `flavoured_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredients_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `dish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_`
--
ALTER TABLE `order_`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_catagory`
--
ALTER TABLE `sub_catagory`
  MODIFY `sub_catagory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `table_login`
--
ALTER TABLE `table_login`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
