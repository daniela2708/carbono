# Guía para Actualizar los Datasets

## Configuración de Fuentes de Datos por Pestaña

### Tab 2 - Retiros Impuesto
- **Fuente**: `/src/data/retiros.csv`
- **Formato**: CSV con comas como separador
- **Servicio**: `retirosDataService.ts`

### Tab 3 - Retiros Voluntario (Certificados)
- **Fuente**: `/src/data/platform_emission_certificates.csv`
- **Formato**: CSV con punto y coma (;) como separador
- **Servicio**: `certificatesDataService.ts`

### Tab 4 - Proyectos/Iniciativas
- **Fuente**: `/src/data/iniciativas_colcx.csv`
- **Formato**: CSV con comas como separador
- **Servicio**: `iniciativasDataService.ts`

## Cómo reemplazar los datasets con nueva información

### Para Tab 2 - Retiros Impuesto

#### Paso 1: Preparar el nuevo dataset
- **Formato**: CSV con comas como separador
- **Columnas requeridas**:
  - `Fecha Retiro`
  - `Iniciativa`
  - `TCO2e Entregadas`
  - `Destinación`
  - `Usuario Final`

#### Paso 2: Reemplazar el archivo
- Reemplaza el archivo en: `/src/data/retiros.csv`
- O actualiza la ruta en `/src/config/dataConfig.ts`:

```typescript
export const DATA_CONFIG = {
  RETIROS_DATASET: '/src/data/retiros.csv', // <- Modifica esta línea
  // ...
};
```

### Para Tab 3 - Retiros Voluntario (Certificados)

#### Paso 1: Preparar el nuevo dataset
- **Formato**: CSV con punto y coma (;) como separador
- **Columnas requeridas**:
  - `Fecha de retiro`
  - `Proyecto`
  - `COLCERs retirados`
  - `Usuario final`
  - `Propósito del retiro`

#### Paso 2: Reemplazar el archivo
- Reemplaza el archivo en: `/src/data/platform_emission_certificates.csv`
- O actualiza la ruta en `/src/config/dataConfig.ts`:

```typescript
export const DATA_CONFIG = {
  CERTIFICADOS_DATASET: '/src/data/platform_emission_certificates.csv', // <- Modifica esta línea
  // ...
};
```

### Para Tab 4 - Proyectos/Iniciativas

#### Paso 1: Preparar el nuevo dataset
- **Formato**: CSV con comas como separador
- **Columnas requeridas**:
  - `cod_iniciativa`
  - `estado`
  - `fecha_registro`
  - `nombre_iniciativa`
  - `pais`
  - `titular`
  - `desarrollador`

#### Paso 2: Reemplazar el archivo
- Reemplaza el archivo en: `/src/data/iniciativas_colcx.csv`
- O actualiza la ruta en `/src/config/dataConfig.ts`:

```typescript
export const DATA_CONFIG = {
  INICIATIVAS_DATASET: '/src/data/iniciativas_colcx.csv', // <- Modifica esta línea
  // ...
};
```

### Paso 3: Verificación automática
El sistema incluye validación automática que:
- Verifica que el dataset tenga la estructura esperada
- Muestra advertencias en la consola si faltan campos requeridos
- Mantiene la funcionalidad aunque el dataset no sea perfecto

### Características del sistema

✅ **Fuentes especializadas**: Cada pestaña tiene su dataset específico
✅ **Formatos diferentes**: Soporte para CSV con comas y punto y coma
✅ **Filtrado automático**: 
  - "Retiros Impuesto": Datos de retiros fiscales
  - "Retiros Voluntario": Datos de certificados de emisión
✅ **Actualización automática**: Al cambiar cualquier dataset, las gráficas se actualizan
✅ **Validación de estructura**: El sistema verifica la integridad de los datos

### Archivos del sistema

1. **Servicios especializados**: 
   - `/src/services/retirosDataService.ts` (Tab 2)
   - `/src/services/certificatesDataService.ts` (Tab 3)
   - `/src/services/iniciativasDataService.ts` (Tab 4)
2. **Configuración**: `/src/config/dataConfig.ts`
3. **Componentes actualizados**:
   - `/src/pages/RetirosImpuesto.tsx`
   - `/src/pages/RetirosVoluntario.tsx`
   - `/src/pages/Proyectos.tsx`

### Diferencias entre datasets

#### Retiros Impuesto (Tab 2)
- **Separador**: Comas (,)
- **Campo principal**: `TCO2e Entregadas`
- **Filtrado**: Por tipo de destinación

#### Certificados (Tab 3)
- **Separador**: Punto y coma (;)
- **Campo principal**: `COLCERs retirados`
- **Filtrado**: Por fecha únicamente

#### Iniciativas (Tab 4)
- **Separador**: Comas (,)
- **Campo principal**: `estado`
- **Filtrado**: Por estado, año de registro y país
- **Funciones especiales**: Timeline de registros, distribución por titulares y desarrolladores

### Personalización adicional

Puedes modificar estas configuraciones en `/src/config/dataConfig.ts`:
- `MAX_INITIATIVE_NAME_LENGTH`: Longitud máxima de nombres en gráficos
- `DEFAULT_CHART_LIMIT`: Número de elementos a mostrar en gráficos