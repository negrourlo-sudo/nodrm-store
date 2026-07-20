-- ============================================
-- NoDRM - SETUP COMPLETO
-- Pegar TODO en Supabase SQL Editor y dar Run
-- ============================================

-- Limpiar tablas existentes (si existen)
DROP TABLE IF EXISTS purchase_items CASCADE;
DROP TABLE IF EXISTS purchase_history CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS contest_participants CASCADE;
DROP TABLE IF EXISTS contest_tickets CASCADE;
DROP TABLE IF EXISTS daily_contests CASCADE;
DROP TABLE IF EXISTS tournament_participants CASCADE;
DROP TABLE IF EXISTS tournaments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;
DROP TABLE IF EXISTS library CASCADE;
DROP TABLE IF EXISTS game_platforms CASCADE;
DROP TABLE IF EXISTS game_genres CASCADE;
DROP TABLE IF EXISTS platforms CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS handle_updated_at() CASCADE;

-- ============================================
-- TABLA: profiles (Perfiles de usuario)
-- ============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(30) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(255),
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'EUR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: games (CatÃ¡logo de juegos)
-- ============================================
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    developer VARCHAR(255),
    publisher VARCHAR(255),
    release_date DATE,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount INTEGER DEFAULT 0,
    cover_image TEXT,
    rating DECIMAL(3,1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    age_rating VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: genres (GÃ©neros de juegos)
-- ============================================
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- ============================================
-- TABLA: game_genres (RelaciÃ³n juegos-gÃ©neros)
-- ============================================
CREATE TABLE game_genres (
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

-- ============================================
-- TABLA: platforms (Plataformas)
-- ============================================
CREATE TABLE platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- ============================================
-- TABLA: game_platforms (RelaciÃ³n juegos-plataformas)
-- ============================================
CREATE TABLE game_platforms (
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, platform_id)
);

-- ============================================
-- TABLA: library (Biblioteca de juegos del usuario)
-- ============================================
CREATE TABLE library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_id)
);

-- ============================================
-- TABLA: wishlist (Lista de deseos)
-- ============================================
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_id)
);

-- ============================================
-- TABLA: cart (Carrito de compras)
-- ============================================
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_id)
);

-- ============================================
-- TABLA: reviews (ReseÃ±as de juegos)
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_id)
);

-- ============================================
-- TABLA: tournaments (Campeonatos)
-- ============================================
CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    game_id INTEGER REFERENCES games(id),
    description TEXT,
    format VARCHAR(100),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    prize_pool DECIMAL(10,2),
    prizes JSONB,
    rules TEXT[],
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'finished')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: tournament_participants (Inscripciones)
-- ============================================
CREATE TABLE tournament_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    seed INTEGER,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tournament_id, user_id)
);

-- ============================================
-- TABLA: daily_contests (Concursos diarios)
-- ============================================
CREATE TABLE daily_contests (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id),
    challenge VARCHAR(255) NOT NULL,
    description TEXT,
    prize DECIMAL(10,2),
    ticket_price DECIMAL(10,2),
    total_tickets_sold INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'finished')),
    winner_id UUID REFERENCES profiles(id),
    winning_score INTEGER,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: contest_tickets (Tickets de concursos)
-- ============================================
CREATE TABLE contest_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id INTEGER REFERENCES daily_contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_paid DECIMAL(10,2),
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: contest_participants (Participantes)
-- ============================================
CREATE TABLE contest_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id INTEGER REFERENCES daily_contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    score INTEGER,
    submitted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(contest_id, user_id)
);

-- ============================================
-- TABLA: friends (Amigos)
-- ============================================
CREATE TABLE friends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, friend_id)
);

-- ============================================
-- TABLA: achievements (Logros)
-- ============================================
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    points INTEGER DEFAULT 0
);

-- ============================================
-- TABLA: user_achievements (Logros de usuarios)
-- ============================================
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- ============================================
-- TABLA: purchase_history (Historial de compras)
-- ============================================
CREATE TABLE purchase_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: purchase_items (Items de compra)
-- ============================================
CREATE TABLE purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchase_history(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id),
    price DECIMAL(10,2)
);

-- ============================================
-- ÃNDICES PARA MEJOR RENDIMIENTO
-- ============================================
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_is_featured ON games(is_featured);
CREATE INDEX idx_games_is_new ON games(is_new);
CREATE INDEX idx_library_user ON library(user_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_reviews_game ON reviews(game_id);
CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_daily_contests_status ON daily_contests(status);
CREATE INDEX idx_contest_tickets_contest ON contest_tickets(contest_id);

-- ============================================
-- FUNCIONES TRIGGER
-- ============================================

-- Auto-crear perfil al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para nuevo usuario
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Actualizar.updated_at automÃ¡ticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_games_updated_at
    BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_items ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies para games (lectura pÃºblica)
CREATE POLICY "Games are viewable by everyone" ON games FOR SELECT USING (true);

-- Policies para genres y platforms (lectura pÃºblica)
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Genres are viewable by everyone" ON genres FOR SELECT USING (true);
CREATE POLICY "Platforms are viewable by everyone" ON platforms FOR SELECT USING (true);
CREATE POLICY "Game genres are viewable by everyone" ON game_genres FOR SELECT USING (true);
CREATE POLICY "Game platforms are viewable by everyone" ON game_platforms FOR SELECT USING (true);

-- Policies para library
CREATE POLICY "Users can view own library" ON library FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to own library" ON library FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para wishlist
CREATE POLICY "Users can view own wishlist" ON wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to own wishlist" ON wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from own wishlist" ON wishlist FOR DELETE USING (auth.uid() = user_id);

-- Policies para cart
CREATE POLICY "Users can view own cart" ON cart FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to own cart" ON cart FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can remove from own cart" ON cart FOR DELETE USING (auth.uid() = user_id);

-- Policies para reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Policies para tournaments
CREATE POLICY "Tournaments are viewable by everyone" ON tournaments FOR SELECT USING (true);

-- Policies para tournament_participants
CREATE POLICY "Participants viewable by everyone" ON tournament_participants FOR SELECT USING (true);
CREATE POLICY "Users can join tournaments" ON tournament_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para daily_contests
CREATE POLICY "Contests are viewable by everyone" ON daily_contests FOR SELECT USING (true);

-- Policies para contest_tickets
CREATE POLICY "Users can view own tickets" ON contest_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can buy tickets" ON contest_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para contest_participants
CREATE POLICY "Contest participants viewable by everyone" ON contest_participants FOR SELECT USING (true);
CREATE POLICY "Users can participate" ON contest_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own score" ON contest_participants FOR UPDATE USING (auth.uid() = user_id);

-- Policies para friends
CREATE POLICY "Users can view own friends" ON friends FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can send friend requests" ON friends FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update friendship" ON friends FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Policies para achievements
CREATE POLICY "Achievements are viewable by everyone" ON achievements FOR SELECT USING (true);
CREATE POLICY "User achievements viewable by everyone" ON user_achievements FOR SELECT USING (true);
CREATE POLICY "Users can unlock achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para purchase_history
CREATE POLICY "Users can view own purchases" ON purchase_history FOR SELECT USING (auth.uid() = user_id);

-- Policies para purchase_items
CREATE POLICY "Users can view own purchase items" ON purchase_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM purchase_history WHERE id = purchase_id AND user_id = auth.uid())
);

-- ============================================
-- DATOS INICIALES (SEED DATA)
-- ============================================

-- Insertar gÃ©neros
INSERT INTO genres (name, slug) VALUES
    ('RPG', 'rpg'),
    ('AcciÃ³n', 'accion'),
    ('Aventura', 'aventura'),
    ('Estrategia', 'estrategia'),
    ('SimulaciÃ³n', 'simulacion'),
    ('Deportes', 'deportes'),
    ('Carreras', 'carreras'),
    ('Lucha', 'lucha'),
    ('Shooter', 'shooter'),
    ('Indie', 'indie');

-- Insertar plataformas
INSERT INTO platforms (name) VALUES
    ('PC'),
    ('PlayStation 5'),
    ('Xbox Series X'),
    ('Nintendo Switch'),
    ('PlayStation 4'),
    ('Xbox One');

-- Insertar logros
INSERT INTO achievements (name, description, icon, points) VALUES
    ('Primer Login', 'Inicia sesiÃ³n por primera vez', 'ðŸ”‘', 10),
    ('Primer Juego', 'Compra tu primer juego', 'ðŸŽ®', 25),
    ('Coleccionista', 'Ten 10 juegos en tu biblioteca', 'ðŸ“š', 50),
    ('ReseÃ±ador', 'Escribe 5 reseÃ±as', 'âœï¸', 30),
    ('Social', 'AÃ±ade 5 amigos', 'ðŸ‘¥', 20),
    ('Competidor', 'Participa en un torneo', 'ðŸ†', 40),
    ('Afortunado', 'Gana un concurso diario', 'ðŸŽ°', 100),
    ('Ahorrador', 'Ahorra 50â‚¬ en ofertas', 'ðŸ’°', 35);


-- ============================================
-- NoDRM - Seed Data: 30 Juegos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- INSERTAR JUEGOS
INSERT INTO games (id, title, slug, description, developer, publisher, release_date, price, original_price, discount, cover_image, rating, reviews_count, is_new, is_featured, age_rating) VALUES
(1, 'Cyberpunk 2077', 'cyberpunk-2077', 'Un RPG de mundo abierto ambientado en el futuro distÃ³pico de Night City.', 'CD Projekt RED', 'CD Projekt', '2020-12-10', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop', 4.5, 12500, false, true, '18+'),
(2, 'The Witcher 3: Wild Hunt', 'the-witcher-3', 'Juega como Geralt de Rivia, un cazador de monstruros profesional, en un RPG de mundo abierto Ã©pico.', 'CD Projekt RED', 'CD Projekt', '2015-05-19', 39.99, 39.99, 0, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop', 4.9, 25000, false, true, '18+'),
(3, 'Elden Ring', 'elden-ring', 'Un RPG de acciÃ³n de mundo abierto creado por FromSoftware y George R.R. Martin.', 'FromSoftware', 'Bandai Namco', '2022-02-25', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=250&fit=crop', 4.8, 18000, false, true, '16+'),
(4, 'GTA VI', 'gta-vi', 'La prÃ³xima entrega de la serie Grand Theft Auto. Regresa a Vice City.', 'Rockstar Games', 'Rockstar Games', '2026-09-17', 79.99, 79.99, 0, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop', 0, 0, true, true, '18+'),
(5, 'Baldurs Gate 3', 'baldurs-gate-3', 'Un RPG Ã©pico basado en Dungeons & Dragons.', 'Larian Studios', 'Larian Studios', '2023-08-03', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop', 4.9, 21000, false, true, '16+'),
(6, 'Starfield', 'starfield', 'El primer universo nuevo de Bethesda en 25 aÃ±os. Un RPG espacial Ã©pico.', 'Bethesda Game Studios', 'Bethesda Softworks', '2023-09-06', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop', 3.8, 8500, false, false, '16+'),
(7, 'The Legend of Zelda: Tears of the Kingdom', 'zelda-totk', 'ContinuaciÃ³n de Breath of the Wild. Link explora Hyrule y las Islas Celestiales.', 'Nintendo', 'Nintendo', '2023-05-12', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop', 4.9, 22000, false, true, '7+'),
(8, 'Red Dead Redemption 2', 'rdr2', 'Vive el final de la era del salvaje oeste como Arthur Morgan.', 'Rockstar Games', 'Rockstar Games', '2018-10-26', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=250&fit=crop', 4.9, 30000, false, false, '18+'),
(9, 'Cyberpunk 2077: Phantom Liberty', 'cyberpunk-phantom-liberty', 'La expansiÃ³n definitiva de Cyberpunk 2077.', 'CD Projekt RED', 'CD Projekt', '2023-09-26', 29.99, 29.99, 0, 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop', 4.6, 5000, false, false, '18+'),
(10, 'Hollow Knight: Silksong', 'hollow-knight-silksong', 'La esperada secuela de Hollow Knight. Explora un nuevo reino como Hornet.', 'Team Cherry', 'Team Cherry', '2025-06-15', 24.99, 24.99, 0, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop', 4.8, 3200, true, false, '7+'),
(11, 'God of War Ragnarok', 'god-of-war-ragnarok', 'Kratos y Atreus se enfrentan a los dioses nÃ³rdicos.', 'Santa Monica Studio', 'Sony Interactive Entertainment', '2022-11-09', 49.99, 69.99, 28, 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=250&fit=crop', 4.8, 15000, false, false, '18+'),
(12, 'Hades II', 'hades-2', 'La continuaciÃ³n del aclamado roguelike. Un viaje oscuro a travÃ©s del inframundo.', 'Supergiant Games', 'Supergiant Games', '2025-09-25', 24.99, 24.99, 0, 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop', 4.7, 4500, true, false, '12+'),
(13, 'Call of Duty: Modern Warfare III', 'cod-mw3', 'La Ãºltima entrega de la icÃ³nica saga de shooter en primera persona.', 'Sledgehammer Games', 'Activision', '2023-11-10', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop', 3.5, 9000, false, false, '18+'),
(14, 'Resident Evil 4 Remake', 're4-remake', 'El remake del clÃ¡sico de survival horror. AcompaÃ±a a Leon Kennedy.', 'Capcom', 'Capcom', '2023-03-24', 39.99, 59.99, 33, 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=250&fit=crop', 4.7, 12000, false, false, '18+'),
(15, 'Stardew Valley', 'stardew-valley', 'Crea tu granja, haz amigos y descubre secretos en este RPG de simulaciÃ³n.', 'ConcernedApe', 'ConcernedApe', '2016-02-26', 14.99, 14.99, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop', 4.8, 20000, false, false, '7+'),
(16, 'Persona 5 Royal', 'persona-5-royal', 'La versiÃ³n definitiva del aclamado JRPG. Ãšnete a los Phantom Thieves.', 'Atlus', 'Sega', '2022-10-21', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop', 4.9, 11000, false, false, '16+'),
(17, 'Forza Horizon 5', 'forza-horizon-5', 'El festival de carreras definitivo ambientado en MÃ©xico.', 'Playground Games', 'Xbox Game Studios', '2021-11-09', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=400&h=250&fit=crop', 4.7, 14000, false, false, '3+'),
(18, 'Final Fantasy XVI', 'ff16', 'La prÃ³xima entrega de la icÃ³nica saga de RPGs. Una historia Ã©pica.', 'Square Enix', 'Square Enix', '2025-12-05', 69.99, 69.99, 0, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop', 4.6, 6500, true, false, '16+'),
(19, 'Minecraft', 'minecraft', 'El juego de sandbox definitivo. Construye, explora y sobrevive.', 'Mojang', 'Microsoft', '2011-11-18', 29.99, 29.99, 0, 'https://images.unsplash.com/photo-1587573578883-e3ee12250e14?w=400&h=250&fit=crop', 4.8, 50000, false, false, '7+'),
(20, 'Diablo IV', 'diablo-4', 'El aclamado action RPG de Blizzard. Explora Sanctuary y enfrenta a Lilith.', 'Blizzard Entertainment', 'Blizzard Entertainment', '2023-06-06', 49.99, 69.99, 28, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop', 4.3, 16000, false, true, '18+'),
(21, 'Celeste', 'celeste', 'Un platformer pixel art con una historia emotiva.', 'Maddy Makes Games', 'Maddy Makes Games', '2018-01-25', 4.99, 19.99, 75, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop', 4.9, 8000, false, false, '7+'),
(22, 'Star Wars Jedi: Survivor', 'jedi-survivor', 'ContinuaciÃ³n de Fallen Order. Cal Kestis se enfrenta a nuevas amenazas.', 'Respawn Entertainment', 'Electronic Arts', '2023-04-28', 39.99, 69.99, 42, 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=250&fit=crop', 4.4, 7500, false, false, '12+'),
(23, 'Hogwarts Legacy', 'hogwarts-legacy', 'Vive tu propia aventura en el mundo mÃ¡gico de Harry Potter.', 'Avalanche Software', 'Warner Bros. Interactive', '2023-02-10', 49.99, 69.99, 28, 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop', 4.6, 19000, false, false, '12+'),
(24, 'Undertale', 'undertale', 'Un RPG donde nadie tiene que morir. Conoce personajes memorables.', 'Toby Fox', 'Toby Fox', '2015-09-15', 9.99, 9.99, 0, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=250&fit=crop', 4.9, 22000, false, false, '7+'),
(25, 'Assassins Creed Mirage', 'ac-mirage', 'Regresa a las raÃ­ces de la saga. EmbÃ¡rcate en una aventura como Basim.', 'Ubisoft Bordeaux', 'Ubisoft', '2023-10-05', 39.99, 49.99, 20, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop', 4.1, 8500, false, false, '18+'),
(26, 'Lies of P', 'lies-of-p', 'Un soulslike ambientado en el mundo de Pinocho.', 'Neowiz Games', 'Round8 Studio', '2023-09-19', 49.99, 49.99, 0, 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop', 4.4, 5000, false, false, '16+'),
(27, 'The Last of Us Part I', 'tlou-part1', 'El remake del aclamado survival horror. Sigue a Joel y Ellie.', 'Naughty Dog', 'Sony Interactive Entertainment', '2022-09-02', 39.99, 69.99, 42, 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=250&fit=crop', 4.8, 10000, false, false, '18+'),
(28, 'Alan Wake 2', 'alan-wake-2', 'La continuaciÃ³n del thriller psicolÃ³gico.', 'Remedy Entertainment', 'Epic Games Publishing', '2023-10-27', 59.99, 59.99, 0, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop', 4.5, 6000, false, false, '18+'),
(29, 'Sekiro: Shadows Die Twice', 'sekiro', 'Un action-adventure ambientado en el JapÃ³n feudal.', 'FromSoftware', 'Activision', '2019-03-22', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=250&fit=crop', 4.8, 14000, false, false, '18+'),
(30, 'Ori and the Will of the Wisps', 'ori-will-of-the-wisps', 'ContinuaciÃ³n del aclamado Metroidvania.', 'Moon Studios', 'Xbox Game Studios', '2020-03-11', 19.99, 29.99, 33, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop', 4.9, 9000, false, false, '7+');

-- Reiniciar secuencia de IDs
SELECT setval('games_id_seq', 30);

-- ============================================
-- RELACIONES JUEGOS-GÃ‰NEROS
-- ============================================
-- GÃ©neros: 1=RPG, 2=AcciÃ³n, 3=Aventura, 4=Estrategia, 5=SimulaciÃ³n, 6=Deportes, 7=Carreras, 8=Lucha, 9=Shooter, 10=Indie

INSERT INTO game_genres (game_id, genre_id) VALUES
-- Cyberpunk 2077: RPG, AcciÃ³n
(1, 1), (1, 2),
-- The Witcher 3: RPG, AcciÃ³n
(2, 1), (2, 2),
-- Elden Ring: RPG, AcciÃ³n
(3, 1), (3, 2),
-- GTA VI: AcciÃ³n, Aventura
(4, 2), (4, 3),
-- Baldur's Gate 3: RPG, Estrategia
(5, 1), (5, 4),
-- Starfield: RPG
(6, 1),
-- Zelda TotK: Aventura, AcciÃ³n
(7, 3), (7, 2),
-- RDR2: AcciÃ³n, Aventura
(8, 2), (8, 3),
-- Phantom Liberty: RPG, AcciÃ³n
(9, 1), (9, 2),
-- Silksong: AcciÃ³n, Indie
(10, 2), (10, 10),
-- God of War: AcciÃ³n, Aventura
(11, 2), (11, 3),
-- Hades II: AcciÃ³n, Indie
(12, 2), (12, 10),
-- COD MW3: Shooter, AcciÃ³n
(13, 9), (13, 2),
-- RE4 Remake: AcciÃ³n, Aventura
(14, 2), (14, 3),
-- Stardew Valley: SimulaciÃ³n, RPG, Indie
(15, 5), (15, 1), (15, 10),
-- Persona 5: RPG, Aventura
(16, 1), (16, 3),
-- Forza Horizon 5: Carreras, SimulaciÃ³n
(17, 7), (17, 5),
-- FF16: RPG, AcciÃ³n
(18, 1), (18, 2),
-- Minecraft: SimulaciÃ³n
(19, 5),
-- Diablo IV: RPG, AcciÃ³n
(20, 1), (20, 2),
-- Celeste: Indie, Aventura
(21, 10), (21, 3),
-- Jedi Survivor: AcciÃ³n, Aventura
(22, 2), (22, 3),
-- Hogwarts Legacy: RPG, Aventura
(23, 1), (23, 3),
-- Undertale: RPG, Indie
(24, 1), (24, 10),
-- AC Mirage: AcciÃ³n, Aventura
(25, 2), (25, 3),
-- Lies of P: AcciÃ³n, RPG
(26, 2), (26, 1),
-- TLOU Part I: AcciÃ³n, Aventura
(27, 2), (27, 3),
-- Alan Wake 2: AcciÃ³n, Aventura
(28, 2), (28, 3),
-- Sekiro: AcciÃ³n, Aventura
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

