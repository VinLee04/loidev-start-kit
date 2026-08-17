<div align="center">

# Lợi Dev Start Kit

A free, end-to-end TanStack Start starter - auth, database, forms, and UI already wired up, ready to clone and extend.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Built with TanStack Start](https://img.shields.io/badge/Built%20with-TanStack%20Start-FF4154?logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://start.vinhloi.tech)

**[Live Demo](https://start.vinhloi.tech)**

A community starter built on TanStack Start.

**by Lợi Dev** - [vinhloi.tech](https://vinhloi.tech)

</div>

---

## 📖 About

This is an **unofficial, community-made** starter project built with **TanStack Start**, meant to be cloned and adapted for your own projects. It is not affiliated with or endorsed by the TanStack team. Every piece of the stack - from local development to production deployment - runs entirely on **free tiers**, no paid service required.

## ✨ Current Features

- ✅ Email sign up - send otp via email after sign up successfully (manual/auto verify otp)
- ✅ Email sign in - email verification (require)
- ✅ Profile page displaying account information
- ✅ Auto-generated avatar on sign up (via [DiceBear](https://www.dicebear.com/))
- ✅ Responsive header - shows **Sign in / Sign up** buttons when logged out, and an avatar dropdown (Profile / Sign out) when logged in
- ✅ Light / Dark / System theme switch
- ✅ Route protection for authenticated pages (profile)
- ✅ Session caching synced between server and client via TanStack Query
- ✅ Basic send email with Resend

### Pages

| Route       | Description              |
| ----------- | -------------------------|
| `/`         | Home page                |
| `/sign-in`  | Sign in                  |
| `/sign-up`  | Sign up                  |
| `/profile`  | User profile (protected) |

## 🧱 Tech Stack

| Category | Tools |
| --- | --- |
| **Framework** | [TanStack Start](https://tanstack.com/start) |
| **Routing / Data Fetching** | [TanStack Router](https://tanstack.com/router) + [TanStack Query](https://tanstack.com/query) |
| **Forms** | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/) |
| **Tables** | [TanStack Table](https://tanstack.com/table) *(not used yet)* |
| **UI** | [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) |
| **Database ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) on [Neon](https://neon.tech/) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) |
| **Linting / Formatting** | ESLint, Prettier |
| **Git Hooks** | Husky + commitlint + lint-staged |
| **Send Email** | [Resend](https://resend.com/emails) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- A free [Neon](https://neon.tech/) PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/VinLee04/loidev-start-kit.git
cd loidev-start-kit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

See the [Environment Variables](#-environment-variables) section below for how to obtain each value.

### 4. Push the database schema

```bash
npm run db:push
```

This syncs the schema defined in `src/db/schema/` directly to your Neon database - the fastest way to get started. See [Database](#️-database) below for details on the migration workflow.

### 5. Run the dev server

```bash
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## 🔑 Environment Variables

Make user you copied `.env.example` to `.env`, [open it](.env) and fill in the following:

| Variable | Description | How to get it |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | Go to [neon.new](https://neon.new/) → create a free project → **Connect** → copy the connection string shown there |
| `BETTER_AUTH_URL` | Base URL of your app | `http://localhost:3000` for local dev; your deployed domain in production |
| `BETTER_AUTH_SECRET` | Secret key used to sign sessions | Run `npx -y @better-auth/cli secret` and paste the generated value |
| `RESEND_API_KEY` | Sending emails | Optional, if left blank, the app still runs but emails won't be sent (a warning is logged) |
| `EMAIL_FROM` | Sender name/address shown in emails | Optional, defaults to Resend's test address if left blank |
| `APP_NAME` | Sender display name shown in outgoing emails | Optional, default blank |
| `APP_LOGO_URL` | Logo image URL shown in outgoing emails | Optional, default blank |

> Never commit your `.env` file. Only `.env.example` (with placeholder values) should be tracked by Git. -->

---

> **⚠️ Resend sandbox limitation:** Without a verified custom domain,
> `onboarding@resend.dev` can only send emails to the address you used to
> sign up for Resend, sending to any other address will fail with a 403
> error. To send to any recipient, [verify your own domain](https://resend.com/docs/dashboard/domains/introduction).

---

## 🗄️ Database

This project uses **Drizzle ORM** with schema files under `src/db/schema/`.

### Quick sync (development)

Push the current schema straight to your database - no migration files generated:

```bash
npm run db:push
```

### Adding a Better Auth plugin

When you enable a new [Better Auth plugin](https://www.better-auth.com/docs/plugins) (e.g. `captcha`, `passkey`, `emailOTP`, `twoFactor`,...), regenerate the auth schema file, then sync it to the database:

```bash
# 1. Regenerate the schema based on your Better Auth config
npx auth@latest generate --output src/db/schema/auth.ts

# 2. Push the updated schema to your database
npm run db:push
```

### Modifying schema files manually

If you edit any file inside `src/db/schema/` by hand (adding a column, a new table, a relation...), sync the change the same way:

```bash
npm run db:push
```

### Other useful commands

| Command | Description |
| --- | --- |
| `npm run db:generate` | Generate SQL migration files from schema changes |
| `npm run db:migrate` | Apply generated migration files to the database |
| `npm run db:pull` | Introspect the database and generate a schema from it |
| `npm run db:studio` | Open [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) to browse your data |

---

## 📦 Working with shadcn/ui

Add new components using the shadcn CLI:

```bash
npx shadcn@latest add button
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com/).

💡 Install the [shadcn/ui](https://marketplace.visualstudio.com/items?itemName=SuhelMakkad.shadcn-ui) and [shadcn/ui snippets](https://marketplace.visualstudio.com/items?itemName=VeroXyle.shadcn-ui-snippets)  VS Code extensions to get code suggestions and write shadcn code faster.

---

## 🌐 Deployment

The demo above is deployed on **[Vercel](https://vercel.com/)**, completely free.

To deploy your own copy:

1. Push your repository to GitHub.
2. Import it on [Vercel](https://vercel.com/new).
3. Add the same environment variables listed [above](#-environment-variables) in your Vercel project settings.
4. Deploy - see the official [Vercel × TanStack Start guide](https://vercel.com/docs/frameworks/full-stack/tanstack-start) for details.

This project uses **Nitro** as a generic server adapter, so it isn't locked to Vercel - it can run on any Node-compatible host (Render, Fly.io, a VPS...):

```bash
npm run build
node dist/server/index.mjs
```

For other host-specific presets (Netlify, Cloudflare, AWS Lambda, etc.), see the [Nitro deployment docs](https://v3.nitro.build/deploy).

---

## 📝 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/), enforced automatically via **Husky + commitlint + lint-staged**.

```text
<type>(<scope>): <description>
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

Custom scopes are defined in [`.vscode/settings.json`](./.vscode/settings.json):

```json
"conventionalCommits.scopes": ["auth", "profile", "form", "..."]
```

💡 Install the [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) VS Code extension for a guided commit message prompt.

---

## 📚 Learn More

This README intentionally doesn't repeat framework basics (routing, server functions, data loading...) - the official docs are kept up to date and are the best source of truth:

- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [TanStack Form Documentation](https://tanstack.com/form)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Better Auth Documentation](https://www.better-auth.com/)
- [Neon Documentation](https://neon.tech/docs)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
