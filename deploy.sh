#!/usr/bin/env bash
# Deploy Bella Longevity Spa to Cloudflare Pages
# Usage:  ./deploy.sh
set -e
cd "$(dirname "$0")"
wrangler pages deploy . \
  --project-name=bella-longevity-spa \
  --branch=main \
  --commit-dirty=true
