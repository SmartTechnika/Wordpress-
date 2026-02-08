# Smart Technika CRM

Production-ready MVP for a technical services CRM built with Next.js 14, Prisma, and NextAuth.

## Features
- Credential-based authentication with roles (ADMIN, EMPLOYEE).
- Admin-only user management.
- Customer and job tracking dashboards.
- Role-aware job visibility (admins see all jobs, employees see assigned jobs).

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- NextAuth (Credentials provider)
- React Hook Form + Zod

## Getting Started

  ## Installation issues (npm 403)

If you encounter `npm install` → `403 Forbidden`:

1. Run:
   npm config set registry https://registry.npmjs.org/

2. Logout and login again:
   npm logout
   npm login

3. Ensure there is no `.npmrc` pointing to GitHub registry.

Alternatively, use:
   pnpm install
   pnpm dev ```

## Notes
- Create the first admin user by inserting directly into the database or using Prisma Studio.
- Passwords must be hashed; use bcrypt.
