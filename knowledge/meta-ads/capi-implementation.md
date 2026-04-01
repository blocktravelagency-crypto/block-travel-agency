# CAPI — Implementación Técnica para GEM

---

## 1. Configuración Paso a Paso

### 1.1 Activación de Advanced Matching Event (AME)
- **Obligatorio** enviar datos de usuario (email, teléfono, ID de Facebook) de forma encriptada (hashing SHA-256).
- Vincula la data del servidor con los perfiles de Meta.

### 1.2 Redundancia de Señal (Pixel + CAPI)
- Usar Pixel (navegador) y CAPI (servidor) simultáneamente.
- Meta realiza de-duplicación automática.
- No se pierde ninguna señal por bloqueadores de anuncios.

### 1.3 Monitoreo de Event Match Quality (EMQ)
- **EMQ debe ser superior a 6.0** para que GEM aprenda eficientemente.
- **EMQ >8.0 es el nuevo estándar** para que Andromeda no penalice el costo por impresión.
- Puntuaciones bajas degradan el rendimiento del algoritmo.

### 1.4 Plugins Nativos
Para e-commerce: integración a través de socios oficiales (Shopify, WooCommerce) para reducir errores técnicos.

---

## 2. Advanced Matching — Parámetros PII Mandatarios

Para alcanzar un EMQ sobresaliente, enviar **todos** estos parámetros encriptados en SHA-256:

| Parámetro | Campo | Obligatorio |
|---|---|---|
| Email | `em` | ✅ |
| Teléfono | `ph` | ✅ |
| Nombre/Apellido | `fn`, `ln` | ✅ |
| Ciudad | `ct` | ✅ |
| Estado | `st` | ✅ |
| Código Postal | `zp` | ✅ |
| País | `country` | ✅ |
| IP | `client_ip_address` | ✅ |
| User Agent | `client_user_agent` | ✅ |

**Regla de hashing:** Todos los datos PII deben estar en **minúsculas y sin espacios** antes del SHA-256.

---

## 3. Event Match Quality (EMQ) — Guía de Optimización

- Tras las primeras 50 conversiones, revisar en Events Manager que EMQ sea >6.0.
- Si es menor, añadir parámetros adicionales (código postal, ciudad del usuario).
- Auditoría semanal de EMQ en Events Manager para evitar "vicio de datos históricos".

---

## 4. Payload JSON — Evento QualifiedLead (Server-to-Server)

```json
{
  "data": [
    {
      "event_name": "QualifiedLead",
      "event_time": 1711974000,
      "action_source": "system_generated",
      "user_data": {
        "em": ["7b068..."],
        "ph": ["5f4d..."],
        "external_id": "CRM_998877",
        "fbc": "fb.1.1554763784051.IwAR2...",
        "fbp": "fb.1.1554763784051.100..."
      },
      "custom_data": {
        "value": 2500.00,
        "currency": "USD",
        "predicted_ltv": 7500.00,
        "lead_quality_score": 85
      },
      "event_id": "unique_id_12345"
    }
  ]
}
```

### Campos críticos del payload:
- **action_source:** `"system_generated"` para eventos de CRM.
- **value:** Número float + currency ISO 4217.
- **predicted_ltv:** Valor de vida del cliente predicho — entrena a la IA para priorizar usuarios con alta probabilidad de compra.
- **event_id:** Debe ser idéntico en Pixel y CAPI para de-duplicación.

### Ventana de tiempo óptima (Delay)
El evento QualifiedLead debe enviarse **dentro de 24 a 72 horas** posteriores al Lead inicial, para que GEM registre la conversión dentro de la regla 50/7.

---

## 5. external_id — Era Post-Cookie (iOS)

### Función
Identificador único persistente generado por el CRM que permite a Meta realizar **Reconciliación de Identidad** de manera determinista.

### Técnica de reconciliación
1. Usuario ve anuncio en iPhone (App) → Meta registra cuenta asociada.
2. Días después, completa acción en laptop (Web) sin cookies.
3. CRM envía evento vía CAPI con `external_id`.
4. Meta busca el ID y "pega" el rastro del clic original al perfil.

---

## 6. Cookies fbp y fbc

### Captura
El frontend debe extraer las cookies `_fbp` (browser ID) y `_fbc` (click ID) del navegador al momento de la conversión web.

### Inyección
- Guardar en campos ocultos del CRM vinculados al registro del lead.
- Al disparar QualifiedLead desde el servidor, "re-inyectar" estos strings en el payload CAPI.
- Garantiza atribución del 100%, incluso en entornos con bloqueadores o restricciones de Apple.
- **Recupera hasta 20% de eventos bloqueados.**

---

## 7. Protocolo de Diagnóstico — Dashboard Alarms

| Alerta | Causa Probable | Acción Correctiva |
|---|---|---|
| **EMQ < 6.0** | Hashing SHA-256 incorrecto o falta de parámetros PII clave | Validar script de encriptación; enviar al menos 5 parámetros de usuario |
| **Signal Gap > 20%** | Desconexión servidor-Meta o bloqueo masivo de Pixel no compensado por CAPI | Verificar logs de salida (Status 200); comparar volúmenes brutos diarios |
| **Deduplication Error** | `event_id` no coincide entre Pixel y CAPI o `event_name` distinto | Asegurar que `event_id` se genere en cliente y pase íntegro al servidor |
| **Latencia > 24h** | Envío tardío "envenena" el aprendizaje de GEM (sequence learning) | El sistema no puede correlacionar intento de compra con secuencia de anuncios |

---

## 8. Checklist de Auditoría CAPI

- [ ] **Deduplicación:** ¿Cada evento tiene un `event_id` idéntico en Pixel y CAPI?
- [ ] **Match Quality:** ¿Se envían `em`, `ph`, `client_ip_address` y `client_user_agent`?
- [ ] **Action Source:** ¿Los eventos de CRM tienen `"action_source": "system_generated"`?
- [ ] **Hashing:** ¿Todos los datos PII están en minúsculas y sin espacios antes del SHA-256?
- [ ] **EMQ > 6.0** tras primeras 50 conversiones.
- [ ] **Cookies fbp/fbc** capturadas y re-inyectadas en payload.

---

## 9. Zero-party Data vía Quizzes

### Estructuración de Custom Events
- **Evento raíz:** Disparar `Quiz_Intention_Scored` al completar el cuestionario.
- **Parámetros PII:** Email, Teléfono, Facebook Lead ID, IP, User Agent (SHA-256).

### Data Parameters (Payload del Quiz)
| Parámetro | Uso |
|---|---|
| `custom_data[intent_score]` | Valor numérico 1-100 que define urgencia |
| `custom_data[budget_range]` | Para ticket alto (>1,000 USD), filtra usuarios sin capacidad |
| `custom_data[specific_pain_point]` | Categoriza respuesta ("seguridad", "estatus", "ahorro de tiempo") para secuenciación personalizada |

### Protocolo de implementación
1. **Mapeo de variables:** Vincular cada respuesta del quiz a una `content_category` dentro del esquema de Meta.
2. **Hashing del servidor:** Capa de procesamiento (Google Cloud/AWS) que recibe respuesta, asocia con `fbc`, y hashea SHA-256 antes de enviar a la API.
3. **Auditoría de EMQ:** Tras 50 conversiones, verificar EMQ >6.0. Si menor, añadir código postal/ciudad del quiz.
4. **Feedback Loop de calidad:** Enviar QualifiedLead desde CRM solo para usuarios cuyas respuestas coincidan con el ICP (presupuesto >1,000 USD).

---

## 10. Definición del Payload para LTV Predicho

### Lógica de negocio para ticket alto (HNWI)
El cálculo del valor predicho no debe ser lineal, sino combinación de señales:

1. **Presupuesto declarado:** Capturado en quiz inicial (rango >$1,000).
2. **Cargo del contacto:** Pesos adicionales si `job_title` es CEO, Founder o Administrador.
3. **Señales de comportamiento:** Puntuación basada en profundidad de navegación (descarga de itinerario premium, visualización >75% de video de autoridad).

---

*Fuente: Deep Research — Cerebro de Marketing BlockTravelAgency.com*
