# NoDRM - Diagrama de Gantt del Proyecto

## 📋 Resumen del Proyecto
**Plataforma de venta de videojuegos DRM-free**
**Duración estimada:** 12 semanas (60 días laborables)
**Equipo:** 1-2 desarrolladores

---

## 🗓️ CRONOGRAMA DETALLADO

```
FASE 1: DISEÑO Y PLANEAMIENTO (Semana 1-2)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 1      │ Sem 2      │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Wireframes y Mockups           │ ██████████ │            │ -
User Stories                   │ ████████   │            │ -
Arquitectura del Sistema       │      ██████│████        │ Wireframes
Definición de API              │            │ ██████████ │ Arquitectura
Diseño de BD (ER Diagram)      │            │ ████████   │ Arquitectura
Selección Tech Stack           │      ████  │            │ -
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 2: FRONTEND - ESTRUCTURA BASE (Semana 3-4)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 3      │ Sem 4      │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Setup Proyecto React/Next.js   │ ██████     │            │ Tech Stack
Sistema de Diseño (Design Sys) │ ██████████ │            │ Mockups
Componentes Base (Button, etc) │      ██████│████        │ Design Sys
Layout y Navegación            │      █████ │            │ Setup
Página: Landing/Home           │      ██████│████        │ Layout
Página: Catálogo               │            │ ██████████ │ Layout
Página: Detalle Juego          │            │ ████████   │ Layout
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 3: FRONTEND - PÁGINAS COMPLETAS (Semana 5-6)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 5      │ Sem 6      │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Página: Login/Registro         │ ██████████ │            │ Componentes
Página: Perfil de Usuario      │ ████████   │            │ Login
Página: Configuración          │      ██████│            │ Login
Página: Carrito de Compras     │      ██████│████        │ Catálogo
Página: Checkout               │            │ ██████████ │ Carrito
Página: Biblioteca de Juegos   │            │ ████████   │ Checkout
Integración Auth (Frontend)    │      ██████│████        │ Login
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 4: FRONTEND - FUNCIONALIDADES AVANZADAS (Semana 7-8)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 7      │ Sem 8      │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Página: Campeonatos            │ ██████████ │            │ Layout
Página: Concursos Diarios      │ ████████   │            │ Layout
Sistema de Tickets             │      ██████│████        │ Concursos
Bracket de Torneos             │      █████ │            │ Campeonatos
Leaderboards                   │      █████ │            │ Campeonatos
Búsqueda y Filtros Avanzados   │      ██████│████        │ Catálogo
Sistema de Reseñas             │            │ ██████████ │ Detalle Juego
Wishlist / Lista de Deseos     │            │ ████████   │ Perfil
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 5: BACKEND - ESTRUCTURA BASE (Semana 9-10)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 9      │ Sem 10     │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Setup Backend (Node/Express)   │ ██████     │            │ Arquitectura
Configuración BD (PostgreSQL)  │ ████████   │            │ Diseño BD
Modelos de Datos (Prisma/SQL)  │      ██████│████        │ Config BD
Sistema de Autenticación       │      ██████│████████   │ Modelos
JWT + Refresh Tokens           │            │ ████████   │ Auth
Middleware de Seguridad        │            │ ██████     │ Auth
Migraciones de BD              │            │      ██████│ Modelos
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 6: BACKEND - APIs PRINCIPALES (Semana 11-12)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 11     │ Sem 12     │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
API: Usuarios (CRUD)           │ ████████   │            │ Auth
API: Juegos (CRUD)             │ ██████████ │            │ Modelos
API: Categorías/Géneros        │      ██████│            │ API Juegos
API: Compras/Pagos             │      ██████│████████   │ API Usuarios
API: Reseñas                   │            │ ████████   │ API Juegos
API: Campeonatos               │            │ ██████████ │ Modelos
API: Concursos/Tickets         │            │ ████████   │ API Usuarios
Webhooks (Stripe/PayPal)       │            │      ██████│ API Compras
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 7: INTEGRACIÓN Y TEST (Semana 13-14)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 13     │ Sem 14     │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Integración Frontend-Backend   │ ██████████ │████████   │ APIs
API Testing (Postman/Jest)     │ ████████   │            │ APIs
Tests de Integración           │      ██████│████        │ Integración
Tests E2E (Cypress/Playwright) │      █████ │            │ Integración
Corrección de Bugs             │            │ ██████████ │ Tests
Optimización de Rendimiento    │            │ ████████   │ Tests
═══════════════════════════════╧════════════╧════════════╧══════════════

FASE 8: DEPLOYMENT Y LANZAMIENTO (Semana 15-16)
═══════════════════════════════════════════════════════════════════════════════
Tarea                          │ Sem 15     │ Sem 16     │ Dependencia
───────────────────────────────┼────────────┼────────────┼────────────
Configuración Servidor         │ ████████   │            │ -
Deploy Backend (Railway/Render)│ ██████████ │            │ Config
Deploy Frontend (Vercel/Netli) │      ██████│            │ Config
Configurar Dominio SSL         │      ██████│████        │ Deploy
Monitoreo y Logs               │            │ ████████   │ Deploy
Documentación API              │            │ ██████████ │ Deploy
Beta Testing                   │            │ ████████   │ Todo
Lanzamiento v1.0               │            │      ██████│ Beta
═══════════════════════════════╧════════════╧════════════╧══════════════
```

---

## 📊 DIAGRAMA DE GANTT VISUAL

```
SEMANA:        1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
              ─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────
FASE 1        ████████████████
Diseño              │    │    │    │    │    │    │    │    │    │    │    │    │    │    │

FASE 2                       ████████████████
Frontend Base                      │    │    │    │    │    │    │    │    │    │    │    │

FASE 3                                      ████████████████
Frontend Páginas                                │    │    │    │    │    │    │    │    │

FASE 4                                                 ████████████████
Frontend Avanzado                                           │    │    │    │    │    │

FASE 5                                                            ████████████████
Backend Base                                                           │    │    │    │

FASE 6                                                                       ████████████████
Backend APIs                                                                       │    │

FASE 7                                                                                    ████████████████
Testing                                                                                         │    │

FASE 8                                                                                               ████████████████
Deploy                                                                                                     │
              ─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────
SEMANA:        1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
```

---

## 📈 HITOS PRINCIPALES

| Semana | Hito | Entregable |
|--------|------|------------|
| 2 | Diseño Completo | Wireframes, BD, API Design |
| 4 | Frontend Base | Layout, Navegación, Home |
| 6 | Páginas Core | Auth, Perfil, Carrito |
| 8 | Features | Torneos, Concursos |
| 10 | Backend Ready | Auth, DB, Modelos |
| 12 | APIs Completas | Todas las endpoints |
| 14 | Testing | 80% coverage |
| 16 | **LANZAMIENTO** | v1.0 en producción |

---

## 🛠️ TECH STACK RECOMENDADO

### Frontend
```
├── Framework: Next.js 14 (App Router)
├── UI: Tailwind CSS + shadcn/ui
├── State: Zustand
├── Forms: React Hook Form + Zod
├── HTTP: Axios
└── Auth: NextAuth.js
```

### Backend
```
├── Runtime: Node.js
├── Framework: Express.js / Fastify
├── ORM: Prisma
├── DB: PostgreSQL (Supabase)
├── Auth: JWT + bcrypt
├── Payments: Stripe
└── Storage: AWS S3 / Cloudflare R2
```

### DevOps
```
├── Frontend: Vercel
├── Backend: Railway / Render
├── DB: Supabase (PostgreSQL)
├── Monitoring: Sentry
└── CI/CD: GitHub Actions
```

---

## 📋 DESGLOSE POR MÓDULOS

### MÓDULO 1: Autenticación (5 días)
```
Día 1-2: Frontend
├── Formulario Login
├── Formulario Registro
├── Validación de formularios
└── Manejo de errores

Día 3-4: Backend
├── Endpoint registro
├── Endpoint login
├── JWT generation
└── Password hashing

Día 5: Integración
├── Protected routes
├── Token refresh
└── Session management
```

### MÓDULO 2: Catálogo de Juegos (4 días)
```
Día 1: Frontend
├── Grid de juegos
├── Cards con hover effects
└── Filtros por género

Día 2: Búsqueda
├── Search bar
├── Filtros avanzados
└── Ordenación

Día 3: Backend
├── GET /api/games
├── GET /api/games/:id
├── Filtros y paginación
└── Búsqueda full-text

Día 4: Integración
├── Conectar frontend
├── Lazy loading
└── Caché de imágenes
```

### MÓDULO 3: Carrito y Compras (5 días)
```
Día 1-2: Carrito
├── Añadir/eliminar items
├── Persistencia (localStorage)
├── Cálculo de totales
└── UI del carrito

Día 3: Checkout
├── Formulario de envío
├── Resumen de compra
└── Selección de pago

Día 4-5: Backend + Pagos
├── Endpoint crear compra
├── Integración Stripe
├── Webhook confirmation
└── Generación de licencia
```

### MÓDULO 4: Campeonatos (4 días)
```
Día 1: UI Torneos
├── Lista de torneos
├── Detalle de torneo
└── Formulario inscripción

Día 2: Bracket
├── Visualización bracket
├── Actualización en vivo
└── Resultados

Día 3: Backend
├── CRUD Torneos
├── Inscripciones
└── Gestión brackets

Día 4: Leaderboards
├── Rankings
├── Estadísticas
└── Historial
```

### MÓDULO 5: Concursos Diarios (3 días)
```
Día 1: Sistema Tickets
├── UI de compra
├── Cálculo probabilidades
└── Timer regresivo

Día 2: Backend
├── Gestión tickets
├── Selección ganador
└── Historial

Día 3: Integración
├── Notificaciones
├── Actualización diaria
└── Pagos de premios
```

---

## ⚠️ DEPENDENCIAS CRÍTICAS

```
Wireframes ──────────┬──────────────────────────────┐
                     ▼                              │
               Diseño BD ──────────────────┐        │
                     │                     │        │
                     ▼                     ▼        │
              Auth System ────────► APIs Principales │
                     │                     │        │
                     ▼                     ▼        │
              Frontend Auth ────► Integración ◄─────┘
                                     │
                                     ▼
                              Testing Final
                                     │
                                     ▼
                              DEPLOYMENT
```

---

## 📦 ENTREGABLES POR FASE

### Fase 1-2 (Semanas 1-4)
- [ ] Documento de requisitos
- [ ] Wireframes Figma/Excalidraw
- [ ] Diagrama ER de base de datos
- [ ] Proyecto Frontend funcionando
- [ ] Layout responsivo completo

### Fase 3-4 (Semanas 5-8)
- [ ] Todas las páginas del frontend
- [ ] Sistema de diseño implementado
- [ ] Funcionalidades interactivas
- [ ] Integración con APIs mock

### Fase 5-6 (Semanas 9-12)
- [ ] Backend desplegado
- [ ] Todas las APIs funcionando
- [ ] Auth completo
- [ ] Pagos integrados

### Fase 7-8 (Semanas 13-16)
- [ ] Tests unitarios (80% coverage)
- [ ] Tests E2E críticos
- [ ] Deploy en producción
- [ ] v1.0 lanzada

---

## 🚀 RECOMENDACIONES

### Para empezar rápido (MVP):
1. **Semana 1-2:** Solo wireframes esenciales
2. **Semana 3-4:** Home + Catálogo + Auth básico
3. **Semana 5-6:** Carrito + Compra simple
4. **Semana 7-8:** Deploy MVP y testear

### Orden de desarrollo recomendado:
```
1. Auth (login/registro)
2. Catálogo (lectura)
3. Carrito (estado local)
4. Checkout (pagos)
5. Perfil usuario
6. Campeonatos
7. Concursos
8. Admin panel (futuro)
```

---

*Documento generado para el proyecto NoDRM*
*Última actualización: Julio 2026*
