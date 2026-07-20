-- ============================================
-- NoDRM - Esquema de Base de Datos
-- Supabase (PostgreSQL)
-- ============================================

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
-- TABLA: games (Catálogo de juegos)
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
-- TABLA: genres (Géneros de juegos)
-- ============================================
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- ============================================
-- TABLA: game_genres (Relación juegos-géneros)
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
-- TABLA: game_platforms (Relación juegos-plataformas)
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
-- TABLA: reviews (Reseñas de juegos)
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
-- ÍNDICES PARA MEJOR RENDIMIENTO
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

-- Actualizar.updated_at automáticamente
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

-- Policies para games (lectura pública)
CREATE POLICY "Games are viewable by everyone" ON games FOR SELECT USING (true);

-- Policies para genres y platforms (lectura pública)
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

-- Insertar géneros
INSERT INTO genres (name, slug) VALUES
    ('RPG', 'rpg'),
    ('Acción', 'accion'),
    ('Aventura', 'aventura'),
    ('Estrategia', 'estrategia'),
    ('Simulación', 'simulacion'),
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
    ('Primer Login', 'Inicia sesión por primera vez', '🔑', 10),
    ('Primer Juego', 'Compra tu primer juego', '🎮', 25),
    ('Coleccionista', 'Ten 10 juegos en tu biblioteca', '📚', 50),
    ('Reseñador', 'Escribe 5 reseñas', '✍️', 30),
    ('Social', 'Añade 5 amigos', '👥', 20),
    ('Competidor', 'Participa en un torneo', '🏆', 40),
    ('Afortunado', 'Gana un concurso diario', '🎰', 100),
    ('Ahorrador', 'Ahorra 50€ en ofertas', '💰', 35);
