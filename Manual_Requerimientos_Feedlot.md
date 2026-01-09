# Especificación de Requisitos de Software

## Sistema de Gestión de Feedlot

**Versión:** 1.0  
**Fecha:** Enero 2026  
**Autor:** Equipo de Desarrollo  
**Revisado por:** [Nombre del Revisor]  

---

## 1. Introducción

### 1.1 Propósito

Este documento describe los requisitos funcionales y no funcionales del Sistema de Gestión de Feedlot, una aplicación web diseñada para la administración integral de operaciones en instalaciones de engorde de ganado. El sistema permite gestionar animales, lotes, alimentación, salud, inventarios y reportes de manera eficiente y centralizada.

### 1.2 Alcance

El sistema abarca las siguientes áreas principales:
- Gestión de animales y su ciclo de vida
- Administración de lotes y capacidad
- Control de alimentación y nutrición
- Registros sanitarios y veterinarios
- Inventario de suministros
- Reportes y análisis de datos
- Gestión de usuarios y permisos
- Documentación del sistema

### 1.3 Definiciones, Acrónimos y Abreviaturas

- **CRUD**: Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar)
- **API**: Application Programming Interface
- **SPA**: Single Page Application
- **ORM**: Object-Relational Mapping
- **MVC**: Model-View-Controller
- **Feedlot**: Instalación para engorde de ganado

### 1.4 Referencias

- IEEE 830-1998: Recommended Practice for Software Requirements Specifications
- Laravel Framework Documentation (v12.46.0)
- Inertia.js Documentation (v2.0.18)
- React Documentation (v19.2.3)

---

## 2. Descripción General

### 2.1 Perspectiva del Producto

El Sistema de Gestión de Feedlot es una aplicación web que se integra con bases de datos relacionales para proporcionar una interfaz unificada para la gestión de operaciones ganaderas. Utiliza arquitectura moderna con separación clara entre frontend y backend.

### 2.2 Funciones del Producto

- Gestión completa del ciclo de vida de los animales
- Control de inventarios y suministros
- Registro y seguimiento de tratamientos veterinarios
- Reportes analíticos y operativos
- Gestión de usuarios con control de acceso basado en roles

### 2.3 Características de los Usuarios

- **Administrador del Sistema**: Configuración completa, gestión de usuarios
- **Gerente de Feedlot**: Acceso completo a todas las operaciones
- **Operador**: Registro diario de datos (pesajes, alimentación, salud)
- **Veterinario**: Acceso a registros sanitarios y tratamientos

### 2.4 Restricciones Generales

- El sistema debe funcionar en navegadores web modernos
- Debe ser responsive para dispositivos móviles y desktop
- Tiempo de respuesta máximo: 2 segundos para operaciones normales
- Disponibilidad: 99% uptime mensual

### 2.5 Suposiciones y Dependencias

- Conexión a base de datos SQLite/MySQL/PostgreSQL
- Servidor web con PHP 8.4.1+
- Acceso a internet para funcionalidades de actualización

---

## 3. Requisitos Específicos

### 3.1 Requisitos Funcionales

#### 3.1.1 Gestión de Animales

**RF-AN-001**: El sistema debe permitir registrar nuevos animales con los siguientes datos:
- Caravana (string, máximo 20 caracteres, único)
- ID de raza (obligatorio, debe existir en tabla breeds)
- Peso de entrada (decimal, mínimo 0)
- Peso actual (decimal, mínimo 0)
- Estado (string, máximo 50 caracteres)
- ID de lote (obligatorio, debe existir en tabla lots)
- Activo (booleano, por defecto true)
- Fecha de entrada (date, obligatoria)
- Fecha de retiro (date, nullable, obligatoria si estado es "sold", debe ser posterior a fecha de entrada)

**RF-AN-002**: El sistema debe permitir actualizar información de animales existentes, manteniendo la integridad referencial.

**RF-AN-003**: El sistema debe permitir eliminar animales del sistema.

**RF-AN-004**: El sistema debe mostrar lista paginada de animales (15 por página) con relaciones a lote y raza.

**RF-AN-005**: El sistema debe mostrar vista detallada de animal incluyendo historial de pesajes, registros de salud y alimentación.

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

**RF-HR-001**: El sistema debe permitir crear registros de salud con:
- ID de animal (obligatorio, debe existir)
- Enfermedad (string, máximo 100 caracteres)
- Tratamiento (text, nullable)
- Fecha (date)
- ID de veterinario (obligatorio, debe existir en users)
- Días de retiro (integer, mínimo 0)
- Fecha de liberación (date, debe ser posterior a fecha)
- Observaciones (text, nullable)

**RF-HR-002**: El sistema debe permitir operaciones CRUD completas en registros de salud.

#### 3.1.9 Sistema de Reportes

**RF-RE-001**: El sistema debe generar reporte de inventario de animales con filtro por lote.

**RF-RE-002**: El sistema debe generar reporte de pesajes con filtros por animal y rango de fechas.

**RF-RE-003**: El sistema debe generar reporte de alimentación con filtro por rango de fechas.

**RF-RE-004**: El sistema debe generar reporte de salud con filtros por tipo y rango de fechas.

**RF-RE-005**: El sistema debe generar reporte de inventario de suministros.

#### 3.1.10 Gestión de Usuarios

**RF-US-001**: El sistema debe permitir registro y autenticación de usuarios.

**RF-US-002**: El sistema debe implementar control de acceso basado en permisos.

**RF-US-003**: El sistema debe permitir gestión de perfiles de usuario.

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
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    caravana VARCHAR(20) UNIQUE NOT NULL,
    breed_id BIGINT NULL,
    weight_entry DECIMAL(10,2) NOT NULL,
    weight_current DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    lot_id BIGINT NULL,
    active BOOLEAN DEFAULT TRUE,
    entry_date DATE NOT NULL,
    withdrawal_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (breed_id) REFERENCES breeds(id) ON DELETE SET NULL,
    FOREIGN KEY (lot_id) REFERENCES lots(id) ON DELETE SET NULL
);
```

#### Tabla: lots
```sql
CREATE TABLE lots (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    capacity INT NULL,
    description TEXT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: breeds
```sql
CREATE TABLE breeds (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: feed_types
```sql
CREATE TABLE feed_types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    composition TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: supplies
```sql
CREATE TABLE supplies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    type ENUM('Sanitario', 'Alimenticio') NOT NULL,
    stock_current DECIMAL(12,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    min_stock DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: weighings
```sql
CREATE TABLE weighings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    animal_id BIGINT NOT NULL,
    date DATE NOT NULL,
    weight DECIMAL(8,2) NOT NULL,
    daily_gain DECIMAL(6,2) NULL,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

#### Tabla: feedings
```sql
CREATE TABLE feedings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    lot_id BIGINT NOT NULL,
    feed_type_id BIGINT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ration_kg DECIMAL(10,2) NOT NULL,
    total_ration DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lot_id) REFERENCES lots(id) ON DELETE CASCADE,
    FOREIGN KEY (feed_type_id) REFERENCES feed_types(id) ON DELETE CASCADE
);
```

#### Tabla: health_records
```sql
CREATE TABLE health_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    animal_id BIGINT NOT NULL,
    disease VARCHAR(100) NOT NULL,
    treatment TEXT NULL,
    date DATE NOT NULL,
    veterinarian_id BIGINT NOT NULL,
    withdrawal_days INT NOT NULL,
    release_date DATE NOT NULL,
    observations TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    FOREIGN KEY (veterinarian_id) REFERENCES users(id)
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