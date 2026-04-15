// ============================================================
// BLOCKTRAVEL — Istanbul Blockchain Week 2026
// Stripe Checkout via servidor Node.js — precio dinámico
// ============================================================

const CHECKOUT_API = 'https://plain-sea-6b2d.blocktravelagency.workers.dev';
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
  var cantidad = noches * habitaciones;
  var total = cantidad * PRECIO_POR_NOCHE;

  document.getElementById('calc-noches').textContent = noches;
  document.getElementById('calc-hab').textContent = habitaciones;
  document.getElementById('calc-precio').textContent = '\u20AC' + total.toLocaleString('es-ES');

  var btnReservar = document.getElementById('btn-reservar');
  if (btnReservar && noches > 0) {
    btnReservar.textContent = 'Book Now';
  }

  var totalDisplay = document.getElementById('calc-total-display');
  if (totalDisplay) totalDisplay.textContent = '\u20AC' + total.toLocaleString('es-ES');

  var salidaInput = document.getElementById('fecha-salida');
  if (entrada && salidaInput) {
    var minSalida = new Date(entrada);
    minSalida.setDate(minSalida.getDate() + 1);
    salidaInput.min = minSalida.toISOString().split('T')[0];
  }

  return { noches: noches, habitaciones: habitaciones, total: total, cantidad: cantidad, entrada: entrada, salida: salida };
}

// --- Checkout via servidor Node.js ---
async function handleCheckout() {
  var calc = actualizarCalculador();
  var noches = calc.noches;
  var habitaciones = calc.habitaciones;
  var total = calc.total;
  var entrada = calc.entrada;
  var salida = calc.salida;

  var nombreEl = document.getElementById('nombre');
  var emailEl = document.getElementById('email');
  var prefixEl = document.getElementById('phone-prefix');
  var phoneNumEl = document.getElementById('phone-number');

  var nombre = nombreEl ? nombreEl.value.trim() : '';
  var email = emailEl ? emailEl.value.trim() : '';
  var prefix = prefixEl ? prefixEl.value : '';
  var phoneNum = phoneNumEl ? phoneNumEl.value.trim() : '';
  var telefono = prefix + phoneNum;

  if (!nombre || !email || !phoneNum) {
    alert('Please fill in all fields: name, email and phone.');
    return;
  }

  var aceptoTerminos = document.getElementById('acepto-terminos');
  if (!aceptoTerminos || !aceptoTerminos.checked) {
    alert('You must accept the Terms & Conditions to continue.');
    return;
  }
  if (noches === 0) {
    alert('Check-out date must be after check-in date.');
    return;
  }

  // Track InitiateCheckout with Meta Pixel
  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', { value: total, currency: 'EUR' });
  }

  // Capturar lead en Google Sheets via n8n
  fetch('https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-istanbul-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombre,
      email: email,
      telefono: telefono,
      fecha_entrada: entrada,
      fecha_salida: salida,
      noches: noches,
      habitaciones: habitaciones,
      total: total,
      evento: 'istanbul',
      timestamp: new Date().toISOString()
    })
  }).catch(function () {}); // Silencioso — no interrumpir el flujo de pago

  var btn = document.getElementById('btn-reservar');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  try {
    var response = await fetch(CHECKOUT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Secret': 'bta-2026-istanbul'
      },
      body: JSON.stringify({
        noches: noches,
        habitaciones: habitaciones,
        email: email,
        nombre: nombre,
        telefono: telefono,
        fecha_entrada: entrada,
        fecha_salida: salida,
        success_url: 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/thank-you.html',
        cancel_url: 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/'
      })
    });

    var data = await response.json();

    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      throw new Error(data.error || 'Error al crear la sesi\u00F3n de pago');
    }

  } catch (error) {
    btn.textContent = 'Book Now';
    btn.disabled = false;
    alert('Error: ' + error.message + '\nContact us: info@blocktravelagency.com');
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
      // Primero validar el formulario
      var calc = actualizarCalculador();
      var nombre = document.getElementById('nombre')?.value.trim();
      var email = document.getElementById('email')?.value.trim();
      var phoneNum = document.getElementById('phone-number')?.value.trim();
      var aceptoTerminos = document.getElementById('acepto-terminos');
      if (!nombre || !email || !phoneNum) {
        alert('Please fill in all fields: name, email and phone.');
        return;
      }
      if (calc.noches === 0) {
        alert('Check-out date must be after check-in date.');
        return;
      }
      if (!aceptoTerminos || !aceptoTerminos.checked) {
        alert('You must accept the Terms & Conditions to continue.');
        return;
      }
      // Capturar lead ANTES de mostrar el modal de pago
      var prefix = document.getElementById('phone-prefix')?.value || '+34';
      var phoneNum2 = document.getElementById('phone-number')?.value.trim() || '';
      var telefono = prefix + phoneNum2;

      fetch('https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-istanbul-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          telefono: telefono,
          fecha_entrada: calc.entrada,
          fecha_salida: calc.salida,
          noches: calc.noches,
          habitaciones: calc.habitaciones,
          total: calc.total,
          evento: 'istanbul',
          timestamp: new Date().toISOString()
        })
      }).catch(function() {});

      // Luego abrir el modal de método de pago
      if (typeof window.openPaymentModal === 'function') {
        window.openPaymentModal(handleCheckout);
      } else {
        handleCheckout();
      }
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
