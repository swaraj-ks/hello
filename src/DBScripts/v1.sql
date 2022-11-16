-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 08, 2019 at 06:25 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Token`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_user`
--

CREATE TABLE `add_user` (
  `user_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cr_type` int(5) NOT NULL COMMENT '0=>normal user;1=>super admin',
  `status` tinyint(1) NOT NULL COMMENT '0=>inactive;1=>active',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `add_user`
--

INSERT INTO `add_user` (`user_id`, `password`, `cr_type`, `status`, `last_login`, `user_name`) VALUES
(1, '12345', 1, 1, '2019-07-10 03:27:25', ''),
(3, '12', 0, 0, '2019-07-10 16:47:07', 'asa'),
(4, '12', 0, 0, '2019-07-10 16:58:18', 'asa'),
(5, '12', 0, 0, '2019-07-10 16:59:09', 'asa'),
(6, '12', 0, 0, '2019-07-10 16:59:27', 'asa'),
(7, '12', 0, 0, '2019-07-10 16:59:42', 'asa'),
(8, '12', 0, 0, '2019-07-10 16:59:52', 'asa'),
(9, '12', 0, 0, '2019-07-10 17:03:10', 'asa'),
(10, '12', 0, 0, '2019-08-22 17:32:54', 'asa');

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
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_type` tinyint(1) NOT NULL,
  `item_price` float(10,2) NOT NULL,
  `is_discount` tinyint(1) NOT NULL,
  `rating` float NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0=>inactive;1=>active',
  `item_desc` text NOT NULL,
  `is_popular` tinyint(1) NOT NULL COMMENT '0=>no;1=>yes',
  `item_category` varchar(100) NOT NULL,
  `rate` float(10,10) NOT NULL,
  `img_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `item_type`, `item_price`, `is_discount`, `rating`, `status`, `item_desc`, `is_popular`, `item_category`, `rate`, `img_url`) VALUES
(1, 'test3', 0, 12.20, 0, 5.5, 1, '11', 1, '0', 0.0000000000, ''),
(2, 'test1', 0, 1.00, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(3, 'test1', 0, 1.00, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(4, 'test2', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(5, 'test1', 0, 1.00, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(6, 'test2', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(7, 'test12', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(8, 'test12', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(9, 'test12', 0, 12.20, 0, 5.5, 1, 'qwdqdqd', 1, '0', 0.0000000000, ''),
(10, 'sample12', 0, 1.10, 0, 4.2, 1, 'asa', 0, '0', 0.0000000000, ''),
(11, 'sample12', 0, 1.10, 0, 4.2, 1, 'asa', 0, '0', 0.0000000000, ''),
(12, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, ''),
(13, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, ''),
(14, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, 'localhost/image_storage/item_img-1563116958347.png'),
(15, 'sample111', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, ''),
(16, 'sample11111', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, ''),
(17, 'sample11111', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, ''),
(18, 'sample11111', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, 'localhost/image_storage/item_img-1564809076083.png'),
(19, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, ''),
(20, 'sample', 0, 24.20, 0, 5.5, 1, 'asa', 1, '0', 0.0000000000, '');

-- --------------------------------------------------------

--
-- Table structure for table `order_`
--

CREATE TABLE `order_` (
  `order_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `amount` float(10,10) NOT NULL,
  `order_status` int(9) NOT NULL COMMENT '0=>order_placed;1=>order_accept;2=>ready_to_delivery;3=>delivery;4=>paid;9=>rejected',
  `order_item` text NOT NULL,
  `tax` float(10,10) NOT NULL,
  `order_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_valid` tinyint(1) NOT NULL COMMENT '0=>open;1=>closed',
  `rating` float(10,10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_`
--

INSERT INTO `order_` (`order_id`, `table_id`, `amount`, `order_status`, `order_item`, `tax`, `order_time`, `order_valid`, `rating`) VALUES
(1, 1, 1.0000000000, 0, '[{\'item_price\':0.9999999999,\'item_name\':\'sample\',\'item_id\':2,\'quantity\':1,\'type\':\'1\',\'total_amount\':\'1.00\'}]', 1.0000000000, '2019-08-22 17:42:47', 0, 0.0000000000);

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
(1, 'test1', 'asa', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_user`
--
ALTER TABLE `add_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `order_`
--
ALTER TABLE `order_`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `table_login`
--
ALTER TABLE `table_login`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;