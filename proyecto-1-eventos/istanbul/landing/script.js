/* ============================================
   BlockTravel Agency — Istanbul Blockchain Week 2026
   Stripe Checkout + Lead webhook + Meta Pixel handlers
   ============================================ */

(function () {
  'use strict';

  // --- Stripe Checkout ---
  async function handleCheckout(e) {
    e.preventDefault();

    // Track InitiateCheckout with Meta Pixel
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', { value: 747.00, currency: 'EUR' });
    }

    // Disable all checkout buttons and show loading
    var buttons = document.querySelectorAll('.btn-checkout');
    var originalTexts = [];
    buttons.forEach(function (btn, i) {
      originalTexts[i] = btn.textContent;
      btn.textContent = 'Procesando...';
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
    });

    try {
      var response = await fetch(
        'https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-stripe-checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price_id: 'price_1THlpNRidwmiNfVGgeNeLfOz',
            quantity: 3,
            evento: 'istanbul',
            success_url: window.location.origin + '/thank-you.html',
            cancel_url: window.location.href
          })
        }
      );

      var data = await response.json();
      window.location.href = data.checkout_url;
    } catch (error) {
      // Restore buttons on error
      buttons.forEach(function (btn, i) {
        btn.textContent = originalTexts[i];
        btn.disabled = false;
        btn.style.pointerEvents = '';
      });
      alert('Error al procesar el pago. Por favor intentá de nuevo.');
    }
  }

  // Attach checkout handler to all .btn-checkout elements
  document.querySelectorAll('.btn-checkout').forEach(function (btn) {
    btn.addEventListener('click', handleCheckout);
  });

  // --- Lead webhook (fire on page load) ---
  function sendLeadEvent() {
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
    }).catch(function () {
      // Silently fail — don't block user experience
    });
  }

  sendLeadEvent();

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
})();
