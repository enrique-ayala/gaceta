import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada resumen diario vive en resumenes/AAAA-MM-DD.md (lo escribe la rutina automática).
// El frontmatter es opcional: la fecha sale del nombre del archivo y el título del primer "# ".
const resumenes = defineCollection({
  loader: glob({ pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].md', base: './resumenes' }),
  schema: z.object({ title: z.string().optional() }).passthrough(),
});

export const collections = { resumenes };
