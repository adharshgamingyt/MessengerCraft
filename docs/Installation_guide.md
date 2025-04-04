# MessengerCraft Installation Guide

This guide covers how to set up and run the MessengerCraft app, which is built with Next.js and uses Bun as both its JavaScript/TypeScript runtime and package manager with Drizzle ORM for Neon PostgreSQL.

## Prerequisites

Before installing MessengerCraft, make sure you have the following installed on your system:

- **Bun** (version 1.2.0 or later)
- **Git**
- **Neon PostgreSQL Account** (Free tier available at https://neon.tech)

## Installation Steps

### 1. Install Bun

If you haven't installed Bun yet:

```bash
# For macOS, Linux, and WSL
curl -fsSL https://bun.sh/install | bash

# For Windows (via PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Verify installation
bun --version
```

### 2. Set Up Neon PostgreSQL

1. Create an account at https://neon.tech
2. Create a new project
3. Create a new database named `messengercraft`
4. Save your connection string which will look like: `postgresql://username:password@ep-something.region.aws.neon.tech/messengercraft`

### 3. Clone the Repository

```bash
git clone https://github.com/yourusername/messengercraft.git
cd messengercraft
```

### 4. Install Dependencies

```bash
bun install
```

### 5. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Open `.env` in your text editor and update the environment variables:

```.env
# Database configuration with Neon PostgreSQL
DATABASE_URL="postgresql://username:password@ep-something.region.aws.neon.tech/messengercraft?sslmode=require"

# Auth key from authjs
AUTH_SECRET="************************************" Read more: https://cli.authjs.dev
```

### 6. Database Setup with Drizzle ORM

Generate and run migrations:

```bash
# Generate migration
bunx drizzle-kit generate

# Push schema to database
bun run db:migrate
```

Seed the database with initial data (optional):

```bash
bun run db:seed
```

### 7. TypeScript Configuration

The project uses TypeScript with Bun. Bun has built-in TypeScript support without requiring a separate TypeScript installation:

```bash
# Type-check your project
bun run typecheck
```

### 8. Running the Application

#### Development Mode

```bash
bun run dev
```

This will start the application in development mode at `http://localhost:3000`.

#### Production Build

```bash
bun run build
bun run start
```

## Common Issues and Troubleshooting

### Bun TypeScript Issues

If you encounter TypeScript-related issues with Bun:

```bash
# Update Bun to the latest version
bun upgrade

# Clear TypeScript cache
rm -rf node_modules/.cache

# Install TypeScript types if needed
bun add -d @types/node @types/react @types/react-dom
```

### Next.js Build Errors

If you experience Next.js build errors:

```bash
# Clear Next.js cache
rm -rf .next
bun run build
```

### Drizzle ORM Issues

If you encounter issues with Drizzle ORM:

```bash
# Recreate migration files
bun run db:drop
bun run db:generate

# Push fresh schema
bun run db:migrate
```

### Neon PostgreSQL Connection Issues

If you encounter connection issues with Neon PostgreSQL:

1. Ensure your connection string includes `?sslmode=require`
2. Check that your IP is allowed in Neon's settings
3. Verify that your database user has the correct permissions
4. Test the connection using a tool like `psql` or a GUI client

## Updating the Application

```bash
git pull
bun install
bun run db:migrate # Run if there are schema changes
bun run build
```

## Additional Commands

```bash
# Run tests with Bun's built-in test runner
bun test

# Type check
bun run typecheck

# Lint code
bun run lint

# Format code
bun run format

# Generate Drizzle types
bun run db:migrate
```

## Need Help?

If you encounter any issues during installation, please:

1. Check the project documentation in the `docs/` directory
2. Open an issue on the GitHub repository
3. Contact the development team via GitHub issues
