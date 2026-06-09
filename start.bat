@echo off
chcp 65001 >nul
title 减脂营养计划 - 完整服务

echo.
echo  ==========================================
echo      减脂营养计划 - 启动中...
echo  ==========================================
echo.

REM 获取本机局域网 IPv4 地址
set LOCAL_IP=127.0.0.1
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4" ^| findstr "192.168."') do set LOCAL_IP=%%a
set LOCAL_IP=%LOCAL_IP: =%

echo  [1/2] 启动后端 API 服务 (端口 3001)...
cd /d "%~dp0"
start "减脂计划-API" cmd /c "cd /d %~dp0server && node index.js"

REM 等后端启动
timeout /t 2 /nobreak >nul

echo  [2/2] 启动前端静态服务 (端口 8080)...
start "减脂计划-前端" cmd /c "cd /d %~dp0 && python -m http.server 8080 --bind 0.0.0.0"

echo.
echo  ==========================================
echo    后端 API : http://localhost:3001
echo    前端页面 : http://localhost:8080
echo    手机访问 : http://%LOCAL_IP%:8080
echo  ==========================================
echo.
echo  确保手机和电脑在同一个 WiFi 网络下
echo  关闭窗口即可停止所有服务
echo.

pause
