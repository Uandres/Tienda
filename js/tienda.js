/*
  Lógica de la tienda: dibuja el catálogo a partir de js/productos.js,
  maneja los filtros por categoría, la ventana de detalle y los botones
  de WhatsApp y pago. No necesitas editar este archivo para cambiar productos.
*/
(function () {
  "use strict";

  var CATEGORIAS = ["Aretes", "Pulseras", "Collares", "Anillos", "Tobilleras", "Otros"];
  var filtro = "Todos";
  var app = document.getElementById("app");

  // Convierte texto a HTML seguro (evita que un nombre con < o > rompa la página)
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pesos(n) {
    try {
      return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
    } catch (e) {
      return "$" + (n || 0);
    }
  }

  function numeroWhatsapp() {
    var d = String(TIENDA.whatsapp || "").replace(/\D/g, "");
    if (d.length === 10 && d.charAt(0) === "3") d = "57" + d; // celular colombiano
    return d;
  }

  function linkWhatsapp(p) {
    var n = numeroWhatsapp();
    if (!n) return "";
    var msg;
    if (!p) msg = "Hola " + TIENDA.nombre + ", quiero hacer una consulta.";
    else if (p.vendido) msg = 'Hola, vi "' + p.nombre + '" en ' + TIENDA.nombre + " y ya está vendido. ¿Me pueden hacer uno parecido?";
    else msg = 'Hola, me interesa "' + p.nombre + '" (' + pesos(p.precio) + ") que vi en " + TIENDA.nombre + ". ¿Está disponible?";
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(msg);
  }

  // Solo acepta links https para el botón de pago
  function linkSeguro(u) {
    u = String(u || "").trim();
    return /^https:\/\/[^\s"'<>]+$/i.test(u) ? u : "";
  }

  // Color estable para el dibujo de ejemplo de cada producto
  function tono(id) {
    var h = 0;
    for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
    return h;
  }

  var ICONO_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>';
  var ICONO_TARJETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>';

  function foto(p) {
    var h = p.imagen
      ? '<img src="' + esc(p.imagen) + '" alt="' + esc(p.nombre) + '" loading="lazy">'
      : '<div class="ph" style="--h:' + tono(p.id) + '"><span>' + esc((p.nombre || "?").charAt(0)) + "</span></div>";
    if (p.ejemplo) h += '<span class="tag">Ejemplo</span>';
    if (p.vendido) h += '<span class="sold-ribbon">Vendido</span>';
    return h;
  }

  function botonesCompra(p) {
    var h = "";
    var wa = linkWhatsapp(p);
    var pago = linkSeguro(p.linkPago);
    if (p.vendido) {
      if (wa) h += '<a class="btn btn-ghost" href="' + esc(wa) + '" target="_blank" rel="noopener">' + ICONO_WA + "Encargar uno parecido</a>";
      return h;
    }
    if (wa) h += '<a class="btn btn-wa" href="' + esc(wa) + '" target="_blank" rel="noopener">' + ICONO_WA + "Pedir por WhatsApp</a>";
    if (pago) h += '<a class="btn btn-ghost" href="' + esc(pago) + '" target="_blank" rel="noopener">' + ICONO_TARJETA + "Pagar en línea</a>";
    return h;
  }

  function buscar(id) {
    for (var i = 0; i < PRODUCTOS.length; i++) if (PRODUCTOS[i].id === id) return PRODUCTOS[i];
    return null;
  }

  function dibujar() {
    // Disponibles primero, vendidos al final
    var lista = PRODUCTOS.slice().sort(function (a, b) { return (a.vendido ? 1 : 0) - (b.vendido ? 1 : 0); });
    var conteo = { Todos: lista.length };
    lista.forEach(function (p) { conteo[p.categoria] = (conteo[p.categoria] || 0) + 1; });
    var visibles = lista.filter(function (p) { return filtro === "Todos" || p.categoria === filtro; });
    var wa = linkWhatsapp(null);

    var h = '<header class="top wrap"><div class="top-row"><div class="brand"><h1>' + esc(TIENDA.nombre) + "</h1><p>" + esc(TIENDA.frase) + "</p></div>";
    if (wa) h += '<a class="btn btn-wa" href="' + esc(wa) + '" target="_blank" rel="noopener">' + ICONO_WA + "Escríbenos</a>";
    h += '</div><div class="strand" role="presentation"></div></header>';

    h += '<main class="wrap"><nav class="filters" aria-label="Categorías">';
    ["Todos"].concat(CATEGORIAS).forEach(function (c) {
      if (c !== "Todos" && !conteo[c]) return;
      h += '<button class="chip" type="button" data-act="filtro" data-v="' + c + '" aria-pressed="' + (filtro === c) + '">' + c + '<span class="n">' + conteo[c] + "</span></button>";
    });
    h += '</nav><section class="grid" aria-label="Productos">';
    if (!visibles.length) h += '<p class="empty">Pronto habrá piezas nuevas en esta categoría.</p>';
    visibles.forEach(function (p) {
      h += '<article class="item' + (p.vendido ? " is-sold" : "") + '">';
      h += '<button class="pic" type="button" data-act="detalle" data-id="' + esc(p.id) + '" aria-label="Ver ' + esc(p.nombre) + '">' + foto(p) + "</button>";
      h += '<div><div class="cat">' + esc(p.categoria) + '</div><div class="meta"><h3>' + esc(p.nombre) + '</h3><span class="price">' + pesos(p.precio) + "</span></div></div>";
      h += '<div class="actions">' + botonesCompra(p) + "</div></article>";
    });
    h += "</section></main>";

    h += '<footer class="wrap"><section class="how"><h2>Cómo comprar</h2>' +
      '<div class="step"><i>1</i><p><strong>Elige tu pieza</strong>Cada pieza es hecha a mano; puede variar un poco de la foto.</p></div>' +
      '<div class="step"><i>2</i><p><strong>Pide o paga</strong>Escríbenos por WhatsApp, o usa “Pagar en línea” cuando el producto lo tenga.</p></div>' +
      '<div class="step"><i>3</i><p><strong>Coordinamos la entrega</strong>Te confirmamos disponibilidad, envío y tiempos por WhatsApp.</p></div>' +
      "</section></footer>";

    app.innerHTML = h;
    document.title = TIENDA.nombre;
  }

  // Ventana de detalle del producto
  var ventana = document.createElement("dialog");
  document.body.appendChild(ventana);
  ventana.addEventListener("click", function (e) { if (e.target === ventana) ventana.close(); });

  function detalle(p) {
    var b = botonesCompra(p);
    ventana.innerHTML =
      '<div class="dlg"><div class="dlg-head"><div><div class="cat">' + esc(p.categoria) + "</div><h2>" + esc(p.nombre) + "</h2></div>" +
      '<button class="x" type="button" data-act="cerrar" aria-label="Cerrar">×</button></div>' +
      '<div class="detail-pic">' + foto(p) + "</div>" +
      '<div class="meta"><span class="price" style="font-size:1.3rem">' + pesos(p.precio) + '</span><span class="cat">' + (p.vendido ? "Vendido" : "Disponible") + "</span></div>" +
      (p.descripcion ? '<p class="detail-desc">' + esc(p.descripcion) + "</p>" : "") +
      (b ? '<div class="actions">' + b + "</div>" : "") + "</div>";
    if (typeof ventana.showModal === "function") ventana.showModal();
    else ventana.setAttribute("open", "");
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "filtro") { filtro = t.getAttribute("data-v"); dibujar(); }
    else if (a === "detalle") { var p = buscar(t.getAttribute("data-id")); if (p) detalle(p); }
    else if (a === "cerrar") { ventana.close(); }
  });

  dibujar();
})();
