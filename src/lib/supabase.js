// ============================================
// NoDRM - Configuración de Supabase
// ============================================

import { createClient } from '@supabase/supabase-js';

// Variables de entorno (usar .env.local en desarrollo)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://TU-PROYECTO.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU-ANON-KEY';

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================
export const authService = {
    // Registrar usuario
    async signUp(email, password, userData) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: userData.username,
                    display_name: userData.displayName,
                    avatar_url: userData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
                }
            }
        });
        return { data, error };
    },

    // Iniciar sesión
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    // Cerrar sesión
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Obtener usuario actual
    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    // Obtener sesión
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, error };
    },

    // Escuchar cambios de auth
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    },

    // Resetear contraseña
    async resetPassword(email) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        return { data, error };
    },

    // Actualizar contraseña
    async updatePassword(newPassword) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        return { data, error };
    }
};

// ============================================
// SERVICIO DE PERFILES
// ============================================
export const profileService = {
    // Obtener perfil por ID
    async getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        return { data, error };
    },

    // Obtener perfil por username
    async getProfileByUsername(username) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();
        return { data, error };
    },

    // Actualizar perfil
    async updateProfile(userId, updates) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        return { data, error };
    },

    // Obtener wallet del usuario
    async getWallet(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('wallet_balance, currency')
            .eq('id', userId)
            .single();
        return { data, error };
    },

    // Actualizar wallet
    async updateWallet(userId, amount) {
        const { data, error } = await supabase
            .rpc('update_wallet', {
                user_id: userId,
                amount: amount
            });
        return { data, error };
    }
};

// ============================================
// SERVICIO DE JUEGOS
// ============================================
export const gamesService = {
    // Obtener todos los juegos
    async getGames(filters = {}) {
        let query = supabase
            .from('games')
            .select(`
                *,
                game_genres(genre_id, genres(name, slug)),
                game_platforms(platform_id, platforms(name))
            `);

        if (filters.genre) {
            query = query.contains('game_genres.genre_id', [filters.genre]);
        }
        if (filters.search) {
            query = query.or(`title.ilike.%${filters.search}%,developer.ilike.%${filters.search}%`);
        }
        if (filters.isNew) {
            query = query.eq('is_new', true);
        }
        if (filters.isFeatured) {
            query = query.eq('is_featured', true);
        }
        if (filters.onSale) {
            query = query.gt('discount', 0);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        return { data, error };
    },

    // Obtener juego por ID
    async getGameById(id) {
        const { data, error } = await supabase
            .from('games')
            .select(`
                *,
                game_genres(genre_id, genres(name, slug)),
                game_platforms(platform_id, platforms(name))
            `)
            .eq('id', id)
            .single();
        return { data, error };
    },

    // Obtener juego por slug
    async getGameBySlug(slug) {
        const { data, error } = await supabase
            .from('games')
            .select(`
                *,
                game_genres(genre_id, genres(name, slug)),
                game_platforms(platform_id, platforms(name))
            `)
            .eq('slug', slug)
            .single();
        return { data, error };
    },

    // Obtener juegos destacados
    async getFeaturedGames() {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('is_featured', true)
            .limit(5);
        return { data, error };
    },

    // Obtener juegos nuevos
    async getNewGames() {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('is_new', true)
            .order('release_date', { ascending: false });
        return { data, error };
    },

    // Obtener juegos con descuento
    async getDiscountedGames() {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .gt('discount', 0);
        return { data, error };
    },

    // Buscar juegos
    async searchGames(query) {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .or(`title.ilike.%${query}%,developer.ilike.%${query}%,publisher.ilike.%${query}%`);
        return { data, error };
    },

    // Obtener todos los géneros
    async getGenres() {
        const { data, error } = await supabase
            .from('genres')
            .select('*')
            .order('name');
        return { data, error };
    }
};

// ============================================
// SERVICIO DE BIBLIOTECA
// ============================================
export const libraryService = {
    // Obtener biblioteca del usuario
    async getUserLibrary(userId) {
        const { data, error } = await supabase
            .from('library')
            .select('*, games(*)')
            .eq('user_id', userId);
        return { data, error };
    },

    // Verificar si tiene un juego
    async ownsGame(userId, gameId) {
        const { data, error } = await supabase
            .from('library')
            .select('id')
            .eq('user_id', userId)
            .eq('game_id', gameId)
            .single();
        return { data: !!data, error };
    },

    // Añadir juego a biblioteca
    async addToLibrary(userId, gameId) {
        const { data, error } = await supabase
            .from('library')
            .insert({ user_id: userId, game_id: gameId })
            .select()
            .single();
        return { data, error };
    },

    // Contar juegos del usuario
    async getGameCount(userId) {
        const { count, error } = await supabase
            .from('library')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);
        return { count, error };
    }
};

// ============================================
// SERVICIO DE WISHLIST
// ============================================
export const wishlistService = {
    // Obtener wishlist del usuario
    async getUserWishlist(userId) {
        const { data, error } = await supabase
            .from('wishlist')
            .select('*, games(*)')
            .eq('user_id', userId);
        return { data, error };
    },

    // Verificar si está en wishlist
    async isInWishlist(userId, gameId) {
        const { data, error } = await supabase
            .from('wishlist')
            .select('id')
            .eq('user_id', userId)
            .eq('game_id', gameId)
            .single();
        return { data: !!data, error };
    },

    // Añadir a wishlist
    async addToWishlist(userId, gameId) {
        const { data, error } = await supabase
            .from('wishlist')
            .insert({ user_id: userId, game_id: gameId })
            .select()
            .single();
        return { data, error };
    },

    // Eliminar de wishlist
    async removeFromWishlist(userId, gameId) {
        const { data, error } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', userId)
            .eq('game_id', gameId);
        return { data, error };
    }
};

// ============================================
// SERVICIO DE CARRITO
// ============================================
export const cartService = {
    // Obtener carrito del usuario
    async getUserCart(userId) {
        const { data, error } = await supabase
            .from('cart')
            .select('*, games(*)')
            .eq('user_id', userId);
        return { data, error };
    },

    // Verificar si está en el carrito
    async isInCart(userId, gameId) {
        const { data, error } = await supabase
            .from('cart')
            .select('id')
            .eq('user_id', userId)
            .eq('game_id', gameId)
            .single();
        return { data: !!data, error };
    },

    // Añadir al carrito
    async addToCart(userId, gameId) {
        const { data, error } = await supabase
            .from('cart')
            .insert({ user_id: userId, game_id: gameId })
            .select()
            .single();
        return { data, error };
    },

    // Eliminar del carrito
    async removeFromCart(userId, gameId) {
        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId)
            .eq('game_id', gameId);
        return { data, error };
    },

    // Vaciar carrito
    async clearCart(userId) {
        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId);
        return { data, error };
    },

    // Contar items
    async getCartCount(userId) {
        const { count, error } = await supabase
            .from('cart')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);
        return { count, error };
    }
};

// ============================================
// SERVICIO DE RESEÑAS
// ============================================
export const reviewsService = {
    // Obtener reseñas de un juego
    async getGameReviews(gameId) {
        const { data, error } = await supabase
            .from('reviews')
            .select('*, profiles(username, display_name, avatar_url)')
            .eq('game_id', gameId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Obtener reseña del usuario
    async getUserReview(userId, gameId) {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('user_id', userId)
            .eq('game_id', gameId)
            .single();
        return { data, error };
    },

    // Crear o actualizar reseña
    async upsertReview(userId, gameId, rating, comment) {
        const { data, error } = await supabase
            .from('reviews')
            .upsert({
                user_id: userId,
                game_id: gameId,
                rating,
                comment
            })
            .select()
            .single();
        return { data, error };
    },

    // Eliminar reseña
    async deleteReview(userId, gameId) {
        const { data, error } = await supabase
            .from('reviews')
            .delete()
            .eq('user_id', userId)
            .eq('game_id', gameId);
        return { data, error };
    },

    // Obtener media de rating de un juego
    async getAverageRating(gameId) {
        const { data, error } = await supabase
            .rpc('get_average_rating', { game_id_param: gameId });
        return { data, error };
    }
};

// ============================================
// SERVICIO DE CAMPEONATOS
// ============================================
export const tournamentsService = {
    // Obtener todos los torneos
    async getTournaments(status = null) {
        let query = supabase
            .from('tournaments')
            .select('*, games(title, cover_image)');

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query.order('start_date', { ascending: false });
        return { data, error };
    },

    // Obtener torneo por ID
    async getTournamentById(id) {
        const { data, error } = await supabase
            .from('tournaments')
            .select('*, games(title, cover_image)')
            .eq('id', id)
            .single();
        return { data, error };
    },

    // Obtener participantes de un torneo
    async getTournamentParticipants(tournamentId) {
        const { data, error } = await supabase
            .from('tournament_participants')
            .select('*, profiles(username, display_name, avatar_url)')
            .eq('tournament_id', tournamentId);
        return { data, error };
    },

    // Inscribirse en un torneo
    async joinTournament(userId, tournamentId) {
        const { data, error } = await supabase
            .from('tournament_participants')
            .insert({
                user_id: userId,
                tournament_id: tournamentId
            })
            .select()
            .single();
        return { data, error };
    },

    // Verificar si está inscrito
    async isRegistered(userId, tournamentId) {
        const { data, error } = await supabase
            .from('tournament_participants')
            .select('id')
            .eq('user_id', userId)
            .eq('tournament_id', tournamentId)
            .single();
        return { data: !!data, error };
    }
};

// ============================================
// SERVICIO DE CONCURSOS DIARIOS
// ============================================
export const contestsService = {
    // Obtener concurso actual
    async getCurrentContest() {
        const { data, error } = await supabase
            .from('daily_contests')
            .select('*, games(title, cover_image)')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        return { data, error };
    },

    // Obtener historial de concursos
    async getContestHistory() {
        const { data, error } = await supabase
            .from('daily_contests')
            .select('*, games(title), profiles(display_name, avatar_url)')
            .eq('status', 'finished')
            .order('end_date', { ascending: false })
            .limit(10);
        return { data, error };
    },

    // Comprar tickets
    async buyTickets(userId, contestId, quantity, totalPaid) {
        const { data, error } = await supabase
            .from('contest_tickets')
            .insert({
                user_id: userId,
                contest_id: contestId,
                quantity,
                total_paid: totalPaid
            })
            .select()
            .single();
        return { data, error };
    },

    // Obtener tickets del usuario
    async getUserTickets(userId, contestId) {
        const { data, error } = await supabase
            .from('contest_tickets')
            .select('quantity')
            .eq('user_id', userId)
            .eq('contest_id', contestId);
        
        const totalTickets = data?.reduce((sum, t) => sum + t.quantity, 0) || 0;
        return { totalTickets, error };
    },

    // Participar en concurso (enviar score)
    async submitScore(userId, contestId, score) {
        const { data, error } = await supabase
            .from('contest_participants')
            .upsert({
                user_id: userId,
                contest_id: contestId,
                score,
                submitted_at: new Date().toISOString()
            })
            .select()
            .single();
        return { data, error };
    },

    // Obtener participantes del concurso
    async getContestParticipants(contestId) {
        const { data, error } = await supabase
            .from('contest_tickets')
            .select('user_id, quantity, profiles(username, avatar_url)')
            .eq('contest_id', contestId);
        return { data, error };
    }
};

// ============================================
// SERVICIO DE AMIGOS
// ============================================
export const friendsService = {
    // Obtener amigos del usuario
    async getFriends(userId) {
        const { data, error } = await supabase
            .from('friends')
            .select(`
                id,
                status,
                profiles!friends_friend_id_fkey(id, username, display_name, avatar_url)
            `)
            .eq('user_id', userId)
            .eq('status', 'accepted');
        return { data, error };
    },

    // Enviar solicitud de amistad
    async sendFriendRequest(userId, friendId) {
        const { data, error } = await supabase
            .from('friends')
            .insert({
                user_id: userId,
                friend_id: friendId,
                status: 'pending'
            })
            .select()
            .single();
        return { data, error };
    },

    // Aceptar solicitud
    async acceptFriendRequest(requestId) {
        const { data, error } = await supabase
            .from('friends')
            .update({ status: 'accepted' })
            .eq('id', requestId)
            .select()
            .single();
        return { data, error };
    },

    // Eliminar amigo
    async removeFriend(userId, friendId) {
        const { data, error } = await supabase
            .from('friends')
            .delete()
            .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`);
        return { data, error };
    }
};

// ============================================
// SERVICIO DE LOGROS
// ============================================
export const achievementsService = {
    // Obtener todos los logros
    async getAllAchievements() {
        const { data, error } = await supabase
            .from('achievements')
            .select('*');
        return { data, error };
    },

    // Obtener logros del usuario
    async getUserAchievements(userId) {
        const { data, error } = await supabase
            .from('user_achievements')
            .select('*, achievements(*)')
            .eq('user_id', userId);
        return { data, error };
    },

    // Desbloquear logro
    async unlockAchievement(userId, achievementId) {
        const { data, error } = await supabase
            .from('user_achievements')
            .insert({
                user_id: userId,
                achievement_id: achievementId
            })
            .select()
            .single();
        return { data, error };
    },

    // Verificar si tiene un logro
    async hasAchievement(userId, achievementId) {
        const { data, error } = await supabase
            .from('user_achievements')
            .select('id')
            .eq('user_id', userId)
            .eq('achievement_id', achievementId)
            .single();
        return { data: !!data, error };
    }
};

// ============================================
// SERVICIO DE COMPRAS (sin pagos)
// ============================================
export const purchasesService = {
    // Crear compra (simulada sin pago real)
    async createPurchase(userId, items, totalAmount) {
        // 1. Crear registro de compra
        const { data: purchase, error: purchaseError } = await supabase
            .from('purchase_history')
            .insert({
                user_id: userId,
                total_amount: totalAmount,
                payment_method: 'wallet',
                payment_status: 'completed'
            })
            .select()
            .single();

        if (purchaseError) return { data: null, error: purchaseError };

        // 2. Añadir items a la compra
        const purchaseItems = items.map(item => ({
            purchase_id: purchase.id,
            game_id: item.gameId,
            price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('purchase_items')
            .insert(purchaseItems);

        if (itemsError) return { data: null, error: itemsError };

        // 3. Añadir juegos a la biblioteca
        for (const item of items) {
            await libraryService.addToLibrary(userId, item.gameId);
        }

        // 4. Descontar del wallet
        await profileService.updateWallet(userId, -totalAmount);

        return { data: purchase, error: null };
    },

    // Obtener historial de compras
    async getPurchaseHistory(userId) {
        const { data, error } = await supabase
            .from('purchase_history')
            .select('*, purchase_items(game_id, price, games(title, cover_image))')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    }
};

export default supabase;
