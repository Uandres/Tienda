/*
  =========================================================
  DATOS DE LA TIENDA  —  este es el único archivo que
  necesitas editar para cambiar productos, precios y fotos.
  =========================================================

  Cómo agregar un producto:
  1. Copia uno de los bloques { ... } de la lista PRODUCTOS.
  2. Pégalo y cambia sus datos. Cada producto necesita un "id" distinto.
  3. Guarda la foto en la carpeta "imagenes" y escribe su nombre en "imagen".
  4. Separa cada bloque del siguiente con una coma.

  Campos de cada producto:
  - id:          texto único, sin espacios (ej: "aretes-colibri")
  - nombre:      nombre que ve el cliente
  - categoria:   una de: Aretes, Pulseras, Collares, Anillos, Tobilleras, Otros
  - precio:      número en pesos, SIN puntos ni signo $ (ej: 45000)
  - descripcion: materiales, medidas, cuidados. Usa \n para saltar de línea
  - imagen:      ruta de la foto (ej: "imagenes/aretes-colibri.jpg"). Vacío = dibujo de ejemplo
  - linkPago:    link de pago de Wompi, Mercado Pago, Bold, etc. Vacío = sin botón de pago
  - vendido:     true si ya se vendió, false si está disponible
  - ejemplo:     true muestra la etiqueta "Ejemplo". Bórralo en tus productos reales
*/

var TIENDA = {
  nombre: "Hilo y Chaquira",
  frase: "Aretes y pulseras hechos a mano, pieza por pieza.",
  // Tu celular de WhatsApp. 10 dígitos si es de Colombia (ej: "3001234567").
  // Si es de otro país, escribe el indicativo primero (ej: "5491122334455").
  whatsapp: ""
};

var PRODUCTOS = [
  {
    id: "aretes-colibri",
    nombre: "Aretes Colibrí en chaquira",
    categoria: "Aretes",
    precio: 45000,
    descripcion: "Tejidos en telar con chaquira checa. Gancho de acero quirúrgico, livianos.\nLargo: 6 cm.",
    imagen: "",
    linkPago: "",
    vendido: false,
    ejemplo: true
  },
  {
    id: "pulsera-atardecer",
    nombre: "Pulsera tejida Atardecer",
    categoria: "Pulseras",
    precio: 28000,
    descripcion: "Macramé en hilo encerado con cierre ajustable. Resiste el agua.",
    imagen: "",
    linkPago: "",
    vendido: false,
    ejemplo: true
  },
  {
    id: "aretes-piedra-luna",
    nombre: "Aretes argolla con piedra luna",
    categoria: "Aretes",
    precio: 52000,
    descripcion: "Argolla en alambre de cobre con baño de oro y piedra luna natural. Diámetro: 3 cm.",
    imagen: "",
    linkPago: "",
    vendido: false,
    ejemplo: true
  },
  {
    id: "pulsera-achira",
    nombre: "Pulsera de semillas de achira",
    categoria: "Pulseras",
    precio: 22000,
    descripcion: "Semillas naturales ensartadas en elástico. Talla única.",
    imagen: "",
    linkPago: "",
    vendido: true,
    ejemplo: true
  },
  {
    id: "collar-mostacilla-flor",
    nombre: "Collar Mostacilla Flor",
    categoria: "Collares",
    precio: 68000,
    descripcion: "Collar tipo gargantilla en mostacilla, diseño floral en tres colores.",
    imagen: "",
    linkPago: "",
    vendido: false,
    ejemplo: true
  },
  {
    id: "tobilleras-hilo",
    nombre: "Set de tobilleras de hilo",
    categoria: "Tobilleras",
    precio: 30000,
    descripcion: "Juego de tres tobilleras en hilo chino con dijes pequeños.",
    imagen: "",
    linkPago: "",
    vendido: false,
    ejemplo: true
  }
];
