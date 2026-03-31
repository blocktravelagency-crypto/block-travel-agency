# Estado del Proyecto — BlockTravel Hoteles

**Última actualización:** 2026-03-31

## Estado General: EN DESARROLLO — Fase 1

### Resumen

El proyecto se encuentra en la fase inicial de configuración de infraestructura y desarrollo de la primera landing page (evento Istanbul). El objetivo inmediato es tener un pipeline funcional: landing → formulario → Google Sheets → email de confirmación.

### Progreso por Área

| Área | Estado | Progreso |
|---|---|---|
| Estructura del proyecto | Completado | 100% |
| Infraestructura n8n | En progreso | 30% |
| Landing Istanbul | Pendiente | 0% |
| Landing Consensus | Pendiente | 0% |
| Meta Ads — Istanbul | Pendiente | 0% |
| Meta Ads — Consensus | Pendiente | 0% |
| Stripe (pagos) | Fase 2 | 0% |
| Sistema de agentes IA | En diseño | 20% |

### Bloqueantes Activos

1. **Meta Pixel** — Falta configurar el pixel en las landings. Sin esto no hay tracking de conversiones.
2. **Meta Ads API Token** — Necesita validación con token de producción (el de desarrollo expira).
3. **Paquetes Istanbul** — No se han definido los paquetes y precios finales para el evento.
4. **Workflows n8n** — Falta crear el workflow de captura de leads (formulario → Sheets → email).
5. **Plantillas email** — No se han creado las plantillas de confirmación y seguimiento en Resend.

### Próximos Pasos (en orden de prioridad)

1. Desarrollar landing page Istanbul con formulario de captura
2. Configurar workflow n8n: formulario → Google Sheets
3. Configurar workflow n8n: nuevo lead → email de confirmación vía Resend
4. Instalar Meta Pixel en landing Istanbul
5. Crear primera campaña de prueba en Meta Ads
6. Medir CPL y tasa de conversión
7. Iterar sobre landing y ads según datos

### Hitos Completados

- [x] Definición del stack tecnológico
- [x] Configuración de n8n en EasyPanel
- [x] Creación de estructura del proyecto
- [x] Diseño del protocolo de agentes
