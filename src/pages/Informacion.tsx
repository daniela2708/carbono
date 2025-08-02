import { motion } from "framer-motion";

const Informacion = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-8 shadow-[var(--shadow-card)]"
        >
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-6">Fuentes de datos</h2>
            
            <div className="space-y-4 mb-8">
              <a 
                href="https://colcx.com/SistemaRegistro/Retiros" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <span className="text-primary font-medium">https://colcx.com/SistemaRegistro/Retiros</span>
              </a>
              
              <a 
                href="https://www.colcxregistry.com/withdraw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <span className="text-primary font-medium">https://www.colcxregistry.com/withdraw</span>
              </a>
              
              <a 
                href="https://www.colcxregistry.com/projects" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <span className="text-primary font-medium">https://www.colcxregistry.com/projects</span>
              </a>
              
              <a 
                href="https://colcx.com/SistemaRegistro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <span className="text-primary font-medium">https://colcx.com/SistemaRegistro/</span>
              </a>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-4">Sistema de Registro del estándar COLCX</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Una herramienta para registrar proyectos de mitigación de cambio climático, reforzando el 
              compromiso con la acción climática. Esta alianza con el operador XM permite la gestión de 
              los proyectos del estándar COLCX, conectando a todos los actores del mercado de carbono. 
              Su tecnología blockchain permite la consulta, administración y transacción de créditos de 
              carbono (COLCERs) de manera segura y transparente.
            </p>

            <div className="border-l-4 border-primary pl-4 bg-accent/30 p-4 rounded-r-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Fuente:</strong>{" "}
                <a 
                  href="https://www.colcxregistry.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://www.colcxregistry.com/
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Informacion;