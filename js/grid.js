// خلية الجداول: تبني جدول الحصص (فارغ للكتابة اليدوية) وجدول التوقيعات والختم بـ DOM آمن (بلا innerHTML)
const PERIODS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة'];

const el = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e; };
const field = (k, type = 'text', placeholder = '') => { const i = el('input', { type, maxLength: 40, placeholder }); i.dataset.k = k; return i; };
const row = (cells, tag = 'td', first = tag) =>
  el('tr', {}, ...cells.map((c, i) => el(i ? tag : first, {}, c)));

export function build() {
  const n = PERIODS.map((_, i) => i + 1);
  document.getElementById('t-periods').append(
    row(['الحصة', ...PERIODS], 'th'),
    row(['الفصل', ...n.map(() => '')], 'td', 'th'), // تُكتب يدوياً
    row(['اسم المعلم البديل', ...n.map(() => '')], 'td', 'th'),
  );
  document.getElementById('t-sign').append(
    row(['ساعة الخروج', 'ساعة العودة', 'توقيع المعلم', 'توقيع رئيس القسم'], 'th'),
    Object.assign(row([field('out', 'time'), field('back', 'time'), '', el('div', { className: 'stamp' }, field('s1', 'text', 'اسم صاحب الختم'), field('s2', 'text', 'القسم'))]), { className: 'tall' }),
  );
}
