# Especificación de Requisitos de Software

## Sistema de Gestión de Feedlot

**Versión:** 2.0
**Fecha:** Enero 2026
**Autor:** Equipo de Desarrollo
**Revisado por:** Equipo de Calidad
**Estado:** Aprobado

---

## 1. Introducción

### 1.1 Propósito

Este documento describe de manera comprehensiva los requisitos funcionales y no funcionales del Sistema de Gestión de Feedlot, una aplicación web moderna desarrollada con tecnologías de vanguardia para la administración integral de operaciones en instalaciones de engorde de ganado. El sistema proporciona una plataforma centralizada y eficiente para gestionar el ciclo completo de vida de los animales, optimizando procesos operativos, mejorando la trazabilidad y facilitando la toma de decisiones basada en datos.

El propósito principal es digitalizar y automatizar las operaciones tradicionales de un feedlot, reduciendo errores manuales, mejorando la eficiencia operativa y proporcionando herramientas analíticas avanzadas para la gestión estratégica del negocio ganadero.

### 1.2 Alcance

El sistema abarca las siguientes áreas principales de funcionalidad:

#### Gestión de Activos Biológicos
- **Animales**: Registro completo del ciclo de vida, desde ingreso hasta salida
- **Lotes**: Organización espacial y gestión de capacidad
- **Razas**: Catálogo de razas con características específicas

#### Gestión Operativa
- **Alimentación**: Control preciso de raciones y tipos de alimento
- **Pesajes**: Seguimiento del crecimiento y rendimiento individual
- **Salud**: Registros veterinarios, tratamientos y protocolos sanitarios
- **Vacunas**: Gestión de esquemas vacunales y retiros

#### Gestión de Recursos
- **Suministros**: Inventario de medicamentos, alimentos y materiales
- **Catálogo de Tratamientos**: Base de conocimientos veterinarios

#### Análisis y Reportes
- **Reportes Operativos**: Inventarios, consumos, rendimientos
- **Reportes Sanitarios**: Historiales médicos, tratamientos activos
- **Análisis de Datos**: Métricas de rendimiento y tendencias

#### Administración del Sistema
- **Gestión de Usuarios**: Control de acceso basado en roles y permisos
- **Configuración**: Parámetros del sistema y personalización
- **Documentación**: Gestión de archivos y procedimientos

### 1.3 Definiciones, Acrónimos y Abreviaturas

#### Términos Técnicos
- **CRUD**: Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar)
- **API**: Application Programming Interface
- **SPA**: Single Page Application
- **ORM**: Object-Relational Mapping
- **MVC**: Model-View-Controller
- **JWT**: JSON Web Tokens

#### Términos del Dominio
- **Feedlot**: Instalación especializada para engorde intensivo de ganado
- **Caravana**: Identificador único del animal en el sistema ganadero nacional
- **Lote**: Grupo de animales alojados en una misma área física con características homogéneas
- **Ración**: Cantidad específica de alimento asignada por animal o lote
- **Retiro**: Período durante el cual el animal no puede comercializarse debido a tratamientos veterinarios
- **Ganancia Diaria de Peso (GDP)**: Incremento promedio de peso por día
- **Conversión Alimentaria**: Relación entre alimento consumido y peso ganado

### 1.4 Referencias

#### Estándares y Metodologías
- IEEE 830-1998: Recommended Practice for Software Requirements Specifications
- ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models

#### Documentación Técnica
- Laravel Framework Documentation (v12.46.0)
- Inertia.js Documentation (v2.0.18)
- React Documentation (v19.2.3)
- Tailwind CSS Documentation (v4.1.18)
- Pest Testing Framework Documentation (v4.3.1)

#### Referencias del Dominio
- Manual de Buenas Prácticas Ganaderas (SENASA)
- Normativas de Trazabilidad Bovina Argentina
- Estándares Internacionales de Bienestar Animal

---

## 2. Descripción General

### 2.1 Perspectiva del Producto

El Sistema de Gestión de Feedlot es una aplicación web empresarial que implementa una arquitectura moderna de tres capas (presentación, lógica de negocio, datos) utilizando el patrón MVC (Model-View-Controller). La separación clara entre frontend y backend permite una experiencia de usuario fluida mediante Inertia.js, que combina la capacidad de renderizado del lado del servidor con la interactividad del lado del cliente.

El sistema se integra con bases de datos relacionales (SQLite para desarrollo, MySQL/PostgreSQL para producción) y proporciona una interfaz unificada para la gestión integral de operaciones ganaderas. La arquitectura modular permite extensiones futuras y facilita el mantenimiento del código.

#### Arquitectura Técnica
- **Frontend**: React 19.2.3 con Inertia.js 2.0.18 para navegación SPA
- **Backend**: Laravel 12.46.0 con PHP 8.4.1
- **Base de Datos**: ORM Eloquent con soporte para múltiples motores
- **Estilos**: Tailwind CSS 4.1.18 con tema claro/oscuro
- **Autenticación**: Laravel Fortify con soporte para 2FA
- **Autorización**: Sistema de roles y permisos basado en políticas

### 2.2 Funciones del Producto

#### Funciones Principales
- **Gestión Integral del Ciclo de Vida**: Desde ingreso hasta salida del animal
- **Control de Inventarios**: Suministros, alimentos y medicamentos con alertas
- **Gestión Sanitaria**: Registros veterinarios, tratamientos y esquemas vacunales
- **Análisis de Rendimiento**: Métricas de crecimiento, conversión alimentaria y GDP
- **Reportes Avanzados**: Exportación en múltiples formatos con filtros dinámicos

#### Funciones de Soporte
- **Gestión de Usuarios**: Control de acceso granular basado en roles
- **Configuración del Sistema**: Parámetros personalizables
- **Documentación Integrada**: Gestión de archivos y procedimientos
- **Auditoría**: Registro de todas las operaciones para trazabilidad

### 2.3 Características de los Usuarios

#### Perfiles de Usuario
- **Administrador del Sistema**:
  - Configuración completa del sistema
  - Gestión de usuarios, roles y permisos
  - Acceso a todas las funcionalidades
  - Monitoreo del sistema y logs

- **Gerente de Feedlot**:
  - Acceso completo a operaciones diarias
  - Visualización de reportes ejecutivos
  - Gestión de lotes y capacidad
  - Aprobación de tratamientos especiales

- **Operador de Campo**:
  - Registro de pesajes diarios
  - Control de alimentación por lote
  - Reporte de incidencias sanitarias
  - Acceso limitado a datos históricos

- **Veterinario**:
  - Gestión completa de registros sanitarios
  - Administración de tratamientos y vacunas
  - Acceso a historiales médicos individuales
  - Configuración de protocolos sanitarios

- **Auditor/Consultor**:
  - Acceso de solo lectura a reportes
  - Visualización de métricas de rendimiento
  - Consulta de datos históricos

### 2.4 Restricciones Generales

#### Restricciones Técnicas
- **Compatibilidad de Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Responsive para móviles (mín. 320px), tablets y desktop
- **Conectividad**: Funcionamiento offline limitado para operaciones críticas
- **Rendimiento**: Tiempo de respuesta < 2 segundos para operaciones normales, < 5 segundos para reportes complejos

#### Restricciones Operativas
- **Disponibilidad**: 99.5% uptime mensual (mantenimiento programado excluido)
- **Backup**: Respaldos automáticos diarios con recuperación en < 4 horas
- **Capacidad**: Soporte para hasta 10,000 animales activos simultáneamente
- **Concurrencia**: Hasta 50 usuarios concurrentes sin degradación de rendimiento

### 2.5 Suposiciones y Dependencias

#### Dependencias Técnicas
- **Servidor**: Linux/Windows con PHP 8.4.1+ y extensiones requeridas
- **Base de Datos**: SQLite 3.35+ (desarrollo), MySQL 8.0+/PostgreSQL 13+ (producción)
- **Servidor Web**: Apache/Nginx con módulos PHP-FPM
- **Almacenamiento**: 50GB mínimo para datos y archivos

#### Dependencias Operativas
- **Conectividad**: Acceso a internet estable para actualizaciones y sincronización
- **Datos Externos**: Integración con sistemas de trazabilidad ganadera nacional
- **Personal**: Capacitación básica en uso de sistemas informáticos
- **Mantenimiento**: Actualizaciones regulares del sistema y base de datos

#### Suposiciones del Proyecto
- Los usuarios tendrán conocimientos básicos de computación
- La infraestructura de red será proporcionada por el cliente
- Los datos de entrada serán validados en el punto de origen
- El sistema operará en un entorno controlado de feedlot

---

## 3. Requisitos Específicos

### 3.1 Requisitos Funcionales

#### 3.1.1 Gestión de Animales

**RF-AN-001**: El sistema debe permitir registrar nuevos animales con validación completa de datos:
- **Caravana**: String único (máx. 20 caracteres), identificador nacional del animal
- **Breed ID**: Referencia obligatoria a tabla breeds (integridad referencial)
- **Peso de entrada**: Decimal positivo (kg), peso al ingreso al feedlot
- **Peso actual**: Decimal positivo (kg), peso más reciente registrado
- **Estado**: String (máx. 50 caracteres) - valores: "active", "sold", "transferred", "deceased"
- **Lot ID**: Referencia obligatoria a tabla lots (asignación espacial)
- **Activo**: Booleano (default: true) - controla visibilidad en operaciones activas
- **Fecha de entrada**: Date obligatoria, no puede ser futura
- **Fecha de retiro**: Date nullable, obligatoria si estado es "sold", debe ser ≥ fecha de entrada

**RF-AN-002**: El sistema debe permitir actualizar información de animales con control de cambios:
- Validación de transiciones de estado permitidas
- Auditoría de modificaciones (usuario, fecha, cambios realizados)
- Prevención de modificaciones en animales históricos (más de 90 días)
- Actualización automática de pesos basada en últimos pesajes

**RF-AN-003**: El sistema debe permitir eliminación lógica de animales:
- Soft delete con marca de tiempo
- Preservación de datos históricos para auditoría
- Validación de dependencias (no eliminar si tiene tratamientos activos)

**RF-AN-004**: El sistema debe proporcionar vistas paginadas de animales (15 por página):
- Filtros avanzados: por lote, raza, estado, rango de fechas
- Ordenamiento múltiple: por caravana, peso, fecha de entrada
- Búsqueda en tiempo real por caravana o identificadores
- Exportación a CSV/Excel con filtros aplicados

**RF-AN-005**: El sistema debe mostrar dashboard detallado por animal:
- **Información básica**: Caravana, raza, lote, estado actual
- **Historial de pesajes**: Gráfico de evolución de peso con GDP calculado
- **Registros sanitarios**: Tratamientos activos, retiros pendientes, vacunas
- **Historial de alimentación**: Raciones por período, consumo total
- **Métricas de rendimiento**: Conversión alimentaria, días en feedlot, ganancia total

#### 3.1.2 Gestión de Lotes

**RF-LO-001**: El sistema debe permitir crear lotes con:
- Nombre (string, máximo 50 caracteres, único)
- Capacidad (integer, nullable)
- Descripción (text, nullable)
- Activo (booleano, por defecto true)

**RF-LO-002**: El sistema debe permitir operaciones CRUD completas en lotes.

#### 3.1.3 Gestión de Razas

**RF-BR-001**: El sistema debe permitir crear razas con:
- Nombre (string, máximo 50 caracteres, único)

**RF-BR-002**: El sistema debe permitir operaciones CRUD completas en razas.

#### 3.1.4 Gestión de Tipos de Alimento

**RF-FT-001**: El sistema debe permitir crear tipos de alimento con:
- Nombre (string, máximo 100 caracteres, único)
- Composición (text, nullable)

**RF-FT-002**: El sistema debe permitir operaciones CRUD completas en tipos de alimento.

#### 3.1.5 Gestión de Suministros

**RF-SU-001**: El sistema debe permitir crear suministros con:
- Nombre (string, máximo 100 caracteres, único)
- Tipo (enum: 'Sanitario', 'Alimenticio')
- Stock actual (decimal 12,2)
- Unidad (string, máximo 20 caracteres)
- Stock mínimo (decimal 12,2)

**RF-SU-002**: El sistema debe permitir operaciones CRUD completas en suministros.

#### 3.1.6 Registro de Pesajes

**RF-WE-001**: El sistema debe permitir registrar pesajes con:
- ID de animal (obligatorio, debe existir)
- Fecha (date, obligatoria)
- Peso (decimal, mínimo 0)
- Ganancia diaria (decimal, nullable)

**RF-WE-002**: El sistema debe incluir automáticamente el ID del usuario que crea el registro.

**RF-WE-003**: El sistema debe permitir operaciones CRUD completas en pesajes.

#### 3.1.7 Registro de Alimentación

**RF-FE-001**: El sistema debe permitir registrar alimentaciones con:
- ID de lote (obligatorio, debe existir)
- ID de tipo de alimento (obligatorio, debe existir)
- Fecha (timestamp, por defecto current_timestamp)
- Ración por kg (decimal 10,2)
- Ración total (decimal 12,2)

**RF-FE-002**: El sistema debe permitir operaciones CRUD completas en registros de alimentación.

#### 3.1.8 Registros de Salud

**RF-HR-001**: El sistema debe permitir crear registros sanitarios completos:
- **Animal ID**: Referencia obligatoria a tabla animals
- **Tipo**: String (máx. 100 caracteres) - clasificación del registro sanitario
- **Descripción**: Text detallado del caso clínico, síntomas y diagnóstico
- **Fecha**: Date del registro, no puede ser futura
- **Veterinario ID**: Referencia obligatoria a tabla users (solo usuarios con rol veterinario)
- **Costo**: Decimal positivo (moneda local) - gastos asociados al tratamiento
- **Días de retiro**: Integer ≥ 0 - período de cuarentena o retiro comercial
- **Fecha de liberación**: Date calculada automáticamente (fecha + días de retiro)
- **Observaciones**: Text adicional para notas del veterinario

**RF-HR-002**: El sistema debe gestionar tratamientos con lógica de negocio:
- Validación de fechas (liberación ≥ fecha del registro)
- Cálculo automático de fecha de liberación
- Alertas para tratamientos próximos a vencer
- Control de tratamientos activos por animal
- Historial completo con auditoría de cambios

**RF-HR-003**: El sistema debe proporcionar reportes sanitarios especializados:
- Tratamientos activos con días restantes de retiro
- Historial médico por animal con cronología
- Estadísticas de morbilidad por lote y período
- Costos sanitarios por animal, lote y período

#### 3.1.9 Gestión de Vacunas

**RF-VA-001**: El sistema debe mantener catálogo de vacunas disponibles:
- **Nombre**: String único (máx. 100 caracteres)
- **Laboratorio**: String (máx. 100 caracteres) - fabricante
- **Días de retiro**: Integer ≥ 0 - período post-vacunación

**RF-VA-002**: El sistema debe registrar aplicaciones de vacunas:
- Referencia a animal y vacuna aplicada
- Fecha de aplicación con validaciones
- Lote del producto y fecha de vencimiento
- Control de esquemas vacunales completos

#### 3.1.10 Catálogo de Tratamientos

**RF-TC-001**: El sistema debe mantener base de conocimientos veterinarios:
- **Nombre**: String único del tratamiento/protocolo
- **Descripción**: Text detallado con indicaciones, dosificación, contraindicaciones
- **Categorización**: Por tipo de afección o sistema afectado

**RF-TC-002**: El sistema debe sugerir tratamientos basados en síntomas:
- Búsqueda inteligente por palabras clave
- Historial de tratamientos exitosos similares
- Recomendaciones basadas en evidencia

#### 3.1.11 Sistema de Reportes y Analytics

**RF-RE-001**: El sistema debe generar reportes de inventario de animales:
- **Filtros**: Por lote, raza, estado, rango de fechas de entrada/salida
- **Métricas**: Conteo total, distribución por categorías, ocupación de lotes
- **Formatos**: Pantalla, PDF, Excel, CSV
- **Programación**: Reportes automáticos por email

**RF-RE-002**: El sistema debe generar análisis de rendimiento:
- **Pesajes**: Evolución individual y grupal con gráficos de tendencias
- **GDP**: Ganancia diaria promedio por lote y período
- **Conversión**: Eficiencia alimentaria (kg alimento/kg ganado)
- **Proyecciones**: Estimaciones de salida basadas en tendencias

**RF-RE-003**: El sistema debe proporcionar reportes de alimentación:
- **Consumo por lote**: Raciones diarias, semanales y mensuales
- **Eficiencia**: Costo por kg ganado, comparación entre lotes
- **Alertas**: Desviaciones del plan de alimentación programado

**RF-RE-004**: El sistema debe generar reportes sanitarios completos:
- **Morbilidad**: Incidencia por tipo de afección y lote
- **Tratamientos**: Costos, duración, efectividad por veterinario
- **Retiros activos**: Animales en cuarentena con fechas de liberación
- **Vacunas**: Cobertura de esquemas por lote

**RF-RE-005**: El sistema debe gestionar inventarios de suministros:
- **Stock actual**: Niveles por tipo y ubicación
- **Alertas**: Productos bajo stock mínimo
- **Rotación**: FIFO con fechas de vencimiento
- **Costos**: Valorización de inventario y consumo

#### 3.1.12 Gestión de Usuarios y Seguridad

**RF-US-001**: El sistema debe implementar autenticación robusta:
- **Registro**: Invitación por email con activación
- **Login**: Email/contraseña con rate limiting
- **2FA**: Autenticación de dos factores opcional
- **Recuperación**: Reset de contraseña seguro por email

**RF-US-002**: El sistema debe gestionar roles y permisos granulares:
- **Roles predefinidos**: Admin, Manager, Operator, Veterinarian, Auditor
- **Permisos específicos**: CRUD por módulo con restricciones de datos
- **Jerarquía**: Herencia de permisos con override posible
- **Asignación**: Por usuario individual o grupo

**RF-US-003**: El sistema debe proporcionar gestión de perfiles:
- **Información personal**: Nombre, email, teléfono, especialidad
- **Preferencias**: Tema (claro/oscuro), idioma, zona horaria
- **Historial**: Registro de actividades y cambios
- **Avatar**: Foto de perfil personalizable

### 3.2 Requisitos No Funcionales

#### 3.2.1 Rendimiento

**RNF-PE-001**: Tiempo de respuesta máximo de 2 segundos para consultas simples.

**RNF-PE-002**: Tiempo de respuesta máximo de 5 segundos para reportes complejos.

**RNF-PE-003**: Capacidad para manejar hasta 1000 usuarios concurrentes.

#### 3.2.2 Seguridad

**RNF-SE-001**: Autenticación mediante Laravel Fortify con verificación de email.

**RNF-SE-002**: Autorización basada en políticas de Laravel.

**RNF-SE-003**: Validación de entrada en todas las operaciones.

**RNF-SE-004**: Protección contra ataques CSRF, XSS y SQL injection.

#### 3.2.3 Usabilidad

**RNF-US-001**: Interfaz responsive compatible con dispositivos móviles.

**RNF-US-002**: Navegación intuitiva con menú lateral.

**RNF-US-003**: Mensajes de error claros y descriptivos.

**RNF-US-004**: Ayuda contextual integrada.

#### 3.2.4 Fiabilidad

**RNF-RE-001**: Disponibilidad del 99% mensual.

**RNF-RE-002**: Backup automático diario de base de datos.

**RNF-RE-003**: Recuperación de datos en menos de 4 horas.

#### 3.2.5 Mantenibilidad

**RNF-MA-001**: Código documentado con PHPDoc.

**RNF-MA-002**: Arquitectura MVC clara.

**RNF-MA-003**: Tests unitarios y de integración (mínimo 70% cobertura).

#### 3.2.6 Portabilidad

**RNF-PO-001**: Compatible con PHP 8.4.1+.

**RNF-PO-002**: Compatible con bases de datos SQLite, MySQL, PostgreSQL.

**RNF-PO-003**: Despliegue en servidores Linux/Windows.

### 3.3 Requisitos de Interfaz

#### 3.3.1 Interfaz de Usuario

**RI-US-001**: Diseño moderno con Tailwind CSS v4.

**RI-US-002**: Componentes React con Inertia.js para SPA.

**RI-US-003**: Tema claro/oscuro configurable.

#### 3.3.2 Interfaz de Hardware

**RI-HW-001**: Servidor con mínimo 2GB RAM, 20GB disco.

**RI-HW-002**: Conexión de red estable.

#### 3.3.3 Interfaz de Software

**RI-SW-001**: Laravel Framework v12.46.0.

**RI-SW-002**: Inertia.js v2.0.18.

**RI-SW-003**: React v19.2.3.

**RI-SW-004**: Base de datos relacional (SQLite/MySQL/PostgreSQL).

---

## 4. Apéndices

### Apéndice A: Estructura de Base de Datos

#### Tabla: animals
```sql
CREATE TABLE animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caravana VARCHAR(20) UNIQUE NOT NULL,
    breed_id INTEGER,
    weight_entry DECIMAL(10,2) NOT NULL,
    weight_current DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    lot_id INTEGER,
    active TINYINT(1) DEFAULT 1,
    entry_date DATE NOT NULL,
    withdrawal_date DATE,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (breed_id) REFERENCES breeds(id) ON DELETE SET NULL,
    FOREIGN KEY (lot_id) REFERENCES lots(id) ON DELETE SET NULL
);
```

#### Tabla: lots
```sql
CREATE TABLE lots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    capacity INTEGER,
    description TEXT,
    active TINYINT(1) DEFAULT 1,
    created_at DATETIME,
    updated_at DATETIME
);
```

#### Tabla: breeds
```sql
CREATE TABLE breeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);
```

#### Tabla: feed_types
```sql
CREATE TABLE feed_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    composition TEXT,
    created_at DATETIME,
    updated_at DATETIME
);
```

#### Tabla: supplies
```sql
CREATE TABLE supplies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(255) NOT NULL,
    stock_current DECIMAL(12,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    min_stock DECIMAL(12,2) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);
```

#### Tabla: weighings
```sql
CREATE TABLE weighings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_id INTEGER NOT NULL,
    date DATE NOT NULL,
    weight DECIMAL(8,2) NOT NULL,
    daily_gain DECIMAL(6,2),
    created_by INTEGER NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

#### Tabla: feedings
```sql
CREATE TABLE feedings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lot_id INTEGER NOT NULL,
    feed_type_id INTEGER NOT NULL,
    date DATETIME,
    ration_kg DECIMAL(10,2) NOT NULL,
    total_ration DECIMAL(12,2) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (lot_id) REFERENCES lots(id) ON DELETE CASCADE,
    FOREIGN KEY (feed_type_id) REFERENCES feed_types(id) ON DELETE CASCADE
);
```

#### Tabla: health_records
```sql
CREATE TABLE health_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_id INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    veterinarian_id INTEGER NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    withdrawal_days INTEGER NOT NULL,
    release_date DATE NOT NULL,
    observations TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (veterinarian_id) REFERENCES users(id)
);
```

#### Tabla: vaccines
```sql
CREATE TABLE vaccines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    laboratory VARCHAR(255) NOT NULL,
    withdrawal_days INTEGER NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);
```

#### Tabla: treatment_catalog
```sql
CREATE TABLE treatment_catalog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME,
    updated_at DATETIME
);
```

#### Tabla: permissions & roles
```sql
-- Sistema de permisos basado en Spatie Laravel Permission
CREATE TABLE permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Tablas pivot para asignación de permisos
CREATE TABLE role_has_permissions (
    permission_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (permission_id, role_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE model_has_permissions (
    permission_id INTEGER NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id INTEGER NOT NULL,
    PRIMARY KEY (permission_id, model_id, model_type)
);

CREATE TABLE model_has_roles (
    role_id INTEGER NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id INTEGER NOT NULL,
    PRIMARY KEY (role_id, model_id, model_type)
);
```

### Apéndice B: Controladores y Form Requests

#### Controladores Principales
- `AnimalController`: CRUD operations for animals
- `LotController`: CRUD operations for lots
- `BreedController`: CRUD operations for breeds
- `FeedTypeController`: CRUD operations for feed types
- `SupplyController`: CRUD operations for supplies
- `WeighingController`: CRUD operations for weighings
- `FeedingController`: CRUD operations for feedings
- `HealthRecordController`: CRUD operations for health records
- `ReportController`: Report generation

#### Form Requests
- `StoreAnimalRequest` / `UpdateAnimalRequest`
- `StoreLotRequest` / `UpdateLotRequest`
- `StoreBreedRequest` / `UpdateBreedRequest`
- `StoreFeedTypeRequest` / `UpdateFeedTypeRequest`
- `StoreSupplyRequest` / `UpdateSupplyRequest`
- `StoreWeighingRequest` / `UpdateWeighingRequest`
- `StoreFeedingRequest` / `UpdateFeedingRequest`
- `StoreHealthRecordRequest` / `UpdateHealthRecordRequest`

### Apéndice C: Tecnologías Utilizadas

- **Backend**: Laravel 12.46.0, PHP 8.4.1
- **Frontend**: React 19.2.3, Inertia.js 2.0.18
- **Base de Datos**: SQLite (desarrollo), MySQL/PostgreSQL (producción)
- **Estilos**: Tailwind CSS 4.1.18
- **Testing**: Pest 4.3.1, PHPUnit 12.5.4
- **Autenticación**: Laravel Fortify 1.33.0
- **Autorización**: Laravel Policies
- **API**: RESTful con Inertia.js

### Apéndice D: Glosario de Términos

- **Caravana**: Identificador único del animal en el sistema ganadero
- **Feedlot**: Instalación especializada para el engorde intensivo de ganado
- **Lote**: Grupo de animales alojados en una misma área física
- **Ración**: Cantidad de alimento asignada por animal o lote
- **Retiro**: Período durante el cual el animal no puede comercializarse debido a tratamientos
- **Stock**: Cantidad disponible de suministros en inventario

---

## Historial de Revisiones

| Versión | Fecha | Autor | Descripción |
|---------|-------|-------|-------------|
| 1.0 | Enero 2026 | Equipo de Desarrollo | Versión inicial del documento |

---

*Este documento es propiedad del proyecto Sistema de Gestión de Feedlot y está sujeto a control de versiones.*