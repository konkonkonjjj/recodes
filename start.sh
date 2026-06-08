#!/bin/bash
# 减脂营养计划 - 本地启动脚本 (Mac / Linux)

echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║       🥗 减脂营养计划 · 本地服务        ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""

# 获取本机局域网 IP
LOCAL_IP=$(ip route get 1 2>/dev/null | awk '{print $7; exit}')
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP=$(ifconfig 2>/dev/null | grep -o 'inet 192\.168\.[0-9.]*' | head -1 | awk '{print $2}')
fi
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP="127.0.0.1"
fi

echo "  📡 电脑访问: http://localhost:8080"
echo "  📱 手机访问: http://${LOCAL_IP}:8080"
echo ""
echo "  ⚠️  确保手机和电脑在同一个 WiFi 下"
echo "  ⚠️  按 Ctrl+C 停止服务"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8080 --bind 0.0.0.0 2>/dev/null || python -m http.server 8080 --bind 0.0.0.0
