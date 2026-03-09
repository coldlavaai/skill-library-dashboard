# Skill Library Dashboard

Visual dashboard for the Cold Lava agent fleet skill library.

## Features

- 🔍 **Search & Filter** — Find skills by name, description, or agent
- 📊 **Visual Cards** — See all skills at a glance with corner brackets
- 📖 **Detail View** — Click any skill to view full SKILL.md and README.md
- 🎨 **Cold Lava Design** — Cyan accent, dark surfaces, grain overlay, Inter + JetBrains Mono
- ⚡ **Fast** — Static generation with Next.js 16

## Design Standard

Follows the **Cold Lava Design Standard** exactly:
- **Colors:** Dark background (#030305), cyan accent (#06B6D4), opacity scale
- **Fonts:** Inter (body/headings), JetBrains Mono (labels/data/nav)
- **UI:** Corner brackets on cards (signature pattern), grain overlay, 960px max-width
- **Typography:** Tight headings, wide labels, mono for system elements

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS**
- **React Markdown** for rendering skill documentation

## Deployment

### To Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **coldlavaai/skill-library-dashboard** from GitHub
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Deploy!

**Important:** The API route reads from `/home/moltbot/skill-library/` on the server. Make sure the deployment environment has access to this path OR update `SKILL_LIBRARY_PATH` in `app/api/skills/route.ts` to point to a mounted volume or environment variable.

### Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## How It Works

1. **API Route** (`/api/skills`) reads all skill directories from `/home/moltbot/skill-library/`
2. **Main Page** fetches skills from API and displays them in a searchable grid
3. **Skill Cards** show summary info (name, description, agents, status)
4. **Skill Modal** displays full SKILL.md and README.md content when you click a card

## Updating Skills

The dashboard auto-reads from the skill library directory. To add/update skills:

1. Add or modify skills in `/home/moltbot/skill-library/`
2. Update `/home/moltbot/skill-library/INDEX.md` (optional, for metadata)
3. Refresh the dashboard — changes appear immediately

No rebuild or redeploy needed (unless running static generation).

## License

MIT
