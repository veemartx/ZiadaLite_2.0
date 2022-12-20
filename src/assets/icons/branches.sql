-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 17, 2022 at 07:24 PM
-- Server version: 5.7.36
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmapl_ziadalite_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(100) NOT NULL,
  `branchId` varchar(100) NOT NULL,
  `branchName` varchar(100) NOT NULL,
  `subregion` varchar(100) DEFAULT NULL,
  `branchRegion` varchar(100) NOT NULL,
  `monthlySalesTarget` decimal(10,2) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `branchId`, `branchName`, `subregion`, `branchRegion`, `monthlySalesTarget`, `status`) VALUES
(1, '5eeaa039d997c', 'Nyali', 'Mombasa B', 'Mombasa', 0.00, 'active'),
(2, '5eeaa0455fad5', 'Cinemax', 'Mombasa B', 'Mombasa', 0.00, 'active'),
(3, '5eeaa06bd0910', 'Likoni', 'Mombasa A', 'Mombasa', 0.00, 'active'),
(4, '5eeaa075b01c3', 'Ukunda', 'Mombasa A', 'Mombasa', 0.00, 'active'),
(5, '5eeaa0a2d5fd5', 'Capital', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(6, '5eeaa0b470d3c', 'Syokimau', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(7, '5eeaa0c37aad9', 'Kitengela Old', 'Mombasa Road B', 'Mombasa Road', 0.00, 'active'),
(8, '5eeaa0d13572f', 'Kitengela Naivas', 'Mombasa Road B', 'Mombasa Road', 0.00, 'active'),
(9, '5eeaa0de4ea7e', 'Athi River', 'Mombasa Road B', 'Mombasa Road', 0.00, 'active'),
(10, '5eeaa0ee2622b', 'Machakos', 'Mombasa Road B', 'Mombasa Road', 0.00, 'active'),
(11, '5eeaa1442240e', 'Village Market', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(12, '5eeaa14eb4f16', 'Kiambu Rd', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(13, '5eeaa1578d390', 'Ciata', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(14, '5eeaa1644bd93', 'Shell Survey', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(15, '5eeaa16ed5dea', 'Roysambu', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(16, '5eeaa17b6e51e', 'Ruiru', 'Thika Road B', 'Thika Road', 0.00, 'active'),
(17, '5eeaa2e3148a7', 'Lavington', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(18, '5eeaa2f596fcb', 'Shell Waiyaki', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(19, '5eeaa312496fd', 'Rongai', 'Upmarket Diaspora B', 'Upmarket Diaspora', 0.00, 'active'),
(20, '5eeaa31c3d615', 'Nakuru', 'Upmarket Diaspora A', 'Upmarket Diaspora', 0.00, 'active'),
(21, '5eeaa3263b294', 'Kisumu', 'Upmarket Diaspora B', 'Upmarket Diaspora', 0.00, 'active'),
(22, '5eeaa33383b11', 'Mountain View', 'Upmarket Suburbs A', 'Upmarket Suburbs', 0.00, 'active'),
(23, '5eeaa38347060', 'Shell Karen', 'Upmarket Diaspora B', 'Upmarket Diaspora ', 0.00, 'active'),
(24, '5eef0ddc215c8', 'HQ', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(25, '5efcac7f6a83e', 'Kilimani ', 'Upmarket Diaspora A', 'Upmarket Diaspora ', 0.00, 'active'),
(26, '5f0ab0be038e9', 'Embakasi ', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(27, '5f6702119bf7b', 'Total Links Road ', 'Mombasa A', 'Mombasa', 0.00, 'active'),
(28, '5f67042805998', 'Naivas  airport view ', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(29, '5f6e374110cdd', 'Kiserian ', 'Upmarket Diaspora B', 'Upmarket Diaspora ', 0.00, 'active'),
(30, '5f981313cd0c5', 'Ojijo', 'Thika Road B', 'Thika Road', 0.00, 'active'),
(31, '5fe43a3a303e1', 'Lenana ', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(32, '601fbe4bb1c66', 'Kingara', 'Upmarket Suburbs A', 'Upmarket Suburbs', 0.00, 'active'),
(34, '603c54046e43d', 'Quickmart Mombasa Rd', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(35, '608a5501479d3', 'Thika', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(36, '60e48983a44a4', 'Kerarapong', 'Upmarket Diaspora A', 'Upmarket Diaspora ', 0.00, 'active'),
(37, '60fe3a0e3fb30', 'Strip Mall Lavington ', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(38, '614b52b0afa68', 'Gigiri Petrocity', 'Upmarket Diaspora A', 'Upmarket Diaspora', 0.00, 'active'),
(39, '6163e52868982', 'Kahawa', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(40, '61644aecd3cd6', 'Kilimani Mall ', 'Upmarket Suburbs A', 'Upmarket Suburbs', 0.00, 'active'),
(41, '617fb20479df1', 'Bamburi', 'Mombasa B', 'Mombasa', 0.00, 'active'),
(42, '61adc44e5743f', 'Kilifi', 'Mombasa B', 'Mombasa', 0.00, 'active'),
(43, '61b1cd1fbf6cb', 'Viashla', 'Thika Road B', 'Thika Road', 0.00, 'active'),
(44, '61f96461027f8', 'Bandari ', 'Mombasa A', 'Mombasa', 0.00, 'active'),
(45, '61fa37c17fed2', 'Shell links', 'Mombasa B', 'Mombasa', 0.00, 'active'),
(46, '6204f91465a10', 'OBC Mall', 'Mombasa Road B', 'Mombasa Road', 0.00, 'active'),
(47, '621b98a2b1a1c', 'Imaara', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(48, '6241aecb2e9a3', 'Mastermind ', 'Mombasa Road B', 'Mombasa Road', 0.00, 'active'),
(49, '6288d77736954', 'Naivasha ', 'Upmarket Diaspora A', 'Upmarket Diaspora ', 0.00, 'active'),
(50, '6290bcaf3c04a', 'Shell Embakasi ', 'Mombasa Road A', 'Mombasa Road', 0.00, 'active'),
(51, '62db972e20502', 'Sigona', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(52, '636a2e8d0c767', 'Kahawa sukari Mall', 'Thika Road A', 'Thika Road', 0.00, 'active'),
(53, '636df205ab4b8', 'Comet House', NULL, 'Thika Road', 0.00, 'active'),
(54, '63746f1256ed0', 'Fourways', NULL, 'Thika Road', 0.00, 'active'),
(55, '637b6b83ad5f6', 'Kahawa Maziwa ', NULL, 'Thika Road', 0.00, 'active'),
(56, '63834e9dd92bf', 'Chaka', 'Upmarket Suburbs B', 'Upmarket Suburbs', 0.00, 'active'),
(57, '6394a0747cc01', 'Nairobi west', NULL, 'Mombasa Road', 0.00, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
