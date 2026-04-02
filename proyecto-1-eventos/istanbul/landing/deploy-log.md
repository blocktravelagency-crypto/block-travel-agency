# Deploy Log — Istanbul Blockchain Week 2026

## Estado: PENDIENTE DE DEPLOY

| Campo | Valor |
|-------|-------|
| Evento | Istanbul Blockchain Week 2026 |
| Fechas | 1-4 Junio 2026 (3 noches) |
| Precio publicado | €747 (3 noches × €249) |
| Stripe Price ID | price_1THlpNRidwmiNfVGgeNeLfOz |
| Meta Pixel ID | 1272242170945366 |
| Webhook leads | https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-leads |
| Webhook Stripe checkout | https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-stripe-checkout |

## Checklist pre-deploy

- [x] index.html creado con 8 secciones
- [x] styles.css — identidad visual BlockTravel
- [x] script.js — Stripe Checkout + Meta Pixel + webhook leads
- [x] thank-you.html — Purchase event trackeado
- [x] Meta Pixel instalado en index.html y thank-you.html
- [ ] Logos copiados a assets/ (logo-black.png, logo-white.png)
- [ ] Webhook Stripe checkout creado en n8n (bta-stripe-checkout)
- [ ] Deploy a hosting
- [ ] Verificar PageSpeed mobile > 85
- [ ] Verificar formulario/webhook funcional
- [ ] Dominio configurado

## Pendientes críticos

1. **Logos**: Copiar BT-Logo-1BLACK.png y BT-Logo-1WHITE.png a `assets/logo-black.png` y `assets/logo-white.png`
2. **Workflow n8n**: Crear workflow con webhook `bta-stripe-checkout` que:
   - Reciba POST con price_id, quantity, evento, success_url, cancel_url
   - Cree Stripe Checkout Session via Stripe API
   - Devuelva { checkout_url: session.url }
3. **Deploy**: Subir landing a hosting (Hostinger o dominio final)
4. **PageSpeed**: Auditar y optimizar si < 85

---

*Creado: 2026-04-02*
