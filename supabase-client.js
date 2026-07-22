// ============================================
// NoDRM - Supabase Client (Browser CDN)
// ============================================

const SUPABASE_URL = 'https://akljuohhadsnryikgufc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGp1b2hoYWRzbnJ5aWtndWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1MTM4NTMsImV4cCI6MjEwMDA4OTg1M30.PJ9eHt4JdgrpFDqMJC1disdy65ixPXHS9wDTMAr4ENQ';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: localStorage
    }
});

// ============================================
// AUTH
// ============================================
const Auth = {
    async signUp(email, password, userData) {
        const { data, error } = await sb.auth.signUp({
            email,
            password,
            options: { data: userData }
        });
        return { data, error };
    },

    async signIn(email, password) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        return { data, error };
    },

    async signOut() {
        const { error } = await sb.auth.signOut();
        if (!error) {
            localStorage.removeItem('nodrm_currentUser');
        }
        return { error };
    },

    async getUser() {
        const { data: { user }, error } = await sb.auth.getUser();
        return { user, error };
    },

    async getSession() {
        const { data: { session }, error } = await sb.auth.getSession();
        return { session, error };
    },

    onAuthStateChange(callback) {
        return sb.auth.onAuthStateChange(callback);
    },

    async resetPassword(email) {
        const { data, error } = await sb.auth.resetPasswordForEmail(email);
        return { data, error };
    },

    async updatePassword(newPassword) {
        const { data, error } = await sb.auth.updateUser({ password: newPassword });
        return { data, error };
    },

    async resendConfirmation(email) {
        const { data, error } = await sb.auth.resend({ type: 'signup', email });
        return { data, error };
    }
};

// ============================================
// PROFILES
// ============================================
const Profiles = {
    async get(userId) {
        const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
        return { data, error };
    },

    async getByUsername(username) {
        const { data, error } = await sb.from('profiles').select('*').eq('username', username).single();
        return { data, error };
    },

    async update(userId, updates) {
        const { data, error } = await sb.from('profiles').update(updates).eq('id', userId).select().single();
        return { data, error };
    },

    async getWallet(userId) {
        const { data, error } = await sb.from('profiles').select('wallet_balance, currency').eq('id', userId).single();
        return { data, error };
    }
};

// ============================================
// GAMES
// ============================================
const Games = {
    async getAll(filters = {}) {
        let query = sb.from('games').select('*, game_genres(genre_id, genres(name, slug)), game_platforms(platform_id, platforms(name))');
        if (filters.genre) query = query.contains('game_genres.genre_id', [filters.genre]);
        if (filters.search) query = query.or(`title.ilike.%${filters.search}%,developer.ilike.%${filters.search}%`);
        if (filters.isNew) query = query.eq('is_new', true);
        if (filters.isFeatured) query = query.eq('is_featured', true);
        if (filters.onSale) query = query.gt('discount', 0);
        const { data, error } = await query.order('created_at', { ascending: false });
        return { data, error };
    },

    async getById(id) {
        const { data, error } = await sb.from('games').select('*, game_genres(genre_id, genres(name, slug)), game_platforms(platform_id, platforms(name))').eq('id', id).single();
        return { data, error };
    },

    async getFeatured() {
        const { data, error } = await sb.from('games').select('*, game_genres(genre_id, genres(name, slug))').eq('is_featured', true).limit(5);
        return { data, error };
    },

    async getNew() {
        const { data, error } = await sb.from('games').select('*, game_genres(genre_id, genres(name, slug))').eq('is_new', true).order('release_date', { ascending: false });
        return { data, error };
    },

    async getDiscounted() {
        const { data, error } = await sb.from('games').select('*, game_genres(genre_id, genres(name, slug))').gt('discount', 0);
        return { data, error };
    },

    async search(query) {
        const { data, error } = await sb.from('games').select('*, game_genres(genre_id, genres(name, slug))').or(`title.ilike.%${query}%,developer.ilike.%${query}%`);
        return { data, error };
    },

    async getGenres() {
        const { data, error } = await sb.from('genres').select('*').order('name');
        return { data, error };
    },

    calculateDiscountedPrice(game) {
        if (!game) return 0;
        if (game.discount > 0) return game.price * (1 - game.discount / 100);
        return game.price;
    },

    async create(gameData) {
        const { data, error } = await sb.from('games').insert(gameData).select().single();
        return { data, error };
    },

    async addGenres(gameId, genreIds) {
        const rows = genreIds.map(gid => ({ game_id: gameId, genre_id: gid }));
        const { error } = await sb.from('game_genres').insert(rows);
        return { error };
    },

    async addPlatforms(gameId, platformIds) {
        const rows = platformIds.map(pid => ({ game_id: gameId, platform_id: pid }));
        const { error } = await sb.from('game_platforms').insert(rows);
        return { error };
    },

    async getBySeller(sellerId) {
        const { data, error } = await sb.from('games').select('*').eq('seller_id', sellerId).order('created_at', { ascending: false });
        return { data, error };
    },

    async getSellerRevenue(sellerId) {
        const { data, error } = await sb.from('purchase_items')
            .select('price, purchase_history!inner(user_id)')
            .in('game_id', (await sb.from('games').select('id').eq('seller_id', sellerId)).data?.map(g => g.id) || []);
        return { data, error };
    }
};

// ============================================
// LIBRARY
// ============================================
const Library = {
    async getUserLibrary(userId) {
        const { data, error } = await sb.from('library').select('*, games(*)').eq('user_id', userId);
        return { data, error };
    },

    async ownsGame(userId, gameId) {
        const { data, error } = await sb.from('library').select('id').eq('user_id', userId).eq('game_id', gameId).single();
        return { data: !!data, error };
    },

    async add(userId, gameId) {
        const { data, error } = await sb.from('library').insert({ user_id: userId, game_id: gameId }).select().single();
        return { data, error };
    },

    async getCount(userId) {
        const { count, error } = await sb.from('library').select('*', { count: 'exact', head: true }).eq('user_id', userId);
        return { count, error };
    }
};

// ============================================
// WISHLIST
// ============================================
const Wishlist = {
    async getUserWishlist(userId) {
        const { data, error } = await sb.from('wishlist').select('*, games(*)').eq('user_id', userId);
        return { data, error };
    },

    async isInWishlist(userId, gameId) {
        const { data, error } = await sb.from('wishlist').select('id').eq('user_id', userId).eq('game_id', gameId).single();
        return { data: !!data, error };
    },

    async add(userId, gameId) {
        const { data, error } = await sb.from('wishlist').insert({ user_id: userId, game_id: gameId }).select().single();
        return { data, error };
    },

    async remove(userId, gameId) {
        const { error } = await sb.from('wishlist').delete().eq('user_id', userId).eq('game_id', gameId);
        return { error };
    }
};

// ============================================
// CART
// ============================================
const Cart = {
    async getUserCart(userId) {
        const { data, error } = await sb.from('cart').select('*, games(*)').eq('user_id', userId);
        return { data, error };
    },

    async isInCart(userId, gameId) {
        const { data, error } = await sb.from('cart').select('id').eq('user_id', userId).eq('game_id', gameId).single();
        return { data: !!data, error };
    },

    async add(userId, gameId) {
        const { data, error } = await sb.from('cart').insert({ user_id: userId, game_id: gameId }).select().single();
        return { data, error };
    },

    async remove(userId, gameId) {
        const { error } = await sb.from('cart').delete().eq('user_id', userId).eq('game_id', gameId);
        return { error };
    },

    async clear(userId) {
        const { error } = await sb.from('cart').delete().eq('user_id', userId);
        return { error };
    },

    async getCount(userId) {
        const { count, error } = await sb.from('cart').select('*', { count: 'exact', head: true }).eq('user_id', userId);
        return { count, error };
    }
};

// ============================================
// REVIEWS
// ============================================
const Reviews = {
    async getGameReviews(gameId) {
        const { data, error } = await sb.from('reviews').select('*, profiles(username, display_name, avatar_url)').eq('game_id', gameId).order('created_at', { ascending: false });
        return { data, error };
    },

    async getUserReview(userId, gameId) {
        const { data, error } = await sb.from('reviews').select('*').eq('user_id', userId).eq('game_id', gameId).single();
        return { data, error };
    },

    async upsert(userId, gameId, rating, comment) {
        const { data, error } = await sb.from('reviews').upsert({ user_id: userId, game_id: gameId, rating, comment }).select().single();
        return { data, error };
    },

    async delete(userId, gameId) {
        const { error } = await sb.from('reviews').delete().eq('user_id', userId).eq('game_id', gameId);
        return { error };
    }
};

// ============================================
// TOURNAMENTS
// ============================================
const Tournaments = {
    async getAll(status = null) {
        let query = sb.from('tournaments').select('*, games(title, cover_image)');
        if (status) query = query.eq('status', status);
        const { data, error } = await query.order('start_date', { ascending: false });
        return { data, error };
    },

    async getById(id) {
        const { data, error } = await sb.from('tournaments').select('*, games(title, cover_image)').eq('id', id).single();
        return { data, error };
    },

    async getParticipants(tournamentId) {
        const { data, error } = await sb.from('tournament_participants').select('*, profiles(username, display_name, avatar_url)').eq('tournament_id', tournamentId);
        return { data, error };
    },

    async join(userId, tournamentId) {
        const { data, error } = await sb.from('tournament_participants').insert({ user_id: userId, tournament_id: tournamentId }).select().single();
        return { data, error };
    },

    async isRegistered(userId, tournamentId) {
        const { data, error } = await sb.from('tournament_participants').select('id').eq('user_id', userId).eq('tournament_id', tournamentId).single();
        return { data: !!data, error };
    }
};

// ============================================
// CONTESTS
// ============================================
const Contests = {
    async getCurrent() {
        const { data, error } = await sb.from('daily_contests').select('*, games(title, cover_image)').eq('status', 'active').order('created_at', { ascending: false }).limit(1).single();
        return { data, error };
    },

    async getHistory() {
        const { data, error } = await sb.from('daily_contests').select('*, games(title), profiles(display_name, avatar_url)').eq('status', 'finished').order('end_date', { ascending: false }).limit(10);
        return { data, error };
    },

    async buyTickets(userId, contestId, quantity, totalPaid) {
        const { data, error } = await sb.from('contest_tickets').insert({ user_id: userId, contest_id: contestId, quantity, total_paid: totalPaid }).select().single();
        return { data, error };
    },

    async getUserTickets(userId, contestId) {
        const { data, error } = await sb.from('contest_tickets').select('quantity').eq('user_id', userId).eq('contest_id', contestId);
        const totalTickets = data?.reduce((sum, t) => sum + t.quantity, 0) || 0;
        return { totalTickets, error };
    },

    async submitScore(userId, contestId, score) {
        const { data, error } = await sb.from('contest_participants').upsert({ user_id: userId, contest_id: contestId, score, submitted_at: new Date().toISOString() }).select().single();
        return { data, error };
    }
};

// ============================================
// FRIENDS
// ============================================
const Friends = {
    async getFriends(userId) {
        const { data, error } = await sb.from('friends').select('id, status, profiles!friends_friend_id_fkey(id, username, display_name, avatar_url)').eq('user_id', userId).eq('status', 'accepted');
        return { data, error };
    },

    async sendRequest(userId, friendId) {
        const { data, error } = await sb.from('friends').insert({ user_id: userId, friend_id: friendId, status: 'pending' }).select().single();
        return { data, error };
    },

    async acceptRequest(requestId) {
        const { data, error } = await sb.from('friends').update({ status: 'accepted' }).eq('id', requestId).select().single();
        return { data, error };
    },

    async remove(userId, friendId) {
        const { error } = await sb.from('friends').delete().or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`);
        return { error };
    }
};

// ============================================
// ACHIEVEMENTS
// ============================================
const Achievements = {
    async getAll() {
        const { data, error } = await sb.from('achievements').select('*');
        return { data, error };
    },

    async getUserAchievements(userId) {
        const { data, error } = await sb.from('user_achievements').select('*, achievements(*)').eq('user_id', userId);
        return { data, error };
    },

    async unlock(userId, achievementId) {
        const { data, error } = await sb.from('user_achievements').insert({ user_id: userId, achievement_id: achievementId }).select().single();
        return { data, error };
    }
};

// ============================================
// PURCHASES
// ============================================
const Purchases = {
    async create(userId, items, totalAmount) {
        const { data: purchase, error: e1 } = await sb.from('purchase_history').insert({ user_id: userId, total_amount: totalAmount, payment_method: 'wallet', payment_status: 'completed' }).select().single();
        if (e1) return { data: null, error: e1 };

        const purchaseItems = items.map(i => ({ purchase_id: purchase.id, game_id: i.gameId, price: i.price }));
        const { error: e2 } = await sb.from('purchase_items').insert(purchaseItems);
        if (e2) return { data: null, error: e2 };

        for (const item of items) {
            await Library.add(userId, item.gameId);

            const { data: game } = await sb.from('games').select('seller_id').eq('id', item.gameId).single();
            if (game?.seller_id && game.seller_id !== userId) {
                const { data: buyer } = await sb.from('profiles').select('wallet_balance').eq('id', userId).single();
                const { data: seller } = await sb.from('profiles').select('wallet_balance').eq('id', game.seller_id).single();
                if (buyer && seller) {
                    await sb.from('profiles').update({ wallet_balance: Number(buyer.wallet_balance) - Number(item.price) }).eq('id', userId);
                    await sb.from('profiles').update({ wallet_balance: Number(seller.wallet_balance) + Number(item.price) }).eq('id', game.seller_id);
                }
            }
        }

        return { data: purchase, error: null };
    },

    async getHistory(userId) {
        const { data, error } = await sb.from('purchase_history').select('*, purchase_items(game_id, price, games(title, cover_image))').eq('user_id', userId).order('created_at', { ascending: false });
        return { data, error };
    }
};

// ============================================
// LEADERBOARD
// ============================================
const Leaderboard = {
    async getGlobal() {
        const { data: games, error: ge } = await sb.from('games').select('id, seller_id');
        if (ge || !games || games.length === 0) return { data: [], error: ge };

        const sellerIds = [...new Set(games.map(g => g.seller_id).filter(Boolean))];
        if (sellerIds.length === 0) return { data: [], error: null };

        const { data: sellers, error: se } = await sb.from('profiles').select('id, username, display_name, avatar_url').in('id', sellerIds);
        if (se) return { data: [], error: se };

        const results = [];
        for (const seller of (sellers || [])) {
            const sellerGames = games.filter(g => g.seller_id === seller.id);
            const { count } = await sb.from('purchase_items').select('*', { count: 'exact', head: true }).in('game_id', sellerGames.map(g => g.id));
            const { count: gameCount } = await sb.from('games').select('*', { count: 'exact', head: true }).eq('seller_id', seller.id);
            results.push({
                ...seller,
                total_sales: count || 0,
                total_games: gameCount || 0
            });
        }

        results.sort((a, b) => b.total_sales - a.total_sales);
        return { data: results.slice(0, 20), error: null };
    },

    async getByContest(contestId) {
        const { data, error } = await sb.from('contest_participants')
            .select('score, user_id, profiles(id, username, display_name, avatar_url)')
            .eq('contest_id', contestId)
            .order('score', { ascending: false })
            .limit(20);
        return { data, error };
    }
};

// ============================================
// STORAGE
// ============================================
const Storage = {
    async uploadCover(userId, file) {
        const path = `${userId}/${Date.now()}.jpg`;
        const { data, error } = await sb.storage.from('game-covers').upload(path, file, {
            contentType: 'image/jpeg',
            upsert: true,
            cacheControl: '3600'
        });
        if (error) return { data: null, error };
        const { data: urlData } = sb.storage.from('game-covers').getPublicUrl(path);
        return { data: { path, url: urlData.publicUrl }, error: null };
    },

    getCoverUrl(path) {
        if (!path) return null;
        const { data } = sb.storage.from('game-covers').getPublicUrl(path);
        return data?.publicUrl || null;
    }
};

// ============================================
// GLOBAL APP OBJECT
// ============================================
const SupabaseApp = { sb, Auth, Profiles, Games, Library, Wishlist, Cart, Reviews, Tournaments, Contests, Leaderboard, Friends, Achievements, Purchases, Storage };
