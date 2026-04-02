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
| Stripe Payment Link | PENDIENTE — crear en dashboard.stripe.com (ver instrucciones abajo) |

## Checklist pre-deploy

- [x] index.html creado con 8 secciones
- [x] styles.css — identidad visual BlockTravel
- [x] script.js — Stripe Payment Link directo + Meta Pixel + webhook leads
- [x] thank-you.html — Purchase event trackeado
- [x] Meta Pixel instalado en index.html y thank-you.html
- [x] Logos copiados a assets/ (logo-black.png, logo-white.png)
- [ ] Crear Stripe Payment Link en dashboard.stripe.com y pegar URL en script.js
- [ ] Verificar PageSpeed mobile > 85
- [ ] Test end-to-end del Payment Link
- [ ] Dominio configurado (istanbulblockchaintravel.com)

## Pendientes críticos

1. **Crear Stripe Payment Link** — dashboard.stripe.com → Payment Links → Create:
   - Producto: Hotel Istanbul Blockchain Week 2026
   - Precio: price_1THlpNRidwmiNfVGgeNeLfOz (€249 × 3 unidades)
   - After payment → Redirect: `https://blocktravelagency-crypto.github.io/block-travel-agency/proyecto-1-eventos/istanbul/landing/thank-you.html`
   - Copiar URL (formato: `https://buy.stripe.com/XXXXXXXX`)
2. **Pegar URL en script.js** — Reemplazar `PAYMENT_LINK_URL_AQUI` con la URL real del Payment Link
3. **Test end-to-end** — Verificar flujo completo: botón → Stripe → thank-you.html
4. **Dominio** — Configurar istanbulblockchaintravel.com como custom domain

---

*Creado: 2026-04-02*
