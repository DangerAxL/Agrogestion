# Manual de Usuario - Sistema de Gestión de Feedlot

## Introducción

El Sistema de Gestión de Feedlot es una aplicación web completa desarrollada con Laravel, Inertia.js y React que permite gestionar de manera eficiente todas las operaciones de un feedlot ganadero. Este manual proporciona instrucciones detalladas para el uso del sistema.

## Requisitos del Sistema

- **Navegador web**: Chrome, Firefox, Safari o Edge (últimas versiones)
- **Conexión a internet**: Para acceder al sistema
- **Resolución de pantalla**: Mínimo 1024x768 píxeles

## Acceso al Sistema

### Inicio de Sesión

1. Abra su navegador web
2. Navegue a la URL del sistema
3. Ingrese su nombre de usuario y contraseña
4. Haga clic en "Iniciar Sesión"

![Pantalla de inicio de sesión](login_screen.png)

### Recuperación de Contraseña

Si olvida su contraseña:
1. En la pantalla de inicio de sesión, haga clic en "¿Olvidó su contraseña?"
2. Ingrese su dirección de email
3. Recibirá un enlace para restablecer la contraseña

## Navegación del Sistema

### Menú Principal

El sistema cuenta con un menú lateral que incluye las siguientes secciones:

- **Dashboard**: Vista general del sistema
- **Ganadería**: Gestión de animales, lotes, razas, tipos de alimento, suministros
- **Reportes**: Consultas y reportes de datos
- **Configuración**: Configuración del sistema
- **Documentación**: Gestión de documentos

### Barra Superior

- **Usuario**: Menú de usuario con opciones de perfil y cierre de sesión
- **Notificaciones**: Alertas del sistema
- **Búsqueda**: Búsqueda global (si está disponible)

## Gestión de Animales

### Ver Lista de Animales

1. Navegue a **Ganadería > Animales**
2. Se mostrará una tabla con todos los animales registrados
3. Use los controles de paginación para navegar entre páginas
4. Use los filtros disponibles para buscar animales específicos

### Crear Nuevo Animal

1. En la lista de animales, haga clic en "Crear Animal"
2. Complete el formulario con la siguiente información:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Caravana | Identificador único del animal (máx. 20 caracteres) | Sí |
   | Raza | Seleccione de la lista de razas disponibles | Sí |
   | Peso de entrada | Peso al ingresar al feedlot (kg) | Sí |
   | Peso actual | Peso actual del animal (kg) | Sí |
   | Estado | Estado del animal (activo, vendido, etc.) | Sí |
   | Lote | Lote donde se encuentra el animal | Sí |
   | Activo | Si el animal está activo en el sistema | No |
   | Fecha de entrada | Fecha de ingreso al feedlot | Sí |
   | Fecha de retiro | Fecha de salida (solo si estado es "vendido") | Condicional |

3. Haga clic en "Guardar"

![Formulario de creación de animal](animal_create_form.png)

### Editar Animal

1. En la lista de animales, haga clic en el botón "Editar" del animal deseado
2. Modifique los campos necesarios
3. Haga clic en "Actualizar"

### Ver Detalles del Animal

1. En la lista de animales, haga clic en el nombre del animal
2. Se mostrará información detallada incluyendo:
   - Datos básicos del animal
   - Historial de pesajes
   - Registros de salud
   - Historial de alimentación

### Eliminar Animal

1. En la lista de animales, haga clic en el botón "Eliminar" del animal deseado
2. Confirme la eliminación en el diálogo que aparece

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

## Registros de Salud

### Ver Lista de Registros de Salud

1. Navegue a **Ganadería > Registros de Salud**
2. Se mostrará una tabla con todos los registros de salud

### Crear Nuevo Registro de Salud

1. En la lista de registros, haga clic en "Crear Registro de Salud"
2. Complete el formulario:

   | Campo | Descripción | Requerido |
   |-------|-------------|-----------|
   | Animal | Animal afectado | Sí |
   | Enfermedad | Nombre de la enfermedad (máx. 100 caracteres) | Sí |
   | Tratamiento | Descripción del tratamiento | No |
   | Fecha | Fecha del diagnóstico | Sí |
   | Veterinario | Veterinario responsable | Sí |
   | Días de retiro | Días que el animal debe estar en cuarentena | Sí |
   | Fecha de liberación | Fecha en que el animal puede volver a producción | Sí |
   | Observaciones | Notas adicionales | No |

3. Haga clic en "Guardar"

## Reportes

### Acceso a Reportes

1. Navegue a **Reportes** en el menú lateral
2. Seleccione el tipo de reporte deseado

### Reporte de Animales

- Muestra inventario completo de animales
- Filtros disponibles: por lote
- Exportación a PDF/Excel disponible

### Reporte de Pesajes

- Historial de pesajes por período
- Filtros: por animal, rango de fechas
- Incluye gráficos de evolución de peso

### Reporte de Alimentación

- Registro de alimentación por período
- Filtros: rango de fechas
- Resumen de consumo por lote

### Reporte de Salud

- Registros sanitarios por período
- Filtros: por tipo, rango de fechas
- Alertas de tratamientos activos

### Reporte de Suministros

- Inventario actual de suministros
- Alertas de stock bajo
- Resumen por tipo de suministro

## Gestión de Usuarios

### Perfil de Usuario

1. Haga clic en su nombre de usuario en la barra superior
2. Seleccione "Perfil"
3. Modifique la información personal
4. Cambie la contraseña si es necesario

### Gestión de Usuarios (Administradores)

Si tiene permisos de administrador:

1. Navegue a **Configuración > Usuarios**
2. Puede crear, editar y eliminar usuarios
3. Asignar roles y permisos

## Configuración del Sistema

### Configuración General

1. Navegue a **Configuración**
2. Modifique parámetros del sistema según sea necesario

## Documentación

### Gestión de Documentos

1. Navegue a **Documentación**
2. Suba archivos relacionados con el feedlot
3. Organice documentos por categorías

## Solución de Problemas

### Problemas Comunes

#### No puedo acceder al sistema
- Verifique su conexión a internet
- Confirme que las credenciales sean correctas
- Contacte al administrador si el problema persiste

#### Error al guardar datos
- Verifique que todos los campos requeridos estén completos
- Asegúrese de que los datos cumplan con las validaciones
- Contacte al soporte técnico si el error continúa

#### Lentitud en el sistema
- Verifique su conexión a internet
- Cierre otras pestañas o aplicaciones
- Contacte al administrador del sistema

### Contacto de Soporte

Para soporte técnico:
- Email: soporte@feedlot.com
- Teléfono: (123) 456-7890
- Horario: Lunes a Viernes, 9:00 AM - 6:00 PM

## Glosario

- **Caravana**: Identificador único del animal
- **Feedlot**: Instalación para engorde de ganado
- **Lote**: Grupo de animales en una misma área
- **Ración**: Cantidad de alimento por animal
- **Retiro**: Período en que el animal no puede ser comercializado por tratamientos
- **Stock**: Inventario disponible

## Apéndice A: Atajos de Teclado

- `Ctrl + S`: Guardar formulario
- `Esc`: Cerrar modal/diálogo
- `Ctrl + F`: Buscar en listas

## Apéndice B: Códigos de Error

- **400**: Datos inválidos
- **401**: No autorizado
- **403**: Prohibido
- **404**: No encontrado
- **500**: Error interno del servidor

---

*Este manual está sujeto a actualizaciones. La versión más reciente siempre estará disponible en el sistema de documentación.*