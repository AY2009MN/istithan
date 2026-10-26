// خلية PDF: كاتب مصغّر بلا مكتبات — صفحة A4 واحدة فيها صورة JPEG
const enc = new TextEncoder();
const W = 841.89, H = 595.28; // A4 أفقي

export function jpegToPdf(jpeg, w, h) {
  const ih = (W * h) / w, content = `q ${W} 0 0 ${ih.toFixed(2)} 0 ${(H - ih).toFixed(2)} cm /Im0 Do Q`;
  const parts = [], off = [];
  let len = 0;
  const add = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); len += b.length; };
  const obj = (n, dict, stream) => {
    off[n] = len;
    add(`${n} 0 obj\n${dict}\n`);
    if (stream) { add('stream\n'); add(stream); add('\nendstream\n'); }
    add('endobj\n');
  };

  add('%PDF-1.4\n');
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`);
  obj(4, `<< /Length ${content.length} >>`, content);
  obj(5, `<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`, jpeg);

  const xref = len;
  add('xref\n0 6\n0000000000 65535 f \n' + [1, 2, 3, 4, 5].map((n) => `${String(off[n]).padStart(10, '0')} 00000 n \n`).join(''));
  add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts, { type: 'application/pdf' });
}
