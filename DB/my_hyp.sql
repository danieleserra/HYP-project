-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Giu 13, 2015 alle 12:10
-- Versione del server: 5.1.71-community-log
-- PHP Version: 5.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `my_hyp`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `course_category` int(11) NOT NULL,
  `instructor` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dump dei dati per la tabella `course`
--

INSERT INTO `course` (`id`, `title`, `description`, `course_category`, `instructor`, `level`, `image`) VALUES
(1, 'Yoga', 'Yoga is a physical, mental, and spiritual practice or discipline. There is a broad variety of schools, practices and goals in Hinduism, Buddhism and Jainism. The best-known are Hatha yoga and Raja yoga.', 5, 1, 1, 'A-yoga-class-at-a-gym-007.jpg'),
(2, 'Aquatone', 'A low impact exercise class that uses the resistance of the water to improve the overall fittness and muscle tone. All classes are 30 minutes', 3, 5, 1, '542e7ca416de2.jpg'),
(3, 'Hydrobike', 'Aqua cycling or aqua spinning is a technique in fitness training It involves using stationary exercise bicycles that are submerged in water while the rider is above the water.', 3, 6, 2, '20131004192256hydrobike.jpg'),
(6, 'Aqua Zumba', 'Aqua Zumba is classic aqua aerobics with Latin flavor added, according to licensed Aqua Zumba instructor Vicky Asher of Timonium, Maryland. You perform large muscle movements by reaching your arms and lifting your legs in the water, as well as circling your hips and shoulders. Instructors receive quarterly DVD releases with new routines for their students. The typical land-based Zumba dance steps, such as cha-cha, merengue, salsa, reggaeton and mambo, need to be more exaggerated and slower in the water, so the water tempo is half the land tempo.', 3, 4, 2, '628x471.jpg'),
(7, 'Treadmills', 'Among the users of treadmills today are medical facilities (hospitals, rehabilitation centers, medical and physiotherapy clinics, institutes of higher education), sports clubs, Biomechanics Institute, orthopedic shoe shops, running shops, Olympic training centers, universities, fire-training centers, NASA, test facilities and training rooms of police and army, gyms and even home users.', 1, 1, 1, 'Treadmill_2372502b.jpg'),
(8, 'Tango', 'Tango is a partner dance that originated in the 1890s along the Río de la Plata, the natural border between Argentina and Uruguay, and soon spread to the rest of the world.', 2, 2, 3, 'learn_tango-buenos-aires.jpg'),
(9, 'Hip-hop', 'Hip-hop dance refers to street dance styles primarily performed to hip-hop music or that have evolved as part of hip-hop culture. It includes a wide range of styles primarily breaking, locking, and popping which were created in the 1970s and made popular by dance crews in the United States. The television show Soul Train and the 1980s films Breakin'', Beat Street, and Wild Style showcased these crews and dance styles in their early stages; therefore, giving hip-hop mainstream exposure. The dance industry responded with a commercial, studio-based version of hip-hop—sometimes called "new style"—and a hip-hop influenced style of jazz dance called "jazz-funk". Classically trained dancers developed these studio styles in order to create choreography from the hip-hop dances that were performed on the street. Because of this development, hip-hop dance is practiced in both dance studios and outdoor spaces.', 2, 3, 2, 'hiphop.jpg'),
(10, 'Kung fu', 'Chinese martial arts, which are called kung fu or wushu, are a number of fighting styles that have developed over the centuries in China. These fighting styles are often classified according to common traits, identified as "families", "sects" or "schools" of martial arts. ', 6, 6, 2, 'kungfu-stances-b.jpg'),
(11, 'Zumba', 'Zumba is a dance fitness program created by Colombian dancer and choreographer Alberto "Beto" Perez during the 1990s. Zumba is a trademark owned by Zumba Fitness, LLC.', 1, 3, 1, 'zumba-class-0911-013-620x320.jpg'),
(12, 'Artistic cycling', 'Artistic cycling is a form of competitive indoor cycling in which athletes perform tricks (called exercises) for points on specialized, fixed-gear bikes in a format similar to ballet or gymnastics. The exercises are performed in front of judges in five minute rounds by singles, pairs, four- or six-man teams.', 4, 4, 5, '155478.jpeg'),
(13, 'Cycling', 'An exercise bicycle is usually a special-purpose exercise machine resembling a bicycle without true wheels, but it is also possible to adapt an ordinary bicycle for stationary exercise by placing it on bicycle rollers or a trainer. Rollers and trainers are often used by racing cyclists to warm up before racing, or to train on their own machines indoors.', 4, 5, 1, 'indoor-bycicle-cycling-gym-16587500.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `coursecategory`
--

CREATE TABLE IF NOT EXISTS `coursecategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `image` text NOT NULL,
  `video` text NOT NULL,
  `sfondo` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dump dei dati per la tabella `coursecategory`
--

INSERT INTO `coursecategory` (`id`, `title`, `desc`, `image`, `video`, `sfondo`) VALUES
(1, 'Aerobic', 'Aerobic exercise (also known as cardio) is physical exercise of low to high intensity that depends primarily on the aerobic energy-generating process Aerobic literally means "relating to, involving, or requiring free oxygen", and refers to the use of oxygen to adequately meet energy demands during exercise via aerobic metabolism. Generally, light-to-moderate intensity activities that are sufficiently supported by aerobic metabolism can be performed for extended periods of time.', 'http://hyp.altervista.org/images/categories/AEROBICS.png', 'https://www.youtube.com/watch?v=ZsVp7wRWG7I', 'http://hyp.altervista.org/images/categories/Best-Aerobics-Classes-Mumbai-Arpita-Step-Up-Dance-Academy.jpg'),
(2, 'Dance', 'Dance is the art of movement of the body, usually rhythmically and to music, using prescribed or improvised steps and gestures. "A dance" is any one prescribed sequence of such movements, or the music to which it is performed, or an event at which it takes place. Dance may also be regarded as a form of nonverbal communication recognisable in other animals; in bee dances and behaviour patterns such as mating dances.', 'http://hyp.altervista.org/images/categories/dance.png', 'https://www.youtube.com/watch?v=mQCGSaAmHMg', 'http://hyp.altervista.org/images/categories/Kajal.jpg'),
(3, 'Water aerobics', 'Water aerobics (waterobics, aquatic fitness, aquafitness, aquafit) is the performance of aerobic exercise in fairly shallow water such as in a swimming pool. Done mostly vertically and without swimming typically in waist deep or deeper water, it is a type of resistance training. Water aerobics is a form of aerobic exercise that requires water-immersed participants. Most water aerobics is in a group fitness class setting with a trained professional teaching for about an hour. The classes focus on aerobic endurance, resistance training, and creating an enjoyable atmosphere with music. Different forms of water aerobics include: aqua Zumba, water yoga, aqua aerobics, and aqua jog.', 'http://hyp.altervista.org/images/categories/WATER.png', 'https://www.youtube.com/watch?v=_2dZZT5ZWqI', 'http://hyp.altervista.org/images/categories/Aqua_Aerobics.JPG'),
(4, 'Spinning', 'Indoor cycling, as an organized activity, is a form of exercise with classes focusing on endurance, strength, intervals, high intensity (race days) and recovery, and involves using a special stationary exercise bicycle with a weighted flywheel in a classroom setting. It is commonly called spinning.', 'http://hyp.altervista.org/images/categories/SPINNING.png', 'https://www.youtube.com/watch?v=lFbjsRvjF-A', 'http://hyp.altervista.org/images/categories/Spinning-Fitness-3.jpg'),
(5, 'Pilates', 'Pilates is a physical fitness system developed in the early 20th century by the Greek German-born Joseph Pilates. It is especially practiced in the United States (where Pilates lived, developed and taught his method) and the United Kingdom (where he lived and taught early stages of his method).', 'http://hyp.altervista.org/images/categories/PILATES.png', 'https://www.youtube.com/watch?v=NAuxkXR2huM', 'http://hyp.altervista.org/images/categories/ok.jpg'),
(6, 'Martial arts', 'Martial arts are codified systems and traditions of combat practices, which are practiced for a variety of reasons: self-defense, competition, physical health and fitness, entertainment, as well as mental, physical, and spiritual development.', 'http://hyp.altervista.org/images/categories/MARTIAL.png', 'https://www.youtube.com/watch?v=TEQnTv31SYo', 'http://hyp.altervista.org/images/categories/kung-fu-grandpa.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `instructor`
--

CREATE TABLE IF NOT EXISTS `instructor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(17) NOT NULL,
  `surname` varchar(17) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `th_image` varchar(100) NOT NULL,
  `twitter` text NOT NULL,
  `twitter_id` bigint(18) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dump dei dati per la tabella `instructor`
--

INSERT INTO `instructor` (`id`, `name`, `surname`, `description`, `image`, `th_image`, `twitter`, `twitter_id`) VALUES
(1, 'Beth', 'Horn', 'Beth Horn has developed countless fitness programs and eating plans for her personal training clients, tutored students at Personal Training seminars, authored her own book – The Natural Way- The Holistic Guide To Total Mind-Body, Health & Fitness – and wrote and modeled for numerous fitness articles in Muscle & Fitness, Muscle & Fitness Hers, FLEX, Men’s Fitness and Oxygen Magazine.', 'http://hyp.altervista.org/images/instructor/beth.png', 'http://hyp.altervista.org/images/instructor/thumb_beth.png', 'bethhorn', 605386974313201666),
(2, 'Bill', 'Coleman', 'Bill Coleman has a Bachelor of Science degree in Microbiology from the Ohio Sate University and has been a personal trainer in Chicago since 1992.', 'http://hyp.altervista.org/images/instructor/bill.png', 'http://hyp.altervista.org/images/instructor/thumb_bill.png', 'BillfromAlabama', 605418619196088320),
(3, 'Armando', 'Valerio', 'While living in Boston, I attended Newbury College where I earned my Bachelor’s Degree in Health Care Administration. One of my favorite hobbies is recreational cycling. In 1997, I jointed the Massachusetts General Hospital cycling team and began raising funds to help cure diseases such as multiple sclerosis and cancer. Living in an area with short summers and long winters, my training needed to be taken indoors. In 2000, I obtained my certification as a Group Fitness Instructor through the Johnny G. Spinning Program. A year later I was certified as a Personal Trainer through the National Council of Strength and Fitness (NCSF).', 'http://hyp.altervista.org/images/instructor/armando.png', 'http://hyp.altervista.org/images/instructor/thumb_armando.png', 'armandomeyreles', 605390945241210880),
(4, 'Heather', 'Stammen', '"I believe in diversification. Since there are no "rules" when it comes to working out because everybody has a different "body" - I prefer to use a mixture of classic weights, functional movements, power lifts, and HIIT training to get maximal muscular development while challenging the cardiovascular system."', 'http://hyp.altervista.org/images/instructor/heather.png', 'http://hyp.altervista.org/images/instructor/thumb_heather.png', 'HeatherStammen', 605418825006358528),
(5, 'Lauren', 'Fairbanks', 'Lauren has been working as a personal trainer and health educator for the past 6 years. A former Div 1 track athlete who has always had a passion for fitness, nutrition, and competing, Lauren has a B.S. in Dietetics, and am currently working towards her holistic health coaching certification through the Institute for Integrative Nutrition. She loves working with people and helping open up their eyes and minds to the positive effects proper nutrition and physical activity can have in their lives!', 'http://hyp.altervista.org/images/instructor/lauren.png', 'http://hyp.altervista.org/images/instructor/thumb_lauren.png', 'l_banksy', 605419897447981056),
(6, 'Steve', 'Parkin', 'Steve has 19 years of personal and group training experience and got his start in Kingston, Jamaica.', 'http://hyp.altervista.org/images/instructor/steve.png', 'http://hyp.altervista.org/images/instructor/thumb_steve.png', 'SteveTParkin', 605420227548094465);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
