# DripDeskApp 👕📱

## Descripción
Aplicación móvil desarrollada con React Native y Expo que permite a los usuarios gestionar un armario digital, organizar sus prendas y crear outfits personalizados. La app facilita la planificación de vestimenta mediante una interfaz visual intuitiva y moderna.

En esta versión se implementa una arquitectura desacoplada, integrando un servicio web propio, persistencia local con SQLite y almacenamiento en la nube.

---

## Objetivo
Facilitar la organización de prendas y la creación de combinaciones de outfits, optimizando el tiempo de decisión al momento de vestir.

---

## Tecnologías utilizadas
- React Native
- Expo (SDK 54)
- React Navigation
- Firebase (Autenticación)
- Node.js + Express (Backend propio)
- SQLite (Persistencia local)
- Expo Notifications
- JavaScript

---

## Arquitectura
App (React Native)
↓
Backend (Node.js + Express)
↓
Base de datos en memoria

Persistencia local:
SQLite (en el dispositivo)


---

## Funcionalidades principales
- Registro e inicio de sesión (Firebase)
- Creación de prendas
- Persistencia en backend (API REST)
- Persistencia local con SQLite
- Visualización de prendas recientes
- Notificaciones al guardar prendas
- Interfaz visual moderna e intuitiva

---

## Validaciones realizadas
- ✔ Conexión App → Backend (logs en servidor)
- ✔ Persistencia en SQLite (datos mostrados en UI)
- ✔ Notificaciones funcionando
- ✔ Flujo completo de creación de prendas

---

## APK

Puedes descargar la aplicación desde el siguiente enlace:

👉 https://expo.dev/accounts/andresc86/projects/closet-virtual-app/builds/16d71488-94e1-43ea-bb63-a0380c1820f1


---

## Documentación

La documentación del proyecto se encuentra en la carpeta:

/docs

Incluye:
- Manual técnico
- Manual de usuario
- Historias de usuario
- Capturas de funcionamiento

---

## Estado del proyecto
MVP funcional completo.

Se implementó:
- Arquitectura desacoplada
- Persistencia híbrida (backend + SQLite)
- Notificaciones

---

## Repositorios

App:
[(APP)](https://github.com/andresc86/DripDesk)

Backend:
[ (API)](https://github.com/andresc86/dripdesk-api)

---

## Autor
Andrés Cifuentes Guerra
