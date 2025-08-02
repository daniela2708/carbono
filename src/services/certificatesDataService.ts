import { useState, useEffect } from 'react';
import { DATA_CONFIG } from "@/config/dataConfig";

export interface CertificateData {
  "Fecha de retiro": string;
  "Proyecto": string;
  "Año": string;
  "Cod. Vintage": string;
  "Cod. COLCERs retirados": string;
  "Propósito del retiro": string;
  "Usuario final": string;
  "Sujeto pasivo": string;
  "COLCERs retirados": number;
}

export const useCertificatesData = () => {
  const [data, setData] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        setLoading(true);
        const response = await fetch(DATA_CONFIG.CERTIFICADOS_DATASET);
        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.statusText}`);
        }
        const csvText = await response.text();
        const parsedData = parseCSVWithSemicolon(csvText);
        setData(parsedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  return { data, loading, error };
};

const parseCSVWithSemicolon = (csvText: string): CertificateData[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  // Remove BOM if present and split by semicolon
  const headers = lines[0].replace(/^\uFEFF/, '').split(';').map(h => h.replace(/"/g, '').trim());
  const data: CertificateData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLineWithSemicolon(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        let value = values[index].replace(/"/g, '').trim();
        
        // Convert COLCERs retirados to number
        if (header === 'COLCERs retirados' && /^\d+(\.\d+)?$/.test(value)) {
          row[header] = parseFloat(value);
        } else {
          row[header] = value;
        }
      });
      data.push(row as CertificateData);
    }
  }

  return data;
};

const parseCSVLineWithSemicolon = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ';' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

// Utilidades para procesar los datos de certificados
export const filterCertificatesData = (
  data: CertificateData[],
  year?: string,
  month?: string
): CertificateData[] => {
  let filtered = [...data];

  if (year && year !== 'todos') {
    filtered = filtered.filter(item => {
      const date = new Date(item["Fecha de retiro"]);
      return date.getFullYear().toString() === year;
    });
  }

  if (month && month !== 'todos') {
    filtered = filtered.filter(item => {
      const date = new Date(item["Fecha de retiro"]);
      return (date.getMonth() + 1).toString() === month;
    });
  }

  return filtered;
};

export const getAvailableYearsCertificates = (data: CertificateData[]): string[] => {
  const years = new Set<string>();
  data.forEach(item => {
    const date = new Date(item["Fecha de retiro"]);
    if (!isNaN(date.getTime())) {
      years.add(date.getFullYear().toString());
    }
  });
  return Array.from(years).sort();
};

export const getAvailableMonthsCertificates = (data: CertificateData[], year?: string): string[] => {
  let filtered = data;
  
  if (year && year !== 'todos') {
    filtered = data.filter(item => {
      const date = new Date(item["Fecha de retiro"]);
      return date.getFullYear().toString() === year;
    });
  }

  const months = new Set<string>();
  filtered.forEach(item => {
    const date = new Date(item["Fecha de retiro"]);
    if (!isNaN(date.getTime())) {
      months.add((date.getMonth() + 1).toString());
    }
  });
  
  return Array.from(months).sort((a, b) => parseInt(a) - parseInt(b));
};

export const calculateCertificatesMetrics = (data: CertificateData[]) => {
  const totalCOLCERs = data.reduce((sum, item) => sum + (item["COLCERs retirados"] || 0), 0);
  const totalTransactions = data.length;
  const uniqueClients = new Set(data.map(item => item["Usuario final"])).size;
  const uniqueProjects = new Set(data.map(item => item["Proyecto"])).size;

  return { totalCOLCERs, totalTransactions, uniqueClients, uniqueProjects };
};

export const getProjectDistribution = (data: CertificateData[], limit: number = 5) => {
  const distribution: { [key: string]: number } = {};
  
  data.forEach(item => {
    const shortName = item["Proyecto"].length > 50 
      ? item["Proyecto"].substring(0, 50) + "..."
      : item["Proyecto"];
    
    if (!distribution[shortName]) {
      distribution[shortName] = 0;
    }
    distribution[shortName] += item["COLCERs retirados"] || 0;
  });

  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

export const getCertificatesTimelineData = (data: CertificateData[]) => {
  const monthlyData: { [key: string]: number } = {};
  
  data.forEach(item => {
    const date = new Date(item["Fecha de retiro"]);
    if (!isNaN(date.getTime())) {
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey] += item["COLCERs retirados"] || 0;
    }
  });

  return Object.entries(monthlyData)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => a.month.localeCompare(b.month));
};