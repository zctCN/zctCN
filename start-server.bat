@echo off
REM 墨白博客 - Windows 一键启动脚本
title 墨白博客 - 本地预览服务器

echo ==========================================
echo    墨白博客 - 本地预览服务器
echo ==========================================
echo.

set PORT=8080

where python >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo [OK] 使用 Python 启动服务器
    echo [INFO] 访问地址: http://localhost:%PORT%
    echo [INFO] 按 Ctrl+C 停止服务器
    echo.
    cd /d "%~dp0"
    python -m http.server %PORT%
    goto :eof
)

where node >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo [OK] 使用 Node.js 启动服务器
    echo [INFO] 访问地址: http://localhost:%PORT%
    echo.
    cd /d "%~dp0"
    npx serve -p %PORT%
    goto :eof
)

echo [ERROR] 未找到 Python 或 Node.js
echo [INFO] 请直接双击打开 index.html 文件
echo.
pause