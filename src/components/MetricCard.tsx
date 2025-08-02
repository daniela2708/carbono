import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const MetricCard = ({ title, value, icon: Icon, description, trend, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="mb-2">
            <span className="text-2xl md:text-3xl font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
            </span>
          </div>
          
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          
          {trend && (
            <div className={`flex items-center space-x-1 mt-2 text-sm ${
              trend.isPositive ? 'text-secondary' : 'text-destructive'
            }`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;