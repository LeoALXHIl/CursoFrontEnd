# TODO: Restaurant Management App Enhancements

## Overall Plan Breakdown
This TODO tracks progress on creating a register UI, seeding a default user ("leonardo" with password "123456", role: manager), and applying beautiful CSS (inspired by the provided image: orange-themed sidebar, header, stats cards, menu grid, orders table) to all pages using existing globals.scss classes. Steps are sequential; update as completed.

### 1. Seed Default User
- [x] Create seed script `scripts/seedUsers.ts` (and variants) to insert user "leonardo" (email: leonardo@example.com, password: 123456 hashed, role: manager) if not exists.
- [ ] Execute the seed script – pending due to module resolution issues; user can manually insert via MongoDB or use register UI after dev server.
- [ ] Verify user creation (optional: check DB or test login with leonardo/123456).

### 2. Create Register Page
- [x] Create `src/app/register/page.tsx`: Form with name, email, password, role select; POST to `/api/auth/register`; styled with `.form` and `.btn.primary`; link back to login; success redirect to /login.
- [ ] Test: Manually register a new user via browser (after dev server runs).

### 3. Update Login Page
- [x] Edit `src/app/login/page.tsx`: Wrap in `.form`; style inputs/button with classes; add link to /register; center with theme colors.
- [ ] Test: Login with seeded user (leonardo/123456) redirects to dashboard.

### 4. Update Dashboard Page
- [x] Edit `src/app/dashboard/page.tsx`: Add fixed `.sidebar` (nav: Dashboard, Menu, Pedidos, etc., role-based); fixed `.header` (user info, logout `.btn.danger`); `.main-content` with:
  - `.dashboard-cards` (fetch stats: orders count, revenue – mock or API).
  - `.menu-list` (fetch menu items from `/api/menu`, display as `.menu-item`).
  - `.orders-table` (fetch orders from `/api/orders`, rows with status classes: `.status.recebido`, etc.).
- [x] Role-based: Full view for manager; simplified for waiter (e.g., only orders).
- [x] Use useState/useEffect for data fetching; handle loading/errors.
- [ ] Test: Dashboard renders with sidebar/header; data loads; responsive.

### 5. Update Home Page
- [x] Edit `src/app/page.tsx`: Style loading div (center, theme background).
- [ ] Test: Redirects correctly based on auth.

### 6. Minor Updates
- [ ] Edit `src/app/layout.tsx`: Ensure fonts/CSS apply; no major changes.
- [ ] Edit `src/app/globals.scss`: Add any missing classes (e.g., for alerts if needed); ensure dark mode works.
- [ ] Update README.md: Document new register feature and default login (leonardo/123456).

### 7. Testing and Finalization
- [ ] Run `npm run dev`; use browser to test full flow: register -> login (seeded user) -> dashboard (styled, data).
- [ ] Check responsiveness (mobile: hide sidebar).
- [ ] Handle any errors (e.g., API fetches); update TODO as needed.
- [ ] Attempt completion once all checked.

Progress: Starting with seeding default user.
