@echo off
echo ==========================================
echo   Check Vercel Environment Variables
echo ==========================================
echo.
echo Opening your Vercel project...
echo.
start https://vercel.com/dashboard
echo.
echo INSTRUCTIONS:
echo.
echo 1. Click your NEW project (the one you just created)
echo 2. Go to Settings ^> Environment Variables
echo 3. Check if these variables already exist:
echo    - NEXT_PUBLIC_SUPABASE_URL
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - SUPABASE_SERVICE_ROLE_KEY
echo    - DATABASE_URL
echo.
echo IF THEY EXIST:
echo    - Check if values are correct
echo    - Go to Deployments tab
echo    - Click Redeploy
echo.
echo IF THEY DON'T EXIST or ARE WRONG:
echo    - Delete all of them
echo    - Add fresh ones
echo.
echo Press any key when done...
pause >nul
