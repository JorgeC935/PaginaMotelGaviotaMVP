# MVP Gaviota

## Descripción del proyecto
Este repositorio contiene una landing page estática para el **Motel La Gaviota**. Está construida con HTML, CSS y JavaScript puros y está lista para ser desplegada como sitio web estático.

## Requisitos previos
- **Git** para clonar el repositorio.
- **Navegador web** (Chrome, Firefox, Edge, Safari, etc.).
- Opcional: **Node.js** (v14 o superior) si deseas ejecutar un servidor de desarrollo local.

## Pasos para iniciar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/MVP_Gaviota.git
   cd MVP_Gaviota
   ```

2. **Revisar la estructura**
   ```text
   📦 MVP_Gaviota
   ├─ 📂 assets
   │   ├─ 📂 images      # imágenes usadas en la página
   │   └─ 📂 logos       # logotipo del motel
   ├─ 📂 css
   │   └─ styles.css    # estilos globales
   ├─ 📂 js
   │   └─ script.js     # lógica del sitio (consulta, modal, etc.)
   ├─ index.html        # página principal
   └─ README.md         # este archivo
   ```

3. **Abrir la página**
   - **Forma rápida:** abre el archivo `index.html` directamente con tu navegador (doble‑clic o `file:///…/index.html`).
   - **Servidor local (recomendado):** si prefieres evitar problemas de rutas relativas, puedes usar un servidor estático simple.
     ```bash
     # con npx (no requiere instalación global)
     npx serve .

     # o con Python 3
     python -m http.server 8000
     ```
     Luego abre `http://localhost:8000` en el navegador.

4. **Configuración de WhatsApp (MVP)**
   - En `js/script.js` hay una constante visible:
     ```js
     const WHATSAPP_NUMBER = "";
     ```
   - **Si** deseas que el botón "Continuar por WhatsApp" abra la aplicación, rellena el número con el código internacional, por ejemplo `"+59112345678"`.
   - Cuando `WHATSAPP_NUMBER` está vacío, la aplicación mostrará una vista previa del mensaje y el texto:
     > "Prototipo MVP: el número comercial oficial se conectará en la implementación."

5. **Personalizar contenido**
   - **Texto del hero:** está en `index.html` dentro del bloque `hero-visual`. Puedes editar títulos, subtítulos o botones.
   - **Imágenes:** la imagen principal del hero se encuentra en `assets/images/portada.png`. Reemplázala por otra si lo necesitas, manteniendo el mismo nombre o actualiza la ruta en el HTML.
   - **Estilos:** modifica `css/styles.css` para cambiar colores, tipografía o el layout responsive.

6. **Despliegue**
   - Como es un sitio estático, basta con subir todo el contenido del directorio a cualquier host de archivos estáticos (GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.).
   - Asegúrate de que la ruta de la imagen `portada` y los demás recursos se mantengan idénticas al árbol de carpetas.

## Buenas prácticas
- No modifiques la lógica de consulta a menos que sea necesario para la presentación visual.
- Mantén los nombres de los archivos tal cual (`portada.png`, `habitacion-1.jpg`, `habitacion-2.jpg`).
- Usa la tipografía **Plus Jakarta Sans** que ya está importada en `styles.css`.
- Evita añadir librerías externas pesadas; el proyecto está pensado para ser liviano y rápido.

## Contribuir
Si deseas aportar mejoras visuales o corregir errores:
1. Crea una rama (`git checkout -b mejora‑visual`).
2. Realiza los cambios y verifica en el navegador.
3. Haz un **pull request** describiendo brevemente la mejora.

---
_© 2026 Motel La Gaviota – Proyecto MVP_

