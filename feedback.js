'use strict';
// Templates contain no automatically collected location or device information.
const FEEDBACK_LABELS = {
 en: ['Leave a review on Google Play','Report a problem','What happened?','Steps to reproduce:','Expected result:','Phone model and Android/browser version:','If possible, attach a screenshot without personal information.','Send the email yourself. If your email app does not open, write to:'],
 ru: ['Оставить отзыв в Google Play','Сообщить о проблеме','Что произошло?','Как повторить проблему:','Что должно было произойти:','Модель телефона и версия Android/браузера:','По возможности приложите скриншот без личных данных.','Отправьте письмо сами. Если почтовое приложение не открылось, напишите на:'],
 es: ['Dejar una reseña en Google Play','Informar de un problema','¿Qué ocurrió?','Pasos para reproducirlo:','Resultado esperado:','Modelo del teléfono y versión de Android/navegador:','Si puedes, adjunta una captura sin datos personales.','Envía tú el correo. Si la aplicación no se abre, escribe a:'],
 pt: ['Avaliar no Google Play','Relatar um problema','O que aconteceu?','Passos para reproduzir:','Resultado esperado:','Modelo do celular e versão do Android/navegador:','Se possível, anexe uma captura sem dados pessoais.','Envie o e-mail. Se o aplicativo não abrir, escreva para:'],
 de: ['Bei Google Play bewerten','Problem melden','Was ist passiert?','Schritte zum Wiederholen:','Erwartetes Ergebnis:','Handymodell und Android-/Browserversion:','Wenn möglich, Screenshot ohne persönliche Daten anhängen.','Sende die E-Mail selbst. Falls die App nicht öffnet, schreibe an:'],
 fr: ['Laisser un avis sur Google Play','Signaler un problème','Que s’est-il passé ?','Étapes pour reproduire :','Résultat attendu :','Modèle du téléphone et version Android/navigateur :','Si possible, joignez une capture sans données personnelles.','Envoyez le message vous-même. Si la messagerie ne s’ouvre pas, écrivez à :'],
 it: ['Lascia una recensione su Google Play','Segnala un problema','Che cosa è successo?','Passaggi per riprodurre:','Risultato previsto:','Modello del telefono e versione Android/browser:','Se possibile, allega uno screenshot senza dati personali.','Invia tu il messaggio. Se l’app email non si apre, scrivi a:'],
 ja: ['Google Playでレビューを書く','問題を報告','何が起きましたか？','再現する手順：','期待した結果：','端末の機種とAndroid／ブラウザのバージョン：','可能であれば個人情報を含まないスクリーンショットを添付してください。','メールはご自身で送信してください。アプリが開かない場合の宛先：'],
 ko: ['Google Play에 리뷰 남기기','문제 신고','어떤 일이 발생했나요?','재현 방법:','예상한 결과:','휴대전화 모델 및 Android/브라우저 버전:','가능하면 개인정보가 없는 스크린샷을 첨부해 주세요.','직접 이메일을 보내 주세요. 앱이 열리지 않으면 다음 주소로 보내세요:'],
 hi: ['Google Play पर समीक्षा लिखें','समस्या बताएँ','क्या हुआ?','समस्या दोहराने के चरण:','अपेक्षित परिणाम:','फ़ोन मॉडल और Android/ब्राउज़र संस्करण:','हो सके तो निजी जानकारी के बिना स्क्रीनशॉट संलग्न करें।','ईमेल स्वयं भेजें। ऐप न खुले तो इस पते पर लिखें:'],
 id: ['Beri ulasan di Google Play','Laporkan masalah','Apa yang terjadi?','Langkah untuk mengulangi:','Hasil yang diharapkan:','Model ponsel dan versi Android/browser:','Jika memungkinkan, lampirkan tangkapan layar tanpa data pribadi.','Kirim sendiri emailnya. Jika aplikasi tidak terbuka, tulis ke:'],
 ar: ['كتابة مراجعة على Google Play','الإبلاغ عن مشكلة','ماذا حدث؟','خطوات تكرار المشكلة:','النتيجة المتوقعة:','طراز الهاتف وإصدار Android/المتصفح:','إن أمكن، أرفق لقطة شاشة دون معلومات شخصية.','أرسل البريد بنفسك. إن لم يفتح التطبيق، اكتب إلى:'],
 tr: ['Google Play’de yorum yap','Sorun bildir','Ne oldu?','Tekrarlama adımları:','Beklenen sonuç:','Telefon modeli ve Android/tarayıcı sürümü:','Mümkünse kişisel bilgi içermeyen bir ekran görüntüsü ekleyin.','E-postayı kendiniz gönderin. Uygulama açılmazsa şu adrese yazın:']
};
function refreshFeedbackLinks() {
 const labels = FEEDBACK_LABELS[LANG] || FEEDBACK_LABELS.en;
 document.getElementById('reviewLink').textContent = labels[0];
 const report = document.getElementById('reportLink');
 report.textContent = labels[1];
 const body = [labels[2], '', labels[3], '', labels[4], '', labels[5], '', labels[6], '', 'YASNO: ' + APP_VERSION].join('\r\n');
 report.href = 'mailto:yasno.weather@proton.me?subject=' + encodeURIComponent('YASNO — ' + labels[1]) + '&body=' + encodeURIComponent(body);
 document.getElementById('feedbackEmail').textContent = labels[7] + ' yasno.weather@proton.me';
}
