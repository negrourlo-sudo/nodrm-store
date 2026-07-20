-- ============================================
-- NoDRM - Exponer tablas al Data API
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Lectura publica (catalogo, generos, plataformas)
GRANT SELECT ON games TO anon;
GRANT SELECT ON games TO authenticated;
GRANT SELECT ON genres TO anon;
GRANT SELECT ON genres TO authenticated;
GRANT SELECT ON platforms TO anon;
GRANT SELECT ON platforms TO authenticated;
GRANT SELECT ON game_genres TO anon;
GRANT SELECT ON game_genres TO authenticated;
GRANT SELECT ON game_platforms TO anon;
GRANT SELECT ON game_platforms TO authenticated;
GRANT SELECT ON achievements TO anon;
GRANT SELECT ON achievements TO authenticated;
GRANT SELECT ON user_achievements TO anon;
GRANT SELECT ON user_achievements TO authenticated;
GRANT SELECT ON contest_participants TO anon;
GRANT SELECT ON contest_participants TO authenticated;

-- Lectura/escritura para usuarios autenticados (datos personales)
GRANT ALL ON library TO authenticated;
GRANT ALL ON wishlist TO authenticated;
GRANT ALL ON cart TO authenticated;
GRANT ALL ON reviews TO authenticated;
GRANT ALL ON tournaments TO authenticated;
GRANT ALL ON tournament_participants TO authenticated;
GRANT ALL ON daily_contests TO authenticated;
GRANT ALL ON contest_tickets TO authenticated;
GRANT ALL ON contest_participants TO authenticated;
GRANT ALL ON friends TO authenticated;
GRANT ALL ON user_achievements TO authenticated;
GRANT ALL ON purchase_history TO authenticated;
GRANT ALL ON purchase_items TO authenticated;

-- Permisos para profiles (lectura publica, escritura propio)
GRANT SELECT ON profiles TO anon;
GRANT ALL ON profiles TO authenticated;
