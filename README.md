# The Sifted Cafe

A full-stack café website and admin dashboard, built incrementally as a
portfolio project.

> **Status:** All 22 milestones complete. Frontend, backend, database,
> authentication, and admin dashboard are all built and wired together.
> See the roadmap below for what shipped in each milestone.

## Features

**Public website**
- Home, Menu, About, Gallery, Reservation, and Contact pages
- Menu browsing with category filtering and search, backed by a real API
- Photo gallery with a lightbox (keyboard navigation, next/prev, Escape to close)
- Reservation and contact forms with client- and server-side validation
- Email notifications for new reservations and messages (Gmail SMTP)
- Fully responsive, from 360px phones to large desktop screens

**Admin dashboard**
- JWT-based login, protected routes
- Live stats overview (menu counts, reservation/message counts)
- Full menu CRUD: create, edit, delete, toggle featured/availability, photo upload
- Reservation management: confirm, cancel, complete
- Message management: view, mark read, archive
- Review management: create/edit/delete testimonials, toggle published (feeds the homepage Testimonials section)
- Change your own password from Settings
- Toast notifications and confirmation dialogs for destructive actions

**Other polish**
- Spam-resistant forms (honeypot field, invisible to real users)
- Real Google Maps embed and working "Get Directions" link
- Per-page browser titles, Open Graph tags for link previews, Add to Home Screen support

## Tech Stack

**Frontend** — React, Vite, JavaScript, React Router, Tailwind CSS, Framer Motion
**Backend** — Node.js, Express.js
**Database** — PostgreSQL, Prisma ORM
**Auth** — JWT, bcrypt

## Project Structure

```
the-sifted-cafe/
├── client/                 React + Vite frontend
│   ├── src/
│   │   ├── components/     common/ layout/ menu/ reservation/ gallery/ ui/
│   │   ├── pages/          public-facing route pages
│   │   ├── admin/          admin dashboard pages
│   │   ├── layouts/        PublicLayout, AdminLayout
│   │   ├── hooks/          custom React hooks
│   │   ├── context/        React context providers
│   │   ├── services/       API service layer
│   │   ├── utils/          helper functions
│   │   └── data/           mock data (development only)
│   └── package.json
├── server/                 Express backend (added in Milestone 08)
├── package.json            root convenience scripts
└── README.md
```

## Installation & Running Locally

```bash
git clone <repo-url>
cd the-sifted-cafe
npm install          # installs the root dev tool (concurrently)
```

Client and server each have their own dependencies:

```bash
cd client && npm install && cd ..
cd server && npm install && cd ..
```

Copy the server environment template:

```bash
cp server/.env.example server/.env
```

Then run both at once from the root:

```bash
npm run dev
```

Or run them separately:

```bash
npm run client   # http://localhost:5173
npm run server   # http://localhost:5000
```

### Other client scripts

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

### Other server scripts

```bash
npm run dev     # start with nodemon (auto-restart)
npm run start   # start once, no auto-restart
```

Verify the API is running: `curl http://localhost:5000/api/health`

## Environment Variables

Set in `server/.env` (see `server/.env.example`):

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `5000`) |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend origin allowed by CORS |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret (added in Milestone 14) |

## Database Setup (PostgreSQL + Prisma)

1. Have a PostgreSQL database ready (local install, or a hosted free tier
   like Neon/Supabase -- see project chat history for a full walkthrough).
2. Set `DATABASE_URL` in `server/.env` to that database's connection string.
3. From `server/`, run:
   ```bash
   npm run prisma:generate   # generates the Prisma Client
   npm run prisma:migrate    # creates tables from prisma/schema.prisma
   npm run prisma:seed       # adds a dev admin user + sample menu/reviews
   ```
4. Optional: `npm run prisma:studio` opens a GUI to browse the database.

Models: `User`, `Category`, `MenuItem`, `Reservation`, `Message`, `Review`
(see `server/prisma/schema.prisma`).

> **Note:** the schema's relations/enums/defaults were verified against a
> real PostgreSQL instance during development. The three `prisma:*`
> commands above still need to be run once, in your own environment, to
> generate the client and apply migrations there.

**Known audit note:** `prisma`'s CLI depends on `@prisma/config`, which
currently pulls in a version of `deepmerge-ts` flagged by `npm audit`
(stack-exhaustion issue). It's a dev-only tool used to load your local
config file, not something exposed to network requests in the running
app, so it was left as-is rather than downgrading a full major Prisma
version to avoid it.

## API Documentation

Base URL: `http://localhost:5000/api` (local) or your Render URL in production.

All responses follow `{ success: boolean, data?, message? }`. Errors use
the appropriate HTTP status (400/401/403/404/422/500) with `{ success: false, message }`.

### Public

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/menu` | List menu items (`?category=slug`, `?search=term`) |
| GET | `/menu/featured` | Featured items only |
| GET | `/menu/category/:slug` | Items in one category |
| GET | `/menu/:id` | Single item |
| GET | `/categories` | List categories |
| POST | `/reservations` | Submit a reservation (saved as `PENDING`) |
| POST | `/messages` | Submit a contact message (saved as `UNREAD`) |
| GET | `/reviews` | Published testimonials |
| POST | `/auth/login` | Admin login, returns a JWT (rate-limited) |

### Admin (require `Authorization: Bearer <token>`, role `ADMIN`)

| Method | Route | Description |
|---|---|---|
| GET | `/admin/stats` | Dashboard counts |
| GET | `/admin/menu` | All menu items, including unavailable |
| POST | `/admin/menu` | Create a menu item |
| PUT | `/admin/menu/:id` | Update a menu item |
| DELETE | `/admin/menu/:id` | Delete a menu item |
| PATCH | `/admin/menu/:id/featured` | Toggle featured |
| PATCH | `/admin/menu/:id/availability` | Toggle availability |
| GET | `/admin/reservations` | All reservations |
| PATCH | `/admin/reservations/:id` | Update status |
| GET | `/admin/messages` | All messages |
| PATCH | `/admin/messages/:id` | Update status |
| GET | `/admin/reviews` | All reviews (published + unpublished) |
| POST | `/admin/reviews` | Create a review |
| PUT | `/admin/reviews/:id` | Update a review |
| DELETE | `/admin/reviews/:id` | Delete a review |
| PATCH | `/admin/reviews/:id/published` | Toggle published |
| PATCH | `/admin/settings/password` | Change the logged-in admin's password |

## Authentication

JWT-based, minimal payload (`userId`, `role`). Passwords hashed with
bcrypt (never stored or returned in plaintext). Tokens expire after 7
days. The frontend stores the token in `localStorage` and attaches it to
every request automatically (see `client/src/services/api.js`).

Seeded dev admin account (change this password before deploying):
`admin@thesiftedcafe.dev` / `ChangeMe123!`

## Email Notifications (Gmail SMTP)

Reservation confirmations (to the customer) and new-reservation/new-message
alerts (to you) go out automatically once configured. Without config, the
app just logs a warning and keeps working -- nothing breaks.

1. Turn on 2-Step Verification on the Gmail account you want to send from.
2. Google Account → Security → 2-Step Verification → App Passwords → create one for "Mail".
3. In `server/.env`:
   ```
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_APP_PASSWORD=the-16-character-app-password
   ADMIN_NOTIFICATION_EMAIL=where-you-want-alerts@gmail.com
   ```
4. Restart the server. Submit a test reservation or message and check both inboxes.

## Image Upload (Cloudinary)

Menu item photos upload directly from the admin Menu form instead of
needing a pasted URL.

1. Sign up free at cloudinary.com, note your **Cloud name** on the dashboard home page.
2. Settings → Upload → Upload presets → Add upload preset → set **Signing Mode: Unsigned** → save, note the preset name.
3. In `client/.env`:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```
4. Restart the client. Go to Admin → Menu → Add Item, and use the file picker.

> **Tradeoff, on purpose:** uploads go straight from the browser to
> Cloudinary using an unsigned preset, so there's no backend upload
> endpoint to build or maintain. The preset name is visible in your
> deployed JS bundle, but it can only ever create new images in your
> Cloudinary account (limited to the `the-sifted-cafe/menu` folder if you
> set that restriction on the preset) -- it can't read, delete, or modify
> anything else. For a small site like this, that's a reasonable
> trade for not having to run a file-upload endpoint yourself.

## Deployment

Three services, all with free tiers:

| Layer | Platform | Config file |
|---|---|---|
| Frontend | Vercel | `client/vercel.json` |
| Backend | Render | `render.yaml` |
| Database | Neon | (connection string only) |

### 1. Database (Neon)

Already set up if you've been following along -- `DATABASE_URL` in
`server/.env` points at it. For production, either reuse the same Neon
database or create a separate branch/project for production data.

### 2. Backend (Render)

1. Push this repo to GitHub.
2. In Render, "New +" → "Blueprint", point it at this repo. It reads
   `render.yaml` and configures the service automatically.
3. Set the environment variables Render asks for (marked `sync: false`
   in `render.yaml`, so they aren't committed to git):
   - `DATABASE_URL` — your Neon connection string
   - `JWT_SECRET` — a long random string (`openssl rand -hex 32` or similar; do not reuse your local dev secret)
   - `CLIENT_URL` — your Vercel URL once you have it (step 3 below); update this after deploying the frontend
4. Deploy. The build command (`npm install && npx prisma migrate deploy`)
   installs dependencies, generates the Prisma Client (via `postinstall`),
   and applies any pending migrations automatically.
5. Note the resulting API URL (e.g. `https://the-sifted-cafe-api.onrender.com`).

### 3. Frontend (Vercel)

1. Import the repo in Vercel, set the project root to `client/`.
2. Framework preset: Vite (should auto-detect).
3. Add environment variable `VITE_API_URL` = your Render API URL + `/api`
   (e.g. `https://the-sifted-cafe-api.onrender.com/api`).
4. Deploy. `vercel.json`'s rewrite rule makes sure routes like `/menu` or
   `/admin` don't 404 on a direct visit or refresh.
5. Go back to Render and update `CLIENT_URL` to this Vercel URL, so CORS
   allows requests from your live frontend.

### Post-deploy checklist

- [ ] Visit the live frontend, confirm the menu loads real data
- [ ] Log in to `/admin/login` with the seeded admin account, **then change that password**
- [ ] Submit a test reservation/message and confirm it appears in the admin dashboard
- [ ] Update `og:image` in `client/index.html` to the full production URL (see the TODO comment there)
- [ ] Update `client/src/data/businessInfo.js` with the real address, hours, and social links
- [ ] Run through `TESTING.md` against the live URLs

## Development Roadmap (Milestones)

- [x] **01** — Project initialization
- [x] **02** — Design system
- [x] **03** — Public layout
- [x] **04** — Homepage
- [x] **05** — Menu frontend
- [x] **06** — Gallery + testimonials
- [x] **07** — Reservation + contact UI
- [x] **08** — Backend initialization
- [x] **09** — PostgreSQL + Prisma
- [x] **10** — Menu API
- [x] **11** — Reservation API
- [x] **12** — Contact API
- [x] **13** — React/API integration
- [x] **14** — Authentication
- [x] **15** — Admin dashboard
- [x] **16** — Admin CRUD
- [x] **17** — Security + validation
- [x] **18** — Responsive polish
- [x] **19** — Performance + accessibility
- [x] **20** — Testing
- [x] **21** — Deployment
- [x] **22** — Documentation

## Future Improvements

Online ordering, cart, payments, customer accounts, loyalty program,
notifications, inventory management, sales analytics, staff accounts, audit
logs, and multi-branch support are intentionally out of scope for the MVP.
