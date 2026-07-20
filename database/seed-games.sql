-- ============================================
-- NoDRM - Seed Data: 30 Juegos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- INSERTAR JUEGOS
INSERT INTO games (id, title, slug, description, developer, publisher, release_date, price, original_price, discount, cover_image, rating, reviews_count, is_new, is_featured, age_rating) VALUES
(1, 'Cyberpunk 2077', 'cyberpunk-2077', 'Un RPG de mundo abierto ambientado en el futuro distópico de Night City.', 'CD Projekt RED', 'CD Projekt', '2020-12-10', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop', 4.5, 12500, false, true, '18+'),
(2, 'The Witcher 3: Wild Hunt', 'the-witcher-3', 'Juega como Geralt de Rivia, un cazador de monstruros profesional, en un RPG de mundo abierto épico.', 'CD Projekt RED', 'CD Projekt', '2015-05-19', 39.99, 39.99, 0, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop', 4.9, 25000, false, true, '18+'),
(3, 'Elden Ring', 'elden-ring', 'Un RPG de acción de mundo abierto creado por FromSoftware y George R.R. Martin.', 'FromSoftware', 'Bandai Namco', '2022-02-25', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=250&fit=crop', 4.8, 18000, false, true, '16+'),
(4, 'GTA VI', 'gta-vi', 'La próxima entrega de la serie Grand Theft Auto. Regresa a Vice City.', 'Rockstar Games', 'Rockstar Games', '2026-09-17', 79.99, 79.99, 0, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop', 0, 0, true, true, '18+'),
(5, 'Baldurs Gate 3', 'baldurs-gate-3', 'Un RPG épico basado en Dungeons & Dragons.', 'Larian Studios', 'Larian Studios', '2023-08-03', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop', 4.9, 21000, false, true, '16+'),
(6, 'Starfield', 'starfield', 'El primer universo nuevo de Bethesda en 25 años. Un RPG espacial épico.', 'Bethesda Game Studios', 'Bethesda Softworks', '2023-09-06', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop', 3.8, 8500, false, false, '16+'),
(7, 'The Legend of Zelda: Tears of the Kingdom', 'zelda-totk', 'Continuación de Breath of the Wild. Link explora Hyrule y las Islas Celestiales.', 'Nintendo', 'Nintendo', '2023-05-12', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop', 4.9, 22000, false, true, '7+'),
(8, 'Red Dead Redemption 2', 'rdr2', 'Vive el final de la era del salvaje oeste como Arthur Morgan.', 'Rockstar Games', 'Rockstar Games', '2018-10-26', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=250&fit=crop', 4.9, 30000, false, false, '18+'),
(9, 'Cyberpunk 2077: Phantom Liberty', 'cyberpunk-phantom-liberty', 'La expansión definitiva de Cyberpunk 2077.', 'CD Projekt RED', 'CD Projekt', '2023-09-26', 29.99, 29.99, 0, 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop', 4.6, 5000, false, false, '18+'),
(10, 'Hollow Knight: Silksong', 'hollow-knight-silksong', 'La esperada secuela de Hollow Knight. Explora un nuevo reino como Hornet.', 'Team Cherry', 'Team Cherry', '2025-06-15', 24.99, 24.99, 0, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop', 4.8, 3200, true, false, '7+'),
(11, 'God of War Ragnarok', 'god-of-war-ragnarok', 'Kratos y Atreus se enfrentan a los dioses nórdicos.', 'Santa Monica Studio', 'Sony Interactive Entertainment', '2022-11-09', 49.99, 69.99, 28, 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=250&fit=crop', 4.8, 15000, false, false, '18+'),
(12, 'Hades II', 'hades-2', 'La continuación del aclamado roguelike. Un viaje oscuro a través del inframundo.', 'Supergiant Games', 'Supergiant Games', '2025-09-25', 24.99, 24.99, 0, 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop', 4.7, 4500, true, false, '12+'),
(13, 'Call of Duty: Modern Warfare III', 'cod-mw3', 'La última entrega de la icónica saga de shooter en primera persona.', 'Sledgehammer Games', 'Activision', '2023-11-10', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop', 3.5, 9000, false, false, '18+'),
(14, 'Resident Evil 4 Remake', 're4-remake', 'El remake del clásico de survival horror. Acompaña a Leon Kennedy.', 'Capcom', 'Capcom', '2023-03-24', 39.99, 59.99, 33, 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=250&fit=crop', 4.7, 12000, false, false, '18+'),
(15, 'Stardew Valley', 'stardew-valley', 'Crea tu granja, haz amigos y descubre secretos en este RPG de simulación.', 'ConcernedApe', 'ConcernedApe', '2016-02-26', 14.99, 14.99, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop', 4.8, 20000, false, false, '7+'),
(16, 'Persona 5 Royal', 'persona-5-royal', 'La versión definitiva del aclamado JRPG. Únete a los Phantom Thieves.', 'Atlus', 'Sega', '2022-10-21', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop', 4.9, 11000, false, false, '16+'),
(17, 'Forza Horizon 5', 'forza-horizon-5', 'El festival de carreras definitivo ambientado en México.', 'Playground Games', 'Xbox Game Studios', '2021-11-09', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=400&h=250&fit=crop', 4.7, 14000, false, false, '3+'),
(18, 'Final Fantasy XVI', 'ff16', 'La próxima entrega de la icónica saga de RPGs. Una historia épica.', 'Square Enix', 'Square Enix', '2025-12-05', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop', 4.6, 6500, true, false, '16+'),
(19, 'Minecraft', 'minecraft', 'El juego de sandbox definitivo. Construye, explora y sobrevive.', 'Mojang', 'Microsoft', '2011-11-18', 29.99, 29.99, 0, 'https://images.unsplash.com/photo-1587573578883-e3ee12250e14?w=400&h=250&fit=crop', 4.8, 50000, false, false, '7+'),
(20, 'Diablo IV', 'diablo-4', 'El aclamado action RPG de Blizzard. Explora Sanctuary y enfrenta a Lilith.', 'Blizzard Entertainment', 'Blizzard Entertainment', '2023-06-06', 49.99, 69.99, 28, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop', 4.3, 16000, false, true, '18+'),
(21, 'Celeste', 'celeste', 'Un platformer pixel art con una historia emotiva.', 'Maddy Makes Games', 'Maddy Makes Games', '2018-01-25', 4.99, 19.99, 75, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop', 4.9, 8000, false, false, '7+'),
(22, 'Star Wars Jedi: Survivor', 'jedi-survivor', 'Continuación de Fallen Order. Cal Kestis se enfrenta a nuevas amenazas.', 'Respawn Entertainment', 'Electronic Arts', '2023-04-28', 39.99, 69.99, 42, 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=250&fit=crop', 4.4, 7500, false, false, '12+'),
(23, 'Hogwarts Legacy', 'hogwarts-legacy', 'Vive tu propia aventura en el mundo mágico de Harry Potter.', 'Avalanche Software', 'Warner Bros. Interactive', '2023-02-10', 49.99, 69.99, 28, 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop', 4.6, 19000, false, false, '12+'),
(24, 'Undertale', 'undertale', 'Un RPG donde nadie tiene que morir. Conoce personajes memorables.', 'Toby Fox', 'Toby Fox', '2015-09-15', 9.99, 9.99, 0, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=250&fit=crop', 4.9, 22000, false, false, '7+'),
(25, 'Assassins Creed Mirage', 'ac-mirage', 'Regresa a las raíces de la saga. Embárcate en una aventura como Basim.', 'Ubisoft Bordeaux', 'Ubisoft', '2023-10-05', 39.99, 49.99, 20, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop', 4.1, 8500, false, false, '18+'),
(26, 'Lies of P', 'lies-of-p', 'Un soulslike ambientado en el mundo de Pinocho.', 'Neowiz Games', 'Round8 Studio', '2023-09-19', 49.99, 49.99, 0, 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop', 4.4, 5000, false, false, '16+'),
(27, 'The Last of Us Part I', 'tlou-part1', 'El remake del aclamado survival horror. Sigue a Joel y Ellie.', 'Naughty Dog', 'Sony Interactive Entertainment', '2022-09-02', 39.99, 69.99, 42, 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=250&fit=crop', 4.8, 10000, false, false, '18+'),
(28, 'Alan Wake 2', 'alan-wake-2', 'La continuación del thriller psicológico.', 'Remedy Entertainment', 'Epic Games Publishing', '2023-10-27', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop', 4.5, 6000, false, false, '18+'),
(29, 'Sekiro: Shadows Die Twice', 'sekiro', 'Un action-adventure ambientado en el Japón feudal.', 'FromSoftware', 'Activision', '2019-03-22', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=250&fit=crop', 4.8, 14000, false, false, '18+'),
(30, 'Ori and the Will of the Wisps', 'ori-will-of-the-wisps', 'Continuación del aclamado Metroidvania.', 'Moon Studios', 'Xbox Game Studios', '2020-03-11', 19.99, 29.99, 33, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop', 4.9, 9000, false, false, '7+');

-- Reiniciar secuencia de IDs
SELECT setval('games_id_seq', 30);

-- ============================================
-- RELACIONES JUEGOS-GÉNEROS
-- ============================================
-- Géneros: 1=RPG, 2=Acción, 3=Aventura, 4=Estrategia, 5=Simulación, 6=Deportes, 7=Carreras, 8=Lucha, 9=Shooter, 10=Indie

INSERT INTO game_genres (game_id, genre_id) VALUES
-- Cyberpunk 2077: RPG, Acción
(1, 1), (1, 2),
-- The Witcher 3: RPG, Acción
(2, 1), (2, 2),
-- Elden Ring: RPG, Acción
(3, 1), (3, 2),
-- GTA VI: Acción, Aventura
(4, 2), (4, 3),
-- Baldur's Gate 3: RPG, Estrategia
(5, 1), (5, 4),
-- Starfield: RPG
(6, 1),
-- Zelda TotK: Aventura, Acción
(7, 3), (7, 2),
-- RDR2: Acción, Aventura
(8, 2), (8, 3),
-- Phantom Liberty: RPG, Acción
(9, 1), (9, 2),
-- Silksong: Acción, Indie
(10, 2), (10, 10),
-- God of War: Acción, Aventura
(11, 2), (11, 3),
-- Hades II: Acción, Indie
(12, 2), (12, 10),
-- COD MW3: Shooter, Acción
(13, 9), (13, 2),
-- RE4 Remake: Acción, Aventura
(14, 2), (14, 3),
-- Stardew Valley: Simulación, RPG, Indie
(15, 5), (15, 1), (15, 10),
-- Persona 5: RPG, Aventura
(16, 1), (16, 3),
-- Forza Horizon 5: Carreras, Simulación
(17, 7), (17, 5),
-- FF16: RPG, Acción
(18, 1), (18, 2),
-- Minecraft: Simulación
(19, 5),
-- Diablo IV: RPG, Acción
(20, 1), (20, 2),
-- Celeste: Indie, Aventura
(21, 10), (21, 3),
-- Jedi Survivor: Acción, Aventura
(22, 2), (22, 3),
-- Hogwarts Legacy: RPG, Aventura
(23, 1), (23, 3),
-- Undertale: RPG, Indie
(24, 1), (24, 10),
-- AC Mirage: Acción, Aventura
(25, 2), (25, 3),
-- Lies of P: Acción, RPG
(26, 2), (26, 1),
-- TLOU Part I: Acción, Aventura
(27, 2), (27, 3),
-- Alan Wake 2: Acción, Aventura
(28, 2), (28, 3),
-- Sekiro: Acción, Aventura
(29, 2), (29, 3),
-- Ori: Indie, Aventura
(30, 10), (30, 3);

-- ============================================
-- RELACIONES JUEGOS-PLATAFORMAS
-- ============================================
-- Plataformas: 1=PC, 2=PS5, 3=Xbox Series X, 4=Switch, 5=PS4, 6=Xbox One

INSERT INTO game_platforms (game_id, platform_id) VALUES
-- Cyberpunk 2077
(1, 1), (1, 2), (1, 3),
-- The Witcher 3
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
-- Elden Ring
(3, 1), (3, 2), (3, 3), (3, 5), (3, 6),
-- GTA VI
(4, 2), (4, 3), (4, 1),
-- Baldur's Gate 3
(5, 1), (5, 2), (5, 3),
-- Starfield
(6, 1), (6, 3),
-- Zelda TotK
(7, 4),
-- RDR2
(8, 1), (8, 2), (8, 3), (8, 5), (8, 6),
-- Phantom Liberty
(9, 1), (9, 2), (9, 3),
-- Silksong
(10, 1), (10, 4), (10, 2), (10, 3),
-- God of War
(11, 5), (11, 2), (11, 1),
-- Hades II
(12, 1), (12, 2), (12, 3),
-- COD MW3
(13, 1), (13, 2), (13, 3), (13, 5), (13, 6),
-- RE4 Remake
(14, 1), (14, 2), (14, 3), (14, 5),
-- Stardew Valley
(15, 1), (15, 4), (15, 5), (15, 6),
-- Persona 5 Royal
(16, 1), (16, 2), (16, 4), (16, 3),
-- Forza Horizon 5
(17, 1), (17, 6), (17, 3),
-- FF16
(18, 1), (18, 2), (18, 3),
-- Minecraft
(19, 1), (19, 2), (19, 3), (19, 4), (19, 5), (19, 6),
-- Diablo IV
(20, 1), (20, 2), (20, 3), (20, 5), (20, 6),
-- Celeste
(21, 1), (21, 4), (21, 5), (21, 6),
-- Jedi Survivor
(22, 1), (22, 2), (22, 3),
-- Hogwarts Legacy
(23, 1), (23, 2), (23, 3), (23, 5), (23, 6),
-- Undertale
(24, 1), (24, 4), (24, 5),
-- AC Mirage
(25, 1), (25, 2), (25, 3), (25, 5), (25, 6),
-- Lies of P
(26, 1), (26, 2), (26, 3), (26, 5), (26, 6),
-- TLOU Part I
(27, 2), (27, 1),
-- Alan Wake 2
(28, 1), (28, 2), (28, 3),
-- Sekiro
(29, 1), (29, 5), (29, 6),
-- Ori
(30, 1), (30, 3), (30, 6), (30, 4);
