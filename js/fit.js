// خلية الملاءمة: تصغّر الورقة لعرض الشاشة (للعرض فقط؛ لا تمسّ الطباعة ولا التصوير)
const W = 794; // عرض A4 بالبكسل
const sheet = new CSSStyleSheet();
document.adoptedStyleSheets = [sheet];
const fit = () => sheet.replaceSync(`@media screen{#sheet{zoom:${Math.min(1, (innerWidth - 8) / W)}}}`);
addEventListener('resize', fit);
fit();
