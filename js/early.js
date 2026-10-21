// يلتقط حدث التثبيت مبكراً (قبل تحميل بقية الخلايا) كي لا يفوتنا
addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); window.installEvent = e; });
