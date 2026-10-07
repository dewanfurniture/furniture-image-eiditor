@echo off
echo ===================================================
echo   Furniture Image Editor - Local Build ^& Deploy
echo ===================================================
echo.

echo [1/3] Building the project locally (Zero-Cost Strategy)...
call npx vercel build --prod
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed! Please check the errors above.
    
    exit /b %errorlevel%
)
echo [SUCCESS] Build completed!
echo.

echo [2/3] Deploying to Vercel...
call npx vercel deploy --prod --prebuilt
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Deployment failed! 
    
    exit /b %errorlevel%
)
echo.
echo [SUCCESS] Deployment completed! Your site is live!

