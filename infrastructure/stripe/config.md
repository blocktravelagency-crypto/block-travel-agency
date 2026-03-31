# Configuración Stripe — BlockTravel Hoteles

## Estado: FASE 2 — INACTIVO

> **No activar hasta que P1 valide el funnel de captación (CPL < $5, conversión > 5%).**

## Configuración Planificada

### Variables de Entorno
- `STRIPE_SECRET_KEY` — Clave secreta (server-side)
- `STRIPE_PUBLISHABLE_KEY` — Clave pública (client-side)

### Productos a Crear
- Paquete Básico por evento
- Paquete Estándar por evento
- Paquete Premium por evento
- Early-bird con descuento temporal

### Integración
- Checkout embebido en landing page (Stripe Elements o Checkout Session)
- Webhook de Stripe → n8n para confirmar pagos
- Actualizar Google Sheets con estado de pago

### Moneda
- USD como moneda principal

## Pendiente para Fase 2
- [ ] Crear cuenta Stripe o activar la existente
- [ ] Configurar productos y precios
- [ ] Implementar checkout en landing
- [ ] Configurar webhook Stripe → n8n
- [ ] Testing con tarjetas de prueba
