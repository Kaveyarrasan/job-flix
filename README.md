# Job Portal (Netflix UI) - Production Ready

A full-stack job portal with a Netflix-style scrolling interface, built for zero-cost hosting.

## 🚀 Free Tier Stack
- **Backend**: FastAPI (Python)
- **Frontend**: React + Tailwind CSS
- **Database**: Supabase (PostgreSQL Free Tier)
- **Auth**: Supabase Auth
- **Deployment**: Vercel (Frontend), Render (Backend)

## 📂 Project Structure
- `/backend`: FastAPI source code, models, and API routes.
- `/frontend`: React source code with Tailwind CSS configurations.
- `.env.example`: Template for required environment variables.

## 🛠️ Getting Started
1. **Database Setup**: Create a free project on [Supabase](https://supabase.com).
2. **Environment Variables**: Copy `.env.example` to `.env` and fill in your Supabase credentials.
3. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
4. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
