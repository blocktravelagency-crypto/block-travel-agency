// ============================================================
// BLOCKTRAVEL — Istanbul Blockchain Week 2026
// Stripe Payment Link con cantidad dinámica
// ============================================================

var STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_eVq6oH16DcY65Pz24KdfG00';
var PRECIO_POR_NOCHE = 249;

// --- Calculador ---
function calcularNoches(entrada, salida) {
  var d1 = new Date(entrada);
  var d2 = new Date(salida);
  var diff = (d2 - d1) / (1000 * 60 * 60 * 24);
  return diff > 0 ? Math.round(diff) : 0;
}

function actualizarCalculador() {
  var entradaEl = document.getElementById('fecha-entrada');
  var salidaEl = document.getElementById('fecha-salida');
  var habEl = document.getElementById('habitaciones');

  var entrada = entradaEl ? entradaEl.value : '';
  var salida = salidaEl ? salidaEl.value : '';
  var habitaciones = habEl ? parseInt(habEl.value) : 1;

  if (!entrada || !salida) return { noches: 0, habitaciones: habitaciones, total: 0, cantidad: 0, entrada: entrada, salida: salida };

  var noches = calcularNoches(entrada, salida);
  var total = noches * habitaciones * PRECIO_POR_NOCHE;
  var cantidad = noches * habitaciones;

  document.getElementById('calc-noches').textContent = noches;
  document.getElementById('calc-hab').textContent = habitaciones;
  document.getElementById('calc-precio').textContent = '\u20AC' + total.toLocaleString('es-ES');

  var btnPrecio = document.getElementById('btn-precio');
  if (btnPrecio) btnPrecio.textContent = '\u20AC' + total.toLocaleString('es-ES');

  var btnReservar = document.getElementById('btn-reservar');
  if (btnReservar && noches > 0) {
    btnReservar.textContent = 'Reservar ahora \u2014 \u20AC' + total.toLocaleString('es-ES');
  }

  // Validar fecha salida posterior a entrada
  if (entrada && salidaEl) {
    var minSalida = new Date(entrada);
    minSalida.setDate(minSalida.getDate() + 1);
    salidaEl.min = minSalida.toISOString().split('T')[0];
  }

  return { noches: noches, habitaciones: habitaciones, total: total, cantidad: cantidad, entrada: entrada, salida: salida };
}

// --- Checkout con Payment Link ---
function handleCheckout() {
  var calc = actualizarCalculador();
  var noches = calc.noches;
  var cantidad = calc.cantidad;

  // Validaciones
  var nombreEl = document.getElementById('nombre');
  var emailEl = document.getElementById('email');
  var telefonoEl = document.getElementById('telefono');

  var nombre = nombreEl ? nombreEl.value.trim() : '';
  var email = emailEl ? emailEl.value.trim() : '';
  var telefono = telefonoEl ? telefonoEl.value.trim() : '';

  if (!nombre || !email || !telefono) {
    alert('Por favor complet\u00E1 todos los campos: nombre, email y tel\u00E9fono.');
    return;
  }
  if (noches === 0) {
    alert('La fecha de salida debe ser posterior a la fecha de entrada.');
    return;
  }

  // Track InitiateCheckout with Meta Pixel
  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', { value: calc.total, currency: 'EUR' });
  }

  // Construir URL del Payment Link con cantidad dinámica
  // cantidad = noches × habitaciones (cada unidad = 1 noche × 1 habitación = €249)
  var url = STRIPE_PAYMENT_LINK + '?quantity=' + cantidad + '&prefilled_email=' + encodeURIComponent(email);

  window.location.href = url;
}

// --- Inicializar ---
document.addEventListener('DOMContentLoaded', function () {
  // Calculador en tiempo real
  ['fecha-entrada', 'fecha-salida', 'habitaciones'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', actualizarCalculador);
  });

  // Botón checkout
  var btn = document.getElementById('btn-reservar');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      handleCheckout();
    });
  }

  // Navbar y CTA final → scroll al calculador
  document.querySelectorAll('.btn-checkout').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('calculador');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Calcular precio inicial
  actualizarCalculador();

  // --- Lead webhook (fire on page load) ---
  fetch('https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      evento: 'istanbul',
      pagina: window.location.href,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      tipo: 'page_view'
    })
  }).catch(function () {});

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
