-- ============================================
-- Fix: Recrear storage policies para game-covers
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Eliminar policies existentes si existen
DROP POLICY IF EXISTS "Game covers are publicly viewable" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload game covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own game covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own game covers" ON storage.objects;

-- Asegurar que el bucket existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('game-covers', 'game-covers', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 1. Anyone can view (SELECT)
CREATE POLICY "Game covers are publicly viewable"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'game-covers');

-- 2. Authenticated users can upload (INSERT)
CREATE POLICY "Authenticated users can upload game covers"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'game-covers');

-- 3. Users can update their own files
CREATE POLICY "Users can update own game covers"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'game-covers' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 4. Users can delete their own files
CREATE POLICY "Users can delete own game covers"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'game-covers' AND auth.uid()::text = (storage.foldername(name))[1]);
