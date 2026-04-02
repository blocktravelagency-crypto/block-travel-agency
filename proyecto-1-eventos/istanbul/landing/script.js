/* ============================================
   BlockTravel Agency — Istanbul Blockchain Week 2026
   Stripe Checkout + Lead webhook + Meta Pixel handlers
   ============================================ */

// --- Stripe Checkout ---
async function handleCheckout() {
  var btns = document.querySelectorAll('.btn-checkout');
  btns.forEach(function (b) { b.textContent = 'Procesando...'; b.style.opacity = '0.7'; b.style.pointerEvents = 'none'; });

  // Track InitiateCheckout with Meta Pixel
  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', { value: 747.00, currency: 'EUR' });
  }

  try {
    console.log('Iniciando checkout...');

    var response = await fetch(
      'https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-stripe-checkout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          price_id: 'price_1THlpNRidwmiNfVGgeNeLfOz',
          quantity: 3,
          evento: 'istanbul',
          success_url: 'https://blocktravelagency-crypto.github.io/block-travel-agency/proyecto-1-eventos/istanbul/landing/thank-you.html',
          cancel_url: 'https://blocktravelagency-crypto.github.io/block-travel-agency/proyecto-1-eventos/istanbul/landing/index.html'
        })
      }
    );

    console.log('Response status:', response.status);
    var text = await response.text();
    console.log('Response text:', text);

    if (!text || text.trim() === '') {
      throw new Error('El servidor respondió vacío. Verificar workflow n8n y credencial Stripe.');
    }

    var data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error('Respuesta no es JSON válido: ' + text.substring(0, 100));
    }

    console.log('Data recibida:', data);

    if (!data.checkout_url) {
      throw new Error('No se recibió checkout_url. Respuesta: ' + JSON.stringify(data));
    }

    window.location.href = data.checkout_url;

  } catch (error) {
    console.error('Error en checkout:', error.message);
    btns.forEach(function (b) {
      b.textContent = 'Reservar ahora — €747';
      b.style.opacity = '1';
      b.style.pointerEvents = 'auto';
    });
    alert('Error al procesar el pago: ' + error.message + '\n\nPor favor intentá de nuevo o escribinos a info@blocktravelagency.com');
  }
}

// Asignar evento a todos los botones de checkout
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-checkout').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      handleCheckout();
    });
  });

  // --- Lead webhook (fire on page load) ---
  var payload = {
    evento: 'istanbul',
    pagina: window.location.href,
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    tipo: 'page_view'
  };

  fetch('https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
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
