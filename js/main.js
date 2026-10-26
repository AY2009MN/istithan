// خلية الربط: توصيل الخلايا ببعضها فقط
import { build } from './grid.js';
import * as store from './store.js';
import * as form from './form.js';
import * as sheet from './sheet.js';
import * as share from './share.js';
import { drag, rotate } from './drag.js';
import { install } from './install.js';
import './fit.js';

const FIXED = ['name', 'civil', 's1', 's2', 'sc', 'sz', 'fw', 'showReason', 'showKind']; // بيانات ثابتة تُحفظ على الجهاز (ومنها تفعيل الحقول الاختيارية)
const $ = (id) => document.getElementById(id);
const today = () => new Date().toLocaleDateString('en-GB'); // يوم/شهر/سنة
const dayOf = (date) => {
  const [d, m, y] = date.split(/\s*\/\s*/);
  const t = new Date(y, m - 1, d);
  return isNaN(t) ? '' : t.toLocaleDateString('ar-KW', { weekday: 'long' });
};
const syncDay = () => { $('day').value = dayOf(form.read().date); };
const syncOpt = () => { const d = form.read(); document.querySelectorAll('[data-opt]').forEach((o) => { o.hidden = !d[o.dataset.opt]; }); };
const syncOut = () => { const d = form.read(); document.querySelectorAll('[data-o]').forEach((o) => { o.value = d[o.dataset.o]; }); };

// صفحتان: #edit لإدخال البيانات، و#view (الورقة) للطباعة والإرسال
const route = () => {
  const view = location.hash === '#view';
  if (view) { const d = form.read(); sheet.render({ ...d, day: dayOf(d.date), date: d.date.split(/\s*\/\s*/).join(' / ') }); }
  $('edit').hidden = view;
  $('view').hidden = !view;
  scrollTo(0, 0);
};

build();
const saved = store.load();
const num = (v, lo, hi, d) => { const n = Number(v); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d; };
const stamp = $('stamp'); // موضع الختم وزاويته يُحفظان على الجهاز
if (saved.sx != null) { stamp.style.left = num(saved.sx, 0, 90, 36) + '%'; stamp.style.top = num(saved.sy, 0, 95, 68) + '%'; }
stamp.style.setProperty('--rot', num(saved.sr, -180, 180, -12) + 'deg');
drag(stamp, $('sheet'), (sx, sy) => store.save({ sx, sy }));
rotate($('rot'), stamp, (sr) => store.save({ sr }));
form.write({ ...saved, date: today() });
syncDay();
syncOut();
syncOpt();
route();
addEventListener('hashchange', route);

document.addEventListener('input', ({ target: { dataset: { k }, value, type, checked } }) => {
  if (type === 'checkbox') { value = checked ? '1' : ''; syncOpt(); }
  if (k === 'date') syncDay();
  if (k === 'sz' || k === 'fw') syncOut();
  if (FIXED.includes(k)) store.save({ [k]: value });
});

const act = {
  preview: () => { location.hash = '#view'; },
  back: () => { location.hash = ''; },
  new: () => confirm('بدء نموذج جديد؟') && (form.reset(FIXED), form.write({ date: today() }), syncDay(), syncOpt()),
  print: () => window.print(),
  pdf: share.sharePdf,
  img: share.shareImage,
  install,
};
document.addEventListener('click', (e) =>
  Promise.resolve(act[e.target.dataset.act]?.()).catch(() => alert('تعذّر تنفيذ العملية')));

navigator.serviceWorker?.register('sw.js');
if (navigator.serviceWorker?.controller) navigator.serviceWorker.addEventListener('controllerchange', () => location.reload()); // تحديث تلقائي
