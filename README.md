# API DIPLOMADO

API desarrollada para el diplomado FullStack, utilizando Node.js, Express y Docker. Incluye documentación Swagger para facilitar el uso de los endpoints.

---

## 🚀 Pasos para levantar el proyecto

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/API-DIPLOMADO.git


### 2. Instalar dependencias
cd API-DIPLOMADO/api

npm install

Esto instalará todos los módulos necesarios definidos en el archivo package.json.

### 3. Levantar el entorno con Docker 
Retroceder al directorio principal 

cd ..
docker compose up --build

Este comando construye la imagen y levanta los servicios definidos en el docker-compose.yml.

### 4. Acceder a la documentación Swagger

Una vez levantado el entorno, abre en tu navegador:

http://localhost:3000/api/docs/
📦 Tecnologías utilizadas

    Node.js

    Express.js

    Docker

    Swagger (Documentación de API)

### 🧾 Requisitos

    Node.js >= 18

    Docker & Docker Compose

    Puerto 3000 libre en tu entorno local


### Desarrollado por Victor Martínez
https://github.com/koke2911