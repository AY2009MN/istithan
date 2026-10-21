// خلية العرض: تملأ ورقة النموذج من البيانات (نصوص فقط، بلا innerHTML)
export function render(d) {
  for (const e of document.querySelectorAll('[data-v]')) e.textContent = d[e.dataset.v] ?? '';
  for (const e of document.querySelectorAll('[data-c]')) {
    const [k, v] = e.dataset.c.split(':');
    e.classList.toggle('on', d[k] === v);
  }
  document.getElementById('stamp').hidden = !d.s1 && !d.s2;
  document.getElementById('sheet').style.setProperty('--sc', d.sc || '');
}
