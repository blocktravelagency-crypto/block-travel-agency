# Registro de Decisiones — BlockTravel Hoteles

Cada decisión técnica o de negocio relevante se documenta aquí con su contexto y justificación.

---

## DEC-001: Google Sheets como CRM temporal

**Fecha:** 2026-03-31
**Decisión:** Usar Google Sheets como almacén de leads en lugar de un CRM dedicado.
**Contexto:** En fase de validación, no se justifica el costo y complejidad de un CRM completo.
**Consecuencia:** Migrar a un CRM real cuando se superen ~500 leads activos o se necesite automatización avanzada de nurturing.

---

## DEC-002: HTML estático para landings

**Fecha:** 2026-03-31
**Decisión:** Construir landings como HTML/CSS/JS estático sin framework.
**Contexto:** Maximizar velocidad de carga (objetivo PageSpeed >90) y simplicidad de deploy en Hostinger. No se requiere interactividad compleja.
**Consecuencia:** Si en el futuro se necesitan landings dinámicas, evaluar migrar a Astro o similar.

---

## DEC-003: n8n self-hosted en EasyPanel

**Fecha:** 2026-03-31
**Decisión:** Usar n8n en EasyPanel en vez de n8n Cloud o Zapier.
**Contexto:** Control total sobre workflows, sin límites de ejecuciones, y costo fijo bajo. EasyPanel simplifica el deploy y mantenimiento.
**Consecuencia:** Requiere monitoreo manual de uptime. Configurar alertas si el servicio cae.

---

## DEC-004: Stripe solo en Fase 2

**Fecha:** 2026-03-31
**Decisión:** Posponer integración de pagos con Stripe hasta validar el funnel de captación.
**Contexto:** Primero necesitamos validar que el pipeline landing → lead → conversación funciona. Los pagos se pueden manejar manualmente mientras tanto.
**Consecuencia:** No invertir tiempo en Stripe hasta que CPL < $5 y tasa de conversión > 5%.

---

## DEC-005: Proyecto Tours (P2) congelado

**Fecha:** 2026-03-31
**Decisión:** Congelar P2 (Tours) hasta validar el modelo con P1 (Eventos).
**Contexto:** Foco total en un solo vertical para iterar rápido. Tours usa un modelo similar pero requiere adaptaciones que distraerían del objetivo principal.
**Consecuencia:** No crear contenido ni campañas para Tours hasta que P1 demuestre CPL y conversión dentro de KPIs.

---

*Para agregar una nueva decisión, copiar el formato anterior con el siguiente número secuencial (DEC-006, etc.)*
