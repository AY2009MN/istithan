// خلية الختم: تحويل صورة الختم (حتى صورة كاميرا) إلى PNG شفاف مقصوص وصغير، بتحقق صارم
const OK = /^data:image\/png;base64,[A-Za-z0-9+/=]+$/;
const MAX_IN = 15 * 1024 * 1024, MAX_OUT = 500 * 1024, SIDE = 480;

// يُبقي الحبر الأزرق فقط (يحذف الورق والطاولة واليد) ثم يقصّ الهوامش
async function clean(file) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, SIDE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * k), h = Math.round(bmp.height * k);
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(bmp, 0, 0, w, h);
  const img = g.getImageData(0, 0, w, h), d = img.data;
  let x0 = w, y0 = h, x1 = 0, y1 = 0;
  for (let i = 0; i < d.length; i += 4) {
    d[i + 3] = Math.max(0, Math.min(255, (d[i + 2] - d[i] - 25) * 4));
    if (d[i + 3] > 60) {
      const p = i / 4, x = p % w, y = (p / w) | 0;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
  if (x1 <= x0) throw new Error('no ink');
  g.putImageData(img, 0, 0);
  const o = Object.assign(document.createElement('canvas'), { width: x1 - x0 + 1, height: y1 - y0 + 1 });
  o.getContext('2d').drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
  return o.toDataURL('image/png');
}

export function init(img, input, saved, onChange) {
  const set = (src) => { src ? (img.src = src) : img.removeAttribute('src'); onChange(src); };
  if (OK.test(saved || '')) img.src = saved;
  img.onerror = () => set('');

  input.addEventListener('change', async () => {
    const f = input.files[0];
    input.value = '';
    if (!f) return;
    try {
      if (!/^image\/(png|jpeg)$/.test(f.type) || f.size > MAX_IN) throw 0;
      const url = await clean(f);
      if (!OK.test(url) || url.length > MAX_OUT) throw 0;
      set(url);
    } catch { alert('الختم: صورة PNG أو JPG واضحة (حتى 15 ميغابايت)'); }
  });
  img.addEventListener('click', () => confirm('إزالة الختم؟') && set(''));
}
