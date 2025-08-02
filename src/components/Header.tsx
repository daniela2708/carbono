import carbonLogo from "@/assets/carbon-logo.png";

const Header = () => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-verde-bosque to-cafe-tierra p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <img 
                src={carbonLogo} 
                alt="Carbon Analysis Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Análisis de Venta de Bonos de Carbono
            </h1>
            <p className="text-sm text-gray-600">
              Sistema de Registro COLCX - Colombia
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;