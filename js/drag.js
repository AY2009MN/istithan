// خلية السحب والتدوير: تحريك عنصر فوق الورقة بالإصبع أو الفأرة (بنسبة مئوية من الورقة فلا يتأثر بالتصغير)
export function drag(el, area, onEnd) {
  const pct = (e) => { const r = area.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100]; };
  let start, moved;
  el.addEventListener('pointerdown', (e) => {
    el.setPointerCapture(e.pointerId);
    moved = false;
    start = { p: pct(e), x: (el.offsetLeft / area.offsetWidth) * 100, y: (el.offsetTop / area.offsetHeight) * 100 };
  });
  el.addEventListener('pointermove', (e) => {
    if (!start) return;
    const [x, y] = pct(e);
    moved = true;
    el.style.left = Math.min(90, Math.max(0, start.x + x - start.p[0])) + '%';
    el.style.top = Math.min(95, Math.max(0, start.y + y - start.p[1])) + '%';
  });
  el.addEventListener('pointerup', () => { if (start && moved) onEnd?.(parseFloat(el.style.left), parseFloat(el.style.top)); start = null; });
}

// تدوير العنصر حول مركزه بسحب المقبض (يقع أعلى منتصفه)
export function rotate(handle, el, onEnd) {
  let on = false, deg;
  handle.addEventListener('pointerdown', (e) => { e.stopPropagation(); handle.setPointerCapture(e.pointerId); on = true; });
  handle.addEventListener('pointermove', (e) => {
    if (!on) return;
    const r = el.getBoundingClientRect();
    deg = Math.round((Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI + 90);
    if (deg > 180) deg -= 360;
    el.style.setProperty('--rot', deg + 'deg');
  });
  handle.addEventListener('pointerup', () => { if (on && deg != null) onEnd?.(deg); on = false; });
}
