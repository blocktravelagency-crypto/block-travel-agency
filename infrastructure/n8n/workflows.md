# Workflows n8n — BlockTravel Hoteles

**Host:** https://agencia-n8n.3a3rfo.easypanel.host

## Workflows Planificados

### WF-001: Captura de Leads
- **Trigger:** Webhook (formulario de landing)
- **Pasos:**
  1. Recibir datos del formulario (nombre, email, teléfono, interés)
  2. Validar campos requeridos
  3. Verificar duplicados en Google Sheets
  4. Insertar fila en Google Sheets
  5. Enviar email de confirmación vía Resend
  6. Notificar al equipo (opcional)
- **Estado:** Pendiente de desarrollo

### WF-002: Seguimiento de Leads
- **Trigger:** Cron (diario a las 9:00 AM)
- **Pasos:**
  1. Leer leads sin respuesta de los últimos 3 días
  2. Enviar email de seguimiento vía Resend
  3. Actualizar estado en Sheets
- **Estado:** Pendiente de desarrollo

### WF-003: Reporte Diario de Métricas
- **Trigger:** Cron (diario a las 8:00 AM)
- **Pasos:**
  1. Consultar métricas de Meta Ads API
  2. Contar leads nuevos en Sheets
  3. Calcular CPL del día anterior
  4. Enviar resumen por email
- **Estado:** Pendiente de desarrollo

## Configuración

- Los webhooks se exponen en: `{N8N_HOST}/webhook/{workflow-id}`
- Credenciales se configuran dentro de n8n, NO en archivos locales
- Cada workflow debe tener un nodo de error handler al final
