-- ============================================
-- NoDRM - Seed: Torneos
-- Ejecutar en Supabase SQL Editor
-- ============================================

INSERT INTO tournaments (id, title, game_id, description, format, max_participants, current_participants, prize_pool, prizes, rules, start_date, end_date, status) VALUES
(1, 'NoDRM Championship #1', 3, 'El primer campeonato oficial de NoDRM. Demuestra que eres el mejor en las Tierras Intermedias.', 'Eliminacion Directa', 64, 48, 500.00,
 '[{"position":1,"amount":250,"title":"Campeon"},{"position":2,"amount":150,"title":"Subcampeon"},{"position":3,"amount":100,"title":"Tercer Puesto"}]',
 ARRAY['Sin modificaciones','New Game+ permitido','Speedrun o casual, tu decides','Screenshots como prueba'],
 '2026-07-20T18:00:00Z', '2026-07-25T23:59:59Z', 'upcoming'),

(2, 'Speedrun Challenge', 21, 'Compite por el mejor tiempo en completar Celeste. Cada segundo cuenta.', 'Speedrun', 100, 73, 300.00,
 '[{"position":1,"amount":150,"title":"Speed King"},{"position":2,"amount":100,"title":"Velocista"},{"position":3,"amount":50,"title":"Rapido"}]',
 ARRAY['Categoria: Any%','Video obligatorio','Sin assists','Timing oficial del juego'],
 '2026-07-18T12:00:00Z', '2026-07-22T23:59:59Z', 'active'),

(3, 'FPS Masters Tournament', 13, 'Torneo de habilidad pura en los modos multijugador de COD.', 'Best of 5', 32, 32, 750.00,
 '[{"position":1,"amount":400,"title":"MVP"},{"position":2,"amount":200,"title":"Runner Up"},{"position":3,"amount":150,"title":"Top 3"}]',
 ARRAY['Modo Search & Destroy','Equipos de 4','Sin killstreaks','Mapas oficiales'],
 '2026-07-15T20:00:00Z', '2026-07-19T23:59:59Z', 'active'),

(4, 'RPG Legends Cup', 5, 'Crea el personaje mas build y demuestra tu dominio del sistema D&D.', 'Build Challenge', 50, 21, 400.00,
 '[{"position":1,"amount":200,"title":"Maestro Builds"},{"position":2,"amount":120,"title":"Estratega"},{"position":3,"amount":80,"title":"Tactico"}]',
 ARRAY['Nivel 12 maximo','Multijugador cooperativo','Evaluacion por build y ejecucion','Screenshots y video'],
 '2026-07-25T16:00:00Z', '2026-07-30T23:59:59Z', 'upcoming');

SELECT setval('tournaments_id_seq', 4);
