import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, CheckCircle, Clock, XCircle, Calendar, Users, Building } from "lucide-react";
import Filters from "@/components/Filters";
import MetricCard from "@/components/MetricCard";
import DonutChart from "@/components/DonutChart";
import Timeline from "@/components/Timeline";
import {
  useIniciativasData,
  filterIniciativasData,
  getAvailableEstados,
  getAvailableYearsIniciativas,
  getAvailablePaises,
  calculateIniciativasMetrics,
  getEstadoDistribution,
  getTitularDistribution,
  getDesarrolladorDistribution,
  getIniciativasTimelineData,
  type IniciativaData
} from "@/services/iniciativasDataService";

const Proyectos = () => {
  const { data: rawData, loading, error } = useIniciativasData();
  const [filteredData, setFilteredData] = useState<IniciativaData[]>([]);
  const [selectedEstado, setSelectedEstado] = useState('todos');
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedPais, setSelectedPais] = useState('todos');
  const [availableEstados, setAvailableEstados] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availablePaises, setAvailablePaises] = useState<string[]>([]);

  useEffect(() => {
    if (rawData.length > 0) {
      const data = rawData as IniciativaData[];
      
      // Get available filters
      setAvailableEstados(getAvailableEstados(data));
      setAvailableYears(getAvailableYearsIniciativas(data));
      setAvailablePaises(getAvailablePaises(data));

      // Filter data
      const filtered = filterIniciativasData(data, selectedEstado, selectedYear, selectedPais);
      setFilteredData(filtered);
    }
  }, [rawData, selectedEstado, selectedYear, selectedPais]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando datos de iniciativas...</p>
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

  const metrics = calculateIniciativasMetrics(filteredData);
  const estadoData = getEstadoDistribution(filteredData);
  const titularData = getTitularDistribution(filteredData);
  const desarrolladorData = getDesarrolladorDistribution(filteredData);
  const timelineData = getIniciativasTimelineData(filteredData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="space-y-6">
        {/* Filtros */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center space-x-2 mb-6">
            <TreePine size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Filtros de Iniciativas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filtro por Estado */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="todos">Todos los estados</option>
                {availableEstados.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Año */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Año de Registro</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="todos">Todos los años</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Filtro por País */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">País</label>
              <select
                value={selectedPais}
                onChange={(e) => setSelectedPais(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="todos">Todos los países</option>
                {availablePaises.map((pais) => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Métricas KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Iniciativas"
            value={metrics.totalIniciativas}
            icon={TreePine}
            description="Iniciativas registradas"
            delay={0.1}
          />
          <MetricCard
            title="Certificadas"
            value={metrics.certificadas}
            icon={CheckCircle}
            description="Iniciativas certificadas"
            delay={0.2}
          />
          <MetricCard
            title="En Desarrollo"
            value={metrics.enDesarrollo}
            icon={Clock}
            description="Iniciativas activas"
            delay={0.3}
          />
          <MetricCard
            title="Titulares Únicos"
            value={metrics.uniqueTitulares}
            icon={Users}
            description="Organizaciones titulares"
            delay={0.4}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart
            data={estadoData}
            title="Distribución por Estado"
            description="Estado actual de las iniciativas"
          />
          
          <DonutChart
            data={titularData}
            title="Top Titulares"
            description="Organizaciones con más iniciativas"
          />
        </div>

        {/* Gráficos adicionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart
            data={desarrolladorData}
            title="Top Desarrolladores"
            description="Empresas desarrolladoras principales"
          />
          
          <Timeline
            data={timelineData}
            title="Evolución Temporal"
            description="Registro de iniciativas por mes"
            color="hsl(var(--primary))"
          />
        </div>

        {/* Tabla de Iniciativas Recientes */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Iniciativas Recientes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground">Código</th>
                  <th className="text-left py-2 text-muted-foreground">Nombre</th>
                  <th className="text-left py-2 text-muted-foreground">Estado</th>
                  <th className="text-left py-2 text-muted-foreground">País</th>
                  <th className="text-left py-2 text-muted-foreground">Titular</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 8).map((iniciativa, index) => (
                  <tr key={iniciativa.cod_iniciativa} className="border-b border-border hover:bg-accent/50">
                    <td className="py-3 font-mono text-xs">{iniciativa.cod_iniciativa}</td>
                    <td className="py-3 max-w-xs truncate" title={iniciativa.nombre_iniciativa}>
                      {iniciativa.nombre_iniciativa.length > 40 
                        ? iniciativa.nombre_iniciativa.substring(0, 40) + "..."
                        : iniciativa.nombre_iniciativa}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        iniciativa.estado === 'Certificado' 
                          ? 'bg-green-100 text-green-800' 
                          : iniciativa.estado === 'Registrado'
                          ? 'bg-blue-100 text-blue-800'
                          : iniciativa.estado === 'En Desarrollo'
                          ? 'bg-yellow-100 text-yellow-800'
                          : iniciativa.estado === 'En Traslado'
                          ? 'bg-purple-100 text-purple-800'
                          : iniciativa.estado === 'Pre-Registro'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {iniciativa.estado}
                      </span>
                    </td>
                    <td className="py-3">{iniciativa.pais}</td>
                    <td className="py-3 max-w-xs truncate" title={iniciativa.titular}>
                      {iniciativa.titular.length > 30 
                        ? iniciativa.titular.substring(0, 30) + "..."
                        : iniciativa.titular}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Proyectos;