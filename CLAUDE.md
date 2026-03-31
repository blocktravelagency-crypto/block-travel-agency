# CLAUDE.md — BlockTravel Hoteles (Proyecto P1)

## Contexto del Proyecto

**Nombre:** BlockTravel Hoteles — Sistema de Captación y Conversión para Eventos Hoteleros
**Descripción:** Plataforma de marketing digital automatizada para captar leads y convertir reservas de eventos hoteleros (bodas, convenciones, retiros corporativos) mediante landings optimizadas, campañas de Meta Ads, y un pipeline de automatización con n8n.

**Estado actual:** En desarrollo activo — Fase 1 (Infraestructura y primer evento)

## Stack Tecnológico

- **Frontend/Landings:** HTML/CSS/JS estático, desplegado en Hostinger
- **Automatización:** n8n (self-hosted en EasyPanel) — https://agencia-n8n.3a3rfo.easypanel.host
- **Ads:** Meta Ads API (Facebook/Instagram)
- **Tracking:** Meta Pixel, Google Sheets como CRM temporal
- **Pagos:** Stripe (Fase 2)
- **Email:** Resend API
- **IA:** Claude API (Anthropic), Gemini API (Google)
- **SEO/Performance:** PageSpeed Insights API
- **Storage:** Google Drive para assets

## APIs y Servicios Externos

| Servicio | Variable de Entorno | Estado |
|---|---|---|
| Meta Ads | `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`, `META_PIXEL_ID` | Activo |
| Google Sheets | `GOOGLE_SHEETS_ID` | Activo |
| Google Drive | `GOOGLE_DRIVE_FOLDER_ID` | Activo |
| Resend | `RESEND_API_KEY` | Activo |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` | Fase 2 — INACTIVO |
| n8n | `N8N_HOST`, `N8N_API_KEY` | Activo |
| Anthropic | `ANTHROPIC_API_KEY` | Activo |
| Gemini | `GEMINI_API_KEY` | Activo |
| PageSpeed | `PAGESPEED_API_KEY` | Activo |

## Agentes del Sistema

El proyecto opera con 7 agentes especializados que trabajan de forma coordinada:

1. **Líder** — Orquestador general, toma decisiones de prioridad y asigna tareas
2. **Marketing Agent** — Estrategia de campañas, copy, segmentación de audiencias
3. **Landing Builder** — Construcción y optimización de landing pages
4. **Leads Agent** — Captura, calificación y nurturing de leads
5. **Pricing Agent** — Estrategia de precios, paquetes y ofertas (Fase 2)
6. **SEO Agent** — Optimización on-page, performance, Core Web Vitals
7. **Infraestructura Agent** — Deploy, monitoreo, configuración de servicios

## Estructura del Proyecto

```
Hoteles/
├── docs/                      # Documentación del proyecto
├── proyecto-1-eventos/        # P1: Eventos hoteleros (ACTIVO)
│   ├── istanbul/              # Evento Istanbul
│   └── consensus/             # Evento Consensus
├── proyecto-2-tours/          # P2: Tours (CONGELADO)
├── agentes/                   # System prompts de cada agente
└── infrastructure/            # Configuración de infraestructura
```

## Reglas de Trabajo

1. **NO hardcodear credenciales** — Toda credencial va en `.env`, nunca en código
2. **Un evento = una carpeta** — Cada evento tiene su propia carpeta con landing/, ads/ y data/
3. **Documentar decisiones** — Toda decisión técnica o de negocio va en `docs/DECISIONS.md`
4. **Agentes siguen protocolo** — Ver `docs/AGENTS_PROTOCOL.md` antes de modificar cualquier agente
5. **Commits descriptivos** — Formato: `tipo(scope): descripción` (feat, fix, docs, refactor)
6. **No tocar P2** — El proyecto de Tours está CONGELADO hasta validar P1
7. **Landings primero** — Prioridad es tener landings funcionales antes de activar ads
8. **Datos en Sheets** — Google Sheets es el CRM temporal hasta migrar a algo más robusto

## KPIs Objetivo

- **CPL (Costo por Lead):** < $5 USD
- **Tasa de conversión landing:** > 8%
- **PageSpeed Score:** > 90 (mobile)
- **Tiempo de carga:** < 3s
- **Tasa de apertura emails:** > 25%

## Bloqueantes Pendientes

- [ ] Configurar Meta Pixel en landings
- [ ] Validar acceso a Meta Ads API con token de producción
- [ ] Definir paquetes y precios finales para Istanbul
- [ ] Configurar workflows de n8n para captura de leads
- [ ] Crear plantillas de email en Resend

## Próximo Paso Inmediato

Completar la landing page del evento Istanbul con formulario de captura de leads conectado a Google Sheets vía n8n.
