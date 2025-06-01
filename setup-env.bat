@echo off
echo Configurando variables de entorno en Vercel...
echo.
echo IMPORTANTE: Necesitas tener tus credenciales de base de datos listas
echo.
echo Variables que necesitas configurar:
echo - DB_USER (usuario de PostgreSQL)
echo - DB_HOST (host de la base de datos)
echo - DB_NAME (nombre de la base de datos)
echo - DB_PASSWORD (contraseña)
echo - DB_PORT (puerto, generalmente 5432)
echo - NODE_ENV=production
echo.
echo Puedes configurarlas en:
echo https://vercel.com/rene-guzmans-projects/sgbs-ss/settings
echo.
echo O ejecutar estos comandos (reemplaza los valores):
echo.
echo vercel env add DB_USER
echo vercel env add DB_HOST  
echo vercel env add DB_NAME
echo vercel env add DB_PASSWORD
echo vercel env add DB_PORT
echo vercel env add NODE_ENV
echo.
pause
