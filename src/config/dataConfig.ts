// Configuración centralizada de las fuentes de datos
// Para actualizar el dataset de retiros, simplemente cambia la ruta aquí

export const DATA_CONFIG = {
  // Dataset principal de retiros (Tab 2) - cambiar esta ruta para usar un dataset actualizado
  RETIROS_DATASET: '/data/retiros.csv',
  
  // Dataset de certificados de emisión (Tab 3 - Withdraw/Retiros Voluntario)
  CERTIFICADOS_DATASET: '/data/platform_emission_certificates.csv',
  
  // Dataset de iniciativas (Tab 4 - Proyectos/Iniciativas)
  INICIATIVAS_DATASET: '/data/iniciativas_colcx.csv',
  
  // Otros datasets del sistema (para referencia)
  PROYECTOS_DATASET: '/data/proyectos_iniciativas.csv',
  
  // Configuraciones adicionales
  MAX_INITIATIVE_NAME_LENGTH: 50,
  DEFAULT_CHART_LIMIT: 5
};

// Función para validar que el dataset tiene la estructura esperada
export const validateRetirosDataset = (data: any[]): boolean => {
  if (!data || data.length === 0) return false;
  
  const requiredFields = [
    'Fecha Retiro',
    'Iniciativa', 
    'TCO2e Entregadas',
    'Destinación',
    'Usuario Final'
  ];
  
  const firstRow = data[0];
  return requiredFields.every(field => field in firstRow);
};

// Tipos de destinación reconocidos
export const DESTINACION_TYPES = {
  VOLUNTARIO: 'Compensacion voluntaria',
  IMPUESTO: 'other' // Cualquier destinación que no sea compensación voluntaria
} as const;