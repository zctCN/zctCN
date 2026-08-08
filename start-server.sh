#!/bin/bash
# 墨白博客 - 一键启动脚本
# 用法: ./start-server.sh

echo "=========================================="
echo "   墨白博客 - 本地预览服务器"
echo "=========================================="
echo ""

PORT=8080

# 检测可用的服务器
if command -v python3 &> /dev/null; then
    echo "[✓] 使用 Python3 启动服务器"
    echo "[i] 访问地址: http://localhost:$PORT"
    echo "[i] 按 Ctrl+C 停止服务器"
    echo ""
    cd "$(dirname "$0")"
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "[✓] 使用 Python 启动服务器"
    echo "[i] 访问地址: http://localhost:$PORT"
    echo "[i] 按 Ctrl+C 停止服务器"
    echo ""
    cd "$(dirname "$0")"
    python -m http.server $PORT
elif command -v npx &> /dev/null; then
    echo "[✓] 使用 Node.js (serve) 启动服务器"
    echo "[i] 访问地址: http://localhost:$PORT"
    echo ""
    cd "$(dirname "$0")"
    npx serve -p $PORT
else
    echo "[✗] 未找到 Python 或 Node.js"
    echo "[i] 请直接双击打开 index.html 文件"
    echo "[i] 或使用浏览器打开 index.html"
fi