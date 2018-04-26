-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 26, 2018 at 01:24 PM
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
  `avg` float DEFAULT NULL,
  `mode` varchar(20) DEFAULT NULL,
  `real_period_type_date` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`_id`, `type`, `item`, `period_num`, `period_type_date`, `avg`, `mode`, `real_period_type_date`) VALUES
(7, 'fresh food', 'meat', 15, 'days', 0, 'null', 'days'),
(13, 'fresh food', 'apple', 5, 'days', 0, 'null', 'days'),
(15, 'food', 'snack', 365, 'days', 0, 'null', 'days'),
(17, 'Fresh Food', 'Pork', 5, 'days', 0, 'null', 'days'),
(18, 'fresh food', 'orange', 10, 'days', 0, 'null', 'days'),
(19, 'fresh food', '', 7, 'days', 9, '9', 'days'),
(20, 'fresh food', 'fruit', 7, 'days', 0, 'null', 'days'),
(21, 'Health & Beauty', 'lip ', 365, 'days', 0, 'null', 'days'),
(22, 'Pantry Food', 'spicy sauce', 365, 'days', 0, 'null', 'days');

-- --------------------------------------------------------

--
-- Table structure for table `location_notification`
--

CREATE TABLE `location_notification` (
  `_id` int(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `max_distance` int(128) NOT NULL,
  `max_time_sec` int(128) NOT NULL,
  `middle_time_sec` int(128) NOT NULL,
  `min_distance` int(128) NOT NULL,
  `min_time_sec` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location_notification`
--

INSERT INTO `location_notification` (`_id`, `type`, `max_distance`, `max_time_sec`, `middle_time_sec`, `min_distance`, `min_time_sec`) VALUES
(1, 'arrive', 10, 300, 100, 5, 50),
(2, 'pass', 10, 300, 100, 5, 50),
(3, 'depart', 2, 30, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `_id` int(255) NOT NULL,
  `reminder_id` int(255) NOT NULL,
  `time` time DEFAULT NULL,
  `date` varchar(20) NOT NULL,
  `before_after` varchar(10) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `placename` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`_id`, `reminder_id`, `time`, `date`, `before_after`, `number`, `type`, `placename`) VALUES
(516, 561, '15:00:00', '2561-04-30', 'Before', 3, 'Days', 'Mega Bangna'),
(517, 561, '15:00:00', '2561-05-02', 'Before', 1, 'Days', 'Mega Bangna'),
(518, 562, '06:30:00', '2561-05-02', 'Before', 3, 'Days', ''),
(519, 562, '06:30:00', '2561-05-04', 'Before', 1, 'Days', ''),
(520, 563, '12:30:00', '2561-04-27', 'Before', 3, 'Days', ''),
(521, 564, '12:30:00', '2561-04-30', 'Before', 5, 'Days', ''),
(522, 564, '12:30:00', '2561-05-03', 'Before', 2, 'Days', ''),
(523, 565, '12:30:00', '2561-05-01', 'Before', 2, 'Days', ''),
(524, 566, '09:00:00', '2561-05-02', 'Before', 7, 'Days', ''),
(525, 567, '12:30:00', '2561-05-08', 'Before', 3, 'Days', 'Seacon Square'),
(531, 580, '12:30:00', '2561-10-28', 'Before', 6, 'Mths', ''),
(532, 581, '12:30:00', '2562-02-25', 'Before', 2, 'Mths', ''),
(533, 582, '18:30:00', '2561-10-28', 'Before', 6, 'Mths', 'Max Value'),
(534, 582, '18:30:00', '2562-02-25', 'Before', 2, 'Mths', 'Max Value');

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
(47, 'Computer Engineering Department', 33.908290199999996, 35.1461468),
(48, 'KASIKORNBANK', 100.5296888, 13.743412200000003),
(49, 'Paragon Cineplex', 100.53481230000001, 13.746090599999997),
(50, 'MaxValu', 100.5837402, 13.7231104),
(51, 'TOPS Supermarket', 100.56697249999999, 13.8437735),
(52, 'EVEANDBOY Siam Square One', 100.53391189999999, 13.744878000000002),
(53, 'Timber cafe thailand', 100.76597029999999, 13.7270538),
(54, 'Dream World', 100.67508699999999, 13.987753999999999),
(55, 'Central Plaza Ladprao', 100.56081809999999, 13.816401400000002),
(56, 'Bangkok Noi', 100.4677576, 13.765922499999999),
(57, 'Rayong', 101.1473517, 12.707433999999997),
(58, 'Max Value', 100.64224929999999, 13.7358911);

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
  `start_date` varchar(20) NOT NULL,
  `purchase_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) NOT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `placename` varchar(64) NOT NULL,
  `latitude` double NOT NULL,
  `longtitude` double NOT NULL,
  `taskname` varchar(64) NOT NULL,
  `subtaskname` text,
  `complete` tinyint(1) NOT NULL,
  `timestamp_complete` datetime DEFAULT NULL,
  `total` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`_id`, `user_id`, `type`, `notification`, `allday`, `start_date`, `purchase_date`, `end_date`, `start_time`, `end_time`, `placename`, `latitude`, `longtitude`, `taskname`, `subtaskname`, `complete`, `timestamp_complete`, `total`) VALUES
(544, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'buy book', NULL, 1, '2561-04-26 17:58:37', NULL),
(546, 27, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'meet friend', NULL, 1, '2561-04-26 17:58:37', NULL),
(547, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Thammasat University', 13.7565121, 100.4923209, 'learn', NULL, 1, '2561-04-26 17:59:07', NULL),
(548, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Pattaya City', 12.9235557, 100.8824551, 'travel', NULL, 1, '2561-04-26 17:59:23', NULL),
(549, 65, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'working', NULL, 1, '2561-04-26 18:01:01', NULL),
(550, 65, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'meeting friend ', NULL, 1, '2561-04-26 18:01:02', NULL),
(551, 65, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'buy book', NULL, 1, '2561-04-26 18:01:02', NULL),
(552, 65, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'get bag', NULL, 1, '2561-04-26 18:01:37', NULL),
(553, 65, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'learning', NULL, 1, '2561-04-26 18:02:24', NULL),
(554, 65, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'get ticket', NULL, 1, '2561-04-26 18:02:59', NULL),
(555, 65, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Bangkok', 13.7563309, 100.5017651, 'meeting friend', NULL, 1, '2561-04-26 18:03:25', NULL),
(556, 65, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Chon Buri', 13.361143099999998, 100.98467169999999, 'buy seafood', NULL, 1, '2561-04-26 18:04:12', NULL),
(557, 64, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, '9:00', NULL, 1, '2561-04-26 18:07:46', NULL),
(558, 64, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'show', NULL, 1, '2561-04-26 18:08:11', NULL),
(559, 64, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Bangkok Noi', 13.765922499999999, 100.4677576, 'seeview', NULL, 1, '2561-04-26 18:09:01', NULL),
(560, 27, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'buy food', NULL, 0, NULL, NULL),
(561, 27, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-05-03', NULL, NULL, 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'fresh food', '', 1, '2561-04-26 20:19:07', 7),
(562, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-05-05', NULL, NULL, '', 0, 0, 'fresh food', '', 1, '2561-04-26 19:48:30', 9),
(563, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-04-30', NULL, NULL, '', 0, 0, 'fresh food', '', 1, '2561-04-26 19:49:01', 4),
(564, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-05-05', NULL, NULL, '', 0, 0, 'fresh food', 'orange', 1, '2561-04-26 19:49:26', 9),
(565, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-05-03', NULL, NULL, '', 0, 0, 'fresh food', 'apple', 1, '2561-04-26 19:49:50', 7),
(566, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-05-09', NULL, NULL, '', 0, 0, 'fresh food', 'fruit', 1, '2561-04-26 19:50:25', 13),
(567, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2561-05-11', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'fresh food', 'meat', 1, '2561-04-26 19:50:45', 15),
(568, 64, 'Reminder', '', NULL, '2561-04-25', '2561-04-26', '2562-04-26', NULL, NULL, '', 0, 0, 'health & beauty', 'lip ', 1, '2561-04-26 19:53:10', 366),
(569, 64, 'Reminder', '', NULL, '2561-04-25', '2561-04-26', '2562-04-26', NULL, NULL, '', 0, 0, 'food', 'snack', 1, '2561-04-26 19:53:49', 366),
(570, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2562-04-26', NULL, NULL, '', 0, 0, 'pantry food', 'spicy sauce', 1, '2561-04-26 19:54:37', 365),
(580, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2562-04-26', NULL, NULL, '', 0, 0, 'food', 'snack', 1, '2561-04-26 20:13:00', 365),
(581, 64, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2562-04-26', NULL, NULL, '', 0, 0, 'pantry food', 'spicy sauce', 1, '2561-04-26 20:18:43', 365),
(582, 27, 'Reminder', '', NULL, '2561-04-26', '2561-04-26', '2562-04-26', NULL, NULL, 'Max Value', 13.7358911, 100.64224929999999, 'food', 'snack', 1, '2561-04-26 20:20:18', 365);

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
(24, 'test', '1234', 'test@root.com', NULL),
(25, 'test', '1234', 'test@root.com', NULL),
(26, 'test', '1234', 'test@test.com', NULL),
(27, 'test', '1234', 'test1234@test.com', 'mW6JnDpcdrneabg8o'),
(28, 'hello', '1234', 'hello1234@mail.com', NULL),
(29, 'hello', '1234', 'hello@hello.com', NULL),
(30, 'hello', '1234', 'hello1234@hello.com', NULL),
(31, 'hello', '1234', 'testhello1234@hello.com', NULL),
(32, 'hello', '1234', 'test1234@testest.com', NULL),
(33, 'hello', '1234', 'test1234@test1234.com', NULL),
(34, 'hello', '1234', 'test1234@test12345.com', NULL),
(35, 'hello', '1234', 'a@test12345.com', 'C8r4kRrqrjqDPD76q'),
(36, 'hello', '1234', 'b@test12345.com', NULL),
(37, 'hello', '1234', 'c@test12345.com', NULL),
(38, 'hello', '1234', 'd@test12345.com', NULL),
(39, 'hello', '1234', 'e@test12345.com', NULL),
(40, 'hello', '1234', 'f@test12345.com', NULL),
(41, 'hello', '1234', 'g@test12345.com', NULL),
(42, 'hello', '1234', 'h@test12345.com', NULL),
(43, 'hello', '1234', 'i@test12345.com', NULL),
(44, 'hello', '1234', 'j@test12345.com', NULL),
(45, 'hello1', '1234', 'k@test12345.com', NULL),
(46, 'hello', '1234', 'l@test12345.com', NULL),
(47, 'hello', '1234', 'm@test12345.com', NULL),
(48, 'hello', '1234', 'n@test12345.com', NULL),
(49, 'hellonew', '1234', 'o@test12345.com', '45ec2maC4KBgTKmQT'),
(50, 'hello', '1234', 'p@test12345.com', NULL),
(51, 'hello', '1234', 'q@test12345.com', 'TLuxozffWTJoFABez'),
(52, 'hello', '1234', 'r@test12345.com', 'HwzZGCmwAH7P59dSz'),
(53, 'hello', '1234', 's@test12345.com', 'Ez6EJFokN27CRaMMv'),
(54, 'hello', '1234', 't@test12345.com', 'tjPLkkKqg4f77w2bG'),
(55, 'u', '1234', 'u@test12345.com', '5EfEhnKF6RDEgi6r8'),
(56, 'root ', '1234', 'v@test12345.com', 'TzenZHSYBm4eDWM7m'),
(57, 'hello', '1234', 'w@test12345.com', NULL),
(58, 'x', '1234', 'x@test12345.com', NULL),
(59, 'hello', '1234', 'y@test12345.com', 'cazx7W5YQEGJ3crMg'),
(60, 'hello', '1234', 'z@test12345.com', NULL),
(61, 'hello', '1234', 'a@hotmail.com', '34kPFj9GERGJFartk'),
(62, 'f', '1234', 'ee', NULL),
(63, 'hello', '1234', 'b@hotmail.com', 'jXX4ijuZ7TCZAYqjX'),
(64, 'hello', '1234', 'z@hotmail.com', 'xX662NiYkzJ92MDT8'),
(65, 'thithirat', '1234', 'mook@kmitl.ac.th', 'ZnYjRiyYjjXbzBzhh');

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
-- Indexes for table `location_notification`
--
ALTER TABLE `location_notification`
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
  MODIFY `_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `location_notification`
--
ALTER TABLE `location_notification`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=535;
--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=583;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
