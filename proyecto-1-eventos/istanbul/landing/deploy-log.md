# Deploy Log — Istanbul Blockchain Week 2026

## Estado: PENDIENTE DE GITHUB PAGES (repo privado — requiere hacerlo público)

**URL objetivo:** https://blocktravelagency-crypto.github.io/block-travel-agency/proyecto-1-eventos/istanbul/landing/
**Fecha última actualización:** 2026-04-02

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
- [x] Logos copiados a assets/ (logo-black.png, logo-white.png)
- [x] Webhook Stripe checkout creado en n8n (BTA-stripe-checkout — ID: k5aFhcuyg6TJ43MV — ACTIVO)
- [ ] Deploy a hosting — GitHub Pages requiere repo público (actualmente privado)
- [ ] Verificar PageSpeed mobile > 85
- [ ] Verificar formulario/webhook funcional end-to-end
- [ ] Configurar credencial HTTP Header Auth en n8n para Stripe API (Authorization: Bearer sk_test_...)
- [ ] Dominio configurado (istanbulblockchaintravel.com)

## Pendientes críticos

1. **GitHub Pages**: Hacer repo público para habilitar GitHub Pages gratis (no hay secretos commiteados — .env en .gitignore)
2. **Credencial Stripe en n8n**: Crear HTTP Header Auth credential en n8n UI → Credentials → New → Header Auth → Name: `Authorization` Value: `Bearer sk_test_...` y asignarla al nodo "Stripe Create Session" del workflow BTA-stripe-checkout
3. **STRIPE_SECRET_KEY en n8n**: Alternativamente, agregar como variable en n8n Settings → Variables
4. **Test end-to-end**: Una vez resueltos los puntos anteriores, probar flujo completo
5. **Dominio**: Configurar istanbulblockchaintravel.com como custom domain

---

*Creado: 2026-04-02*
