// خلية الحقول: قراءة/كتابة/تصفير كل عنصر يحمل data-k
const all = () => [...document.querySelectorAll('[data-k]')];
const radio = (e) => e.type === 'radio';

export const read = () => {
  const o = {};
  for (const e of all()) if (!radio(e) || e.checked) o[e.dataset.k] = e.value;
  return o;
};
export const write = (o) => {
  for (const e of all()) {
    const v = o[e.dataset.k];
    if (typeof v !== 'string') continue;
    if (radio(e)) e.checked = e.value === v; else e.value = v;
  }
};
export const reset = (keep = []) => {
  for (const e of all()) {
    if (keep.includes(e.dataset.k)) continue;
    if (radio(e)) e.checked = false; else e.value = '';
  }
};
