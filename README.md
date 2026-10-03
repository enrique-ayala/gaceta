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

Los resúmenes no necesitan frontmatter: la fecha sale del nombre del archivo y el título del primer `# `.
