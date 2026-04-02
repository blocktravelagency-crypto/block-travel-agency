/* ============================================
   BLOCKTRAVEL — Istanbul Blockchain Week 2026
   Calculador de precio dinámico + Stripe Checkout
   ============================================ */

var PRECIO_POR_NOCHE = 249;
var WEBHOOK_URL = 'https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-stripe-checkout';
var SUCCESS_URL = 'https://blocktravelagency-crypto.github.io/block-travel-agency/proyecto-1-eventos/istanbul/landing/thank-you.html';
var CANCEL_URL = 'https://blocktravelagency-crypto.github.io/block-travel-agency/proyecto-1-eventos/istanbul/landing/index.html';

// --- Calculador ---
function calcularNoches(entrada, salida) {
  var d1 = new Date(entrada);
  var d2 = new Date(salida);
  var diff = (d2 - d1) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff : 0;
}

function actualizarCalculador() {
  var entrada = document.getElementById('fecha-entrada').value;
  var salida = document.getElementById('fecha-salida').value;
  var habitaciones = parseInt(document.getElementById('habitaciones').value);

  var noches = calcularNoches(entrada, salida);
  var total = noches * habitaciones * PRECIO_POR_NOCHE;

  document.getElementById('calc-noches').textContent = noches;
  document.getElementById('calc-hab').textContent = habitaciones;
  document.getElementById('calc-precio').textContent = '\u20AC' + total.toLocaleString('es-ES');
  document.getElementById('btn-precio').textContent = '\u20AC' + total.toLocaleString('es-ES');

  // Validar que salida sea posterior a entrada
  var salidaInput = document.getElementById('fecha-salida');
  if (entrada) {
    var minSalida = new Date(entrada);
    minSalida.setDate(minSalida.getDate() + 1);
    salidaInput.min = minSalida.toISOString().split('T')[0];
  }

  return { noches: noches, habitaciones: habitaciones, total: total, entrada: entrada, salida: salida };
}

// --- Checkout ---
async function handleCheckout() {
  var calc = actualizarCalculador();
  var noches = calc.noches;
  var habitaciones = calc.habitaciones;
  var total = calc.total;
  var entrada = calc.entrada;
  var salida = calc.salida;

  // Validaciones
  var nombre = document.getElementById('nombre').value.trim();
  var email = document.getElementById('email').value.trim();
  var telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !email || !telefono) {
    alert('Por favor completá todos los campos (nombre, email y teléfono).');
    return;
  }
  if (noches === 0) {
    alert('La fecha de salida debe ser posterior a la fecha de entrada.');
    return;
  }
  if (total === 0) {
    alert('Por favor seleccioná las fechas de tu estadía.');
    return;
  }

  // Track InitiateCheckout with Meta Pixel
  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', { value: total, currency: 'EUR' });
  }

  // UI loading
  var btn = document.getElementById('btn-reservar');
  btn.textContent = 'Procesando...';
  btn.disabled = true;

  try {
    var body = {
      amount: total * 100,
      currency: 'eur',
      nombre: nombre,
      email: email,
      telefono: telefono,
      fecha_entrada: entrada,
      fecha_salida: salida,
      noches: noches,
      habitaciones: habitaciones,
      precio_por_noche: PRECIO_POR_NOCHE,
      total: total,
      evento: 'istanbul',
      description: 'Hotel Istanbul Blockchain Week 2026 — ' + noches + ' noche(s) x ' + habitaciones + ' hab.',
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL
    };

    var response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    var text = await response.text();

    if (!text || text.trim() === '') {
      throw new Error('El servidor no respondió. Por favor intentá de nuevo.');
    }

    var data = JSON.parse(text);

    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No se recibió la URL de pago. Contactanos a info@blocktravelagency.com');
    }

  } catch (error) {
    btn.innerHTML = 'Reservar ahora — <span id="btn-precio">\u20AC' + total.toLocaleString('es-ES') + '</span>';
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
  if (btn) btn.addEventListener('click', function (e) {
    e.preventDefault();
    handleCheckout();
  });

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
