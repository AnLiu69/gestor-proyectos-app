// src/utils/statusMapper.js (o dentro de tu componente si prefieres)

export const STATUS_CONFIG = {
    'activo': { class: 'activo', icon: '✅', label: 'Activo' },
    'inactivo': { class: 'inactivo', icon: '❌', label: 'Inactivo' },
    'en progreso': { class: 'en-progreso', icon: '⏳', label: 'En progreso' }, // Aquí está el truco del guion
    'pendiente': { class: 'pendiente', icon: 'clock-icon', label: 'Pendiente' }, // Ejemplo para iconos SVG o FontAwesome
    'hecho': { class: 'hecho', icon: 'check-icon', label: 'Hecho' },       // Ejemplo para iconos SVG o FontAwesome
    'alta': { class: 'alta', icon: '🔥', label: 'Alta' },
    'media': { class: 'media', icon: '⚠️', label: 'Media' },
    'baja': { class: 'baja', icon: '💤', label: 'Baja' }
};

// Función auxiliar para que si no existe el estado, no explote
export const getStatusConfig = (status) => {
    const key = status?.toString().toLowerCase(); // Normalizamos a minúsculas
    return STATUS_CONFIG[key] || { class: 'default', icon: '', label: status };
};