-- ============================================
-- NoDRM - Función RPC: Leaderboard global
-- Ejecutar en Supabase SQL Editor
-- ============================================

CREATE OR REPLACE FUNCTION get_leaderboard()
RETURNS TABLE (
    user_id UUID,
    username TEXT,
    display_name TEXT,
    avatar_url TEXT,
    total_points BIGINT
)
LANGUAGE sql STABLE
AS $$
    SELECT
        ua.user_id,
        p.username,
        p.display_name,
        p.avatar_url,
        SUM(a.points) AS total_points
    FROM user_achievements ua
    JOIN achievements a ON a.id = ua.achievement_id
    JOIN profiles p ON p.id = ua.user_id
    GROUP BY ua.user_id, p.username, p.display_name, p.avatar_url
    ORDER BY total_points DESC
    LIMIT 20;
$$;
