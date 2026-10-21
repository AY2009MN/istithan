// خلية العرض: تملأ ورقة النموذج من البيانات (نصوص فقط، بلا innerHTML)
export function render(d) {
  for (const e of document.querySelectorAll('[data-v]')) e.textContent = d[e.dataset.v] ?? '';
  for (const e of document.querySelectorAll('[data-c]')) {
    const [k, v] = e.dataset.c.split(':');
    e.classList.toggle('on', d[k] === v);
  }
  document.getElementById('stamp').hidden = !d.s1 && !d.s2;
  const sheet = document.getElementById('sheet'), real = d.sc === 'real';
  sheet.classList.toggle('real', real); // حبر ختم حقيقي: لون مائل للبنفسجي مع أثر انتشار الحبر
  sheet.style.setProperty('--sc', real ? '#2a47b8' : d.sc || '');
  sheet.style.setProperty('--fs', (['16', '18', '20'].includes(d.sz) ? d.sz : '18') + 'px');
}
