# lyrebird

## Setup

For best experience, use google chrome. I had trouble with chromium and firefox.

1. npm install
2. npx auth secret
3. add AUTH_URL to .env/.env.local
4. add DATABASE_URL to .env (neondb)
5. npm run db:generate
6. npm run db:migrate
7. npm run dev

## Solution

- Used Next.js for both frontend and backend
- Used drizzle orm with adapter for authentication with auth.js
- zustand for state management
- shadcn and tailwind for styling
- react speech recognition for speech to text transcription
