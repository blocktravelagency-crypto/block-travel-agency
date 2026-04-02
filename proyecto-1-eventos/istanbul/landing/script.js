/* ============================================
   BlockTravel Agency — Istanbul Blockchain Week 2026
   Stripe Payment Link + Lead webhook + Meta Pixel
   ============================================ */

// Stripe Payment Link directo — sin backend necesario
// REEMPLAZAR con la URL real del Payment Link creado en dashboard.stripe.com
var STRIPE_PAYMENT_LINK = 'PAYMENT_LINK_URL_AQUI';

function handleCheckout() {
  // Track InitiateCheckout with Meta Pixel
  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', { value: 747.00, currency: 'EUR' });
  }

  // Redirigir directo al Payment Link de Stripe
  window.location.href = STRIPE_PAYMENT_LINK;
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
