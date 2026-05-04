#!/usr/bin/env bash
# Build script for Digital Ocean App Platform.
#
# Runs from the repository root (one level above this file). Builds the React
# SPA into ../dist/, installs Python deps, then collects static.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Building React frontend"
cd "$REPO_ROOT"
npm ci
npm run build

echo "==> Installing Python dependencies"
cd "$REPO_ROOT/backend"
pip install --no-cache-dir -r requirements.txt

echo "==> Collecting static files"
python manage.py collectstatic --noinput

echo "==> Build complete"
