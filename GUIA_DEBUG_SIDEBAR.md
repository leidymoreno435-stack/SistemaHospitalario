# 🔍 GUÍA DE DEBUG - SIDEBAR NO SE MUESTRA

## 🎯 Objetivo
Identificar por qué el sidebar no se está mostrando correctamente después del login.

## 📋 CHECKLIST DE VERIFICACIÓN

### 1️⃣ BACKEND - Verificar respuesta del login

**Archivo:** `server/ms-security/src/infraestructure/adapter-input/authController.js`

Agrega estos logs en el método `login`:

```javascript
export const login = async (req, res) => {
    try {
        console.log('🔐 [LOGIN] Iniciando login para:', req.body.username);
        
        const { username, password } = req.body;
        if (!username || !password) {
            console.log('❌ [LOGIN] Faltan credenciales');
            return res.status(400).json({ estado: 'error', resultado: 'Faltan credenciales' });
        }

        const usuario = await usuarioModel.findOne({ where: { username } });
        console.log('👤 [LOGIN] Usuario encontrado:', {
            id_usuario: usuario?.id_usuario,
            username: usuario?.username,
            id_rol: usuario?.id_rol,
            existe: !!usuario
        });
        
        if (!usuario) {
            console.log('❌ [LOGIN] Usuario no encontrado');
            return res.status(401).json({ estado: 'error', resultado: 'Usuario no encontrado' });
        }

        const esValido = await bcrypt.compare(password, usuario.password_hash);
        console.log('🔑 [LOGIN] Contraseña válida:', esValido);
        
        if (!esValido) {
            console.log('❌ [LOGIN] Contraseña incorrecta');
            return res.status(401).json({ estado: 'error', resultado: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, username: usuario.username, id_rol: usuario.id_rol },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        console.log('✅ [LOGIN] Token generado. Payload:', {
            id_usuario: usuario.id_usuario,
            username: usuario.username,
            id_rol: usuario.id_rol
        });

        return res.status(200).json({ 
            estado: 'ok', 
            token, 
            usuario: { 
                username: usuario.username, 
                id_rol: usuario.id_rol 
            } 
        });
    } catch (error) {
        console.error('💥 [LOGIN] Error:', error);
        return res.status(500).json({ estado: 'error', resultado: 'Error en el servidor: ' + error.message });
    }
};
```

---

### 2️⃣ FRONTEND - Verificar recepción del login

**Archivo:** `client/src/app/core/services/auth.service.ts`

Agrega estos logs en el método `login` y `setUserFromToken`:

```typescript
login(credentials: { username: string; password: string }): Observable<any> {
  console.log('🔐 [AUTH SERVICE] Intentando login con:', credentials.username);
  
  return this.http.post<any>(`${API_BASE_URL}/auth/login`, credentials).pipe(
    tap(response => {
      console.log('📥 [AUTH SERVICE] Respuesta del servidor:', response);
      
      if (response && response.token) {
        console.log('💾 [AUTH SERVICE] Guardando token en localStorage');
        localStorage.setItem(this.tokenKey, response.token);
        this.setUserFromToken(response.token);
      } else {
        console.log('❌ [AUTH SERVICE] No se recibió token');
      }
    })
  );
}

private setUserFromToken(token: string): void {
  try {
    console.log('🔓 [AUTH SERVICE] Decodificando token...');
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('📋 [AUTH SERVICE] Payload decodificado:', payload);
    
    const userData = {
      id_usuario: payload.id_usuario || payload.sub,
      rol: payload.rol || payload.id_rol, // ⚠️ AQUÍ ESTÁ EL PROBLEMA
      username: payload.username,
      id_paciente: payload.id_paciente
    };
    
    console.log('👤 [AUTH SERVICE] Usuario configurado:', userData);
    console.log('🎭 [AUTH SERVICE] Rol detectado:', userData.rol);
    
    this.userSubject.next(userData);
  } catch (e) {
    console.error('💥 [AUTH SERVICE] Error decodificando token:', e);
    this.logout();
  }
}
```

---

### 3️⃣ FRONTEND - Verificar Sidebar

**Archivo:** `client/src/app/shared/sidebar/sidebar.ts`

Agrega estos logs en el `ngOnInit`:

```typescript
ngOnInit(): void {
  console.log('🎨 [SIDEBAR] Componente inicializado');
  
  this.sub = this.auth.user$.subscribe(user => {
    console.log('👤 [SIDEBAR] Usuario recibido:', user);
    
    this.role = user?.rol ? String(user.rol).toLowerCase() : null;
    this.username = user?.username || null;
    
    console.log('🎭 [SIDEBAR] Rol procesado:', this.role);
    console.log('📛 [SIDEBAR] Username:', this.username);
    
    // Verificar permisos
    console.log('🔍 [SIDEBAR] Verificando permisos:');
    console.log('  - Es Admin?', this.hasRole('administrador'));
    console.log('  - Es Médico?', this.hasRole('medico'));
    console.log('  - Es Recepcionista?', this.hasRole('recepcionista'));
  });
}

hasRole(...allowed: string[]) {
  console.log(`🔐 [SIDEBAR] Verificando rol "${this.role}" contra:`, allowed);
  
  if (!this.role) {
    console.log('❌ [SIDEBAR] No hay rol definido');
    return false;
  }
  
  const result = allowed.map(r => r.toLowerCase()).includes(this.role);
  console.log(`✅ [SIDEBAR] Resultado:`, result);
  
  return result;
}
```

---

### 4️⃣ FRONTEND - Verificar Login Component

**Archivo:** `client/src/app/componClaude/login/login.component.ts`

Busca el método `onLogin` y agrega logs:

```typescript
onLogin() {
  console.log('🚀 [LOGIN COMPONENT] Iniciando login...');
  
  if (this.loginForm.valid) {
    const credentials = this.loginForm.value;
    console.log('📝 [LOGIN COMPONENT] Credenciales:', credentials.username);
    
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ [LOGIN COMPONENT] Login exitoso:', response);
        console.log('🔀 [LOGIN COMPONENT] Redirigiendo a /home');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('❌ [LOGIN COMPONENT] Error en login:', error);
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  } else {
    console.log('❌ [LOGIN COMPONENT] Formulario inválido');
  }
}
```

---

## 🧪 PROCEDIMIENTO DE PRUEBA

### Paso 1: Limpiar consola y localStorage
```javascript
// En la consola del navegador
localStorage.clear();
console.clear();
```

### Paso 2: Iniciar sesión
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Console"
3. Inicia sesión con usuario "admin" / "admin123"

### Paso 3: Analizar logs

Deberías ver una secuencia como esta:

```
🚀 [LOGIN COMPONENT] Iniciando login...
📝 [LOGIN COMPONENT] Credenciales: admin
🔐 [AUTH SERVICE] Intentando login con: admin
📥 [AUTH SERVICE] Respuesta del servidor: {estado: 'ok', token: '...', usuario: {...}}
💾 [AUTH SERVICE] Guardando token en localStorage
🔓 [AUTH SERVICE] Decodificando token...
📋 [AUTH SERVICE] Payload decodificado: {id_usuario: 1, username: 'admin', id_rol: 1}
👤 [AUTH SERVICE] Usuario configurado: {id_usuario: 1, rol: 1, username: 'admin'}
🎭 [AUTH SERVICE] Rol detectado: 1
✅ [LOGIN COMPONENT] Login exitoso: {...}
🔀 [LOGIN COMPONENT] Redirigiendo a /home
🎨 [SIDEBAR] Componente inicializado
👤 [SIDEBAR] Usuario recibido: {id_usuario: 1, rol: 1, username: 'admin'}
🎭 [SIDEBAR] Rol procesado: 1
📛 [SIDEBAR] Username: admin
```

---

## 🐛 PROBLEMA IDENTIFICADO

### ⚠️ EL ROL SE ESTÁ GUARDANDO COMO NÚMERO, NO COMO STRING

**Lo que está pasando:**
- Backend envía: `id_rol: 1`
- Frontend espera: `rol: "administrador"` o `rol: "ADMIN"`
- Frontend recibe: `rol: 1`

**Resultado:**
- `hasRole('administrador')` busca el string "administrador"
- Pero `this.role` contiene el número `1` (convertido a string "1")
- No coinciden, por lo que los elementos del sidebar con `*ngIf="hasRole('administrador')"` no se muestran

---

## 🔧 SOLUCIÓN 1: Mapeo en el Frontend (RÁPIDO)

**Archivo:** `client/src/app/core/services/auth.service.ts`

```typescript
private setUserFromToken(token: string): void {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Mapeo de id_rol a nombre de rol
    const roleMap: { [key: number]: string } = {
      1: 'administrador',
      2: 'medico',
      3: 'enfermeria',
      4: 'recepcionista',
      5: 'farmacia'
    };
    
    const rolNombre = roleMap[payload.id_rol] || 'sin_rol';
    
    console.log(`🎭 [AUTH SERVICE] Mapeando id_rol ${payload.id_rol} a ${rolNombre}`);
    
    this.userSubject.next({
      id_usuario: payload.id_usuario || payload.sub,
      rol: rolNombre, // ✅ Ahora es un string
      username: payload.username,
      id_paciente: payload.id_paciente
    });
  } catch (e) {
    console.error('💥 [AUTH SERVICE] Error:', e);
    this.logout();
  }
}
```

---

## 🔧 SOLUCIÓN 2: Modificar Backend (MEJOR PRÁCTICA)

### Opción A: Incluir nombre del rol en el token

**Archivo:** `server/ms-security/src/infraestructure/adapter-input/authController.js`

```javascript
// Hacer JOIN con tabla de roles
const usuario = await usuarioModel.findOne({ 
    where: { username },
    include: [{
        model: rolModel,
        as: 'rol_info'
    }]
});

// Incluir nombre del rol en el token
const token = jwt.sign(
    { 
        id_usuario: usuario.id_usuario, 
        username: usuario.username, 
        id_rol: usuario.id_rol,
        rol: usuario.rol_info.nombre // ✅ "ADMIN", "MEDICO", etc.
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
);
```

---

## 📊 TABLA DE ROLES EN LA BASE DE DATOS

Verifica que en tu tabla `rol` tengas estos registros:

| id_rol | nombre | descripcion |
|--------|--------|-------------|
| 1 | ADMIN | Administrador del sistema |
| 2 | MEDICO | Personal médico |
| 3 | ENFERMERIA | Personal de enfermería |
| 4 | RECEPCIONISTA | Personal de recepción |
| 5 | FARMACIA | Personal de farmacia |

**SQL para verificar:**
```sql
SELECT * FROM rol;
```

---

## ✅ VERIFICACIÓN FINAL

Después de aplicar la solución, deberías ver en la consola:

```
🎭 [SIDEBAR] Rol procesado: administrador
🔍 [SIDEBAR] Verificando permisos:
  - Es Admin? true ✅
  - Es Médico? false
  - Es Recepcionista? false
```

Y el sidebar debería mostrarse con todas las opciones del administrador.

---

## 🎯 RECOMENDACIÓN

**Usa SOLUCIÓN 1 (Mapeo en Frontend)** porque es más rápido y no requiere modificar el backend ni reiniciar servicios.

Solo agrega el código del mapeo en `auth.service.ts` y reinicia la aplicación Angular con `Ctrl+C` y `ng serve`.
