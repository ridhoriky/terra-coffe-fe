# AGENTS.md — Terra Coffee Project

> This file is the **single source of truth** for any AI agent (Copilot, Cursor, Claude, etc.) or human contributor working on this codebase. Read this file **fully** before making any changes. All rules here are **production-grade and non-negotiable**.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Rules](#4-architecture-rules)
5. [Frontend Rules (Next.js)](#5-frontend-rules-nextjs)
6. [Backend Rules (Express.js)](#6-backend-rules-expressjs)
7. [Database Rules (PostgreSQL)](#7-database-rules-postgresql)
8. [Authentication Rules](#8-authentication-rules)
9. [API Contract Rules](#9-api-contract-rules)
10. [Styling Rules (Tailwind + shadcn/ui)](#10-styling-rules-tailwind--shadcnui)
11. [Animation Rules (Framer Motion)](#11-animation-rules-framer-motion)
12. [TypeScript Rules](#12-typescript-rules)
13. [Testing Rules](#13-testing-rules)
14. [Code Quality & Git Rules](#14-code-quality--git-rules)
15. [Environment & Deployment Rules](#15-environment--deployment-rules)
16. [Security Rules](#16-security-rules)
17. [Performance Rules](#17-performance-rules)
18. [Naming Conventions](#18-naming-conventions)
19. [Forbidden Patterns](#19-forbidden-patterns)
20. [Agent Behavior Rules](#20-agent-behavior-rules)
21. [Feature: Auth](#21-feature-auth)

---

## 1. Project Overview

**Project:** Terra Coffee — Landing Page & Reservation System
**Brand:** Terra Coffee | Warm & Cozy | Target: Young Professionals 25–35
**Architecture:** Polyrepo — FE and BE are separate repositories

| Repo               | Description        | URL Pattern                |
| ------------------ | ------------------ | -------------------------- |
| `terra-coffee-web` | Next.js frontend   | Deployed on Vercel         |
| `terra-coffee-api` | Express.js backend | Deployed on Railway/Render |

---

## 2. Repository Structure

### Frontend (`terra-coffee-web`)

```
terra-coffee-web/
├── public/                      # Static assets (images, fonts, icons)
├── src/
│   ├── app/                     # Next.js App Router pages & layouts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/              # Auth route group (no shared layout)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify-email/
│   │   │       └── page.tsx
│   │   └── (routes)/
│   ├── features/                # Feature-based modules (CORE PATTERN)
│   │   ├── auth/                # ✅ Auth feature
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   ├── ResetPasswordForm.tsx
│   │   │   │   ├── VerifyEmailNotice.tsx
│   │   │   │   └── OAuthButton.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useRegister.ts
│   │   │   │   ├── useForgotPassword.ts
│   │   │   │   └── useOAuth.ts
│   │   │   ├── schemas/
│   │   │   │   └── auth.schema.ts   # Zod schemas (FE validation)
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── hero/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── menu/
│   │   ├── reservation/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   ├── about/
│   │   └── location/
│   ├── components/              # Shared/global UI components only
│   │   ├── ui/                  # shadcn/ui components (auto-generated, do not edit)
│   │   └── shared/              # Custom shared components
│   ├── hooks/                   # Global shared hooks
│   ├── lib/                     # Utilities, helpers, configs
│   │   ├── api.ts               # Axios/fetch instance
│   │   ├── utils.ts             # cn() and other utils
│   │   └── constants.ts
│   ├── stores/                  # Global state (Zustand or Context)
│   ├── types/                   # Global TypeScript types & interfaces
│   └── styles/
│       └── globals.css
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### Backend (`terra-coffee-api`)

```
terra-coffee-api/
├── src/
│   ├── features/                # Feature-based modules (CORE PATTERN)
│   │   ├── auth/                # ✅ Auth feature
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.middleware.ts
│   │   │   ├── auth.schema.ts       # Zod validation schemas
│   │   │   ├── auth.queries.ts      # Raw SQL query functions
│   │   │   ├── auth.types.ts
│   │   │   ├── email.service.ts     # Nodemailer email sender
│   │   │   └── oauth.service.ts     # Google OAuth handler
│   │   ├── reservation/
│   │   ├── menu/
│   │   └── user/
│   ├── shared/
│   │   ├── middleware/          # Global middleware (error handler, logger, cors)
│   │   ├── utils/               # Shared utilities
│   │   ├── types/               # Shared TypeScript types
│   │   └── constants/
│   ├── config/                  # App config, env validation
│   │   ├── app.config.ts
│   │   └── db.config.ts
│   ├── db/                      # Database connection & query helpers
│   │   ├── pool.ts              # pg Pool instance
│   │   └── migrations/          # Raw SQL migration files
│   └── app.ts                   # Express app bootstrap
├── server.ts                    # Entry point
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
└── tsconfig.json
```

---

## 3. Tech Stack

### Frontend

| Tool            | Version          | Purpose              |
| --------------- | ---------------- | -------------------- |
| Next.js         | 14+ (App Router) | Framework            |
| TypeScript      | 5+               | Language             |
| Tailwind CSS    | 3+               | Styling              |
| shadcn/ui       | latest           | UI Component library |
| Framer Motion   | 11+              | Animations           |
| Axios           | latest           | HTTP client          |
| React Hook Form | latest           | Form management      |
| Zod             | latest           | Schema validation    |

### Backend

| Tool                 | Version | Purpose                                   |
| -------------------- | ------- | ----------------------------------------- |
| Node.js              | 20 LTS  | Runtime                                   |
| Express.js           | 4+      | Framework                                 |
| TypeScript           | 5+      | Language                                  |
| node-postgres (`pg`) | latest  | PostgreSQL client                         |
| jsonwebtoken         | latest  | JWT handling                              |
| bcryptjs             | latest  | Password hashing                          |
| Zod                  | latest  | Request validation                        |
| helmet               | latest  | Security headers                          |
| cors                 | latest  | CORS handling                             |
| morgan               | latest  | HTTP logger                               |
| nodemailer           | latest  | Email sending (SMTP)                      |
| google-auth-library  | latest  | Google OAuth token verification           |
| crypto (built-in)    | —       | Token generation for email verify / reset |

### Infra

| Service                       | Purpose             |
| ----------------------------- | ------------------- |
| Vercel                        | Frontend deployment |
| Railway / Render              | Backend deployment  |
| PostgreSQL (Railway/Supabase) | Database            |

---

## 4. Architecture Rules

### Feature-Based Architecture (MANDATORY)

- **EVERY** feature lives in its own folder under `src/features/`
- A feature folder MUST contain only code relevant to that feature
- Features MUST NOT import from other features directly — use shared `components/`, `hooks/`, `lib/`, or `types/` for cross-feature code
- Each feature MUST have an `index.ts` barrel export file
- New pages/routes in Next.js MUST map to a feature; put all logic inside the feature folder

```ts
// ✅ CORRECT — feature importing from shared
import { Button } from "@/components/shared/Button";
import { useDebounce } from "@/hooks/useDebounce";

// ❌ WRONG — feature importing from another feature
import { MenuCard } from "@/features/menu/components/MenuCard";
```

### Separation of Concerns

- **Components** → UI rendering only, no business logic
- **Hooks** → Stateful logic, data fetching, side effects
- **Services (BE)** → Business logic, DB queries
- **Controllers (BE)** → Request parsing, response formatting only
- **Routes (BE)** → Route definitions and middleware chains only

---

## 5. Frontend Rules (Next.js)

### General

- Use **App Router** exclusively — no Pages Router
- All pages are **Server Components by default**; add `'use client'` only when required (interactivity, hooks, browser APIs)
- Minimize `'use client'` surface area — push client boundaries as deep as possible
- Use **Next.js Image** (`next/image`) for ALL images — never use raw `<img>` tags
- Use **Next.js Link** (`next/link`) for ALL internal navigation
- Implement **loading.tsx** and **error.tsx** for every route segment

### Data Fetching

- Server Components fetch data directly via `async/await`
- Client Components use custom hooks with SWR or React Query for client-side fetching
- Never fetch inside a component body directly — always abstract into a hook or server component
- Always handle loading, error, and empty states

```tsx
// ✅ CORRECT — server component data fetch
async function MenuSection() {
  const items = await getMenuItems(); // server-side fetch
  return <MenuGrid items={items} />;
}

// ✅ CORRECT — client hook pattern
function useReservation(id: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // ...
}
```

### Component Rules

- One component per file
- Component files use **PascalCase**: `MenuCard.tsx`
- Export components as **named exports**, not default exports (exception: Next.js pages)
- Props interfaces MUST be defined and co-located in the same file or a `types.ts` in the feature folder
- No inline styles — use Tailwind classes exclusively

### Mobile-First Development (MANDATORY)

- Write **mobile styles first**, then add responsive breakpoints for larger screens
- Default Tailwind classes = mobile, use `md:`, `lg:`, `xl:` for larger screens
- Test every component at 375px, 768px, 1024px, 1280px
- Touch targets MUST be minimum 44×44px
- No horizontal scroll on any viewport

```tsx
// ✅ CORRECT — mobile first
<div className="flex flex-col gap-4 px-4 md:flex-row md:gap-8 md:px-8 lg:px-16">

// ❌ WRONG — desktop first
<div className="flex flex-row gap-8 px-16 sm:flex-col sm:gap-4 sm:px-4">
```

---

## 6. Backend Rules (Express.js)

### Structure

- Every route module MUST follow: `routes → controller → service → db`
- Controllers MUST NOT contain business logic — only parse req, call service, send res
- Services MUST NOT access `req` or `res` objects
- All route files MUST be registered in `app.ts` under `/api/v1/`

### Controller Pattern

```ts
// ✅ CORRECT controller
export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = createReservationSchema.parse(req.body);
    const reservation = await reservationService.create(input, req.user.id);
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};
```

### Error Handling

- ALL async route handlers MUST use `try/catch` and pass errors to `next(error)`
- A **global error handler middleware** MUST be the last middleware in `app.ts`
- Never send raw error messages to the client in production
- Use a custom `AppError` class for operational errors:

```ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
```

### Request Validation

- ALL incoming request bodies, params, and queries MUST be validated with **Zod**
- Validation schemas live in `[feature]/[feature].schema.ts`
- Reject invalid requests BEFORE they reach the service layer

---

## 7. Database Rules (PostgreSQL)

### Connection

- Use a **single `pg.Pool` instance** — never create multiple pools
- Pool config MUST be set from environment variables
- Pool MUST be gracefully closed on process termination (`SIGTERM`, `SIGINT`)

```ts
// src/db/pool.ts
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Query Rules

- Use **parameterized queries exclusively** — NEVER string-interpolate user input into SQL
- All queries live inside **service files** or a dedicated `[feature].queries.ts` file
- Wrap multi-step operations in **transactions**
- Always explicitly name columns in SELECT — no `SELECT *` in production code

```ts
// ✅ CORRECT — parameterized query
const result = await pool.query(
  "SELECT id, name, email FROM users WHERE id = $1",
  [userId],
);

// ❌ WRONG — SQL injection risk
const result = await pool.query(`SELECT * FROM users WHERE id = ${userId}`);
```

### Migrations

- All schema changes MUST be done via migration files in `src/db/migrations/`
- Migration files are named: `001_create_users.sql`, `002_create_reservations.sql`
- NEVER modify an existing migration file — always create a new one
- Migrations run in numeric order

---

## 8. Authentication Rules

### JWT + Refresh Token Strategy

- **Access Token:** short-lived (15 minutes), stored in memory (JS variable) on the client
- **Refresh Token:** long-lived (7 days), stored in **httpOnly, Secure, SameSite=Strict cookie**
- Never store access tokens in `localStorage` or `sessionStorage`
- Never store tokens in non-httpOnly cookies

### Token Flow

```
Login → Server returns:
  - accessToken (in JSON response body)
  - refreshToken (in httpOnly cookie)

Authenticated request → Client sends:
  - Authorization: Bearer <accessToken> header

Token expired → Client calls POST /api/v1/auth/refresh
  - Server reads refreshToken from cookie
  - Returns new accessToken in body
  - Rotates refreshToken (issues new httpOnly cookie)

Logout → Client calls POST /api/v1/auth/logout
  - Server clears httpOnly cookie
  - Client discards in-memory accessToken
```

### Middleware

- `authenticate` middleware MUST verify JWT signature and expiry before passing to controller
- Protected routes MUST always use `authenticate` middleware
- Refresh tokens MUST be rotated on every use (invalidate old, issue new)
- Store refresh token hashes in DB for revocation capability

### Email Verification Flow

- On register: generate a secure random token (`crypto.randomBytes(32).toString('hex')`)
- Store hashed token + expiry (24h) in `email_verification_tokens` table
- Send verification link: `{FRONTEND_URL}/verify-email?token=<raw_token>`
- On verify: hash incoming token, compare to DB, mark user `is_verified = true`, delete token
- Unverified users CAN login but are flagged in the JWT payload (`is_verified: false`)
- Frontend checks `is_verified` from decoded token and shows a banner if false
- Resend verification endpoint: rate-limited to 3 requests per hour per user

### Forgot Password / Reset Flow

- Generate secure random token (`crypto.randomBytes(32).toString('hex')`)
- Store hashed token + expiry (1h) in `password_reset_tokens` table
- Send reset link: `{FRONTEND_URL}/reset-password?token=<raw_token>`
- On reset: validate token, hash new password, update user, **delete all refresh tokens** for that user
- Token is single-use — delete immediately after successful reset
- Never reveal whether an email exists — always respond with the same success message

### Google OAuth Flow

```
1. FE redirects user to Google consent screen via button click
2. Google redirects back to: GET /api/v1/auth/google/callback?code=<code>
3. BE exchanges code for Google ID token using google-auth-library
4. BE verifies ID token, extracts { email, name, google_id, picture }
5. BE upserts user: find by google_id OR email, create if not exists
   - OAuth users have NULL password_hash — they cannot use password login
   - Set is_verified = true automatically (Google email is verified)
6. BE issues accessToken + refreshToken (same flow as email login)
7. BE redirects FE to: {FRONTEND_URL}/auth/callback?token=<accessToken>
8. FE reads token from URL, stores in memory, clears URL param
```

- OAuth users MUST be stored in the same `users` table with `auth_provider = 'google'`
- Never mix OAuth and password auth for the same email without explicit account linking
- Store `google_id` and `avatar_url` columns on the `users` table

### Nodemailer Rules

- Create a **single transporter instance** in `email.service.ts` — never create multiple
- All email templates MUST be HTML strings with inline CSS (email clients strip `<style>`)
- Always set `from` field with brand name: `"Terra Coffee" <no-reply@terracoffee.com>`
- Wrap all `transporter.sendMail()` calls in try/catch — email failure must NOT crash the request
- Log email failures but respond to client as if email was sent (prevent user enumeration)
- Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

---

## 9. API Contract Rules

### URL Structure

```
Base URL: /api/v1/

Auth:        POST   /api/v1/auth/register
             POST   /api/v1/auth/login
             POST   /api/v1/auth/logout
             POST   /api/v1/auth/refresh
             POST   /api/v1/auth/forgot-password
             POST   /api/v1/auth/reset-password
             POST   /api/v1/auth/verify-email
             POST   /api/v1/auth/resend-verification
             GET    /api/v1/auth/google/callback      # OAuth redirect handler
             GET    /api/v1/auth/me                   # Get current user (protected)

Menu:        GET    /api/v1/menu
             GET    /api/v1/menu/:id

Reservation: POST   /api/v1/reservations
             GET    /api/v1/reservations/:id
             PATCH  /api/v1/reservations/:id
             DELETE /api/v1/reservations/:id
```

### Response Format (MANDATORY — all endpoints must follow this)

```ts
// Success
{
  "success": true,
  "data": <payload>,
  "meta": {              // optional, for paginated responses
    "page": 1,
    "limit": 10,
    "total": 100
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": []        // optional field-level errors
  }
}
```

### HTTP Status Codes

| Situation         | Code |
| ----------------- | ---- |
| Success (read)    | 200  |
| Success (created) | 201  |
| No content        | 204  |
| Validation error  | 400  |
| Unauthorized      | 401  |
| Forbidden         | 403  |
| Not found         | 404  |
| Server error      | 500  |

---

## 10. Styling Rules (Tailwind + shadcn/ui)

### Tailwind

- Use Tailwind utility classes exclusively — no custom CSS unless absolutely unavoidable
- Custom design tokens (brand colors, fonts) MUST be defined in `tailwind.config.ts`
- Never use arbitrary values (`w-[347px]`) unless there is no Tailwind equivalent
- Dark mode uses `class` strategy — controlled via root `<html>` class

```ts
// tailwind.config.ts — register brand tokens
theme: {
  extend: {
    colors: {
      terra: {
        cream: '#F5EFE6',
        espresso: '#2C1A0E',
        primary: '#C4622D',   // terracotta
        olive: '#7A8C6E',
        taupe: '#B8A898',
      }
    },
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      body: ['DM Sans', 'sans-serif'],
    }
  }
}
```

### shadcn/ui

- shadcn components live in `src/components/ui/` — **never edit these files directly**
- To customize, wrap the shadcn component in a new component in `src/components/shared/`
- Always use the shadcn CLI to add new components: `npx shadcn-ui@latest add <component>`
- Never copy-paste shadcn code manually

---

## 11. Animation Rules (Framer Motion)

### General

- Animations MUST NOT block user interaction or page load
- All animations MUST respect `prefers-reduced-motion` media query
- Heavy animation logic MUST be in a custom hook, not inline in JSX
- Use `AnimatePresence` for mount/unmount transitions

### Performance

- Use `will-change` sparingly — only on elements with complex transforms
- Prefer `transform` and `opacity` animations — never animate `width`, `height`, `top`, `left` directly (causes layout reflow)
- Lazy-load Framer Motion with dynamic import on pages where it's not critical

### Standard Motion Variants (use these for consistency)

```ts
// src/lib/motion.ts — shared animation variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 24px rgba(44,26,14,0.08)" },
  hover: { y: -4, boxShadow: "0 12px 40px rgba(44,26,14,0.16)" },
};
```

---

## 12. TypeScript Rules

### Strictness (MANDATORY)

```json
// tsconfig.json — both FE and BE must have:
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Rules

- `any` is **BANNED** — use `unknown` and narrow the type properly
- `as` type assertions are a **last resort** — document why if used
- All function parameters and return types MUST be explicitly typed
- Prefer `interface` for object shapes, `type` for unions and computed types
- Use `readonly` for data that should not be mutated
- Shared types between FE and BE: keep a `types/` folder in each repo and manually sync (or extract to a shared npm package later)

```ts
// ✅ CORRECT
function getUser(id: string): Promise<User> { ... }

// ❌ WRONG
function getUser(id: any): Promise<any> { ... }
```

---

## 13. Testing Rules

### Frontend (Vitest + Testing Library)

- Test files co-located with source: `MenuCard.test.tsx` next to `MenuCard.tsx`
- Test file naming: `[ComponentName].test.tsx` or `[hookName].test.ts`
- Every component with logic MUST have tests
- Test behavior, not implementation — query by role/label, not by class names
- Coverage threshold: **70% minimum** (lines, branches, functions)

```ts
// ✅ CORRECT — tests behavior
const button = screen.getByRole("button", { name: /reserve a table/i });
fireEvent.click(button);
expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();

// ❌ WRONG — tests implementation detail
const button = document.querySelector(".btn-primary");
```

### Backend (Jest + Supertest)

- Test files in `src/features/[feature]/__tests__/`
- Unit tests for all service functions
- Integration tests for all API routes using Supertest
- Use a **separate test database** — never run tests against production/staging DB
- Mock `pg.Pool` for unit tests; use real DB connection for integration tests
- Coverage threshold: **70% minimum**

```ts
// Integration test example
describe("POST /api/v1/reservations", () => {
  it("should create reservation for authenticated user", async () => {
    const res = await request(app)
      .post("/api/v1/reservations")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ date: "2025-12-01", time: "19:00", guests: 2 });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
  });
});
```

### CI Rule

- All tests MUST pass before any PR can be merged
- `npm test` MUST exit with code 0 on CI

---

## 14. Code Quality & Git Rules

### Tooling Setup

Both repos MUST have:

- **ESLint** with TypeScript rules
- **Prettier** for formatting
- **Husky** for git hooks
- **lint-staged** to run linters only on staged files

### Pre-commit Hook (via Husky + lint-staged)

```json
// .lintstagedrc
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

### Branch Strategy

```
main          → production (protected, no direct push)
develop       → integration branch
feature/*     → new features (branch from develop)
fix/*         → bug fixes (branch from develop)
hotfix/*      → urgent production fixes (branch from main)
```

### Commit Message Format

Follow **Conventional Commits**:

```
<type>(<scope>): <short description>

Types: feat | fix | chore | docs | style | refactor | test | perf

Examples:
feat(reservation): add date picker validation
fix(auth): resolve refresh token rotation bug
chore(deps): update framer-motion to v11
test(menu): add unit tests for menu service
```

### PR Rules

- PRs MUST target `develop`, never `main` directly (except hotfix)
- Every PR MUST have a description explaining WHAT and WHY
- All CI checks (lint, test, build) MUST pass before merge
- Minimum 1 reviewer required for merge
- Squash merge preferred to keep history clean

---

## 15. Environment & Deployment Rules

### Environment Variables

- NEVER hardcode secrets, API keys, or URLs in code
- All env vars MUST be documented in `.env.example` with placeholder values
- `.env` and `.env.local` are ALWAYS in `.gitignore`
- Validate all required env vars at app startup — crash fast if missing

```ts
// src/config/app.config.ts
const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "FRONTEND_URL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
  "ALLOWED_ORIGIN",
] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
```

### Environment Naming

| Variable                   | Frontend                       | Backend                |
| -------------------------- | ------------------------------ | ---------------------- |
| API base URL               | `NEXT_PUBLIC_API_URL`          | —                      |
| JWT secret                 | —                              | `JWT_SECRET`           |
| JWT refresh secret         | —                              | `JWT_REFRESH_SECRET`   |
| DB connection              | —                              | `DATABASE_URL`         |
| Node environment           | —                              | `NODE_ENV`             |
| Port                       | —                              | `PORT`                 |
| Frontend URL               | —                              | `FRONTEND_URL`         |
| SMTP host                  | —                              | `SMTP_HOST`            |
| SMTP port                  | —                              | `SMTP_PORT`            |
| SMTP user                  | —                              | `SMTP_USER`            |
| SMTP password              | —                              | `SMTP_PASS`            |
| SMTP from address          | —                              | `SMTP_FROM`            |
| Google OAuth client ID     | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `GOOGLE_CLIENT_ID`     |
| Google OAuth client secret | —                              | `GOOGLE_CLIENT_SECRET` |
| Google OAuth redirect URI  | —                              | `GOOGLE_REDIRECT_URI`  |
| Allowed CORS origin        | —                              | `ALLOWED_ORIGIN`       |

### Vercel (Frontend)

- Set all `NEXT_PUBLIC_*` env vars in Vercel dashboard per environment
- Enable **Vercel Analytics** for Core Web Vitals monitoring
- Configure `next.config.ts` with proper image domains
- Use Vercel's preview deployments for PRs

### Railway / Render (Backend)

- Use **health check endpoint**: `GET /health` returning `{ status: 'ok' }`
- Set `NODE_ENV=production` in production environment
- Configure auto-restart on crash
- Set database connection pool size appropriate for plan limits

---

## 16. Security Rules

### Input & Output

- Validate ALL user inputs with Zod on the backend
- Sanitize HTML output if any user-generated content is rendered
- Never log sensitive data (passwords, tokens, full credit card numbers)
- Use `helmet` middleware on every Express app

### HTTP Security

```ts
// app.ts — mandatory security middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10kb" })); // prevent large payload attacks
```

### Rate Limiting

- Apply rate limiting on all auth endpoints: max 10 requests per 15 minutes per IP
- Use `express-rate-limit` package

### Passwords

- Hash passwords with `bcryptjs`, minimum **12 salt rounds**
- Never store plain text passwords
- Never return password hashes in API responses

### CORS

- `ALLOWED_ORIGIN` MUST be set explicitly — never use `*` in production
- `credentials: true` MUST be set to allow httpOnly cookies cross-origin

---

## 17. Performance Rules

### Frontend

- Use `next/dynamic` for heavy components (Framer Motion heavy scenes, maps, galleries)
- Images MUST use `next/image` with proper `width`, `height`, and `priority` on above-fold images
- Use `React.memo` and `useMemo` only when profiler shows actual performance issues — don't premature-optimize
- Aim for Lighthouse score: **Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90**
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Backend

- Add database indexes for all foreign keys and frequently queried columns
- Use connection pooling (already enforced via single Pool instance)
- Keep API response payloads minimal — only return fields the client needs
- Log slow queries (> 200ms) to identify optimization targets

---

## 18. Naming Conventions

| Item               | Convention                  | Example                    |
| ------------------ | --------------------------- | -------------------------- |
| Component files    | PascalCase                  | `MenuCard.tsx`             |
| Hook files         | camelCase with `use` prefix | `useReservation.ts`        |
| Utility files      | camelCase                   | `formatDate.ts`            |
| Type/Interface     | PascalCase                  | `ReservationPayload`       |
| Constants          | SCREAMING_SNAKE_CASE        | `MAX_GUESTS`               |
| CSS class (custom) | kebab-case                  | `terra-card`               |
| DB tables          | snake_case plural           | `menu_items`               |
| DB columns         | snake_case                  | `created_at`               |
| API routes         | kebab-case                  | `/api/v1/menu-items`       |
| Env variables      | SCREAMING_SNAKE_CASE        | `JWT_REFRESH_SECRET`       |
| Feature folders    | kebab-case                  | `features/menu/`           |
| Git branches       | kebab-case with prefix      | `feature/reservation-form` |

---

## 19. Forbidden Patterns

The following patterns are **BANNED** in this codebase. An AI agent or contributor must never produce these:

```ts
// ❌ any type
const data: any = response.data

// ❌ SQL string interpolation
`SELECT * FROM users WHERE id = ${id}`

// ❌ SELECT *
SELECT * FROM reservations

// ❌ Raw <img> tag
<img src="/coffee.jpg" alt="coffee" />

// ❌ Direct feature-to-feature import
import { MenuCard } from '@/features/menu/components/MenuCard'

// ❌ localStorage for tokens
localStorage.setItem('accessToken', token)

// ❌ Inline styles
<div style={{ color: 'red' }}>

// ❌ Default export for shared components
export default MenuCard

// ❌ Accessing req/res inside service
async function createReservation(req: Request) { ... }

// ❌ Multiple Pool instances
const pool1 = new Pool(...)
const pool2 = new Pool(...)

// ❌ process.env without validation
const secret = process.env.JWT_SECRET // could be undefined

// ❌ console.log in production code (use a logger)
console.log('user created', user)

// ❌ Desktop-first responsive CSS
<div className="flex-row sm:flex-col">
```

---

## 20. Agent Behavior Rules

> These rules govern how AI agents (Claude, Copilot, Cursor, etc.) must behave when working in this codebase.

1. **Read this file first** before generating any code, file, or suggestion
2. **Never generate code that violates any rule** in this document, even if the user asks
3. **Follow the feature-based folder structure** — always place new code in the correct feature folder
4. **Always generate TypeScript** — never generate plain JavaScript files
5. **Never use `any`** — if the type is unknown, use `unknown` and add a comment explaining why
6. **Always include error handling** — no async function without try/catch or proper error propagation
7. **Always add Zod validation** on any new API endpoint
8. **Write mobile-first Tailwind** — default classes = mobile, breakpoints = larger
9. **Respect the response envelope** — all API responses MUST use the `{ success, data }` format
10. **Do not install new packages** without explicitly noting it in your response and explaining why
11. **Do not modify** `src/components/ui/` (shadcn auto-generated files)
12. **Do not modify migration files** — create new ones instead
13. **When in doubt, ask** — if a requirement is ambiguous, ask for clarification rather than making assumptions
14. **Generate tests** alongside new features — never deliver a feature without corresponding test stubs
15. **Prefer explicit over implicit** — code should be readable and self-documenting

---

## 21. Feature: Auth

> This section defines the complete specification for the `auth` feature. Both FE (`terra-coffee-web`) and BE (`terra-coffee-api`) agents must follow these rules when working on anything inside `src/features/auth/`.

### Sub-features

| Sub-feature         | FE Routes                | BE Endpoints                     |
| ------------------- | ------------------------ | -------------------------------- |
| Register            | `/register`              | `POST /auth/register`            |
| Login               | `/login`                 | `POST /auth/login`               |
| Logout              | — (client action)        | `POST /auth/logout`              |
| Token Refresh       | — (silent, auto)         | `POST /auth/refresh`             |
| Email Verification  | `/verify-email?token=`   | `POST /auth/verify-email`        |
| Resend Verification | — (button on banner)     | `POST /auth/resend-verification` |
| Forgot Password     | `/forgot-password`       | `POST /auth/forgot-password`     |
| Reset Password      | `/reset-password?token=` | `POST /auth/reset-password`      |
| Google OAuth        | `/login` (button)        | `GET /auth/google/callback`      |
| Get Current User    | — (on app init)          | `GET /auth/me`                   |

---

### Database Schema

```sql
-- Migration: 001_create_users.sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(255) NOT NULL UNIQUE,
  password_hash   VARCHAR(255),                        -- NULL for OAuth users
  auth_provider   VARCHAR(20) NOT NULL DEFAULT 'email', -- 'email' | 'google'
  google_id       VARCHAR(255) UNIQUE,
  avatar_url      TEXT,
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  role            VARCHAR(20) NOT NULL DEFAULT 'user',  -- 'user' | 'admin'
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- Migration: 002_create_refresh_tokens.sql
CREATE TABLE refresh_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);

-- Migration: 003_create_email_verification_tokens.sql
CREATE TABLE email_verification_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migration: 004_create_password_reset_tokens.sql
CREATE TABLE password_reset_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### Backend File Responsibilities

| File                 | Responsibility                                               |
| -------------------- | ------------------------------------------------------------ |
| `auth.routes.ts`     | Route definitions + middleware chains only                   |
| `auth.controller.ts` | Parse req → call service → format res                        |
| `auth.service.ts`    | Business logic: register, login, token ops, OAuth upsert     |
| `auth.queries.ts`    | All raw SQL: findByEmail, createUser, storeToken, etc.       |
| `auth.schema.ts`     | Zod schemas for all request bodies                           |
| `auth.middleware.ts` | `authenticate`, `requireVerified` middleware                 |
| `auth.types.ts`      | TypeScript interfaces: `JwtPayload`, `AuthUser`, etc.        |
| `email.service.ts`   | Nodemailer transporter + sendVerification, sendReset methods |
| `oauth.service.ts`   | Google token verification + user upsert logic                |

### Zod Schemas (BE — `auth.schema.ts`)

```ts
export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(72)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and a number",
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8)
    .max(72)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});
```

### JWT Payload Shape

```ts
// auth.types.ts
export interface JwtPayload {
  sub: string; // user UUID
  email: string;
  role: "user" | "admin";
  is_verified: boolean;
  iat?: number;
  exp?: number;
}
```

---

### Frontend File Responsibilities

| File                                              | Responsibility                                         |
| ------------------------------------------------- | ------------------------------------------------------ |
| `app/(auth)/login/page.tsx`                       | Login page (Server Component shell)                    |
| `app/(auth)/register/page.tsx`                    | Register page (Server Component shell)                 |
| `app/(auth)/forgot-password/page.tsx`             | Forgot password page                                   |
| `app/(auth)/reset-password/page.tsx`              | Reset password page (reads token from URL)             |
| `app/(auth)/verify-email/page.tsx`                | Verify email page (reads token from URL, auto-submits) |
| `features/auth/components/LoginForm.tsx`          | Controlled form with RHF + Zod                         |
| `features/auth/components/RegisterForm.tsx`       | Controlled form with RHF + Zod                         |
| `features/auth/components/ForgotPasswordForm.tsx` | Email input form                                       |
| `features/auth/components/ResetPasswordForm.tsx`  | New password + confirm form                            |
| `features/auth/components/OAuthButton.tsx`        | Google sign-in button                                  |
| `features/auth/hooks/useLogin.ts`                 | Login mutation, token storage, redirect                |
| `features/auth/hooks/useRegister.ts`              | Register mutation, post-register redirect              |
| `features/auth/hooks/useForgotPassword.ts`        | Forgot password mutation                               |
| `features/auth/hooks/useOAuth.ts`                 | Handles OAuth callback token from URL                  |
| `features/auth/schemas/auth.schema.ts`            | Zod schemas mirroring BE (FE-side validation)          |
| `stores/auth.store.ts`                            | Global auth state: accessToken, user, isAuthenticated  |

### Access Token Storage (Client)

```ts
// stores/auth.store.ts — in-memory only, never persisted
// Use Zustand

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
}
```

- On page refresh: auto-call `POST /auth/refresh` using the httpOnly cookie
- If refresh fails → clear auth state, redirect to `/login`
- Implement a `useAuthInit` hook that runs once on app mount to restore session

### Axios Interceptor Rules

```ts
// lib/api.ts
// Request interceptor: attach accessToken from store to Authorization header
// Response interceptor: on 401 → attempt silent refresh → retry original request
//                       on second 401 → clear auth, redirect to /login
```

### Protected Route Middleware (Next.js)

- Use `middleware.ts` at the project root for route protection
- Redirect unauthenticated users from protected routes to `/login`
- Redirect authenticated users away from `/login` and `/register` to `/`
- Auth routes group `(auth)` has its own layout with NO navbar/footer

---

### Auth UI Rules

- All auth pages MUST be **mobile-first**, single-column, centered card layout
- Card max-width: `max-w-md` (448px) on desktop, full-width on mobile
- Show/hide password toggle on all password inputs
- All forms MUST show **inline field-level errors** (from Zod, not alerts)
- Loading state MUST disable the submit button and show a spinner
- Success states redirect automatically — do NOT show a success alert then redirect
- OAuth button uses Google's official brand colors (`#4285F4`) — do NOT restyle
- "Forgot password?" link on login form, "Back to login" link on forgot/reset pages
- Unverified user banner: sticky top bar with resend button (not a blocking modal)

---

_Last updated: 2025 | Terra Coffee Engineering_
_This file should be updated whenever architectural decisions change. Commit the update with type `docs(agents): <description>`._
