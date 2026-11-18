# Deployment checklist — v8.4

- Use Hostinger Web App / Node.js deployment.
- Node.js 22.x.
- Let Hostinger detect Next.js build/start commands.
- No environment variables required.
- Do not add `GOOGLE_PLACES_API_KEY` or `GOOGLE_MAPS_API_KEY` (permanently prohibited — unavailable in Vietnam; `next.config.ts` hard-blocks startup/build if set).
- After deployment, test Home, Blog & News, a category page, a business detail page, Admin login and Editor login.
