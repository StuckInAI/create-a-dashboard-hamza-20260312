# Admin Dashboard

A modern admin dashboard built with Next.js 14, TypeORM, SQLite, Tailwind CSS, and Recharts.

## Features

- 📊 Dashboard with stats cards, charts, and activity table
- 🗄️ SQLite database with TypeORM
- 🎨 Clean UI with Tailwind CSS
- 📈 Interactive charts with Recharts (line/bar toggle)
- 🚀 Docker support for easy deployment

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TypeORM** with SQLite (better-sqlite3)
- **Tailwind CSS**
- **Recharts**

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install dependencies
npm i

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Seed the Database

The database auto-seeds on first run. To manually seed:

```bash
npm run seed
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Seed the database with mock data |
| `npm run lint` | Run ESLint |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stats` | GET | Dashboard statistics |
| `/api/activities` | GET | Recent activities (latest 20) |
| `/api/users` | GET | All users |

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_PATH=./dashboard.sqlite
NEXT_PUBLIC_APP_NAME=Admin Dashboard
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Using Docker directly

```bash
# Build the image
docker build -t admin-dashboard .

# Run the container
docker run -d \
  -p 3000:3000 \
  -v dashboard_data:/app/data \
  -e DATABASE_PATH=/app/data/dashboard.sqlite \
  --name admin-dashboard \
  admin-dashboard
```

### Coolify Deployment

1. Push your code to a Git repository
2. In Coolify, create a new service and select "Docker Compose"
3. Point to your repository
4. Coolify will use the `docker-compose.yml` file automatically
5. Set the environment variables in Coolify's interface
6. Deploy!

The SQLite database is persisted in a Docker volume (`dashboard_data`) for data persistence across container restarts.

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Dashboard page
│   └── globals.css   # Global styles
├── components/       # React components
├── entities/         # TypeORM entities
├── lib/              # Database connection
└── seed/             # Database seeder
```
