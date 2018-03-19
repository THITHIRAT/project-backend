-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 19, 2018 at 07:19 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `_id` int(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` int(10) NOT NULL,
  `privilege` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`_id`, `email`, `password`, `privilege`) VALUES
(1, 'admin@mail.com', 1234, 0);

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `_id` int(255) NOT NULL,
  `name` varchar(64) NOT NULL,
  `longtitude` double NOT NULL,
  `latitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`_id`, `name`, `longtitude`, `latitude`) VALUES
(2, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(3, 'California', -119.41793240000001, 36.778261),
(4, 'Buri Ram', 103.1029191, 14.993001699999999),
(5, 'Thamasat Rangsit Finance Faculty', 100.6036818, 14.0682048),
(6, 'Chiang Mai', 98.9817163, 18.706064100000003),
(7, 'Kasetsart University', 100.57180009999999, 13.8470283),
(8, 'Chulalongkorn University Auditorium', 100.5327218, 13.7382604),
(9, 'Soi Cowboy', 100.5622195, 13.7369993),
(10, 'Emmanuelle Entertainment Co.,Ltd.', 100.57294710000001, 13.7767626),
(12, 'Seacon Square', 100.6481189, 13.6939777),
(14, 'Khoonsin', 100.7527461, 13.722590099999998),
(15, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(16, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(17, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(18, 'Pattaya City', 100.8824551, 12.9235557),
(19, 'Faculty of Agricultural Technology King Mongkut\'s Institute of T', 100.78079149999999, 13.726566799999997),
(20, 'Ko Samui', 100.01359289999999, 9.5120168),
(21, 'Spain', -3.7492199999999998, 40.46366700000001),
(22, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(23, 'Mega Bangna', 100.67980709999999, 13.648608300000001),
(24, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(25, 'Phuket', 98.3922504, 7.8804479);

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `notification` varchar(10) NOT NULL,
  `placename` varchar(64) NOT NULL,
  `latitude` double NOT NULL,
  `longtitude` double NOT NULL,
  `taskname` varchar(64) NOT NULL,
  `complete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`_id`, `user_id`, `type`, `notification`, `placename`, `latitude`, `longtitude`, `taskname`, `complete`) VALUES
(17, 49, 'location', 'pass', 'Seacon Square', 13.6939777, 100.6481189, 'Study', 0),
(18, 49, 'location', 'depart', 'Seacon Square', 13.6939777, 100.6481189, 'Study', 0),
(19, 49, 'location', 'arrive', 'Seacon Square', 13.6939777, 100.6481189, 'Study', 0),
(20, 49, 'location', 'arrive', 'Seacon Square', 13.6939777, 100.6481189, 'Study', 0),
(21, 27, 'location', 'Arrive', 'Ko Samui', 9.5120168, 100.01359289999999, 'travel', 0),
(22, 27, 'location', 'Arrive', 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'study', 0),
(23, 27, 'location', 'Arrive', 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'shopping', 0),
(24, 27, 'location', 'Depart', 'Phuket', 7.8804479, 98.3922504, 'work', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `_id` int(255) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`_id`, `username`, `password`, `email`, `token`) VALUES
(1, 'root', '1234', 'root@root.com', NULL),
(24, 'test', 'test1234', 'test@root.com', NULL),
(25, 'test', 'test1234', 'test@root.com', NULL),
(26, 'test', 'test1234', 'test@test.com', NULL),
(27, 'test', 'test1234', 'test1234@test.com', 'xXkNeTHw8Gi6yhKh5'),
(28, 'hello', 'test1234', 'hello1234@mail.com', NULL),
(29, 'hello', 'test1234', 'hello@hello.com', NULL),
(30, 'hello', 'test1234', 'hello1234@hello.com', NULL),
(31, 'hello', 'test1234', 'testhello1234@hello.com', NULL),
(32, 'hello', 'test1234', 'test1234@testest.com', NULL),
(33, 'hello', 'test1234', 'test1234@test1234.com', NULL),
(34, 'hello', 'test1234', 'test1234@test12345.com', NULL),
(35, 'hello', 'test1234', 'a@test12345.com', '9NGS2G53j4dq5wwzq'),
(36, 'hello', 'test1234', 'b@test12345.com', NULL),
(37, 'hello', 'test1234', 'c@test12345.com', NULL),
(38, 'hello', 'test1234', 'd@test12345.com', NULL),
(39, 'hello', 'test1234', 'e@test12345.com', NULL),
(40, 'hello', 'test1234', 'f@test12345.com', NULL),
(41, 'hello', 'test1234', 'g@test12345.com', NULL),
(42, 'hello', 'test1234', 'h@test12345.com', NULL),
(43, 'hello', 'test1234', 'i@test12345.com', NULL),
(44, 'hello', 'test1234', 'j@test12345.com', NULL),
(45, 'hello1', 'test1234', 'k@test12345.com', NULL),
(46, 'hello', 'test1234', 'l@test12345.com', NULL),
(47, 'hello', 'test1234', 'm@test12345.com', NULL),
(48, 'hello', 'test1234', 'n@test12345.com', NULL),
(49, 'hellonew', 'test1234', 'o@test12345.com', 'zQFp993KKCLC85mBT'),
(50, 'hello', 'test1234', 'p@test12345.com', NULL),
(51, 'hello', 'test1234', 'q@test12345.com', 'TLuxozffWTJoFABez'),
(52, 'hello', 'test1234', 'r@test12345.com', 'HwzZGCmwAH7P59dSz'),
(53, 'hello', 'test1234', 's@test12345.com', 'Ez6EJFokN27CRaMMv'),
(54, 'hello', 'test1234', 't@test12345.com', 'tjPLkkKqg4f77w2bG'),
(55, 'u', 'test1234', 'u@test12345.com', '5EfEhnKF6RDEgi6r8'),
(56, 'root ', 'test', 'v@test12345.com', 'TzenZHSYBm4eDWM7m'),
(57, 'hello', 'test1234', 'w@test12345.com', NULL),
(58, 'x', 'test', 'x@test12345.com', NULL),
(59, 'hello', 'test1234', 'y@test12345.com', 'cazx7W5YQEGJ3crMg'),
(60, 'hello', '1234', 'z@test12345.com', NULL),
(61, 'hello', '1234', 'a@hotmail.com', '34kPFj9GERGJFartk'),
(62, 'f', '123', 'ee', NULL),
(63, 'hello', 'test', 'b@hotmail.com', 'jXX4ijuZ7TCZAYqjX');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `reminder`
--
ALTER TABLE `reminder`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD KEY `_id_2` (`_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
