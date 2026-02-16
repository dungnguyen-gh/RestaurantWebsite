# Restaurant Website - Vercel Deployment Script
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Restaurant Website - Vercel Deploy" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if vercel is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm i -g vercel
}

# Navigate to project directory
$projectPath = "D:\Unity\WebDevelopment\RestaurantWeb\my-app"
Set-Location $projectPath

Write-Host "Step 1: Logging into Vercel..." -ForegroundColor Cyan
Write-Host "(A browser window will open for authentication)" -ForegroundColor Gray
vercel login

Write-Host ""
Write-Host "Step 2: Linking project..." -ForegroundColor Cyan
Write-Host "(Select your scope and link to 'restaurant-website')" -ForegroundColor Gray
vercel link

Write-Host ""
Write-Host "Step 3: Adding environment variables..." -ForegroundColor Cyan

# Function to add env var
function Add-VercelEnvVar {
    param($Name, $Value)
    Write-Host "Adding $Name..." -ForegroundColor Yellow
    
    # Use echo to pipe the value to vercel env add
    $Value | vercel env add $Name production
    $Value | vercel env add $Name preview
    $Value | vercel env add $Name development
}

# Add all environment variables
Add-VercelEnvVar -Name "DATABASE_URL" -Value "postgresql://postgres:Manhdung%23123@db.djsnrrlsleslgrizmhso.supabase.co:5432/postgres"
Add-VercelEnvVar -Name "NEXT_PUBLIC_SUPABASE_URL" -Value "https://djsnrrlsleslgrizmhso.supabase.co"
Add-VercelEnvVar -Name "NEXT_PUBLIC_SUPABASE_ANON_KEY" -Value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA2ODgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ"
Add-VercelEnvVar -Name "SUPABASE_SERVICE_ROLE_KEY" -Value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg"
Add-VercelEnvVar -Name "NEXT_PUBLIC_APP_URL" -Value "https://restaurant-website-dun.vercel.app"

Write-Host ""
Write-Host "Step 4: Deploying to production..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
