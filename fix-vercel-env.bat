@echo off
echo ==========================================
echo   Fix Vercel Environment Variables
echo ==========================================
echo.
echo This will guide you to fix the secret reference issue
echo.
echo Step 1: Opening Vercel Dashboard...
echo.
start https://vercel.com/dashboard
echo.
echo Step 2: Follow these instructions:
echo.
echo 1. Click your 'restaurant-website' project
echo 2. Go to Settings ^> Environment Variables
echo 3. DELETE all existing variables (click trash icon)
echo 4. Add them fresh with these EXACT values:
echo.
echo --- COPY THESE VALUES ---
echo.
echo NAME: DATABASE_URL
echo VALUE: postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
echo.
echo NAME: NEXT_PUBLIC_SUPABASE_URL  
echo VALUE: https://djsnrrlsleslgrizmhso.supabase.co
echo.
echo NAME: NEXT_PUBLIC_SUPABASE_ANON_KEY
echo VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ
echo.
echo NAME: SUPABASE_SERVICE_ROLE_KEY
echo VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg
echo.
echo --- IMPORTANT NOTES ---
echo.
echo - Check ALL 3 boxes: Production, Preview, Development
echo - DO NOT use the "Secret" dropdown - paste as plain text
echo - After adding all, go to Deployments and click Redeploy
echo.
pause
