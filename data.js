// ============================================
// BASE DE DATOS MOCK - GameZone
// Similar a GOG.com
// ============================================

const DB = {
    // Usuario actual logueado
    currentUser: {
        id: 1,
        username: "GamerPro2026",
        displayName: "Carlos García",
        email: "carlos.garcia@email.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        bio: "Amante de los RPG y los juegos indie. Jugando desde los 90s.",
        location: "Madrid, España",
        website: "https://carlosgaming.blog",
        joinDate: "2023-05-15",
        lastOnline: new Date().toISOString(),
        
        // Wallet / Cartera
        wallet: {
            balance: 45.99,
            currency: "EUR",
            paymentMethods: [
                {
                    id: 1,
                    type: "credit_card",
                    last4: "4242",
                    brand: "Visa",
                    expiry: "12/27",
                    isDefault: true
                },
                {
                    id: 2,
                    type: "paypal",
                    email: "carlos.garcia@email.com",
                    isDefault: false
                }
            ]
        },
        
        // Configuraciones
        settings: {
            language: "es",
            notifications: {
                email: true,
                push: true,
                newsletter: true,
                gameUpdates: true,
                friendActivity: false,
                sales: true
            },
            privacy: {
                profilePublic: true,
                showOnlineStatus: true,
                showGameLibrary: true,
                showWishlist: true
            },
            downloads: {
                autoUpdate: true,
                cloudSaves: true,
                bandwidthLimit: "unlimited"
            },
            twoFactorEnabled: false
        },
        
        // Juegos comprados
        ownedGames: [1, 2, 3, 5, 8, 12, 15, 20],
        
        // Lista de deseos
        wishlist: [4, 7, 10, 18, 25],
        
        // Carrito
        cart: [],
        
        // Logros
        achievements: [
            { id: 1, name: "Primer Compra", description: "Realiza tu primera compra", unlockedAt: "2023-05-15", icon: "🛒" },
            { id: 2, name: "Coleccionista", description: "Ten 10 juegos en tu biblioteca", unlockedAt: "2024-01-20", icon: "📚" },
            { id: 3, name: "Ahorrador", description: "Ahorra más de 100€ en ofertas", unlockedAt: "2024-06-10", icon: "💰" },
            { id: 4, name: "Explorador", description: "Juega 5 géneros diferentes", unlockedAt: "2025-02-15", icon: "🎮" }
        ],
        
        // Estadísticas de juego
        gameStats: {
            totalPlaytime: 2847, // horas
            gamesPlayed: 8,
            achievementsUnlocked: 47,
            totalSpent: 324.50,
            averageRating: 4.2
        },
        
        // Historial de compras
        purchaseHistory: [
            {
                id: "ORD-2026-001",
                date: "2026-01-10",
                items: [
                    { gameId: 25, price: 39.99 },
                    { gameId: 26, price: 24.99 }
                ],
                total: 64.98,
                status: "completed",
                paymentMethod: "Visa •••• 4242"
            },
            {
                id: "ORD-2025-089",
                date: "2025-12-20",
                items: [
                    { gameId: 20, price: 59.99 }
                ],
                total: 59.99,
                status: "completed",
                paymentMethod: "PayPal"
            },
            {
                id: "ORD-2025-067",
                date: "2025-11-05",
                items: [
                    { gameId: 15, price: 29.99 },
                    { gameId: 12, price: 19.99 }
                ],
                total: 49.98,
                status: "completed",
                paymentMethod: "Visa •••• 4242"
            }
        ],
        
        // Reseñas escritas
        reviews: [
            { gameId: 1, rating: 5, comment: "Obra maestra absoluta. Los gráficos son impresionantes.", date: "2025-08-15" },
            { gameId: 3, rating: 4, comment: "Muy buen juego, aunque la historia es algo predecible.", date: "2025-06-20" },
            { gameId: 8, rating: 5, comment: "El mejor RPG del año. Miles de horas de contenido.", date: "2025-03-10" }
        ],
        
        // Amigos
        friends: [
            { id: 2, username: "NightOwl92", displayName: "Ana Martínez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", online: true, lastSeen: "Ahora mismo" },
            { id: 3, username: "ProGamer_ES", displayName: "Pedro López", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro", online: false, lastSeen: "Hace 2 horas" },
            { id: 4, username: "RetroKing", displayName: "Miguel Sánchez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel", online: true, lastSeen: "Ahora mismo" },
            { id: 5, username: "IndieFan", displayName: "Laura Ruiz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", online: false, lastSeen: "Ayer" }
        ],
        
        // Recomendaciones basadas en historial
        recommendations: [4, 7, 16, 22]
    },

    // ============================================
    // CATÁLOGO DE JUEGOS
    // ============================================
    games: [
        {
            id: 1,
            title: "Cyberpunk 2077",
            slug: "cyberpunk-2077",
            description: "Un RPG de mundo abierto ambientado en el futuro distópico de Night City. Conviértete en un mercenario buscándose la vida en una metrópolis obsesionada con el poder y las modificaciones corporales.",
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            releaseDate: "2020-12-10",
            genres: ["RPG", "Acción", "Mundo Abierto"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.5,
            reviewsCount: 12500,
            price: 59.99,
            originalPrice: 59.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
            screenshots: [],
            systemRequirements: {
                minimum: {
                    os: "Windows 10 64-bit",
                    processor: "Intel Core i5-3570K / AMD FX-8310",
                    memory: "8 GB RAM",
                    graphics: "NVIDIA GeForce GTX 780 / AMD Radeon RX 470",
                    storage: "70 GB"
                },
                recommended: {
                    os: "Windows 10 64-bit",
                    processor: "Intel Core i7-4790 / AMD Ryzen 3 3200G",
                    memory: "16 GB RAM",
                    graphics: "NVIDIA GeForce GTX 1060 / AMD Radeon R9 380",
                    storage: "70 GB SSD"
                }
            },
            features: ["Single-player", "Steam Achievements", "Steam Trading Cards", "Cloud Saves"],
            languageSupport: ["Español", "Inglés", "Francés", "Alemán"],
            ageRating: "18+",
            isNew: false,
            isFeatured: true,
            tags: ["Cyberpunk", "Futurista", "Narrativo"]
        },
        {
            id: 2,
            title: "The Witcher 3: Wild Hunt",
            slug: "the-witcher-3",
            description: "Juega como Geralt de Rivia, un cazador de monstruros profesional, en un RPG de mundo abierto épico. Embárcate en una búsqueda épica para encontrar a tu hija adoptiva.",
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            releaseDate: "2015-05-19",
            genres: ["RPG", "Acción", "Mundo Abierto"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X", "Switch"],
            rating: 4.9,
            reviewsCount: 25000,
            price: 39.99,
            originalPrice: 39.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Steam Trading Cards", "Cloud Saves", "DLC Available"],
            languageSupport: ["Español", "Inglés", "Polaco"],
            ageRating: "18+",
            isNew: false,
            isFeatured: true,
            tags: ["Fantasía", "Épico", "Historia Rica"]
        },
        {
            id: 3,
            title: "Elden Ring",
            slug: "elden-ring",
            description: "Un RPG de acción de mundo abierto creado por FromSoftware y George R.R. Martin. Explora las Tierras Intermedias en busca del Anillo Elden.",
            developer: "FromSoftware",
            publisher: "Bandai Namco",
            releaseDate: "2022-02-25",
            genres: ["RPG", "Acción", "Souls-like"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 4.8,
            reviewsCount: 18000,
            price: 59.99,
            originalPrice: 59.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Steam Achievements", "Co-op"],
            languageSupport: ["Español", "Inglés", "Japonés"],
            ageRating: "16+",
            isNew: false,
            isFeatured: true,
            tags: ["Souls-like", "Desafiante", "Mundo Abierto"]
        },
        {
            id: 4,
            title: "GTA VI",
            slug: "gta-vi",
            description: "La próxima entrega de la serie Grand Theft Auto. Regresa a Vice City en esta épica aventura de mundo abierto.",
            developer: "Rockstar Games",
            publisher: "Rockstar Games",
            releaseDate: "2026-09-17",
            genres: ["Acción", "Mundo Abierto", "Aventura"],
            platforms: ["PS5", "Xbox Series X", "PC"],
            rating: 0,
            reviewsCount: 0,
            price: 79.99,
            originalPrice: 79.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Online"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: true,
            isFeatured: true,
            tags: ["Mundo Abierto", "Acción", "期待大作"]
        },
        {
            id: 5,
            title: "Baldur's Gate 3",
            slug: "baldurs-gate-3",
            description: "Un RPG épico basado en Dungeons & Dragons. Lidera un grupo de aventureros en una historia de traición y redención.",
            developer: "Larian Studios",
            publisher: "Larian Studios",
            releaseDate: "2023-08-03",
            genres: ["RPG", "Estrategia", "Fantasía"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.9,
            reviewsCount: 21000,
            price: 59.99,
            originalPrice: 59.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Co-op", "Steam Achievements"],
            languageSupport: ["Español", "Inglés", "Francés"],
            ageRating: "16+",
            isNew: false,
            isFeatured: true,
            tags: ["D&D", "Estrategia", "Narrativo"]
        },
        {
            id: 6,
            title: "Starfield",
            slug: "starfield",
            description: "El primer universo nuevo de Bethesda en 25 años. Un RPG espacial épico con cientos de planetas por explorar.",
            developer: "Bethesda Game Studios",
            publisher: "Bethesda Softworks",
            releaseDate: "2023-09-06",
            genres: ["RPG", "Ciencia Ficción", "Mundo Abierto"],
            platforms: ["PC", "Xbox Series X"],
            rating: 3.8,
            reviewsCount: 8500,
            price: 69.99,
            originalPrice: 69.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "16+",
            isNew: false,
            isFeatured: false,
            tags: ["Espacio", "Exploración", "Sci-Fi"]
        },
        {
            id: 7,
            title: "The Legend of Zelda: Tears of the Kingdom",
            slug: "zelda-totk",
            description: "Continuación de Breath of the Wild. Link explora Hyrule y las Islas Celestiales con nuevos poderes.",
            developer: "Nintendo",
            publisher: "Nintendo",
            releaseDate: "2023-05-12",
            genres: ["Aventura", "Acción", "Mundo Abierto"],
            platforms: ["Switch"],
            rating: 4.9,
            reviewsCount: 22000,
            price: 69.99,
            originalPrice: 69.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player"],
            languageSupport: ["Español", "Inglés", "Japonés"],
            ageRating: "7+",
            isNew: false,
            isFeatured: true,
            tags: ["Nintendo", "Aventura", "Exploración"]
        },
        {
            id: 8,
            title: "Red Dead Redemption 2",
            slug: "rdr2",
            description: "Vive el final de la era del salvaje oeste como Arthur Morgan en esta épica historia de supervivencia.",
            developer: "Rockstar Games",
            publisher: "Rockstar Games",
            releaseDate: "2018-10-26",
            genres: ["Acción", "Aventura", "Mundo Abierto"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 4.9,
            reviewsCount: 30000,
            price: 29.99,
            originalPrice: 59.99,
            discount: 50,
            coverImage: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Western", "Épico", "Narrativo"]
        },
        {
            id: 9,
            title: "Cyberpunk 2077: Phantom Liberty",
            slug: "cyberpunk-phantom-liberty",
            description: "La expansión definitiva de Cyberpunk 2077. Una nueva región, una nueva historia y nuevas mecánicas.",
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            releaseDate: "2023-09-26",
            genres: ["RPG", "Acción", "Expansion"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.6,
            reviewsCount: 5000,
            price: 29.99,
            originalPrice: 29.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "DLC"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["DLC", "Cyberpunk", "Expansión"]
        },
        {
            id: 10,
            title: "Hollow Knight: Silksong",
            slug: "hollow-knight-silksong",
            description: "La esperada secuela de Hollow Knight. Explora un nuevo reino como Hornet.",
            developer: "Team Cherry",
            publisher: "Team Cherry",
            releaseDate: "2025-06-15",
            genres: ["Metroidvania", "Acción", "Indie"],
            platforms: ["PC", "Switch", "PS5", "Xbox Series X"],
            rating: 4.8,
            reviewsCount: 3200,
            price: 24.99,
            originalPrice: 24.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "7+",
            isNew: true,
            isFeatured: false,
            tags: ["Indie", "Metroidvania", "Plataformas"]
        },
        {
            id: 11,
            title: "God of War Ragnarök",
            slug: "god-of-war-ragnarok",
            description: "Kratos y Atreus se enfrentan a los dioses nórdicos en esta épica aventura.",
            developer: "Santa Monica Studio",
            publisher: "Sony Interactive Entertainment",
            releaseDate: "2022-11-09",
            genres: ["Acción", "Aventura", "Mitología"],
            platforms: ["PS4", "PS5", "PC"],
            rating: 4.8,
            reviewsCount: 15000,
            price: 49.99,
            originalPrice: 69.99,
            discount: 28,
            coverImage: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés", "Nórdico"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Mitología", "Acción", "Épico"]
        },
        {
            id: 12,
            title: "Hades II",
            slug: "hades-2",
            description: "La continuación del aclamado roguelike. Emprenda un viaje oscuro a través del inframundo.",
            developer: "Supergiant Games",
            publisher: "Supergiant Games",
            releaseDate: "2025-09-25",
            genres: ["Roguelike", "Acción", "Indie"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.7,
            reviewsCount: 4500,
            price: 24.99,
            originalPrice: 24.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Early Access"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "12+",
            isNew: true,
            isFeatured: false,
            tags: ["Roguelike", "Indie", "Mitología"]
        },
        {
            id: 13,
            title: "Call of Duty: Modern Warfare III",
            slug: "cod-mw3",
            description: "La última entrega de la icónica saga de shooter en primera persona.",
            developer: "Sledgehammer Games",
            publisher: "Activision",
            releaseDate: "2023-11-10",
            genres: ["FPS", "Acción", "Multijugador"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 3.5,
            reviewsCount: 9000,
            price: 69.99,
            originalPrice: 69.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Battle Royale", "Steam Achievements"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["FPS", "Multijugador", "Competitivo"]
        },
        {
            id: 14,
            title: "Resident Evil 4 Remake",
            slug: "re4-remake",
            description: "El remake del clásico de survival horror. Acompaña a Leon Kennedy en su misión de rescate.",
            developer: "Capcom",
            publisher: "Capcom",
            releaseDate: "2023-03-24",
            genres: ["Survival Horror", "Acción", "Aventura"],
            platforms: ["PC", "PS4", "PS5", "Xbox Series X"],
            rating: 4.7,
            reviewsCount: 12000,
            price: 39.99,
            originalPrice: 59.99,
            discount: 33,
            coverImage: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés", "Japonés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Horror", "Remake", "Clásico"]
        },
        {
            id: 15,
            title: "Stardew Valley",
            slug: "stardew-valley",
            description: "Crea tu granja, haz amigos, atrappecos y descubre secretos en este RPG de simulación agrícola.",
            developer: "ConcernedApe",
            publisher: "ConcernedApe",
            releaseDate: "2016-02-26",
            genres: ["Simulación", "RPG", "Indie"],
            platforms: ["PC", "PS4", "Switch", "Xbox One"],
            rating: 4.8,
            reviewsCount: 20000,
            price: 14.99,
            originalPrice: 14.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "7+",
            isNew: false,
            isFeatured: false,
            tags: ["Relax", "Indie", "Simulación"]
        },
        {
            id: 16,
            title: "Persona 5 Royal",
            slug: "persona-5-royal",
            description: "La versión definitiva del aclamado JRPG. Únete a los Phantom Thieves en Tokio.",
            developer: "Atlus",
            publisher: "Sega",
            releaseDate: "2022-10-21",
            genres: ["JRPG", "Aventura", "Simulación Social"],
            platforms: ["PC", "PS4", "PS5", "Switch", "Xbox Series X"],
            rating: 4.9,
            reviewsCount: 11000,
            price: 59.99,
            originalPrice: 59.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés", "Japonés"],
            ageRating: "16+",
            isNew: false,
            isFeatured: false,
            tags: ["JRPG", "Anime", "Historia"]
        },
        {
            id: 17,
            title: "Forza Horizon 5",
            slug: "forza-horizon-5",
            description: "El festival de carreras definitivo ambientado en México. Cientos de coches y paisajes espectaculares.",
            developer: "Playground Games",
            publisher: "Xbox Game Studios",
            releaseDate: "2021-11-09",
            genres: ["Carreras", "Simulación", "Mundo Abierto"],
            platforms: ["PC", "Xbox One", "Xbox Series X"],
            rating: 4.7,
            reviewsCount: 14000,
            price: 29.99,
            originalPrice: 59.99,
            discount: 50,
            coverImage: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Steam Achievements", "Cross-platform"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "3+",
            isNew: false,
            isFeatured: false,
            tags: ["Carreras", "Open World", "Competitivo"]
        },
        {
            id: 18,
            title: "Final Fantasy XVI",
            slug: "ff16",
            description: "La próxima entrega de la icónica saga de RPGs. Una historia épica de venganza y destino.",
            developer: "Square Enix",
            publisher: "Square Enix",
            releaseDate: "2025-12-05",
            genres: ["JRPG", "Acción", "Fantasía"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.6,
            reviewsCount: 6500,
            price: 69.99,
            originalPrice: 69.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés", "Japonés"],
            ageRating: "16+",
            isNew: true,
            isFeatured: false,
            tags: ["Final Fantasy", "Fantasía", "Acción"]
        },
        {
            id: 19,
            title: "Minecraft",
            slug: "minecraft",
            description: "El juego de sandbox definitivo. Construye, explora y sobrevive en un mundo infinito de bloques.",
            developer: "Mojang",
            publisher: "Microsoft",
            releaseDate: "2011-11-18",
            genres: ["Sandbox", "Supervivencia", "Creativo"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X", "Switch", "Móvil"],
            rating: 4.8,
            reviewsCount: 50000,
            price: 29.99,
            originalPrice: 29.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1587573578883-e3ee12250e14?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Cross-platform", "Mods"],
            languageSupport: ["Español", "Inglés", "Todos los idiomas"],
            ageRating: "7+",
            isNew: false,
            isFeatured: false,
            tags: ["Sandbox", "Creativo", "Multijugador"]
        },
        {
            id: 20,
            title: "Diablo IV",
            slug: "diablo-4",
            description: "El aclamado action RPG de Blizzard. Explora Sanctuary y enfrenta a Lilith.",
            developer: "Blizzard Entertainment",
            publisher: "Blizzard Entertainment",
            releaseDate: "2023-06-06",
            genres: ["Action RPG", "Hack and Slash", "Online"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 4.3,
            reviewsCount: 16000,
            price: 49.99,
            originalPrice: 69.99,
            discount: 28,
            coverImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Multiplayer", "Online", "Steam Achievements"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: true,
            tags: ["Diablo", "Hack and Slash", "Online"]
        },
        {
            id: 21,
            title: "Celeste",
            slug: "celeste",
            description: "Un platformer pixel art con una historia emotiva. Ayuda a Madeline a escalar el Monte Celeste.",
            developer: "Maddy Makes Games",
            publisher: "Maddy Makes Games",
            releaseDate: "2018-01-25",
            genres: ["Plataformas", "Indie", "Pixel Art"],
            platforms: ["PC", "PS4", "Switch", "Xbox One"],
            rating: 4.9,
            reviewsCount: 8000,
            price: 4.99,
            originalPrice: 19.99,
            discount: 75,
            coverImage: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Speedrun Timer"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "7+",
            isNew: false,
            isFeatured: false,
            tags: ["Indie", "Plataformas", "Pixel Art"]
        },
        {
            id: 22,
            title: "Star Wars Jedi: Survivor",
            slug: "jedi-survivor",
            description: "Continuación de Fallen Order. Cal Kestis se enfrenta a nuevas amenazas en su viaje como Jedi.",
            developer: "Respawn Entertainment",
            publisher: "Electronic Arts",
            releaseDate: "2023-04-28",
            genres: ["Acción", "Aventura", "Souls-like"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.4,
            reviewsCount: 7500,
            price: 39.99,
            originalPrice: 69.99,
            discount: 42,
            coverImage: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "12+",
            isNew: false,
            isFeatured: false,
            tags: ["Star Wars", "Acción", "Aventura"]
        },
        {
            id: 23,
            title: "Hogwarts Legacy",
            slug: "hogwarts-legacy",
            description: "Vive tu propia aventura en el mundo mágico de Harry Potter. Asiste a Hogwarts en el siglo XIX.",
            developer: "Avalanche Software",
            publisher: "Warner Bros. Interactive",
            releaseDate: "2023-02-10",
            genres: ["RPG", "Aventura", "Mundo Abierto"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 4.6,
            reviewsCount: 19000,
            price: 49.99,
            originalPrice: 69.99,
            discount: 28,
            coverImage: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "12+",
            isNew: false,
            isFeatured: false,
            tags: ["Harry Potter", "Fantasía", "Mundo Abierto"]
        },
        {
            id: 24,
            title: "Undertale",
            slug: "undertale",
            description: "Un RPG donde nadie tiene que morir. Conoce personajes memorables en este viaje subterráneo.",
            developer: "Toby Fox",
            publisher: "Toby Fox",
            releaseDate: "2015-09-15",
            genres: ["RPG", "Indie", "Pixel Art"],
            platforms: ["PC", "PS4", "Switch"],
            rating: 4.9,
            reviewsCount: 22000,
            price: 9.99,
            originalPrice: 9.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Steam Trading Cards"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "7+",
            isNew: false,
            isFeatured: false,
            tags: ["Indie", "RPG", "Pixel Art"]
        },
        {
            id: 25,
            title: "Assassin's Creed Mirage",
            slug: "ac-mirage",
            description: "Regresa a las raíces de la saga. Embárcate en una aventura como Basim en el Baghdad del siglo IX.",
            developer: "Ubisoft Bordeaux",
            publisher: "Ubisoft",
            releaseDate: "2023-10-05",
            genres: ["Acción", "Aventura", "Sigilo"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 4.1,
            reviewsCount: 8500,
            price: 39.99,
            originalPrice: 49.99,
            discount: 20,
            coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés", "Árabe"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Assassin's Creed", "Historia", "Sigilo"]
        },
        {
            id: 26,
            title: "Lies of P",
            slug: "lies-of-p",
            description: "Un soulslike ambientado en el mundo de Pinocho. Explora la ciudad de Krat.",
            developer: "Neowiz Games",
            publisher: "Round8 Studio",
            releaseDate: "2023-09-19",
            genres: ["Souls-like", "Acción", "RPG"],
            platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X"],
            rating: 4.4,
            reviewsCount: 5000,
            price: 49.99,
            originalPrice: 49.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés", "Coreano"],
            ageRating: "16+",
            isNew: false,
            isFeatured: false,
            tags: ["Souls-like", "Pinocho", "Acción"]
        },
        {
            id: 27,
            title: "The Last of Us Part I",
            slug: "tlou-part1",
            description: "El remake del aclamado survival horror. Sigue a Joel y Ellie en su viaje por un Estados Unidos post-apocalíptico.",
            developer: "Naughty Dog",
            publisher: "Sony Interactive Entertainment",
            releaseDate: "2022-09-02",
            genres: ["Survival Horror", "Acción", "Aventura"],
            platforms: ["PS5", "PC"],
            rating: 4.8,
            reviewsCount: 10000,
            price: 39.99,
            originalPrice: 69.99,
            discount: 42,
            coverImage: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Horror", "Post-Apocalíptico", "Narrativo"]
        },
        {
            id: 28,
            title: "Alan Wake 2",
            slug: "alan-wake-2",
            description: "La continuación del thriller psicológico. Alan Wake y Saga Anderson investigan asesinatos en Bright Falls.",
            developer: "Remedy Entertainment",
            publisher: "Epic Games Publishing",
            releaseDate: "2023-10-27",
            genres: ["Survival Horror", "Thriller", "Aventura"],
            platforms: ["PC", "PS5", "Xbox Series X"],
            rating: 4.5,
            reviewsCount: 6000,
            price: 59.99,
            originalPrice: 59.99,
            discount: 0,
            coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Horror", "Thriller", "Misterio"]
        },
        {
            id: 29,
            title: "Sekiro: Shadows Die Twice",
            slug: "sekiro",
            description: "Un action-adventure ambientado en el Japón feudal. Domina el arte del shinobi.",
            developer: "FromSoftware",
            publisher: "Activision",
            releaseDate: "2019-03-22",
            genres: ["Acción", "Aventura", "Souls-like"],
            platforms: ["PC", "PS4", "Xbox One"],
            rating: 4.8,
            reviewsCount: 14000,
            price: 29.99,
            originalPrice: 59.99,
            discount: 50,
            coverImage: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements"],
            languageSupport: ["Español", "Inglés", "Japonés"],
            ageRating: "18+",
            isNew: false,
            isFeatured: false,
            tags: ["Souls-like", "Japón", "Shinobi"]
        },
        {
            id: 30,
            title: "Ori and the Will of the Wisps",
            slug: "ori-will-of-the-wisps",
            description: "Continuación del aclamado Metroidvania. Ayuda a Ori a descubrir su destino en un mundo mágico.",
            developer: "Moon Studios",
            publisher: "Xbox Game Studios",
            releaseDate: "2020-03-11",
            genres: ["Metroidvania", "Plataformas", "Indie"],
            platforms: ["PC", "Xbox One", "Xbox Series X", "Switch"],
            rating: 4.9,
            reviewsCount: 9000,
            price: 19.99,
            originalPrice: 29.99,
            discount: 33,
            coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
            screenshots: [],
            features: ["Single-player", "Steam Achievements", "Cloud Saves"],
            languageSupport: ["Español", "Inglés"],
            ageRating: "7+",
            isNew: false,
            isFeatured: false,
            tags: ["Indie", "Metroidvania", "Hermoso"]
        }
    ],

    // ============================================
    // OFERTAS Y PROMOCIONES
    // ============================================
    sales: [
        {
            id: 1,
            name: "Summer Sale 2026",
            description: "¡Grandes descuentos en juegos selectos!",
            discountPercent: 50,
            startDate: "2026-06-01",
            endDate: "2026-07-15",
            gamesIds: [8, 17, 21, 29, 30]
        },
        {
            id: 2,
            name: "Indie Spotlight",
            description: "Descubre joyas indie con descuentos especiales",
            discountPercent: 40,
            startDate: "2026-06-15",
            endDate: "2026-07-31",
            gamesIds: [10, 12, 21, 24, 30]
        }
    ],

    // ============================================
    // RESEÑAS DE OTROS USUARIOS
    // ============================================
    userReviews: [
        { userId: 2, gameId: 1, rating: 5, comment: "¡Una obra maestra! Los gráficos son increíbles.", date: "2025-08-10" },
        { userId: 3, gameId: 1, rating: 4, comment: "Buen juego, pero tuvo un lanzamiento problemático.", date: "2025-07-22" },
        { userId: 4, gameId: 2, rating: 5, comment: "El mejor RPG que he jugado jamás.", date: "2025-09-05" },
        { userId: 5, gameId: 3, rating: 5, comment: "Difícil pero muy satisfactorio.", date: "2025-06-18" },
        { userId: 2, gameId: 5, rating: 5, comment: "Inmersión total durante 100 horas.", date: "2025-10-12" },
        { userId: 3, gameId: 8, rating: 5, comment: "Una historia épica que no olvidaré.", date: "2025-11-01" }
    ],

    // ============================================
    // FUNCIONES AUXILIARES
    // ============================================
    
    // Obtener juego por ID
    getGameById(id) {
        return this.games.find(game => game.id === id);
    },

    // Obtener juegos por género
    getGamesByGenre(genre) {
        return this.games.filter(game => game.genres.includes(genre));
    },

    // Obtener juegos con descuento
    getDiscountedGames() {
        return this.games.filter(game => game.discount > 0);
    },

    // Obtener novedades (últimos 30 días o próximos)
    getNewGames() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        return this.games.filter(game => {
            const releaseDate = new Date(game.releaseDate);
            return releaseDate >= thirtyDaysAgo || game.isNew;
        });
    },

    // Obtener juegos destacados
    getFeaturedGames() {
        return this.games.filter(game => game.isFeatured);
    },

    // Obtener todos los géneros únicos
    getAllGenres() {
        const genres = new Set();
        this.games.forEach(game => game.genres.forEach(genre => genres.add(genre)));
        return Array.from(genres).sort();
    },

    // Buscar juegos
    searchGames(query) {
        const lowerQuery = query.toLowerCase();
        return this.games.filter(game => 
            game.title.toLowerCase().includes(lowerQuery) ||
            game.developer.toLowerCase().includes(lowerQuery) ||
            game.genres.some(genre => genre.toLowerCase().includes(lowerQuery)) ||
            game.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    },

    // Calcular precio con descuento
    calculateDiscountedPrice(gameId) {
        const game = this.getGameById(gameId);
        if (!game) return 0;
        
        if (game.discount > 0) {
            return game.price * (1 - game.discount / 100);
        }
        return game.price;
    },

    // Obtener reseñas de un juego
    getGameReviews(gameId) {
        const reviews = this.userReviews.filter(r => r.gameId === gameId);
        const userReview = this.currentUser.reviews.find(r => r.gameId === gameId);
        if (userReview) reviews.unshift({ ...userReview, userId: this.currentUser.id });
        return reviews;
    },

    // Calcular media de ratings
    getAverageRating(gameId) {
        const reviews = this.userReviews.filter(r => r.gameId === gameId);
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    },

    // Obtener usuario de prueba
    getUserById(id) {
        if (id === this.currentUser.id) return this.currentUser;
        return this.currentUser.friends.find(f => f.id === id);
    },

    // Verificar si un juego está en la biblioteca del usuario
    isGameOwned(gameId) {
        return this.currentUser.ownedGames.includes(gameId);
    },

    // Verificar si un juego está en la lista de deseos
    isGameInWishlist(gameId) {
        return this.currentUser.wishlist.includes(gameId);
    },

    // ============================================
    // CAMPEONATOS / TORNEOS
    // ============================================
    tournaments: [
        {
            id: 1,
            title: "NoDRM Championship #1",
            game: "Elden Ring",
            gameId: 3,
            description: "El primer campeonato oficial de NoDRM. Demuestra que eres el mejor en las Tierras Intermedias.",
            format: "Eliminación Directa",
            maxParticipants: 64,
            currentParticipants: 48,
            prizePool: 500,
            prizeCurrency: "€",
            prizes: [
                { position: 1, amount: 250, title: "Campeón" },
                { position: 2, amount: 150, title: "Subcampeón" },
                { position: 3, amount: 100, title: "Tercer Puesto" }
            ],
            startDate: "2026-07-20T18:00:00",
            endDate: "2026-07-25T23:59:59",
            status: "upcoming",
            rules: [
                "Sin modificaciones",
                "New Game+ permitido",
                "Speedrun o casual, tu decides",
                "Screenshots como prueba"
            ],
            participants: [
                { id: 1, username: "GamerPro2026", displayName: "Carlos García", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", seed: 1 },
                { id: 2, username: "NightOwl92", displayName: "Ana Martínez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", seed: 2 },
                { id: 3, username: "ProGamer_ES", displayName: "Pedro López", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro", seed: 3 },
                { id: 4, username: "RetroKing", displayName: "Miguel Sánchez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel", seed: 4 }
            ],
            brackets: [
                { round: "Octavos", matches: [
                    { p1: 1, p2: 8, score1: 3, score2: 1 },
                    { p1: 4, p2: 5, score1: 3, score2: 2 },
                    { p1: 3, p2: 6, score1: 3, score2: 0 },
                    { p1: 2, p2: 7, score1: 3, score2: 2 }
                ]},
                { round: "Cuartos", matches: [
                    { p1: 1, p2: 4, score1: 3, score2: 2 },
                    { p1: 3, p2: 2, score1: 1, score2: 3 }
                ]},
                { round: "Semifinal", matches: [
                    { p1: 1, p2: 2, score1: null, score2: null }
                ]}
            ],
            isRegistered: true
        },
        {
            id: 2,
            title: "Speedrun Challenge",
            game: "Celeste",
            gameId: 21,
            description: "Compite por el mejor tiempo en completar Celeste. Cada segundo cuenta.",
            format: "Speedrun",
            maxParticipants: 100,
            currentParticipants: 73,
            prizePool: 300,
            prizeCurrency: "€",
            prizes: [
                { position: 1, amount: 150, title: "Speed King" },
                { position: 2, amount: 100, title: "Velocista" },
                { position: 3, amount: 50, title: "Rápido" }
            ],
            startDate: "2026-07-18T12:00:00",
            endDate: "2026-07-22T23:59:59",
            status: "active",
            rules: [
                "Categoría: Any%",
                "Video obligatorio",
                "Sin assists",
                "Timing oficial del juego"
            ],
            participants: [
                { id: 1, username: "GamerPro2026", displayName: "Carlos García", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", bestTime: "1:42:33" },
                { id: 5, username: "IndieFan", displayName: "Laura Ruiz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", bestTime: "1:38:21" }
            ],
            leaderboard: [
                { position: 1, username: "SpeedDemon", displayName: "Álvaro García", time: "1:32:45" },
                { position: 2, username: "IndieFan", displayName: "Laura Ruiz", time: "1:38:21" },
                { position: 3, username: "GamerPro2026", displayName: "Carlos García", time: "1:42:33" },
                { position: 4, username: "PixelMaster", displayName: "Juan Díaz", time: "1:45:12" },
                { position: 5, username: "RetroGamer", displayName: "María López", time: "1:48:56" }
            ],
            isRegistered: true
        },
        {
            id: 3,
            title: "FPS Masters Tournament",
            game: "Call of Duty: MW3",
            gameId: 13,
            description: "Torneo de habilidad pura en los modos multijugador de COD.",
            format: "Best of 5",
            maxParticipants: 32,
            currentParticipants: 32,
            prizePool: 750,
            prizeCurrency: "€",
            prizes: [
                { position: 1, amount: 400, title: "MVP" },
                { position: 2, amount: 200, title: "Runner Up" },
                { position: 3, amount: 150, title: "Top 3" }
            ],
            startDate: "2026-07-15T20:00:00",
            endDate: "2026-07-19T23:59:59",
            status: "active",
            rules: [
                "Modo Search & Destroy",
                "Equipos de 4",
                "Sin killstreaks",
                "Mapas oficiales"
            ],
            participants: [],
            brackets: [],
            isRegistered: false
        },
        {
            id: 4,
            title: "RPG Legends Cup",
            game: "Baldur's Gate 3",
            gameId: 5,
            description: "Crea el personaje más build y demuestra tu dominio del sistema D&D.",
            format: "Build Challenge",
            maxParticipants: 50,
            currentParticipants: 21,
            prizePool: 400,
            prizeCurrency: "€",
            prizes: [
                { position: 1, amount: 200, title: "Maestro Builds" },
                { position: 2, amount: 120, title: "Estratega" },
                { position: 3, amount: 80, title: "Táctico" }
            ],
            startDate: "2026-07-25T16:00:00",
            endDate: "2026-07-30T23:59:59",
            status: "upcoming",
            rules: [
                "Nivel 12 máximo",
                "Multijugador cooperativo",
                "Evaluación por build y ejecución",
                "Screenshots y video"
            ],
            participants: [],
            isRegistered: false
        }
    ],

    // ============================================
    // CONCURSOS DIARIOS
    // ============================================
    dailyContests: {
        current: {
            id: 1,
            game: "Hollow Knight: Silksong",
            gameId: 10,
            challenge: "Speedrun: Completa el Primer Pináculo",
            description: "El jugador más rápido en completar el Primer Pináculo gana el premio.",
            prize: 50,
            prizeCurrency: "€",
            ticketPrice: 2,
            totalTicketsSold: 234,
            userTickets: 3,
            startDate: "2026-07-14T00:00:00",
            endDate: "2026-07-14T23:59:59",
            status: "active",
            participants: [
                { id: 1, username: "GamerPro2026", tickets: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" },
                { id: 2, username: "NightOwl92", tickets: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana" },
                { id: 3, username: "IndieFan", tickets: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura" },
                { id: 4, username: "ProGamer_ES", tickets: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro" }
            ],
            winner: null,
            timeRemaining: "14:32:18"
        },
        history: [
            {
                id: 2,
                game: "Celeste",
                gameId: 21,
                challenge: "Más fresas en 10 minutos",
                prize: 30,
                winner: { username: "IndieFan", displayName: "Laura Ruiz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura" },
                winningScore: 847,
                date: "2026-07-13",
                totalParticipants: 189
            },
            {
                id: 3,
                game: "Stardew Valley",
                gameId: 15,
                challenge: "Mayor ingreso en un día de juego",
                prize: 25,
                winner: { username: "FarmerPro", displayName: "Elena Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
                winningScore: 15750,
                date: "2026-07-12",
                totalParticipants: 256
            },
            {
                id: 4,
                game: "Sekiro",
                gameId: 29,
                challenge: "Derrotar a Isshin sin golpes",
                prize: 100,
                winner: { username: "SekiroMaster", displayName: "Pablo Martín", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pablo" },
                winningScore: 1,
                date: "2026-07-11",
                totalParticipants: 42
            },
            {
                id: 5,
                game: "Undertale",
                gameId: 24,
                challenge: "Neutral Route sin morir",
                prize: 40,
                winner: { username: "RetroKing", displayName: "Miguel Sánchez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel" },
                winningScore: 1,
                date: "2026-07-10",
                totalParticipants: 127
            }
        ],
        upcoming: [
            {
                game: "Hades II",
                gameId: 12,
                challenge: "Más kills en la Arena del Cráneo",
                ticketPrice: 3,
                prize: 75,
                date: "2026-07-15"
            },
            {
                game: "Resident Evil 4 Remake",
                gameId: 14,
                challenge: "Speedrun Capítulo 1",
                ticketPrice: 2,
                prize: 40,
                date: "2026-07-16"
            },
            {
                game: "Hollow Knight",
                gameId: 10,
                challenge: "100% Completion más rápido",
                ticketPrice: 5,
                prize: 150,
                date: "2026-07-17"
            }
        ]
    },

    // ============================================
    // FUNCIONES PARA TORNEOS
    // ============================================
    getTournamentById(id) {
        return this.tournaments.find(t => t.id === id);
    },

    getActiveTournaments() {
        return this.tournaments.filter(t => t.status === 'active');
    },

    getUpcomingTournaments() {
        return this.tournaments.filter(t => t.status === 'upcoming');
    },

    getDailyContest() {
        return this.dailyContests.current;
    },

    getContestHistory() {
        return this.dailyContests.history;
    },

    getUpcomingContests() {
        return this.dailyContests.upcoming;
    }
};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DB;
}
