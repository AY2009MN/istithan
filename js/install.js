// خلية التثبيت: زر يثبّت التطبيق مباشرة (WebAPK) إن سمح المتصفح، وإلا يشرح السبب
const btn = document.querySelector('[data-act=install]');
if (matchMedia('(display-mode: standalone)').matches) btn.hidden = true;
addEventListener('appinstalled', () => { btn.hidden = true; });

export async function install() {
  const ev = window.installEvent;
  if (!ev) return alert('المتصفح لم يسمح بنافذة التثبيت الآن.\nالتطبيق قد يكون مثبّتاً مسبقاً: ابحث عنه باسم «استئذان» في قائمة تطبيقاتك.\nأو افتح الرابط في Chrome وأعد المحاولة بعد لحظات.');
  window.installEvent = null;
  await ev.prompt();
}
