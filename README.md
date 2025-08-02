# Tablero de Bonos de Carbono - Colombia

Dashboard interactivo para análisis de bonos de carbono del Sistema de Registro COLCX en Colombia.

## 🚀 Características

- **Dashboard interactivo** con análisis de datos en tiempo real
- **Diseño responsive** con paleta de colores café tierra y verde bosque
- **Filtros dinámicos** por año y mes
- **Visualizaciones** con gráficos donut y líneas de tiempo
- **Animaciones suaves** con Framer Motion
- **Datos reales** del sistema COLCX

## 📊 Módulos del Dashboard

### 1. Información
Información general sobre el Sistema de Registro COLCX y fuentes de datos.

### 2. Retiros (Impuesto)
Análisis de retiros de bonos para impuesto al carbono:
- Total tCO₂e retiradas
- Número de transacciones
- Clientes únicos
- Distribución por iniciativa

### 3. Withdraw (Voluntario)
Análisis de retiros voluntarios de COLCERs:
- Total COLCERs retirados
- Proyectos activos
- Evolución temporal
- Distribución por proyecto

### 4. Proyectos / Iniciativas
Gestión y análisis de proyectos registrados:
- Estados de proyectos
- Desarrolladores principales
- Distribución geográfica
- Tabla de proyectos recientes

## 🛠 Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS + shadcn/ui
- **Gráficos**: Recharts
- **Animaciones**: Framer Motion
- **Fechas**: date-fns
- **Estado**: React Hooks

## 🎨 Diseño

- **Fondo**: Blanco
- **Colores principales**: 
  - Café tierra: `#6B4C3B`
  - Verde bosque: `#2F8D46`
- **Tipografía**: Inter (sistema)
- **Componentes**: shadcn/ui personalizados

## 📈 Fuentes de Datos

Los datos provienen del Sistema de Registro COLCX:

- [Retiros - Sistema de Registro](https://colcx.com/SistemaRegistro/Retiros)
- [Withdraw Registry](https://www.colcxregistry.com/withdraw)
- [Projects Registry](https://www.colcxregistry.com/projects)
- [Sistema de Registro Principal](https://colcx.com/SistemaRegistro/)

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ y npm

### Instalación

```bash
# Clonar el repositorio
git clone <YOUR_GIT_URL>
cd tablero-carbono

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Verificación de tipos
npm run type-check
```

## 🌐 Despliegue en Vercel

### Método 1: Desde la interfaz de Vercel

1. Ir a [Vercel](https://vercel.com)
2. Conectar tu repositorio de GitHub
3. Configurar el proyecto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy automático

### Método 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Variables de entorno (si aplica)

Crear un archivo `.env.local` para variables de entorno:

```env
# Ejemplo de variables (opcional)
VITE_API_URL=https://api.ejemplo.com
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes shadcn/ui
│   ├── Header.tsx       # Header principal
│   ├── NavTabs.tsx      # Navegación por tabs
│   ├── Filters.tsx      # Filtros globales
│   ├── MetricCard.tsx   # Tarjetas de métricas
│   ├── DonutChart.tsx   # Gráficos donut
│   └── Timeline.tsx     # Líneas de tiempo
├── pages/               # Páginas principales
│   ├── Informacion.tsx  # Página de información
│   ├── RetirosImpuesto.tsx
│   ├── RetirosVoluntario.tsx
│   └── Proyectos.tsx
├── utils/               # Utilidades
│   └── dataProcessing.ts # Procesamiento de datos CSV
├── data/                # Datos CSV de ejemplo
│   ├── retiros_impuesto.csv
│   ├── retiros_voluntario.csv
│   └── proyectos_iniciativas.csv
└── hooks/               # Hooks personalizados
    └── useDataLoader.ts # Carga de datos
```

## 🔧 Personalización

### Colores

Los colores se configuran en `src/index.css`:

```css
:root {
  --cafe-tierra: 25 35% 25%;
  --verde-bosque: 140 50% 35%;
  --cafe-claro: 25 20% 85%;
  --verde-claro: 140 30% 90%;
}
```

### Componentes

Los componentes UI se pueden personalizar en `src/components/ui/`:

- Modificar variantes en archivos como `button.tsx`
- Ajustar estilos base en `index.css`
- Configurar Tailwind en `tailwind.config.ts`

## 📊 Datos

Los datos están embebidos en el código para facilitar el despliegue. Para conectar con APIs reales:

1. Actualizar las funciones en `utils/dataProcessing.ts`
2. Implementar llamadas HTTP en lugar de datos estáticos
3. Configurar variables de entorno para URLs de API

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas sobre el Sistema de Registro COLCX:
- Sitio web: [https://www.colcxregistry.com/](https://www.colcxregistry.com/)
- Sistema de Registro: [https://colcx.com/SistemaRegistro/](https://colcx.com/SistemaRegistro/)

---

**Desarrollado con ❤️ para el análisis de bonos de carbono en Colombia**