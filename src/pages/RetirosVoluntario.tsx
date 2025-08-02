import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Users, TreePine, Calendar } from "lucide-react";
import Filters from "@/components/Filters";
import MetricCard from "@/components/MetricCard";
import DonutChart from "@/components/DonutChart";
import Timeline from "@/components/Timeline";
import {
  useCertificatesData,
  filterCertificatesData,
  getAvailableYearsCertificates,
  getAvailableMonthsCertificates,
  calculateCertificatesMetrics,
  getProjectDistribution,
  getCertificatesTimelineData,
  type CertificateData
} from "@/services/certificatesDataService";

const RetirosVoluntario = () => {
  const { data: rawData, loading, error } = useCertificatesData();
  const [filteredData, setFilteredData] = useState<CertificateData[]>([]);
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  useEffect(() => {
    if (rawData.length > 0) {
      const data = rawData as CertificateData[];
      
      // Get available years
      setAvailableYears(getAvailableYearsCertificates(data));

      // Filter data by year and month
      const filtered = filterCertificatesData(data, selectedYear, selectedMonth);
      setFilteredData(filtered);

      // Update available months
      setAvailableMonths(getAvailableMonthsCertificates(data, selectedYear));
    }
  }, [rawData, selectedYear, selectedMonth]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando datos de certificados...</p>
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

  const metrics = calculateCertificatesMetrics(filteredData);
  const initiativeData = getProjectDistribution(filteredData);
  const timelineData = getCertificatesTimelineData(filteredData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="space-y-6">
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
            title="Total COLCERs Retirados"
            value={metrics.totalCOLCERs}
            icon={ArrowDown}
            description="Certificados retirados"
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
            title="Organizaciones"
            value={metrics.uniqueClients}
            icon={Users}
            description="Usuarios finales"
            delay={0.3}
          />
          <MetricCard
            title="Proyectos"
            value={metrics.uniqueProjects}
            icon={TreePine}
            description="Proyectos únicos"
            delay={0.4}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart
            data={initiativeData}
            title="Distribución por Proyecto"
            description="COLCERs retirados por proyecto"
          />
          
          <Timeline
            data={timelineData}
            title="Evolución Temporal"
            description="COLCERs retirados por mes"
            color="hsl(var(--secondary))"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RetirosVoluntario;