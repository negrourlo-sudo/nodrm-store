// ============================================
// NoDRM - JavaScript Principal (Supabase)
// ============================================

let currentUser = null;
let currentUserProfile = null;
let allGames = [];
let ownedGameIds = new Set();
let wishlistGameIds = new Set();

async function loadUserData() {
    if (!currentUser) { ownedGameIds.clear(); wishlistGameIds.clear(); return; }
    const [lib, wl] = await Promise.all([
        SupabaseApp.Library.getUserLibrary(currentUser.id),
        SupabaseApp.Wishlist.getUserWishlist(currentUser.id)
    ]);
    ownedGameIds = new Set((lib.data || []).map(i => i.game_id));
    wishlistGameIds = new Set((wl.data || []).map(i => i.game_id));
}

// ============================================
// AUTH MANAGER
// ============================================
const AuthManager = {
    getCurrentUser() {
        const u = localStorage.getItem('nodrm_currentUser');
        return u ? JSON.parse(u) : null;
    },

    setCurrentUser(user) {
        localStorage.setItem('nodrm_currentUser', JSON.stringify(user));
        currentUser = user;
    },

    async logout() {
        await SupabaseApp.Auth.signOut();
        localStorage.removeItem('nodrm_currentUser');
        currentUser = null;
        currentUserProfile = null;
        window.location.href = 'index.html';
    },

    updateUser(updates) {
        const user = this.getCurrentUser();
        if (user) {
            const updated = { ...user, ...updates };
            this.setCurrentUser(updated);
            return updated;
        }
        return null;
    }
};

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    currentUser = AuthManager.getCurrentUser();
    await loadUserData();
    initApp();
    updateHeaderAuth();
});

async function initApp() {
    const page = document.body.dataset.page;
    switch (page) {
        case 'novedades': await initNovedadesPage(); break;
        case 'catalogo': await initCatalogoPage(); break;
        case 'perfil': await initPerfilPage(); break;
        case 'configuracion': await initConfiguracionPage(); break;
    }
}

// ============================================
// HEADER AUTH
// ============================================
function updateHeaderAuth() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    const existing = nav.querySelector('.auth-nav');
    if (existing) return;

    const authLi = document.createElement('li');
    authLi.className = 'auth-nav';

    if (currentUser) {
        authLi.innerHTML = `
            <div class="user-menu">
                <button class="user-menu-btn" onclick="toggleUserMenu()">
                    <img src="${currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + currentUser.username}" alt="${currentUser.displayName}" class="user-avatar-small">
                    <span>${currentUser.displayName || currentUser.username}</span>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="perfil.html">Mi Perfil</a>
                    <a href="configuracion.html">Configuracion</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" onclick="AuthManager.logout(); return false;">Cerrar Sesion</a>
                </div>
            </div>
        `;
    } else {
        authLi.innerHTML = `<a href="login.html" class="btn btn-secondary" style="padding: 0.4rem 1rem;">Iniciar Sesion</a>`;
    }
    nav.appendChild(authLi);

    if (!document.getElementById('userMenuStyles')) {
        const s = document.createElement('style');
        s.id = 'userMenuStyles';
        s.textContent = `
            .user-menu { position: relative; }
            .user-menu-btn { display: flex; align-items: center; gap: 0.5rem; background: rgba(0,210,211,0.1); border: 1px solid var(--border); border-radius: 8px; padding: 0.4rem 0.8rem; color: var(--text-primary); cursor: pointer; transition: all 0.3s ease; }
            .user-menu-btn:hover { background: rgba(0,210,211,0.2); border-color: var(--primary); }
            .user-avatar-small { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }
            .user-dropdown { position: absolute; top: 100%; right: 0; margin-top: 0.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; min-width: 180px; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s ease; z-index: 1000; overflow: hidden; }
            .user-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); }
            .user-dropdown a { display: block; padding: 0.8rem 1rem; color: var(--text-primary); transition: background 0.3s ease; }
            .user-dropdown a:hover { background: rgba(0,210,211,0.1); }
            .dropdown-divider { height: 1px; background: var(--border); margin: 0.3rem 0; }
        `;
        document.head.appendChild(s);
    }
}

function toggleUserMenu() {
    const d = document.getElementById('userDropdown');
    d.classList.toggle('show');
    document.addEventListener('click', function close(e) {
        if (!e.target.closest('.user-menu')) { d.classList.remove('show'); document.removeEventListener('click', close); }
    });
}

// ============================================
// GLOBAL HELPERS
// ============================================
function formatPrice(price) { return `€${Number(price).toFixed(2)}`; }

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let s = '★'.repeat(full);
    if (half) s += '½';
    s += '☆'.repeat(5 - full - (half ? 1 : 0));
    return s;
}

function getDiscountedPrice(game) {
    if (!game) return 0;
    if (game.discount > 0) return game.price * (1 - game.discount / 100);
    return game.price;
}

function createGameCard(game) {
    const price = getDiscountedPrice(game);
    const isOwned = ownedGameIds.has(game.id);
    const inWishlist = wishlistGameIds.has(game.id);

    const genres = game.game_genres?.map(g => g.genres?.name).filter(Boolean) || [];
    const genreStr = genres[0] || '';

    return `
        <div class="game-card" data-game-id="${game.id}">
            <div class="game-image" style="background-image: url('${game.cover_image}')">${!game.cover_image ? '🎮' : ''}</div>
            <div class="game-info">
                <span class="game-genre">${genreStr}</span>
                <h3 class="game-title">${game.title}</h3>
                <div class="game-rating">
                    <span class="stars">${generateStars(game.rating || 0)}</span>
                    <span class="reviews">(${(game.reviews_count || 0).toLocaleString()})</span>
                </div>
                <div class="game-price">
                    <div>
                        ${game.discount > 0 ? `<span class="original-price">${formatPrice(game.price)}</span>` : ''}
                        <span class="price">${formatPrice(price)}</span>
                        ${game.discount > 0 ? `<span class="discount-badge">-${game.discount}%</span>` : ''}
                    </div>
                </div>
                <div class="game-actions">
                    ${isOwned
                        ? `<button class="btn btn-secondary" onclick="playGame(${game.id})">Jugar</button>`
                        : inWishlist
                            ? `<button class="btn btn-secondary" onclick="removeFromWishlist(${game.id})">En lista</button>`
                            : `<button class="btn btn-primary" onclick="addToCart(${game.id})">Comprar</button>`
                    }
                    <button class="btn-icon" onclick="toggleWishlist(${game.id})">${inWishlist ? '❤️' : '🤍'}</button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// CART & WISHLIST
// ============================================
async function addToCart(gameId) {
    if (!currentUser) {
        showNotification('Inicia sesion para comprar', 'info');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }
    const { data } = await SupabaseApp.Games.getById(gameId);
    const { error } = await SupabaseApp.Cart.add(currentUser.id, gameId);
    if (!error) {
        showNotification(`"${data.title}" anadido al carrito`, 'success');
        updateCartBadge();
    }
}

async function removeFromCart(gameId) {
    await SupabaseApp.Cart.remove(currentUser.id, gameId);
    showNotification('Eliminado del carrito', 'info');
    updateCartBadge();
}

async function toggleWishlist(gameId) {
    if (!currentUser) {
        showNotification('Inicia sesion para usar la lista de deseos', 'info');
        return;
    }
    const { data: exists } = await SupabaseApp.Wishlist.isInWishlist(currentUser.id, gameId);
    const { data: game } = await SupabaseApp.Games.getById(gameId);

    if (exists) {
        await SupabaseApp.Wishlist.remove(currentUser.id, gameId);
        wishlistGameIds.delete(gameId);
        showNotification(`"${game.title}" eliminado de tu lista`, 'info');
    } else {
        await SupabaseApp.Wishlist.add(currentUser.id, gameId);
        wishlistGameIds.add(gameId);
        showNotification(`"${game.title}" anadido a tu lista`, 'success');
    }

    if (document.body.dataset.page === 'catalogo') renderGames();
}

async function removeFromWishlist(gameId) {
    await SupabaseApp.Wishlist.remove(currentUser.id, gameId);
    wishlistGameIds.delete(gameId);
    showNotification('Eliminado de la lista', 'info');
    if (document.body.dataset.page === 'perfil') renderWishlist();
}

function playGame(gameId) {
    showNotification('Iniciando juego...', 'info');
}

async function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge && currentUser) {
        const { count } = await SupabaseApp.Cart.getCount(currentUser.id);
        badge.textContent = count || 0;
        badge.style.display = (count || 0) > 0 ? 'flex' : 'none';
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.innerHTML = `<span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span class="notification-message">${message}</span>`;
    document.body.appendChild(n);
    setTimeout(() => n.classList.add('show'), 10);
    setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 300); }, 3000);
}

// ============================================
// NOVEDADES
// ============================================
async function initNovedadesPage() {
    const grid = document.getElementById('novedades-grid');
    if (!grid) return;

    const { data: games } = await SupabaseApp.Games.getNew();
    if (!games || games.length === 0) {
        const { data: featured } = await SupabaseApp.Games.getFeatured();
        allGames = featured || [];
    } else {
        allGames = games;
    }

    grid.innerHTML = allGames.map(g => createGameCard(g)).join('');
}

// ============================================
// CATALOGO
// ============================================
let currentGenreFilter = 'all';
let searchQuery = '';

async function initCatalogoPage() {
    await renderFilters();
    await renderGames();
    setupSearch();
}

async function renderFilters() {
    const c = document.getElementById('filters');
    if (!c) return;

    const { data: genres } = await SupabaseApp.Games.getGenres();
    const genreNames = (genres || []).map(g => g.name);

    c.innerHTML = `<button class="filter-btn active" data-genre="all">Todos</button>${genreNames.map(g => `<button class="filter-btn" data-genre="${g}">${g}</button>`).join('')}`;
    c.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            c.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGenreFilter = btn.dataset.genre;
            renderGames();
        });
    });
}

async function renderGames() {
    const grid = document.getElementById('catalogo-grid');
    if (!grid) return;

    let games;
    if (searchQuery) {
        const { data } = await SupabaseApp.Games.search(searchQuery);
        games = data || [];
    } else {
        const { data } = await SupabaseApp.Games.getAll();
        games = data || [];
    }

    if (currentGenreFilter !== 'all') {
        games = games.filter(g => g.game_genres?.some(gg => gg.genres?.name === currentGenreFilter));
    }

    if (games.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No se encontraron juegos.</p></div>';
    } else {
        grid.innerHTML = games.map(g => createGameCard(g)).join('');
    }

    const counter = document.getElementById('games-count');
    if (counter) counter.textContent = `${games.length} juegos encontrados`;
}

function setupSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    let debounce;
    input.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => { searchQuery = e.target.value; renderGames(); }, 300);
    });
}

// ============================================
// PERFIL
// ============================================
async function initPerfilPage() {
    if (!currentUser) {
        showNotification('Inicia sesion para ver tu perfil', 'info');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    const { data: profile } = await SupabaseApp.Profiles.get(currentUser.id);
    currentUserProfile = profile;

    const p = profile || currentUser;
    renderProfileHeader(p);
    await renderUserStats(p);
    await renderOwnedGames();
    await renderWishlist();
    await renderPurchaseHistory();
    await renderAchievements();
    await renderGlobalLeaderboard();
}

function renderProfileHeader(p) {
    const h = document.getElementById('profile-header');
    if (!h) return;
    h.innerHTML = `
        <div class="avatar"><img src="${p.avatar_url || p.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (p.username || currentUser.username)}" alt="${p.display_name || p.displayName || currentUser.username}"></div>
        <div class="profile-info">
            <h2>${p.display_name || p.displayName || currentUser.username}</h2>
            <p class="username">@${p.username || currentUser.username}</p>
            <p class="bio">${p.bio || 'Sin biografia'}</p>
            <div class="profile-meta">
                <span>${p.location ? '📍 ' + p.location : ''}</span>
                <span>Miembro desde ${formatDate(p.created_at || p.createdAt || Date.now())}</span>
            </div>
        </div>
    `;
}

async function renderUserStats(p) {
    const c = document.getElementById('user-stats');
    if (!c) return;

    const { count: libCount } = await SupabaseApp.Library.getCount(currentUser.id);
    const { data: wlData } = await SupabaseApp.Wishlist.getUserWishlist(currentUser.id);
    const { data: friends } = await SupabaseApp.Friends.getFriends(currentUser.id);
    const { data: wallet } = await SupabaseApp.Profiles.getWallet(currentUser.id);

    c.innerHTML = `
        <div class="stat-card"><div class="stat-value">${libCount || 0}</div><div class="stat-label">Juegos</div></div>
        <div class="stat-card"><div class="stat-value">${(wlData || []).length}</div><div class="stat-label">Deseados</div></div>
        <div class="stat-card"><div class="stat-value">${(friends || []).length}</div><div class="stat-label">Amigos</div></div>
        <div class="stat-card"><div class="stat-value">${formatPrice(wallet?.wallet_balance || 0)}</div><div class="stat-label">Saldo</div></div>
    `;
}

async function renderOwnedGames() {
    const c = document.getElementById('owned-games');
    if (!c) return;
    const { data } = await SupabaseApp.Library.getUserLibrary(currentUser.id);
    const games = (data || []).map(i => i.games).filter(Boolean);
    if (games.length === 0) {
        c.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No tienes juegos aun. <a href="catalogo.html" style="color: var(--primary);">Explora el catalogo</a></p>';
    } else {
        c.innerHTML = games.map(g => createGameCard(g)).join('');
    }
}

async function renderWishlist() {
    const c = document.getElementById('wishlist-games');
    if (!c) return;
    const { data } = await SupabaseApp.Wishlist.getUserWishlist(currentUser.id);
    const games = (data || []).map(i => i.games).filter(Boolean);
    if (games.length === 0) {
        c.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Tu lista de deseos esta vacia.</p>';
    } else {
        c.innerHTML = games.map(g => createGameCard(g)).join('');
    }
}

async function renderPurchaseHistory() {
    const c = document.getElementById('purchase-history');
    if (!c) return;
    const { data } = await SupabaseApp.Purchases.getHistory(currentUser.id);
    if (!data || data.length === 0) {
        c.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Aun no has realizado ninguna compra.</p>';
    } else {
        c.innerHTML = data.map(p => `
            <div class="purchase-item">
                <div class="purchase-header">
                    <span class="purchase-id">${p.id.slice(0,8)}</span>
                    <span class="purchase-date">${formatDate(p.created_at)}</span>
                </div>
                <div class="purchase-games">${(p.purchase_items || []).map(i => `<span class="purchase-game">${i.games?.title || 'Juego'}</span>`).join(', ')}</div>
                <div class="purchase-footer">
                    <span class="purchase-total">${formatPrice(p.total_amount)}</span>
                    <span class="purchase-status status-completed">Completado</span>
                </div>
            </div>
        `).join('');
    }
}

async function renderAchievements() {
    const c = document.getElementById('achievements');
    if (!c) return;
    const { data } = await SupabaseApp.Achievements.getUserAchievements(currentUser.id);
    if (!data || data.length === 0) {
        c.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Aun no has desbloqueado logros.</p>';
    } else {
        c.innerHTML = data.map(a => `
            <div class="achievement-item">
                <span class="achievement-icon">${a.achievements?.icon || '🏆'}</span>
                <div class="achievement-info">
                    <h4>${a.achievements?.name || 'Logro'}</h4>
                    <span class="achievement-date">${formatDate(a.unlocked_at)}</span>
                </div>
            </div>
        `).join('');
    }
}

async function renderGlobalLeaderboard() {
    const c = document.getElementById('global-leaderboard');
    if (!c) return;
    const { data, error } = await SupabaseApp.Leaderboard.getGlobal();
    if (error || !data || data.length === 0) {
        c.innerHTML = '<div class="leaderboard-empty">No hay datos de leaderboard aun.</div>';
        return;
    }
    c.innerHTML = `
        <div class="leaderboard-header">
            <span>#</span>
            <span>Jugador</span>
            <span style="text-align:right">Puntos</span>
        </div>
        ${data.map((entry, i) => {
            const pos = i + 1;
            const p = entry.profiles;
            const name = p?.display_name || p?.username || 'Jugador';
            const username = p?.username || '';
            const avatar = p?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
            const topClass = pos <= 3 ? `top-${pos}` : '';
            return `
            <div class="leaderboard-entry ${topClass}">
                <div class="leaderboard-position">${pos}</div>
                <div class="leaderboard-player">
                    <img src="${avatar}" alt="${name}">
                    <div>
                        <div class="leaderboard-player-name">${name}</div>
                        <div class="leaderboard-player-username">@${username}</div>
                    </div>
                </div>
                <div class="leaderboard-score">${entry.total_points} pts</div>
            </div>
            `;
        }).join('')}
    `;
}

// ============================================
// CONFIGURACION
// ============================================
async function initConfiguracionPage() {
    if (!currentUser) {
        showNotification('Inicia sesion para acceder a la configuracion', 'info');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    const { data: profile } = await SupabaseApp.Profiles.get(currentUser.id);
    currentUserProfile = profile || {};

    renderAccountSettings(currentUserProfile);
    renderNotificationSettings(currentUserProfile);
    renderPrivacySettings(currentUserProfile);
    setupFormHandlers();
}

function renderAccountSettings(p) {
    const c = document.getElementById('account-settings');
    if (!c) return;
    c.innerHTML = `
        <div class="form-group"><label for="displayName">Nombre para mostrar</label><input type="text" id="displayName" value="${p.display_name || currentUser.displayName || ''}"></div>
        <div class="form-group"><label for="username">Nombre de usuario</label><input type="text" id="username" value="${p.username || currentUser.username || ''}"></div>
        <div class="form-group"><label for="email">Correo electronico</label><input type="email" id="email" value="${currentUser.email || ''}"></div>
        <div class="form-group"><label for="bio">Biografia</label><textarea id="bio" rows="3">${p.bio || ''}</textarea></div>
        <div class="form-group"><label for="location">Ubicacion</label><input type="text" id="location" value="${p.location || ''}"></div>
        <div class="form-group"><label for="website">Sitio web</label><input type="url" id="website" value="${p.website || ''}"></div>
    `;
}

function renderNotificationSettings(p) {
    const c = document.getElementById('notification-settings');
    if (!c) return;
    const saved = JSON.parse(localStorage.getItem('nodrm_settings') || '{}');
    const s = saved.notifications || {};
    c.innerHTML = `
        <div class="config-row"><div class="config-label"><h4>Notificaciones por email</h4><p>Recibe actualizaciones importantes</p></div><label class="toggle"><input type="checkbox" id="emailNotifications" ${s.email !== false ? 'checked' : ''}><span class="slider"></span></label></div>
        <div class="config-row"><div class="config-label"><h4>Notificaciones push</h4><p>Recibe notificaciones en tu navegador</p></div><label class="toggle"><input type="checkbox" id="pushNotifications" ${s.push !== false ? 'checked' : ''}><span class="slider"></span></label></div>
        <div class="config-row"><div class="config-label"><h4>Newsletter</h4><p>Recibe ofertas y novedades</p></div><label class="toggle"><input type="checkbox" id="newsletter" ${s.newsletter !== false ? 'checked' : ''}><span class="slider"></span></label></div>
    `;
}

function renderPrivacySettings(p) {
    const c = document.getElementById('privacy-settings');
    if (!c) return;
    const saved = JSON.parse(localStorage.getItem('nodrm_settings') || '{}');
    const s = saved.privacy || {};
    c.innerHTML = `
        <div class="config-row"><div class="config-label"><h4>Perfil publico</h4><p>Permite que otros vean tu perfil</p></div><label class="toggle"><input type="checkbox" id="profilePublic" ${s.profilePublic !== false ? 'checked' : ''}><span class="slider"></span></label></div>
        <div class="config-row"><div class="config-label"><h4>Mostrar estado en linea</h4><p>Permite que otros vean cuando estas conectado</p></div><label class="toggle"><input type="checkbox" id="showOnlineStatus" ${s.showOnline !== false ? 'checked' : ''}><span class="slider"></span></label></div>
    `;
}

function setupFormHandlers() {
    const saveBtn = document.getElementById('save-account');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const updates = {
                display_name: document.getElementById('displayName').value,
                username: document.getElementById('username').value,
                bio: document.getElementById('bio').value,
                location: document.getElementById('location').value,
                website: document.getElementById('website').value
            };
            await SupabaseApp.Profiles.update(currentUser.id, updates);
            AuthManager.updateUser({ displayName: updates.display_name, username: updates.username });
            showNotification('Configuracion guardada', 'success');
        });
    }

    const saveNotif = document.getElementById('save-notifications');
    if (saveNotif) {
        saveNotif.addEventListener('click', () => {
            const settings = JSON.parse(localStorage.getItem('nodrm_settings') || '{}');
            settings.notifications = {
                email: document.getElementById('emailNotifications')?.checked,
                push: document.getElementById('pushNotifications')?.checked,
                newsletter: document.getElementById('newsletter')?.checked
            };
            localStorage.setItem('nodrm_settings', JSON.stringify(settings));
            showNotification('Preferencias guardadas', 'success');
        });
    }

    const savePrivacy = document.getElementById('save-privacy');
    if (savePrivacy) {
        savePrivacy.addEventListener('click', () => {
            const settings = JSON.parse(localStorage.getItem('nodrm_settings') || '{}');
            settings.privacy = {
                profilePublic: document.getElementById('profilePublic')?.checked,
                showOnline: document.getElementById('showOnlineStatus')?.checked
            };
            localStorage.setItem('nodrm_settings', JSON.stringify(settings));
            showNotification('Privacidad guardada', 'success');
        });
    }
}

// ============================================
// NOTIFICATION STYLES
// ============================================
const ns = document.createElement('style');
ns.textContent = `
    .notification { position: fixed; bottom: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 10px; display: flex; align-items: center; gap: 0.8rem; transform: translateX(120%); transition: transform 0.3s ease; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
    .notification.show { transform: translateX(0); }
    .notification-success { background: linear-gradient(135deg, #00b894, #00a884); color: white; }
    .notification-error { background: linear-gradient(135deg, #ff7675, #d63031); color: white; }
    .notification-info { background: linear-gradient(135deg, #00d2d3, #01a3a4); color: white; }
    .notification-icon { font-size: 1.2rem; font-weight: bold; }
    .game-card .game-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
    .game-card .game-rating { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }
    .game-card .stars { color: #ffeaa7; }
    .game-card .reviews { color: var(--text-secondary); font-size: 0.85rem; }
    .btn-icon { background: transparent; border: none; font-size: 1.2rem; cursor: pointer; padding: 0.5rem; transition: transform 0.2s; }
    .btn-icon:hover { transform: scale(1.2); }
    .badge { background: var(--primary); color: white; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.75rem; }
    .no-results { grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary); }
    .purchase-item { background: var(--bg-dark); padding: 1rem; border-radius: 10px; margin-bottom: 0.5rem; }
    .purchase-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
    .purchase-id { font-weight: bold; color: var(--primary); }
    .purchase-date { color: var(--text-secondary); }
    .purchase-footer { display: flex; gap: 1rem; align-items: center; font-size: 0.9rem; }
    .purchase-total { font-weight: bold; color: var(--accent); }
    .status-completed { color: var(--success); }
    .achievement-item { display: flex; align-items: center; gap: 1rem; background: var(--bg-dark); padding: 1rem; border-radius: 10px; margin-bottom: 0.5rem; }
    .achievement-icon { font-size: 2rem; }
    .achievement-date { font-size: 0.8rem; color: var(--text-secondary); }
    .profile-meta { display: flex; gap: 1.5rem; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem; }
    .username { color: var(--accent); }
    .bio { color: var(--text-secondary); margin-top: 0.5rem; }
    .section-title { font-size: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.8rem; }
    .section-title::before { content: ''; width: 4px; height: 25px; background: var(--gradient-primary); border-radius: 2px; }
`;
document.head.appendChild(ns);
