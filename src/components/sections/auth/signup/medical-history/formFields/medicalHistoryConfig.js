import template from '@/data/clinicalRecordTemplate.json';

export function indexByQId() {
  const map = new Map();
  const sections = Array.isArray(template?.sections) ? template.sections : [];
  for (const sec of sections) {
    const fields = Array.isArray(sec.fields) ? sec.fields : [];
    for (const f of fields) {
      if (typeof f?.qId !== 'number') continue;
      map.set(f.qId, { ...f, __section: sec.title || 'Sección' });
    }
  }
  return map;
}

// Weight Control Section
export const CONTROL_PESO_IDS = [2,5, 6, 7, 8, 9, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

// Dental Section
export const ODONTOLOGIA_IDS = [
  58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 155, 156, 157, 158, 159, 160,
];

// Stetic Section
export const ESTETICO_IDS = [
  73, 74, 75, 76, 77, 78, 79, 80, 81, 161, 162, 163, 164, 165, 166, 167, 168,
];

/* Option packs for fallback yes/no */
export const YES_NO = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No', label: 'No' },
];

/* Map JSON field.type -> UI kind */
export function normalizeField(jsonField) {
  /* Minimal normalization */
  let kind = jsonField.type;
  if (kind === 'text' || kind === 'number') kind = 'input';
  if (kind === 'checkbox') kind = 'radio';
  return { ...jsonField, kind };
}
