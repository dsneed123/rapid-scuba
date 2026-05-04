# RapidScuba

Marketing site + lead-capture backend for RapidScuba (Seattle underwater hull
cleaning, prop polishing, inspections).

- **Frontend** — React 19 + Vite + TypeScript SPA in `src/`.
- **Backend** — Django 5 in `backend/`. Stores customer inquiries and exposes
  them in the Django admin. Serves the built React SPA in production.
- **Deploy** — Single Digital Ocean App Platform service. See `.do/app.yaml`.

## Local development

Two terminals.

**Backend:**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env                  # edit if needed; defaults are fine for dev
python manage.py migrate
python manage.py createsuperuser      # for the admin panel
python manage.py runserver            # http://127.0.0.1:8000/admin/
```

**Frontend:**

```bash
npm install
npm run dev                           # http://localhost:5173
```

The Vite dev server proxies `/api`, `/admin`, and `/static` to the Django
backend on `127.0.0.1:8000`, so form submits and the admin panel both work
through `http://localhost:5173`.

## Where inquiries land

Two models in the `inquiries` app, both registered in the Django admin
(`/admin/inquiries/`):

- **Contact inquiries** — submitted from `/contact` (free-quote form).
- **Booking requests** — submitted from the structured booking form.

Each row has a workflow `status` field (new / contacted / scheduled /
completed / archived), a `staff_notes` text field, and audit metadata
(IP, user-agent, timestamps). The admin list view supports filtering,
search, and inline status editing.

When `INQUIRY_NOTIFY_TO` is set and SMTP env vars are configured, every new
submission also fires an email notification with a link back to the admin
record.

## API endpoints

| Method | Path                | Body                                  |
| ------ | ------------------- | ------------------------------------- |
| POST   | `/api/inquiries/`   | `ContactInquiryPayload` (see `src/lib/api.ts`) |
| POST   | `/api/bookings/`    | `BookingRequestPayload`               |
| GET    | `/api/health/`      | —                                     |

Successful submission returns `201 { "id": <int>, "status": "received" }`.
Validation errors return `400 { "errors": { "<field>": "<message>" } }`.

## Production build (single service)

```bash
npm run build                         # writes dist/
cd backend
python manage.py collectstatic --noinput
gunicorn rapidscuba.wsgi:application --bind 0.0.0.0:8000
```

Django serves:

- `/admin/` — Django admin panel
- `/api/...` — JSON endpoints
- `/static/...` — Django admin assets (via WhiteNoise)
- everything else — the React SPA from `dist/`

## Deploy to Digital Ocean App Platform

1. Push the repo to GitHub.
2. Edit `.do/app.yaml` — set `github.repo` to your repo slug and adjust the
   region / instance size if needed.
3. Provision the app:
   ```bash
   doctl apps create --spec .do/app.yaml
   ```
   Or paste the spec into the DO control panel: **Apps → Create App → Edit Spec**.
4. Set the secret env vars in the DO console (marked `type: SECRET` in the
   spec): `DJANGO_SECRET_KEY`, `EMAIL_HOST`, `EMAIL_HOST_USER`,
   `EMAIL_HOST_PASSWORD`.
5. Once the first deploy succeeds, create a superuser:
   ```bash
   doctl apps console <app-id> --component web
   cd backend && python manage.py createsuperuser
   ```
6. Visit `https://<your-app>.ondigitalocean.app/admin/` to log in.

The build script (`backend/build.sh`) runs `npm run build` first to produce
`dist/`, then installs Python deps and collects static. Migrations run on
each deploy via the `run_command` in the spec.

## Required env vars

See `backend/.env.example` for the full list.

| Var                            | Required | Notes                                   |
| ------------------------------ | -------- | --------------------------------------- |
| `DJANGO_SECRET_KEY`            | yes      | Long random string                      |
| `DJANGO_DEBUG`                 | yes      | `False` in prod                         |
| `DJANGO_ALLOWED_HOSTS`         | yes      | Comma-separated hostnames               |
| `DATABASE_URL`                 | yes      | Postgres URL on DO; SQLite if unset     |
| `DJANGO_CORS_ALLOWED_ORIGINS`  | yes      | Origins allowed to POST to the API      |
| `DJANGO_CSRF_TRUSTED_ORIGINS`  | yes      | Hosts whose POSTs to admin are trusted  |
| `INQUIRY_NOTIFY_TO`            | no       | Empty disables email notifications      |
| `EMAIL_HOST` and friends       | no       | Required only if `INQUIRY_NOTIFY_TO` is set |
