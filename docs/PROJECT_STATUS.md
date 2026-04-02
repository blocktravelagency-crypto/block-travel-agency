# Estado del Proyecto — BlockTravel Hoteles

**Última actualización:** 2026-04-02

## Estado General: EN DESARROLLO — Fase 1

### Resumen

El proyecto se encuentra en la fase de configuración de infraestructura y desarrollo de la primera landing page (evento Istanbul). El objetivo inmediato es tener un pipeline funcional: landing → formulario → Google Sheets → email de confirmación.

### Progreso por Pasos

| Paso | Descripción | Estado | Commit |
|------|-------------|--------|--------|
| 1 | Estructura de carpetas y archivos base | ✅ Completado | — |
| 2 | Repo GitHub inicializado | ✅ Completado | — |
| 3 | CLAUDE.md maestro definitivo | ✅ Completado | `d19fdbf` |
| 4 | System prompts definitivos de cada agente | ✅ Completado | Ver tabla abajo |
| 5 | Workflows n8n via MCP | ✅ Completado | Este commit |
| 6 | Landing Istanbul | ✅ Completado | `909b0cd` |
| 7 | Deploy landing Istanbul | 🔶 Bloqueado (repo privado) | — |
| 8 | Workflow Stripe n8n | ✅ Completado | WF-004 `k5aFhcuyg6TJ43MV` |
| 9 | Campaña Meta Ads Istanbul | ⬜ Pendiente | — |

### Paso 4 — System Prompts Definitivos (COMPLETADO)

| # | Agente | Commit | Fecha |
|---|--------|--------|-------|
| 0 | Líder / Orchestrator | `31586ca` | 2026-03-31 |
| 1 | Marketing Intelligence | `28ac168` | 2026-04-01 |
| 2 | Landing Builder | `f883a3a` | 2026-04-01 |
| 3 | Leads & CRM | `ef94d07` | 2026-04-01 |
| 4 | Pricing & Research | `092c150` | 2026-03-31 |
| 5 | SEO & Contenido | `a025548` | 2026-04-01 |
| 6 | Infraestructura & Backup | Este commit | 2026-04-01 |

### Knowledge Base (COMPLETADA)

| Archivo | Commit |
|---------|--------|
| knowledge/meta-ads/andromeda-gem-strategy.md | `586067d` |
| knowledge/meta-ads/capi-implementation.md | `586067d` |
| knowledge/meta-ads/scaling-and-bidding.md | `586067d` |
| knowledge/buyer-persona/web3-crypto-traveler.md | `586067d` |

### Progreso por Área

| Área | Estado | Progreso |
|---|---|---|
| Estructura del proyecto | Completado | 100% |
| System prompts agentes | Completado | 100% |
| Knowledge base MKT | Completado | 100% |
| Infraestructura n8n | Completado | 100% |
| Landing Istanbul | Completado | 100% |
| Landing Consensus | Pendiente | 0% |
| Meta Ads — Istanbul | Pendiente | 0% |
| Meta Ads — Consensus | Pendiente | 0% |
| Stripe (pagos) | WF activo, credencial pendiente | 50% |

### Bloqueantes Activos

1. **Repo público para GitHub Pages** — El repo es privado, GitHub Pages gratis solo funciona con repos públicos. No hay secretos en git history (.env en .gitignore). Acción: Settings → Danger Zone → Change visibility → Public (IBott manual)
2. **Credencial Stripe en n8n** — Crear HTTP Header Auth en n8n UI → Credentials → New → Header Auth → Name: `Authorization` Value: `Bearer STRIPE_SECRET_KEY` → Asignar al nodo "Stripe Create Session" de WF-004 (IBott manual)
3. **Cuenta Meta Business Manager** — Crear cuenta y verificar, puede tomar 24-48h (IBott manual)
4. **Dominios registrados** — istanbulblockchaintravel.com + consensusmiamitravel.com ~€10 c/u (IBott manual)

### Paso 5 — Workflows n8n (COMPLETADO)

| # | Workflow | ID | Estado | Webhook URL |
|---|---------|-----|--------|-------------|
| 1 | BTA-leads-capture | `GW9Ha85CU0eAY7lt` | Activo | `/webhook/bta-leads` |
| 2 | BTA-backup-diario | `XA8dOnlvRZikpB0P` | Activo | N/A (Schedule 23:00) |
| 3 | BTA-alerta-escala | `1kDNcdfzUV9ozs7D` | Activo | `/webhook/bta-alertas` |

**Test webhook WF1:** HTTP 200 OK (Google Sheets y Resend pendientes de credenciales en n8n)
**JSONs de fallback:** `infrastructure/n8n/*.json`

### Próximo Paso: Paso 6 — Landing Istanbul

### Hitos Completados

- [x] Definición del stack tecnológico
- [x] Configuración de n8n en EasyPanel
- [x] Creación de estructura del proyecto
- [x] Diseño del protocolo de agentes
- [x] CLAUDE.md maestro definitivo
- [x] Skills locales del proyecto (7/7)
- [x] Knowledge base MKT (4 archivos)
- [x] System prompts definitivos de los 7 agentes (0-6)
