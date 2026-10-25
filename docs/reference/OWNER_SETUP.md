# Owner / Editor account setup

Public registration is disabled. Create staff accounts privately in Supabase Authentication.

1. Create the staff user in Supabase Authentication → Users.
2. Confirm the email or create it as confirmed.
3. In `public.profiles`, set the role:
   - `owner` — full access
   - `admin` — admin access
   - `editor` — Editorial Studio access
4. Staff signs in at `/login`.

Example role update:
```sql
update public.profiles set role='owner' where email='YOUR_EMAIL';
```

Do not create public member accounts. Business owners submit listings without logging in.
