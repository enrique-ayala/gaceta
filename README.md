# gaceta

**El Congreso, explicado fácil**: un resumen diario y muy sencillo de lo que pasa en el Congreso de México.

- Cada mañana (6:53 a. m., hora de la Ciudad de México) una rutina de Claude Code lee la Gaceta Parlamentaria,
  los comunicados del Senado y el Canal del Congreso, y guarda el resumen en `resumenes/AAAA-MM-DD.md`.
- Cada push a `main` construye el sitio con [Astro](https://astro.build) y lo publica en GitHub Pages:
  https://enrique-ayala.github.io/gaceta/

## Desarrollo local

```sh
npm install
npm run dev      # http://localhost:4321/gaceta/
npm run build    # genera dist/
```

## Formato de cada resumen

Cada `resumenes/AAAA-MM-DD.md` es **solo frontmatter YAML** (el cuerpo se ignora). El sitio lo dibuja siempre igual:
caja "¿Hay sesión hoy?", una tarjeta por cámara (Diputados / Senado) con *Ya se votó*, *En agenda* e *Ideas nuevas*,
tema destacado y fuentes. El esquema validado está en `src/content.config.ts`; si un archivo no lo cumple, `npm run build` falla.

Distinción clave: **votado** = ya se decidió · **agenda** = se va a discutir o votar (viene de una agenda oficial) ·
**ideas** = solo una propuesta presentada. Las votaciones usan `a_favor`/`en_contra` numéricos y se omiten si la fuente no los da.
