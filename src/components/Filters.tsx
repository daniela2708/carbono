import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Calendar, Filter } from "lucide-react";

interface FiltersProps {
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  availableYears: string[];
  availableMonths: string[];
}

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Filters = ({ 
  selectedYear, 
  selectedMonth, 
  onYearChange, 
  onMonthChange, 
  availableYears, 
  availableMonths 
}: FiltersProps) => {
  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={18} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro de Año */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center space-x-1">
            <Calendar size={14} />
            <span>Año</span>
          </label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los años</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Mes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center space-x-1">
            <Calendar size={14} />
            <span>Mes</span>
          </label>
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los meses</SelectItem>
              {availableMonths.map((month) => (
                <SelectItem key={month} value={month}>
                  {monthNames[parseInt(month) - 1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters;