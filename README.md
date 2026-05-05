# Mohamed Bouliani — Cinematic Portfolio

A full-stack multilingual portfolio built with **Next.js 16**, **Supabase**, and **Tailwind CSS v4**. Features a cinematic dark aesthetic, full admin panel, and i18n support (FR / EN / AR).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Database & Storage | Supabase (PostgreSQL + Storage) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Language | TypeScript |
| i18n | Custom (FR / EN / AR with RTL support) |

---

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd cinematic-portfolio
npm install
```

### 2. Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> **Note:** `SUPABASE_SERVICE_ROLE_KEY` is used server-side only (admin actions). Never expose it client-side.

### 3. Database Setup

Run the full migration in your **Supabase SQL Editor**:

1. Go to [Supabase Dashboard](https://app.supabase.com) → your project → **SQL Editor**
2. Copy and paste the contents of [`scripts/migrate-full.sql`](./scripts/migrate-full.sql)
3. Click **Run**

This script is **idempotent** — safe to run multiple times. It will:
- Create all tables (`projects`, `categories`, `site_settings`, `contact_messages`)
- Add any missing columns to existing tables
- Enable Row Level Security with permissive policies
- Insert default categories
- Create the `portfolio_media` storage bucket with public read access

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/fr` (default locale).

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # All public pages (fr, en, ar)
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── work/
│   │   │   ├── [slug]/    # Project detail
│   │   │   └── category/[category]/
│   │   ├── contact/
│   │   ├── photography/
│   │   ├── videos/
│   │   └── audio/
│   ├── admin/             # Admin panel (no locale)
│   │   ├── page.tsx       # Dashboard
│   │   ├── projects/      # CRUD projects
│   │   ├── categories/    # Manage categories
│   │   ├── home/          # Edit homepage content
│   │   ├── about/         # Edit about page
│   │   ├── contact/       # Edit contact info
│   │   ├── messages/      # View contact messages
│   │   └── settings/      # General settings
│   └── page.tsx           # Root → redirects to /fr
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── AboutImage.tsx
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── config.ts          # Locales: fr, en, ar
│   ├── getDictionary.ts
│   └── dictionaries/
│       ├── fr.json
│       ├── en.json
│       └── ar.json
└── lib/
    ├── data.ts            # Supabase read functions
    ├── types.ts           # TypeScript interfaces
    └── supabase/
        └── client.ts
```

---

## Admin Panel

Access the admin panel at `/admin`. Features:

| Section | URL | Description |
|---------|-----|-------------|
| Dashboard | `/admin` | Overview stats & recent projects |
| Projects | `/admin/projects` | Create, edit, delete projects |
| Edit Project | `/admin/projects/[id]` | Full project editor with media upload |
| Categories | `/admin/categories` | Manage project categories |
| Home Page | `/admin/home` | Hero text, video, image, stats, services |
| About Page | `/admin/about` | Bio text & portrait image |
| Contact Info | `/admin/contact` | Email, phone, social links |
| Messages | `/admin/messages` | View contact form submissions |
| Settings | `/admin/settings` | Footer text & config overview |

---

## Internationalization

The site supports three locales:

| Locale | Language | Direction |
|--------|----------|-----------|
| `fr` | Français | LTR (default) |
| `en` | English | LTR |
| `ar` | العربية | RTL |

The default locale is `fr`. The root `/` redirects to `/fr`.

Legacy non-locale URLs (e.g. `/about`, `/work`) automatically redirect to the default locale equivalent.

---

## Database Schema

### `projects`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Project title |
| subtitle | text | Short tagline |
| category | text | Category name |
| slug | text | URL slug (unique) |
| description | text | Full description |
| problem | text | Case study: challenge |
| solution | text | Case study: solution |
| result | text | Case study: outcome |
| cover_image | text | Cover image URL |
| gallery | text[] | Gallery image URLs |
| video_url | text | Video file URL |
| audio_url | text | Audio file URL |
| tags | text[] | Role/service tags |
| tools | text[] | Tools used |
| is_featured | boolean | Show on homepage |
| created_at | timestamptz | Creation date |

### `categories`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Category name (unique) |
| slug | text | URL slug |
| parent_id | uuid | Parent category (nullable) |
| created_at | timestamptz | Creation date |

### `site_settings`
Single-row table (id=1) controlling all homepage and site-wide content.

### `contact_messages`
Stores contact form submissions with read/unread status.

---

## Media Storage

All media is stored in the `portfolio_media` Supabase Storage bucket:

```
portfolio_media/
├── projects/
│   └── {slug}/
│       ├── cover_{timestamp}_{filename}
│       ├── video_{timestamp}_{filename}
│       └── audio_{timestamp}_{filename}
└── settings/
    ├── hero_video.mp4
    ├── hero_image.{ext}
    └── about_{timestamp}_{filename}
```

---

## Build

```bash
npm run build
npm start
```

---

## Environment Notes

- The build will succeed even if Supabase is unreachable — all data fetches have graceful fallbacks.
- Run `scripts/migrate-full.sql` in Supabase to fix any "column does not exist" or "table not found" errors seen during static generation.
