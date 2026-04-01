# CLAUDE.md — BlockTravelAgency.com
## Cerebro Maestro del Proyecto | Leer SIEMPRE al iniciar sesión

---

## 1. IDENTIDAD DEL PROYECTO

**Nombre:** BlockTravelAgency.com
**Descripción:** Agencia de viajes digital especializada en eventos Web3, Crypto y Fintech.
**Modelo de negocio:** Validación de demanda ANTES de contratar inventario hotelero.
**Propietario:** IBott Studio
**Repo GitHub:** https://github.com/blocktravelagency-crypto/block-travel-agency

---

## 2. RUTAS EXACTAS DEL PROYECTO

**Raíz local P1 (Hoteles):**
C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\

**Raíz local P2 (Tours — CONGELADO):**
C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\TOURS\

**Archivos clave:**
- CLAUDE.md maestro: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\CLAUDE.md
- Variables de entorno: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\.env
- Estado del proyecto: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\docs\PROJECT_STATUS.md
- Protocolo agentes: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\docs\AGENTS_PROTOCOL.md
- Istanbul landing: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\proyecto-1-eventos\istanbul\landing\
- Istanbul ads: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\proyecto-1-eventos\istanbul\ads\
- Istanbul data: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\proyecto-1-eventos\istanbul\data\
- Consensus landing: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\proyecto-1-eventos\consensus\landing\
- Consensus ads: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\proyecto-1-eventos\consensus\ads\
- Consensus data: C:\Users\blocktravel\OneDrive - Bluealy\Documentos\Proyectos BlockTravel\Hoteles\proyecto-1-eventos\consensus\data\

---

## 3. PROYECTOS ACTIVOS

### P1 — Validación de Eventos (ACTIVO)
Testear demanda real antes de contratar inventario.
Funnel: Landing online → Meta Ads → Leads → Si valida → Contratar habitaciones → Vender con Stripe

**Eventos:**
| Evento | Ciudad | Fecha | Estado |
|--------|--------|-------|--------|
| Istanbul Blockchain Week | Istanbul, Turquía | Mayo 2025 | Campaña 1 — PRIORIDAD |
| Consensus Miami | Miami, EEUU | Mayo/Junio 2025 | Campaña 2 — Paralela |

**KPI de validación:**
- CPL < €20
- 10+ leads en 7 días
- PageSpeed mobile > 85
- Tasa conversión landing > 2%

**Presupuesto por campaña:** €200
- Fase aprendizaje: €3/día (días 1-7)
- Fase validación: €15-20/día (días 4-10)
- Reserva ajustes: ~€51
- Dominios (x2): ~€20

**Reglas de decisión Meta Ads:**
- CPL < €15 + leads > 10 en 7 días → Escalar: doblar presupuesto + activar Stripe + Google Ads
- CPL €15-20 + leads 5-10 → Optimizar creativos, dar 7 días más
- CPL > €20 por 5-7 días consecutivos → Pausar, revisar landing y creativos
- 0 leads en 5 días → Stop inmediato, revisar propuesta de valor

### P2 — Tours Ticket Alto (CONGELADO)
⏸ CONGELADO hasta que P1 registre sus primeros 10 leads validados.
Ticket objetivo: USD 2.000-8.000 por persona.

---

## 4. STACK TECNOLÓGICO

### Herramientas de construcción
| Herramienta | Uso |
|-------------|-----|
| Claude Code (Plan Max) | Construcción de landings, agentes, workflows |
| Gemini | Research, creativos, buyer persona |
| Antigravity | Uso simultáneo Claude + Gemini |
| n8n (Hostinger) | Automatización: leads, emails, backups |
| GitHub | Control de versiones |
| Hostinger | Hosting de landings y n8n |
| Google Drive | Backup secundario diario |

### APIs confirmadas
| API | Rol | Variable de entorno |
|-----|-----|---------------------|
| Meta Marketing API | Campañas Lead Generation | META_ACCESS_TOKEN, META_AD_ACCOUNT_ID, META_PIXEL_ID |
| Google Sheets API | CRM de leads | GOOGLE_SHEETS_ID |
| Google Drive API | Backups automáticos diarios | GOOGLE_DRIVE_FOLDER_ID |
| Resend API | Emails de confirmación a leads | RESEND_API_KEY |
| Stripe API | Pagos — FASE 2 INACTIVO | STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY |
| PageSpeed Insights API | Auditoría técnica de landings | PAGESPEED_API_KEY |
| n8n REST API | Construcción programática de workflows | N8N_API_KEY |
| Claude API | Cerebro de agentes | ANTHROPIC_API_KEY |
| Gemini API | Research y análisis | GEMINI_API_KEY |

**APIs descartadas:**
| API | Motivo | Sustituto |
|-----|--------|-----------|
| Veturis API | No prioritaria en Fase 1 | Consulta manual Booking/Expedia |
| WhatsApp Business API | Costo y complejidad innecesarios | Descartado — sin sustituto |
| Telegram Bot API | Descartado del proyecto | Descartado — sin sustituto |
| NotebookLM API | Solo Enterprise | System prompt exportado de Gemini |

### MCP Server
- **@makafeli/n8n-workflow-builder** — Construye y activa workflows en n8n desde Claude Code sin tocar la UI
- Instalación: npx @makafeli/n8n-workflow-builder
- N8N_HOST: https://landinghoteles-n8n.hqsa3i.easypanel.host
- Operaciones: create_workflow, activate_workflow, update_workflow, deactivate_workflow, create_workflow_and_activate

---

## 5. ARQUITECTURA DE AGENTES

Punto de entrada único: **Agente 0 (Líder)**. Ningún agente especializado se activa directamente.

### Orden de dependencias (NO saltear)
Pricing Agent → Marketing Agent → Landing Builder → Leads Agent → Campaña live

### Agentes
| # | Agente | Responsabilidad | Skills asignadas |
|---|--------|-----------------|-----------------|
| 0 | Líder / Orchestrator | Punto de entrada único. Recibe, analiza, delega | find-skills, n8n-mcp-tools-expert, n8n-workflow-patterns |
| 1 | Marketing Intelligence | Copy, estructura Meta Ads, creativos. Modelo Andromeda/GEM | paid-ads, ad-creative, copywriting, copy-editing, one-page-marketing, analytics-tracking |
| 2 | Landing Builder | Construye y deploya landings HTML/CSS/JS con Pixel y formulario | landing-page-design, landing-page-copywriter, frontend-design, page-cro, email-design |
| 3 | Leads & CRM | Procesa leads: Sheets + email confirmación + alerta de escala | apify-lead-generation, lead-magnets, gws-sheets, email-sequence, n8n-workflow-patterns |
| 4 | Pricing & Research | Precio de mercado + margen 15-25% + precio publicable | travel-planner, seo-geo, find-skills |
| 5 | SEO & Contenido | Auditoría técnica post-deploy y semanal | seo-audit, ai-seo, seo-geo, programmatic-seo, seo-content-brief, copywriting |
| 6 | Infraestructura & Backup | n8n via MCP, backups Drive, git commit diario | stripe-best-practices, n8n-mcp-tools-expert, n8n-workflow-patterns |

### Manejo de errores (todos los agentes)
- Fallo de API → reintentar 3 veces automáticamente
- Si persiste → escalar al Agente Líder con contexto completo del fallo
- Acciones irreversibles (publicar campaña, activar Stripe, gastar presupuesto) → confirmación explícita de IBott antes de ejecutar

---

## 6. SKILLS INSTALADAS

### Skills de marketplace (instaladas via claude skills add)
| Skill | Plugin instalado | Fuente | Agente asignado |
|-------|-----------------|--------|-----------------|
| paid-ads | marketing-skills | coreyhaines31/marketingskills | Marketing Intelligence |
| ad-creative | marketing-skills | coreyhaines31/marketingskills | Marketing Intelligence |
| copywriting | marketing-skills | coreyhaines31/marketingskills | Marketing Intelligence / SEO |
| copy-editing | marketing-skills | coreyhaines31/marketingskills | Marketing Intelligence |
| one-page-marketing | marketing-cro | wondelai/skills | Marketing Intelligence |
| analytics-tracking | marketing-skills | coreyhaines31/marketingskills | Marketing Intelligence |
| frontend-design | example-skills | anthropics/skills | Landing Builder |
| page-cro | marketing-skills | coreyhaines31/marketingskills | Landing Builder |
| apify-lead-generation | apify-ultimate-scraper | apify/agent-skills | Leads & CRM |
| lead-magnets | marketing-skills | coreyhaines31/marketingskills | Leads & CRM |
| email-sequence | marketing-skills | coreyhaines31/marketingskills | Leads & CRM |
| n8n-workflow-patterns | n8n-mcp-skills | czlonkowski/n8n-skills | Leads & CRM / Infraestructura |
| n8n-mcp-tools-expert | n8n-mcp-skills | czlonkowski/n8n-skills | Infraestructura |
| seo-audit | marketing-skills | coreyhaines31/marketingskills | SEO & Contenido |
| seo-geo | seo-geo | resciencelab/opc-skills | SEO & Contenido |
| programmatic-seo | marketing-skills | coreyhaines31/marketingskills | SEO & Contenido |
| ai-seo | marketing-skills | coreyhaines31/marketingskills | SEO & Contenido |
| stripe-best-practices | stripe | stripe/ai | Infraestructura |

### Skills locales del proyecto (.claude/skills/)
| Skill | Archivo | Agente asignado |
|-------|---------|-----------------|
| landing-page-design | .claude/skills/landing-page-design.md | Landing Builder |
| landing-page-copywriter | .claude/skills/landing-page-copywriter.md | Landing Builder |
| email-design | .claude/skills/email-design.md | Landing Builder |
| gws-sheets | .claude/skills/gws-sheets.md | Leads & CRM |
| travel-planner | .claude/skills/travel-planner.md | Pricing & Research |
| seo-content-brief | .claude/skills/seo-content-brief.md | SEO & Contenido |
| find-skills | .claude/skills/find-skills.md | Sistema / Líder |

---

## 7. REGLAS DE TRABAJO

1. **Un paso a la vez** — nunca avanzar al siguiente sin confirmar que el anterior está completo y funcionando
2. **Antes de escribir código** — confirmar exactamente qué se va a hacer
3. **Cada sesión termina con** — git add + commit + push al repo blocktravelagency-crypto/block-travel-agency
4. **Nunca hardcodear credenciales** — todo en variables de entorno en el archivo .env
5. **Si falta información** — parar y preguntar, nunca asumir
6. **Ser crítico** — si algo del plan está mal planteado, decirlo antes de ejecutar
7. **Ante fallos de API** — reintentar 3 veces automáticamente, si persiste escalar para decisión conjunta
8. **Acciones irreversibles** — publicar campaña, activar Stripe, gastar presupuesto requieren confirmación explícita de IBott antes de ejecutar
9. **Rutas exactas siempre** — nunca usar rutas relativas en los prompts, siempre la ruta completa

---

## 8. BLOQUEANTES PENDIENTES (al 31/03/2026)

| # | Bloqueante | Acción requerida | Quién |
|---|-----------|------------------|-------|
| 1 | Precio base Istanbul | Consultar Booking/Expedia para el periodo del evento y confirmar rango publicable | IBott + Pricing Agent |
| 2 | Cuenta Meta Business Manager | Crear cuenta y verificar (puede tomar 24-48h) | IBott (manual) |
| 3 | Dominios registrados | istanbulblockchaintravel.com + consensusmiamitravel.com (~€10 c/u) | IBott (manual) |
| 4 | N8N_API_KEY | Generar en n8n UI → Settings → API → Create API Key | IBott (manual) |

---

## 9. ESTADO ACTUAL DEL PROYECTO
✅ Paso 1 — Estructura de carpetas y archivos base creada
✅ Paso 2 — Repo GitHub inicializado: blocktravelagency-crypto/block-travel-agency
⬜ Paso 3 — CLAUDE.md maestro definitivo (EN CURSO)
⬜ Paso 4 — System prompts definitivos de cada agente
✅ Paso 5 — Workflows n8n via API (3 workflows activos)
⬜ Paso 6 — Landing Istanbul
⬜ Paso 7 — Campaña Meta Ads Istanbul

---

*BlockTravelAgency.com — IBott Studio © 2025*
