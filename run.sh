#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-5173}"

detect_local_ip() {
  local ip=""
  local iface=""

  if command -v route >/dev/null 2>&1; then
    iface="$(route -n get default 2>/dev/null | awk '/interface:/{print $2; exit}')"
  fi

  if [[ -n "$iface" ]] && command -v ifconfig >/dev/null 2>&1; then
    ip="$(ifconfig "$iface" 2>/dev/null | awk '/inet / && $2 != "127.0.0.1" {print $2; exit}')"
  fi

  if [[ -z "$ip" ]] && command -v ifconfig >/dev/null 2>&1; then
    ip="$(ifconfig 2>/dev/null | awk '
      /^[a-z0-9]/ { current=$1; sub(":", "", current) }
      /status: active/ { active[current]=1 }
      /inet / && $2 != "127.0.0.1" && current !~ /^lo/ {
        if (active[current]) { print $2; exit }
      }
    ')"
  fi

  if [[ -z "$ip" ]]; then
    ip="localhost"
  fi

  printf '%s' "$ip"
}

cd "$ROOT_DIR"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

LOCAL_IP="$(detect_local_ip)"

echo
echo "InstaMed dev server"
echo "Local:   http://localhost:${PORT}"
echo "Network: http://${LOCAL_IP}:${PORT}"
echo
echo "Open the Network URL on your phone while connected to the same Wi-Fi."
echo

exec npm run dev -- --host 0.0.0.0 --port "${PORT}"
