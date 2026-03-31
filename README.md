# BlockTravel Hoteles

Sistema de captación y conversión de leads para eventos hoteleros mediante landing pages optimizadas, campañas de Meta Ads y automatización con n8n.

## Estructura del Proyecto

```
Hoteles/
├── CLAUDE.md                  # Contexto completo para Claude Code
├── README.md                  # Este archivo
├── .env.example               # Variables de entorno requeridas
├── docs/
│   ├── PROJECT_STATUS.md      # Estado actual y bloqueantes
│   ├── DECISIONS.md           # Registro de decisiones técnicas
│   └── AGENTS_PROTOCOL.md    # Protocolo de los 7 agentes
├── proyecto-1-eventos/        # Eventos hoteleros (activo)
│   ├── CLAUDE.md
│   ├── istanbul/              # Evento Istanbul
│   │   ├── landing/           # HTML/CSS/JS de la landing
│   │   ├── ads/               # Creativos y config de campañas
│   │   └── data/              # Datos de leads y métricas
│   └── consensus/             # Evento Consensus
│       ├── landing/
│       ├── ads/
│       └── data/
├── proyecto-2-tours/          # Tours (CONGELADO)
│   └── CLAUDE.md
├── agentes/                   # System prompts de agentes IA
│   ├── lider/
│   ├── marketing-agent/
│   ├── landing-builder/
│   ├── leads-agent/
│   ├── pricing-agent/
│   ├── seo-agent/
│   └── infraestructura-agent/
└── infrastructure/            # Configuración de servicios
    ├── n8n/
    ├── hostinger/
    └── stripe/
```

## Stack

| Componente | Tecnología |
|---|---|
| Landings | HTML/CSS/JS estático |
| Hosting | Hostinger |
| Automatización | n8n (EasyPanel) |
| Ads | Meta Ads API |
| CRM temporal | Google Sheets |
| Email | Resend |
| Pagos | Stripe (Fase 2) |
| IA | Claude API, Gemini API |

## Cómo Arrancar

1. **Clonar/descargar** el proyecto
2. **Copiar** `.env.example` a `.env` y completar las credenciales:
   ```bash
   cp .env.example .env
   ```
3. **Configurar n8n** — Importar los workflows desde `infrastructure/n8n/`
4. **Subir landing** a Hostinger desde `proyecto-1-eventos/istanbul/landing/`
5. **Activar Meta Pixel** en la landing con el ID configurado en `.env`

## Proyectos

| Proyecto | Estado | Descripción |
|---|---|---|
| P1 — Eventos | ACTIVO | Captación de leads para eventos hoteleros |
| P2 — Tours | CONGELADO | Pendiente validación de P1 |

## Documentación

- [Estado del Proyecto](docs/PROJECT_STATUS.md)
- [Decisiones Técnicas](docs/DECISIONS.md)
- [Protocolo de Agentes](docs/AGENTS_PROTOCOL.md)
