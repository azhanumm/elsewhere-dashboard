# Deploy note for Elsewhere dashboard

## Repo / branch
- Fork: https://github.com/azhanumm/elsewhere-dashboard.git
- Current branch: landing-dashboard-integration
- Deploy target: Vercel

## Required environment variables
Set these in Vercel Project Settings > Environment Variables:

- VITE_SUPABASE_URL=https://ousvoecocjewzqnznnlw.supabase.co
- VITE_SUPABASE_PUBLISHABLE_KEY=<copy from Supabase Project Settings > API Keys>
- VITE_WHATSAPP_NUMBER=6287890345028

Optional if used elsewhere:
- VITE_APP_ENV=production

## Build settings
- Framework preset: Vite / custom
- Build command: npm run build:vercel
- Output directory: dist-vercel
- Node version: 22.13+

## Deploy checklist
1. Push branch to fork.
2. Import repo into Vercel.
3. Set the env vars above.
4. Deploy production.
5. Make sure the Vercel project points to the same Supabase project.
6. Set Supabase Auth redirect URLs to the production domain.

## Database / Supabase check
Before production checkout works, run the latest migration files in Supabase SQL Editor in order.
This repo already documents the required migration sequence in [DEPLOY.md](DEPLOY.md).

If the frontend starts throwing `Could not find the function public.commerce_*`, it means the live Supabase project is still on an older schema.
In that case, run the migration files again in order and then execute:

```sql
NOTIFY pgrst, 'reload schema';
```

## Post-deploy validation
- Open `/` catalog page
- Open `/dashboard`
- Select an active trip
- Ensure product can be published and variants are visible
- Test a preorder flow
- Confirm payment proof flow works
- Check that invalid variant combinations are disabled

## Important
- Do not use the service-role key in frontend env vars.
- Do not overwrite the production Supabase project with a different project URL.
- Keep the auth redirect URL aligned to the live domain.
- If a payment / RPC error appears, re-check the Supabase schema and migration status first.
