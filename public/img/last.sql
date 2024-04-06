-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3307
-- Généré le : sam. 06 avr. 2024 à 07:02
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id_ad` int(100) NOT NULL,
  `id_compte_ad` int(100) NOT NULL,
  `id_article` int(100) NOT NULL,
  `tel_ad` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_ad`, `id_compte_ad`, `id_article`, `tel_ad`) VALUES
(2, 2, 2, 786755645);

-- --------------------------------------------------------

--
-- Structure de la table `arbitre`
--

CREATE TABLE `arbitre` (
  `id_ar` int(100) NOT NULL,
  `nom_ar` varchar(100) NOT NULL,
  `prenom_ar` varchar(100) NOT NULL,
  `poste_ar` varchar(100) NOT NULL,
  `id_ma_ar` int(100) NOT NULL,
  `id_co_ar` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `id_art` int(100) NOT NULL,
  `date_art` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `titre_art` varchar(100) NOT NULL,
  `description_art` text NOT NULL,
  `image_art` varchar(500) DEFAULT NULL,
  `auteur_art` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id_art`, `date_art`, `titre_art`, `description_art`, `image_art`, `auteur_art`) VALUES
(1, '2024-04-05 06:17:09.142175', 'FORMATION DES ENTRAINEURS|FAF2', 'Dans le monde du football, la formation des entraîneurs est une composante essentielle pour le développement continu du sport. La Fédération Algérienne de Football (FAF) reconnaît cette importance en offrant le programme de formation FAF2, une étape cruciale pour les entraîneurs aspirants et établis.\r\n\r\nLe programme FAF2 vise à fournir aux entraîneurs les compétences et les connaissances nécessaires pour exceller dans leur rôle sur le terrain. Il couvre un large éventail de sujets, allant des techniques de coaching avancées à la gestion de l\'équipe et à la tactique de jeu. Les participants bénéficient également d\'une formation pratique sur le terrain, ce qui leur permet d\'appliquer les concepts appris dans des situations réelles.\r\n\r\nCe programme de formation ne se limite pas seulement aux aspects techniques du jeu. La FAF2 met également l\'accent sur le développement personnel des entraîneurs, les encourageant à cultiver des qualités telles que le leadership, la communication et la résolution de problèmes. Ces compétences non seulement améliorent leur efficacité en tant qu\'entraîneurs, mais aussi leur capacité à influencer positivement la vie de leurs joueurs en dehors du terrain.\r\n\r\nL\'impact de la FAF2 se fait sentir à tous les niveaux du football, que ce soit au niveau amateur, professionnel ou international. Les entraîneurs qui ont suivi avec succès ce programme contribuent de manière significative à l\'amélioration du standard du football algérien et jouent un rôle crucial dans la formation des futurs talents.\r\n\r\nEn fin de compte, la FAF2 représente bien plus qu\'une simple formation pour les entraîneurs. C\'est une reconnaissance de l\'importance du développement continu dans le monde du football et une affirmation de l\'engagement de la FAF envers l\'excellence dans tous les aspects du sport.', 'art2.jpeg', 'yassine'),
(2, '2024-04-05 20:46:56.203684', 'STAGE DE FORMATION POUR LES ARBITRES', 'ting and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\r\n\r\nWhy do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n\r\n\r\nWhere does it come from?\r\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\r\n\r\nWhere can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\r\n\r\n5\r\n	paragraphs\r\n	words\r\n	bytes\r\n	lists\r\n	Start with \'Lorem\r\nipsum dolor sit amet...\'\r\n', 'art4.jpeg', 'zakaria'),
(3, '2024-04-05 06:12:40.350654', 'UN GESTE PARTICULIER ET UNE BONNE INITIATIVE', 'Au-delà des compétitions acharnées et des rivalités intenses sur le terrain de football, il existe des moments qui nous rappellent la véritable essence du sport : le partage, la solidarité et la communauté.\r\n\r\nLors d\'un récent match local de football, une scène inhabituelle s\'est déroulée qui a captivé l\'attention de tous les spectateurs. Alors que l\'équipe adverse menait au score et que le match touchait à sa fin, un joueur de l\'équipe gagnante s\'est soudainement effondré sur le terrain, se tenant le genou dans une grimace de douleur.\r\n\r\nAu lieu de célébrer leur avance, les joueurs de l\'équipe adverse ont immédiatement arrêté de jouer et se sont précipités vers leur camarade blessé. Dans un geste de solidarité et de fair-play remarquable, ils se sont rassemblés autour de lui, offrant leur soutien et leur réconfort.\r\n\r\nLes spectateurs ont retenu leur souffle alors que le joueur blessé était aidé à se relever et escorté hors du terrain pour recevoir les soins nécessaires. Dans un moment touchant de camaraderie, les deux équipes se sont réunies au centre du terrain pour échanger des salutations et des encouragements, mettant de côté la rivalité du jeu pour célébrer l\'esprit du sport.\r\n\r\nCe geste particulier et cette bonne initiative illustrent parfaitement les valeurs fondamentales du football : le respect, la solidarité et l\'empathie. Ils nous rappellent que, même dans l\'adversité, nous pouvons trouver des occasions de nous soutenir mutuellement et de cultiver un environnement de camaraderie et de fair-play sur et hors du terrain.\r\n\r\nEn fin de compte, ce ne sont pas seulement les victoires ou les défaites qui définissent le football, mais les moments de connexion humaine et de générosité qui transcendent le jeu et nous unissent en tant que communauté de passionnés du football.', 'art1.jpg', 'zakaria'),
(4, '2024-04-05 06:21:12.368345', 'EXAMEN MEDICALE', 'Les examens médicaux sportifs sont essentiels pour les athlètes à tous les niveaux. Ils permettent de détecter précocement les problèmes de santé, d\'évaluer la condition physique, de prévenir les blessures et d\'optimiser la performance. En investissant dans ces examens réguliers, les athlètes peuvent maximiser leur santé et leurs performances sportives à long terme.', 'art3.jpg', 'zakaria');

-- --------------------------------------------------------

--
-- Structure de la table `calendrier`
--

CREATE TABLE `calendrier` (
  `id_journee` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `calendrier`
--

INSERT INTO `calendrier` (`id_journee`) VALUES
(1),
(2),
(3);

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `id_art_com` int(100) NOT NULL,
  `id_vis_com` int(100) NOT NULL,
  `description_com` text NOT NULL,
  `date_com` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `horaire_com` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id_art_com`, `id_vis_com`, `description_com`, `date_com`, `horaire_com`) VALUES
(4, 1, 'ca fait du bien', '2024-02-15 10:03:03.000000', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE `compte` (
  `id_co` int(100) NOT NULL,
  `id_type` int(100) NOT NULL,
  `nom_utilisateur` varchar(200) NOT NULL,
  `mot_de_passe` varchar(200) NOT NULL,
  `email_co` varchar(200) NOT NULL,
  `photo_profil` varchar(160) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`id_co`, `id_type`, `nom_utilisateur`, `mot_de_passe`, `email_co`, `photo_profil`) VALUES
(2, 1, 'mekiabbo', 'mk', 'mekiabbo1980@gmail.com', ''),
(3, 2, 'karimeg', 'karimho86&', 'karimmeg1995@gmail.com', ''),
(5, 4, 'zakaria belaid', 'zakibel099&', 'zakariabelaid929@gmail.com', ''),
(6, 5, 'yassine kahlalou', 'yassineka33', 'yassinekahlalou33@gmail.com', ''),
(7, 6, 'amine belaoudj', 'ez', 'aminebelaoudj1980@gmail.com', '1712017286094-432164220-images.jpg'),
(120, 6, 'dakaa', 'testt', 'daka@gmail.com', '1711474022140-186775792-images.jpg'),
(189, 2, 'mohamed ali', 'irWlZqbCMM', 'mohamed@gmail.com', ''),
(191, 2, 'riyadh hammoudi', 'riyaaaadhhbibi', 'riyadh@gmail.com', ''),
(192, 2, 'xavi hh', 'irWlZqbCMM', 'ali@gmail.Fr', ''),
(193, 2, '2024-04-05 dz', 'VSiJVe8tb4', 'mohamazzaeed@gmail.com', ''),
(194, 2, 'kessal amine', 'azea', 'aaamine@gmail.coem', ''),
(195, 2, 'Nadir Larbi', 'C2aRNw1911', 'mohaamazzaeed@gmail.com', ''),
(197, 2, 'Mohamed Kechroud', 'dazda', 'mohamed@gmail.com', ''),
(200, 2, 'wail youcef', 'wailcccfffyyy', 'wailyccf@gmail.com', ''),
(201, 2, 'Daouaji Daka', 'dakadd', 'dakad@gmail.com', ''),
(202, 2, 'daka omari', 'daka', 'dakaomaro@gmail.com', ''),
(203, 2, 'mdj yasser', 'sousou', 'yasser@gmail.com', ''),
(204, 2, 'krimou karim', 'krombooo', 'kripmou@gmail.com', ''),
(224, 5, 'ali', 'alilou', 'ali@gmail.com', '1712356227985-159170163-mahrez.jpg'),
(225, 5, 'moh', 'moh', 'moh@gmail.com', ''),
(226, 5, 'lounis', 'azeaze', 'lounis@gmail.org', '1712356227985-159170163-mahrez.jpg'),
(227, 6, 'aliali', 'lol', 'ali@gamil.com', '');

-- --------------------------------------------------------

--
-- Structure de la table `division`
--

CREATE TABLE `division` (
  `id_dev` int(100) NOT NULL,
  `categorie_dev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `division`
--

INSERT INTO `division` (`id_dev`, `categorie_dev`) VALUES
(1, 'SENIOR'),
(2, 'JUNIOR U19'),
(3, 'JUNIOR U17'),
(4, 'JUNIOR U15');

-- --------------------------------------------------------

--
-- Structure de la table `entraineur`
--

CREATE TABLE `entraineur` (
  `id_ent` int(100) NOT NULL,
  `nom_ent` varchar(50) NOT NULL,
  `prenom_ent` varchar(50) NOT NULL,
  `date_naiss_ent` date DEFAULT NULL,
  `img_ent` varchar(255) DEFAULT NULL,
  `nationalite_ent` varchar(100) NOT NULL,
  `id_eq_ent` int(100) NOT NULL,
  `id_co_ent` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `entraineur`
--

INSERT INTO `entraineur` (`id_ent`, `nom_ent`, `prenom_ent`, `date_naiss_ent`, `img_ent`, `nationalite_ent`, `id_eq_ent`, `id_co_ent`) VALUES
(26, 'Mohamed', 'Kechroud', '1979-03-16', '1711934501385-281765717-images.jpg', 'Algerie', 21, 197);

-- --------------------------------------------------------

--
-- Structure de la table `equipe`
--

CREATE TABLE `equipe` (
  `id_eq` int(100) NOT NULL,
  `nom_eq` varchar(100) NOT NULL,
  `abre_eq` varchar(50) DEFAULT NULL,
  `logo_eq` varchar(255) DEFAULT NULL,
  `date_eq` date NOT NULL,
  `ville_eq` varchar(100) NOT NULL,
  `m_gagner_eq` int(50) DEFAULT NULL,
  `m_nul_eq` int(10) NOT NULL DEFAULT 0,
  `m_perdu_eq` int(50) DEFAULT NULL,
  `nbr_but_p_eq` int(50) DEFAULT NULL,
  `nbr_but_c_eq` int(50) DEFAULT NULL,
  `points_eq` int(50) DEFAULT NULL,
  `diff_eq` int(50) DEFAULT NULL,
  `observation_eq` int(100) DEFAULT NULL,
  `titres_remp_eq` varchar(100) DEFAULT NULL,
  `id_ge_eq` int(100) DEFAULT NULL,
  `id_dev_eq` int(100) DEFAULT NULL,
  `id_co_ge_eq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `equipe`
--

INSERT INTO `equipe` (`id_eq`, `nom_eq`, `abre_eq`, `logo_eq`, `date_eq`, `ville_eq`, `m_gagner_eq`, `m_nul_eq`, `m_perdu_eq`, `nbr_but_p_eq`, `nbr_but_c_eq`, `points_eq`, `diff_eq`, `observation_eq`, `titres_remp_eq`, `id_ge_eq`, `id_dev_eq`, `id_co_ge_eq`) VALUES
(18, 'MB BELHACEL', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, NULL, NULL, 2, 1, 120),
(21, 'RC KALAA', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 45, NULL, NULL, 3, 1, 7),
(23, 'AR .AMMI MOUSSA', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, NULL, NULL, 2, 1, 120),
(24, 'CRB.OUARIZANE', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, NULL, NULL, 2, 1, 120),
(25, 'IRB Sidi Khateb', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, NULL, NULL, NULL, 2, 1, 120),
(26, 'J SIDI LAZREG', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg', 3, 0, 5, 15, 34, 23, 2, NULL, NULL, 2, 1, NULL),
(27, 'OM.RELIZANE', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, 2, NULL, NULL, NULL, 1, NULL),
(28, 'RMB.MATMAR', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, NULL, NULL, NULL, 1, NULL),
(29, 'WB.OUED RHIOU', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 54, 12, 70, NULL, NULL, NULL, NULL, 1, NULL),
(30, 'CRB.S Med BENAOUDA', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, NULL, NULL, NULL, 1, NULL),
(31, 'AR.AIN TARIk', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, NULL, NULL, NULL, 1, NULL),
(32, 'CRB.HAMADNA', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, NULL, NULL, NULL, 1, NULL),
(34, 'MB BELHACEL u19', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, NULL, NULL, 2, 2, 120),
(35, 'RC KALAA u19', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 45, NULL, NULL, 3, 2, 7),
(36, 'AR .AMMI MOUSSA u19', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, NULL, NULL, 2, 2, 120),
(37, 'CRB.OUARIZANE u19', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, NULL, NULL, 2, 2, 120),
(38, 'IRB Sidi Khateb u19', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, NULL, NULL, NULL, 2, 2, 120),
(39, 'J SIDI LAZREG u19', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg ', 3, 0, 5, 15, 34, 23, 2, NULL, NULL, 2, 2, NULL),
(40, 'OM.RELIZANE u19', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, 2, NULL, NULL, NULL, 2, NULL),
(41, 'RMB.MATMAR u19', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, NULL, NULL, NULL, 2, NULL),
(42, 'WB.OUED RHIOU u19', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 0, 12, 70, NULL, NULL, NULL, NULL, 2, NULL),
(43, 'CRB.S Med BENAOUDA u19', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, NULL, NULL, NULL, 2, NULL),
(44, 'AR.AIN TARIk u19', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, NULL, NULL, NULL, 2, NULL),
(45, 'CRB.HAMADNA u19', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, NULL, NULL, NULL, 2, NULL),
(49, 'MB BELHACEL u17', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, NULL, NULL, 2, 3, 120),
(50, 'RC KALAA u17', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 45, NULL, NULL, 3, 3, 7),
(51, 'AR .AMMI MOUSSA u17', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, NULL, NULL, 2, 3, 120),
(52, 'CRB.OUARIZANE u17', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, NULL, NULL, 2, 3, 120),
(53, 'IRB Sidi Khateb u17', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, NULL, NULL, NULL, 2, 3, 120),
(54, 'J SIDI LAZREG u17', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg', 3, 0, 5, 15, 34, 23, 2, NULL, NULL, 2, 3, NULL),
(55, 'OM.RELIZANE u17', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, 2, NULL, NULL, NULL, 3, NULL),
(56, 'RMB.MATMAR u17', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, NULL, NULL, NULL, 3, NULL),
(57, 'WB.OUED RHIOU u17', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 54, 12, 70, NULL, NULL, NULL, NULL, 3, NULL),
(58, 'CRB.S Med BENAOUDA u17', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, NULL, NULL, NULL, 3, NULL),
(59, 'AR.AIN TARIk u17', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, NULL, NULL, NULL, 3, NULL),
(60, 'CRB.HAMADNA u17', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, NULL, NULL, NULL, 3, NULL),
(80, 'MB BELHACEL u15', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, NULL, NULL, 2, 4, 120),
(81, 'RC KALAA u15', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 45, NULL, NULL, 3, 4, 7),
(82, 'AR .AMMI MOUSSA u15', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, NULL, NULL, 2, 4, 120),
(83, 'CRB.OUARIZANE u15', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, NULL, NULL, 2, 4, 120),
(84, 'IRB Sidi Khateb u15', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, NULL, NULL, NULL, 2, 4, 120),
(85, 'J SIDI LAZREG u15', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg', 3, 0, 5, 15, 34, 23, 2, NULL, NULL, 2, 4, NULL),
(86, 'OM.RELIZANE u15', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, 2, NULL, NULL, NULL, 4, NULL),
(87, 'RMB.MATMAR u15', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, NULL, NULL, NULL, 4, NULL),
(88, 'WB.OUED RHIOU u15', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 54, 12, 70, NULL, NULL, NULL, NULL, 4, NULL),
(89, 'CRB.S Med BENAOUDA u15', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, NULL, NULL, NULL, 4, NULL),
(90, 'AR.AIN TARIk u15', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, NULL, NULL, NULL, 4, NULL),
(91, 'CRB.HAMADNA u15', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, NULL, NULL, NULL, 4, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `gestionnaire de club`
--

CREATE TABLE `gestionnaire de club` (
  `id_ge` int(100) NOT NULL,
  `id_ad_ge` int(100) NOT NULL,
  `id_co_ge` int(100) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `age` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `gestionnaire de club`
--

INSERT INTO `gestionnaire de club` (`id_ge`, `id_ad_ge`, `id_co_ge`, `nom`, `prenom`, `age`) VALUES
(2, 2, 120, 'daka', 'daka', 34),
(3, 2, 7, 'amine', 'amine', 34),
(4, 2, 227, 'ali', 'ali', 45);

-- --------------------------------------------------------

--
-- Structure de la table `jouer`
--

CREATE TABLE `jouer` (
  `id_jo_j` int(100) NOT NULL,
  `id_eq_j` int(100) NOT NULL,
  `id_ma_j` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

CREATE TABLE `joueur` (
  `id_jo` int(100) NOT NULL,
  `nom_jo` varchar(50) NOT NULL,
  `prenom_jo` varchar(50) NOT NULL,
  `photo_jo` varchar(160) DEFAULT NULL,
  `nationalite_jo` varchar(100) DEFAULT NULL,
  `poste_jo` varchar(100) DEFAULT NULL,
  `num_mai_jo` int(50) DEFAULT NULL,
  `date_naiss_jo` date DEFAULT NULL,
  `taille_jo` double DEFAULT NULL,
  `poids_jo` double DEFAULT NULL,
  `nbr_buts_jo` int(50) DEFAULT NULL,
  `nbr_passe_jo` int(100) DEFAULT NULL,
  `nbr_crt_rouge` int(10) DEFAULT NULL,
  `nbr_crt_jaune` int(20) DEFAULT NULL,
  `titres_jo` varchar(100) DEFAULT NULL,
  `id_eq_jo` int(50) DEFAULT NULL,
  `id_co_jo` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`id_jo`, `nom_jo`, `prenom_jo`, `photo_jo`, `nationalite_jo`, `poste_jo`, `num_mai_jo`, `date_naiss_jo`, `taille_jo`, `poids_jo`, `nbr_buts_jo`, `nbr_passe_jo`, `nbr_crt_rouge`, `nbr_crt_jaune`, `titres_jo`, `id_eq_jo`, `id_co_jo`) VALUES
(86, 'mohamed', 'ali', '1711330053966-366435829-mahrez.jpg', 'dz', 'Gardien', 11, NULL, 112, 11, 9, 0, 1, 3, NULL, 18, 189),
(88, 'riyadh', 'hammoudi', '1711412892167-364131018-coach.jpg', 'dz', 'Attaquant', 4, '2024-03-06', 154, 23, 14, 3, 0, 0, NULL, 18, 191),
(89, 'Nadir', 'Larbi', '1711424107776-868087891-messi.jpg', 'Algerie', 'Gardien', 9, '1998-03-12', 189, 78, 5, 5, 1, 8, NULL, 21, 195),
(90, 'wail', 'youcef', '1711499545553-766890624-suarez.jpg', 'dz', 'Attaquant', 1, NULL, 198, 45, 22, 2, 0, 0, NULL, 21, 200),
(91, 'Daouaji', 'Daka', '1711761656429-992406933-mahrez.jpg', 'algerie', 'Attaquant', 4, '2000-01-25', 190, 43, 1, 8, NULL, NULL, NULL, 21, 201),
(92, 'daka', 'omari', '1711932813475-689027379-images.jpg', 'algerie', 'Milieu de terrain', 10, '2001-01-31', 176, 45, 8, 1, NULL, NULL, NULL, 21, 202),
(93, 'mdj', 'yasser', '1711939443903-607458185-coach.jpg', 'Algerie', 'Gardien', 6, NULL, 153, 56, NULL, NULL, NULL, NULL, NULL, 21, 203),
(94, 'krimou', 'karim', '1711939495790-839603770-messi.jpg', 'algerie', 'Gardien', 5, NULL, 156, 87, NULL, NULL, NULL, NULL, NULL, 21, 204);

-- --------------------------------------------------------

--
-- Structure de la table `match`
--

CREATE TABLE `match` (
  `id_ma` int(100) NOT NULL,
  `date_ma` date NOT NULL,
  `horaire_ma` time(6) NOT NULL,
  `equipe_1` varchar(100) NOT NULL,
  `score_eq1` int(11) DEFAULT NULL,
  `equipe_2` varchar(100) NOT NULL,
  `score_eq2` int(11) DEFAULT NULL,
  `carton_j_ma` int(10) NOT NULL,
  `carton_r_ma` int(10) NOT NULL,
  `homme_ma` varchar(100) NOT NULL,
  `id_ge_ma` int(100) NOT NULL,
  `id_co_ge_ma` int(20) DEFAULT NULL,
  `id_std_ma` int(100) DEFAULT NULL,
  `journee_ma` int(100) NOT NULL,
  `id_div_ma` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `match`
--

INSERT INTO `match` (`id_ma`, `date_ma`, `horaire_ma`, `equipe_1`, `score_eq1`, `equipe_2`, `score_eq2`, `carton_j_ma`, `carton_r_ma`, `homme_ma`, `id_ge_ma`, `id_co_ge_ma`, `id_std_ma`, `journee_ma`, `id_div_ma`) VALUES
(8, '2024-08-19', '19:55:39.000000', 'MB BELHACEL', 6, 'RC KALAA', 7, 34, 16, 'messi', 3, 7, 13, 1, 1),
(9, '2024-05-16', '18:55:39.000000', 'MB BELHACEL', 3, 'MB BELHACEL', 4, 2, 2, 'adz', 3, 7, 13, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `matchh`
--

CREATE TABLE `matchh` (
  `id_ma` int(100) NOT NULL,
  `date_ma` date NOT NULL,
  `horaire_ma` time(6) NOT NULL,
  `equipe_1` varchar(100) NOT NULL,
  `score_eq1` int(11) DEFAULT NULL,
  `equipe_2` varchar(100) NOT NULL,
  `score_eq2` int(11) DEFAULT NULL,
  `carton_j_ma` int(10) NOT NULL,
  `carton_r_ma` int(10) NOT NULL,
  `homme_ma` varchar(100) NOT NULL,
  `id_ge_ma` int(100) NOT NULL,
  `id_std_ma` int(100) NOT NULL,
  `id_journee_ma` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `saison`
--

CREATE TABLE `saison` (
  `id_eq_sai` int(100) NOT NULL,
  `id_jo_sai` int(100) NOT NULL,
  `date_deb_sai` date NOT NULL,
  `date_fin_sai` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `stade`
--

CREATE TABLE `stade` (
  `id_std` int(100) NOT NULL,
  `nom_std` varchar(150) NOT NULL,
  `ville_std` varchar(40) NOT NULL,
  `adresse_std` varchar(100) NOT NULL,
  `capacite_std` int(100) NOT NULL,
  `date_crt` date NOT NULL,
  `id_eq_std` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stade`
--

INSERT INTO `stade` (`id_std`, `nom_std`, `ville_std`, `adresse_std`, `capacite_std`, `date_crt`, `id_eq_std`) VALUES
(13, '1er Novembre', 'relizane', 'azea', 213213, '2024-03-13', 18),
(17, '1er novembre', 'Kalaa', 'rue didouche mourad ', 52000, '2009-03-12', 21);

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `id_ty` int(100) NOT NULL,
  `nom_ty` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`id_ty`, `nom_ty`) VALUES
(1, 'admin'),
(2, 'joueur'),
(3, 'entraineur'),
(4, 'arbitre'),
(5, 'visiteur'),
(6, 'gestionnaire de club');

-- --------------------------------------------------------

--
-- Structure de la table `visiteur`
--

CREATE TABLE `visiteur` (
  `id_vis` int(100) NOT NULL,
  `id_compte_vis` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `visiteur`
--

INSERT INTO `visiteur` (`id_vis`, `id_compte_vis`) VALUES
(1, 6);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_ad`),
  ADD KEY `id_compte_ad` (`id_compte_ad`),
  ADD KEY `id_article` (`id_article`);

--
-- Index pour la table `arbitre`
--
ALTER TABLE `arbitre`
  ADD PRIMARY KEY (`id_ar`),
  ADD KEY `id_ma_ar` (`id_ma_ar`),
  ADD KEY `arbitre_ibfk_2` (`id_co_ar`);

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id_art`);

--
-- Index pour la table `calendrier`
--
ALTER TABLE `calendrier`
  ADD PRIMARY KEY (`id_journee`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id_art_com`,`id_vis_com`),
  ADD KEY `id_vis_com` (`id_vis_com`);

--
-- Index pour la table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id_co`),
  ADD KEY `id_type` (`id_type`);

--
-- Index pour la table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`id_dev`);

--
-- Index pour la table `entraineur`
--
ALTER TABLE `entraineur`
  ADD PRIMARY KEY (`id_ent`),
  ADD KEY `id_eq_ent` (`id_eq_ent`),
  ADD KEY `id_co_ent` (`id_co_ent`);

--
-- Index pour la table `equipe`
--
ALTER TABLE `equipe`
  ADD PRIMARY KEY (`id_eq`),
  ADD KEY `id_dev_eq` (`id_dev_eq`),
  ADD KEY `id_ge_eq` (`id_ge_eq`),
  ADD KEY `equipe_ibfk_4` (`id_co_ge_eq`);

--
-- Index pour la table `gestionnaire de club`
--
ALTER TABLE `gestionnaire de club`
  ADD PRIMARY KEY (`id_ge`),
  ADD KEY `id_ad_ge` (`id_ad_ge`),
  ADD KEY `id_co_ge` (`id_co_ge`);

--
-- Index pour la table `jouer`
--
ALTER TABLE `jouer`
  ADD PRIMARY KEY (`id_jo_j`,`id_eq_j`,`id_ma_j`),
  ADD KEY `id_eq_j` (`id_eq_j`),
  ADD KEY `id_ma_j` (`id_ma_j`);

--
-- Index pour la table `joueur`
--
ALTER TABLE `joueur`
  ADD PRIMARY KEY (`id_jo`),
  ADD KEY `id_co_jo` (`id_co_jo`),
  ADD KEY `id_eq_jo` (`id_eq_jo`);

--
-- Index pour la table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_ma`),
  ADD KEY `id_std_ma` (`id_std_ma`),
  ADD KEY `id_co_ge_ma` (`id_co_ge_ma`),
  ADD KEY `id_div_ma` (`id_div_ma`);

--
-- Index pour la table `matchh`
--
ALTER TABLE `matchh`
  ADD KEY `equipe_1` (`equipe_1`);

--
-- Index pour la table `saison`
--
ALTER TABLE `saison`
  ADD PRIMARY KEY (`id_eq_sai`,`id_jo_sai`),
  ADD KEY `id_jo_sai` (`id_jo_sai`);

--
-- Index pour la table `stade`
--
ALTER TABLE `stade`
  ADD PRIMARY KEY (`id_std`),
  ADD KEY `id_eq_std` (`id_eq_std`),
  ADD KEY `id_eq_std_2` (`id_eq_std`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_ty`);

--
-- Index pour la table `visiteur`
--
ALTER TABLE `visiteur`
  ADD PRIMARY KEY (`id_vis`),
  ADD KEY `id_compte_vis` (`id_compte_vis`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_ad` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `arbitre`
--
ALTER TABLE `arbitre`
  MODIFY `id_ar` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id_art` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `calendrier`
--
ALTER TABLE `calendrier`
  MODIFY `id_journee` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `compte`
--
ALTER TABLE `compte`
  MODIFY `id_co` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT pour la table `division`
--
ALTER TABLE `division`
  MODIFY `id_dev` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `entraineur`
--
ALTER TABLE `entraineur`
  MODIFY `id_ent` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `equipe`
--
ALTER TABLE `equipe`
  MODIFY `id_eq` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `gestionnaire de club`
--
ALTER TABLE `gestionnaire de club`
  MODIFY `id_ge` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `joueur`
--
ALTER TABLE `joueur`
  MODIFY `id_jo` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT pour la table `match`
--
ALTER TABLE `match`
  MODIFY `id_ma` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `stade`
--
ALTER TABLE `stade`
  MODIFY `id_std` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `visiteur`
--
ALTER TABLE `visiteur`
  MODIFY `id_vis` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id_compte_ad`) REFERENCES `compte` (`id_co`),
  ADD CONSTRAINT `admin_ibfk_3` FOREIGN KEY (`id_article`) REFERENCES `article` (`id_art`);

--
-- Contraintes pour la table `arbitre`
--
ALTER TABLE `arbitre`
  ADD CONSTRAINT `arbitre_ibfk_1` FOREIGN KEY (`id_ma_ar`) REFERENCES `match` (`id_ma`),
  ADD CONSTRAINT `arbitre_ibfk_2` FOREIGN KEY (`id_co_ar`) REFERENCES `compte` (`id_co`);

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`id_art_com`) REFERENCES `article` (`id_art`),
  ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`id_vis_com`) REFERENCES `visiteur` (`id_vis`);

--
-- Contraintes pour la table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `compte_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_ty`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `entraineur`
--
ALTER TABLE `entraineur`
  ADD CONSTRAINT `entraineur_ibfk_1` FOREIGN KEY (`id_eq_ent`) REFERENCES `equipe` (`id_eq`),
  ADD CONSTRAINT `entraineur_ibfk_2` FOREIGN KEY (`id_co_ent`) REFERENCES `compte` (`id_co`),
  ADD CONSTRAINT `fk_compte_id_co` FOREIGN KEY (`id_co_ent`) REFERENCES `compte` (`id_co`) ON DELETE CASCADE;

--
-- Contraintes pour la table `equipe`
--
ALTER TABLE `equipe`
  ADD CONSTRAINT `equipe_ibfk_1` FOREIGN KEY (`id_dev_eq`) REFERENCES `division` (`id_dev`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipe_ibfk_2` FOREIGN KEY (`id_ge_eq`) REFERENCES `gestionnaire de club` (`id_ge`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipe_ibfk_4` FOREIGN KEY (`id_co_ge_eq`) REFERENCES `gestionnaire de club` (`id_co_ge`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `gestionnaire de club`
--
ALTER TABLE `gestionnaire de club`
  ADD CONSTRAINT `gestionnaire de club_ibfk_1` FOREIGN KEY (`id_ad_ge`) REFERENCES `admin` (`id_ad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gestionnaire de club_ibfk_2` FOREIGN KEY (`id_co_ge`) REFERENCES `compte` (`id_co`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `jouer`
--
ALTER TABLE `jouer`
  ADD CONSTRAINT `jouer_ibfk_1` FOREIGN KEY (`id_eq_j`) REFERENCES `equipe` (`id_eq`),
  ADD CONSTRAINT `jouer_ibfk_2` FOREIGN KEY (`id_jo_j`) REFERENCES `joueur` (`id_jo`),
  ADD CONSTRAINT `jouer_ibfk_3` FOREIGN KEY (`id_ma_j`) REFERENCES `match` (`id_ma`);

--
-- Contraintes pour la table `joueur`
--
ALTER TABLE `joueur`
  ADD CONSTRAINT `joueur_ibfk_1` FOREIGN KEY (`id_co_jo`) REFERENCES `compte` (`id_co`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `joueur_ibfk_2` FOREIGN KEY (`id_eq_jo`) REFERENCES `equipe` (`id_eq`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `fk_equipe1` FOREIGN KEY (`equipe_1`) REFERENCES `equipe` (`nom_eq`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipe2` FOREIGN KEY (`equipe_2`) REFERENCES `equipe` (`nom_eq`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `match_ibfk_1` FOREIGN KEY (`id_ge_ma`) REFERENCES `gestionnaire de club` (`id_ge`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `match_ibfk_2` FOREIGN KEY (`journee_ma`) REFERENCES `calendrier` (`id_journee`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `match_ibfk_3` FOREIGN KEY (`id_std_ma`) REFERENCES `stade` (`id_std`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `match_ibfk_4` FOREIGN KEY (`id_co_ge_ma`) REFERENCES `compte` (`id_co`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `saison`
--
ALTER TABLE `saison`
  ADD CONSTRAINT `saison_ibfk_1` FOREIGN KEY (`id_eq_sai`) REFERENCES `equipe` (`id_eq`),
  ADD CONSTRAINT `saison_ibfk_2` FOREIGN KEY (`id_jo_sai`) REFERENCES `joueur` (`id_jo`);

--
-- Contraintes pour la table `stade`
--
ALTER TABLE `stade`
  ADD CONSTRAINT `stade_fk_1` FOREIGN KEY (`id_eq_std`) REFERENCES `equipe` (`id_eq`);

--
-- Contraintes pour la table `visiteur`
--
ALTER TABLE `visiteur`
  ADD CONSTRAINT `visiteur_ibfk_1` FOREIGN KEY (`id_compte_vis`) REFERENCES `compte` (`id_co`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
