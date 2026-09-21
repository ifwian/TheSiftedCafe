# Testing Checklist

Two ways to test this project:

1. **Automated API smoke test** — `cd server && npm run test:api` (server
   must already be running via `npm run dev` in another terminal). Hits
   every key endpoint and checks status codes/response shapes.
2. **Manual checklist below** — for everything a script can't verify
   (visual design, animations, actual UI interaction).

> Note: the automated smoke test's assertions were verified individually
> during development (validation rules, status codes, auth behavior), but
> the full script itself needs to be run against your live server + Neon
> database to confirm end-to-end — I don't have a working Prisma Client in
> my own sandbox to run it there (see the Milestone 09 note in the main
> README).

## Public Website

- [ ] Navbar works (all links navigate correctly)
- [ ] Mobile navbar works (hamburger opens/closes, closes on nav, locks scroll, closes on Escape)
- [ ] Hero displays and entrance animation plays once
- [ ] Menu loads from the real API (not mock data)
- [ ] Menu category filtering works
- [ ] Menu search works (matches name/description/category)
- [ ] Menu item detail page works, shows related items
- [ ] Gallery works, categories filter correctly
- [ ] Gallery lightbox opens, next/prev/Escape/backdrop-click all work
- [ ] Reservation form validates and submits to the real API
- [ ] Contact form validates and submits to the real API
- [ ] Location/hours section displays
- [ ] Footer links work
- [ ] Responsive: check 360px, 390px, 768px, 1024px, 1440px

## Admin

- [ ] Login works with the seeded admin credentials
- [ ] Invalid login shows an error, doesn't crash
- [ ] Rate limiting kicks in after repeated failed logins (10 in 15 min)
- [ ] Dashboard loads real stats (not placeholder numbers)
- [ ] Menu: create, edit, delete, toggle featured, toggle availability all work
- [ ] Menu delete requires confirmation
- [ ] Reservation list loads; Confirm/Cancel/Complete update status
- [ ] Messages list loads; opening a message marks it Read; Archive works
- [ ] Logout works and redirects to login
- [ ] Visiting `/admin` while logged out redirects to `/admin/login`
- [ ] Toast notifications appear for create/update/delete actions

## Security

- [ ] Passwords are hashed (check the `users` table in Prisma Studio — never plaintext)
- [ ] `/api/admin/*` routes return 401 without a token
- [ ] `/api/admin/*` routes return 401 with an invalid/expired token
- [ ] `.env` is not committed to git
- [ ] CORS blocks requests from an unexpected origin (try a `fetch` from a different site's console)

## Database

- [ ] `npm run prisma:migrate` creates all 6 tables
- [ ] `npm run prisma:seed` populates admin user, categories, menu items, reviews
- [ ] Relationships work (a menu item's category shows correctly)
- [ ] Deleting a menu item doesn't break anything else

## Error Handling

- [ ] Invalid email on any form shows a clear error, not a crash
- [ ] Submitting a reservation for a past date is rejected
- [ ] An empty menu category shows "No menu items found."
- [ ] Empty reservations/messages lists show their empty states
- [ ] Network failure (stop the server, try an action) shows an error state with retry, not a blank screen
