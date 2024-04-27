-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3307
-- Généré le : sam. 27 avr. 2024 à 14:06
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
  `photo_ar` varchar(255) DEFAULT NULL,
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
(1, '2020-01-27 23:00:00.000000', 'FORMATION DES ENTRAINEURS|FAF2', 'Dans le monde du football, la formation des entraîneurs est une composante essentielle pour le développement continu du sport. La Fédération Algérienne de Football (FAF) reconnaît cette importance en offrant le programme de formation FAF2, une étape cruciale pour les entraîneurs aspirants et établis.Le programme FAF2 vise à fournir aux entraîneurs les compétences et les connaissances nécessaires pour exceller dans leur rôle sur le terrain. Il couvre un large éventail de sujets, allant des techniques de coaching avancées à la gestion de l\'équipe et à la tactique de jeu. Les participants bénéficient également d\'une formation pratique sur le terrain, ce qui leur permet d\'appliquer les concepts appris dans des situations réelles.Ce programme de formation ne se limite pas seulement aux aspects techniques du jeu. La FAF2 met également l\'accent sur le développement personnel des entraîneurs, les encourageant à cultiver des qualités telles que le leadership, la communication et la résolution de problèmes. Ces compétences non seulement améliorent leur efficacité en tant qu\'entraîneurs, mais aussi leur capacité à influencer positivement la vie de leurs joueurs en dehors du terrain.L\'impact de la FAF2 se fait sentir à tous les niveaux du football, que ce soit au niveau amateur, professionnel ou international. Les entraîneurs qui ont suivi avec succès ce programme contribuent de manière significative à l\'amélioration du standard du football algérien et jouent un rôle crucial dans la formation des futurs talents.En fin de compte, la FAF2 représente bien plus qu\'une simple formation pour les entraîneurs. C\'est une reconnaissance de l\'importance du développement continu dans le monde du football et une affirmation de l\'engagement de la FAF envers l\'excellence dans tous les aspects du sport.', 'art2.jpeg', 'yassinee'),
(2, '2024-04-05 20:46:56.203684', 'STAGE DE FORMATION POUR LES ARBITRES', 'ting and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\r\n\r\nWhy do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n\r\n\r\nWhere does it come from?\r\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\r\n\r\nWhere can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\r\n\r\n5\r\n	paragraphs\r\n	words\r\n	bytes\r\n	lists\r\n	Start with \'Lorem\r\nipsum dolor sit amet...\'\r\n', 'art4.jpeg', 'zakaria'),
(3, '2024-04-05 06:12:40.350654', 'UN GESTE PARTICULIER ET UNE BONNE INITIATIVE', 'Au-delà des compétitions acharnées et des rivalités intenses sur le terrain de football, il existe des moments qui nous rappellent la véritable essence du sport : le partage, la solidarité et la communauté.\r\n\r\nLors d\'un récent match local de football, une scène inhabituelle s\'est déroulée qui a captivé l\'attention de tous les spectateurs. Alors que l\'équipe adverse menait au score et que le match touchait à sa fin, un joueur de l\'équipe gagnante s\'est soudainement effondré sur le terrain, se tenant le genou dans une grimace de douleur.\r\n\r\nAu lieu de célébrer leur avance, les joueurs de l\'équipe adverse ont immédiatement arrêté de jouer et se sont précipités vers leur camarade blessé. Dans un geste de solidarité et de fair-play remarquable, ils se sont rassemblés autour de lui, offrant leur soutien et leur réconfort.\r\n\r\nLes spectateurs ont retenu leur souffle alors que le joueur blessé était aidé à se relever et escorté hors du terrain pour recevoir les soins nécessaires. Dans un moment touchant de camaraderie, les deux équipes se sont réunies au centre du terrain pour échanger des salutations et des encouragements, mettant de côté la rivalité du jeu pour célébrer l\'esprit du sport.\r\n\r\nCe geste particulier et cette bonne initiative illustrent parfaitement les valeurs fondamentales du football : le respect, la solidarité et l\'empathie. Ils nous rappellent que, même dans l\'adversité, nous pouvons trouver des occasions de nous soutenir mutuellement et de cultiver un environnement de camaraderie et de fair-play sur et hors du terrain.\r\n\r\nEn fin de compte, ce ne sont pas seulement les victoires ou les défaites qui définissent le football, mais les moments de connexion humaine et de générosité qui transcendent le jeu et nous unissent en tant que communauté de passionnés du football.', 'art1.jpg', 'zakaria'),
(4, '2024-04-05 06:21:12.368345', 'EXAMEN MEDICALE', 'Les examens médicaux sportifs sont essentiels pour les athlètes à tous les niveaux. Ils permettent de détecter précocement les problèmes de santé, d\'évaluer la condition physique, de prévenir les blessures et d\'optimiser la performance. En investissant dans ces examens réguliers, les athlètes peuvent maximiser leur santé et leurs performances sportives à long terme.', 'art3.jpg', 'zakaria'),
(5, '2024-04-25 10:20:11.699192', 'EXAMEN PHYSIQUE DE RATTRAPAGE AU PROFIT DES ARBITRES RÉGIONAUX', 'Dans le monde du sport, les arbitres jouent un rôle crucial dans le maintien de l\'intégrité et de l\'équité des compétitions. Pour garantir des performances optimales sur le terrain, les arbitres régionaux subissent désormais un examen physique de rattrapage, une initiative visant à maintenir des normes élevées de condition physique et de compétence.\r\n\r\nCet examen, conçu spécifiquement pour les arbitres régionaux, comprend une série d\'évaluations physiques et techniques. Les arbitres sont testés sur leur endurance, leur vitesse, leur agilité et leur capacité à prendre des décisions rapides et précises dans des situations de jeu simulées. Cet examen va au-delà de la simple vérification des règles du jeu ; il met l\'accent sur la capacité des arbitres à maintenir le rythme du jeu et à rester concentrés pendant des périodes prolongées.\r\n\r\nEn plus des épreuves physiques, les arbitres sont également évalués sur leur connaissance des règles et des protocoles du jeu. Cela inclut la compréhension des règles spécifiques à leur sport, ainsi que la capacité à interpréter correctement les situations de jeu et à communiquer efficacement avec les joueurs et les autres membres de l\'équipe d\'arbitrage.\r\n\r\nEn conclusion, l\'examen physique de rattrapage au profit des arbitres régionaux est une étape importante vers l\'amélioration continue de l\'arbitrage sportif. En investissant dans la formation et le développement des arbitres, les organisations sportives peuvent garantir que les compétitions sont équitables, compétitives et respectueuses des règles, ce qui profite à tous les acteurs impliqués dans le sport.', 'artt.JPG', 'yassine'),
(6, '2024-04-18 23:00:00.000000', 'SENSIBILISATION', 'Le championnat de division d\'honneur assiste à un affrontement sportif intense dans ses dernières étapes pour déterminer l\'identité du leader et le détenteur du titre du championnat de la saison sportive 2024/2023.\r\n\r\nAfin d\'éviter tout ce qui pourrait perturber le déroulement des matchs et tout ce qui contrevient à l\'esprit sportif qui a marqué la plupart des rencontres de la saison en cours, il est opportun de rappeler aux responsables des équipes, à leurs supporters et à leurs joueurs la publication de la Fédération Algérienne de Football datée du 17 décembre 2023 sous le numéro 012 concernant la violence dans les stades. Ce communiqué condamne toutes les formes de violence verbale ou physique envers les arbitres et les officiels, appelant à l\'application des sanctions les plus sévères pour dissuader les contrevenants et à ne pas tolérer leurs actes.\r\n\r\nLa Fédération Algérienne de Football a demandé à tous les arbitres ayant été victimes de toute forme de violence de déposer des plaintes auprès des autorités de sécurité et judiciaires compétentes, en insistant sur le fait qu\'aucune plainte ne devrait être retirée sous quelque prétexte que ce soit. De plus, la création de la ligue concernée en tant que partie civile aux côtés des arbitres dans ces affaires a été établie, en soulignant que tout arbitre retirant sa plainte serait exposé à une exclusion définitive de la profession d\'arbitre.\r\n\r\nEn conclusion, nous tenons à rappeler à tous les acteurs du championnat de division d\'honneur que toute conduite irresponsable aura des conséquences graves pour son auteur, et pourrait également entraîner des sanctions à l\'encontre des équipes, conformément aux règlements en vigueur.\"', '1714040767340-729346256-positive.png', 'Yassine KESSAL');

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
  `date_com` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id_art_com`, `id_vis_com`, `description_com`, `date_com`) VALUES
(1, 5, 'tres bien', '2024-04-15 08:46:53.489000'),
(2, 5, 'ok', '2024-04-15 08:47:27.457000'),
(4, 5, 'ca fait du bien', '2024-04-15 08:40:36.849507'),
(1, 5, 'test', '2024-04-15 18:19:54.605000'),
(1, 5, 'pas de probleme', '2024-04-15 18:20:11.967000'),
(2, 5, 'non', '2024-04-15 18:35:42.043000'),
(2, 5, 'ouioui\r\n', '2024-04-15 18:36:35.328000'),
(4, 5, 'deuxieme\r\n', '2024-04-15 18:40:31.922000'),
(2, 5, 'laaa', '2024-04-15 18:43:20.091000'),
(4, 5, 'ok', '2024-04-19 14:44:58.966000'),
(4, 5, 'ouiiii', '2024-04-19 14:46:00.138000'),
(1, 6, 'ana nadjib', '2024-04-20 09:33:29.467000'),
(1, 6, 'ana machi nadjib la ni nz39 ana nadjib\r\n', '2024-04-20 09:50:18.123000'),
(2, 6, 'ana houwa ', '2024-04-20 10:01:24.515000'),
(1, 5, 'commentaire', '2024-04-20 12:52:15.361000'),
(1, 5, 'salam', '2024-04-21 15:35:06.283000'),
(1, 5, 'LDLSQDL', '2024-04-23 11:58:42.501000'),
(2, 6, 'fani ana nadjib', '2024-04-26 12:30:56.500000'),
(4, 6, 'tzzazeazaeazeazeaze', '2024-04-26 12:44:06.077000'),
(4, 5, 'nta kifah tgol tzza mathchmche\r\n', '2024-04-26 12:44:31.404000'),
(4, 6, 'chwala ngol cha nbghi cha dakhlek \r\n', '2024-04-26 12:44:49.811000'),
(4, 5, 'adiiiiiiiiiii nta cafi\r\n', '2024-04-26 12:45:08.868000');

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
(2, 1, 'mekiabbo', 'mk', 'mekiabbo1980@gmail.com', '1714212886799-118525755-admin.png'),
(3, 2, 'karimeg', 'karimho86&', 'karimmeg1995@gmail.com', ''),
(5, 4, 'zakaria belaid', 'zakibel099&', 'zakariabelaid929@gmail.com', ''),
(7, 6, 'amine belaoudj', 'ez', 'aminebelaoudj1980@gmail.com', '1714048409727-585609670-gest.png'),
(120, 6, 'dakaa', 'testt', 'daka@gmail.com', '1711474022140-186775792-images.jpg'),
(189, 2, 'Saidi Yasser', 'irWlZqbCMM', 'mohamed@gmail.com', ''),
(191, 2, 'Hammoudi Riyadh', 'riyaaaadhhbibi', 'riyadh@gmail.com', ''),
(195, 2, 'Bensalah Ahmed', 'C2aRNw1911', 'Ahmed56@gmail.com', ''),
(197, 2, 'Mohamed Kechroud', 'dazda', 'mohamed@gmail.com', ''),
(200, 2, 'Benyounes Youcef', 'wailcccfffyyy', 'wailyccf@gmail.com', ''),
(201, 2, 'Daouaji Daka', 'dakadd', 'dakad@gmail.com', ''),
(202, 2, 'Belkacem Djilali', 'daka', 'belkacem@gmail.com', ''),
(203, 2, 'Meziane Djalil', 'sousou', 'Mdjalil@gmail.com', ''),
(204, 2, 'krimou karim', 'krombooo', 'krimou@gmail.com', ''),
(227, 6, 'aliali', 'lol', 'ali@gamil.com', ''),
(232, 5, 'brahim', 'gg', 'ibrahim@gmail.com', '1714048115498-405585143-jojo.jpg'),
(233, 5, 'nadjib', 'test', 'nadjib@gmail.com', '1714135563804-329022662-vreel.jpg'),
(234, 3, 'Kechroud  Mohammed', 'motdepasse', 'kechroud@gmail.com', ''),
(240, 4, 'gassamaaabakaryyyyyyyyyyyy', 'aritre', 'arbitre@gmail.com', ''),
(242, 4, 'gacama azea', 'aze', 'arbitre@gmail.com', '');

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
(27, 'Kechroud ', 'Mohammed', '1982-02-09', '1714136066892-961482017-craiyon_130328_picture_of_a_football_manager_coach.png', 'Algerie', 21, 234);

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
  `id_ge_eq` int(100) DEFAULT NULL,
  `id_dev_eq` int(100) DEFAULT NULL,
  `id_co_ge_eq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `equipe`
--

INSERT INTO `equipe` (`id_eq`, `nom_eq`, `abre_eq`, `logo_eq`, `date_eq`, `ville_eq`, `m_gagner_eq`, `m_nul_eq`, `m_perdu_eq`, `nbr_but_p_eq`, `nbr_but_c_eq`, `points_eq`, `id_ge_eq`, `id_dev_eq`, `id_co_ge_eq`) VALUES
(18, 'MB BELHACEL', 'MBC', 'logo1.jpg', '2014-05-06', 'belhssel', 7, 2, 18, 20, 52, 23, 2, 1, 120),
(21, 'RC KALAA', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 19, 2, 5, 45, 17, 17, 3, 1, 7),
(23, 'AR .AMMI MOUSSA', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 2, 1, 9, 6, 19, 7, 2, 1, 120),
(24, 'CRB.OUARIZANE', 'CRBO', 'CRBO.png', '0000-00-00', '', 5, 5, 2, 15, 10, 20, 2, 1, 120),
(25, 'IRB Sidi Khateb', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 7, 3, 2, 7, 3, 24, 2, 1, 120),
(26, 'J SIDI LAZREG', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg', 4, 4, 4, 15, 22, 16, 2, 1, NULL),
(27, 'OM.RELIZANE', 'OMR', 'OMR.png', '2024-03-25', '', 9, 0, 3, 18, 13, 27, NULL, 1, NULL),
(28, 'RMB.MATMAR', 'RMBM', 'RMBM.png', '0000-00-00', '', 8, 2, 2, 20, 19, 26, NULL, 1, NULL),
(29, 'WB.OUED RHIOU', 'WBOR', 'WBOR.png', '0000-00-00', '', 3, 4, 5, 9, 18, 13, NULL, 1, NULL),
(30, 'CRB.S Med BENAOUDA', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 11, 1, 0, 22, 11, 34, NULL, 1, NULL),
(31, 'AR.AIN TARIk', 'ARAT', 'ARAT.png', '0000-00-00', '', 2, 3, 8, 11, 19, 9, NULL, 1, NULL),
(32, 'CRB.HAMADNA', 'CRBH', 'CRBH.png', '0000-00-00', '', 6, 4, 2, 14, 16, 22, NULL, 1, NULL),
(34, 'MB BELHACEL u19', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, 2, 120),
(35, 'RC KALAA u19', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 3, 2, 7),
(36, 'AR .AMMI MOUSSA u19', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, 2, 120),
(37, 'CRB.OUARIZANE u19', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, 2, 120),
(38, 'IRB Sidi Khateb u19', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, 2, 2, 120),
(39, 'J SIDI LAZREG u19', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg ', 3, 0, 5, 15, 34, 23, 2, 2, NULL),
(40, 'OM.RELIZANE u19', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, NULL, 2, NULL),
(41, 'RMB.MATMAR u19', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, 2, NULL),
(42, 'WB.OUED RHIOU u19', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 0, 12, 70, NULL, 2, NULL),
(43, 'CRB.S Med BENAOUDA u19', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, 2, NULL),
(44, 'AR.AIN TARIk u19', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, 2, NULL),
(45, 'CRB.HAMADNA u19', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, 2, NULL),
(49, 'MB BELHACEL u17', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, 3, 120),
(50, 'RC KALAA u17', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 3, 3, 7),
(51, 'AR .AMMI MOUSSA u17', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, 3, 120),
(52, 'CRB.OUARIZANE u17', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, 3, 120),
(53, 'IRB Sidi Khateb u17', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, 2, 3, 120),
(54, 'J SIDI LAZREG u17', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg', 3, 0, 5, 15, 34, 23, 2, 3, NULL),
(55, 'OM.RELIZANE u17', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, NULL, 3, NULL),
(56, 'RMB.MATMAR u17', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, 3, NULL),
(57, 'WB.OUED RHIOU u17', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 54, 12, 70, NULL, 3, NULL),
(58, 'CRB.S Med BENAOUDA u17', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, 3, NULL),
(59, 'AR.AIN TARIk u17', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, 3, NULL),
(60, 'CRB.HAMADNA u17', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, 3, NULL),
(80, 'MB BELHACEL u15', 'mbc', 'logo1.jpg', '2024-03-27', 'belhssel', 3, 0, 5, 15, 34, 342, 2, 4, 120),
(81, 'RC KALAA u15', 'RCK', 'logo.jpg', '2024-03-21', 'KALAA', 21, 0, 7, 56, 13, 87, 3, 4, 7),
(82, 'AR .AMMI MOUSSA u15', 'ARAM', 'aram.png', '2017-03-22', 'AMMI MOUSSA', 3, 0, 5, 15, 34, 43, 2, 4, 120),
(83, 'CRB.OUARIZANE u15', 'CRBO', 'CRBO.png', '0000-00-00', '', 3, 0, 5, 15, 34, 52, 2, 4, 120),
(84, 'IRB Sidi Khateb u15', 'IRBSK', 'IRBSK.png', '2018-03-01', 'sidi khattab', 3, 0, 2, 4, 34, 500, 2, 4, 120),
(85, 'J SIDI LAZREG u15', 'FCSL', 'FCSL.png', '2024-03-18', 'sidi lazreg', 3, 0, 5, 15, 34, 23, 2, 4, NULL),
(86, 'OM.RELIZANE u15', 'OMR', 'OMR.png', '2024-03-25', '', 3, 0, 5, 15, 34, 45, NULL, 4, NULL),
(87, 'RMB.MATMAR u15', 'RMBM', 'RMBM.png', '0000-00-00', '', 21, 0, 5, 45, 1, 33, NULL, 4, NULL),
(88, 'WB.OUED RHIOU u15', 'WBOR', 'WBOR.png', '0000-00-00', '', 15, 0, 2, 54, 12, 70, NULL, 4, NULL),
(89, 'CRB.S Med BENAOUDA u15', 'CRSBMB', 'CRSBMB.png', '0000-00-00', '', 14, 0, 13, 56, 76, 49, NULL, 4, NULL),
(90, 'AR.AIN TARIk u15', 'ARAT', 'ARAT.png', '0000-00-00', '', 12, 0, 56, 44, 22, 98, NULL, 4, NULL),
(91, 'CRB.HAMADNA u15', 'CRBH', 'CRBH.png', '0000-00-00', '', 23, 0, 5, 77, 14, 76, NULL, 4, NULL);

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
  `age` int(20) NOT NULL,
  `photo_ge` varchar(255) DEFAULT NULL,
  `date_naiss_gestio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `gestionnaire de club`
--

INSERT INTO `gestionnaire de club` (`id_ge`, `id_ad_ge`, `id_co_ge`, `nom`, `prenom`, `age`, `photo_ge`, `date_naiss_gestio`) VALUES
(2, 2, 120, 'daka', 'daka', 34, NULL, NULL),
(3, 2, 7, 'amine', 'bealoudj', 34, '1714048409727-585609670-gest.png', NULL);

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
  `id_eq_jo` int(50) DEFAULT NULL,
  `id_co_jo` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`id_jo`, `nom_jo`, `prenom_jo`, `photo_jo`, `nationalite_jo`, `poste_jo`, `num_mai_jo`, `date_naiss_jo`, `taille_jo`, `poids_jo`, `nbr_buts_jo`, `nbr_passe_jo`, `nbr_crt_rouge`, `nbr_crt_jaune`, `id_eq_jo`, `id_co_jo`) VALUES
(86, 'Saidi', 'Yasser', '1711330053966-366435829-mahrez.jpg', 'dz', 'Gardien', 11, NULL, 112, 11, 13, 0, 5, 6, 31, 189),
(88, 'Hammoudi', 'Riyadh', '1711412892167-364131018-coach.jpg', 'dz', 'Gardien', 4, NULL, 154, 23, 25, 3, 4, 6, 18, 191),
(89, 'Bensalah', 'Ahmed', '1714046389573-328327942-craiyon_125916_headshot_of_handsome_Argentinian_soccer_player.png', 'Algerie', 'Gardien', 9, NULL, 189, 73, 69, 8, 1, 37, 21, 195),
(90, 'Benyounes', 'Youcef', '1711499545553-766890624-suarez.jpg', 'dz', 'Gardien', 1, NULL, 198, 45, 17, 3, 1, 7, 32, 200),
(91, 'Daouaji', 'Daka', '1714135678073-671007889-daka.png', 'algerie', 'Milieu de terrain', 4, NULL, 190, 43, 15, 9, NULL, NULL, 21, 201),
(92, 'Belkacem', 'Djilali', '1714046301136-704002719-craiyon_125800_portait_picture_of_a_football_player.png', 'algerie', 'Gardien', 10, NULL, 176, 45, 20, 1, NULL, NULL, 21, 202),
(93, 'Meziane', 'Djalil', '1714046751254-96780024-craiyon_130534_Player_Faces_Rejection.png', 'Algerie', 'Gardien', 6, NULL, 153, 56, NULL, NULL, NULL, NULL, 21, 203),
(94, 'krimou', 'karim', '1711939495790-839603770-messi.jpg', 'algerie', 'Gardien', 5, NULL, 156, 87, NULL, NULL, NULL, NULL, 21, 204);

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
  `id_div_ma` int(10) NOT NULL DEFAULT 1,
  `id_ar_ma` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `match`
--

INSERT INTO `match` (`id_ma`, `date_ma`, `horaire_ma`, `equipe_1`, `score_eq1`, `equipe_2`, `score_eq2`, `carton_j_ma`, `carton_r_ma`, `homme_ma`, `id_ge_ma`, `id_co_ge_ma`, `id_std_ma`, `journee_ma`, `id_div_ma`, `id_ar_ma`) VALUES
(12, '2024-08-05', '20:00:39.000000', 'MB BELHACEL', 8, 'RC KALAA', 39, 14, 9, '', 3, 7, 13, 1, 1, 0),
(13, '2023-04-05', '20:00:39.000000', 'IRB Sidi Khateb', 2, 'CRB.OUARIZANE', 3, 1, 1, 'AHMED', 4, 227, 17, 1, 1, 0),
(14, '2023-04-05', '20:00:39.000000', 'IRB Sidi Khateb u19', 2, 'CRB.OUARIZANE u19', 3, 1, 1, 'AHMED', 4, 227, 17, 1, 2, 0),
(15, '2024-06-05', '17:00:39.000000', 'OM.RELIZANE u19', 0, 'RMB.MATMAR u19', 0, 1, 1, 'AHMED', 4, 227, 17, 1, 2, 0),
(16, '2024-07-14', '19:00:39.000000', 'AR .AMMI MOUSSA', 0, 'OM.RELIZANE', 0, 0, 0, '', 3, 7, 13, 1, 1, 0),
(17, '2024-09-17', '16:30:39.000000', 'IRB Sidi Khateb', 0, 'AR.AIN TARIk', 0, 0, 0, '', 2, 202, 13, 2, 1, 0);

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
(5, 232),
(6, 233);

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
  ADD KEY `commentaire_ibfk_1` (`id_art_com`);

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
  ADD KEY `id_div_ma` (`id_div_ma`),
  ADD KEY `id_ar_ma` (`id_ar_ma`);

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
  MODIFY `id_ar` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id_art` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `calendrier`
--
ALTER TABLE `calendrier`
  MODIFY `id_journee` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `compte`
--
ALTER TABLE `compte`
  MODIFY `id_co` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT pour la table `division`
--
ALTER TABLE `division`
  MODIFY `id_dev` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `entraineur`
--
ALTER TABLE `entraineur`
  MODIFY `id_ent` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `equipe`
--
ALTER TABLE `equipe`
  MODIFY `id_eq` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `gestionnaire de club`
--
ALTER TABLE `gestionnaire de club`
  MODIFY `id_ge` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `joueur`
--
ALTER TABLE `joueur`
  MODIFY `id_jo` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT pour la table `match`
--
ALTER TABLE `match`
  MODIFY `id_ma` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `stade`
--
ALTER TABLE `stade`
  MODIFY `id_std` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `visiteur`
--
ALTER TABLE `visiteur`
  MODIFY `id_vis` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `arbitre_ibfk_2` FOREIGN KEY (`id_co_ar`) REFERENCES `compte` (`id_co`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`id_art_com`) REFERENCES `article` (`id_art`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `visiteur_ibfk_1` FOREIGN KEY (`id_compte_vis`) REFERENCES `compte` (`id_co`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
