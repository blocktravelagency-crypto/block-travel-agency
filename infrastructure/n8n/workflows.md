# Workflows n8n — BlockTravelAgency

**Host:** https://landinghoteles-n8n.hqsa3i.easypanel.host

## Workflows Activos

| # | Nombre | ID | Webhook URL | Estado | Fecha activación |
|---|--------|----|-------------|--------|-----------------|
| 1 | BTA-leads-capture | `GW9Ha85CU0eAY7lt` | `https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-leads` | Activo | 2026-04-01 |
| 2 | BTA-backup-diario | `XA8dOnlvRZikpB0P` | N/A (Schedule: 23:00 Europe/Madrid) | Activo | 2026-04-01 |
| 3 | BTA-alerta-escala | `1kDNcdfzUV9ozs7D` | `https://landinghoteles-n8n.hqsa3i.easypanel.host/webhook/bta-alertas` | Activo | 2026-04-01 |

## Descripción de Workflows

### WF-001: BTA-leads-capture
- **Trigger:** Webhook POST `/bta-leads`
- **Flujo:** Webhook → Validar datos (email, teléfono, nombre) → Google Sheets Append → Email confirmación via Resend → Responder 200 OK
- **Ruta inválida:** Si faltan datos → Responder 200 OK con `{"status": "invalid"}`
- **Credenciales requeridas en n8n:** Google Sheets OAuth2, Resend API Key (HTTP Header Auth)

### WF-002: BTA-backup-diario
- **Trigger:** Schedule — todos los días a las 23:00 (Europe/Madrid)
- **Flujo:** Schedule → Execute Command (git add/commit/push) → Google Drive Upload (PROJECT_STATUS.md)
- **Credenciales requeridas en n8n:** Google Drive OAuth2
- **Nota:** El directorio git del servidor n8n debe configurarse manualmente

### WF-003: BTA-alerta-escala
- **Trigger:** Webhook POST `/bta-alertas`
- **Flujo:** Webhook → Enviar email alerta via Resend → Responder 200 OK
- **Payload esperado:** `{ tipo_alerta, evento, metricas, accion_recomendada, email_destino }`
- **Credenciales requeridas en n8n:** Resend API Key (HTTP Header Auth)

## Configuración Pendiente en n8n UI

1. **Google Sheets OAuth2** — Configurar credencial en n8n para que WF-001 pueda escribir en Sheets
2. **Resend API Key** — Configurar credencial HTTP Header Auth con `Authorization: Bearer {RESEND_API_KEY}` para WF-001 y WF-003
3. **Google Drive OAuth2** — Configurar credencial en n8n para que WF-002 suba backups
4. **GOOGLE_SHEETS_ID** — Definir como variable de entorno en n8n (Settings → Variables)
5. **IBOTT_EMAIL** — Definir como variable de entorno en n8n para recibir alertas
6. **Directorio git en servidor** — Configurar ruta del repo en el nodo Execute Command de WF-002

## Fallback

Los JSON de cada workflow están guardados en:
- `infrastructure/n8n/leads-capture.json`
- `infrastructure/n8n/backup-diario.json`
- `infrastructure/n8n/alerta-escala.json`

Si un workflow se pierde, importar manualmente desde n8n UI → Workflows → Import.
