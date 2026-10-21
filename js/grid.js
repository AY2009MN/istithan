// خلية الجداول: تبني جدول الحصص (فارغ للكتابة اليدوية) وجدول التوقيعات والختم بـ DOM آمن (بلا innerHTML)
const PERIODS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة'];

const el = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e; };
const val = (k) => { const s = el('span', { className: 'f' }); s.dataset.v = k; return s; };
const row = (cells, tag = 'td', first = tag) =>
  el('tr', {}, ...cells.map((c, i) => el(i ? tag : first, {}, c)));

export function build() {
  const blank = PERIODS.map(() => '');
  document.getElementById('t-periods').append(
    row(['الحصة', ...PERIODS], 'th'),
    row(['الفصل', ...blank], 'td', 'th'),
    row(['اسم المعلم البديل', ...blank], 'td', 'th'),
  );
  document.getElementById('t-sign').append(
    row(['ساعة الخروج', 'ساعة العودة', 'توقيع المعلم', 'توقيع رئيس القسم'], 'th'),
    Object.assign(row([val('out'), val('back'), '', '']), { className: 'tall' }),
  );
}
