'use strict';
// Saved places are explicit choices, never a history of device locations.
const FAVORITES_KEY='yasno-favorites-v1';
const FAVORITES_LABELS={
 en:['Favourite cities','Add to favourites','Remove from favourites','No saved cities yet. Find a city, then tap the star beside its name.','Saved on this device only. No account or sync.','Could not save. Check that device storage is available.','Current city','Find a city','Saved favourite cities, including names and coordinates. Remove them individually or clear app data.'],
 ru:['Избранные города','Добавить в избранное','Убрать из избранного','Здесь пока нет городов. Найдите город и нажмите звёздочку рядом с названием.','Только на этом устройстве. Без регистрации и синхронизации.','Не удалось сохранить. Проверьте доступность хранилища устройства.','Открытый город','Найти город','Избранные города, включая названия и координаты. Их можно удалить по отдельности или очистить данные приложения.'],
 es:['Ciudades favoritas','Añadir a favoritos','Quitar de favoritos','No hay ciudades guardadas. Busca una ciudad y pulsa la estrella junto a su nombre.','Solo en este dispositivo. Sin cuenta ni sincronización.','No se pudo guardar. Comprueba el almacenamiento del dispositivo.','Ciudad actual','Buscar ciudad','Ciudades favoritas, con nombres y coordenadas. Puedes eliminarlas individualmente o borrar los datos de la aplicación.'],
 pt:['Cidades favoritas','Adicionar aos favoritos','Remover dos favoritos','Nenhuma cidade salva. Busque uma cidade e toque na estrela ao lado do nome.','Apenas neste dispositivo. Sem conta ou sincronização.','Não foi possível salvar. Verifique o armazenamento do dispositivo.','Cidade atual','Buscar cidade','Cidades favoritas, com nomes e coordenadas. Remova individualmente ou limpe os dados do aplicativo.'],
 de:['Lieblingsstädte','Zu Favoriten hinzufügen','Aus Favoriten entfernen','Noch keine Städte gespeichert. Suche eine Stadt und tippe auf den Stern neben ihrem Namen.','Nur auf diesem Gerät. Ohne Konto oder Synchronisierung.','Speichern fehlgeschlagen. Gerätespeicher prüfen.','Aktuelle Stadt','Stadt suchen','Gespeicherte Lieblingsstädte mit Namen und Koordinaten. Einzeln entfernen oder App-Daten löschen.'],
 fr:['Villes favorites','Ajouter aux favoris','Retirer des favoris','Aucune ville enregistrée. Cherchez une ville et touchez l’étoile à côté de son nom.','Sur cet appareil uniquement. Sans compte ni synchronisation.','Enregistrement impossible. Vérifiez le stockage de l’appareil.','Ville actuelle','Chercher une ville','Villes favorites avec noms et coordonnées. Supprimez-les individuellement ou effacez les données de l’application.'],
 it:['Città preferite','Aggiungi ai preferiti','Rimuovi dai preferiti','Nessuna città salvata. Cerca una città e tocca la stella accanto al nome.','Solo su questo dispositivo. Senza account né sincronizzazione.','Salvataggio non riuscito. Controlla la memoria del dispositivo.','Città attuale','Cerca città','Città preferite, con nomi e coordinate. Rimuovile singolarmente o cancella i dati dell’app.'],
 ja:['お気に入りの都市','お気に入りに追加','お気に入りから削除','保存した都市はありません。都市を検索し、名前の横の星を押してください。','この端末のみに保存。アカウントや同期はありません。','保存できません。端末のストレージを確認してください。','表示中の都市','都市を検索','お気に入りの都市の名前と座標。個別に削除するか、アプリのデータを消去できます。'],
 ko:['즐겨찾는 도시','즐겨찾기에 추가','즐겨찾기에서 삭제','저장된 도시가 없습니다. 도시를 검색하고 이름 옆의 별을 누르세요.','이 기기에만 저장됩니다. 계정과 동기화는 없습니다.','저장할 수 없습니다. 기기 저장소를 확인하세요.','현재 도시','도시 검색','즐겨찾는 도시의 이름과 좌표. 개별 삭제하거나 앱 데이터를 지울 수 있습니다.'],
 hi:['पसंदीदा शहर','पसंदीदा में जोड़ें','पसंदीदा से हटाएँ','अभी कोई शहर सहेजा नहीं गया। शहर खोजें और नाम के पास तारे पर टैप करें।','केवल इस उपकरण पर। खाता या सिंक नहीं।','सहेज नहीं सके। उपकरण का संग्रहण जाँचें।','वर्तमान शहर','शहर खोजें','पसंदीदा शहरों के नाम और निर्देशांक। अलग-अलग हटाएँ या ऐप डेटा साफ़ करें।'],
 id:['Kota favorit','Tambahkan ke favorit','Hapus dari favorit','Belum ada kota tersimpan. Cari kota lalu ketuk bintang di samping namanya.','Hanya di perangkat ini. Tanpa akun atau sinkronisasi.','Tidak dapat menyimpan. Periksa penyimpanan perangkat.','Kota saat ini','Cari kota','Kota favorit beserta nama dan koordinat. Hapus satu per satu atau hapus data aplikasi.'],
 ar:['المدن المفضلة','إضافة إلى المفضلة','إزالة من المفضلة','لا توجد مدن محفوظة. ابحث عن مدينة واضغط النجمة بجانب اسمها.','على هذا الجهاز فقط. دون حساب أو مزامنة.','تعذر الحفظ. تحقق من مساحة تخزين الجهاز.','المدينة الحالية','البحث عن مدينة','المدن المفضلة بأسمائها وإحداثياتها. احذفها منفردة أو امسح بيانات التطبيق.'],
 tr:['Favori şehirler','Favorilere ekle','Favorilerden kaldır','Henüz kayıtlı şehir yok. Bir şehir arayın ve adının yanındaki yıldıza dokunun.','Yalnızca bu cihazda. Hesap veya eşitleme yok.','Kaydedilemedi. Cihaz depolamasını kontrol edin.','Açık şehir','Şehir ara','Adları ve koordinatlarıyla favori şehirler. Tek tek kaldırabilir veya uygulama verilerini temizleyebilirsiniz.']
};
function favoriteText(){return FAVORITES_LABELS[LANG]||FAVORITES_LABELS.en;}
function favoritePlace(p){
 if(!p||p.geo||!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||Math.abs(p.lat)>90||Math.abs(p.lon)>180) return null;
 const result={lat:p.lat,lon:p.lon};
 for(const k of ['name','nameEn','admin','adminEn','country','countryEn','cc','tz']) if(typeof p[k]==='string') result[k]=p[k].slice(0,240);
 if(!result.name&&!result.nameEn) return null;
 if(Number.isSafeInteger(p.omId)) result.omId=p.omId;
 return result;
}
function sameFavorite(a,b){
 if(!a||!b||a.geo||b.geo) return false;
 if(a.omId!=null&&b.omId!=null) return a.omId===b.omId;
 return Math.abs(a.lat-b.lat)<0.0001&&Math.abs(a.lon-b.lon)<0.0001;
}
function readFavorites(){
 try{
  const raw=JSON.parse(localStorage.getItem(FAVORITES_KEY));
  if(!Array.isArray(raw)) return [];
  const result=[];
  for(const item of raw){const p=favoritePlace(item);if(p&&!result.some(x=>sameFavorite(x,p))) result.push(p);}
  return result;
 }catch(e){return [];}
}
let favoriteCities=readFavorites();
function storeFavorites(next){
 try{localStorage.setItem(FAVORITES_KEY,JSON.stringify(next));favoriteCities=next;return true;}
 catch(e){toast(favoriteText()[5]);return false;}
}
function renderFavorites(){
 const labels=favoriteText(), box=document.getElementById('favoriteList'), star=document.getElementById('favoriteToggle');
 if(!box||!star) return;
 const current=favoritePlace(state.place), saved=current&&favoriteCities.some(p=>sameFavorite(p,current));
 star.hidden=!current;
 star.setAttribute('aria-pressed',String(!!saved));
 star.title=labels[saved?2:1];star.setAttribute('aria-label',star.title);
 star.querySelector('svg').style.fill=saved?'currentColor':'none';
 document.getElementById('favoritesLabel').textContent=labels[0];
 document.getElementById('favoritesCount').textContent=String(favoriteCities.length);
 document.getElementById('favoritesHint').textContent=labels[4];
 box.replaceChildren();
 if(!favoriteCities.length){
  const empty=document.createElement('p');empty.textContent=labels[3];box.append(empty);
  const find=document.createElement('button');find.type='button';find.textContent=labels[7];
  find.onclick=()=>{document.getElementById('q').scrollIntoView({block:'center',behavior:'smooth'});document.getElementById('q').focus();};box.append(find);
 }
 for(const p of favoriteCities){
  const row=document.createElement('div');row.className='favorite-row';
  const open=document.createElement('button');open.type='button';open.className='favorite-open';
  const active=sameFavorite(p,state.place);if(active) open.setAttribute('aria-current','true');
  const name=document.createElement('strong');name.textContent=(LANG==='en'?p.nameEn||p.name:p.name||p.nameEn);
  const sub=document.createElement('span');sub.textContent=(LANG==='en'?[p.adminEn||p.admin,p.countryEn||p.country]:[p.admin,p.country]).filter(Boolean).join(' · ');
  open.append(name,sub);if(active){const mark=document.createElement('small');mark.textContent=labels[6];open.append(mark);}
  open.onclick=()=>{
   const intent=++locationIntent;
   if(state.ctrl) state.ctrl.abort();
   hidePickBar();goBtn.disabled=false;goBtn.textContent=t('find');
   document.getElementById('favoritesPanel').open=false;
   loadWeather({...p},intent);
  };
  const remove=document.createElement('button');remove.type='button';remove.className='favorite-remove';remove.textContent='×';
  remove.title=labels[2];remove.setAttribute('aria-label',labels[2]+': '+name.textContent);
  remove.onclick=()=>{const next=favoriteCities.filter(x=>!sameFavorite(x,p));if(storeFavorites(next)){renderFavorites();document.getElementById('favoritesSummary').focus();}};
  row.append(open,remove);box.append(row);
 }
}
document.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('favoriteToggle').addEventListener('click',()=>{
  const p=favoritePlace(state.place);if(!p) return;
  const saved=favoriteCities.some(x=>sameFavorite(x,p));
  if(storeFavorites(saved?favoriteCities.filter(x=>!sameFavorite(x,p)):[...favoriteCities,p])) renderFavorites();
 });
 renderFavorites();
});
window.addEventListener('storage',e=>{if(e.key===FAVORITES_KEY||e.key===null){favoriteCities=readFavorites();renderFavorites();}});
