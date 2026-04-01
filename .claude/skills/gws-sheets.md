---
name: gws-sheets
description: Experto en Google Sheets API para gestión de CRM de leads con service account y fallback local
type: skill
agent: Leads & CRM
---

# Google Workspace Sheets — BlockTravelAgency

Experto en Google Sheets API para gestión de CRM de leads.

## Especialización

- Autenticación OAuth2 con service account
- Operación principal: append de filas con timestamp automático
- Estructura de columnas por pestaña:
  - fecha (timestamp ISO 8601)
  - nombre (texto, obligatorio)
  - email (email validado, obligatorio)
  - telefono (texto, obligatorio)
  - num_personas (número, obligatorio)
  - fechas_viaje (texto, obligatorio)
  - evento (texto, obligatorio)
  - fuente (texto, obligatorio)
  - estado_lead (enum: nuevo/contactado/cotizado/convertido/descartado)
  - notas (texto, opcional)
- Una pestaña por evento (Istanbul, Consensus, etc.)
- Validación de email con regex antes de registrar
- Variable de entorno: GOOGLE_SHEETS_ID

## Reglas

1. Nunca perder un lead por fallo de API — si Sheets no responde, guardar en archivo local temporal (JSON)
2. Reintentar 3 veces antes de usar fallback local
3. Validar formato de email antes de escribir en Sheets
4. Timestamp en formato ISO 8601
5. Al recuperar conexión, sincronizar leads del archivo temporal a Sheets
6. Log de cada operación de escritura para auditoría
