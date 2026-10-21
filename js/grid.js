// خلية الجداول: تبني جدول الحصص وجدول التوقيعات بـ DOM آمن (بلا innerHTML)
const PERIODS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة'];

const el = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e; };
const field = (k, type = 'text') => { const i = el('input', { type, maxLength: 40 }); i.dataset.k = k; return i; };
const row = (cells, tag = 'td', first = tag) =>
  el('tr', {}, ...cells.map((c, i) => el(i ? tag : first, {}, c)));

export function build() {
  const n = PERIODS.map((_, i) => i + 1);
  document.getElementById('t-periods').append(
    row(['الحصة', ...PERIODS], 'th'),
    row(['الفصل', ...n.map((i) => field('cls' + i))], 'td', 'th'),
    row(['اسم المعلم البديل', ...n.map((i) => field('sub' + i))], 'td', 'th'),
  );
  document.getElementById('t-sign').append(
    row(['ساعة الخروج', 'ساعة العودة', 'توقيع المعلم', 'رئيس القسم', 'مدير المدرسة'], 'th'),
    Object.assign(row([field('out', 'time'), field('back', 'time'), '', el('img', { id: 'stamp', alt: '' }), '']), { className: 'tall' }),
  );
}
