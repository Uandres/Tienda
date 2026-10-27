# Tienda de artesanías

Catálogo web para vender aretes, pulseras y otras artesanías hechas a mano. Cada producto tiene un botón para pedirlo por WhatsApp y, si quieres, un botón de **Pagar en línea**.

---

## 1. En qué está hecha

La tienda usa solo los tres lenguajes básicos de la web. No usa frameworks (como React), ni base de datos, ni servidor propio.

| Archivo | Lenguaje | Qué hace |
|---|---|---|
| `index.html` | **HTML** | La estructura de la página. Carga los estilos y los scripts. |
| `css/estilos.css` | **CSS** | Colores, tipografías, tamaños y adaptación a celular. Tiene modo claro y oscuro automático. |
| `js/productos.js` | **JavaScript** (solo datos) | **El archivo que vas a editar:** nombre de la tienda, WhatsApp y lista de productos. |
| `js/tienda.js` | **JavaScript** | Dibuja el catálogo, los filtros por categoría, la ventana de detalle y los botones. |
| `imagenes/` | — | Aquí guardas las fotos de tus productos. |

Por eso se puede publicar gratis en GitHub Pages: es un **sitio estático**, o sea, archivos que el navegador lee tal cual.

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

Todo se hace en **`js/productos.js`**.

**Datos de la tienda:**
```js
var TIENDA = {
  nombre: "Hilo y Chaquira",           // el nombre real de tu tienda
  frase: "Aretes y pulseras hechos a mano, pieza por pieza.",
  whatsapp: "3001234567"               // tu celular, 10 dígitos
};
```

**Agregar un producto:** copia un bloque, pégalo dentro de `PRODUCTOS` y cambia los datos:
```js
{
  id: "aretes-mariposa",               // único, sin espacios
  nombre: "Aretes mariposa en mostacilla",
  categoria: "Aretes",                 // Aretes, Pulseras, Collares, Anillos, Tobilleras u Otros
  precio: 38000,                       // sin puntos ni $
  descripcion: "Mostacilla checa, gancho de acero.\nLargo: 5 cm.",
  imagen: "imagenes/aretes-mariposa.jpg",
  linkPago: "https://checkout.wompi.co/l/XXXXXX",   // opcional
  vendido: false
},
```

**Fotos:** guárdalas en la carpeta `imagenes`. Recomendaciones:
- Formato cuadrado (por ejemplo 1000 × 1000 px). La tienda las recorta en cuadrado.
- JPG de menos de 300 KB cada una, para que la página cargue rápido en datos móviles. Puedes reducirlas gratis en [squoosh.app](https://squoosh.app).
- Nombres sin espacios ni tildes: `aretes-mariposa.jpg`, no `Aretes Mariposa.JPG`. En internet, mayúsculas y minúsculas importan.

**Marcar como vendido:** cambia `vendido: false` por `vendido: true`.

**Productos de ejemplo:** los 6 que trae la tienda tienen `ejemplo: true` y muestran la etiqueta "Ejemplo". Bórralos o reemplázalos antes de compartir la tienda.

> **Cuidado con las comas.** Cada bloque `{ ... }` termina con `},`, y las comillas deben cerrarse. Si después de editar la página sale en blanco, casi siempre es una coma o una comilla faltante. Presiona `F12` en el navegador y mira la pestaña **Console**: ahí dice la línea del error.

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
│   ├── productos.js    → TUS DATOS: tienda y productos
│   └── tienda.js       → lógica del catálogo
├── imagenes/           → fotos de los productos
└── README.md           → esta guía
```
