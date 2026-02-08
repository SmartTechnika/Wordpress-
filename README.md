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

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run Prisma migrations and generate the client:
   ```bash
   npm run prisma:migrate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Notes
- Create the first admin user by inserting directly into the database or using Prisma Studio.
- Passwords must be hashed; use bcrypt.
