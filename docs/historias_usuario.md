# Historias de Usuario

## HU01 – Registro de usuario
**Como** usuario nuevo  
**Quiero** registrarme con correo, contraseña y nombre  
**Para** poder acceder a la aplicación  

**Criterios de aceptación:**
- El usuario ingresa nombre, email y contraseña
- Validación de campos obligatorios
- Contraseña mínimo 6 caracteres
- Se crea usuario en Firebase Authentication
- Se guarda en Firestore (colección `users`)
- Se muestra mensaje de éxito o error

---

## HU02 – Inicio de sesión
**Como** usuario registrado  
**Quiero** iniciar sesión  
**Para** acceder a mi cuenta  

**Criterios de aceptación:**
- Validación de credenciales
- Acceso a Home si es correcto
- Mensaje de error si es incorrecto

---

## HU03 – Visualización de usuario en Home
**Como** usuario autenticado  
**Quiero** ver mi nombre  
**Para** confirmar que estoy logueado  

**Criterios de aceptación:**
- Se obtiene usuario autenticado
- Se consulta Firestore
- Se muestra nombre en pantalla

---

## HU04 – Edición de perfil
**Como** usuario  
**Quiero** editar mi nombre  
**Para** actualizar mi información  

**Criterios de aceptación:**
- Se carga información actual
- Se permite editar nombre
- Se actualiza en Auth y Firestore

---

## HU05 – Persistencia de sesión
**Como** usuario  
**Quiero** mantener mi sesión iniciada  
**Para** no iniciar sesión cada vez  

**Criterios de aceptación:**
- Uso de AsyncStorage
- Firebase mantiene sesión activa

---

## HU06 – Registrar prenda
**Como** usuario autenticado  
**Quiero** agregar una prenda a mi armario  
**Para** organizar mi ropa dentro de la aplicación  

**Criterios de aceptación:**
- El usuario puede ingresar nombre, tipo, color y ocasión
- La prenda se guarda en Firestore
- La prenda queda asociada al usuario autenticado
- Se muestra mensaje de confirmación al guardar

---

## HU07 – Visualizar prendas
**Como** usuario autenticado  
**Quiero** ver las prendas registradas en mi armario  
**Para** gestionar mi ropa dentro de la aplicación  

**Criterios de aceptación:**
- El sistema consulta las prendas desde Firestore
- Solo se muestran las prendas del usuario autenticado
- Las prendas se visualizan en una lista en pantalla
- Si no hay prendas, se muestra un mensaje informativo

---

## HU09 – Notificaciones push
**Como** usuario  
**Quiero** recibir notificaciones  
**Para** estar informado sobre acciones en la app  

**Criterios de aceptación:**
- La app solicita permisos de notificación
- Se genera un token del dispositivo
- El usuario puede recibir notificaciones push
- Se visualiza la notificación en el dispositivo

---

## HU10 – Servicio web
Como usuario  
Quiero que la app use un servicio web  
Para gestionar la lógica fuera del cliente  

## HU11 – Persistencia local
Como usuario  
Quiero que mis datos se guarden localmente  
Para acceder a ellos sin conexión  