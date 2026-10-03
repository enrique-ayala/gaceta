import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada resumen diario vive en resumenes/AAAA-MM-DD.md (lo escribe la rutina automática).
// Todo el contenido va en el frontmatter con esta forma fija; el sitio lo dibuja siempre igual.
// La fecha sale del nombre del archivo. El cuerpo del .md se ignora.

const sesion = z.enum(['si', 'no', 'sin_datos']);

// Algo que ya se votó. Los votos son opcionales: si la fuente no los dice, se omiten.
const votacion = z.object({
  titulo: z.string(),
  explicacion: z.string(),
  a_favor: z.number().int().optional(),
  en_contra: z.number().int().optional(),
  abstenciones: z.number().int().optional(),
  resultado: z.enum(['aprobado', 'rechazado']).default('aprobado'),
  despues: z.string().optional(), // a dónde va después
});

// Algo en agenda (se va a discutir) o una idea nueva (alguien la propuso, nada más).
const asunto = z.object({
  titulo: z.string(),
  explicacion: z.string(),
  cuando: z.string().optional(),
});

const camara = z.object({
  sesion,
  nota: z.string().optional(), // una frase de contexto (por qué no hay sesión, qué pasó, etc.)
  votado: z.array(votacion).default([]),
  agenda: z.array(asunto).default([]),
  ideas: z.array(asunto).default([]),
});

const resumenes = defineCollection({
  loader: glob({ pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].md', base: './resumenes' }),
  schema: z.object({
    titular: z.string(), // una frase: lo más importante del día
    diputados: camara,
    senado: camara,
    destacado: z.object({ titulo: z.string(), texto: z.string() }).optional(),
    avisos: z.array(z.string()).default([]), // fuentes que no se pudieron leer, etc.
    fuentes: z.array(z.object({
      nombre: z.string(),
      url: z.string().url(),
      leida: z.boolean().default(true),
    })).default([]),
  }),
});

export const collections = { resumenes };
