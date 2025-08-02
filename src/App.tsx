import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import NavTabs from "@/components/NavTabs";
import Informacion from "@/pages/Informacion";
import RetirosImpuesto from "@/pages/RetirosImpuesto";
import RetirosVoluntario from "@/pages/RetirosVoluntario";
import Proyectos from "@/pages/Proyectos";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('informacion');

  const renderContent = () => {
    switch (activeTab) {
      case 'informacion':
        return <Informacion />;
      case 'retiros-impuesto':
        return <RetirosImpuesto />;
      case 'retiros-voluntario':
        return <RetirosVoluntario />;
      case 'proyectos':
        return <Proyectos />;
      default:
        return <Informacion />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Header />
          <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="pt-36 pb-8">
            {renderContent()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
