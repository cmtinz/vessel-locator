# VesselLocator

VesselLocator permite mostrar, editar, eliminar y crear embarcaciones que, además, son mostradas en un mapa. Como característica especial implementa un filtro por nombre de la embarcación y destino.

El backend está construido en Laravel, ocupa MySQL como base de datos. El frontend es una aplicación de React que consume el API que implementado por Laravel.

## Instalación y ejecución

1. Instalar PHP (+7.4) y Composer. En MacOS se puede hacer mediante Brew (`brew update && brew install php && brew install composer`).
2. Instalar MySQL (+8.0) y crear una base de datos vacía para la instalación.
3. Clonar el repositorio y entrar al directorio.
4. Ejecutar `composer install` para instalar las dependencias de PHP.
5. Crear el archivo de entorno copiando el que viene de ejemplo: `cp .env.example .env `.
6. En archivo .env colocar las credenciales de la base de datos creada en el punto 2.

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=vessel_locator
DB_USERNAME=vessel_locator
DB_PASSWORD=password
```


7. Ejecutar las migraciones para crear las tablas de necesarias en la base de datos: `php artisan migrate`.
8. Ejecutar el seeder de la base de datos para crear los destinos y barcos de ejemplo: `php artisan db:seed`.
9. Generar la llave del servidor: `php artisan key:generate`
10. Ejecutar el servidor de desarrollo: `php artisan serve`.
11. Abrir el navegador en la dirección que se indicará.