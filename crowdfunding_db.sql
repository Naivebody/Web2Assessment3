-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`),
  UNIQUE KEY `category_NAME_uindex` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`CATEGORY_ID`, `NAME`) VALUES (5,'Art'),(1,'Construction'),(3,'Entertainment'),(2,'Internet'),(4,'Medical');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(30) NOT NULL,
  `CAPTION` varchar(20) NOT NULL,
  `TARGET_FUNDING` bigint NOT NULL,
  `CURRENT_FUNDING` bigint DEFAULT NULL,
  `CITY` varchar(20) DEFAULT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  `CATEGORY_ID` int DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`),
  KEY `fundraiser_category_fk` (`CATEGORY_ID`),
  CONSTRAINT `fundraiser_category_fk` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `DONATION_ID` int NOT NULL AUTO_INCREMENT,
  `DATE` date NOT NULL,
  `AMOUNT` int NOT NULL,
  `GIVER` varchar(20) NOT NULL,
  `FUNDRAISER_ID` int NOT NULL,
  PRIMARY KEY (`DONATION_ID`),
  KEY `donation_fundraiser_FUNDRAISER_ID_fk` (`FUNDRAISER_ID`),
  CONSTRAINT `donation_fundraiser_FUNDRAISER_ID_fk` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `fundraiser`
--

LOCK TABLES `fundraiser` WRITE;
/*!40000 ALTER TABLE `fundraiser` DISABLE KEYS */;
INSERT INTO `fundraiser` (`FUNDRAISER_ID`, `ORGANIZER`, `CAPTION`, `TARGET_FUNDING`, `CURRENT_FUNDING`, `CITY`, `ACTIVE`, `CATEGORY_ID`) VALUES (1,'Alibaba','Server need',400000,150000,'Sydney',1,2),(2,'Jackie Chen','New film',200000,100000,'Hong Kong',1,3),(3,'Tencent','Construction',600000,100000,'Beijing',1,1),(5,'Jay Chou','New songs',50000,20000,'Shanghai',1,3),(6,'Jay Chou','New schools',600000,300000,'Chongqing',1,5),(7,'Yunlin Li','Esports',200000,2000,'Liuzhou',0,3),(8,'Zihan Wei','Medical equipments',500000,100000,'Liuzhou',1,4),(9,'Yuezhong','Books for pupils',40000,20000,'Liuzhou',1,5),(10,'Reza','New roads',650000,300000,'Brisbane',0,1);
/*!40000 ALTER TABLE `fundraiser` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` (`DONATION_ID`, `DATE`, `AMOUNT`, `GIVER`, `FUNDRAISER_ID`) VALUES (1,'2024-09-01',50,'Zihan Wei',3),(2,'2024-09-02',100,'Yunlin Li',1),(3,'2024-10-01',200000,'Tencent',3),(4,'2024-10-03',40000,'Alibaba',8),(5,'2024-10-05',50,'Kun Ye',9);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;



/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12 21:41:01
