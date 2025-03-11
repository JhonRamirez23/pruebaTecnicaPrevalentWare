# Prueba Técnica Fullstack PrevalentWare

Este proyecto es una aplicación fullstack desarrollada con **Next.js 14**, **TypeScript**, **Tailwind CSS** y utiliza:

- **GraphQL** con Apollo Server/Client
- **Prisma** para la base de datos (PostgreSQL en Supabase)
- **NextAuth** (Auth.js) con **Auth0** como proveedor y Prisma como adaptador para autenticación basada en sesiones
- Componentes inspirados en [shadcn](https://ui.shadcn.com/) (o personalizados)
- Pruebas unitarias con **Jest**

## Contenido

- [Requisitos](#requisitos)
- [Instalación y Ejecución Local](#instalación-y-ejecución-local)
- [Variables de Entorno](#variables-de-entorno)
- [Migraciones de Prisma](#migraciones-de-prisma)
- [Ejecución de Pruebas](#ejecución-de-pruebas)

## Requisitos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Git](https://git-scm.com/)
- Cuenta en [Auth0](https://auth0.com/)
- Cuenta en [Supabase](https://supabase.com/) (para PostgreSQL)
- Cuenta en [Vercel](https://vercel.com/)

## Instalación y Ejecución Local

1.  **Clona el repositorio:**

    git clone https://github.com/JhonRamirez23/pruebaTecnicaPrevalentWare.git
    cd tu-repo

2.  **Instala las dependencias:**

        npm install

3.  **Configura las variables de entorno:**

Crea un archivo .env en la raíz del proyecto y define las siguientes variables (ajusta los valores según tu configuración):

        NEXTAUTH_URL=http://localhost:3000
        AUTH0_ISSUER=https://dev-tu-dominio.auth0.com
        AUTH0_CLIENT_ID=tu_auth0_client_id
        AUTH0_CLIENT_SECRET=tu_auth0_client_secret
        DATABASE_URL=postgresql://usuario:contraseña@host:puerto/base_de_datos
        DIRECT_URL="postgresql://postgres.nvnoxdikymekshkqvidm:contraseña@puerto/base_de_datos"

4.  **Configura el archivo schema.prisma:**
    En tu archivo, configura datasource db de la siguiente manera

           datasource db {
            provider  = "postgresql"
            url       = env("DATABASE_URL")
            directUrl = env("DIRECT_URL")
            }

5.  Genera y aplica las migraciones

        npx prisma generate
        npx prisma migrate dev --name init

6.  Ejecuta el proyecto en modo de desarrollo

        npm run dev

La aplicación deberá correr en http://localhost:3000

## ## Instalación y Ejecución de pruebas

1.  Las pruebas se realizan en Jest, por lo cual deberás ejecutar el siguiente comando.

        npm test

2.  En la carpeta _tests_ se encuentran los tres archivos que validan las pruebas.

    addTransaction.test.ts
    unauthorized.test.ts
    updateUser.test.ts

3.  Para el backend, se valida la conexión con Apollo Playground y el endpoint /api/graphql

4.  Se valida con Postman la conexión sin autorización o no autenticado a la url http://localhost:3000/api/graphql con el metodo POST
5.  En el Headers se deja en blanco y dentro de Body, en el raw, se escribe lo siguiente:

    {
    "query": "{ me { id name email } }"
    }

La salida debe ser un json con un mensaje Not authenticated.
