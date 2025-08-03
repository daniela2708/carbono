# Notas de Despliegue

## 📁 Estructura de Archivos para Producción

### Ubicación de Datasets
Los archivos CSV **DEBEN** estar en la carpeta `public/data/` para ser accesibles en producción:

```
public/
├── data/
│   ├── retiros.csv
│   ├── platform_emission_certificates.csv
│   └── iniciativas_colcx.csv
└── ...otros archivos estáticos
```

### ⚠️ IMPORTANTE: No usar `/src/data/`
Los archivos en `/src/data/` NO son accesibles desde el navegador en producción. Solo los archivos en `public/` son servidos estáticamente.

## 🔧 Configuración de Rutas

Las rutas en `src/config/dataConfig.ts` apuntan a:
```typescript
export const DATA_CONFIG = {
  RETIROS_DATASET: '/data/retiros.csv',           // → public/data/retiros.csv
  CERTIFICADOS_DATASET: '/data/platform_emission_certificates.csv', // → public/data/platform_emission_certificates.csv
  INICIATIVAS_DATASET: '/data/iniciativas_colcx.csv', // → public/data/iniciativas_colcx.csv
};
```

## 🚀 Pasos para Deploy

1. **Asegurar archivos CSV en public/data/**
   ```bash
   # Verificar que los archivos existen
   ls public/data/
   ```

2. **Build del proyecto**
   ```bash
   npm run build
   ```

3. **Deploy a Vercel**
   ```bash
   vercel --prod
   ```

## 🔍 Resolución de Problemas

### Error: "Failed to load CSV"
- ✅ Verificar que los archivos están en `public/data/`
- ✅ Verificar que las rutas en `dataConfig.ts` son correctas
- ✅ Verificar que los archivos se incluyeron en el commit de GitHub

### Error 404 en archivos CSV
- Los archivos CSV deben estar en `public/data/` no en `src/data/`
- Las rutas deben empezar con `/data/` no `/src/data/`

### CSV no se actualiza en producción
- Hacer commit y push de los archivos actualizados en `public/data/`
- Redesplegar la aplicación en Vercel

## 📝 Para actualizar datasets:

1. Reemplazar archivos en `public/data/`
2. Commit y push a GitHub
3. Vercel se redesplegará automáticamente