-- ============================================
-- NoDRM - Seed: Concursos diarios
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Concurso activo 1
INSERT INTO daily_contests (id, game_id, challenge, description, prize, ticket_price, total_tickets_sold, status, start_date, end_date) VALUES
(1, 21, 'Speedrun Challenge: Celeste Capítulo 1', 'Completa el Capítulo 1 de Celeste lo más rápido posible. El tiempo más rápido gana.', 150.00, 2.00, 47, 'active', NOW() - INTERVAL '2 days', NOW() + INTERVAL '2 days');

-- Concurso activo 2
INSERT INTO daily_contests (id, game_id, challenge, description, prize, ticket_price, total_tickets_sold, status, start_date, end_date) VALUES
(2, 22, 'Super Mario Bros: Nivel Imposible', 'Supera el nivel 8-3 sin perder vidas. El que más intentos tenga gana.', 100.00, 1.50, 33, 'active', NOW() - INTERVAL '1 day', NOW() + INTERVAL '3 days');

-- Concurso finalizado 1
INSERT INTO daily_contests (id, game_id, challenge, description, prize, ticket_price, total_tickets_sold, status, winner_id, winning_score, start_date, end_date) VALUES
(3, 23, 'Minecraft: Construye tu castillo', 'Construye el castillo más impresionante en creative mode. Votación por la comunidad.', 200.00, 3.00, 62, 'finished', NULL, 8500, NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 days');

-- Concurso finalizado 2
INSERT INTO daily_contests (id, game_id, challenge, description, prize, ticket_price, total_tickets_sold, status, winner_id, winning_score, start_date, end_date) VALUES
(4, 3, 'Elden Ring: Boss Rush', 'Derrota a Margit, Godrick y Rennala en el menor tiempo posible.', 300.00, 5.00, 28, 'finished', NULL, 12450, NOW() - INTERVAL '8 days', NOW() - INTERVAL '4 days');

-- Participantes de concursos finalizados (simulados)
INSERT INTO contest_participants (contest_id, user_id, score, submitted_at) VALUES
(3, (SELECT id FROM profiles LIMIT 1), 8500, NOW() - INTERVAL '3 days'),
(4, (SELECT id FROM profiles LIMIT 1), 12450, NOW() - INTERVAL '5 days');

-- Tickets vendidos en concursos finalizados
INSERT INTO contest_tickets (contest_id, user_id, quantity, total_paid, purchased_at) VALUES
(3, (SELECT id FROM profiles LIMIT 1), 5, 15.00, NOW() - INTERVAL '4 days'),
(4, (SELECT id FROM profiles LIMIT 1), 3, 15.00, NOW() - INTERVAL '6 days');

SELECT setval('daily_contests_id_seq', 4);
