# Skill Library Dashboard

Visual dashboard for the Cold Lava agent fleet skill library.

## Structure

This repo contains both the dashboard app AND the skill data:

```
skill-library-dashboard/
├── app/                    # Next.js app
├── skills/                 # Skill library (auto-synced from server)
│   ├── agency-templates/
│   ├── clawdbot-core/
│   ├── cold-lava-custom/
│   └── INDEX.md
└── ...
```

## Features

- 🔍 **Search & Filter** — Find skills by name, description, or agent
- 📊 **Visual Cards** — Highland deck aesthetic with corner brackets
- 📖 **Detail View** — Click any skill to view full SKILL.md and README.md
- 🎨 **Cold Lava Design** — Exact Highland deck patterns (cyan accent, mono labels, corner brackets)
- ⚡ **Fast** — Reads from local `/skills/` directory at build time

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS** + Highland deck CSS patterns
- **React Markdown** for rendering skill documentation

## Deployment

**GitHub → Vercel automatic deployment:**

1. Skills are synced from `/home/moltbot/skill-library/` to this repo
2. Push triggers automatic Vercel deployment
3. Dashboard updates with latest skills

### To Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **coldlavaai/skill-library-dashboard**
3. Click Deploy

Vercel will auto-deploy on every push.

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## How It Works

1. **Skills Directory** (`/skills/`) contains all skill categories
2. **API Route** (`/api/skills`) reads from `/skills/` at request time
3. **Main Page** displays skills in a searchable grid
4. **Modal** shows full SKILL.md and README.md content

## Updating Skills

Skills are auto-synced from the fleet server. To update:

```bash
# On the fleet server:
~/skillforge-bot/scripts/sync-skill-library.sh
```

This copies skills to the repo and pushes to GitHub, triggering auto-deployment.

## Design System

Follows **Highland Marketing Deck** patterns exactly:
- Colors: #030305 background, #06B6D4 cyan accent
- Fonts: Inter (body), JetBrains Mono (labels/data)
- Components: arch-box (4-corner brackets), card (2-corner brackets), investment badge
- Typography: clamp() responsive sizing, negative letter-spacing on headings
- Spacing: 6rem section padding, 960px max-width

## License

MIT
