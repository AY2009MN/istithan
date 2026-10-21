// خلية التثبيت: زر يثبّت التطبيق إن دعمه المتصفح، وإلا يشرح الطريقة
let ev;
const btn = document.querySelector('[data-act=install]');
if (matchMedia('(display-mode: standalone)').matches) btn.hidden = true;
addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); ev = e; });
addEventListener('appinstalled', () => { btn.hidden = true; });

export async function install() {
  if (!ev) return alert('من قائمة المتصفح اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».\nإن فتحت الرابط من داخل تطبيق آخر فافتحه في Chrome أو Safari.');
  await ev.prompt();
  ev = null;
}
