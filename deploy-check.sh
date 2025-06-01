#!/bin/bash

echo "🚀 SGBS-SS - Configuración de Despliegue en Vercel"
echo "=================================================="
echo ""

echo "📋 CHECKLIST DE DESPLIEGUE:"
echo ""
echo "✅ 1. Vercel CLI instalado"
echo "✅ 2. Proyecto configurado en Vercel"
echo "✅ 3. URL de despliegue: https://sgbs-lrt55hksf-rene-guzmans-projects.vercel.app"
echo ""

echo "🔄 PASOS PENDIENTES:"
echo ""
echo "1. 🗄️  CONFIGURAR BASE DE DATOS:"
echo "   - Crear cuenta en Neon.tech, Supabase.com o Railway.app"
echo "   - Crear una base de datos PostgreSQL"
echo "   - Obtener las credenciales de conexión"
echo ""

echo "2. 🔧 CONFIGURAR VARIABLES DE ENTORNO:"
echo "   Ve a: https://vercel.com/rene-guzmans-projects/sgbs-ss/settings"
echo "   Sección: Environment Variables"
echo "   Agrega estas variables:"
echo ""
echo "   DB_USER=tu_usuario"
echo "   DB_HOST=tu_host"  
echo "   DB_NAME=tu_base_de_datos"
echo "   DB_PASSWORD=tu_password"
echo "   DB_PORT=5432"
echo "   NODE_ENV=production"
echo ""

echo "3. 📊 CONFIGURAR TABLAS DE BASE DE DATOS:"
echo "   Ejecutar los scripts SQL en tu nueva base de datos:"
echo "   - Crear tablas clientes, incidentes, etc."
echo "   - Insertar datos de prueba si es necesario"
echo ""

echo "4. 🔄 REDESPLEGAR:"
echo "   npm run deploy:vercel"
echo ""

echo "🔗 ENLACES ÚTILES:"
echo "   • Panel de Vercel: https://vercel.com/rene-guzmans-projects/sgbs-ss"
echo "   • Configuración: https://vercel.com/rene-guzmans-projects/sgbs-ss/settings"
echo "   • Aplicación: https://sgbs-lrt55hksf-rene-guzmans-projects.vercel.app"
echo ""

read -p "¿Has configurado la base de datos? (y/n): " db_configured

if [ "$db_configured" = "y" ]; then
    echo ""
    echo "🚀 Perfecto! Ahora vamos a redesplegar con las nuevas configuraciones..."
    echo ""
    
    # Redesplegar
    vercel --prod
    
    echo ""
    echo "✅ ¡Despliegue completado!"
    echo "🌐 Tu aplicación está disponible en:"
    echo "   https://sgbs-lrt55hksf-rene-guzmans-projects.vercel.app"
else
    echo ""
    echo "📝 Primero configura la base de datos y las variables de entorno."
    echo "   Luego ejecuta: npm run deploy:vercel"
fi
