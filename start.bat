@echo off
title 减脂营养计划

echo.
echo  ==========================================
echo      减脂营养计划 - 本地服务启动中...
echo  ==========================================
echo.

REM 获取本机局域网 IPv4 地址
set LOCAL_IP=127.0.0.1
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4" ^| findstr /v "192.168.%"') do set LOCAL_IP=%%a
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4" ^| findstr "192.168.%"') do set LOCAL_IP=%%a
set LOCAL_IP=%LOCAL_IP: =%

echo  电脑访问 : http://localhost:8080
echo  手机访问 : http://%LOCAL_IP%:8080
echo.
echo  确保手机和电脑在同一个 WiFi 网络下
echo  按 Ctrl+C 可停止服务
echo.

cd /d "%~dp0"
python -m http.server 8080 --bind 0.0.0.0
pause
