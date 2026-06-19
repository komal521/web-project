@echo off
start "My Admin Backend" cmd /k "cd /d ""%~dp0backend"" && npm.cmd start"
start "My Admin Frontend" cmd /k "cd /d ""%~dp0frontend"" && npm.cmd run dev"
