'use strict';
// Only the web release is inserted automatically; no device or location data is collected.
const FEEDBACK_LABELS = {
 en: ['Leave a review on Google Play','Report a problem','What went wrong:','What did you do just before it happened:','What did you expect instead (optional):','Phone model (optional):','You can attach a screenshot without personal information.','This only opens an email draft. Nothing is sent automatically. If it does not open, write to:'],
 ru: ['Оставить отзыв в Google Play','Сообщить о проблеме','Что не работает или выглядит неправильно:','Что вы нажали или сделали перед этим:','Как должно быть, по вашему мнению (необязательно):','Модель телефона (необязательно):','Можно приложить скриншот без личных данных.','Кнопка только открывает черновик письма — ничего не отправляется автоматически. Если почта не открылась, напишите на:'],
 es: ['Dejar una reseña en Google Play','Informar de un problema','Qué no funciona:','Qué hiciste justo antes:','Qué esperabas (opcional):','Modelo del teléfono (opcional):','Puedes adjuntar una captura sin datos personales.','Solo se abre un borrador. No se envía nada automáticamente. Si no se abre, escribe a:'],
 pt: ['Avaliar no Google Play','Relatar um problema','O que não funciona:','O que você fez antes disso:','O que você esperava (opcional):','Modelo do celular (opcional):','Você pode anexar uma captura sem dados pessoais.','O botão só abre um rascunho. Nada é enviado automaticamente. Se não abrir, escreva para:'],
 de: ['Bei Google Play bewerten','Problem melden','Was funktioniert nicht:','Was hast du direkt davor gemacht:','Was hast du erwartet (optional):','Handymodell (optional):','Du kannst einen Screenshot ohne persönliche Daten anhängen.','Es wird nur ein E-Mail-Entwurf geöffnet. Nichts wird automatisch gesendet. Falls er nicht öffnet, schreibe an:'],
 fr: ['Laisser un avis sur Google Play','Signaler un problème','Ce qui ne fonctionne pas :','Ce que vous avez fait juste avant :','Ce que vous attendiez (facultatif) :','Modèle du téléphone (facultatif) :','Vous pouvez joindre une capture sans données personnelles.','Ce bouton ouvre seulement un brouillon. Rien n’est envoyé automatiquement. Sinon, écrivez à :'],
 it: ['Lascia una recensione su Google Play','Segnala un problema','Cosa non funziona:','Cosa hai fatto subito prima:','Cosa ti aspettavi (facoltativo):','Modello del telefono (facoltativo):','Puoi allegare uno screenshot senza dati personali.','Il pulsante apre solo una bozza. Nulla viene inviato automaticamente. Se non si apre, scrivi a:'],
 ja: ['Google Playでレビューを書く','問題を報告','不具合の内容：','直前に行った操作：','期待していた動作（任意）：','端末の機種（任意）：','個人情報を含まないスクリーンショットを添付できます。','メールの下書きだけを開きます。自動送信はしません。開かない場合の宛先：'],
 ko: ['Google Play에 리뷰 남기기','문제 신고','잘못된 점:','문제가 생기기 직전에 한 일:','기대한 동작 (선택):','휴대전화 모델 (선택):','개인정보가 없는 스크린샷을 첨부할 수 있습니다.','이 버튼은 이메일 초안만 엽니다. 자동으로 전송되지 않습니다. 열리지 않으면 다음 주소로 보내세요:'],
 hi: ['Google Play पर समीक्षा लिखें','समस्या बताएँ','क्या ठीक से काम नहीं कर रहा है:','इसके ठीक पहले आपने क्या किया:','आपको क्या होना चाहिए था (वैकल्पिक):','फ़ोन का मॉडल (वैकल्पिक):','आप निजी जानकारी के बिना स्क्रीनशॉट जोड़ सकते हैं।','यह बटन केवल ईमेल का मसौदा खोलता है। कुछ भी अपने आप नहीं भेजा जाता। न खुले तो इस पते पर लिखें:'],
 id: ['Beri ulasan di Google Play','Laporkan masalah','Apa yang tidak berfungsi:','Apa yang Anda lakukan sebelumnya:','Apa yang Anda harapkan (opsional):','Model ponsel (opsional):','Anda dapat melampirkan tangkapan layar tanpa data pribadi.','Tombol ini hanya membuka draf email. Tidak ada pengiriman otomatis. Jika tidak terbuka, tulis ke:'],
 ar: ['كتابة مراجعة على Google Play','الإبلاغ عن مشكلة','ما الذي لا يعمل بشكل صحيح:','ما الذي فعلته قبل حدوث المشكلة:','ما الذي توقعت حدوثه (اختياري):','طراز الهاتف (اختياري):','يمكنك إرفاق لقطة شاشة دون معلومات شخصية.','يفتح الزر مسودة بريد فقط. لا يُرسل شيء تلقائيًا. إذا لم تفتح، اكتب إلى:'],
 tr: ['Google Play’de yorum yap','Sorun bildir','Düzgün çalışmayan şey:','Hemen öncesinde ne yaptınız:','Ne olmasını bekliyordunuz (isteğe bağlı):','Telefon modeli (isteğe bağlı):','Kişisel bilgi içermeyen bir ekran görüntüsü ekleyebilirsiniz.','Bu düğme yalnızca e-posta taslağını açar. Otomatik gönderim yapılmaz. Açılmazsa şu adrese yazın:']
};
// Android package version is not available to this web app. Never substitute APP_VERSION for it.
const FEEDBACK_HELP = {
 en: ['Describe the problem below in your own words. You can delete any questions you do not need. Review the email before sending.','YASNO website version (filled in automatically):','Google Play app version (optional; leave blank if unknown):'],
 ru: ['Опишите проблему своими словами ниже. Ненужные вопросы можно удалить. Перед отправкой проверьте письмо.','Версия сайта YASNO (заполнено автоматически):','Версия приложения из Google Play (необязательно; если не знаете, оставьте пустым):'],
 es: ['Describe el problema con tus palabras. Puedes borrar las preguntas que no necesites. Revisa el correo antes de enviarlo.','Versión web de YASNO (automática):','Versión de la app de Google Play (opcional; déjala en blanco si no la sabes):'],
 pt: ['Descreva o problema com suas palavras. Apague perguntas desnecessárias. Revise o e-mail antes de enviar.','Versão do site YASNO (automática):','Versão do app do Google Play (opcional; deixe em branco se não souber):'],
 de: ['Beschreibe das Problem mit eigenen Worten. Unnötige Fragen kannst du löschen. Prüfe die E-Mail vor dem Senden.','YASNO-Webversion (automatisch):','App-Version aus Google Play (optional; leer lassen, falls unbekannt):'],
 fr: ['Décrivez le problème avec vos mots. Supprimez les questions inutiles. Relisez le message avant de l’envoyer.','Version du site YASNO (automatique) :','Version de l’application Google Play (facultatif ; laissez vide si inconnue) :'],
 it: ['Descrivi il problema con parole tue. Elimina le domande inutili. Controlla il messaggio prima di inviarlo.','Versione del sito YASNO (automatica):','Versione dell’app Google Play (facoltativa; lascia vuoto se non la conosci):'],
 ja: ['問題を自由に記入してください。不要な質問は削除できます。送信前に内容を確認してください。','YASNOウェブ版（自動入力）：','Google Playアプリのバージョン（任意・不明なら空欄）：'],
 ko: ['문제를 자유롭게 설명해 주세요. 필요 없는 질문은 지워도 됩니다. 보내기 전에 내용을 확인해 주세요.','YASNO 웹 버전 (자동 입력):','Google Play 앱 버전 (선택; 모르면 비워 두세요):'],
 hi: ['समस्या अपने शब्दों में लिखें। गैरज़रूरी सवाल हटा सकते हैं। भेजने से पहले ईमेल जाँच लें।','YASNO वेबसाइट संस्करण (अपने आप भरा गया):','Google Play ऐप संस्करण (वैकल्पिक; पता न हो तो खाली छोड़ें):'],
 id: ['Jelaskan masalah dengan kata-kata Anda sendiri. Hapus pertanyaan yang tidak perlu. Periksa email sebelum mengirim.','Versi situs YASNO (otomatis):','Versi aplikasi Google Play (opsional; kosongkan jika tidak tahu):'],
 ar: ['صف المشكلة بكلماتك. يمكنك حذف الأسئلة غير الضرورية. راجع البريد قبل إرساله.','إصدار موقع YASNO (تلقائي):','إصدار تطبيق Google Play (اختياري؛ اتركه فارغًا إن لم تعرفه):'],
 tr: ['Sorunu kendi sözlerinizle anlatın. Gereksiz soruları silebilirsiniz. Göndermeden önce e-postayı kontrol edin.','YASNO web sitesi sürümü (otomatik):','Google Play uygulama sürümü (isteğe bağlı; bilmiyorsanız boş bırakın):']
};
function refreshFeedbackLinks() {
 const labels = FEEDBACK_LABELS[LANG] || FEEDBACK_LABELS.en;
 const help = FEEDBACK_HELP[LANG] || FEEDBACK_HELP.en;
 document.getElementById('reviewLink').textContent = labels[0];
 const report = document.getElementById('reportLink');
 report.textContent = labels[1];
 // Blank lines after each prompt are intentionally editable answer spaces.
 const body = [help[0], '', labels[2], '', '', labels[3], '', '', labels[4], '', '', labels[5], '', '', help[2], '', '', help[1] + ' ' + APP_VERSION, '', labels[6]].join('\r\n');
 report.href = 'mailto:yasno.weather@proton.me?subject=' + encodeURIComponent('YASNO: ' + labels[1]) + '&body=' + encodeURIComponent(body);
 document.getElementById('feedbackEmail').textContent = labels[7] + ' yasno.weather@proton.me';
}
