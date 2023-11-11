-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2023 at 01:51 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eptables`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_cntr`
--

CREATE TABLE IF NOT EXISTS `admin_cntr` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `inbox` int(11) NOT NULL,
  `new_employees` int(11) NOT NULL,
  `leaves` int(11) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin_cntr`
--

INSERT INTO `admin_cntr` (`auto_id`, `inbox`, `new_employees`, `leaves`) VALUES
(1, 0, -1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `admin_sign`
--

CREATE TABLE IF NOT EXISTS `admin_sign` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin_sign`
--

INSERT INTO `admin_sign` (`auto_id`, `admin_id`, `name`, `password`) VALUES
(1, 2023001, 'Aditya', 'aditya123');

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE IF NOT EXISTS `applications` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `from1` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `body` varchar(500) NOT NULL,
  `new` varchar(10) NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `employee_inbox`
--

CREATE TABLE IF NOT EXISTS `employee_inbox` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `from1` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `body` varchar(1000) NOT NULL,
  `new` varchar(10) NOT NULL,
  `to1` varchar(100) NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `employee_profile`
--

CREATE TABLE IF NOT EXISTS `employee_profile` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  `role` varchar(15) NOT NULL,
  `address` varchar(200) NOT NULL,
  `bank_details` varchar(200) NOT NULL,
  `dp_file` varchar(200) NOT NULL,
  `position` varchar(50) NOT NULL,
  `accepted` varchar(5) NOT NULL,
  `password` varchar(50) NOT NULL,
  `ps_path` varchar(100) NOT NULL,
  `voted` varchar(10) NOT NULL,
  `votes` int(11) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Table structure for table `employee_sign`
--

CREATE TABLE IF NOT EXISTS `employee_sign` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `employer_inbox`
--

CREATE TABLE IF NOT EXISTS `employer_inbox` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `from1` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `body` varchar(500) NOT NULL,
  `new` varchar(10) NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `emp_of_month`
--

CREATE TABLE IF NOT EXISTS `emp_of_month` (
  `message` varchar(100) NOT NULL,
  `pic_path` varchar(100) NOT NULL,
  `id` int(11) NOT NULL,
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `emp_of_month`
--

INSERT INTO `emp_of_month` (`message`, `pic_path`, `id`, `auto_id`) VALUES
('He is the one and only best employee of the month', '', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `idcounter`
--

CREATE TABLE IF NOT EXISTS `idcounter` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `yes_field` varchar(5) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `idcounter`
--

INSERT INTO `idcounter` (`auto_id`, `yes_field`) VALUES
(1, 'yes'),
(10, 'yes'),
(11, 'yes'),
(12, 'yes'),
(13, 'yes'),
(14, 'yes'),
(15, 'yes'),
(16, 'yes'),
(17, 'yes'),
(18, 'yes'),
(19, 'yes'),
(20, 'yes'),
(21, 'yes'),
(22, 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `leave_table`
--

CREATE TABLE IF NOT EXISTS `leave_table` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `from1` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `body` varchar(300) NOT NULL,
  `new` varchar(10) NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE IF NOT EXISTS `notices` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `text1` varchar(100) NOT NULL,
  `body1` varchar(200) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE IF NOT EXISTS `resources` (
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `text1` varchar(100) NOT NULL,
  `body1` varchar(200) NOT NULL,
  `link1` varchar(200) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
