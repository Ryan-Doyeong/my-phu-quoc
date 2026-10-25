# Staff access only

Good life in Phu Quoc no longer provides public member registration.

Public visitors:
- browse businesses, news, events and Impact without an account
- submit a business without logging in
- submit community suggestions and volunteer applications without logging in
- subscribe to the email magazine without creating an account

Staff login:
- `/login`
- Admin / Owner roles can use `/admin`
- Editor role can use `/editor`

Staff accounts must be created privately in Supabase Authentication and their `public.profiles.role` must be one of:
- `editor`
- `admin`
- `owner`

The website authentication API accepts sign-in only. Public sign-up requests are rejected.

For a complete platform-level lock, disable new user signups in Supabase Authentication settings after confirming all staff accounts exist.
