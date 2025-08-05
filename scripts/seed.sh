#!/usr/bin/env bash
# Seed the database with sample users and items

echo "Seeding database…"
node backend/src/seed.js
echo "Done."
