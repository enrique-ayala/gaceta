import { getCollection, type CollectionEntry } from 'astro:content';

export type Resumen = CollectionEntry<'resumenes'>;

const fmt = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

export function fechaLarga(id: string): string {
  const s = fmt.format(new Date(`${id}T00:00:00Z`));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function titulo(r: Resumen): string {
  const h1 = r.body?.match(/^#\s+(.+)$/m)?.[1];
  return r.data.title ?? h1?.replace(/[*_`]/g, '').trim() ?? `Resumen del ${fechaLarga(r.id)}`;
}

// Más recientes primero.
export async function todos(): Promise<Resumen[]> {
  const rs = await getCollection('resumenes');
  return rs.sort((a, b) => b.id.localeCompare(a.id));
}
