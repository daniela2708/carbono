export interface ProyectosData {
  Codigo: string;
  Estado: string;
  FechaRegistro: string;
  Nombre: string;
  País: string;
  Titular: string;
  Desarrollador: string;
}

export const parseCSV = <T = any>(csvText: string): T[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const data: T[] = [];

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
      data.push(row as T);
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