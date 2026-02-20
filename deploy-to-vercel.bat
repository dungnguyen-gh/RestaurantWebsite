@echo off
echo ==========================================
echo   Deploy to Vercel (CLI Method)
echo ==========================================
echo.

:: Set PATH
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Roaming\npm

echo Step 1: Installing Vercel CLI...
call npm i -g vercel

echo.
echo Step 2: Navigate to project...
cd /d D:\Unity\WebDevelopment\RestaurantWeb\my-app

echo.
echo Step 3: Login to Vercel...
echo (A browser window will open - click Continue)
call vercel login

echo.
echo Step 4: Deploy project...
echo Answer these prompts:
echo - Set up? [Y/n] --^> Y
echo - Which scope? --^> Select your username
echo - Link to existing? [y/N] --^> N
echo - Project name? --^> restaurant-website
call vercel

echo.
echo Step 5: Add environment variables...
echo Adding DATABASE_URL...
echo postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres | call vercel env add DATABASE_URL

echo.
echo Adding NEXT_PUBLIC_SUPABASE_URL...
echo https://djsnrrlsleslgrizmhso.supabase.co | call vercel env add NEXT_PUBLIC_SUPABASE_URL

echo.
echo Adding NEXT_PUBLIC_SUPABASE_ANON_KEY...
echo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ | call vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

echo.
echo Adding SUPABASE_SERVICE_ROLE_KEY...
echo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg | call vercel env add SUPABASE_SERVICE_ROLE_KEY

echo.
echo Step 6: Deploy to production...
call vercel --prod

echo.
echo ==========================================
echo   Deployment Complete!
echo ==========================================
echo.
pause
