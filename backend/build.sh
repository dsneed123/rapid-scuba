#!/usr/bin/env bash
# Build script for Digital Ocean App Platform.
#
# Runs from the repository root (one level above this file). The Node and
# Python buildpacks have already installed their dependencies by the time
# this runs (Node via package-lock.json, Python via the root requirements.txt
# that re-exports backend/requirements.txt). So this script only needs to
# build the React SPA and run Django collectstatic.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Building React frontend"
cd "$REPO_ROOT"
npm run build

echo "==> Collecting Django static files"
cd "$REPO_ROOT/backend"
python manage.py collectstatic --noinput

echo "==> Build complete"
