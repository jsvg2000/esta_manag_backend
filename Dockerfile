# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia archivos esenciales primero
COPY package*.json ./

# Instala dependencias necesarias, incluyendo las de desarrollo
RUN npm install --only=development

# Copia el código fuente y el archivo de configuración de TypeScript
COPY src/ src/
COPY tsconfig.json ./


# Ejecuta pruebas al iniciar el contenedor
CMD ["npm", "run", "test"]