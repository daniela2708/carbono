import { FileText, TrendingDown, ArrowDown, TreePine } from "lucide-react";

interface NavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'informacion', label: 'Información', icon: FileText },
  { id: 'retiros-impuesto', label: 'Retiros (Impuesto)', icon: TrendingDown },
  { id: 'retiros-voluntario', label: 'Withdraw (Voluntario)', icon: ArrowDown },
  { id: 'proyectos', label: 'Proyectos / Iniciativas', icon: TreePine },
];

const NavTabs = ({ activeTab, onTabChange }: NavTabsProps) => {
  return (
    <nav className="w-full h-16 bg-cafe-tierra fixed top-20 left-0 right-0 z-40 border-b border-gray-300">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 h-12
                  ${isActive 
                    ? 'bg-white text-cafe-tierra border-2 border-cafe-tierra shadow-md' 
                    : 'bg-transparent text-white hover:bg-white/10 border-2 border-transparent'
                  }
                `}
              >
                <Icon size={18} />
                <span className="whitespace-nowrap text-base">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavTabs;