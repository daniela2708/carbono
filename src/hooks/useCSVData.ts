import { useState, useEffect } from 'react';

export const useCSVData = (csvPath: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        setLoading(true);
        const response = await fetch(csvPath);
        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.statusText}`);
        }
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadCSV();
  }, [csvPath]);

  return { data, loading, error };
};

const parseCSV = (csvText: string) => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        let value = values[index].replace(/"/g, '').trim();
        
        // Try to convert to number if it looks like a number
        if (/^\d+(\.\d+)?$/.test(value)) {
          row[header] = parseFloat(value);
        } else {
          row[header] = value;
        }
      });
      data.push(row);
    }
  }

  return data;
};

const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};