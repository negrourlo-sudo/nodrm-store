-- ============================================
-- NoDRM - Migración: Marketplace de usuarios
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. Limpiar tablas que referencian games (orden correcto)
DELETE FROM tournament_participants;
DELETE FROM tournaments;
DELETE FROM daily_contests;
DELETE FROM contest_participants;
DELETE FROM contest_tickets;
DELETE FROM purchase_items;
DELETE FROM purchase_history;
DELETE FROM library;
DELETE FROM wishlist;
DELETE FROM cart;
DELETE FROM reviews;
DELETE FROM user_achievements;
DELETE FROM game_genres;
DELETE FROM game_platforms;
DELETE FROM games;

-- 2. Agregar seller_id a games (quién vende el juego)
ALTER TABLE games ADD COLUMN seller_id UUID REFERENCES profiles(id);

-- 3. RLS: Permitir a usuarios autenticados insertar juegos
CREATE POLICY "Authenticated users can insert games"
    ON games FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = seller_id);

-- 4. RLS: Vendedores pueden actualizar sus propios juegos
CREATE POLICY "Sellers can update own games"
    ON games FOR UPDATE
    TO authenticated
    USING (auth.uid() = seller_id)
    WITH CHECK (auth.uid() = seller_id);

-- 5. RLS: Vendedores pueden eliminar sus propios juegos
CREATE POLICY "Sellers can delete own games"
    ON games FOR DELETE
    TO authenticated
    USING (auth.uid() = seller_id);

-- 6. Crear bucket para portadas de juegos
INSERT INTO storage.buckets (id, name, public)
VALUES ('game-covers', 'game-covers', true)
ON CONFLICT (id) DO NOTHING;

-- 7. RLS: anyone can view game covers
CREATE POLICY "Game covers are publicly viewable"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'game-covers');

-- 8. RLS: authenticated users can upload game covers
CREATE POLICY "Authenticated users can upload game covers"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'game-covers');

-- 9. RLS: users can update/delete their own covers
CREATE POLICY "Users can update own game covers"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own game covers"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (auth.uid()::text = (storage.foldername(name))[1]);

-- 10. Grant permissions
GRANT SELECT ON games TO anon;
GRANT ALL ON games TO authenticated;
