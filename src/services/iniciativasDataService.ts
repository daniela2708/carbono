import { useCSVData } from "@/hooks/useCSVData";
import { DATA_CONFIG } from "@/config/dataConfig";

export interface IniciativaData {
  cod_iniciativa: string;
  estado: string;
  fecha_registro: string;
  nombre_iniciativa: string;
  pais: string;
  titular: string;
  desarrollador: string;
}

export const useIniciativasData = () => {
  const result = useCSVData(DATA_CONFIG.INICIATIVAS_DATASET);
  
  // Validar estructura de datos cuando se cargan
  if (result.data.length > 0 && !validateIniciativasDataset(result.data)) {
    console.warn('Dataset de iniciativas no tiene la estructura esperada');
  }
  
  return result;
};

const validateIniciativasDataset = (data: any[]): boolean => {
  if (!data || data.length === 0) return false;
  
  const requiredFields = [
    'cod_iniciativa',
    'estado',
    'nombre_iniciativa',
    'titular',
    'desarrollador'
  ];
  
  const firstRow = data[0];
  return requiredFields.every(field => field in firstRow);
};

// Utilidades para filtrar y procesar los datos de iniciativas
export const filterIniciativasData = (
  data: IniciativaData[],
  estado?: string,
  year?: string,
  pais?: string
): IniciativaData[] => {
  let filtered = [...data];

  // Filtrar por estado
  if (estado && estado !== 'todos') {
    filtered = filtered.filter(item => item.estado === estado);
  }

  // Filtrar por año de registro
  if (year && year !== 'todos') {
    filtered = filtered.filter(item => {
      const date = new Date(item.fecha_registro);
      return date.getFullYear().toString() === year;
    });
  }

  // Filtrar por país
  if (pais && pais !== 'todos') {
    filtered = filtered.filter(item => item.pais === pais);
  }

  return filtered;
};

export const getAvailableEstados = (data: IniciativaData[]): string[] => {
  const estados = new Set<string>();
  data.forEach(item => {
    if (item.estado) {
      estados.add(item.estado);
    }
  });
  return Array.from(estados).sort();
};

export const getAvailableYearsIniciativas = (data: IniciativaData[]): string[] => {
  const years = new Set<string>();
  data.forEach(item => {
    const date = new Date(item.fecha_registro);
    if (!isNaN(date.getTime())) {
      years.add(date.getFullYear().toString());
    }
  });
  return Array.from(years).sort();
};

export const getAvailablePaises = (data: IniciativaData[]): string[] => {
  const paises = new Set<string>();
  data.forEach(item => {
    if (item.pais) {
      paises.add(item.pais);
    }
  });
  return Array.from(paises).sort();
};

export const calculateIniciativasMetrics = (data: IniciativaData[]) => {
  const totalIniciativas = data.length;
  const certificadas = data.filter(item => item.estado === 'Certificado').length;
  const enDesarrollo = data.filter(item => item.estado === 'En Desarrollo' || item.estado === 'Registrado').length;
  const retiradas = data.filter(item => item.estado === 'Proyecto Retirado').length;
  const uniqueTitulares = new Set(data.map(item => item.titular)).size;
  const uniqueDesarrolladores = new Set(data.map(item => item.desarrollador)).size;
  const uniquePaises = new Set(data.map(item => item.pais)).size;

  return { 
    totalIniciativas, 
    certificadas, 
    enDesarrollo, 
    retiradas,
    uniqueTitulares,
    uniqueDesarrolladores,
    uniquePaises
  };
};

export const getEstadoDistribution = (data: IniciativaData[]) => {
  const distribution: { [key: string]: number } = {};
  
  data.forEach(item => {
    if (!distribution[item.estado]) {
      distribution[item.estado] = 0;
    }
    distribution[item.estado]++;
  });

  // Colores específicos para cada estado
  const statusColors: { [key: string]: string } = {
    'Certificado': 'hsl(142, 76%, 36%)', // Verde
    'Registrado': 'hsl(213, 94%, 68%)', // Azul
    'En Desarrollo': 'hsl(45, 93%, 58%)', // Amarillo
    'En Traslado': 'hsl(262, 83%, 58%)', // Púrpura
    'Pre-Registro': 'hsl(25, 95%, 58%)', // Naranja
    'Proyecto Retirado': 'hsl(0, 84%, 60%)', // Rojo
    'En Validación': 'hsl(173, 58%, 39%)' // Teal
  };

  return Object.entries(distribution)
    .map(([name, value]) => ({ 
      name, 
      value, 
      color: statusColors[name] || 'hsl(var(--muted))' 
    }))
    .sort((a, b) => b.value - a.value);
};

export const getTitularDistribution = (data: IniciativaData[], limit: number = 5) => {
  const distribution: { [key: string]: number } = {};
  
  data.forEach(item => {
    const shortName = item.titular.length > 40 
      ? item.titular.substring(0, 40) + "..."
      : item.titular;
    
    if (!distribution[shortName]) {
      distribution[shortName] = 0;
    }
    distribution[shortName]++;
  });

  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

export const getDesarrolladorDistribution = (data: IniciativaData[], limit: number = 5) => {
  const distribution: { [key: string]: number } = {};
  
  data.forEach(item => {
    const shortName = item.desarrollador.length > 40 
      ? item.desarrollador.substring(0, 40) + "..."
      : item.desarrollador;
    
    if (!distribution[shortName]) {
      distribution[shortName] = 0;
    }
    distribution[shortName]++;
  });

  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

export const getIniciativasTimelineData = (data: IniciativaData[]) => {
  const monthlyData: { [key: string]: number } = {};
  
  data.forEach(item => {
    const date = new Date(item.fecha_registro);
    if (!isNaN(date.getTime())) {
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey]++;
    }
  });

  return Object.entries(monthlyData)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => a.month.localeCompare(b.month));
};