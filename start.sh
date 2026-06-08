#!/bin/bash
# 减脂营养计划 - 完整启动脚本 (Mac / Linux)

echo ""
echo "  =========================================="
echo "      减脂营养计划 - 启动中..."
echo "  =========================================="
echo ""

# 获取本机局域网 IP
LOCAL_IP=$(ip route get 1 2>/dev/null | awk '{print $7; exit}')
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP=$(ifconfig 2>/dev/null | grep -o 'inet 192\.168\.[0-9.]*' | head -1 | awk '{print $2}')
fi
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP="127.0.0.1"
fi

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "  [1/2] 启动后端 API 服务 (端口 3001)..."
cd "$DIR/server" && node index.js &
API_PID=$!
sleep 2

echo "  [2/2] 启动前端静态服务 (端口 8080)..."
cd "$DIR" && python3 -m http.server 8080 --bind 0.0.0.0 2>/dev/null || python -m http.server 8080 --bind 0.0.0.0 &
WEB_PID=$!

echo ""
echo "  =========================================="
echo "    后端 API : http://localhost:3001"
echo "    前端页面 : http://localhost:8080"
echo "    手机访问 : http://${LOCAL_IP}:8080"
echo "  =========================================="
echo ""
echo "  按 Ctrl+C 停止所有服务"
echo ""

trap "kill $API_PID $WEB_PID 2>/dev/null; exit" INT TERM
wait
