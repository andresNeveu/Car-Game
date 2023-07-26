# Car-Game

Este proyecto implementa un juego 3D en el que un vehículo (ejemplo: carro, camión) recorre una pequeña pista (circulo), además, el vehículo debe esquivar otros vehículos que circulan en una pista adyacente. Inspirado en [Loop Drive : Crash Race](https://apps.apple.com/us/app/loop-drive-crash-race/id992442150)

## Aplicación

Para la ejecución de esta aplicación se requiere **[Node.js](https://nodejs.org/es/)** en su versión 18.14.0 o superior, opcionalmente **[Git](https://git-scm.com/downloads)** para clonar el repositorio y por último un editor de texto o IDE de su preferencia.

### Instalación dependencias

Después de clonar y abrir el directorio con su editor de texto o IDE de preferencia, es necesario instalar todas las dependencias, para ello haremos uso de alguna terminal (PowerShell, Bash etc). para ejecutar el siguiente comando debemos estar ubicados en el directorio raíz del proyecto donde se encuentra el archivo package.json que contiene la información necesaria para instalar las dependencias.

```bash
npm install
```

Al finalizar la instalación debería recibir un mensaje de confirmación de este tipo

<img src="public\confirmation.png" alt="Alt text" title="Confirmación">

### Ejecución

```bash
npm run dev
```

Al ejecutar el comando anterior recibiremos un mensaje de confirmación como el siguiente.

<img src="public\Run.png" alt="Alt text" title="Run">

Debemos seleccionar usando la combinación de teclas **ctrl + click** a la dirección IP de la opción **Local** o escribiendo dicha dirección en nuestro navegador web y automáticamente estaremos en la página principal del video juego.

<img src="public\Start.png" alt="Alt text" title="Start">

### Controles

Usando el teclado de dirección

- **Flecha arriba:** Iniciar / Aumentar velocidad del vehículo
- **Flecha abajo:** Reducir la velocidad del vehículo
- **Tecla R:** Reiniciar el juego

<img src="public\crash.png" alt="Alt text" title="Crash">

## Autores

- **Franklyn Narvaez** - _Desarrollador_ - [Franklynnarvaez](https://github.com/Franklynnarvaez)
- **Christian Sanchez** - _Desarrollador_ - [chris-Sanchez098](https://github.com/chris-Sanchez098)
- **Víctor Sapuyes** - _Desarrollador_ - [andresNeveu](https://github.com/andresNeveu)

## Licencia

Este proyecto está bajo la MIT License. Ver el archivo [LICENSE.md](LICENSE.md) para detalles
