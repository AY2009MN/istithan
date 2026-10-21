// خلية المشاركة: تصوير الورقة ثم مشاركة (Web Share) أو تنزيل احتياطي
import { jpegToPdf } from './pdf.js';

const toBlob = (c, type, q) => new Promise((ok) => c.toBlob(ok, type, q));
const stamp = () => new Date().toLocaleDateString('en-CA');

const shoot = () => window.html2canvas(document.getElementById('sheet'), { scale: 2, backgroundColor: '#fff' });

async function deliver(blob, name) {
  const file = new File([blob], name, { type: blob.type });
  try {
    if (navigator.canShare?.({ files: [file] })) return await navigator.share({ files: [file], title: 'نموذج استئذان' });
  } catch (e) { if (e.name === 'AbortError') return; }
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

export async function sharePdf() {
  const c = await shoot();
  const jpeg = new Uint8Array(await (await toBlob(c, 'image/jpeg', 0.92)).arrayBuffer());
  return deliver(jpegToPdf(jpeg, c.width, c.height), `istithan-${stamp()}.pdf`);
}

export async function shareImage() {
  return deliver(await toBlob(await shoot(), 'image/png'), `istithan-${stamp()}.png`);
}
