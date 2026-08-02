#!/usr/bin/env bash
# Pi Agent Setup Script (macOS / Linux / Git Bash on Windows)
#
# Usage:
#   1. Clone the repo anywhere on your machine
#   2. cd into the cloned directory
#   3. chmod +x install.sh && ./install.sh

set -e

TARGET="$HOME/.pi/agent"
SOURCE="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "=== Pi Agent Frontend Suite Installer ==="
echo ""

# 1. Create target directory
echo "[1/5] Setting up $TARGET ..."
mkdir -p "$TARGET/extensions" "$TARGET/skills"

# 2. Copy core config files
echo "[2/5] Copying configuration files..."
for file in SYSTEM.md AGENTS.md settings.json models.json.example mcp.json.example .gitignore; do
  if [ -f "$SOURCE/$file" ]; then
    cp -f "$SOURCE/$file" "$TARGET/$file"
    echo "  Copied $file"
  fi
done

# 3. Copy extensions
echo "[3/5] Copying extensions..."
if [ -d "$SOURCE/extensions" ]; then
  cp -rf "$SOURCE/extensions/"* "$TARGET/extensions/"
  ext_count=$(find "$TARGET/extensions" -name "*.ts" | wc -l | tr -d ' ')
  echo "  Installed $ext_count extensions"
fi

# 4. Copy skills
echo "[4/5] Copying skills..."
if [ -d "$SOURCE/skills" ]; then
  cp -rf "$SOURCE/skills/"* "$TARGET/skills/"
  skill_count=$(find "$TARGET/skills" -maxdepth 1 -type d | tail -n +2 | wc -l | tr -d ' ')
  echo "  Installed $skill_count skills"
fi

# 5. Install Pi packages
echo "[5/5] Installing Pi packages..."
packages=(
  "npm:pi-token-speed"
  "npm:@quintinshaw/pi-dynamic-workflows"
  "npm:pi-agent-browser-native"
  "npm:pi-mcp-adapter"
  "npm:pi-web-access"
  "npm:pi-lens"
  "npm:pi-memctx"
  "npm:@vigolium/piolium"
)
for pkg in "${packages[@]}"; do
  echo "  Installing $pkg ..."
  pi install "$pkg" 2>/dev/null || echo "  (Skipped - install manually with: pi install $pkg)"
done

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Installed to: $TARGET"
echo ""
echo "IMPORTANT: Edit $TARGET/models.json and replace placeholders:"
echo "  <GEMMA_ENDPOINT_URL>  -> Your Gemma vLLM endpoint"
echo "  <QWEN_ENDPOINT_URL>   -> Your Qwen vLLM endpoint"
echo "  <GEMMA_API_KEY>       -> Your Gemma API key"
echo "  <QWEN_API_KEY>        -> Your Qwen API key"
echo ""
echo "IMPORTANT: Edit $TARGET/mcp.json and replace:"
echo "  <YOUR_PASSWORD>       -> Your MSSQL Database Password"
echo ""
echo "Available local models (after config):"
echo "  - gemma-4-31B-it"
echo "  - qwen3.6-27b-nvfp4"
echo ""
echo "To start: cd into your project repo and run 'pi'"
echo "To switch model: /model inside Pi session"
echo ""

