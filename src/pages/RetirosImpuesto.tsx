import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Users, Building, Calendar } from "lucide-react";
import Filters from "@/components/Filters";
import MetricCard from "@/components/MetricCard";
import DonutChart from "@/components/DonutChart";
import Timeline from "@/components/Timeline";
import {
  useRetirosData,
  filterRetirosData,
  getAvailableYears,
  getAvailableMonths,
  calculateMetrics,
  getInitiativeDistribution,
  getTimelineData,
  type RetirosData
} from "@/services/retirosDataService";

const RetirosImpuesto = () => {
  const { data: rawData, loading, error } = useRetirosData();
  const [filteredData, setFilteredData] = useState<RetirosData[]>([]);
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  useEffect(() => {
    if (rawData.length > 0) {
      const data = rawData as RetirosData[];
      
      // Get available years
      setAvailableYears(getAvailableYears(data));

      // Filter data for impuesto (non-voluntary compensation)
      const filtered = filterRetirosData(data, 'impuesto', selectedYear, selectedMonth);
      setFilteredData(filtered);

      // Update available months
      setAvailableMonths(getAvailableMonths(data, selectedYear));
    }
  }, [rawData, selectedYear, selectedMonth]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando datos de retiros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error al cargar los datos: {error}</p>
        </div>
      </div>
    );
  }

  const metrics = calculateMetrics(filteredData);
  const initiativeData = getInitiativeDistribution(filteredData);
  const timelineData = getTimelineData(filteredData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="space-y-6">
        {/* Introducción del Dataset */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">🧾 Resumen de Retiros de Bonos de Carbono (COLCX)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Este conjunto de datos presenta los retiros de créditos de carbono registrados oficialmente en el sistema COLCX en Colombia. 
                Estos retiros representan acciones tanto regulatorias (por el Impuesto al Carbono) como voluntarias de empresas que buscan 
                compensar su huella de carbono.
              </p>
              <div className="mt-3">
                <a 
                  href="https://colcx.com/SistemaRegistro/Retiros" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
                >
                  🔗 Verificar fuente oficial
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">💡 ¿Por qué es valioso para tu negocio?</h3>
              <p className="text-muted-foreground mb-3">Si estás en el negocio de comercialización de bonos de carbono, este dataset te permite:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Identificar empresas activas compradoras (clientes potenciales)</li>
                <li>Entender la demanda por tipo de iniciativa (fotovoltaica, forestal, biomasa)</li>
                <li>Reconocer a los principales actores del mercado: compradores, sujetos pasivos, iniciativas</li>
                <li>Evaluar el volumen de mercado por año (TCO₂e entregadas) para ajustar tu oferta</li>
                <li>Construir un perfil de cliente ideal según el tipo de tecnología o uso del bono</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">📋 Explicación de las columnas del dataset</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">Columna</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Fecha Retiro</td>
                      <td className="py-3 px-4">Fecha en la que se formalizó el retiro del bono de carbono</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Iniciativa</td>
                      <td className="py-3 px-4">Nombre del proyecto o programa que originó los créditos de carbono</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Cod. Serial</td>
                      <td className="py-3 px-4">Código único del lote de créditos retirados</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Vintage Inicial/Final</td>
                      <td className="py-3 px-4">Rango de fechas en las que se generó el crédito (período de absorción de carbono)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Destinación</td>
                      <td className="py-3 px-4">Indica si el retiro es por "Impuesto al Carbono" o uso "Voluntario"</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Usuario Final</td>
                      <td className="py-3 px-4">Empresa que finalmente recibió o utilizó el bono de carbono</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-medium">Sujeto Pasivo</td>
                      <td className="py-3 px-4">Empresa obligada a compensar sus emisiones</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">TCO₂e Entregadas</td>
                      <td className="py-3 px-4">Toneladas de dióxido de carbono equivalente retiradas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">🧠 Interpretación del Dashboard</h3>
              <p className="text-muted-foreground leading-relaxed">
                Este panel presenta los retiros oficiales de bonos de carbono registrados en COLCX, una herramienta clave para identificar 
                actores del mercado con necesidades de compensación. A partir de esta información puedes detectar oportunidades de venta, 
                comprender los tipos de proyectos más demandados y evaluar el tamaño y comportamiento del mercado colombiano de créditos de carbono.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <Filters
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
          availableYears={availableYears}
          availableMonths={availableMonths}
        />

        {/* Métricas KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total tCO₂e Retiradas"
            value={metrics.totalTCO2e}
            icon={TrendingDown}
            description="Toneladas CO₂ equivalente"
            delay={0.1}
          />
          <MetricCard
            title="Transacciones"
            value={metrics.totalTransactions}
            icon={Calendar}
            description="Número de retiros"
            delay={0.2}
          />
          <MetricCard
            title="Clientes Únicos"
            value={metrics.uniqueClients}
            icon={Users}
            description="Usuarios finales"
            delay={0.3}
          />
          <MetricCard
            title="Iniciativas"
            value={metrics.uniqueInitiatives}
            icon={Building}
            description="Proyectos activos"
            delay={0.4}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart
            data={initiativeData}
            title="Distribución por Iniciativa"
            description="tCO₂e retiradas por tipo de proyecto"
          />
          
          <Timeline
            data={timelineData}
            title="Evolución Temporal"
            description="tCO₂e retiradas por mes"
            color="hsl(var(--primary))"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RetirosImpuesto;