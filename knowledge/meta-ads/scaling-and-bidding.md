# Escalado CBO, Estrategias de Puja y Canales de Crecimiento

---

## 1. Escalado en CBO (Campaign Budget Optimization)

El escalado en 2025-2026 bajo Andromeda y GEM prioriza la **estabilidad de la señal** sobre los cambios bruscos de presupuesto.

### Método de incremento

| Método | Incremento | Frecuencia | Riesgo |
|---|---|---|---|
| **Conservador** | 5-7% diario | Diario | Mínimo — recomendado para fase inicial |
| **Estándar (Bloque)** | 20% | Cada 48-72 horas | Moderado — superar este % suele resetear fase de aprendizaje |
| **Duplicación** | 100% (duplicar campaña) | Cuando se necesita escalar agresivamente | Duplicar la campaña ganadora completa, sin "romper" la optimización original |

### Regla crítica
Superar el incremento del 20% cada 48-72h suele **resetear la fase de aprendizaje**, provocando inestabilidad en el CPA.

---

## 2. Estrategias de Puja (Bid Strategies)

### Cost Cap (Límite de Costo)
- Mejor herramienta para "disciplinar" a la IA durante el escalado.
- Obliga al algoritmo a mantenerse cerca del CPA objetivo incluso si aumenta el gasto.
- **Usar cuando:** Se necesita controlar costos durante escalado.

### Value Optimization (VO) / Highest Value
- Prioriza usuarios con mayor potencial de compra de gran volumen.
- Maximiza el ROAS.
- **Usar cuando:** Escalar negocios de ticket alto.
- Requiere enviar `predicted_ltv` y `value` en el payload de CAPI.

---

## 3. Debate ABO vs CBO

### Posición de Meta
Meta empuja CBO (Advantage+) para todos.

### Posición de operadores de élite
Mantienen **ABO para testeo controlado** de conceptos creativos puros, para evitar que el presupuesto se sesgue prematuramente.

### Recomendación
- **ABO:** Para testeo inicial de creativos y ángulos nuevos.
- **CBO:** Para escalado una vez validados los ganadores.

---

## 4. Partnership Ads

- Escalar contenido de creadores/UGC directamente desde Ads Manager.
- Aumenta la confianza en un **3x-10x**.
- Ideal para combinar con creativos de tipo "Founder Stories" o testimonios reales.

---

## 5. Threads como Océano Azul

- Oportunidad de escala inmediata con **CPMs bajos**.
- Ambiente "brand-safe".
- Canal infrautilizado que representa arbitraje de costos para early adopters.

---

## 6. Filtros CRM-CAPI para Calidad de Leads

### Concepto
El vector de crecimiento más técnico: enviar la señal **QualifiedLead** de vuelta a Meta desde el CRM para entrenar a GEM a buscar compradores, no solo "registradores".

### Implementación
1. CRM califica el lead según criterios del ICP.
2. Solo los leads que cumplen criterios reciben el evento QualifiedLead vía CAPI.
3. GEM aprende a optimizar hacia perfiles de compradores reales.
4. Incluir `predicted_ltv` y `lead_quality_score` en el payload.

### Feedback Loop
- Enviar QualifiedLead solo para usuarios cuyas respuestas coincidan con el ICP (presupuesto >1,000 USD).
- Fuerza a GEM a ignorar a los "curiosos".

---

## 7. Canales Nicho (Arbitraje)

- **Newsletters industriales:** Publicidad en newsletters del sector para capturar "alpha" fuera de la saturación de Facebook Feed.
- **Comunidades de Reddit:** Canal de bajo costo para audiencias Web3/Crypto.
- **Arbitraje en español:** CPC en español es hasta **3.5x más bajo** que en inglés para los mismos sectores ($0.79 vs $2.65).

---

## 8. Debate Lead Forms vs Landing Pages

| Formato | Cuándo usar | Por qué |
|---|---|---|
| **Landing Pages** | Tickets >$1,000 | Fricción como filtro de calidad |
| **Lead Forms** | Top of Funnel | Volumen para alimentar a GEM; pre-llenado aumenta volumen crítico |

---

## 9. Reglas de Decisión para BlockTravel

Basadas en CLAUDE.md maestro:

| Escenario | Acción |
|---|---|
| CPL < €15 + leads > 10 en 7 días | Escalar: doblar presupuesto + activar Stripe + Google Ads |
| CPL €15-20 + leads 5-10 | Optimizar creativos, dar 7 días más |
| CPL > €20 por 5-7 días consecutivos | Pausar, revisar landing y creativos |
| 0 leads en 5 días | Stop inmediato, revisar propuesta de valor |

---

*Fuente: Deep Research — Cerebro de Marketing BlockTravelAgency.com*
