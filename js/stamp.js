// خلية الختم: رفع صورة (PNG/JPG فقط، أقل من 500KB) مع تحقق صارم
const OK = /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/;
const MAX = 500 * 1024;

export function init(img, input, saved, onChange) {
  const set = (src) => { src ? (img.src = src) : img.removeAttribute('src'); onChange(src); };
  if (OK.test(saved || '')) img.src = saved;
  img.onerror = () => set('');

  input.addEventListener('change', () => {
    const f = input.files[0];
    input.value = '';
    if (!f) return;
    if (!/^image\/(png|jpeg)$/.test(f.type) || f.size > MAX) return alert('الختم: صورة PNG أو JPG بحجم أقل من 500 كيلوبايت');
    const r = new FileReader();
    r.onload = () => OK.test(r.result) && set(r.result);
    r.readAsDataURL(f);
  });
  img.addEventListener('click', () => confirm('إزالة الختم؟') && set(''));
}
