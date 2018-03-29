-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 29, 2018 at 06:36 PM
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
-- Table structure for table `catalog`
--

CREATE TABLE `catalog` (
  `_id` int(32) NOT NULL,
  `type` varchar(50) NOT NULL,
  `item` varchar(50) DEFAULT NULL,
  `period_num` int(10) NOT NULL,
  `period_type_date` varchar(6) NOT NULL,
  `real_period_num` int(10) DEFAULT NULL,
  `real_period_type_date` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`_id`, `type`, `item`, `period_num`, `period_type_date`, `real_period_num`, `real_period_type_date`) VALUES
(7, 'fresh food', 'meat', 7, 'days', NULL, NULL),
(13, 'fresh food', 'fruit', 7, 'days', NULL, NULL),
(14, 'battery', NULL, 1, 'years', NULL, NULL),
(15, 'food', 'snack', 1, 'years', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `_id` int(255) NOT NULL,
  `reminder_id` int(255) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`_id`, `reminder_id`, `time`, `date`) VALUES
(88, 284, '00:00:00', '2559-11-11'),
(89, 284, '00:00:00', '2560-04-01'),
(90, 285, '23:54:00', '2561-03-22'),
(91, 289, '20:30:00', '2560-04-15'),
(92, 292, '12:15:00', '2559-11-11'),
(93, 292, '12:15:00', '2560-04-01'),
(94, 293, '00:00:00', '0000-00-00'),
(95, 293, '00:00:00', '0000-00-00'),
(96, 293, '00:00:00', '0000-00-00'),
(97, 294, '00:00:00', '0000-00-00'),
(98, 294, '00:00:00', '0000-00-00'),
(99, 294, '00:00:00', '0000-00-00'),
(100, 295, '00:00:00', '0000-00-00'),
(101, 295, '00:00:00', '0000-00-00'),
(102, 295, '00:00:00', '0000-00-00'),
(103, 296, '00:00:00', '0000-00-00'),
(104, 296, '00:00:00', '0000-00-00'),
(105, 296, '00:00:00', '0000-00-00'),
(106, 297, '00:00:00', '0000-00-00'),
(107, 297, '00:00:00', '0000-00-00'),
(108, 297, '00:00:00', '0000-00-00'),
(109, 298, '03:14:00', '2561-03-30'),
(110, 298, '18:44:00', '2561-03-29'),
(111, 299, '03:10:00', '2561-03-30'),
(112, 299, '03:18:00', '2561-03-30'),
(113, 307, '20:30:00', '2560-04-15'),
(114, 310, '00:00:00', '0000-00-00'),
(115, 310, '00:00:00', '0000-00-00'),
(116, 310, '00:00:00', '0000-00-00'),
(117, 311, '20:30:00', '2560-04-15');

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
(17, 'KMITL Faculty of Engineering Office', 100.7763884, 13.7269923),
(18, 'Pattaya City', 100.8824551, 12.9235557),
(19, 'Faculty of Agricultural Technology King Mongkut\'s Institute of T', 100.78079149999999, 13.726566799999997),
(20, 'Ko Samui', 100.01359289999999, 9.5120168),
(21, 'Spain', -3.7492199999999998, 40.46366700000001),
(23, 'Mega Bangna', 100.67980709999999, 13.648608300000001),
(25, 'Phuket', 98.3922504, 7.8804479),
(26, 'Chon Buri', 100.98467169999999, 13.361143099999998),
(27, 'Thailand', 100.99254099999999, 15.870032000000002),
(29, 'The Paseo Mall', 100.72717999999999, 13.721851999999998),
(30, 'Central Library, King Mongkut\'s Institute of Technology Ladkraba', 100.7787895, 13.727696300000002),
(31, 'KMITL Student Dormitory', 100.77437359999999, 13.7295935),
(32, 'Central World', 100.53981879999999, 13.7462276),
(34, 'Bangkok', 100.5017651, 13.7563309),
(39, 'Siam Center', 100.53286349999999, 13.746252399999998),
(40, '33/147 Suwinthawong 34 Soi 4', 100.78772479999999, 13.8052674),
(41, 'Lopburi', 100.6533706, 14.799508099999997),
(42, 'Don Mueang International Airport', 100.6041987, 13.9132602),
(43, 'Mega Mall', 26.1525885, 44.442398499999996),
(44, 'Tak', 99.1258498, 16.8839901),
(45, 'Suvarnabhumi Airport', 100.75011239999999, 13.689999100000001),
(46, 'Thammasat University', 100.4923209, 13.7565121),
(47, 'Computer Engineering Department', 33.908290199999996, 35.1461468);

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `notification` varchar(10) NOT NULL,
  `allday` int(1) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `placename` varchar(64) NOT NULL,
  `latitude` double NOT NULL,
  `longtitude` double NOT NULL,
  `taskname` varchar(64) NOT NULL,
  `complete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`_id`, `user_id`, `type`, `notification`, `allday`, `start_date`, `end_date`, `start_time`, `end_time`, `placename`, `latitude`, `longtitude`, `taskname`, `complete`) VALUES
(284, 49, 'Reminder', '', 1, '2560-04-10', '2560-05-30', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'reminder', 1),
(285, 27, 'Reminder', '', 1, '2561-03-23', '2561-03-26', NULL, NULL, 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'shopping', 1),
(286, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'go ', 1),
(287, 27, 'Event', '', 1, '2561-03-31', '2561-03-31', NULL, NULL, 'Suvarnabhumi Airport', 13.689999100000001, 100.75011239999999, 'travel', 1),
(288, 49, 'Location', 'pass', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Chon Buri', 13.361143099999998, 100.98467169999999, 'Study', 1),
(289, 49, 'Event', '', 1, '2560-02-19', '2560-10-25', NULL, NULL, 'Chon Buri', 13.361143099999998, 100.98467169999999, 'learning', 1),
(290, 27, 'Reminder', '', 0, '2561-03-29', '2561-03-29', '06:30:00', '07:40:00', 'Thammasat University', 13.7565121, 100.4923209, 'test', 1),
(291, 27, 'Reminder', '', 0, '2561-03-30', '2561-03-30', '05:35:00', '19:30:00', 'Thammasat University', 13.7565121, 100.4923209, 'test', 1),
(292, 49, 'Reminder', '', 0, '2560-04-10', '2560-05-30', '12:15:00', '19:30:00', 'Seacon Square', 13.6939777, 100.6481189, 'reminder', 0),
(293, 27, 'Reminder', '', 0, '2561-03-31', '2561-03-31', '06:00:00', '06:45:00', 'Thammasat University', 13.7565121, 100.4923209, 'test', 1),
(294, 27, 'Reminder', '', 1, '2561-03-28', '2561-03-28', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'hello complete', 1),
(295, 27, 'Reminder', '', 1, '2561-03-28', '2561-03-30', NULL, NULL, 'null', 0, 0, 'test all', 1),
(296, 27, 'Reminder', '', 0, '2561-03-29', '2561-03-28', '04:43:00', '04:30:00', 'null', 0, 0, 'test 2', 0),
(297, 27, 'Reminder', '', 0, '2561-03-30', '2561-03-31', '05:44:00', '03:44:00', 'null', 0, 0, 'test 2', 0),
(298, 27, 'Reminder', '', 0, '2561-03-30', '2561-03-07', '04:44:00', '04:20:00', 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'test 3', 0),
(299, 27, 'Reminder', '', 0, '2561-03-30', '2561-03-27', '03:20:00', '03:17:00', 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'test 3', 0),
(300, 27, 'Event', '', 1, '2561-03-29', '2561-03-30', NULL, NULL, 'null', 0, 0, 'ttt', 0),
(301, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Computer Engineering Department', 35.1461468, 33.908290199999996, 'vggffff', 1),
(302, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Computer Engineering Department', 35.1461468, 33.908290199999996, '', 1),
(303, 27, 'Location', 'Depart', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Computer Engineering Department', 35.1461468, 33.908290199999996, 'gggg', 1),
(304, 27, 'Location', 'Pass', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Computer Engineering Department', 35.1461468, 33.908290199999996, 'kjjjj', 1),
(305, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Computer Engineering Department', 35.1461468, 33.908290199999996, 'jhyrcjt', 1),
(306, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'kmitl', 1),
(307, 49, 'Event', '', 1, '2560-02-19', '2560-10-25', NULL, NULL, 'Chon Buri', 13.361143099999998, 100.98467169999999, 'learning', 0),
(308, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Bangkok', 13.7563309, 100.5017651, 'bangkok', 0),
(309, 27, 'Location', 'Arrive', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'shopping', 0),
(310, 27, 'Reminder', '', 1, '2561-03-29', '2561-03-29', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'test', 0),
(311, 49, 'Event', '', 1, '2560-02-19', '2560-10-25', NULL, NULL, 'Chon Buri', 13.361143099999998, 100.98467169999999, 'learning', 0),
(312, 49, 'Location', 'pass', NULL, '0000-00-00', '0000-00-00', NULL, NULL, 'Chon Buri', 13.361143099999998, 100.98467169999999, 'Study', 0);

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
(27, 'test', 'test1234', 'test1234@test.com', 'EZehYAdDS7AB6NTnK'),
(28, 'hello', 'test1234', 'hello1234@mail.com', NULL),
(29, 'hello', 'test1234', 'hello@hello.com', NULL),
(30, 'hello', 'test1234', 'hello1234@hello.com', NULL),
(31, 'hello', 'test1234', 'testhello1234@hello.com', NULL),
(32, 'hello', 'test1234', 'test1234@testest.com', NULL),
(33, 'hello', 'test1234', 'test1234@test1234.com', NULL),
(34, 'hello', 'test1234', 'test1234@test12345.com', NULL),
(35, 'hello', 'test1234', 'a@test12345.com', 'C8r4kRrqrjqDPD76q'),
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
(63, 'hello', 'test', 'b@hotmail.com', 'jXX4ijuZ7TCZAYqjX'),
(64, 'hello', 'test1234', 'z@hotmail.com', 'wdX5FXK9gASYstjwS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
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
-- AUTO_INCREMENT for table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=313;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
