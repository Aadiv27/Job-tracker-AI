@echo off
title AI Powered Job Tracker - Both Servers
color 0A

echo.
echo ============================================
echo  AI Powered Job Tracker Startup
echo ============================================
echo.

echo Installing dependencies...
echo.

cd /d "c:\Users\aadiv\OneDrive\Desktop\AI -POWERED JOB TRACKER"
echo Installing frontend dependencies...
call npm install

echo.
echo Installing backend dependencies...
cd /d "c:\Users\aadiv\OneDrive\Desktop\AI -POWERED JOB TRACKER\server"
call npm install

echo.
echo ============================================
echo  Dependencies installed successfully!
echo ============================================
echo.
echo Starting both servers...
echo.

cd /d "c:\Users\aadiv\OneDrive\Desktop\AI -POWERED JOB TRACKER"

echo Starting backend server (port 5000)...
start "Backend Server" cmd /k "cd /d c:\Users\aadiv\OneDrive\Desktop\AI -POWERED JOB TRACKER\server && npm run dev"

timeout /t 3 /nobreak

echo Starting frontend server (port 5173)...
start "Frontend Server" cmd /k "cd /d c:\Users\aadiv\OneDrive\Desktop\AI -POWERED JOB TRACKER && npm run dev"

echo.
echo ============================================
echo  Servers started!
echo ============================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Press CTRL+C in any window to stop that server
echo.
