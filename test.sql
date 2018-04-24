-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 24, 2018 at 09:57 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
(13, 'fresh food', 'apple', 2, 'days', 0, 'null', 'days'),
(15, 'food', 'snack', 1, 'years', 0, 'null', 'days'),
(17, 'Fresh Food', 'Pork', 7, 'days', 0, 'null', 'days'),
(18, 'fresh food', 'orange', 7, 'days', 0, 'null', 'days'),
(19, 'fresh food', '', 9, 'days', 0, 'null', 'days'),
(20, 'fresh food', 'fruit', 7, 'days', 0, 'null', 'days'),
(21, 'Health & Beauty', 'lip ', 1, 'days', 0, 'null', 'days'),
(22, 'Pantry Food', 'spicy sauce', 1, 'days', 0, 'null', 'days');

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
(1, 'arrive', 10, 400, 100, 3, 50),
(2, 'pass', 10, 400, 0, 0, 0),
(3, 'depart', 10, 400, 0, 0, 0);

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
(448, 446, '21:31:00', '2561-04-21', 'Before', 4, 'Days', NULL),
(451, 454, NULL, '2561-04-20', 'Before', 3, 'Days', ''),
(452, 454, NULL, '2561-04-22', 'Before', 1, 'Days', ''),
(453, 455, NULL, '2561-04-21', 'Before', 4, 'Days', ''),
(454, 455, NULL, '2561-04-23', 'Before', 2, 'Days', ''),
(460, 470, '05:00:00', '2561-04-10', 'Before', 10, 'Hrs', NULL),
(461, 471, '18:30:00', '2561-04-18', NULL, NULL, NULL, NULL),
(462, 472, NULL, '2561-04-26', 'Before', 7, 'Days', 'Mega Bangna'),
(463, 472, NULL, '2561-04-30', 'Before', 3, 'Days', 'Mega Bangna'),
(464, 463, '06:44:00', '2561-04-20', 'Before', 1, 'Mins', NULL),
(470, 478, '11:35:00', '2561-04-19', NULL, NULL, NULL, NULL),
(471, 479, '14:15:00', '2559-11-01', 'After', 7, 'Days', NULL),
(472, 480, '14:15:00', '2559-11-01', 'After', 7, 'Days', NULL),
(473, 482, '14:15:00', '2559-11-01', 'After', 7, 'Days', NULL),
(474, 483, '14:15:00', '2559-01-01', 'After', 7, 'Days', NULL),
(475, 484, '14:15:00', '2559-01-01', 'After', 7, 'Days', NULL),
(476, 485, '14:15:00', '2559-01-01', 'After', 7, 'Days', NULL),
(477, 486, '14:15:00', '2559-03-03', 'After', 7, 'Days', NULL),
(478, 487, '14:15:00', '2558-03-04', 'After', 7, 'Days', NULL),
(479, 488, '14:15:00', '2558-01-01', 'After', 7, 'Days', NULL),
(480, 489, '14:15:00', '2557-11-09', 'After', 7, 'Days', NULL),
(481, 490, '14:15:00', '2557-12-10', 'After', 7, 'Days', NULL),
(482, 491, '14:15:00', '2557-12-10', 'After', 7, 'Days', NULL),
(483, 492, '14:15:00', '2557-12-10', 'After', 7, 'Days', NULL),
(484, 493, '14:15:00', '2557-12-10', 'After', 7, 'Days', NULL),
(485, 494, '14:15:00', '2557-12-10', 'After', 7, 'Days', NULL),
(486, 495, '14:15:00', '2557-12-10', 'After', 7, 'Days', NULL),
(487, 496, '12:30:00', '2557-12-10', 'After', 7, 'Days', NULL),
(488, 497, '12:30:00', '2557-12-10', 'After', 7, 'Days', NULL),
(489, 498, '12:30:00', '2557-12-10', 'After', 7, 'Days', NULL),
(490, 499, '12:45:00', '2557-12-13', 'After', 7, 'Days', NULL),
(491, 500, '12:45:00', '2557-12-13', 'After', 7, 'Days', NULL),
(492, 501, '12:45:00', '2557-12-13', 'After', 7, 'Days', NULL),
(493, 502, '12:45:00', '2557-12-13', 'After', 7, 'Days', NULL),
(494, 503, '12:45:00', '2557-12-13', 'After', 7, 'Days', NULL),
(495, 521, '09:48:00', '2014-12-12', 'After', 7, 'Days', NULL),
(496, 522, '09:48:00', '2014-12-12', 'After', 7, 'Days', NULL);

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
(56, 'Bangkok Noi', 100.4677576, 13.765922499999999);

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
(445, 27, 'Reminder', '', NULL, '2561-04-10', '2561-04-16', '2561-04-27', NULL, NULL, '', 0, 0, 'health & beauty', 'lip ', 0, '2561-04-16 03:42:36', 17),
(446, 27, 'Reminder', '', NULL, '2561-04-09', '2561-04-16', '2561-04-25', NULL, NULL, '', 0, 0, 'pantry food', 'spicy sauce', 0, '2561-04-16 03:46:29', 16),
(448, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'learn', NULL, 1, '2561-04-18 01:07:08', NULL),
(449, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'shopping ', NULL, 1, '2561-04-19 01:35:16', NULL),
(450, 27, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'Bangkok', 13.7563309, 100.5017651, 'travel', NULL, 1, '2561-04-19 01:35:17', NULL),
(451, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Bangkok', 13.7563309, 100.5017651, 'work', NULL, 1, '2561-04-18 01:05:07', NULL),
(452, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Bangkok', 13.7563309, 100.5017651, 'meeting', NULL, 1, '2561-04-18 01:05:05', NULL),
(453, 27, 'Reminder', '', NULL, '2561-04-16', '2561-04-16', '2561-04-25', NULL, NULL, '', 0, 0, 'fresh food', '', 0, '2561-04-16 03:47:24', 9),
(454, 27, 'Reminder', '', NULL, '2561-04-16', '2561-04-16', '2561-04-23', NULL, NULL, '', 0, 0, 'fresh food', 'fruit', 0, '2561-04-16 03:47:56', 7),
(455, 27, 'Reminder', '', NULL, '2561-04-16', '2561-04-16', '2561-04-25', NULL, NULL, '', 0, 0, 'fresh food', '', 0, '2561-04-18 01:03:20', 9),
(462, 27, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'sleep', NULL, 1, '2561-04-18 01:07:10', NULL),
(465, 27, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'pick up phone', NULL, 1, '2561-04-19 01:35:17', NULL),
(466, 27, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'Thammasat University', 13.7565121, 100.4923209, 'buy book', NULL, 1, '2561-04-19 01:35:18', NULL),
(467, 27, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Dream World', 13.987753999999999, 100.67508699999999, 'borrow balloon', NULL, 1, '2561-04-19 01:35:18', NULL),
(468, 65, 'Location', 'Depart', NULL, '', NULL, '', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'buy notebook', NULL, 1, '2561-04-18 03:35:57', NULL),
(469, 65, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Siam Center', 13.746252399999998, 100.53286349999999, 'pick up phone', NULL, 1, '2561-04-18 01:30:56', NULL),
(472, 65, 'Reminder', '', NULL, '2561-04-18', '2561-04-18', '2561-05-03', NULL, NULL, 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'fresh food', 'meat', 0, '2561-04-18 03:36:00', 15),
(474, 65, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Seacon Square', 13.6939777, 100.6481189, 'buy food', NULL, 1, '2561-04-18 02:08:26', NULL),
(475, 65, 'Location', 'Arrive', NULL, '', NULL, '', NULL, NULL, 'Pattaya City', 12.9235557, 100.8824551, 'find crab', NULL, 1, '2561-04-18 02:09:12', NULL),
(476, 65, 'Location', 'Pass', NULL, '', NULL, '', NULL, NULL, 'Bangkok', 13.7563309, 100.5017651, 'travel', NULL, 1, '2561-04-18 03:36:01', NULL),
(503, 27, 'Event', '', 0, '2557-12-05', NULL, '2557-12-06', '10:15:00', '12:45:00', 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'test 3', NULL, 0, NULL, NULL),
(504, 27, 'Event', '', 0, '2561-04-18', NULL, '2561-04-19', '06:30:00', '18:30:00', 'KMITL Faculty of Engineering Office', 13.7269923, 100.7763884, 'root ', NULL, 1, '2561-04-24 01:56:06', NULL),
(506, 27, 'Event', '', 0, '2561-04-15', NULL, '2561-04-15', '12:30:00', '14:00:00', 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'test', NULL, 1, '2561-04-24 01:56:05', NULL),
(507, 27, 'Event', '', 0, '2561-04-21', NULL, '2561-04-21', '11:44:00', '12:00:00', 'Chon Buri', 13.361143099999998, 100.98467169999999, 'hello', NULL, 1, '2561-04-24 01:56:05', NULL),
(508, 27, 'Event', '', 0, '2561-04-23', NULL, '2561-04-23', '11:55:00', '12:00:00', 'Bangkok', 13.7563309, 100.5017651, 'root ', NULL, 1, '2561-04-24 02:10:05', NULL),
(509, 27, 'Event', '', 0, '2561-04-22', NULL, '2561-04-22', '10:48:00', '12:00:00', 'Seacon Square', 13.6939777, 100.6481189, 'event', NULL, 1, '2561-04-24 02:10:04', NULL),
(510, 27, 'Event', '', 0, '2561-04-30', NULL, '2561-04-30', '09:51:00', '10:44:00', 'Bangkok', 13.7563309, 100.5017651, 'the ', NULL, 1, '2561-04-24 02:10:03', NULL),
(513, 27, 'Event', '', 0, '2561-04-22', NULL, '2561-04-22', '12:00:00', '12:30:00', 'Bangkok Noi', 13.765922499999999, 100.4677576, 'the', NULL, 1, '2561-04-24 02:14:13', NULL),
(514, 27, 'Event', '', 0, '2561-04-22', NULL, '2561-04-22', '12:00:00', '12:30:00', 'Bangkok Noi', 13.765922499999999, 100.4677576, 'the', NULL, 1, '2561-04-24 02:14:12', NULL),
(515, 27, 'Event', '', 0, '2561-04-25', NULL, '2561-04-25', '06:30:00', '07:30:00', 'Siam Center', 13.746252399999998, 100.53286349999999, 'I will ', NULL, 1, '2561-04-24 02:14:12', NULL),
(516, 27, 'Event', '', 0, '2561-04-25', NULL, '2561-04-25', '06:30:00', '07:30:00', 'Siam Center', 13.746252399999998, 100.53286349999999, 'I will ', NULL, 1, '2561-04-24 02:14:12', NULL),
(519, 27, 'Event', '', 0, '2561-04-22', NULL, '2561-04-22', '06:08:00', '07:08:00', 'Central Plaza Ladprao', 13.816401400000002, 100.56081809999999, 'root ', NULL, 0, NULL, NULL),
(520, 27, 'Event', '', 0, '2561-04-26', NULL, '2561-04-26', '06:35:00', '08:35:00', 'Mega Bangna', 13.648608300000001, 100.67980709999999, 'hello', NULL, 0, NULL, NULL),
(521, 27, 'Event', '', 0, '2014-12-3', NULL, '2014-12-5', '12:44:00', '09:48:00', 'Bangkok', 13.7563309, 100.5017651, 'test 3', NULL, 0, NULL, NULL),
(522, 27, 'Event', '', 0, '2014-12-3', NULL, '2014-12-5', '12:44:00', '09:48:00', 'Bangkok', 13.7563309, 100.5017651, 'test 3', NULL, 0, NULL, NULL);

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
(27, 'test', '1234', 'test1234@test.com', 'hEYXLejHpL8L9DMKa'),
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
(49, 'hellonew', '1234', 'o@test12345.com', 'zQFp993KKCLC85mBT'),
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
(64, 'hello', '1234', 'z@hotmail.com', 'wdX5FXK9gASYstjwS'),
(65, 'thithirat', '1234', 'mook@kmitl.ac.th', 'uYcNEELWxyfXXP7Zi');

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
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=497;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=523;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
