# 📝 LOGS PARA AGREGAR - RESUMEN RÁPIDO

## 🎯 PROBLEMA DETECTADO
El sidebar no se muestra porque el **rol se está guardando como número (1, 2, 3...) en lugar de string ("administrador", "medico", etc.)**.

---

## ⚡ SOLUCIÓN RÁPIDA (5 minutos)

### 1. Modificar `auth.service.ts`

**Ubicación:** `client/src/app/core/services/auth.service.ts`

**Buscar el método `setUserFromToken` y reemplazar por:**

```typescript
private setUserFromToken(token: string): void {
  try {
    console.log('🔓 [AUTH] Decodificando token...');
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('📋 [AUTH] Payload:', payload);
    
    // 🔥 MAPEO DE ROLES - ESTA ES LA SOLUCIÓN
    const roleMap: { [key: number]: string } = {
      1: 'administrador',
      2: 'medico',
      3: 'enfermeria',
      4: 'recepcionista',
      5: 'farmacia'
    };
    
    const rolNombre = roleMap[payload.id_rol] || 'sin_rol';
    console.log(`🎭 [AUTH] Rol mapeado: ${payload.id_rol} → ${rolNombre}`);
    
    const userData = {
      id_usuario: payload.id_usuario || payload.sub,
      rol: rolNombre, // ✅ Ahora es string
      username: payload.username,
      id_paciente: payload.id_paciente
    };
    
    console.log('👤 [AUTH] Usuario final:', userData);
    this.userSubject.next(userData);
  } catch (e) {
    console.error('💥 [AUTH] Error:', e);
    this.logout();
  }
}
```

### 2. Agregar logs en `sidebar.ts`

**Ubicación:** `client/src/app/shared/sidebar/sidebar.ts`

**En el método `ngOnInit`, después de la línea `this.sub = this.auth.user$.subscribe(user => {`:**

```typescript
ngOnInit(): void {
  console.log('🎨 [SIDEBAR] Inicializando...');
  
  this.sub = this.auth.user$.subscribe(user => {
    console.log('👤 [SIDEBAR] Usuario:', user);
    
    this.role = user?.rol ? String(user.rol).toLowerCase() : null;
    this.username = user?.username || null;
    
    console.log('🎭 [SIDEBAR] Rol final:', this.role);
    console.log('🔍 [SIDEBAR] hasRole(administrador):', this.hasRole('administrador'));
    console.log('🔍 [SIDEBAR] hasRole(medico):', this.hasRole('medico'));
  });
}
```

### 3. Verificar en la tabla de roles

**Ejecuta este SQL en tu base de datos:**

```sql
SELECT * FROM rol ORDER BY id_rol;
```

**Deberías ver:**
```
id_rol | nombre        | descripcion
-------+---------------+-------------------------
1      | ADMIN         | Administrador del sistema
2      | MEDICO        | Personal médico
3      | ENFERMERIA    | Personal de enfermería
4      | RECEPCIONISTA | Personal de recepción
5      | FARMACIA      | Personal de farmacia
```

---

## 🧪 CÓMO PROBAR

### 1. Limpiar y reiniciar
```bash
# En la terminal del cliente Angular
Ctrl+C
ng serve
```

### 2. En el navegador
```javascript
// F12 → Console
localStorage.clear();
location.reload();
```

### 3. Iniciar sesión
- Usuario: `admin`
- Contraseña: `admin123`

### 4. Verificar logs en consola

**✅ Lo que DEBES ver:**
```
🔓 [AUTH] Decodificando token...
📋 [AUTH] Payload: {id_usuario: 1, username: "admin", id_rol: 1}
🎭 [AUTH] Rol mapeado: 1 → administrador
👤 [AUTH] Usuario final: {id_usuario: 1, rol: "administrador", username: "admin"}
🎨 [SIDEBAR] Inicializando...
👤 [SIDEBAR] Usuario: {id_usuario: 1, rol: "administrador", username: "admin"}
🎭 [SIDEBAR] Rol final: administrador
🔍 [SIDEBAR] hasRole(administrador): true ✅
```

**❌ Si ves esto (ANTES DE LA SOLUCIÓN):**
```
🎭 [SIDEBAR] Rol final: 1
🔍 [SIDEBAR] hasRole(administrador): false ❌
```

---

## 🎯 RESULTADO ESPERADO

Después de aplicar la solución, el sidebar debería mostrar:

```
✅ Inicio
✅ Pacientes
   ├─ Lista pacientes
   ├─ Historias clínicas
   ├─ Habitaciones
   └─ Camas
✅ Consultas Medicas
   ├─ Medicamentos
   ├─ Quirofano
   ├─ Cirugia
   ├─ Consultas
   └─ Solicitud de exámenes
✅ Personal Médico
   ├─ Personal
   ├─ Consultorios
   └─ Especialidades
✅ Usuarios
```

---

## 📌 IMPORTANTE

### Si el sidebar sigue sin mostrarse, verifica:

1. **¿El token se está guardando?**
   ```javascript
   // En consola del navegador
   console.log('Token:', localStorage.getItem('authToken'));
   ```

2. **¿El componente Layout se está cargando?**
   - Revisa las rutas en `app.routes.ts`
   - Verifica que `/home` esté dentro del Layout

3. **¿Hay errores en consola?**
   - Presiona F12
   - Busca errores en rojo
   - Busca warnings en amarillo

4. **¿El CSS del sidebar está correcto?**
   ```javascript
   // En consola del navegador
   document.querySelector('app-sidebar')
   // Debe retornar un elemento, no null
   ```

---

## 🆘 SI NADA FUNCIONA

Envíame una captura de:
1. La consola del navegador (F12 → Console) después de hacer login
2. La pestaña Network (Red) del login request
3. El resultado de: `localStorage.getItem('authToken')`
4. El resultado de ejecutar en consola:
   ```javascript
   const token = localStorage.getItem('authToken');
   const payload = JSON.parse(atob(token.split('.')[1]));
   console.log(payload);
   ```
