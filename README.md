# Tienda de artesanías

Catálogo web para vender aretes, pulseras y otras artesanías hechas a mano. Cada producto tiene un botón para pedirlo por WhatsApp y, si quieres, un botón de **Pagar en línea**.

---

## 1. En qué está hecha

La tienda usa solo los tres lenguajes básicos de la web. No usa frameworks (como React), ni base de datos, ni servidor propio.

| Archivo | Lenguaje | Qué hace |
|---|---|---|
| `index.html` | **HTML** | La estructura de la página. Carga los estilos y los scripts. |
| `css/estilos.css` | **CSS** | Colores, tipografías, tamaños y adaptación a celular. Tiene modo claro y oscuro automático. |
| `js/productos.js` | **JavaScript** (solo datos) | Nombre de la tienda, WhatsApp, link de la hoja de Google y productos de respaldo. |
| `js/tienda.js` | **JavaScript** | Lee los productos de la hoja de Google, dibuja el catálogo, los filtros, la ventana de detalle y los botones. |
| Hoja de Google Sheets | — | **Donde manejas los productos:** precios, nombres, descripciones, vendidos. |
| `imagenes/` | — | Aquí guardas las fotos de tus productos. |

Por eso se puede publicar gratis en GitHub Pages: es un **sitio estático**, o sea, archivos que el navegador lee tal cual. Los productos vienen de una hoja de Google Sheets, que funciona como un administrador sencillo sin necesidad de base de datos.

---

## 2. Cómo correrla en Visual Studio Code

1. Instala [Visual Studio Code](https://code.visualstudio.com/) y [Git](https://git-scm.com/).
2. Descarga el proyecto. En una terminal:
   ```bash
   git clone https://github.com/Uandres/Tienda.git
   ```
   O en GitHub: botón verde **Code → Download ZIP**, y descomprímelo.
3. En VS Code: **Archivo → Abrir carpeta** y elige la carpeta `Tienda`.
4. Instala la extensión **Live Server** (de Ritwick Dey) desde el panel de extensiones (`Ctrl+Shift+X`).
5. Clic derecho sobre `index.html` → **Open with Live Server**. Se abre en el navegador, en una dirección como `http://127.0.0.1:5500`.

Con Live Server, cada vez que guardas un archivo (`Ctrl+S`) la página se recarga sola.

> También funciona con doble clic en `index.html`, sin instalar nada. Live Server es más cómodo porque recarga automáticamente.

---

## 3. Cómo cambiar productos

### Productos: desde tu hoja de Google Sheets
Los productos se leen de tu hoja de Google, publicada como CSV. El link está en `js/productos.js`, en `hojaGoogle`. **Para el día a día solo editas la hoja**, desde el celular o el computador. Los cambios se ven en la tienda **unos 5 minutos después**, porque Google tarda un poco en actualizar la versión publicada.

Columnas de la hoja (la primera fila debe tener estos nombres; el orden no importa):

| Columna | Qué va | Ejemplo |
|---|---|---|
| `nombre` | Nombre que ve el cliente. **Obligatoria.** Fila sin nombre = se ignora | Aretes mariposa |
| `categoria` | Aretes, Pulseras, Collares, Anillos, Tobilleras u Otros. Si escribes una nueva (ej: Llaveros), aparece como filtro nuevo | Aretes |
| `precio` | En pesos. Acepta `38000`, `38.000` o `$38.000` | 38000 |
| `descripcion` | Materiales, medidas, cuidados. Puedes usar varias líneas (`Ctrl+Enter` dentro de la celda) | Mostacilla checa. Largo: 5 cm |
| `imagen` | Nombre del archivo en la carpeta `imagenes` del repositorio, o un link completo `https://` | aretes-mariposa.jpg |
| `linkPago` | Link de pago de Wompi, Mercado Pago, Bold… Vacío = sin botón de pago | https://checkout.wompi.co/l/XXXX |
| `vendido` | `SI` si ya se vendió. Vacío o `NO` = disponible | NO |
| `id` | Opcional. Código único del producto; si lo dejas vacío se crea a partir del nombre | aretes-mariposa |

- **Agregar producto:** agrega una fila.
- **Quitar producto:** borra la fila.
- **Marcar vendido:** escribe `SI` en la columna `vendido`.
- **Orden:** los productos salen en el orden de la hoja; los vendidos van al final.

> No pongas en la hoja información privada (costos, proveedores, clientes): al estar publicada, cualquiera con el link puede verla.

### Fotos: en la carpeta `imagenes` del repositorio
Google Sheets no sirve para guardar fotos, y los links de Google Drive suelen fallar en páginas web. Por eso las fotos van en GitHub:
1. En github.com/Uandres/Tienda entra a la carpeta `imagenes`.
2. **Add file → Upload files**, arrastra la foto y da **Commit changes**.
3. En la hoja, en la columna `imagen`, escribe solo el nombre del archivo: `aretes-mariposa.jpg`.

Recomendaciones para las fotos:
- Formato cuadrado (por ejemplo 1000 × 1000 px). La tienda las recorta en cuadrado.
- JPG de menos de 300 KB cada una, para que la página cargue rápido en datos móviles. Puedes reducirlas gratis en [squoosh.app](https://squoosh.app).
- Nombres sin espacios ni tildes: `aretes-mariposa.jpg`, no `Aretes Mariposa.JPG`. En internet, mayúsculas y minúsculas importan, y el nombre en la hoja debe ser idéntico al del archivo.

### Nombre de la tienda y WhatsApp: en `js/productos.js`
Casi nunca cambian, así que se quedan en el código. En GitHub abre `js/productos.js`, toca el lápiz ✏️, cambia esto y da **Commit changes**:
```js
var TIENDA = {
  nombre: "Hilo y Chaquira",           // el nombre real de tu tienda
  frase: "Aretes y pulseras hechos a mano, pieza por pieza.",
  whatsapp: "3001234567",              // tu celular, 10 dígitos
  hojaGoogle: "https://docs.google.com/…/pub?output=csv"
};
```

### Productos de respaldo
La lista `PRODUCTOS` de `js/productos.js` solo se muestra si la hoja de Google no responde, para que la tienda nunca quede vacía. Si un día quieres dejar de usar la hoja, borra el link de `hojaGoogle` (deja `""`) y la tienda usará esa lista.

### Si algo no se ve bien
- **Salen los productos de ejemplo en vez de los de la hoja:** la hoja no respondió. Revisa que siga publicada (Archivo → Compartir → Publicar en la web) y que el link en `hojaGoogle` termine en `output=csv`. Presiona `F12` en el navegador y mira la pestaña **Console**: ahí aparece el motivo.
- **Un cambio no aparece:** espera unos 5 minutos y recarga la página.
- **No aparece una foto:** revisa que el nombre en la hoja sea exactamente igual al del archivo en `imagenes`, incluidas mayúsculas y la extensión (`.jpg`, `.png`).

---

## 4. Publicarla gratis con GitHub Pages

1. Sube tus cambios a GitHub. Desde VS Code: panel **Source Control** (`Ctrl+Shift+G`), escribe un mensaje, clic en **Commit** y luego **Sync / Push**. O por terminal:
   ```bash
   git add .
   git commit -m "Agrego productos nuevos"
   git push
   ```
2. En GitHub, en el repositorio: **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. En **Branch**, elige `main` y la carpeta `/ (root)`. Clic en **Save**.
5. En uno o dos minutos la tienda queda en:
   **https://uandres.github.io/Tienda/**

Cada vez que hagas `push`, la página se actualiza sola en uno o dos minutos.

---

## 5. Usar un dominio propio (por ejemplo `hiloychaquira.com`)

### Paso 1: comprar el dominio
Cómpralo en un registrador como Namecheap, GoDaddy, Hostinger o Cloudflare. Para un `.co` también sirven los registradores colombianos. El costo suele ser anual.

### Paso 2: configurar el DNS (en la página donde compraste el dominio)
Busca la sección **DNS** o **Zona DNS** y crea estos registros:

| Tipo | Nombre / Host | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `uandres.github.io` |

Si ya existen otros registros **A** para `@` (los que pone el registrador por defecto), bórralos.

### Paso 3: avisarle a GitHub
1. En el repositorio: **Settings → Pages → Custom domain**.
2. Escribe tu dominio (`hiloychaquira.com`) y **Save**. GitHub crea un archivo `CNAME` en el repositorio. Haz `git pull` en tu computador para traerlo y no borrarlo por accidente.
3. Espera a que el DNS se propague: puede tardar desde minutos hasta 24 horas.
4. Cuando GitHub lo permita, marca **Enforce HTTPS** para que la tienda tenga el candado de seguridad.

---

## 6. La pasarela de pago: qué está listo y qué no

### Lo que ya funciona: links de pago
Cada producto tiene el campo `linkPago`. Si lo llenas, aparece el botón **Pagar en línea**, que lleva al cliente a la página de pago de la pasarela. Allí paga con tarjeta, PSE, Nequi, etc., según la pasarela.

Cómo obtener un link de pago:
1. Crea una cuenta de comercio en una pasarela colombiana: **Wompi** (de Bancolombia), **Mercado Pago**, **Bold** o **ePayco**. Te pedirán cédula o RUT y una cuenta bancaria para recibir el dinero.
2. En el panel de la pasarela, busca **Links de pago** y crea uno por producto, con su nombre y precio.
3. Copia el link (empieza con `https://`) y pégalo en `linkPago` del producto.

**Ventajas:** no necesita programación ni servidor, es seguro porque la pasarela maneja los datos de la tarjeta, y sirve desde hoy.
**Limitaciones:** creas un link por producto. El pago te llega por correo o en el panel de la pasarela, no a la página. Si un producto se vende, tienes que marcarlo como vendido a mano, y desactivar el link en la pasarela.

**Para una tienda pequeña de artesanías, esta es la forma recomendada de empezar.**

### Lo que no está: pago integrado con carrito
Un checkout completo (carrito, el cliente paga dentro de tu página y el producto se marca vendido solo) **no se puede hacer de forma segura solo con HTML, CSS y JavaScript del navegador**. La razón:

- Las pasarelas exigen una **firma de integridad**: un código que mezcla la referencia del pedido, el valor y una **llave secreta**, para que nadie pueda cambiar el precio antes de pagar.
- Esa llave secreta **nunca puede ir en el código de la página**: cualquiera la vería con `F12`. Wompi lo advierte en su documentación: la firma se genera en el servidor.
- Para saber con certeza que un pago se aprobó, la pasarela envía un aviso (**webhook**) a una dirección de tu servidor. El regreso del cliente a tu página **no** sirve como prueba de pago.

Así que GitHub Pages solo no basta; necesitas un pequeño backend.

### Cómo programarla correctamente (cuando quieras dar ese paso)
La forma más sencilla sin montar un servidor completo:

1. **Hosting con funciones:** pasa la tienda a **Netlify** o **Vercel**. Ambos publican sitios estáticos gratis desde GitHub, igual que Pages, y permiten **funciones serverless**: pequeños programas en JavaScript (Node.js) que corren en su servidor.
2. **Variables de entorno:** guarda las llaves de la pasarela (llave privada, secreto de integridad, secreto de eventos) en la configuración de Netlify o Vercel, **nunca** en GitHub.
3. **Función 1, crear el pago:** la página le dice qué producto quiere el cliente. La función busca el **precio real** en el servidor (no confía en el precio que manda el navegador), crea una referencia única, calcula la firma SHA-256 con el secreto y devuelve los datos para abrir el checkout de la pasarela.
4. **Función 2, webhook:** recibe el aviso de la pasarela, **verifica su firma** con el secreto de eventos y, si el pago está `APPROVED`, registra la venta y te notifica.
5. **Inventario:** para que un producto se marque vendido solo, los productos deben vivir en una base de datos (Supabase, Firebase, Airtable) en vez de `productos.js`.
6. **Pruebas:** usa primero el **modo sandbox** o de pruebas de la pasarela, con sus tarjetas de prueba, antes de activar las llaves de producción.

Documentación oficial: [Wompi](https://docs.wompi.co), [Mercado Pago Colombia](https://www.mercadopago.com.co/developers/es), [Bold](https://developers.bold.co), [ePayco](https://docs.epayco.com).

> **Seguridad:** nunca subas a GitHub un archivo con llaves privadas o secretos. Este repositorio es público.

---

## Estructura del proyecto

```
Tienda/
├── index.html          → página principal
├── css/
│   └── estilos.css     → diseño
├── js/
│   ├── productos.js    → nombre, WhatsApp, link de la hoja y productos de respaldo
│   └── tienda.js       → lógica del catálogo
├── imagenes/           → fotos de los productos
└── README.md           → esta guía
```
