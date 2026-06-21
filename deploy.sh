#!/usr/bin/env bash
# Publish Bella Longevity Spa changes to the live site (GitHub Pages).
# Usage:  ./deploy.sh ["optional commit message"]
# After it pushes, GitHub Pages rebuilds automatically (~1 min) and
# bellalongevityspa.com serves the new version. DNS/SSL never change.
set -e
cd "$(dirname "$0")"

msg="${1:-Update site $(date '+%Y-%m-%d %H:%M')}"

git add -A
if git diff --cached --quiet; then
  echo "No changes to publish."
  exit 0
fi
git -c user.email=info@bellalongevityspa.com -c user.name="Bella" commit -qm "$msg"
git push origin HEAD:main
echo "Pushed. GitHub Pages will rebuild in ~1 min: https://bellalongevityspa.com"
