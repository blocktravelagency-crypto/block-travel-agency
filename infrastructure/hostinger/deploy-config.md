# Configuración de Deploy — Hostinger

## Método de Deploy

Deploy manual vía File Manager o FTP de Hostinger. Las landings son archivos estáticos (HTML/CSS/JS) que se suben directamente.

## Estructura en Hostinger

```
public_html/
├── istanbul/          # Landing evento Istanbul
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
└── consensus/         # Landing evento Consensus
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
```

## Checklist Pre-Deploy

- [ ] PageSpeed Score > 90 (mobile)
- [ ] Formulario funcional y conectado a n8n webhook
- [ ] Meta Pixel instalado y verificado
- [ ] Imágenes optimizadas (WebP, comprimidas)
- [ ] SSL activo en el dominio
- [ ] Responsive verificado en mobile y desktop
- [ ] Meta tags y OG tags configurados

## DNS

- Configurar registros DNS en panel de Hostinger
- SSL se gestiona automáticamente con Hostinger

## Rollback

Si algo sale mal:
1. Acceder a File Manager de Hostinger
2. Reemplazar archivos con la versión anterior (mantener backup local)
3. Verificar que la landing funciona correctamente
