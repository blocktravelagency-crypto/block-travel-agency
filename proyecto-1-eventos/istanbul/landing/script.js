// ============================================================
// BLOCKTRAVEL — Istanbul Blockchain Week 2026
// Stripe Checkout directo desde frontend — sin backend
// ============================================================

var STRIPE_PUBLISHABLE_KEY = 'pk_live_51THlQaRidwmiNfVGIDR6gngYioJo23N7HONmIT9jNIkGDQvTdu2Esn3P4H6QmvZt8MerXx0gOJMSc529aEonURSN00T4rpo6G4';
var STRIPE_PRICE_ID = 'price_1THlpNRidwmiNfVGgeNeLfOz';
var PRECIO_POR_NOCHE = 249;

var SUCCESS_URL = 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/thank-you.html';
var CANCEL_URL = 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/';

// Inicializar Stripe
var stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

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

  if (!entrada || !salida) return { noches: 0, habitaciones: habitaciones, total: 0, cantidad: 0 };

  var noches = calcularNoches(entrada, salida);
  var cantidad = noches * habitaciones;
  var total = cantidad * PRECIO_POR_NOCHE;

  document.getElementById('calc-noches').textContent = noches;
  document.getElementById('calc-hab').textContent = habitaciones;
  document.getElementById('calc-precio').textContent = '\u20AC' + total.toLocaleString('es-ES');

  var btnReservar = document.getElementById('btn-reservar');
  if (btnReservar && noches > 0) {
    btnReservar.textContent = 'Reservar ahora \u2014 \u20AC' + total.toLocaleString('es-ES');
  }

  var salidaInput = document.getElementById('fecha-salida');
  if (entrada && salidaInput) {
    var minSalida = new Date(entrada);
    minSalida.setDate(minSalida.getDate() + 1);
    salidaInput.min = minSalida.toISOString().split('T')[0];
  }

  return { noches: noches, habitaciones: habitaciones, total: total, cantidad: cantidad, entrada: entrada, salida: salida };
}

// --- Checkout con Stripe.js directo ---
async function handleCheckout() {
  var calc = actualizarCalculador();
  var noches = calc.noches;
  var cantidad = calc.cantidad;
  var total = calc.total;

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
    fbq('track', 'InitiateCheckout', { value: total, currency: 'EUR' });
  }

  var btn = document.getElementById('btn-reservar');
  btn.textContent = 'Procesando...';
  btn.disabled = true;

  try {
    // cantidad = noches × habitaciones
    // Cada unidad del price_id = 1 noche × 1 habitación = €249
    var result = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: STRIPE_PRICE_ID,
          quantity: cantidad
        }
      ],
      mode: 'payment',
      customerEmail: email,
      successUrl: SUCCESS_URL + '?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: CANCEL_URL
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

  } catch (error) {
    btn.textContent = 'Reservar ahora \u2014 \u20AC' + total.toLocaleString('es-ES');
    btn.disabled = false;
    alert('Error: ' + error.message);
  }
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
