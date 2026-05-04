# Projex

React + TypeScript frontend with a Python FastAPI backend. The API can run with seeded in-memory data for local development, or with Supabase Postgres when environment variables are configured.

## Frontend

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` if the API is not running at `http://localhost:8000`.

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Without Supabase credentials, it uses the seeded in-memory data from `backend/app/seed.py`.

## Supabase

1. Create a Supabase project.
2. Run `backend/schema.sql` in the Supabase SQL editor.
3. Copy `backend/.env.example` to `backend/.env`.
4. Fill in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

