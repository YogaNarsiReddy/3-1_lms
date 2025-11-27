#!/bin/sh
echo "window.RUNTIME_API_URL='${REACT_APP_API_BASE_URL}'" > /usr/share/nginx/html/env-config.js
exec "$@"
