// خلية الربط: توصيل الخلايا ببعضها فقط
import { build } from './grid.js';
import * as store from './store.js';
import * as form from './form.js';
import * as sheet from './sheet.js';
import * as share from './share.js';
import { drag } from './drag.js';
import { install } from './install.js';
import './fit.js';

const FIXED = ['name', 'civil', 'dept', 's1', 's2', 'sc']; // بيانات ثابتة تُحفظ على الجهاز
const $ = (id) => document.getElementById(id);
const today = () => new Date().toLocaleDateString('en-GB'); // يوم/شهر/سنة
const dayOf = (date) => {
  const [d, m, y] = date.split(/\s*\/\s*/);
  const t = new Date(y, m - 1, d);
  return isNaN(t) ? '' : t.toLocaleDateString('ar-KW', { weekday: 'long' });
};
const syncDay = () => { $('day').value = dayOf(form.read().date); };

// صفحتان: #edit لإدخال البيانات، و#view (الورقة) للطباعة والإرسال
const route = () => {
  const view = location.hash === '#view';
  if (view) { const d = form.read(); sheet.render({ ...d, day: dayOf(d.date), date: d.date.split(/\s*\/\s*/).join(' / ') }); }
  $('edit').hidden = view;
  $('view').hidden = !view;
  scrollTo(0, 0);
};

build();
drag($('stamp'), $('sheet'));
form.write({ ...store.load(), date: today() });
syncDay();
route();
addEventListener('hashchange', route);

document.addEventListener('input', ({ target: { dataset: { k }, value } }) => {
  if (k === 'date') syncDay();
  if (FIXED.includes(k)) store.save({ [k]: value });
});

const act = {
  preview: () => { location.hash = '#view'; },
  back: () => { location.hash = ''; },
  new: () => confirm('بدء نموذج جديد؟') && (form.reset(FIXED), form.write({ date: today() }), syncDay()),
  print: () => window.print(),
  pdf: share.sharePdf,
  img: share.shareImage,
  install,
};
document.addEventListener('click', (e) =>
  Promise.resolve(act[e.target.dataset.act]?.()).catch(() => alert('تعذّر تنفيذ العملية')));

navigator.serviceWorker?.register('sw.js');
if (navigator.serviceWorker?.controller) navigator.serviceWorker.addEventListener('controllerchange', () => location.reload()); // تحديث تلقائي
