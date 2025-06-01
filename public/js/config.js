// Configuración de URLs para el frontend
const config = {
    // URL base de la API - se ajusta automáticamente para desarrollo y producción
    API_BASE_URL: window.location.origin,

    // Endpoints de la API
    endpoints: {
        login: '/login',
        register: '/register',
        users: '/users',
        clientes: '/clientes',
        incidentes: '/incidentes'
    },

    // Función helper para construir URLs completas
    getApiUrl: function (endpoint) {
        return this.API_BASE_URL + (this.endpoints[endpoint] || endpoint);
    }
};

// Exportar configuración para uso en otros archivos
window.appConfig = config;
