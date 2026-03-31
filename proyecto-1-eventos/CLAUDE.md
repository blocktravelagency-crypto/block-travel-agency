# CLAUDE.md — Proyecto 1: Eventos Hoteleros

## Estado: ACTIVO

## Descripción

Captación de leads para eventos hoteleros mediante landing pages + Meta Ads + automatización n8n. Cada evento tiene su propia carpeta con landing, ads y data.

## Eventos Activos

### Istanbul
- **Tipo:** Evento hotelero
- **Estado:** En desarrollo
- **Carpeta:** `istanbul/`
- **Landing:** `istanbul/landing/` — Pendiente de desarrollo
- **Ads:** `istanbul/ads/` — Pendiente (requiere landing primero)
- **Data:** `istanbul/data/` — Vacío hasta que haya leads

### Consensus
- **Tipo:** Evento hotelero
- **Estado:** En espera (depende de validación de Istanbul)
- **Carpeta:** `consensus/`

## Pipeline por Evento

```
Meta Ads → Landing Page → Formulario → n8n → Google Sheets + Email confirmación
```

## Reglas

- Desarrollar Istanbul primero, Consensus después
- Cada landing debe incluir Meta Pixel
- Formulario mínimo: nombre, email, teléfono, interés
- Medir CPL y conversión desde día 1
