// STRIPE WEBHOOK CONFIG:
// Event: checkout.session.completed
// URL: https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-istanbul-payment-confirmed

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Secret',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Verificar API secret
  const apiSecret = request.headers.get('X-API-Secret');
  if (apiSecret !== API_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json()
    const { noches, habitaciones, email, nombre, telefono, fecha_entrada, fecha_salida, success_url, cancel_url } = body

    const cantidad = noches * habitaciones

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'customer_email': email,
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][unit_amount]': '21900',
        'line_items[0][price_data][product_data][name]': 'Hotel Istanbul Blockchain Week 2026',
        'line_items[0][price_data][product_data][description]': `${noches} noche(s) x ${habitaciones} habitacion(es) — ${fecha_entrada} al ${fecha_salida}`,
        'line_items[0][quantity]': String(cantidad),
        'metadata[nombre]': nombre,
        'metadata[telefono]': telefono,
        'metadata[fecha_entrada]': fecha_entrada,
        'metadata[fecha_salida]': fecha_salida,
        'metadata[noches]': String(noches),
        'metadata[habitaciones]': String(habitaciones),
        'metadata[evento]': 'istanbul',
        'success_url': success_url || 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/thank-you.html',
        'cancel_url': cancel_url || 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/',
      })
    })

    const session = await stripeResponse.json()

    if (!session.url) {
      return new Response(
        JSON.stringify({ error: session.error?.message || 'Error Stripe' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Capturar lead en Google Sheets via n8n (fire and forget)
    try {
      await fetch('https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-istanbul-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          telefono: telefono || '',
          fecha_entrada: fecha_entrada,
          fecha_salida: fecha_salida,
          noches: noches,
          habitaciones: habitaciones,
          total: noches * habitaciones * 219,
          evento: 'istanbul',
          timestamp: new Date().toISOString()
        })
      });
    } catch(e) {
      // Silencioso — no interrumpir el flujo de pago
    }

    return new Response(
      JSON.stringify({ checkout_url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// IMPORTANTE: Copiar este código manualmente en el editor de Cloudflare Workers
// URL: https://dash.cloudflare.com → Workers → plain-sea-6b2d → Edit Code
