// خلية الجداول: تبني جدول الحصص (إدخال وعرض) ومربعات الرقم المدني بـ DOM آمن (بلا innerHTML)
const PERIODS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة'];

const el = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e; };
const field = (k, placeholder) => { const i = el('input', { maxLength: 40, placeholder }); i.dataset.k = k; return i; };
const val = (k) => { const s = el('span', { className: 'f' }); s.dataset.v = k; return s; };
const row = (cells, tag = 'td', first = tag) =>
  el('tr', {}, ...cells.map((c, i) => el(i ? tag : first, {}, c)));

export function build() {
  const n = PERIODS.map((_, i) => i + 1);
  document.getElementById('e-periods').append(
    ...PERIODS.map((p, i) => el('div', { className: 'per' }, el('b', {}, p), field('cls' + (i + 1), 'الفصل'), field('sub' + (i + 1), 'المعلم البديل'))));
  document.getElementById('t-periods').append(
    row(['الحصة', ...PERIODS], 'th'),
    row(['الفصل', ...n.map((i) => val('cls' + i))], 'td', 'th'),
    row(['اسم المعلم البديل', ...n.map((i) => val('sub' + i))], 'td', 'th'),
  );
  document.getElementById('civ').append(...Array.from({ length: 12 }, () => el('b')));
}
