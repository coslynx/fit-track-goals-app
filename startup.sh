#!/bin/bash
set -euo pipefail

PROJECT_ROOT_API="./api"
LOG_FILE="./startup.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

log_info() {
  echo "$TIMESTAMP - INFO: $1" | tee -a "$LOG_FILE"
}

log_error() {
  echo "$TIMESTAMP - ERROR: $1" | tee -a "$LOG_FILE" >&2
}

cleanup() {
  log_info "Performing cleanup..."
  if [ -f "$PROJECT_ROOT_API/backend.pid" ]; then
    kill "$(cat "$PROJECT_ROOT_API/backend.pid")"
    rm "$PROJECT_ROOT_API/backend.pid"
  fi
  log_info "Cleanup complete."
}

check_package_json() {
    if [ ! -f "$PROJECT_ROOT_API/package.json" ]; then
        log_error "Error: api/package.json is missing."
        exit 1
    fi
}

trap cleanup EXIT ERR INT TERM

log_info "Starting backend server initialization..."

check_package_json

log_info "Navigating to backend directory: $PROJECT_ROOT_API"
cd "$PROJECT_ROOT_API"

log_info "Installing dependencies..."
npm install --force
if [ $? -ne 0 ]; then
  log_error "npm install failed, exiting."
  exit 1
fi
log_info "Dependencies installed successfully."

log_info "Starting the backend server in development mode..."
npm run dev &
BACKEND_PID=$!
echo "$BACKEND_PID" > "$PROJECT_ROOT_API/backend.pid"

if [ $? -ne 0 ]; then
  log_error "npm run dev failed, exiting."
  cleanup
  exit 1
fi

log_info "Backend server started successfully with PID: $BACKEND_PID."

log_info "Startup process completed."

wait