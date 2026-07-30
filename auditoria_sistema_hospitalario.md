# 🏥 Auditoría Técnica — Sistema Hospitalario

> **Rol asumido:** Software Architect · Tech Lead · Arquitecto de Microservicios · Auditor Técnico Senior
> **Objetivo:** Reducir el alcance sin perder funcionalidad esencial para una entrega estable.

---

## 1. RESUMEN EJECUTIVO

El proyecto tiene una arquitectura bien diseñada (Hexagonal + Microservicios + API Gateway) con **avance muy desigual** entre componentes. El backend más desarrollado es `ms-security` y `ms-personal`; el resto tiene estructura creada pero lógica de negocio vacía o mínima. El frontend Angular tiene rutas, componentes y servicios definidos para casi todos los módulos, lo que es una ventaja importante.

**Conclusión estratégica:** El sistema puede entregarse como MVP funcional implementando **solo 4 microservicios** (`ms-security`, `ms-personal`, `ms-patients`, `ms-clinical`) con **8 tablas de la BD** y **cubriendo los flujos principales** del frontend ya construido.

---

## 2. AUDITORÍA DE LA BASE DE DATOS

### Mapa de 20 tablas de la BD → Clasificadas por prioridad

| Tabla BD | Microservicio | Estado Backend | ¿Implementar? | Prioridad | Justificación |
|---|---|---|---|---|---|
| `usuarios` | ms-security | ✅ 95% | **Sí** | 🟢 Alta | Core del sistema. Login, JWT y gestión de usuarios implementados. |
| `rol` | ms-security | ✅ 90% | **Sí** | 🟢 Alta | Necesario para el control de acceso por roles (médico, admin, etc.). |
| `personal` | ms-personal | ✅ 80% | **Sí** | 🟢 Alta | Médicos y personal son referenciados por consultas, cirugías y recetas. |
| `especialidad` | ms-personal | ⚠️ 30% | **Sí** | 🟢 Alta | Requerida como FK en `personal`. Sin ella no se puede registrar personal correctamente. |
| `paciente` | ms-patients | ⚠️ 40% | **Sí** | 🟢 Alta | Centro del sistema. Modelo creado; faltan use cases y controller completo. |
| `consulta` | ms-clinical | ⚠️ 35% | **Sí** | 🟢 Alta | Flujo clínico principal. Modelo creado; controller básico implementado. |
| `consultorio` | ms-personal | ⚠️ 10% | **Sí** | 🟢 Alta | FK en `consulta`. El frontend ya tiene su pantalla. Tabla simple de catálogo. |
| `historia_clinica` | ms-clinical | ❌ 0% | **Sí** | 🟢 Alta | Vincula paciente + consulta + resumen. Es la prueba del flujo clínico completo. |
| `ingreso_hospitalario` | ms-hospital | ❌ 0% | **Condicional** | 🟡 Media | Frontend construido. Requiere `cama` y `habitacion`. Implementar si hay tiempo. |
| `habitacion` | ms-hospital | ❌ 0% | **Condicional** | 🟡 Media | Prerrequisito de `ingreso_hospitalario`. Tabla simple de catálogo. |
| `cama` | ms-hospital | ❌ 0% | **Condicional** | 🟡 Media | Prerrequisito de `ingreso_hospitalario`. Depende de `habitacion`. |
| `factura` | ms-billing | ⚠️ 15% | **Opcional** | 🟡 Media | Modelo básico creado. Demuestra el flujo de facturación si hay tiempo. |
| `servicio` | ms-billing | ❌ 0% | **Opcional** | 🟡 Media | FK en `detalle_factura`. Solo si se implementa facturación completa. |
| `receta` | ms-clinical | ❌ 0% | **No** | 🔴 Baja | Requiere `medicamento` y `detalle_receta`. Flujo complejo. |
| `detalle_receta` | ms-clinical | ❌ 0% | **No** | 🔴 Baja | Depende de `receta` y `medicamento`. Omitir en v1. |
| `medicamento` | ms-clinical | ❌ 0% | **No** | 🔴 Baja | Catálogo de medicamentos. Sin tiempo. Solo existe el frontend. |
| `examen` | ms-clinical | ❌ 0% | **No** | 🔴 Baja | Módulo de laboratorio complejo. No es esencial para el flujo principal. |
| `detalle_factura` | ms-billing | ❌ 0% | **No** | 🔴 Baja | Dependiente de factura + servicio. Alta complejidad. Dejar para v2. |
| `cirugia` | ms-hospital | ❌ 0% | **No** | 🔴 Baja | Depende de `ingreso`, `quirofano`, `personal`. Flujo muy específico. |
| `quirofano` | ms-hospital | ❌ 0% | **No** | 🔴 Baja | Solo tiene sentido con `cirugia`. Dejar para v2 si se implementa cirugías. |

---

### Análisis de dependencias críticas (cadena de FKs)

```
usuarios ←── rol                   (ms-security)
personal ←── usuarios              (ms-personal)
personal ←── especialidad          (ms-personal)
paciente                           (ms-patients)
consulta ←── paciente              (ms-clinical)
consulta ←── personal              (ms-clinical)
consulta ←── consultorio           (ms-clinical)
historia_clinica ←── paciente      (ms-clinical)
historia_clinica ←── consulta      (ms-clinical)
─────────────────── BARRERA V1 ────────────────────
ingreso_hospitalario ←── paciente  (ms-hospital)
ingreso_hospitalario ←── cama      (ms-hospital)
cama ←── habitacion               (ms-hospital)
factura ←── paciente               (ms-billing)
detalle_factura ←── factura + servicio
receta ←── paciente + personal     (ms-clinical)
detalle_receta ←── receta + medicamento
cirugia ←── ingreso + quirofano + personal
```

> [!IMPORTANT]
> Las tablas por encima de la "BARRERA V1" son el núcleo mínimo funcional. Las de abajo pueden existir en la BD sin implementación de código.

---

## 3. AUDITORÍA DE MICROSERVICIOS

### 🔵 ms-security — Estado: 90% ✅

**Lo que funciona:**
- Login con JWT (bcrypt + jsonwebtoken) — **completamente implementado**
- Register de usuarios
- CRUD de usuarios (create, read, delete) con arquitectura hexagonal completa
- CRUD de roles (create, read, delete)
- Modelos Sequelize: `usuarioModel.js`, `rolModel.js`
- Contenedores de inyección de dependencias: `usuarioContainer.js`, `rolContainer.js`
- Adaptadores de entrada/salida con separación Command/Query
- Rutas: `authRoutes.js`, `usuarioRoutes.js`, `rolRoutes.js`

**Lo que falta:**
- Middleware de autenticación en el propio microservicio (está comentado en `authRoutes.js`)
- Endpoint de update de usuario (PUT)
- La app.js no registra `authRoutes` ni `rolRoutes` — **solo registra `usuarioRoutes`** (bug crítico)

**Veredicto:** Terminar en pocas horas. Un bug de registro de rutas y completar update.

---

### 🟢 ms-personal — Estado: 65% ⚠️

**Lo que funciona:**
- Arquitectura hexagonal completa en español (aplicación/dominio/infraestructura)
- ORM `PersonalTabla.js` correcto y mapeado a la tabla `personal`
- CRUD parcial: create y delete implementados en adaptadores
- Rutas definidas: POST, GET/:id, DELETE/:id
- Contrato OpenAPI `api-v1.yaml` completo con todos los endpoints
- Middlewares de trazabilidad, tiempo y logging
- Rate limiting y throttling configurados
- Swagger UI disponible en `/api/v1/api-docs`

**Lo que falta:**
- GET de todos (listar todos sin ID)
- PUT para actualizar personal
- `especialidad`: No existe ORM, use cases, ni rutas para esta entidad
- `consultorio`: No existe nada
- El puerto del servidor está hardcodeado a `3001` pero debería ser `3003`
- El `app.js` importa de `ContrasenaHasher.js` sin usarlo — código muerto

**Veredicto:** Requiere trabajo moderado. Completar update + listar, y agregar especialidad/consultorio como CRUDs simples.

---

### 🟡 ms-patients — Estado: 25% ⚠️

**Lo que existe:**
- Modelo Sequelize `patientModel.js` creado (pero con nombres de columna incorrectos: `nombre`/`apellido`/`cedula` en vez de `nombres`/`apellidos`/`identificacion` que usa la BD real)
- Rutas `patientRoutes.js` con CRUD completo definido
- Controller `patientController.js` importado en rutas

**Lo que falta:**
- `patientController.js` debe existir pero no se verificó su contenido completo
- No hay use cases ni adaptadores hexagonales — está usando arquitectura plana
- La estructura de carpetas tiene `application/uses-cases` vacíos
- No hay `app.js` — el microservicio no tiene punto de entrada

**Problemas detectados:**
- Los nombres de campo del modelo NO coinciden con el esquema real de la BD
- Inconsistencia arquitectónica: tiene estructura hexagonal vacía pero implementación directa en el controller

**Veredicto:** Requiere corrección de columnas + crear app.js. La arquitectura puede simplificarse a controlador directo como ms-clinical para entregar rápido.

---

### 🔴 ms-hospital — Estado: 2% ❌

**Lo que existe:**
- Carpetas de estructura hexagonal creadas (todas vacías)
- `application/uses-cases` — **vacío**
- `infraestructure/controllers` — **vacío**
- `infraestructure/database` — **vacío**
- `infraestructure/rouetes` — **vacío** (typo en el nombre)
- Solo existe la carpeta `domain/entities` — **vacía**

**Entidades que necesitaría:** `habitacion`, `cama`, `ingreso_hospitalario`, `quirofano`, `cirugia`

**Veredicto:** Microservicio sin implementar. Para el MVP, implementar solo `habitacion`, `cama` e `ingreso_hospitalario` si hay tiempo. Omitir `quirofano` y `cirugia`.

---

### 🔴 ms-clinical — Estado: 20% ⚠️

**Lo que existe:**
- Modelo `clinicalModel.js` — **pero incorrecto**: usa `diagnostico` y `fecha_hora` que NO existen en la tabla `consulta` real de la BD. La BD usa `motivo`, `observaciones`, `fecha_programada`, `fecha_realizacion`, `estado` (enum), `tarifa`, etc.
- Controller `clinicalController.js` — CRUD completo implementado de forma plana
- Rutas `clinicalRoutes.js` — completas

**Lo que falta:**
- Corregir el modelo para que coincida con la tabla `consulta` real
- Implementar `historia_clinica` (ningún archivo)
- No hay `app.js` — el microservicio no tiene punto de entrada
- `infraestructure/uses-cases` vacíos
- El endpoint del gateway apunta a `http://ms-clinical:3004` pero no hay servidor escuchando

**Veredicto:** El controller está listo pero el modelo está mal mapeado. Corrección rápida y funciona. Historia clínica requiere desarrollo nuevo.

---

### 🔴 ms-billing — Estado: 15% ❌

**Lo que existe:**
- Modelo `billingModel.js` — **incorrecto**: usa `monto_total` y `descripcion` que no existen en la tabla `factura` real. La BD usa `numero_factura`, `total`, `estado_pago`.
- Controller `billingController.js` — CRUD básico implementado
- Rutas `billingRoutes.js` — completas

**Lo que falta:**
- No hay `app.js` — sin punto de entrada
- Modelo mal mapeado a la BD
- `detalle_factura` y `servicio` sin ninguna implementación

**Veredicto:** Microservicio de demostración. Corregir modelo y agregar app.js. Para el MVP solo mostrar factura básica sin detalles.

---

### 🔵 API Gateway — Estado: 85% ✅

**Lo que funciona:**
- Proxy configurado hacia todos los microservicios
- Middleware JWT `verifyToken` implementado
- Rate limiting global
- CORS configurado para Angular (4200) y Vite (5173)
- Helmet para seguridad de cabeceras
- Logging de trazabilidad
- Manejo de errores y 404

**Problemas:**
- El gateway proxea a `ms-hospital` pero esa ruta no está registrada en `gatewayRoutes.js` (ms-hospital no tiene endpoint en el gateway)
- `ms-patients` apunta a puerto 3002, pero el microservicio no tiene `app.js`

**Veredicto:** Prácticamente terminado. Solo agregar rutas faltantes cuando los microservicios estén listos.

---

## 4. AUDITORÍA DEL FRONTEND (Angular)

### Módulos y pantallas existentes

| Módulo Angular | Pantallas | Estado estimado | Notas |
|---|---|---|---|
| `authentic/login` | FormLogin | 🟢 ~85% | Login funcional conectado al gateway |
| `authentic/usuarios` | ListUsuarios | 🟢 ~70% | CRUD de usuarios implementado |
| `authentic/roles` | — | ⚠️ Desconocido | No registrado en routes |
| `admi-personal/personal` | ListPersonal, FormPersonal | 🟢 ~75% | Conectado a ms-personal |
| `admi-personal/especialidad` | ListEspecialidad | ⚠️ ~50% | Solo lista |
| `admi-personal/consultorio` | ListConsultorio | ⚠️ ~50% | Solo lista |
| `gestion-pacientes/pacientes` | ListPacientes, FormPacientes | 🟢 ~70% | CRUD básico |
| `gestion-pacientes/historial` | ListHistorial, FormHistorial | ⚠️ ~40% | Depende de historia_clinica |
| `gestion-pacientes/ingresos` | ListIngresos, FormIngresos | ⚠️ ~40% | Depende de ms-hospital |
| `gestion-pacientes/habitacion` | ListHabitacion, FormHabitacion | ⚠️ ~40% | Depende de ms-hospital |
| `gestion-pacientes/camas` | ListCamas, FormCamas | ⚠️ ~40% | Depende de ms-hospital |
| `consultas-medicas/consultas` | ListConsultas, FormConsultas | 🟢 ~60% | Conectado a ms-clinical |
| `consultas-medicas/medicamentos` | ListMedicamentos | ⚠️ ~30% | Sin backend |
| `consultas-medicas/examenes` | SolicitudExamenes | ⚠️ ~20% | Sin backend |
| `consultas-medicas/recetas` | — | ❌ ~10% | Sin backend |
| `cirugia-quirofano/quirofano` | ListQuirofano | ⚠️ ~20% | Sin backend |
| `cirugia-quirofano/cirugia` | FormCirugia | ⚠️ ~20% | Sin backend |
| `facturacion/facturas` | — | ⚠️ ~30% | Básico |
| `facturacion/servicios` | — | ❌ ~10% | Sin backend |

**Servicios Angular disponibles:** auth, paciente, personal, consulta, consultorio, especialidad, cama, habitacion, ingreso, historia-clinica, factura, receta, medicamento, servicio, cirugia

> [!NOTE]
> El frontend tiene **más avance que el backend** en la mayoría de módulos. Esto es una ventaja: los servicios Angular ya están preparados para consumir los endpoints una vez que el backend los exponga.

---

## 5. PROPUESTA DE MVP — VERSIÓN 1

### Flujo principal del MVP

```
[Angular] → [API Gateway :8080] → [ms-security :3001]  → tabla: usuarios, rol
                                → [ms-personal :3003]  → tabla: personal, especialidad, consultorio
                                → [ms-patients :3002]  → tabla: paciente
                                → [ms-clinical :3004]  → tabla: consulta, historia_clinica
```

### Demostración que el MVP permite

1. ✅ Iniciar sesión y obtener JWT
2. ✅ Gestionar roles
3. ✅ Crear y listar usuarios
4. ✅ Registrar especialidades
5. ✅ Registrar personal médico
6. ✅ Gestionar consultorios
7. ✅ Registrar y listar pacientes
8. ✅ Registrar consultas médicas (paciente + médico + consultorio)
9. ✅ Registrar historia clínica de una consulta
10. ✅ Ver comunicación Angular → Gateway → Microservicios en tiempo real

---

## 6. PLAN DE REDUCCIÓN — TABLA MAESTRA

| Tabla BD | Microservicio | Avance | ¿Implementar? | Prioridad | Justificación |
|---|---|---|---|---|---|
| `usuarios` | ms-security | 95% | ✅ Sí | 🟢 Alta | Core de autenticación. Ya implementado. |
| `rol` | ms-security | 90% | ✅ Sí | 🟢 Alta | Control de acceso. Ya implementado. |
| `especialidad` | ms-personal | 30% | ✅ Sí | 🟢 Alta | FK de personal. Catálogo simple de 10 min. |
| `personal` | ms-personal | 80% | ✅ Sí | 🟢 Alta | Médicos son clave para consultas. |
| `consultorio` | ms-personal | 10% | ✅ Sí | 🟢 Alta | FK de consulta. Catálogo simple. Frontend listo. |
| `paciente` | ms-patients | 25% | ✅ Sí | 🟢 Alta | Centro del sistema. Corregir modelo y crear app.js. |
| `consulta` | ms-clinical | 35% | ✅ Sí | 🟢 Alta | Flujo médico principal. Corregir modelo. |
| `historia_clinica` | ms-clinical | 0% | ✅ Sí | 🟢 Alta | Cierra el flujo clínico. Implementación nueva pero simple. |
| `habitacion` | ms-hospital | 0% | ⚠️ Si hay tiempo | 🟡 Media | Catálogo simple. Prerrequisito de ingreso. |
| `cama` | ms-hospital | 0% | ⚠️ Si hay tiempo | 🟡 Media | Depende de habitación. Simple. |
| `ingreso_hospitalario` | ms-hospital | 0% | ⚠️ Si hay tiempo | 🟡 Media | Frontend construido. Implementar si hay horas. |
| `factura` | ms-billing | 15% | ⚠️ Si hay tiempo | 🟡 Media | Demostrar facturación básica. Corregir modelo. |
| `servicio` | ms-billing | 0% | ⚠️ Si hay tiempo | 🟡 Media | Solo si se hace facturación. |
| `receta` | ms-clinical | 0% | ❌ No | 🔴 Baja | Flujo complejo. Depende de medicamento. |
| `detalle_receta` | ms-clinical | 0% | ❌ No | 🔴 Baja | Dependencia en cascada. V2. |
| `medicamento` | ms-clinical | 0% | ❌ No | 🔴 Baja | Inventario farmacéutico. Fuera del alcance. |
| `examen` | ms-clinical | 0% | ❌ No | 🔴 Baja | Módulo de laboratorio. V2. |
| `detalle_factura` | ms-billing | 0% | ❌ No | 🔴 Baja | Alta complejidad. Trigger en BD. V2. |
| `quirofano` | ms-hospital | 0% | ❌ No | 🔴 Baja | Solo útil con cirugías. V2. |
| `cirugia` | ms-hospital | 0% | ❌ No | 🔴 Baja | Flujo muy específico. V2. |

---

## 7. PLAN FINAL DE ENTREGA

---

### 📦 VERSIÓN 1 — Entrega del proyecto

#### Microservicios a terminar (en orden de prioridad)

**1. ms-security** (2-3 horas)
- [ ] Registrar `authRoutes` y `rolRoutes` en `app.js` (bug crítico actual)
- [ ] Agregar PUT de usuario
- [ ] Verificar que el JWT middleware funcione correctamente

**2. ms-personal** (4-5 horas)
- [ ] Agregar GET de todos los personales (sin filtro por ID)
- [ ] Agregar PUT para actualizar personal
- [ ] Implementar `especialidad`: ORM + use cases + rutas (catálogo simple)
- [ ] Implementar `consultorio`: ORM + use cases + rutas (catálogo simple)
- [ ] Corregir puerto hardcodeado de `3001` a `3003`

**3. ms-patients** (3-4 horas)
- [ ] Corregir `patientModel.js`: `nombre→nombres`, `apellido→apellidos`, `cedula→identificacion`
- [ ] Crear `app.js` con Express, CORS, rutas y escucha en puerto `3002`
- [ ] Verificar que `patientController.js` exista y funcione
- [ ] Conectar a la BD compartida

**4. ms-clinical** (5-6 horas)
- [ ] Corregir `clinicalModel.js`: eliminar `diagnostico` y `fecha_hora`; agregar `observaciones`, `fecha_programada`, `fecha_realizacion`, `id_consultorio`, `tarifa`, `duracion_min`
- [ ] Crear `app.js` con Express, CORS, rutas y escucha en puerto `3004`
- [ ] Implementar `historia_clinica`: modelo + controller + rutas (nuevo)
- [ ] Agregar rutas de `historia_clinica` al gateway

#### Entidades a implementar (CRUD completo)

| Entidad | Operaciones | Endpoint Gateway |
|---|---|---|
| rol | GET, POST | `/api/v1/roles` |
| usuarios | GET, POST, PUT, DELETE | `/api/v1/usuarios` |
| especialidad | GET, POST | `/api/v1/personal/especialidad` |
| consultorio | GET, POST | `/api/v1/personal/consultorio` |
| personal | GET, POST, PUT, DELETE | `/api/v1/personal` |
| paciente | GET, POST, PUT, DELETE | `/api/v1/patients` |
| consulta | GET, POST, PUT | `/api/v1/clinical/consultas` |
| historia_clinica | GET, POST | `/api/v1/clinical/historial` |

#### Pantallas del frontend a terminar

1. ✅ Login → `/login`
2. ✅ Gestión de usuarios → `/usuarios`
3. ✅ Listado de pacientes → `/pacientes`
4. ✅ Formulario de paciente → `/nuevo-pacientes`
5. ✅ Listado de personal → `/personal`
6. ✅ Formulario de personal → `/nuevo-personal`
7. ✅ Listado de especialidades → `/especialidades`
8. ✅ Listado de consultorios → `/consultorio`
9. ✅ Listado de consultas → `/consulta`
10. ✅ Formulario de consulta → `/nuevo-consulta`
11. ✅ Historial clínico → `/historial`

#### Tablas en BD sin implementación (solo existen en el schema)

Estas tablas ya están en la BD pero **no necesitan código**:
- `habitacion`, `cama`, `ingreso_hospitalario` (opcional)
- `receta`, `detalle_receta`, `medicamento`
- `examen`
- `factura`, `detalle_factura`, `servicio`
- `cirugia`, `quirofano`

---

### 🔮 VERSIÓN 2 — Mejoras futuras

#### Módulo Hospitalización (ms-hospital completo)
- Gestión de habitaciones y camas
- Ingresos hospitalarios con cama asignada
- Pantallas: `/habitacion`, `/camas`, `/ingresos`

#### Módulo Facturación (ms-billing completo)
- Catálogo de servicios
- Facturación con detalles (trigger de total)
- Pantallas: facturas, servicios

#### Módulo Farmacia/Recetas
- Catálogo de medicamentos
- Generación de recetas con detalle
- Pantallas: medicamentos, recetas

#### Módulo Laboratorio
- Solicitud y registro de exámenes
- Adjuntos de resultados
- Pantalla: solicitud-examenes

#### Módulo Cirugía
- Gestión de quirófanos
- Programación de cirugías
- Pantallas: quirofano, cirugia

#### Mejoras transversales
- Guards de autenticación en Angular (actualmente vacíos)
- Interceptor HTTP con JWT automático
- Refresh token
- Paginación en todas las listas
- Manejo de errores centralizado en frontend

---

## 8. PROBLEMAS CRÍTICOS A RESOLVER ANTES DE CUALQUIER OTRA COSA

> [!CAUTION]
> Estos errores impiden que el sistema funcione actualmente

1. **ms-security**: `authRoutes` y `rolRoutes` no están registradas en `app.js`. El login **no funciona** en producción (funciona en Postman directo pero no a través del gateway).

2. **ms-patients**: No tiene `app.js`. El microservicio **no puede iniciarse**.

3. **ms-clinical**: No tiene `app.js`. El microservicio **no puede iniciarse**.

4. **ms-billing**: No tiene `app.js`. El microservicio **no puede iniciarse**.

5. **ms-clinical model**: Columnas `diagnostico` y `fecha_hora` **no existen** en la tabla `consulta` real. Cualquier insert/select fallará.

6. **ms-patients model**: Columnas `nombre`, `apellido`, `cedula` **no coinciden** con la BD real (`nombres`, `apellidos`, `identificacion`).

7. **ms-billing model**: Columnas `monto_total`, `descripcion` **no coinciden** con la BD real (`total`, `estado_pago`, `numero_factura`).

8. **ms-personal**: Puerto hardcodeado en `3001` cuando debería ser `3003` (colisiona con ms-security).

---

## 9. ESTIMACIÓN DE HORAS

| Tarea | Horas estimadas |
|---|---|
| Corregir ms-security (registrar rutas + update usuario) | 2h |
| Completar ms-personal (GET all, PUT, especialidad, consultorio) | 5h |
| Corregir y completar ms-patients (modelo + app.js + controller) | 3h |
| Corregir y completar ms-clinical (modelo + app.js + historia_clinica) | 5h |
| Actualizar API Gateway (rutas nuevas de historia_clinica) | 1h |
| Conectar/verificar frontend Angular con backend corregido | 4h |
| **Total estimado MVP** | **~20 horas** |
| ms-hospital (habitacion + cama + ingreso) — opcional | +6h |
| ms-billing básico (factura corregida) — opcional | +3h |

---

*Auditoría realizada el 2026-07-29 | Sistema Hospitalario v1.0 | Arquitectura: Hexagonal + Microservicios + API Gateway*
