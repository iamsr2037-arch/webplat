#!/bin/bash

# Database setup script for Marketplace Platform

echo "Setting up Marketplace Database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  echo "Please set DATABASE_URL environment variable"
  echo "Example: postgresql://user:password@localhost:5432/marketplace"
  exit 1
fi

echo "Running Prisma migrations..."
npx prisma migrate dev --name init

echo "Seeding database with initial data..."
npx ts-node scripts/seed.ts

echo "Database setup completed successfully!"
