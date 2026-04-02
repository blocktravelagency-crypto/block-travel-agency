const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

// CORS — permite llamadas desde cualquier origen de EasyPanel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

app.post('/create-checkout', async (req, res) => {
  try {
    const {
      noches,
      habitaciones,
      email,
      nombre,
      telefono,
      fecha_entrada,
      fecha_salida,
      success_url,
      cancel_url
    } = req.body;

    const cantidad = noches * habitaciones;
    const total = cantidad * 249;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: 24900, // €249 en centavos
            product_data: {
              name: `Hotel Istanbul Blockchain Week 2026`,
              description: `${noches} noche(s) × ${habitaciones} habitación(es) — ${fecha_entrada} al ${fecha_salida}`
            }
          },
          quantity: cantidad
        }
      ],
      metadata: {
        nombre,
        telefono,
        fecha_entrada,
        fecha_salida,
        noches: String(noches),
        habitaciones: String(habitaciones),
        total: String(total),
        evento: 'istanbul'
      },
      success_url: success_url || 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/thank-you.html',
      cancel_url: cancel_url || 'https://landinghoteles-istanbul-landing.hqsa3i.easypanel.host/'
    });

    res.json({ checkout_url: session.url });

  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Stripe server running on port ${PORT}`));

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido — cerrando servidor');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido — cerrando servidor');
  process.exit(0);
});
