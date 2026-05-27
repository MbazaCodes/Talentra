# Talentra — Connecting Talent to Opportunity

Tanzania's smarter job network. Browse thousands of jobs in tourism, ICT, finance, healthcare, agriculture and more — in English & Kiswahili.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **TanStack Router** (file-based routing) + **TanStack Query**
- **Supabase** (auth, database, storage)
- **Tailwind CSS v4** + **shadcn/ui**
- **React Hook Form** + **Zod**
- Deployed on **Vercel** (or Cloudflare Workers via Wrangler)

## Getting started

### 1. Clone & install

```bash
git clone https://github.com/MbazaCodes/Talentra.git
cd Talentra
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 3. Run database migrations

```bash
npx supabase db push
# or apply migrations manually in the Supabase dashboard
```

### 4. Development

```bash
npm run dev
```

### 5. Production build

```bash
npm run build
```

## Deployment

### Vercel

1. Import the repo into Vercel
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Environment Variables
3. Deploy — the `vercel.json` handles SPA routing and security headers automatically

### Cloudflare Workers

```bash
npx wrangler deploy
```

## Features

- **Job seekers**: Browse, filter, save and apply to jobs; manage profile and resume
- **Employers**: Post jobs with a 4-step wizard; manage applications via dashboard
- **Admin**: Moderation console — verify employers, feature/close jobs, handle reports
- **Bilingual**: English ↔ Kiswahili language toggle
- **Mobile-first**: Responsive design with mobile bottom navigation

## Security notes

- Row Level Security (RLS) enabled on all Supabase tables
- Admin routes redirect non-admin users
- Auth-required routes redirect unauthenticated users
- Security headers configured in `vercel.json`
- No secrets are committed — always use environment variables
