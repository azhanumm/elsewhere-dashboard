# Production migration history

Files ending in `_remote_history_marker.sql` mirror migration versions that already existed in the Elsewhere Production project before this repository adopted Supabase CLI deployment. They are intentionally empty and prevent old Production history from being treated as missing.

New database changes must be added as a new migration. Never edit an already-applied migration. The native Supabase GitHub integration applies pending migrations to Production after changes are merged into `main`.

Fresh projects still require the documented bootstrap process in `supabase/bootstrap/README.md` before these commerce migrations are applied.
