# Funny Movies

Funny Movies is a movie sharing site. You can register an account and share movies you like instantly. All your shared movies will be listed in the homepage.

## Introduction

### Key Features
- Sign Up & Sign In
- Youtube video sharing
- Youtube videos listing
- Realtime notification once shared video successfully

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Dockerj

## Installation & Configuration

1. Clone the repository:
```bash
git clone https://github.com/mingo023/remitano-youtube-sharing
cd remitano-youtube-sharing
```

2. Frontend Setup (app directory):
```bash
cd app
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

3. Backend Setup (api directory):
```bash
cd api
docker-compose up -d
```

### Environment Variables

Frontend (.env):
```
VITE_API_URL=http://localhost:3000
```

Backend (.env):
```
DATABASE_CONNECT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=remi-backend
DATABASE_SSL=false
YOUTUBE_API_KEY=
```

## Testing

### Backend Tests
```bash
cd api
npm run test:e2e    # E2E tests
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

2. **Frontend API Connection**
   - Verify VITE_API_URL matches backend URL
   - Check CORS settings in backend

3. **Youtube API Key**
   - Ensure YOUTUBE_API_KEY is set in .env

4. **Node Version Mismatch**
   - Use nvm to switch to the correct Node version:
     ```bash
     nvm use 22
     ```

## Tech Stack

- **Frontend**
  - React 19
  - TypeScript
  - Vite
  - TailwindCSS
  - React Query
  - Socket.IO Client

- **Backend**
  - NestJS
  - TypeScript
  - TypeORM
  - PostgreSQL
  - Socket.IO
  - Passport JWT

## License

This project is licensed under the UNLICENSED license. 
