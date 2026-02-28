# Copilot Instructions — minguely.ch Monorepo

## 1. Tech Stack Summary

### Frontend (`/frontend`)

- **Framework**: Nuxt 3 (`^3.4.0`) — Vue 3, Composition API + Options API mix
- **GraphQL Client**: `@nuxtjs/apollo` (`^5.0.0-alpha.6`) + `@apollo/client` (`^3.7.12`)
- **CSS**: Tailwind CSS (`^3.3.1`) + PostCSS (`^8.4.21`) + Autoprefixer (`^10.4.14`) + Tailwind nesting
- **Image Optimization**: `@nuxt/image-edge` (`^1.0.0-...`) with Strapi provider
- **Font**: `proxima-nova` via Adobe Typekit
- **Process Manager**: PM2 (via `ecosystem.config.js`)
- **Package Manager**: Yarn (shamefully-hoist, `strict-peer-dependencies=false`)
- **Node Target**: 16 (CI)

### Backend (`/backend`)

- **CMS**: Strapi 4.9.0 (headless)
- **Database**: SQLite (default, `better-sqlite3` 8.0.1) — configurable to MySQL/Postgres via env
- **API**: GraphQL via `@strapi/plugin-graphql` 4.9.0
- **Rich Text**: CKEditor 5 (`@_sh/strapi-plugin-ckeditor`)
- **Auth**: `@strapi/plugin-users-permissions` 4.9.0
- **i18n**: `@strapi/plugin-i18n` 4.9.0

### Hosting

- Alwaysdata (deployment via rsync + API restart)

---

## 2. Project Architecture

```
/
├── .github/workflows/
│   ├── deploy-backend.yml      # CI/CD: build + rsync backend
│   └── deploy-frontend.yml     # CI/CD: build + rsync .output/
├── backend/                    # Strapi 4 headless CMS
│   ├── config/                 # server, db, plugins, middlewares, admin
│   ├── src/
│   │   ├── api/
│   │   │   ├── about/          # Single type: About (bio, resume, cover)
│   │   │   └── project/        # Collection type: Project (video/music/dev)
│   │   ├── components/
│   │   │   └── about/          # Strapi components: Resume, Items
│   │   └── admin/              # Webpack/app config examples
│   └── public/
├── frontend/                   # Nuxt 3 SSR app
│   ├── app.vue                 # Root layout: sidebar + NuxtPage
│   ├── assets/
│   │   ├── css/main.css        # Tailwind imports + Typekit
│   │   └── data/credit.json    # Static credit list (local JSON, not from CMS)
│   ├── components/
│   │   ├── Sidebar.vue         # Navigation + socials
│   │   ├── ProjectsList.vue    # Fetches projects by category via GraphQL
│   │   ├── ProjectCard.vue     # Single project display card
│   │   └── FullCreditList.vue  # Sorted table from credit.json
│   ├── graphql/
│   │   ├── fetchAbout.gql      # Query: about single type
│   │   └── fetchProjects.gql   # Query: projects filtered by Category
│   ├── pages/
│   │   ├── index.vue           # About page (bio, resume, cover image)
│   │   ├── video.vue           # Video projects + credit list
│   │   ├── music.vue           # Music projects
│   │   └── dev.vue             # Dev projects (currently hidden in nav)
│   ├── nuxt.config.js          # Apollo, image, PostCSS config
│   ├── tailwind.config.js
│   └── ecosystem.config.js     # PM2 config for production
```

### Data Flow

```
Browser → Nuxt 3 (SSR/SSG) → Apollo Client (GraphQL) → Strapi 4 API (api.minguely.ch/graphql) → SQLite
                             → Static JSON (credit.json) for FullCreditList
```

---

## 3. Key Conventions & Patterns

### File Naming

- **Vue Components**: `PascalCase.vue` (`ProjectCard.vue`, `ProjectsList.vue`, `FullCreditList.vue`)
- **Pages**: `kebab-case.vue` / lowercase (`index.vue`, `video.vue`, `music.vue`, `dev.vue`)
- **GraphQL files**: `camelCase.gql` (`fetchProjects.gql`, `fetchAbout.gql`)
- **Strapi content types**: `kebab-case` folders, `schema.json` for model definition
- **Strapi components**: `kebab-case.json` (`resume.json`, `items.json`)

### Component Patterns

- **Mixed API styles**: `<script setup>` (Composition API) coexists with `<script> export default` (Options API) — sometimes in the same SFC (see `index.vue` using both for `imageLoaded` reactivity)
- **Data fetching**: `useAsyncQuery()` from `@nuxtjs/apollo` in `<script setup>` blocks
- **GraphQL queries**: Imported as `.gql` files, passed directly to `useAsyncQuery`
- **Props**: Defined via `defineProps()` in Composition API, `props:` in Options API
- **Head management**: `useHead()` in `<script setup>`, `titleTemplate` set in `app.vue`

### Styling

- **Scoped + global**: Components use `<style scoped lang="postcss">` or unscoped `<style lang="postcss">`
- **Tailwind usage**: Mix of utility classes in templates + `@apply` in `<style>` blocks + `@screen` directive for responsive breakpoints
- **Custom theme extensions**: `aspect-cine` (2.35:1), `duration-3000` (3s transition), `font-sans` → proxima-nova

### State Management

- No Pinia/Vuex — state is local (component-level `ref()`, `data()`)
- Menu state lives in `app.vue` and is passed down via props/events to `Sidebar.vue`

### Business Logic Location

- **No dedicated services/utils layer** in frontend — logic is inline in components
- **Date parsing**: Inline `parseDate()` in `FullCreditList.vue`
- **Backend**: Pure Strapi core controllers/services/routers (no custom logic)

---

## 4. Data Models

### `About` (Single Type)

| Field     | Type                                  | Notes                       |
| --------- | ------------------------------------- | --------------------------- |
| Cover     | Media (single)                        | Hero image                  |
| Biography | CKEditor5 rich text                   | Rendered via `v-html`       |
| Resume    | Component `about.resume` (repeatable) | Sections with title + items |

### `Resume` Component

| Field | Type                                 |
| ----- | ------------------------------------ |
| Title | String                               |
| Items | Component `about.items` (repeatable) |

### `Items` Component

| Field | Type   |
| ----- | ------ |
| Title | String |
| Text  | Text   |

### `Project` (Collection Type)

| Field        | Type                          | Notes                          |
| ------------ | ----------------------------- | ------------------------------ |
| title        | String                        |                                |
| subtitle     | String                        |                                |
| description  | String                        | Displayed as "credits" in card |
| external_url | String                        | Opens in new tab               |
| cover        | Media (single)                |                                |
| Category     | Enum: `video`, `music`, `dev` | Filtered in GraphQL query      |

### `Credit` (Static JSON — not in CMS)

| Field    | Type   | Format      |
| -------- | ------ | ----------- |
| title    | String | Artist name |
| date     | String | `DD.MM.YY`  |
| location | String | Venue/event |

---

## 5. Critical Commands

### Frontend

```bash
cd frontend
yarn install          # Install dependencies
yarn dev              # Dev server on http://localhost:3000
yarn build            # Production build (outputs to .output/)
yarn preview          # Preview production build locally
yarn generate         # Static site generation
```

### Backend

```bash
cd backend
yarn install          # Install dependencies
yarn dev              # Strapi dev with auto-reload (port 1337)
yarn start            # Strapi production (no auto-reload)
yarn build            # Build Strapi admin panel
```

### Production (PM2)

```bash
cd frontend
pm2 start ecosystem.config.js    # Starts .output/server/index.mjs
```

---

## 6. Important Notes for Development

- **GraphQL endpoint**: Hardcoded to `https://api.minguely.ch/graphql` in `nuxt.config.js` — no env variable abstraction
- **Image provider**: Strapi images served via `nuxt-img` with `provider="strapi"` and base URL `https://api.minguely.ch/`
- **Dev page hidden**: The `/dev` route exists but is commented out in `Sidebar.vue` navigation
- **Credit list is static**: `FullCreditList.vue` reads from `assets/data/credit.json`, not from the CMS — dates use `DD.MM.YY` format and assume 2000s century
- **No TypeScript**: Entire project is JavaScript (`.js`, `.vue`, `.gql`) — no `.ts` files
- **No tests**: No test framework configured
- **CI node version**: Node 16 (pinned in GitHub Actions) — may need updating
- **Sidebar description text**: Currently says "video & music & video & music" — likely a placeholder
