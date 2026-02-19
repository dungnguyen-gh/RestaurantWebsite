@echo off
echo ==========================================
echo   Check Vercel Deployment Status
echo ==========================================
echo.
echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
echo.
echo CHECK THESE THINGS:
echo.
echo 1. Do you see a project card on the dashboard?
echo    - Look for: restaurant-website or my-app
echo.
echo 2. Click the project card
echo    - Look at the URL: should show your project name
echo.
echo 3. Check if Git is connected:
echo    - Go to Settings ^> Git
echo    - Should show: dungnguyen-gh/RestaurantWebsite
echo.
echo 4. If NO project exists:
echo    - Go to https://vercel.com/new
echo    - Import GitHub: dungnguyen-gh/RestaurantWebsite
echo    - Add environment variables BEFORE clicking Deploy
echo.
echo 5. If project exists but NO deployments:
echo    - Settings ^> Git ^> Check if Git repository is connected
echo    - May need to reconnect GitHub
.
pause
