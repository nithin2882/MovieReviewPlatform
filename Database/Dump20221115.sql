-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: reviewdb
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_title` varchar(45) NOT NULL,
  `movie_year` int(11) NOT NULL,
  `movie_language` varchar(45) NOT NULL,
  `movie_genre` varchar(45) NOT NULL,
  `movie_rating` int(11) NOT NULL DEFAULT '0',
  `movie_publish` varchar(5) DEFAULT 'false',
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `movie_title_UNIQUE` (`movie_title`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'love today',2023,'tamil','comedy',0,'false'),(2,'thiruchidrambalam',2022,'tamil','drama',8,'true'),(3,'ponniyn selvan',2022,'tamil','action',8,'true'),(4,'john wick',2013,'english','thriller',5,'true'),(5,'Avengers',2011,'English','action',9,'true'),(7,'john wick 2',2017,'English','action',0,'true'),(8,'MOVIE1',2018,'TAMIL','comedy',0,'true');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `review_rating` int(11) NOT NULL,
  `review_comments` varchar(500) DEFAULT NULL,
  `user_category` varchar(45) NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `unique_user_movie` (`user_id`,`movie_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `movie_id_idx` (`movie_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (5,1,2,7,'','viewer'),(6,1,3,6,'','viewer'),(8,4,2,8,'nice movie','viewer'),(9,4,3,9,'historic movie','viewer'),(10,4,4,5,'Action Movie','viewer'),(11,4,5,9,'Action Movie','viewer');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `review_AFTER_INSERT` AFTER INSERT ON `review` FOR EACH ROW BEGIN
 If (select count(user_id) from review where user_id = New.user_id) > 3 Then
		Update user Set user_category = 'critic' Where user_id = New.user_id ;
    End if ;

	Update movie 
		Set movie_rating = (select Round((sum(case when r.user_category = 'critic' then (r.review_rating * 2) else r.review_rating end) / count(r.review_rating)),0) 
						from review r, user u 
						where r.user_id = u.user_id and r.movie_id = New.movie_id) 
    Where movie_id = New.movie_id ;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `review_AFTER_UPDATE` AFTER UPDATE ON `review` FOR EACH ROW BEGIN	
    If (select count(user_id) from review where user_id = New.user_id) > 3 Then
		Update user Set user_category = 'critic' Where user_id = New.user_id ;
    End if ;

	Update movie 
		Set movie_rating = (select Round((sum(case when u.user_category = 'critic' then (r.review_rating * 2) else r.review_rating end) / count(r.review_rating)),0) 
						from review r, user u 
						where r.user_id = u.user_id and r.movie_id = New.movie_id) 
    Where movie_id = New.movie_id ;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_emailid` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_category` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_id_UNIQUE` (`user_emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jawa','jawa@gmail.com','jawa30','admin'),(2,'nithin','nithin@gmail.com','nithin02','viewer'),(3,'anusha','anusha@gmail','anusha01','viewer'),(4,'mukesh','mukesh@gmail.com','mukesh3','critic'),(5,'pravin','pravin1gmail','pravin01','viewer'),(6,'pravin','pravin1@gmail','pravin01','viewer'),(7,'pravin','pravin1@gmail.com','pravin01','viewer'),(8,'jai','jai@gmail.com','jai','viewer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'reviewdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-15 20:35:01
