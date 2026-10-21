// خلية التخزين: localStorage فقط، على جهاز المستخدم
const KEY = 'istithan:v1';
export const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};
export const save = (patch) => {
  try { localStorage.setItem(KEY, JSON.stringify({ ...load(), ...patch })); } catch { /* ممتلئ/محجوب */ }
};
