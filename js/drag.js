// خلية السحب: تحريك عنصر فوق الورقة بالإصبع أو الفأرة (بنسبة مئوية من الورقة فلا يتأثر بالتصغير)
export function drag(el, area) {
  const pct = (e) => { const r = area.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100]; };
  let start;
  el.addEventListener('pointerdown', (e) => {
    el.setPointerCapture(e.pointerId);
    start = { p: pct(e), x: (el.offsetLeft / area.offsetWidth) * 100, y: (el.offsetTop / area.offsetHeight) * 100 };
  });
  el.addEventListener('pointermove', (e) => {
    if (!start) return;
    const [x, y] = pct(e);
    el.style.left = Math.min(90, Math.max(0, start.x + x - start.p[0])) + '%';
    el.style.top = Math.min(95, Math.max(0, start.y + y - start.p[1])) + '%';
  });
  el.addEventListener('pointerup', () => { start = null; });
}
