# Manual Técnico – DripDesk

## Tecnologías
- React Native (Expo)
- Firebase (Auth + Firestore)
- Node.js + Express (Backend)
- SQLite (Persistencia local)
- Expo Notifications

## Arquitectura
App → Backend → Base de datos  
App → SQLite (local)

## Backend
- POST /garments
- GET /garments/:userId

## SQLite
- Tabla garments
- Inserción y consulta de datos

## Notificaciones
- Uso de expo-notifications
- Notificación al registrar prenda