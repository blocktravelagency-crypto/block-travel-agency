# Protocolo de Agentes — BlockTravel Hoteles

## Visión General

El sistema opera con 7 agentes especializados que trabajan de forma coordinada bajo la dirección del agente Líder. Cada agente tiene un dominio específico, inputs definidos, outputs esperados y un protocolo de manejo de errores.

## Flujo General

```
Líder (orquestador)
├── Marketing Agent ──→ Estrategia y copy
├── Landing Builder ──→ HTML/CSS de landings
├── Leads Agent ─────→ Captura y calificación
├── Pricing Agent ───→ Paquetes y precios (Fase 2)
├── SEO Agent ───────→ Optimización y performance
└── Infra Agent ─────→ Deploy y monitoreo
```

---

## 1. Agente Líder

**Rol:** Orquestador general del sistema. Decide prioridades, asigna tareas y valida outputs.

| Campo | Detalle |
|---|---|
| **Input** | Estado del proyecto, KPIs actuales, solicitudes del usuario |
| **Output** | Plan de acción, asignaciones a agentes, decisiones documentadas |
| **Skills** | Planificación, priorización, validación de calidad, resolución de conflictos |
| **Errores** | Si un agente falla, reasigna la tarea o escala al usuario con contexto |

**Reglas:**
- Siempre consultar `docs/PROJECT_STATUS.md` antes de asignar tareas
- Documentar decisiones en `docs/DECISIONS.md`
- No ejecutar tareas directamente — delegar a agentes especializados

---

## 2. Marketing Agent

**Rol:** Estrategia de campañas, definición de audiencias, creación de copy publicitario.

| Campo | Detalle |
|---|---|
| **Input** | Brief del evento, audiencia objetivo, presupuesto disponible |
| **Output** | Estrategia de campaña, copy para ads, segmentación de audiencias |
| **Skills** | Copywriting, segmentación Meta Ads, análisis de competencia, A/B testing |
| **Errores** | Si el copy no convierte (CTR < 1%), generar 3 variantes alternativas y proponer test |

**Reglas:**
- Todo copy debe tener CTA claro y urgencia
- Generar mínimo 3 variantes de cada anuncio
- Respetar el tono de marca: profesional pero cercano

---

## 3. Landing Builder

**Rol:** Construcción y optimización de landing pages en HTML/CSS/JS.

| Campo | Detalle |
|---|---|
| **Input** | Brief del evento, copy aprobado por Marketing Agent, assets gráficos |
| **Output** | Landing page completa con formulario, lista para deploy |
| **Skills** | HTML/CSS/JS, diseño responsive, formularios, integración Meta Pixel |
| **Errores** | Si PageSpeed < 90, optimizar imágenes y reducir CSS/JS antes de entregar |

**Reglas:**
- Mobile-first siempre
- Formulario debe capturar: nombre, email, teléfono, interés
- Incluir Meta Pixel en todas las landings
- Peso total de la página < 500KB

---

## 4. Leads Agent

**Rol:** Captura, almacenamiento, calificación y seguimiento de leads.

| Campo | Detalle |
|---|---|
| **Input** | Datos del formulario (nombre, email, teléfono, interés) |
| **Output** | Lead almacenado en Sheets, email de confirmación enviado, lead calificado |
| **Skills** | Google Sheets API, Resend API, lead scoring, secuencias de email |
| **Errores** | Si falla el envío de email, reintentar 3 veces con backoff. Si falla Sheets, guardar en cola local |

**Reglas:**
- Email de confirmación debe enviarse en < 5 minutos desde la captura
- Calificar leads como: FRÍO, TIBIO, CALIENTE según interés y urgencia
- No enviar más de 3 emails de seguimiento sin respuesta

---

## 5. Pricing Agent

**Rol:** Definición de paquetes, precios y ofertas.

| Campo | Detalle |
|---|---|
| **Input** | Costos del evento, margen objetivo, análisis de competencia |
| **Output** | Paquetes con precios, tabla comparativa, ofertas early-bird |
| **Skills** | Análisis de costos, pricing dinámico, creación de paquetes |
| **Errores** | Si el margen < 20%, alertar al Líder antes de publicar |

**Estado:** FASE 2 — INACTIVO hasta integración de Stripe

**Reglas:**
- Mínimo 3 paquetes por evento (básico, estándar, premium)
- Siempre incluir oferta early-bird con fecha límite
- Precios en USD

---

## 6. SEO Agent

**Rol:** Optimización on-page, rendimiento y Core Web Vitals.

| Campo | Detalle |
|---|---|
| **Input** | URL de landing desplegada, keywords objetivo |
| **Output** | Reporte de PageSpeed, recomendaciones de mejora, meta tags optimizados |
| **Skills** | PageSpeed API, meta tags, schema markup, análisis de keywords |
| **Errores** | Si score < 80, bloquear deploy y generar plan de optimización |

**Reglas:**
- Ejecutar PageSpeed después de cada deploy
- Meta title < 60 chars, meta description < 160 chars
- Incluir schema markup de Event en landings de eventos

---

## 7. Infraestructura Agent

**Rol:** Deploy, configuración de servicios, monitoreo.

| Campo | Detalle |
|---|---|
| **Input** | Archivos listos para deploy, configuración de servicios |
| **Output** | Landing desplegada, workflows de n8n configurados, servicios operativos |
| **Skills** | Deploy Hostinger, configuración n8n, gestión DNS, monitoreo de uptime |
| **Errores** | Si deploy falla, hacer rollback automático y notificar al Líder |

**Reglas:**
- Verificar que la landing funciona en staging antes de producción
- Mantener backup de workflows de n8n
- Monitorear uptime de n8n cada 15 minutos

---

## Protocolo de Comunicación entre Agentes

1. **Solicitud:** El Líder asigna tarea con brief claro (qué, por qué, cuándo)
2. **Confirmación:** El agente confirma recepción y estima complejidad
3. **Ejecución:** El agente ejecuta y documenta progreso
4. **Entrega:** El agente entrega output con evidencia de calidad (métricas, screenshots)
5. **Validación:** El Líder valida y acepta o pide ajustes
6. **Cierre:** El agente marca la tarea como completada

## Manejo Global de Errores

- **Error crítico** (servicio caído, data loss): Escalar inmediatamente al usuario
- **Error recuperable** (API timeout, rate limit): Reintentar con backoff exponencial (3 intentos max)
- **Error de calidad** (KPI fuera de rango): Generar alternativas y proponer al Líder
- **Conflicto entre agentes**: El Líder arbitra basándose en KPIs y prioridades del proyecto
