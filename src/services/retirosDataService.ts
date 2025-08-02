import { useCSVData } from "@/hooks/useCSVData";
import { DATA_CONFIG, validateRetirosDataset, DESTINACION_TYPES } from "@/config/dataConfig";

export interface RetirosData {
  "Fecha Retiro": string;
  "Iniciativa": string;
  "Cod. Serial": string;
  "Vintage Inicial": string;
  "Vintage Final": string;
  "Año absorción": string;
  "Cod. Seriales Entregados": string;
  "Destinación": string;
  "Usuario Final": string;
  "Nit Usuario Final": string;
  "Sujeto Pasivo": string;
  "Nit Sujeto Pasivo": string;
  "TCO2e Entregadas": number;
}

export const useRetirosData = () => {
  const result = useCSVData(DATA_CONFIG.RETIROS_DATASET);
  
  // Validar estructura de datos cuando se cargan
  if (result.data.length > 0 && !validateRetirosDataset(result.data)) {
    console.warn('Dataset de retiros no tiene la estructura esperada');
  }
  
  return result;
};

// Utilidades para filtrar y procesar los datos
export const filterRetirosData = (
  data: RetirosData[],
  type?: 'impuesto' | 'voluntario',
  year?: string,
  month?: string
): RetirosData[] => {
  let filtered = [...data];

  // Filtrar por tipo de destinación
  if (type === 'voluntario') {
    filtered = filtered.filter(item => 
      item["Destinación"] === DESTINACION_TYPES.VOLUNTARIO
    );
  } else if (type === 'impuesto') {
    filtered = filtered.filter(item => 
      item["Destinación"] !== DESTINACION_TYPES.VOLUNTARIO
    );
  }

  // Filtrar por año
  if (year && year !== 'todos') {
    filtered = filtered.filter(item => {
      const date = new Date(item["Fecha Retiro"]);
      return date.getFullYear().toString() === year;
    });
  }

  // Filtrar por mes
  if (month && month !== 'todos') {
    filtered = filtered.filter(item => {
      const date = new Date(item["Fecha Retiro"]);
      return (date.getMonth() + 1).toString() === month;
    });
  }

  return filtered;
};

export const getAvailableYears = (data: RetirosData[]): string[] => {
  const years = new Set<string>();
  data.forEach(item => {
    const date = new Date(item["Fecha Retiro"]);
    if (!isNaN(date.getTime())) {
      years.add(date.getFullYear().toString());
    }
  });
  return Array.from(years).sort();
};

export const getAvailableMonths = (data: RetirosData[], year?: string): string[] => {
  let filtered = data;
  
  if (year && year !== 'todos') {
    filtered = data.filter(item => {
      const date = new Date(item["Fecha Retiro"]);
      return date.getFullYear().toString() === year;
    });
  }

  const months = new Set<string>();
  filtered.forEach(item => {
    const date = new Date(item["Fecha Retiro"]);
    if (!isNaN(date.getTime())) {
      months.add((date.getMonth() + 1).toString());
    }
  });
  
  return Array.from(months).sort((a, b) => parseInt(a) - parseInt(b));
};

export const calculateMetrics = (data: RetirosData[]) => {
  const totalTCO2e = data.reduce((sum, item) => sum + (item["TCO2e Entregadas"] || 0), 0);
  const totalTransactions = data.length;
  const uniqueClients = new Set(data.map(item => item["Usuario Final"])).size;
  const uniqueInitiatives = new Set(data.map(item => item["Iniciativa"])).size;

  return { totalTCO2e, totalTransactions, uniqueClients, uniqueInitiatives };
};

export const getInitiativeDistribution = (data: RetirosData[], limit: number = DATA_CONFIG.DEFAULT_CHART_LIMIT) => {
  const distribution: { [key: string]: number } = {};
  
  data.forEach(item => {
    const shortName = item["Iniciativa"].length > DATA_CONFIG.MAX_INITIATIVE_NAME_LENGTH 
      ? item["Iniciativa"].substring(0, DATA_CONFIG.MAX_INITIATIVE_NAME_LENGTH) + "..."
      : item["Iniciativa"];
    
    if (!distribution[shortName]) {
      distribution[shortName] = 0;
    }
    distribution[shortName] += item["TCO2e Entregadas"] || 0;
  });

  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

export const getTimelineData = (data: RetirosData[]) => {
  const monthlyData: { [key: string]: number } = {};
  
  data.forEach(item => {
    const date = new Date(item["Fecha Retiro"]);
    if (!isNaN(date.getTime())) {
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey] += item["TCO2e Entregadas"] || 0;
    }
  });

  return Object.entries(monthlyData)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => a.month.localeCompare(b.month));
};