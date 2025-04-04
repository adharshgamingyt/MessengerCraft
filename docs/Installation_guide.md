# MessengerCraft Installation Guide

This guide covers how to set up and run the MessengerCraft app, which is built with Next.js and uses Bun as its JavaScript runtime.

## Prerequisites

Before installing MessengerCraft, make sure you have the following installed on your system:

- **Bun** (version 1.2.0 or later)
- **Git**
- **Node.js** (version 18.0.0 or later, although Bun will handle most Node.js dependencies)

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

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/messengercraft.git
cd messengercraft
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Open `.env` in your text editor and update the environment variables:

```.env

# Database configuration
DATABASE_URL="your-database-connection-string"

AUTH_SECRET="Read more: https://cli.authjs.dev"

```

### 5. Database Setup (if applicable)

Run database migrations:

```bash
bun db:migrate
```

Seed the database with initial data (optional):

```bash
bun db:seed
```

### 6. Running the Application

#### Development Mode

```bash
bun dev
```

This will start the application in development mode at `http://localhost:3000`.

#### Production Build

```bash
bun run build
bun start
```

## Docker Installation (Alternative)

If you prefer to use Docker:

```bash
# Build the Docker image
docker build -t messengercraft .

# Run the container
docker run -p 3000:3000 --env-file .env messengercraft
```

## Common Issues and Troubleshooting

### Bun Compatibility

If you encounter issues with certain packages:

```bash
# Force Bun to use Node.js compatibility mode for problematic packages
bun install --compat
```

### Next.js Build Errors

If you experience Next.js build errors:

```bash
# Clear Next.js cache
rm -rf .next
bun run build
```

### Database Connection Issues

Ensure your database is running and the connection string in `.env` is correct.

## Updating the Application

```bash
git pull
bun install
bun run build
```

## Additional Commands

```bash
# Run tests
bun test

# Lint code
bun lint

# Format code
bun format
```

## Need Help?

If you encounter any issues during installation, please:

1. Check the project documentation in the `docs/` directory
2. Open an issue on the GitHub repository
3. Contact the development team at < >
