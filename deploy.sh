#!/bin/bash

# Script de deployment para SGBS-SS
echo "🚀 Iniciando deployment de SGBS-SS..."

# Verificar que estamos en la rama correcta
echo "📋 Verificando estado del repositorio..."
git status

# Construir CSS
echo "🎨 Construyendo CSS..."
npm run build

# Verificar que no hay errores de sintaxis
echo "🔍 Verificando sintaxis del código..."
node -c server.js
if [ $? -ne 0 ]; then
    echo "❌ Error de sintaxis en server.js"
    exit 1
fi

# Verificar que las dependencias están instaladas
echo "📦 Verificando dependencias..."
npm ls --depth=0
if [ $? -ne 0 ]; then
    echo "⚠️ Instalando dependencias faltantes..."
    npm install
fi

echo "✅ Verificaciones completadas"
echo ""
echo "🌐 Opciones de deployment:"
echo "1. Vercel: vercel --prod"
echo "2. Railway: railway up"
echo "3. Render: git push origin main"
echo "4. Docker: docker build -t sgbs-ss . && docker run -p 3000:3000 sgbs-ss"
echo ""
echo "📋 Variables de entorno requeridas:"
echo "- DB_USER o USER"
echo "- DB_HOST o HOST"  
echo "- DB_NAME o DATABASE"
echo "- DB_PASSWORD o PASSWORD"
echo "- DB_PORT (opcional, default: 5432)"
echo "- NODE_ENV=production"
echo ""
echo "✨ ¡Listo para deployment!"
