# Instalar dependencias
```
npm install
```

# Crear archivo env a partir de env.example
Agregar todas las variables de entorno, en la variable FRONTEND_URL va la url del frontend para que permita conectar y evitar problemas de cors

# Ejecutar Base de datos de postgres
Debes tener instalado docker desktop para windows y tener configuradas las variables de entorno POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB ya que se crea el contenedor a partir de las variables de entorno
```
docker-compose up -d
```


# Correr migraciones
Para que las migraciones corran satisfactoriamente debe estar el valor de la variable DATABASE_URL
```
npx prisma migrate
```

# Ejecutar proyecto
```
npm run dev:watch
```