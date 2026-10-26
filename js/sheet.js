// خلية العرض: تملأ ورقة النموذج من البيانات (نصوص فقط، بلا innerHTML)
export function render(d) {
  for (const e of document.querySelectorAll('[data-v]')) e.textContent = d[e.dataset.v] ?? '';
  for (const e of document.querySelectorAll('[data-c]')) {
    const [k, v] = e.dataset.c.split(':');
    e.classList.toggle('on', d[k] === v);
  }
  const civil = (d.civil ?? '').replace(/[٠-٩]/g, (c) => c.charCodeAt(0) - 1632).replace(/\D/g, ''); // رقم مدني: رقم في كل مربع
  document.querySelectorAll('#civ b').forEach((b, i) => { b.textContent = civil[i] ?? ''; });
  document.getElementById('stamp').hidden = !d.s1 && !d.s2;
  const sheet = document.getElementById('sheet'), real = d.sc === 'real';
  sheet.classList.toggle('real', real); // حبر ختم حقيقي: لون مائل للبنفسجي مع أثر انتشار الحبر
  sheet.style.setProperty('--sc', real ? '#2a47b8' : d.sc || '');
  const n = (v, lo, hi, d0) => Math.min(hi, Math.max(lo, Math.round(Number(v)) || d0));
  sheet.style.setProperty('--fs', n(d.sz, 18, 26, 20) + 'px');
  sheet.style.setProperty('--fw', n(d.fw, 400, 800, 700));
}
