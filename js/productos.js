/*
  =========================================================
  DATOS DE LA TIENDA
  =========================================================

  Los PRODUCTOS se manejan desde tu hoja de Google Sheets
  (el link está abajo en "hojaGoogle"). Ahí cambias precios,
  nombres, descripciones y vendidos, sin tocar este archivo.

  Aquí solo cambias el nombre de la tienda, la frase y el WhatsApp.

  La lista PRODUCTOS de más abajo es un RESPALDO: la tienda la
  muestra solo si la hoja de Google no responde, o si dejas
  "hojaGoogle" vacío para manejar todo desde este archivo.

  Campos de cada producto (los mismos que las columnas de la hoja):
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
  whatsapp: "",
  // Link de tu hoja de Google publicada como CSV
  // (Archivo → Compartir → Publicar en la web → .csv). Vacío = usar la lista de abajo.
  hojaGoogle: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrDDsMmcsJMPMgP5M0XzI2UUJjutjJlIwKT3k369PMJ-nrMFDN5b_4JLRxHcubgXZGHNf2eMWA1kba/pub?output=csv"
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
