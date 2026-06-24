# AI App Builder Academy

A starter app for a platform that teaches people how to build real apps using AI as leverage, not by pretending AI doesn't exist.

## What this is

AI App Builder Academy is a learning platform for modern builders. It teaches:

- how to plan app architecture
- how to use Claude/ChatGPT as engineering leverage
- how to structure prompts for codebases
- how to ship with GitHub
- how to deploy with Railway
- how to debug with logs and environment variables
- how to build real products instead of tutorial sludge

## Stack

- Vite
- React
- React Router
- CSS
- Lucide icons

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (hot reload) on http://localhost:5173
```

Other scripts:

```bash
npm run build    # produce a production build in dist/
npm run preview  # locally preview the production build
npm start        # production server: vite preview --host 0.0.0.0 --port $PORT
```

Routes:

- `/` — homepage (curriculum, playbook, tools)
- `/modules/:slug` — module detail page

## Deploy with Railway

This app deploys to [Railway](https://railway.app) as a static Vite build served by `vite preview`.

1. Push this repo to GitHub.
2. In Railway, create a new project → **Deploy from GitHub repo** and pick this repo.
3. Railway auto-detects Node and runs:
   - **Build:** `npm run build`
   - **Start:** `npm start` (`vite preview --host 0.0.0.0 --port $PORT`)
4. Railway injects a `$PORT` environment variable at runtime — the `start` script binds to it, and `--host 0.0.0.0` makes the server reachable inside the container. Do **not** hardcode a port.
5. Once the first deploy succeeds, open the generated Railway domain (or attach a custom domain under **Settings → Networking**).

Notes:

- `npm run build` must succeed for the deploy to go live — check the Railway build logs if a deploy fails.
- Use the Railway **Deployments → Logs** tab to read runtime output (the same way you'd debug locally).

## Environment variables

Copy `.env.example` to `.env` for local work, and set values in the Railway dashboard (**Variables**) for production:

```bash
cp .env.example .env
```

| Variable       | Purpose                                                                      |
| -------------- | ---------------------------------------------------------------------------- |
| `DATABASE_URL` | Pooled connection string for the app's database (used by a future data layer). |
| `DIRECT_URL`   | Direct (non-pooled) connection string, for migrations/admin tasks.           |

These are placeholders for upcoming work — there is **no database code wired in yet**. `.env` is gitignored, so never commit real secrets. `$PORT` is provided by Railway automatically and does not belong in `.env`.

## Claude repo-intake prompt

Paste this into Claude after opening the repo:

```txt
Read this repo and explain the app structure. Then suggest the next 5 product features to build. Do not edit files yet.
```

## Product direction

This should become a course + tool platform with modules like:

1. Idea to architecture
2. Database planning
3. AI-assisted coding workflow
4. GitHub workflow
5. Deployment with Railway
6. Debugging production issues
7. Building payments
8. Building auth
9. Shipping the MVP
