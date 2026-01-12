# Manual de Usuario - Sistema de Gestión de Feedlot

**Versión:** 2.1.0
**Fecha:** Enero 2026
**Sistema:** Feedlot Management System
**Framework:** Laravel 12 + Inertia.js + React 19 + Tailwind CSS 4 + dom-to-image-more

## Introducción

El Sistema de Gestión de Feedlot es una plataforma integral de gestión ganadera desarrollada con tecnologías modernas que permite administrar eficientemente todas las operaciones de un feedlot bovino. Diseñado específicamente para la industria ganadera, el sistema combina funcionalidad robusta con una interfaz intuitiva para optimizar procesos productivos y mejorar la toma de decisiones.

### Características Principales

- **Gestión Integral de Ganado**: Control completo del ciclo productivo desde ingreso hasta salida
- **Análisis de Rendimiento**: Métricas avanzadas de ganancia diaria promedio (GDP) y conversión alimentaria
- **Control Sanitario**: Seguimiento veterinario con alertas automáticas y gestión de tratamientos
- **Inventarios Inteligentes**: Control de suministros con alertas de stock y rotación FIFO
- **Reportes Ejecutivos**: Dashboards y reportes exportables con generación de imágenes mejorada
- **Seguridad Avanzada**: Sistema de roles y permisos granulares con autenticación de dos factores corregida
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS v4 optimizado para dispositivos móviles y desktop

### Arquitectura Técnica

El sistema está construido sobre una arquitectura moderna de tres capas:

- **Backend**: Laravel 12 con API RESTful y lógica de negocio robusta
- **Frontend**: React 19 con Inertia.js para navegación sin recargas
- **Base de Datos**: SQLite/PostgreSQL con migraciones versionadas
- **Estilos**: Tailwind CSS 4 con configuración @theme y componentes reutilizables
- **Generación de Imágenes**: dom-to-image-more para exportación avanzada de gráficos
- **Autenticación**: Laravel Fortify con soporte para 2FA y correcciones de compatibilidad

## Requisitos del Sistema

### Requisitos Mínimos

| Componente | Especificación |
|------------|---------------|
| **Navegador Web** | Chrome 120+, Firefox 120+, Safari 17+, Edge 120+ |
| **Sistema Operativo** | Windows 10+, macOS 12+, Linux (Ubuntu 20.04+) |
| **Procesador** | Intel Core i3 / AMD Ryzen 3 o superior |
| **Memoria RAM** | 4 GB mínimo, 8 GB recomendado |
| **Almacenamiento** | 500 MB para aplicación + espacio para base de datos |
| **Resolución Pantalla** | 1280x720 mínimo, 1920x1080 recomendado |
| **Conexión** | 10 Mbps mínimo, fibra óptica recomendada |

### Requisitos Recomendados para Producción

| Componente | Especificación |
|------------|---------------|
| **Servidor** | VPS/Cloud con 2 vCPUs, 4 GB RAM |
| **Base de Datos** | PostgreSQL 15+ o MySQL 8.0+ |
| **PHP** | Versión 8.4+ con extensiones requeridas |
| **SSL** | Certificado válido para HTTPS |
| **Backup** | Sistema automático de respaldo diario |
| **Monitoreo** | Herramientas de uptime y performance |

### Compatibilidad de Dispositivos

- **Desktop**: Windows, macOS, Linux
- **Tablets**: iPad (iOS 17+), Android tablets (Android 12+)
- **Móviles**: iPhone (iOS 17+), Android (12+) - interfaz adaptada
- **Navegadores Móviles**: Safari Mobile, Chrome Mobile

## Acceso al Sistema

### Inicio de Sesión

El sistema implementa múltiples capas de seguridad para proteger el acceso a la información sensible del feedlot.

#### Proceso de Autenticación

1. **Acceso a la Aplicación**
   - Abra su navegador web y navegue a la URL proporcionada por el administrador
   - La aplicación detectará automáticamente si está accediendo desde un dispositivo móvil

2. **Credenciales de Acceso**
   - **Email**: Dirección de correo electrónico registrada en el sistema
   - **Contraseña**: Mínimo 8 caracteres con combinación de letras, números y símbolos
   - **Recordar Sesión**: Opción para mantener la sesión activa por 30 días

3. **Autenticación de Dos Factores (2FA)**
   - Si está habilitado para su cuenta, ingrese el código de 6 dígitos de su aplicación autenticadora
   - Aplicaciones compatibles: Google Authenticator, Authy, Microsoft Authenticator
   - Códigos son válidos por 30 segundos

4. **Confirmación de Acceso**
   - Haga clic en "Iniciar Sesión" o presione Enter
   - El sistema validará las credenciales y redirigirá al dashboard

#### Capturas de Pantalla del Proceso

```
┌─────────────────────────────────────┐
│         FEEDLOT SYSTEM              │
├─────────────────────────────────────┤
│ Email: usuario@feedlot.com          │
│                                     │
│ Password: [••••••••]                │
│                                     │
│ [ ] Recordar sesión                 │
│                                     │
│          [Iniciar Sesión]           │
└─────────────────────────────────────┘
```

### Recuperación de Contraseña

El sistema cuenta con un proceso seguro de recuperación de contraseña que protege contra accesos no autorizados.

#### Proceso de Recuperación

1. **Solicitud de Recuperación**
   - En la pantalla de login, haga clic en "¿Olvidó su contraseña?"
   - Ingrese la dirección de email asociada a su cuenta
   - Haga clic en "Enviar Enlace de Recuperación"

2. **Verificación por Email**
   - Recibirá un email con un enlace seguro de recuperación
   - El enlace expira en 60 minutos por seguridad
   - No comparta este enlace con nadie

3. **Establecimiento de Nueva Contraseña**
   - Haga clic en el enlace del email
   - Ingrese la nueva contraseña (mínimo 8 caracteres)
   - Confirme la nueva contraseña
   - Haga clic en "Restablecer Contraseña"

4. **Confirmación**
   - Recibirá confirmación de cambio exitoso
   - Podrá iniciar sesión con la nueva contraseña

#### Consideraciones de Seguridad

- Las contraseñas deben cumplir con políticas de complejidad
- No reutilice contraseñas de otros sistemas
- Cambie la contraseña periódicamente (cada 90 días recomendado)
- Use un gestor de contraseñas para mayor seguridad

### Sesiones y Seguridad

#### Gestión de Sesiones

- **Tiempo de Inactividad**: Sesión expira automáticamente después de 2 horas de inactividad
- **Dispositivos Simultáneos**: Máximo 3 sesiones activas por usuario
- **Registro de Accesos**: Historial completo de inicios de sesión con IP y dispositivo
- **Cierre Seguro**: Siempre use "Cerrar Sesión" para terminar la sesión

#### Detección de Anomalías

El sistema monitorea automáticamente:
- Intentos de acceso fallidos desde IPs desconocidas
- Cambios de contraseña sospechosos
- Accesos desde ubicaciones geográficas inusuales
- Uso de credenciales comprometidas (integración con HaveIBeenPwned)

## Navegación del Sistema

### Interfaz de Usuario

La interfaz del sistema está diseñada con principios de usabilidad moderna, siguiendo las mejores prácticas de UX/UI para aplicaciones web empresariales.

#### Diseño Responsive

- **Desktop**: Interfaz completa con menú lateral expandido
- **Tablet**: Menú colapsable con navegación por gestos
- **Mobile**: Navegación bottom-tab con optimización touch

#### Tema y Personalización

- **Modos de Visualización**: Claro, Oscuro, Automático (sistema)
- **Paleta de Colores**: Configurable por usuario
- **Idioma**: Español, Inglés, Portugués
- **Zona Horaria**: Automática o manual

### Menú Principal

El menú lateral está organizado jerárquicamente por módulos funcionales, con iconos intuitivos y indicadores de estado.

#### 🏠 Dashboard
- **Vista General**: KPIs principales, gráficos de rendimiento, alertas activas
- **Métricas en Tiempo Real**: Animales activos, lotes ocupados, inventarios críticos
- **Accesos Rápidos**: Creación de registros frecuentes, reportes diarios

#### 🐄 Ganadería (Módulo Principal)
Submenú expandible con todas las entidades ganaderas:

- **Animales**: Gestión completa del ganado
  - Lista con filtros avanzados
  - Creación/edición masiva
  - Historial individual detallado
- **Lotes**: Organización física del feedlot
  - Capacidad y ocupación
  - Rendimiento por lote
  - Movimientos entre lotes
- **Razas**: Catálogo de razas bovinas
  - Características productivas
  - Rendimiento histórico
- **Alimentación**: Gestión nutricional
  - Tipos de alimento
  - Raciones por lote
  - Costos y eficiencia
- **Salud**: Control veterinario
  - Registros sanitarios
  - Tratamientos activos
  - Vacunas y protocolos
- **Pesajes**: Control de crecimiento
  - Registro diario/semanal
  - Cálculo automático de GDP
  - Gráficos de evolución

#### 📊 Reportes y Analytics
Módulo de business intelligence integrado:

- **Reportes Operativos**
  - Inventario de animales
  - Rendimiento productivo
  - Consumo alimentario
  - Salud y tratamientos
- **Reportes Ejecutivos**
  - Dashboard financiero
  - KPIs de producción
  - Tendencias y proyecciones
- **Reportes Regulatorios**
  - Trazabilidad completa
  - Registros sanitarios
  - Documentación legal
- **Exportación**: PDF, Excel, CSV con filtros personalizados

#### ⚙️ Configuración del Sistema
Panel administrativo para gestión avanzada:

- **Usuarios y Roles**
  - Gestión de usuarios
  - Asignación de permisos
  - Control de acceso
- **Sistema**
  - Parámetros generales
  - Configuración de alertas
  - Backup y mantenimiento
- **Catálogos**
  - Razas disponibles
  - Tipos de alimento
  - Tratamientos veterinarios

#### 📚 Documentación
Centro de conocimiento integrado:

- **Manuales**: Documentación técnica y de usuario
- **Base de Conocimiento**: Artículos y guías
- **Archivos**: Documentos del feedlot (certificados, licencias)
- **Soporte**: Tickets y comunicación con desarrolladores

### Barra Superior

La barra superior proporciona acceso rápido a funciones críticas y estado del sistema.

#### 👤 Menú de Usuario
- **Perfil**: Edición de datos personales y preferencias
- **Seguridad**: Cambio de contraseña, configuración 2FA
- **Sesiones**: Dispositivos conectados y cierre remoto
- **Cerrar Sesión**: Terminación segura de sesión

#### 🔔 Centro de Notificaciones
Sistema de alertas inteligente:

- **Alertas Críticas**: Tratamientos vencidos, stock crítico
- **Notificaciones Operativas**: Recordatorios de pesajes, vacunaciones pendientes
- **Mensajes del Sistema**: Mantenimiento programado, actualizaciones
- **Comunicaciones**: Mensajes de otros usuarios

#### 🔍 Búsqueda Global
Motor de búsqueda avanzado:

- **Búsqueda por Entidad**: Animales por caravana, usuarios por nombre
- **Filtros Contextuales**: Búsqueda dentro de módulos específicos
- **Búsqueda por Contenido**: Texto completo en observaciones y descripciones
- **Accesos Directos**: Enlaces rápidos a resultados frecuentes

#### 🌙 Selector de Tema
Cambio dinámico entre modos de visualización sin recargar la página.

### Navegación por Teclado

El sistema incluye atajos de teclado para usuarios avanzados:

| Atajo | Función |
|-------|---------|
| `Ctrl + K` | Abrir búsqueda global |
| `Ctrl + B` | Alternar menú lateral |
| `Ctrl + N` | Nuevo registro (según contexto) |
| `Ctrl + S` | Guardar formulario |
| `Esc` | Cerrar modal/diálogo |
| `Ctrl + F` | Buscar en listas |
| `F1` | Abrir ayuda contextual |
| `Ctrl + Shift + R` | Recargar página |

### Navegación por Voz (Experimental)

Para usuarios con discapacidades motoras, el sistema incluye navegación por comandos de voz en español.

## Gestión de Animales

La gestión de animales es el corazón del sistema, permitiendo un control completo del ciclo productivo desde el ingreso hasta la salida del feedlot.

### Lista de Animales

#### Vista General
1. **Acceso**: Navegue a **Ganadería > Animales**
2. **Vista de Tabla**: Lista paginada con información esencial
3. **Vista de Tarjetas**: Vista alternativa para dispositivos móviles
4. **Vista de Mapa**: Ubicación física en el feedlot (si GPS disponible)

#### Filtros y Búsqueda Avanzada
- **Por Caravana**: Búsqueda exacta o parcial
- **Por Lote**: Filtro múltiple de lotes
- **Por Estado**: Activo, Vendido, Muerto, En Tratamiento
- **Por Raza**: Filtro por características productivas
- **Por Fechas**: Rango de entrada/salida
- **Por Peso**: Rangos de peso actual o entrada
- **Búsqueda Global**: Campo unificado con autocompletado

#### Columnas Configurables
- Caravana (siempre visible)
- Raza y lote
- Pesos (entrada/actual/GDP)
- Estado y fechas
- Alertas sanitarias
- Rendimiento relativo

### Creación de Animales

#### Proceso de Ingreso
1. **Acceso al Formulario**: Botón "Nuevo Animal" o atajo `Ctrl + N`
2. **Validación Automática**: Verificación de caravana única
3. **Datos Obligatorios**:

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| **Caravana** | Texto | Único, máx. 20 chars | Identificador oficial del animal |
| **Raza** | Select | Requerido | De catálogo predefinido |
| **Peso Entrada** | Número | > 0, decimal | Peso al ingreso (kg) |
| **Fecha Entrada** | Fecha | ≤ hoy | Fecha de ingreso al feedlot |
| **Lote Asignado** | Select | Requerido | Lote de destino |

4. **Datos Opcionales**:
   - Observaciones de ingreso
   - Fotos del animal
   - Documentación (certificado de origen)

#### Creación Masiva
Para ingreso de lotes grandes:
1. **Importación CSV**: Plantilla descargable con validaciones
2. **Validación por Lotes**: Procesamiento en background
3. **Reporte de Errores**: Archivo con correcciones necesarias

### Edición y Actualización

#### Modificación de Datos
1. **Selección**: Click en fila o botón "Editar"
2. **Campos Editables**: Todos excepto caravana (inmutable)
3. **Auditoría**: Registro automático de cambios
4. **Validaciones**: Mismas reglas que creación

#### Movimientos entre Lotes
1. **Función Especializada**: "Mover a Lote"
2. **Selección Múltiple**: Cambios masivos
3. **Registro Histórico**: Trazabilidad completa
4. **Validación de Capacidad**: Control automático

### Detalles del Animal

#### Perfil Completo
Acceso desde la lista o búsqueda:

- **Información Básica**: Caravana, raza, lote, estado
- **Pesos y Rendimiento**: Historial completo con gráficos
- **Línea Temporal**: Eventos importantes (ingreso, tratamientos, pesajes)
- **Documentos Asociados**: Certificados, análisis, fotos

#### Historial Integrado
- **Pesajes**: Evolución con GDP calculado automáticamente
- **Alimentación**: Raciones recibidas por período
- **Salud**: Tratamientos, vacunas, retiros activos
- **Movimientos**: Cambios de lote con motivos
- **Costos**: Desglose por categoría (alimentación, salud, etc.)

### Estados del Animal

#### Ciclo de Vida
```
Ingreso → Activo → En Tratamiento → Recuperado → Listo para Venta → Vendido
    ↓         ↓                                                ↓
  Muerto    Tratamiento Activo                            Retirado Temporal
```

#### Estados Especiales
- **En Retiro**: Animal con tratamiento activo, no comercializable
- **Observación**: Animal bajo monitoreo veterinario
- **CuARENTENA**: Aislamiento sanitario obligatorio
- **Descartado**: Animal no apto para engorde

### Eliminación y Archivado

#### Consideraciones
- **No Eliminación Física**: Sistema de "soft delete"
- **Archivado**: Movimiento a tabla histórica
- **Motivos**: Registro obligatorio de eliminación
- **Recuperación**: Posible restauración por administradores

#### Proceso
1. **Confirmación Doble**: Diálogo con motivo requerido
2. **Validaciones**: Verificación de dependencias (tratamientos activos, etc.)
3. **Auditoría**: Registro completo del usuario y timestamp

## Gestión de Lotes

### Ver Lista de Lotes

1. Navegue a **Ganadería > Lotes**
2. Se mostrará una tabla con todos los lotes registrados

### Crear Nuevo Lote

1. En la lista de lotes, haga clic en "Crear Lote"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Nombre | Nombre del lote (máx. 50 caracteres, único) | Sí |
   | Capacidad | Número máximo de animales | No |
   | Descripción | Descripción del lote | No |
   | Activo | Si el lote está activo | No |

3. Haga clic en "Guardar"

### Editar/Eliminar Lote

Similar al proceso de animales, usando los botones correspondientes en la lista.

## Gestión de Razas

### Ver Lista de Razas

1. Navegue a **Ganadería > Razas**
2. Se mostrará una tabla con todas las razas registradas

### Crear Nueva Raza

1. En la lista de razas, haga clic en "Crear Raza"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Nombre | Nombre de la raza (máx. 50 caracteres, único) | Sí |

3. Haga clic en "Guardar"

## Gestión de Tipos de Alimento

### Ver Lista de Tipos de Alimento

1. Navegue a **Ganadería > Tipos de Alimento**
2. Se mostrará una tabla con todos los tipos de alimento registrados

### Crear Nuevo Tipo de Alimento

1. En la lista de tipos, haga clic en "Crear Tipo de Alimento"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Nombre | Nombre del tipo de alimento (máx. 100 caracteres, único) | Sí |
   | Composición | Descripción de la composición | No |

3. Haga clic en "Guardar"

## Gestión de Suministros

### Ver Lista de Suministros

1. Navegue a **Ganadería > Suministros**
2. Se mostrará una tabla con todos los suministros registrados

### Crear Nuevo Suministro

1. En la lista de suministros, haga clic en "Crear Suministro"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Nombre | Nombre del suministro (máx. 100 caracteres, único) | Sí |
   | Tipo | Tipo de suministro (Sanitario/Alimenticio) | Sí |
   | Stock actual | Cantidad actual en inventario | Sí |
   | Unidad | Unidad de medida (kg, litros, etc.) | Sí |
   | Stock mínimo | Cantidad mínima para alertas | Sí |

3. Haga clic en "Guardar"

## Registro de Pesajes

### Ver Lista de Pesajes

1. Navegue a **Ganadería > Pesajes**
2. Se mostrará una tabla con todos los pesajes registrados

### Crear Nuevo Pesaje

1. En la lista de pesajes, haga clic en "Crear Pesaje"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Animal | Seleccione el animal | Sí |
   | Fecha | Fecha del pesaje | Sí |
   | Peso | Peso registrado (kg) | Sí |
   | Ganancia diaria | Ganancia de peso diaria (kg) | No |

3. Haga clic en "Guardar"

## Registro de Alimentación

### Ver Lista de Alimentaciones

1. Navegue a **Ganadería > Alimentaciones**
2. Se mostrará una tabla con todos los registros de alimentación

### Crear Nuevo Registro de Alimentación

1. En la lista de alimentaciones, haga clic en "Crear Alimentación"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Lote | Lote que recibe la alimentación | Sí |
   | Tipo de alimento | Tipo de alimento utilizado | Sí |
   | Fecha | Fecha de la alimentación | Sí |
   | Ración por kg | Cantidad de alimento por kg de peso | Sí |
   | Ración total | Cantidad total de alimento | Sí |

3. Haga clic en "Guardar"

## Gestión Sanitaria y Veterinaria

El módulo de salud integra control veterinario completo con alertas automáticas, gestión de tratamientos y cumplimiento regulatorio.

### Registros Sanitarios

#### Tipos de Registros
- **Enfermedades**: Diagnósticos clínicos con tratamientos específicos
- **Lesiones**: Traumatismos y heridas con protocolos de curación
- **Prevención**: Vacunas y tratamientos profilácticos
- **Monitoreo**: Controles rutinarios y chequeos de salud

#### Creación de Registros
1. **Acceso**: Ganadería > Salud > Nuevo Registro
2. **Selección de Animal**: Búsqueda por caravana con autocompletado
3. **Clasificación**:

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| **Tipo** | Select | Requerido | Categoría del registro sanitario |
| **Descripción** | Textarea | Requerido | Síntomas, diagnóstico detallado |
| **Fecha** | Date | ≤ hoy | Fecha del registro/diagnóstico |
| **Veterinario** | Select | Requerido | Profesional responsable |
| **Costo** | Decimal | ≥ 0 | Gastos asociados al tratamiento |
| **Días Retiro** | Integer | ≥ 0 | Período de cuarentena |
| **Fecha Liberación** | Date | Auto-calculada | Fecha automática |
| **Observaciones** | Textarea | Opcional | Notas adicionales |

#### Validaciones Automáticas
- Fecha de liberación ≥ fecha del registro
- Veterinario debe tener rol correspondiente
- Costo debe ser positivo para tratamientos
- Alertas de tratamientos activos en el animal

### Gestión de Tratamientos

#### Catálogo de Tratamientos
Base de conocimientos veterinarios integrada:

- **Búsqueda Inteligente**: Por síntomas, enfermedad o tipo
- **Protocolos Estándar**: Tratamientos validados por especialistas
- **Dosificación**: Cálculos automáticos por peso del animal
- **Contraindicaciones**: Alertas de interacciones medicamentosas

#### Aplicación de Tratamientos
1. **Selección del Protocolo**: De catálogo o personalizado
2. **Cálculo de Dosis**: Automático basado en peso y especie
3. **Registro de Aplicación**: Fecha, lote, responsable
4. **Seguimiento**: Recordatorios de dosis siguientes

### Sistema de Vacunas

#### Catálogo de Vacunas
- **Nombre y Laboratorio**: Identificación completa
- **Días de Retiro**: Período post-vacunación
- **Esquemas**: Programas de vacunación recomendados

#### Registro de Aplicaciones
1. **Selección de Vacuna**: De catálogo disponible
2. **Verificación de Lote**: Control de caducidad
3. **Registro por Animal**: Individual o masivo
4. **Control de Esquemas**: Alertas de vacunas pendientes

### Alertas y Monitoreo Sanitario

#### Alertas Automáticas
- **Tratamientos Vencidos**: Animales listos para liberación
- **Vacunas Pendientes**: Según esquemas programados
- **Retiros Activos**: Animales en cuarentena
- **Stock de Medicamentos**: Alertas de suministros bajos

#### Dashboard Sanitario
- **Morbilidad por Lote**: Incidencia de enfermedades
- **Costos Sanitarios**: Gastos por período y categoría
- **Eficiencia de Tratamientos**: Tasa de éxito por protocolo
- **Cumplimiento Regulatorio**: Verificación de registros obligatorios

### Reportes Sanitarios

#### Reportes Disponibles
- **Historial por Animal**: Cronología completa de salud
- **Tratamientos Activos**: Animales en retiro con fechas de liberación
- **Estadísticas de Morbilidad**: Por lote, raza y período
- **Costos Veterinarios**: Desglose detallado de gastos
- **Cumplimiento de Vacunas**: Cobertura de esquemas

#### Exportación y Análisis
- **Formatos**: PDF para documentación, Excel para análisis
- **Filtros Avanzados**: Por fechas, tipos, veterinarios
- **Gráficos**: Tendencias de salud y costos
- **Alertas Regulatorias**: Reportes para autoridades sanitarias

## Reportes y Business Intelligence

El módulo de reportes proporciona herramientas avanzadas de análisis para la toma de decisiones estratégicas y operativas del feedlot.

### Dashboard Ejecutivo

#### KPIs Principales
- **Eficiencia Productiva**: GDP promedio, conversión alimentaria
- **Rendimiento Financiero**: Costos por kg ganado, márgenes
- **Salud General**: Índice de morbilidad, días de retiro promedio
- **Inventarios**: Rotación de suministros, niveles de stock

#### Gráficos Interactivos
- **Tendencias de Peso**: Evolución individual y grupal
- **Distribución por Lotes**: Ocupación y rendimiento comparativo
- **Costos Operativos**: Desglose por categorías
- **Alertas Activas**: Indicadores de problemas críticos

### Reportes Operativos

#### 1. Reporte de Inventario de Animales
**Propósito**: Control del ganado activo y proyecciones de salida

- **Métricas Principales**:
  - Conteo total por lote y raza
  - Distribución por estado (activo, en tratamiento, listo para venta)
  - Ocupación de capacidad por lote
  - Proyecciones de salida basadas en tendencias

- **Filtros Disponibles**:
  - Por lote (múltiple selección)
  - Por raza y categoría
  - Por rango de fechas de entrada
  - Por estado operativo

- **Formatos de Exportación**:
  - PDF: Formato ejecutivo con gráficos
  - Excel: Datos crudos para análisis
  - CSV: Para integración con otros sistemas

#### 2. Análisis de Rendimiento Productivo
**Propósito**: Evaluación de eficiencia y optimización de procesos

- **Indicadores de Rendimiento**:
  - **GDP (Ganancia Diaria Promedio)**: Por animal, lote y período
  - **Conversión Alimentaria**: kg alimento / kg ganado
  - **Tasa de Crecimiento**: Comparación con estándares por raza
  - **Eficiencia Económica**: Costo por kg producido

- **Análisis Comparativos**:
  - Rendimiento por lote
  - Evolución temporal
  - Comparación con benchmarks del sector
  - Impacto de variables (alimentación, salud, manejo)

#### 3. Reporte de Alimentación y Nutrición
**Propósito**: Control de costos nutricionales y eficiencia alimentaria

- **Métricas de Consumo**:
  - Raciones diarias por lote
  - Costo por kg de alimento
  - Eficiencia de conversión
  - Variaciones vs. plan nutricional

- **Análisis de Costos**:
  - Costo total de alimentación por período
  - Costo por kg ganado producido
  - Comparativo entre tipos de alimento
  - Tendencias de precios

#### 4. Reporte Sanitario y Veterinario
**Propósito**: Monitoreo de salud y cumplimiento sanitario

- **Indicadores de Salud**:
  - Incidencia de enfermedades por lote
  - Costos veterinarios totales
  - Días promedio de retiro
  - Tasa de mortalidad

- **Control de Tratamientos**:
  - Tratamientos activos con fechas de liberación
  - Historial por animal
  - Eficacia de protocolos veterinarios
  - Costos por tipo de afección

#### 5. Gestión de Inventarios
**Propósito**: Control de suministros y optimización de compras

- **Estado de Inventarios**:
  - Niveles actuales vs. mínimos
  - Rotación por tipo de producto
  - Valorización de stock
  - Productos próximos a vencer

- **Alertas y Recomendaciones**:
  - Productos bajo stock mínimo
  - Sugerencias de reposición
  - Análisis de consumo histórico
  - Optimización de pedidos

### Reportes Regulatorios y de Trazabilidad

#### Cumplimiento Sanitario
- **Registros Veterinarios**: Documentación completa para autoridades
- **Trazabilidad Individual**: Historial completo por animal
- **Certificaciones**: Documentos requeridos para comercialización

#### Reportes Financieros
- **Costos Operativos**: Desglose por categorías
- **Análisis de Rentabilidad**: Por lote y período
- **Proyecciones Financieras**: Basadas en tendencias actuales

### Herramientas Avanzadas

#### Programación de Reportes
- **Reportes Automáticos**: Envío por email en horarios definidos
- **Suscripciones Personalizadas**: Reportes específicos por usuario
- **Alertas por Umbrales**: Notificaciones cuando KPIs salen de rangos normales

#### Análisis Predictivo
- **Proyecciones de Crecimiento**: Basadas en datos históricos
- **Estimaciones de Salida**: Fechas óptimas de comercialización
- **Optimización de Alimentación**: Recomendaciones basadas en IA

#### Integración con Herramientas Externas
- **Exportación a Power BI**: Para análisis avanzados
- **API para Sistemas Externos**: Integración con ERP ganadero
- **Sincronización con Nubes**: Google Sheets, Excel Online

### Generación y Personalización

#### Creación de Reportes Personalizados
1. **Selección de Datos**: Campos y métricas deseadas
2. **Aplicación de Filtros**: Criterios específicos de negocio
3. **Formato y Diseño**: Personalización visual
4. **Programación**: Frecuencia de generación automática

#### Optimización de Rendimiento
- **Procesamiento en Background**: Reportes pesados sin bloquear interfaz
- **Cache Inteligente**: Aceleración de reportes frecuentes
- **Compresión de Datos**: Optimización para dispositivos móviles

## Gestión de Usuarios y Seguridad

El sistema implementa un modelo de seguridad avanzado con control de acceso basado en roles y permisos granulares.

### Perfil de Usuario

#### Acceso a Perfil Personal
1. **Ubicación**: Click en nombre de usuario (barra superior)
2. **Secciones Disponibles**:
   - Información Personal
   - Preferencias de Sistema
   - Seguridad y Acceso
   - Historial de Actividad

#### Información Personal
- **Datos Básicos**: Nombre, email, teléfono, especialidad
- **Avatar**: Foto de perfil personalizable
- **Idioma y Zona Horaria**: Preferencias regionales
- **Notificaciones**: Configuración de alertas

#### Configuración de Seguridad
- **Cambio de Contraseña**: Proceso seguro con validaciones
- **Autenticación de Dos Factores**: Configuración de 2FA
- **Sesiones Activas**: Control de dispositivos conectados
- **Historial de Acceso**: Registro de inicios de sesión

### Sistema de Roles y Permisos

#### Roles Predefinidos

| Rol | Descripción | Permisos Principales |
|-----|-------------|---------------------|
| **Administrador** | Control total del sistema | Todos los permisos, gestión de usuarios |
| **Gerente** | Supervisión operativa | Reportes, configuración, aprobación de cambios |
| **Operador** | Usuario operativo básico | CRUD en módulos asignados |
| **Veterinario** | Control sanitario | Registros de salud, tratamientos, reportes veterinarios |
| **Auditor** | Solo lectura | Acceso a reportes e históricos |

#### Permisos Granulares
Los permisos se asignan por módulo y acción específica:

- **Animales**: Crear, editar, eliminar, ver detalles
- **Salud**: Diagnósticos, tratamientos, vacunas
- **Alimentación**: Registro de raciones, modificación de planes
- **Reportes**: Visualización, exportación, programación
- **Configuración**: Usuarios, catálogos, parámetros del sistema

### Gestión de Usuarios (Administradores)

#### Creación de Usuarios
1. **Acceso**: Configuración > Usuarios > Nuevo Usuario
2. **Proceso de Invitación**:
   - Ingreso de email y rol básico
   - Envío automático de invitación
   - Usuario completa registro con contraseña

3. **Campos Obligatorios**:
   - Email (único en el sistema)
   - Nombre completo
   - Rol inicial
   - Departamento (opcional)

#### Asignación de Roles y Permisos
1. **Roles Estándar**: Asignación directa desde lista predefinida
2. **Permisos Personalizados**: Configuración granular por módulo
3. **Herencia de Permisos**: Roles pueden heredar permisos de otros roles
4. **Override de Permisos**: Posibilidad de modificar permisos específicos

#### Gestión de Acceso
- **Activación/Desactivación**: Control de usuarios activos
- **Restablecimiento de Contraseña**: Para usuarios con problemas
- **Auditoría de Acceso**: Historial completo de cambios de permisos
- **Sesiones Concurrentes**: Límite configurable por rol

### Seguridad Avanzada

#### Autenticación Multifactor (2FA)
- **Aplicaciones Soportadas**: Google Authenticator, Authy, Microsoft Authenticator
- **Códigos de Recuperación**: Backup codes para emergencias
- **Configuración Obligatoria**: Para roles administrativos
- **Verificación por IP**: Alertas de accesos desde ubicaciones inusuales

#### Control de Sesiones
- **Tiempo de Inactividad**: Auto-logout configurable (15-120 minutos)
- **Dispositivos Simultáneos**: Máximo configurable por rol
- **Cierre Remoto**: Terminación de sesiones desde cualquier dispositivo
- **Registro de Actividad**: Historial completo con timestamps e IPs

#### Políticas de Contraseña
- **Complejidad**: Mínimo 8 caracteres, mayúsculas, minúsculas, números, símbolos
- **Historial**: No reutilización de últimas 5 contraseñas
- **Expiración**: Cambio obligatorio cada 90 días
- **Intentos Fallidos**: Bloqueo temporal después de 5 intentos

### Auditoría y Monitoreo

#### Registro de Actividad
- **Acciones Críticas**: Creación/edición de usuarios, cambios de permisos
- **Acceso a Datos Sensibles**: Registros sanitarios, información financiera
- **Cambios de Configuración**: Modificaciones a parámetros del sistema
- **Intentos de Acceso**: Fallidos y exitosos con detalles

#### Reportes de Seguridad
- **Actividad por Usuario**: Historial completo de acciones
- **Alertas de Seguridad**: Intentos sospechosos, accesos no autorizados
- **Cumplimiento**: Verificación de políticas de seguridad
- **Auditorías Externas**: Exportación de logs para compliance

## Configuración del Sistema

### Configuración General

1. Navegue a **Configuración**
2. Modifique parámetros del sistema según sea necesario

## Documentación

### Gestión de Documentos

1. Navegue a **Documentación**
2. Suba archivos relacionados con el feedlot
3. Organice documentos por categorías

## Solución de Problemas y Soporte

### Diagnóstico de Problemas

#### Herramientas de Diagnóstico Integradas
- **Verificador de Conectividad**: Prueba automática de conexión a servicios
- **Analizador de Rendimiento**: Identificación de cuellos de botella
- **Registro de Errores**: Logs detallados con contexto completo
- **Modo Debug**: Información técnica para soporte

### Problemas Comunes y Soluciones

#### 🔐 Problemas de Acceso y Autenticación

**No puedo iniciar sesión**
- **Síntomas**: Mensaje "Credenciales inválidas"
- **Soluciones**:
  - Verificar mayúsculas/minúsculas en email
  - Confirmar que la tecla Caps Lock esté desactivada
  - Intentar "Recuperar contraseña" si olvidó la clave
  - Verificar que la cuenta esté activa (consultar administrador)

**Problemas con 2FA**
- **Código no funciona**: Verificar sincronización horaria del dispositivo
- **Aplicación no reconoce**: Re-escanear código QR de configuración
- **Códigos de respaldo**: Usar códigos de recuperación de emergencia

**Sesión expirada inesperadamente**
- **Causa**: Inactividad prolongada o configuración de seguridad
- **Solución**: Reingresar credenciales o ajustar tiempo de sesión

#### 🌐 Problemas de Conectividad

**Sistema lento o no responde**
- **Diagnóstico**:
  - Verificar velocidad de conexión (mínimo 10 Mbps)
  - Cerrar pestañas innecesarias
  - Limpiar caché del navegador (Ctrl+F5)
  - Verificar si otros sitios web funcionan

**Pérdida intermitente de conexión**
- **Posibles causas**: Problemas de red, firewall, VPN
- **Solución**: Cambiar a conexión cableada, verificar configuración de red

#### 📝 Problemas con Formularios y Datos

**Error al guardar registros**
- **Validaciones comunes**:
  - Campos requeridos incompletos (marcados con *)
  - Datos duplicados (caravanas, emails únicos)
  - Fechas inválidas (futuras o incoherentes)
  - Valores fuera de rango (pesos negativos, etc.)

**Datos no se actualizan**
- **Solución**: Verificar permisos de edición para el rol
- **Verificación**: Recargar página (F5) para ver cambios

#### 🖥️ Problemas de Interfaz

**Elementos no se muestran correctamente**
- **Solución**: Limpiar caché del navegador
- **Alternativa**: Probar en modo incógnito
- **Responsive**: Verificar en diferentes tamaños de pantalla

**Funcionalidades no disponibles**
- **Causa**: Permisos insuficientes para el rol asignado
- **Verificación**: Consultar administrador para ajuste de permisos

#### 🔄 Problemas de Sincronización

**Datos no se reflejan en reportes**
- **Solución**: Esperar procesamiento en background (hasta 5 minutos)
- **Verificación**: Buscar en "Procesos en ejecución" en configuración

**Alertas duplicadas**
- **Causa**: Múltiples sesiones abiertas
- **Solución**: Cerrar sesiones duplicadas

### Herramientas de Resolución Avanzada

#### Modo Desarrollador
1. **Acceso**: Presionar F12 en el navegador
2. **Consola**: Revisar errores de JavaScript
3. **Red**: Verificar requests fallidos
4. **Aplicación**: Estado de almacenamiento local

#### Información del Sistema
- **Versión del navegador y SO**: Para compatibilidad
- **Configuración de red**: Tipo de conexión
- **Dispositivo**: Desktop, tablet, móvil
- **Ubicación**: Para problemas regionales

### Escalamiento de Soporte

#### Nivel 1: Auto-resolución
- Consultar este manual
- Verificar en sección de preguntas frecuentes
- Usar herramientas de diagnóstico integradas

#### Nivel 2: Soporte Técnico
- **Email**: soporte@feedlot.com
- **Chat en vivo**: Disponible 8:00 AM - 8:00 PM (hora local)
- **Teléfono**: +54 11 1234-5678
- **Tiempo de respuesta**: 4 horas hábiles

#### Nivel 3: Soporte Especializado
- **Issues críticos**: Respuesta en 1 hora
- **Problemas de seguridad**: Atención inmediata
- **Modificaciones al sistema**: Coordinación con desarrollo

### Información para Reportar Problemas

#### Plantilla de Reporte de Bug
```
Asunto: [MÓDULO] - Descripción breve del problema

Descripción detallada:
- Pasos para reproducir
- Comportamiento esperado
- Comportamiento actual
- Capturas de pantalla (si aplica)

Información del entorno:
- Navegador y versión
- Sistema operativo
- Rol de usuario
- Fecha/hora del problema
- URL donde ocurre
```

#### Información de Contacto

**Soporte Técnico Principal**
- **Email**: soporte@feedlot.com
- **Teléfono**: +54 11 1234-5678
- **Horario**: Lunes a Domingo, 8:00 AM - 8:00 PM ART
- **Chat**: Disponible en la aplicación (ícono de soporte)

**Soporte de Emergencias**
- **Teléfono 24/7**: +54 911 1234-5678
- **Email crítico**: emergency@feedlot.com

**Comunidad y Documentación**
- **Base de conocimiento**: docs.feedlot.com
- **Foro de usuarios**: community.feedlot.com
- **Actualizaciones del sistema**: changelog.feedlot.com

## Glosario Técnico

### Terminología Ganadera

- **Caravana**: Identificador único del animal (tatuaje o chip electrónico)
- **Feedlot**: Instalación especializada para engorde intensivo de ganado bovino
- **Lote**: Grupo homogéneo de animales en un área definida del feedlot
- **Ración**: Cantidad diaria de alimento asignada por animal o lote
- **GDP (Ganancia Diaria Promedio)**: Incremento de peso diario en kg
- **Conversión Alimentaria**: Kilogramos de alimento necesarios por kg de carne producida
- **Retiro Sanitario**: Período post-tratamiento donde el animal no puede comercializarse

### Terminología Técnica

- **CRUD**: Create, Read, Update, Delete - operaciones básicas de datos
- **API**: Application Programming Interface - interfaz para integración con otros sistemas
- **2FA**: Two-Factor Authentication - autenticación de dos factores
- **RBAC**: Role-Based Access Control - control de acceso basado en roles
- **FIFO**: First In, First Out - método de rotación de inventarios
- **Soft Delete**: Eliminación lógica que preserva datos para auditoría

### Terminología de Salud Animal

- **Morbilidad**: Tasa de enfermedad en una población
- **Profilaxis**: Prevención de enfermedades
- **Etiología**: Estudio de las causas de enfermedades
- **Protocolo**: Conjunto estandarizado de procedimientos médicos
- **Cuarentena**: Aislamiento sanitario preventivo

## Apéndice A: Referencias Rápidas

### Atajos de Teclado

#### Navegación General
- `Ctrl + K`: Abrir búsqueda global
- `Ctrl + B`: Alternar menú lateral
- `Ctrl + ,`: Abrir configuración
- `F1`: Ayuda contextual

#### Formularios y Edición
- `Ctrl + S`: Guardar formulario
- `Ctrl + N`: Nuevo registro
- `Esc`: Cerrar modal/diálogo
- `Tab`: Navegar entre campos

#### Listas y Tablas
- `Ctrl + F`: Buscar en listas
- `↑/↓`: Navegar filas
- `Enter`: Seleccionar/Editar
- `Delete`: Eliminar registro (con confirmación)

#### Reportes y Exportación
- `Ctrl + P`: Imprimir/Exportar
- `Ctrl + E`: Exportar a Excel
- `Ctrl + Shift + P`: Vista previa de PDF

### Combinaciones Especiales
- `Ctrl + Shift + R`: Recargar página forzada
- `Ctrl + Shift + I`: Abrir herramientas de desarrollo
- `Ctrl + Alt + C`: Copiar datos de fila
- `Ctrl + Alt + V`: Pegar datos masivos

## Apéndice B: Códigos de Estado y Error

### Códigos HTTP
- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos o incompletos
- **401**: Unauthorized - Credenciales inválidas o expiradas
- **403**: Forbidden - Permisos insuficientes
- **404**: Not Found - Recurso no encontrado
- **409**: Conflict - Conflicto de datos (duplicados, etc.)
- **422**: Unprocessable Entity - Validación fallida
- **429**: Too Many Requests - Rate limiting activado
- **500**: Internal Server Error - Error del servidor
- **503**: Service Unavailable - Servicio temporalmente no disponible

### Códigos de Error de Aplicación
- **VALIDATION_ERROR**: Datos no pasan validaciones
- **PERMISSION_DENIED**: Usuario sin permisos para la acción
- **RESOURCE_NOT_FOUND**: Entidad solicitada no existe
- **DUPLICATE_ENTRY**: Intento de crear registro duplicado
- **FOREIGN_KEY_CONSTRAINT**: Violación de integridad referencial
- **DATABASE_ERROR**: Error en operaciones de base de datos
- **NETWORK_ERROR**: Problemas de conectividad
- **SESSION_EXPIRED**: Sesión de usuario expirada

## Apéndice C: API REST (Referencia para Desarrolladores)

### Autenticación
```
POST /api/login
Content-Type: application/json

{
  "email": "usuario@feedlot.com",
  "password": "contraseña",
  "remember": true
}
```

### Endpoints Principales

#### Animales
```
GET    /api/animals              # Listar animales
POST   /api/animals              # Crear animal
GET    /api/animals/{id}         # Obtener animal específico
PUT    /api/animals/{id}         # Actualizar animal
DELETE /api/animals/{id}         # Eliminar animal
```

#### Registros de Salud
```
GET    /api/health-records       # Listar registros
POST   /api/health-records       # Crear registro
GET    /api/health-records/{id}  # Obtener registro
PUT    /api/health-records/{id}  # Actualizar registro
```

#### Reportes
```
GET    /api/reports/animals      # Reporte de animales
GET    /api/reports/weighings    # Reporte de pesajes
GET    /api/reports/feedings     # Reporte de alimentación
GET    /api/reports/health       # Reporte sanitario
```

### Parámetros de Consulta
- `?page=2&per_page=50`: Paginación
- `?search=caravana123`: Búsqueda de texto
- `?lot_id=1`: Filtrar por lote
- `?date_from=2024-01-01&date_to=2024-12-31`: Rango de fechas

## Apéndice D: Versiones y Cambios

### Historial de Versiones

#### Versión 2.1.0 (Enero 2026)
- **Correcciones Técnicas**: Reemplazo html2canvas por dom-to-image-more para mejor compatibilidad
- **Configuración Tailwind**: Actualización a v4.0.0 con @theme directive
- **Autenticación Mejorada**: Correcciones en controladores 2FA para mayor estabilidad
- **Generación de Imágenes**: Mejora en exportación de gráficos en reportes

#### Versión 2.0.0 (Enero 2026)
- **Nueva Arquitectura**: Migración a Laravel 12 + React 19
- **Sistema de Roles**: Implementación completa de RBAC
- **Módulo Sanitario**: Gestión veterinaria avanzada
- **Reportes BI**: Business Intelligence integrado
- **Interfaz Moderna**: Diseño responsive completo
- **API REST**: Endpoints completos para integraciones

#### Versión 1.5.0 (Junio 2025)
- **Autenticación 2FA**: Seguridad mejorada
- **Dashboard Ejecutivo**: KPIs en tiempo real
- **Importación Masiva**: CSV para animales
- **Alertas Inteligentes**: Sistema de notificaciones

#### Versión 1.0.0 (Enero 2025)
- **Lanzamiento Inicial**: Funcionalidades básicas
- **Gestión de Animales**: CRUD completo
- **Pesajes y Alimentación**: Registros básicos
- **Reportes Simples**: Exportación PDF/Excel

### Roadmap de Desarrollo

#### Versión 2.1.0 (Q2 2026)
- **IA Predictiva**: Recomendaciones automáticas
- **Integración IoT**: Sensores en tiempo real
- **Aplicación Móvil**: App nativa para operarios

#### Versión 2.2.0 (Q4 2026)
- **Blockchain**: Trazabilidad inmutable
- **Realidad Aumentada**: Identificación visual de animales
- **Analytics Avanzado**: Machine Learning integrado

## Apéndice E: Mejores Prácticas

### Gestión Operativa

#### Ingreso de Animales
1. **Verificación Previa**: Control sanitario en origen
2. **Pesaje Inicial**: Precisión en báscula calibrada
3. **Fotografía**: Registro visual para identificación
4. **Documentación**: Certificados sanitarios completos

#### Manejo Diario
1. **Pesajes Regulares**: Mínimo semanal, ideal diario
2. **Observación Visual**: Detección temprana de problemas
3. **Registro de Eventos**: Cualquier cambio significativo
4. **Mantenimiento de Equipos**: Calibración periódica

#### Salud Preventiva
1. **Vacunación Sistemática**: Según calendario establecido
2. **Monitoreo Constante**: Alertas de comportamiento anormal
3. **Registro Detallado**: Todos los tratamientos con seguimiento
4. **Análisis Periódicos**: Exámenes complementarios

### Gestión de Datos

#### Calidad de Información
- **Consistencia**: Usar catálogos estandarizados
- **Completitud**: Llenar todos los campos requeridos
- **Actualización**: Mantener datos al día
- **Verificación**: Revisiones periódicas de exactitud

#### Seguridad de Datos
- **Respaldos**: Copias de seguridad diarias
- **Encriptación**: Datos sensibles protegidos
- **Acceso Controlado**: Permisos mínimos necesarios
- **Auditoría**: Registro de todos los cambios

### Optimización de Procesos

#### Eficiencia Alimentar
- **Raciones Balanceadas**: Según etapa productiva
- **Control de Consumo**: Monitoreo de sobras y rechazos
- **Ajustes Dinámicos**: Modificaciones basadas en rendimiento
- **Costos Optimizados**: Comparación de alternativas

#### Rendimiento Productivo
- **Metas Realistas**: Basadas en estándares de la raza
- **Monitoreo Continuo**: GDP y conversión alimentaria
- **Factores Externos**: Considerar clima, densidad, salud
- **Benchmarking**: Comparación con mejores prácticas

---

**Documentación Oficial del Sistema Feedlot**
*Versión 2.0.0 - Enero 2026*
*Esta documentación se actualiza automáticamente con cada release del sistema.*