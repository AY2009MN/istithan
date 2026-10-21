// خلية الربط: توصيل الخلايا ببعضها فقط
import { build } from './grid.js';
import * as store from './store.js';
import * as form from './form.js';
import * as stamp from './stamp.js';
import * as share from './share.js';
import './fit.js';

const FIXED = ['name', 'civil', 'dept']; // بيانات ثابتة تُحفظ على الجهاز
const today = () => new Date().toLocaleDateString('en-CA');
const syncDay = () => {
  const d = new Date(form.read().date + 'T00:00');
  form.write({ day: isNaN(d) ? '' : d.toLocaleDateString('ar-KW', { weekday: 'long' }) });
};

build();
const saved = store.load();
form.write({ ...saved, date: today() });
syncDay();
stamp.init(document.getElementById('stamp'), document.getElementById('stamp-file'), saved.stamp, (s) => store.save({ stamp: s }));

document.addEventListener('input', ({ target: { dataset: { k }, value } }) => {
  if (k === 'date') syncDay();
  if (FIXED.includes(k)) store.save({ [k]: value });
});

const act = {
  new: () => confirm('بدء نموذج جديد؟') && (form.reset(FIXED), form.write({ date: today() }), syncDay()),
  print: () => window.print(),
  pdf: share.sharePdf,
  img: share.shareImage,
};
document.querySelector('.bar').addEventListener('click', (e) =>
  Promise.resolve(act[e.target.dataset.act]?.()).catch(() => alert('تعذّر تنفيذ العملية')));

navigator.serviceWorker?.register('sw.js');
