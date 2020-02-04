export const content = `
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>
      İNİNAL ÖDEME HİZMETLERİ VE ELEKTRONİK PARA A.Ş.’NİN KULLANICI ÇERÇEVE
      SÖZLEŞMESİ
    </title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
      }
      page {
        padding: 1cm;
        display: block;
        margin: 15px auto;
        position: relative;
        box-shadow: 1px 1px 3px 1px #333;
      }
      page[size="A4"] {
        width: 21cm;
        height: 29.7cm;
      }
      .border {
        border: 1px solid black;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAABECAIAAADhiyvWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4M0M2QzE1NDQ2ODgxMUVBQTVCNzlDOTI0QTc0Q0U1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4M0M2QzE1NTQ2ODgxMUVBQTVCNzlDOTI0QTc0Q0U1OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgzQzZDMTUyNDY4ODExRUFBNUI3OUM5MjRBNzRDRTU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzQzZDMTUzNDY4ODExRUFBNUI3OUM5MjRBNzRDRTU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ap1jgAAAInhJREFUeNrsnVmTXEe1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");
        background-position: right top;
        background-repeat: no-repeat;
        background-size: 100px;
        padding: 1.5cm;
        position: absolute;
        left: 1cm;
        right: 1cm;
        bottom: 1cm;
        top: 1cm;
      }
      .page_header {
        display: block;
        text-align: center;
        margin: 0px auto;
        width: 85%;
        line-height: 1.5em;
        font-size: 18px;
      }
      .page_number {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -42px;
      }
      .header {
        font-weight: bold;
        margin: 20px 0;
      }
      p {
        text-align: justify;
        line-height: 1.3em;
        margin: 20px 0;
      }
      ul li {
        margin-bottom: 20px;
      }
    </style>
    <style media="print">
      @page {
        size: auto;
        margin: 0mm;
      }
      page {
        box-shadow: none;
        page-break-after: always;
      }
    </style>
  </head>
  <body>
    <page size="A4">
      <div class="border">
        <div class="page_header">
          İNİNAL ÖDEME HİZMETLERİ VE ELEKTRONİK PARA A.Ş.’NİN<br />
          KULLANICI<br />
          ÇERÇEVE SÖZLEŞMESİ
        </div>
        <div class="header">
          İNİNAL ÖDEME VE ELEKTRONİK PARA HİZMETLERİ A.Ş.(İNİNAL)
        </div>
        <p>
          Adres: Harbiye Mah. Asker Ocağı Cad. No: 6 Süzer Plaza K: 2 - 4 Şişli
          - Beşiktaş / İstanbul<br />E-posta: info@ininal.com
        </p>
        <div class="header">MADDE 1: SÖZLEŞMENİN TARAFLARI</div>
        <p>
          İşbu İninal Kullanıcı Çerçeve Sözleşmesi (“Sözleşme”), İninal Ödeme ve
          Elektronik para Hizmetleri A.Ş (“İninal”) ve Kart Sahibi/Kullanıcı
          arasında Ön Ödemeli İninal Kart (“İninal Kart” veya “Kart”)’ın ya da
          kullanım/kullanıcı koşullarının belirlenmesi amacıyla aşağıda
          belirlenen şartlarda akdedilmiştir.
        </p>
        <p>
          İşbu "Sözleşme"; yukarıda adresi tanımlı İninal ile İninal hizmetleri
          kullanıcısı (Kullanıcı) arasında akdedilmiş bulunmaktadır.
        </p>
        <p>
          İşbu Sözleşme, Kullanıcı tarafından çevrimiçi ya da ıslak imzalı
          olarak kabul edilerek yürürlüğe girecek olup, Kullanıcı, İninal’ın
          hizmetlerinin kullanımının işbu Sözleşme ve eklerine, atıf yapılan
          www.ininal.com adresindeki açıklamalara, ilgili mevzuatta yer alan
          hüküm ve koşullara tabi olduğunu kabul, beyan ve taahhüt eder.
        </p>
        <p>
          İninal, ilgili mevzuat uyarınca sözleşmede herhangi bir değişiklik
          meydana geldiğinde revize edilmiş sözleşmeyi kullanıcının kolaylıkla
          ulaşabileceği ilgili hesaplarda yayımlar ve kullanıcılara e-posta, SMS
          ve/veya sahip olduğu uygulamalar üzerinden bildirimde bulunur.
        </p>
        <p>
          İninal’ın adres ve iletişim bilgisi ile KEP adresi www.ininal.com
          adresinde yer almaktadır.
        </p>
        <div class="header">MADDE 2: TANIMLAR</div>
        <p><strong>GİB:</strong> Gelir İdaresi Başkanlığı.</p>
        <p>
          <strong>HASSAS ÖDEME VERİLERİ:</strong> Ödeme Emri’nin verilmesinde
          veya kimlik doğrulamasında kullanılan, ele geçirilmesi veya
          değiştirilmesi halinde dolandırıcılık ya da sahte işlem yapılmasına
          imkan verebilecek şifre, güvenlik sorusu, sertifika, şifreleme
          anahtarı ile PIN, kart numarası, son kullanma tarihi, CVV2, CVC2 kodu
          gibi Ödeme Aracı’na ilişkin kişisel güvenlik bilgileri.
        </p>
        <p>
          <strong>KULLANICI:</strong> Ödeme Hizmeti kullanıcısı olan; ödeme
          aracı vasıtasıyla, İninal’ın çıkardığı ürün ve hizmetleri kullanan
          kişi.
        </p>
        <p>
          <strong>HAT SAHİBİ:</strong> Kullanıcının kayıt olurken kullandığı GSM
          hattı.
        </p>
        <p>
          <strong>KART KURULUŞLARI:</strong> MasterCard International, Visa
          International, Troy gibi kart kuruluşları.
        </p>
        <p>
          <strong>KİŞİSEL VERİLER:</strong> Kullanıcı veya Kullanıcı adına
          hareket eden kimliği belirli veya belirlenebilir gerçek kişilere ait
          TC Kimlik numarası, isim, soy isim, doğum tarihi, telefon numarası ve
          e-mail
        </p>
        <p class="page_number">Sayfa 1 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          adres bilgileri gibi sisteme kaydedilen ve bu bilgilerin ele
          geçirilmesi halinde dolandırıcılık ya da sahte işlem yapılmasına imkân
          verebilecek bilgiler.
        </p>
        <p><strong>KURUM:</strong> Bankacılık Düzenleme ve Denetleme Kurumu.</p>
        <p><strong>MASAK:</strong> Mali Suçları Araştırma Kurulu.</p>
        <p>
          <strong>MOBİL CÜZDAN:</strong> Cep telefonu üzerinden kart
          bilgilerinin eklenmesi ile ödeme, para transferi yapabilme, para
          alabilme, kontör yükleme, fatura ödeme gibi ödeme işlemlerinin
          yapılabilmesini sağlayan uygulama.
        </p>
        <p>
          <strong>MÜŞTERİ İLETİŞİM MERKEZİ:</strong> Kart kullanımına ilişkin
          her türlü duyuru, anlaşmalı işyerleri, kampanya, masraf ve ücretler
          ile para iadesi, kart iptali ve diğer kart ve işlemlerle ilgili her
          türlü ayrıntılı bilgi için İninal Web Sitesi’nde belirtilen güncel
          iletişim numarası ve iletişim merkezi.
        </p>
        <p>
          <strong>ÖDEME ARACI:</strong> Kullanıcı tarafından Ödeme Emri’ni
          vermek ya da ödeme hizmetini almak için kullanılan, kullanıma ilişkin
          tüm kural setleri İninal tarafından belirlenen kart, cep telefonu,
          şifre, Mobil Cüzdan vb. kişinin kullanımına özel araç.
        </p>
        <p>
          <strong>ÖDEME EMRİ:</strong> Kullanıcı tarafından ödeme işleminin
          gerçekleşmesi amacıyla verilen talimat.
        </p>
        <p>
          <strong>ÖDEME HİZMETİ:</strong> İninal’ın Yürürlükteki Mevzuat
          uyarınca ödeme aracı marifetiyle sunmakta olduğu ödeme hizmetleri.
        </p>
        <p>
          <strong>ÖN ÖDEMELİ İNİNAL KART (“İNİNAL KART” veya “KART”):</strong>
          İninal tarafından çıkarılan ve mülkiyeti kart çıkaran kuruluşa ait
          olan, Kullanıcı’nın İninal hesabına erişimini sağlayan, mal ve hizmet
          alımlarında kullanılabilen, hamiline/kullanıcısına önceden karta
          yüklenen tutar kadar kullanım imkanı sağlayan fiziki olarak basılı
          kart veya sanal ortamlarda kullanılabilen fiziki varlığı bulunmayan
          kart numarası.
        </p>
        <p>
          <strong>ÜYE İŞYERİ/İŞYERLERİ:</strong> İninal ile Üye İşyeri
          sözleşmesi imzalamış, Kullanıcıya her türlü mal ve hizmet alımında
          kart kullanım imkânı sunan gerçek veya tüzel kişi.
        </p>
        <p><strong>İNİNAL WEB SİTESİ:</strong> www.ininal.com adresi.</p>
        <p>
          <strong>PCI DSS:</strong> (Payment Card Industry Data Security
          Standard) Ödeme Kartları Endüstrisi Veri Güvenlik Standartları.
        </p>
        <p>
          <strong>YÜRÜRLÜKTEKİ MEVZUAT:</strong> İninal’ın faaliyette bulunduğu
          ve hizmet sunduğu ülkedeki faaliyetleri ve hizmetleri kapsamında
          yükümlü olduğu tüm mevzuat, özellikle 5549 Sayılı Suç Gelirlerinin
          Aklanmasının Önlenmesi Hakkında Kanun, 6698 sayılı Kişisel Verilerin
          Korunması Kanunu, 6493 sayılı kanun ve ilgili yönetmelikler dâhil
          olmak üzere, Sözleşme’nin yürürlükte olduğu süre içinde Kurum, GİB,
          MASAK ve diğer düzenleyici ve denetleyici kurumlar tarafından
          düzenlenen, Sözleşme’nin, Sözleşme taraflarının ve/veya Sözleşme
          konusu Kart’ın tâbi olduğu ya da olabileceği ilgili cari mevzuat.
        </p>
        <p>
          <strong>LİMİTLİ KART:</strong> Kimlik teyidi yapılmamış Kullanıcılar
          için “işlem limitleri” MASAK ve BDDK tarafından uygulanan ya da ilgili
          otoritenin düzenlemelerinde belirtildiği şekilde belirlenen
          limitlerdir.
        </p>
        <p class="page_number">Sayfa 2 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          <strong>LİMİTSİZ KART:</strong> İşbu Sözleşme kapsamında kimlik
          tespiti yapılmış Kullanıcılar için “İşlem Limiti”, max 50.000 TL’dir.
          Kullanıcının talebi doğrultusunda İninal tarafından belirlenecek olup,
          herhangi bir zamanda revize edilebilecektir.
        </p>
        <div class="header">
          MADDE 3: İNİNAL KART ÖZELLİKLERİ VE KULLANIM KOŞULLARI
        </div>
        <p>
          3.1 İninal Kart anlaşmalı Üye İşyerleri’nden avantajlı alışveriş
          yapılması ve diğer tüm anlaşmalı noktalardan yapılan alışveriş ve
          işlemlerde kullanım için çıkartılmış; ön ödemeli ve İninal Web
          Sitesi’nde belirtilen yükleme noktalarından Yürürlükteki Mevzuat
          çerçevesinde İninal tarafından belirlenen limitler dâhilinde tekrar
          doldurulabilen bir Ödeme Aracı’dır. Kart kullanımına ilişkin her türlü
          duyuru, anlaşmalı işyerleri, kampanya, puan uygulamaları, masraf ve
          ücretler ile diğer her türlü ayrıntılı bilgi, Müşteri İletişim
          Merkezi’nden veya İninal Web Sitesi’nden öğrenilebilir.
          https://www.ininal.com/kart-ucretleri/, ininal piyasa koşullarına ve
          ekonomik göstergelere göre yeniden düzenleme hakkına sahiptir.
          Kullanıcılar;
          <strong>
            Finansal Tüketicilerden Alınacak Ücretlere İlişkin Usûl ve Esaslar
            Hakkında Yönetmelik
          </strong>
          hükümleri gereğince İninal’ın https://www.ininal.com/kart-ucretleri/
          sayfasında yer alan fiyatlamaları herhangi bir bildirime gerek
          kalmaksızın kendileri takip etmekle yükümlüdür.
        </p>
        <p>
          3.2 Kart üzerinde herhangi bir isim ve/veya arkasında herhangi bir
          kişisel banka hesabı bulunmaz. Ancak Kart’ın limitsiz kullanım
          talebinin söz konusu olması halinde kimlik tespiti yapılarak Kullanıcı
          adına limitsiz olarak düzenlenebilmektedir.
        </p>
        <p>
          3.3 Kartın limitli ya da limitsiz kullanımı mevcut olup, Kullanıcının
          talebi doğrultusunda İninal’ın değerlendirmeleri çerçevesinde
          limitleri belirleme hak ve yetkisi İninal’a aittir. İninal, herhangi
          bir zamanda Sözleşme’ye uygun şekilde değişiklik bildirimi yaparak
          işlem limitlerini güncelleyebilir ya da bildirim yapmadan ilgili
          mevzuat uyarınca sınırlandırabilir. Kartın limitsiz kullanımı için
          Yürürlükteki Mevzuat doğrultusunda kimlik tespit prosedürünün
          tamamlanması gerekmektedir. Bu şekilde kimlik tespiti yapılmış Kart’ın
          Kullanıcı adına basılması İninal’ın ihtiyârındadır.
        </p>
        <p>
          3.4 Fiziki alışverişlerde satın alımın gerçekleşmesi için Kullanıcı
          ödeme terminaline kart şifresini girmelidir. Kart satın alındığında
          Kart’ın ilk şifresi 16 haneli kart numarasının son 4 hanesidir. İşlem
          güvenliği için kart şifresinin değiştirilmesine yönelik sorumluluk
          Kullanıcı’ya aittir. Kart şifresi ve şifre değişikliği işlemlerine
          ilişkin detaylara İninal Web Sitesi’nden ulaşılabilir. Kullanıcı, bu
          şifreyi değiştirmemesi nedeniyle oluşabilecek kötü niyetli
          kullanımlardan İninal’ın sorumlu tutulamayacağını peşinen kabul ve
          beyan eder.
        </p>
        <p>
          3.5 İninal, Ödeme Emrini gerçek zamanlı olarak Kart’a usulüne uygun
          olarak yansıtmakla yükümlüdür. Kullanıcı, Ödeme Emri’nin İninal’a
          ulaştığı anda Ödeme Emri’nin geri alınamayacağını kabul eder. Bu
          durumda Kullanıcı’nın ödemeyi geri alabilmesi Üye İşyeri’nin kabulüne
          bağlı olup, bunun için işlem yapılan Üye İşyeri ile iletişime geçilip
          iade talebi iletilmelidir.
        </p>
        <p>
          3.6 Kart’ın kullanım süresi Kart’ın üzerinde yazıldığı gibidir.
          Kullanıcı, Kart’ın son kullanım tarihinin dolması ve Kart’ta bakiye
          kalması durumunda bu bakiyenin yeni Kart’a aktarılmasını Müşteri
          İletişim Merkezi’nden talep edebilir. Bakiye aktarımının ne şekilde
          yapılabileceğine ilişkin bilgiye İninal Web Sitesi’nden ulaşılabilir.
        </p>
        <p>
          3.7 Kullanıcı, Kart içinde bulunan bakiyesini hukuki limitler
          doğrultusunda talep edebilir.
        </p>
        <p class="page_number">Sayfa 3 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          Kullanıcı’nın bakiyenin kendisine iadesi için gerekli evrakı Müşteri
          İletişim Merkezi’ne ibraz etmesi ve gerekli güvenlik aşamalarından
          geçmesi halinde Kart’ın içinde bulunan bakiyeden işlem ücreti
          düşüldükten sonra kalan tutarın iadesi belirtilen hesap/IBAN
          numarasına gönderilir. Kullanıcı’dan bu işlemin maliyetiyle orantılı
          bir ücret talep edilir. Kullanıcı güncel ücret bilgisine İninal Web
          Sitesi’nden ulaşabilir. Kullanıcının GSM hattını devretmesi,
          değiştirmesi vb. durumlarında değişikliği İninal’a, İninal’ın
          gösterdiği kanallardan ve gösterdiği şekilde bildirmesi zorunludur.
          İninal gerektiğinde değişikliğe ilişkin tüm bilgi ve belgeyi talep
          edebilir. İninal, ürün/servis ve hizmetlere ilişkin mevzuattaki
          bildirim süresine uyarak tüm ücretleri güncelleme/değiştirme hakkını
          saklı tutar. Güncel ücret bilgileri
          https://www.ininal.com/kart-ucretleri/ sayfasında yer almaktadır.
          Kullanıcılar;
          <strong>
            Finansal Tüketicilerden Alınacak Ücretlere İlişkin Usûl ve Esaslar
            Hakkında Yönetmelik
          </strong>
          hükümleri gereğince İninal’ın https://www.ininal.com/kart-ucretleri/
          sayfasında yer alan fiyatlamaları herhangi bir bildirime gerek
          kalmaksızın kendileri takip etmekle yükümlüdür.
        </p>
        <p>
          3.8 Kullanıcı, Kart’ın kullanımına yönelik olarak, Yürürlükteki
          Mevzuat uyarınca kimlik bilgilerini vermeyi kabul etmektedir.
        </p>
        <p>
          3.9 Kullanıcı, Yürürlükteki Mevzuat uyarınca, Sözleşme kapsamında, her
          türlü Ön Ödemeli Kart talebi ve işlemlerinde kendi nam ve hesabına
          hareket edeceğini, başkası adına hareket etmeyeceğini, kendi adına ve
          fakat başkası hesabına hareket etmesi halinde kimin hesabına işlem
          yaptığını ve yetki durumu ile hesabına hareket edilen gerçek veya
          tüzel kişiliğin kimlik bilgileri ve teyidine ilişkin belgeleri
          işlemlerin yapılmasından önce İninal’a derhal bildireceğini beyan ve
          taahhüt eder.
        </p>
        <p>
          3.10 Kullanıcı, Yürürlükteki Mevzuat kapsamında Ön Ödemeli Kart için
          kimlik tespitini zorunlu kılmayan azami limitler dâhilinde ya da
          kimlik tespiti prosedürünü gerçekleştirerek bu limitleri İninal’ın
          kabul ettiği sınırda artırarak/azaltarak Kart kullanımını
          gerçekleştirebilir. Yürürlükteki Mevzuat uyarınca düzenleyici
          kurumların limitleri değiştirmesi durumunda bu limitler güncellenecek
          olup, kimlik tespiti gerçekleşmeyen İninal Kart’ın güncel kullanım ve
          yükleme limitleri İninal Web Sitesi’nden takip edilebilir.
        </p>
        <p>
          3.11 Kullanıcı’nın, Kart’ına 2. kere ve sonrasında bakiye
          yüklemesi/dolumu yapabilmesi, kartını 3D Secure destekli Internet ve
          e-ticaret sitelerinde kullanabilmesi için, İninal Web Sitesi’nden veya
          Mobil Cüzdan uygulaması üzerinden tanımlaması ve aktive etmesi ve
          gereken diğer prosedürleri tamamlaması gerekmektedir. Aktivasyon
          işlemi esnasında İninal, Kullanıcı’dan TCKN, Ad, Soyad kimlik
          tespitine ilişkin bilgileri talep edebilir ve bu bilgilerin
          verilmemesi halinde aktivasyon işlemini tamamlamayabilir. Elektronik
          para, aktivasyon yapılmaksızın fona çevrilemez, iade edilemez,
          değiştirilemez.
        </p>
        <p>
          3.12 Kullanıcı, Kart’ına ait işlem bilgilerini İninal Web Sitesi’ndeki
          hesabından veya Mobil Cüzdan uygulamasından takip edebilir.
        </p>
        <p>
          3.13 Kullanıcı, İninal ve grup şirketlerinin (verilerin kaydedilmesi,
          depolanması, değiştirilmesi, yeniden düzenlenmesi, tasniflenmesi veya
          diğer şekillerde işlenmesini de kapsamak üzere) müşteri ilişkileri
          yönetimi amacıyla, İninal ve grup şirketlerinin hizmetlerini tanıtmak
          da dahil ancak bununla sınırlı olmayan amaçlarla ticari elektronik
          iletiler göndermesi dahil iletişime geçmesine onay vermektedir.
        </p>
        <p>
          3.14 İşbu Sözleşme kapsamında İninal web sitesinde yayımladığı ve
          belirtilen yöntemler ile
        </p>
        <p class="page_number">Sayfa 4 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          ödeme hizmetlerini sunmaktadır. Bahsi geçen yöntemlerin kapsam ve
          içeriği, bu yöntemlerle hizmet sunulmasına devam edilmesi, yeni
          yöntemler eklenmesi veya bazı yöntemlerin kullanılmamasına karar
          verilmesi münhasıran İninal’ın takdirinde olacaktır. Bu kapsamda
          Kullanıcı, elektronik para ürünleri ile ilgili aktivasyonunu yapmadığı
          bir kart hakkında İninal’a karşı kayıp, çalıntı veya 3. kişilerce ele
          geçirilmesi vb. herhangi bir hak ve alacak iddiasında bulunmayacağını,
          İninal’ın bu hususta hiçbir sorumluluğu olmadığını kabul ve beyan
          eder. Bununla birlikte, İninal her zaman Kullanıcılarının yararını ve
          maksimum faydasını düşünerek ve herhangi bir Kullanıcı mağduriyetine
          mahal vermeden, kullandığı ödeme şemasını (Troy, Visa Electron, Visa,
          MasterCard, Maestro, Discover, American Express vb.) değiştirme
          hakkına her zaman sahiptir. İninal’ın yerel ya da uluslararası ödeme
          şeması kullanması (Troy, Visa Electron, Visa, MasterCard, Maestro,
          Discover, American Express vb.) her zaman kendi takdirindedir.
          Kullanıcı sadece ödeme şemasının değişmesinden kaynaklı olarak
          herhangi bir mağduriyet (kartın içindeki bakiye ile sınırlıdır) ileri
          süremez.
        </p>
        <p>
          3.15 Kullanıcının, Elektronik para ihracı talebinde bulunması halinde
          İninal, öngördüğü yöntemlerle talep edilen fon tutarı kadar elektronik
          parayı derhal ihraç edecek ve ilgili bakiyeyi Kullanıcıya sunacaktır.
          Aksi, Kullanıcı tarafından yazılı olarak belirtilmedikçe Elektronik
          para’nın hak sahibi, hattın yasal sahibi olarak kabul edilir. Aksi
          durumlarda Kullanıcının İninal’a bilgi vermesi ve MASAK mevzuatı
          kapsamında gerekli kimlik tespiti ve/veya bilgi temininin tamamlaması
          İninal tarafından talep edilebilecektir. Aktivasyon işlemi yapılmayan
          Elektronik para ürünlerinin kayıp, çalıntı veya 3. kişilerce ele
          geçirilmesi sorumluluğu tamamen mülkiyeti elinde bulunduran kişiye
          aittir, İninal’ın bu keyfiyetteki kayıp ve zarardan herhangi bir
          sorumluluğu bulunmamaktadır. Aktivasyon işlemi esnasında İninal,
          Kullanıcıdan gerekli tüm bilgi/belgeleri talep edebilir ve bu
          bilgi/belgelerin verilmemesi halinde aktivasyon işlemini
          tamamlamayabilir. Aktivasyon işlemleri yapılmayan tüm kartların
          elektronik para bakiyeleri fona çevrilemez iade edilemez,
          değiştirilemez. Elektronik paranın son kullanma tarihi yapılan son
          işlem tarihinden itibaren bir yıldır. Son kullanma tarihi dolan söz
          konusu fonlar, elektronik para olma hükmünü kaybeder ve bu fonlar için
          Türk Borçlar Kanunu’nun genel hükümleri uygulanır. Kullanıcı sahip
          olduğu elektronik paranın bir kısmının veya tamamının fona
          çevrilmesini talep edebilir. Elektronik paranın ihracında kullanılan
          yönteme göre valör tarihi belirleme hakkı İninal’a ait olup her
          durumda, bu tutarların fona çevrilmesinin talep edilmesi durumunda
          Kullanıcı https://www.ininal.com/kart-ucretleri/ linkinde yer alan
          ücret ve hizmet bedellerini ödemeyi kabul eder. İninal, ön ödemeli
          kartın tavsiye edilen satış tutarını ve son kullanma tarihini
          belirlemeye yetkilidir. Kullanıcı tarafından, İninal Cüzdan ve İninal
          Web sayfası marifetiyle kapatılan kartların ya da kullanıcının
          kullanmadığı ya da son kullanma tarihi dolan kartların üzerinde
          bulunan ihraç edilmiş elektronik paralardan operasyonel maliyetler
          düşülür. Bir takvim yılında dokuz ay kullanılmayan kartlar kapatılır
          ve iptal edilir, bu kartlardan operasyonel maliyetler düşülür. İninal
          Kart özelinde değişiklik gösteren ücretler, inaktiflik durumunda
          Kullanıcının kart bakiyesinden inaktiflik süresine göre kesinti
          yapılan operasyonel ücretler, anlaşmalı ATM’lerden yapılan para
          yüklemelerinde farklılaşan ücretler, elektronik para iadesi/para
          çekimi ücretleri, mobil uygulama üzerinden kredi kartı ile bakiye
          yükleme işlemi için işlem başına belirli aralıkta alınacak ücretler ve
          komisyon oranları, eft ile bakiye yükleme işlemlerinde işlem başına
          alınacak ücretler, ininal mobil uygulaması ve ininal altyapısını
          kullanarak para transferi hizmeti sunan diğer platformlardan yapılacak
          para transferinde işlem başına alınacak ücretler, elektronik paranın
          fona çevrilmesi halinde alınacak ücretler açıkça İninal’ın resmi
          internet sitesinde duyurulmaktadır. Kullanıcı bu ücret ve hizmet
          bedellerini kabul eder. Ancak Kullanıcının kartında bakiye bulunmaması
          durumunda ve kartın
        </p>
        <p class="page_number">Sayfa 5 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          inaktiflik durumunda ücret kesilmez. Kullanımda olmayan ve üç aydır
          işlem görmeyen sıfır bakiyeli kartlar kapatılır. Koşullara uygun
          olarak elektronik para’nın fona çevrilmesi, iadesi vb. süreçler için
          Mevzuat’a uyumlu olarak İninal ek ücretler talep edebilir ya da
          ücretleri güncelleyebilir. İninal’ın kullanıcıya vaat ettiği ödüller
          aksi belirtilmediği sürece, her ne koşul altında olursa olsun, baz
          alınan ödülün on katından fazla olamaz ve kullanıcı bu hususta hak
          iddia edemez ve ödülü kullanma hakkını kendinde göremez, haksız
          kullanılan ve transfer edilen ödüller kullanıcı bakiyesinden düşülür,
          iptal edilir, bu koşullarda kullanılmasını kullanıcı kabul ve beyan
          eder, ayrıca yüklenen ödülün öncelikli ya da sonradan, harcamaya konu
          olması Şirketin tasarrufundadır. Kullanıcı istediği zaman elektronik
          para’nın kısmen veya tamamen fona çevrilmesi talebinde bulunabilir.
          İninal, mevzuatta aksi yönde bir hak veya yükümlülüğü bulunmadığı
          sürece, Kullanıcının bu talebi üzerine İninal tarafından talep
          edilecek IBAN numarası dahil tüm bilgilerin İninal’a eksiksiz olarak
          iletilmesini ve gerekli olması durumda yasal yükümlülüklerin yerine
          getirilmesini takiben yedi işgünü içerisinde elektronik para karşılığı
          kadar fonun Kullanıcı tarafından iletilen IBAN numaralı hesaba
          aktarımına ilişkin işlemleri gerçekleştirecektir. Bu fon taleplerinde
          ve iadelerde, iade yapılacak IBAN bilgisinin hat sahibine ait olması
          gerekmektedir. Kullanıcılar; Finansal Tüketicilerden Alınacak
          Ücretlere İlişkin Usûl ve Esaslar Hakkında Yönetmelik hükümleri
          gereğince İninal’ın https://www.ininal.com/kart-ucretleri/ sayfasında
          yer alan fiyatlamaları herhangi bir bildirime gerek kalmaksızın
          kendileri takip etmekle yükümlüdür.
        </p>
        <p>
          3.16 Kullanıcı Kart’ın çalınması, kaybolması durumunda veya iradesi
          dışında gerçekleşmiş herhangi bir işlemi öğrenmesi durumunda, uygulama
          ya da web üzerinden kartını kapatmak veya Müşteri İletişim Merkezi’ne
          derhal bildirim yapmak zorundadır. Kart’ın iptal edilmesi durumunda
          Kullanıcı yeni bir Kart alabilir. Kart’ta bakiye kalması durumunda;
        </p>

        <ul>
          <li>
            Kullanıcı’nın kendisine iadesi için gerekli bilgi ve belgeleri
            Müşteri Hizmetleri’ne ibraz etmesi ve gerekli güvenlik aşamalarından
            geçmesi halinde kayıp/çalıntı bildirimi yapılan Kart’ın içinde
            bulunan bakiye kadar tutarın iadesi belirtilen hesap/IBAN numarasına
            gönderilir. Hat sahibi ve IBAN sahibi aynı kişi olmalıdır.
          </li>
          <li>
            Kullanıcı yeni bir Kart alıp İninal Web Sitesi’nden veya Mobil
            Cüzdan uygulaması üzerinden aktive ederek Müşteri Hizmetleri’nden
            bakiyenin bu yeni Kart’a transferini isteyebilir.
          </li>
        </ul>

        <p>
          3.17 Ödeme işlemine ilişkin onay, fiziksel alışverişlerde işlem
          gerçekleştirilmeden önce Kart şifresinin girilmesiyle verilir. Online
          işlemlerde, işlemin 3D secure özellikli olması durumunda Kullanıcı’nın
          İninal Web Sitesi’ndeki hesabında veya Mobil Cüzdan uygulaması
          üzerinden tanımladığı cep telefonuna gelen onay kodunun sisteme
          girilmesiyle, 3D secure özellikli olmayan işlemlerde Kart bilgisinin
          verilmesiyle ödeme işlemine ilişkin onay verilmiş olur.
        </p>
        <p>
          3.18 Kart kullanımları Türk Lirası ile yapılmakla birlikte yabancı
          para birimiyle yapılan kullanımlarda Kart’a yansıyacak döviz kuru
          işlemin yansıdığı andaki TC Merkez Bankası döviz kuruna ilave komisyon
          eklenmesiyle hesaplanır. Döviz kuruna eklenecek güncel komisyon oranı
          İninal Web Sitesi’ndeki https://www.ininal.com/kart-ucretleri/
          ücretler kısmında yayınlanmaktadır. Uygulanacak referans döviz
          kurundaki değişiklikler derhal geçerli olacaktır. Kullanıcılar;
          Finansal Tüketicilerden Alınacak Ücretlere İlişkin Usûl ve Esaslar
          Hakkında Yönetmelik hükümleri gereğince İninal’ın
          https://www.ininal.com/kart-ucretleri/ sayfasında yer alan
          fiyatlamaları herhangi bir bildirime gerek kalmaksızın kendileri takip
          etmekle yükümlüdür.
        </p>
        <p class="page_number">Sayfa 6 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <div class="header">
          MADDE 4: İNİNAL KART KULLANIMINDA SORUMLULUK ESASLARI
        </div>
        <p>
          4.1. Teslim alınan Kart’ın tüm sorumluluğu, Kart’ın teslim edildiği ya
          da fiziki varlığı bulunmayan Kart’ın numarasının öğrenildiği an
          itibari ile Kullanıcı’ya geçecektir.
        </p>
        <p>
          4.2. Kullanıcı, İninal Kart’ı, Madde 3’te belirtilmiş kullanım
          koşulları dahilinde kullanacağını kabul, beyan ve taahhüt eder.
          Kart’ın, Madde 3’te belirtilmiş kullanım koşulları dışında
          kullanılmasından, hileli kullanımından doğacak her türlü hukuki
          ve/veya cezai sorumluluk ve yükümlülük Kullanıcı’ya aittir. Ödeme
          Aracı’nın hileli, kullanım koşullarına aykırı ve yetkisiz kullanımı
          şüphesini doğuran durumlarda İninal, Kart’ın kullanımını durdurabilir
          ya da Kart’ı kullanıma kapatabilir. Yürürlükteki Mevzuat’ta yer alan
          bilgi verilmesini engelleyici hükümler ile güvenliği tehdit edici
          objektif nedenlerin bulunması halleri dışında, Kullanıcı’yı, Kart’ı
          kapatma gerekçesi konusunda bilgilendirir ve durdurma ve/veya kapatma
          sebebi ortadan kalktığında Kart’ı yeniden kullanıma açar.
        </p>
        <p>
          4.3. Kullanıcı, Kart’ı Yürürlükteki Mevzuat ve/veya toplum ahlakına
          aykırı amaçlarla kullanması, bu aykırı kullanımın Kullanıcı’nın
          kusuruna dayanması ve/veya Kart’ı kumar, tütün ve tütün mamülleri,
          alkol, +18 içerik ve diğer yetişkin içeriklerin internet üzerinden
          alımını sağlayan işyerlerinde kullanması durumlarında, bu
          kullanımlardan doğacak tüm hukuki ve/veya cezai sorumluluk ve
          yükümlülüğün kendisinde olduğunu kabul, beyan ve taahhüt eder.
        </p>
        <p>
          4.4. İninal, Kart’ların düzenli ve güvenli kullanımı ile bildirim,
          talep, şikâyet ve itirazlara ilişkin gerekli tedbirleri almaya yönelik
          sistemi kurmak ve kesintisiz olarak açık tutmakla yükümlüdür. Ancak
          teknik arıza, mücbir sebep ve benzeri durumlar nedeni ile işlemin
          gerçekleşmemesinden ve bunun sonuçlarından sorumlu tutulamaz.
        </p>
        <p>
          4.5. Kullanıcı, Kart’ı ve Kart’ın kullanılması için gerekli şifre
          bilgilerini ya da kimliğini belirleyici bilgileri güvenli bir şekilde
          korumak, bu bilgileri başkaları ile paylaşmamak ve bu bilgilerin
          başkaları tarafından kullanılmasına engel olacak önlemleri almakla
          yükümlüdür. Bu bilgilerin başkalarınca öğrenilmesi, aktivasyonu
          yapılmış olan Kart’ın kaybolması, çalınması veya irade dışında bir
          işlemin gerçekleşmesi durumlarında Kullanıcı’nın İninal’ın gösterdiği
          kanallardan (web, cüzdan veya Müşteri İletişim Merkezi vb.) derhal
          bildirim yapması ve Kart’ı iptal ettirmesi gerekmektedir.
        </p>
        <p>
          4.6. Kullanıcı, ödeme aracı ile ilgili kişisel güvenlik bilgilerinin
          korunmasına yönelik gerekli önlemleri almak ve ödeme aracını ihraç ve
          kullanım koşullarına uygun olarak kullanmakla yükümlüdür. Ödeme
          aracının kaybolması, çalınması veya iradesi dışında gerçekleşmiş
          herhangi bir işlemi öğrenmesi halinde, kullanıcı durumu derhal
          İninal’a bildirmekle yükümlüdür.
        </p>
        <p>
          Hukuka aykırı kullanımın, Kullanıcının kusuruna dayanması halinde
          İninal hiç bir sorumluluk kabul etmeyecektir. Kullanıcı’nın 4.5 madde
          kapsamında kartı ve kartın kullanılması için gerekli şifre bilgilerini
          ya da kimliğini belirleyici bilgileri güvenli bir şekilde korumaması,
          bu bilgileri başkaları ile paylaşması ve bu bilgilerin başkaları
          tarafından kullanılmasına engel olacak önlemleri almaması
          Kullanıcı’nın kusuru olarak değerlendirilir.
        </p>
        <p class="page_number">Sayfa 7 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          4.7. Kullanıcı, yetkilendirmediği veya hatalı gerçekleştirilmiş ödeme
          işlemini öğrendiğinden itibaren İninal’a gecikmeksizin bildirmek
          suretiyle işlemin düzeltilmesini isteyebilir.
        </p>
        <p>
          4.8. İninal, Kullanıcı’nın kart kullanımı ile ilgili olarak yapacağı
          şikâyet ve itiraz başvurularını öncelikle Kullanıcı’nın başvuru
          yöntemini kullanarak, kendi belirlediği kanallardan ve gerekçeli bir
          şekilde yürürlükteki mevzuatta belirtilen sürelerde cevaplayacaktır.
        </p>
        <p>
          4.9. İninal tarafından harcama itirazlarında geri ödeme taleplerinin
          değerlendirilmesi kırkbeş (45) ile yüzseksen (180) gün arası
          sürebilir. Uluslararası ve yurtiçindeki Kart Kuruluşları’nın kuralları
          ve prosedürleri ile işleme ilişkin ürün türü, işlemin yapılma yeri,
          işlemin yapılma şekli, kartın işlemde fiziksel olarak
          kullanılıp/kullanılmadığı göre bu süre değişkenlik gösterebilecektir.
        </p>
        <p>
          4.10. İninal, Kart ile alınacak mal veya hizmetlerin cinsi, niteliği,
          içeriği, miktarı, bedeli, ayıplı çıkması, iptali, iadesi, teslim
          alınıp alınmaması vs. konularda herhangi bir sorumluluk taşımaz. Bu
          hususlarda Kullanıcı ile muhatabı olan satıcı arasında doğabilecek
          ihtilaflardan İninal hiçbir şekilde sorumlu tutulamaz. Diğer taraftan,
          İninal şüpheli gördüğü durumlarda kartı kapatabilir- blokeye alabilir,
          işlem geçmesine izin vermez.
        </p>
        <p>
          4.11. Alışveriş yapılmak istenen internet ve e-ticaret sitelerinin
          ödeme altyapısından kaynaklanan herhangi bir sorun nedeniyle İninal
          Kart’ın kullanılamamasından veya ödeme işlemin
          gerçekleştirilememesinden dolayı oluşabilecek her türlü sorun ve
          şikayetten ötürü İninal sorumlu tutulamaz.
        </p>
        <p>
          4.12. İninal, söz konusu Ön Ödemeli Kart sisteminde, Kart’ın
          özelliklerinde, anlaşmalı üye işyerlerinde, İninal Web Sitesi ve
          sosyal medyadaki ürün sayfalarında her türlü düzeltme ve değişikliği
          yapabilir; ürünü piyasadan kaldırabilir. Bu durumda İninal’ın
          Kullanıcı’ya karşı hiçbir hukuki/cezai sorumluluk ve yükümlülüğü
          bulunmamaktadır. Kullanıcı, İninal’ın sayılan hakları kullanması
          halinde, İninal’dan ne nam altında olursa olsun hiçbir talepte
          bulunmayacağını kabul, beyan ve taahhüt eder.
        </p>
        <p>
          4.13. Kullanıcı’nin kişisel ve Hassas Ödeme Verileri İninal tarafından
          PCI DSS’e uygun olarak saklanmaktadır.
        </p>
        <p>
          4.14. Kullanıcı, kullanım ve hizmet bedellerine ilişkin
          ücretlendirmelerde https://www.ininal.com/kart-ucretleri/ sayfasında
          yer alan fiyatlandırmaları kabul, beyan ve taahhüt eder. Ayrıca,
          İninal’ın fiyatlandırmalarda tek taraflı değişiklik yapma hakkının her
          daim saklı olduğunu kabul, beyan ve taahhüt eder. Kullanıcı; İninal
          Web Sitesi’nde yer alan https://www.ininal.com/kart-ucretleri/
          değişiklikleri ve piyasa koşullarına göre gerçekleştirilen
          güncellemeleri kabul, beyan ve taahhüt eder. Kullanıcılar; Finansal
          Tüketicilerden Alınacak Ücretlere İlişkin Usûl ve Esaslar Hakkında
          Yönetmelik hükümleri gereğince İninal’ın
          https://www.ininal.com/kart-ucretleri/ sayfasında yer alan
          fiyatlamaları herhangi bir bildirime gerek kalmaksızın kendileri takip
          etmekle yükümlüdür.
        </p>
        <p>
          4.15. Hizmet kapsamında paylaşılan Kişisel Veriler, 6698 sayılı
          Kişisel Verilerin Korunması Kanunu gereğince, hukuka uygun, doğru,
          güncel ve kanunlarda belirlenen süre ile sınırlı olmak üzere
          kaydedilir, saklanır ve işlenir. Kişisel Veriler, Sözleşme’nin ifası,
          sunulan hizmeti kişiselleştirmek ve geliştirmek amaçlarıyla, İninal iş
          ortakları ve ilgili Kamu Kurumları ile kanunun izin verdiği durumlarda
          üçüncü kişilere yalnızca belirtilen amaçlar sınırında
        </p>
        <p class="page_number">Sayfa 8 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          aktarılacaktır. Kullanıcı, işbu madde hükmüne muvafakat ettiğini,
          kabul, beyan ve taahhüt eder. Bu maddede anılan Kanun’a ilişkin
          “Kişisel Verilerin Korunması” başlığı altında bilgilendirme metni,
          İninal Web Sitesi’nde yayımlanmaktadır.
        </p>
        <p>
          4.16. Kullanıcı, İninal’ın iş ortakları ile çıkardığı ve/veya
          çıkaracağı ortak kartlara dair Hassas Ödeme Verileri ve kişisel
          güvenlik bilgileri hariç kullanıcı bilgilerinin, Kullanıcı’ya fayda
          sağlanması, kişiye özel kampanya düzenlenmesi ve promosyon çalışması
          yapılması gibi sebeplerle iş ortakları ile paylaşılmasına onay
          vermektedir. İşbu kullanıcı bilgileri, Kullanıcı’nın ortak kart ile
          yaptığı işlem bilgilerini kapsamaktadır. Ayrıca Kullanıcı, perakende
          satışlarda veya online satışlarda İninal Kart kullanmak suretiyle
          işlem yaptığında, kayıt sırasında girmiş olduğu kullanıcı
          bilgilerinin, yasal şartlara ve Kart Kuruluşları’nın kurallarına uygun
          olarak ödemenin gerçekleştirilmesi amacıyla gerekli görülen ölçüde
          paylaşılmasına onay vermektedir.
        </p>
        <p>
          4.18. Kullanıcı, işbu Kullanıcı Sözleşmesi uyarınca, İninal tarafından
          kendisine bilgilendirme, tanıtım ve pazarlama amacıyla ticari
          elektronik ileti gönderilmesine onay vermektedir. Kullanıcı, ticari
          elektronik ileti almak istememesi durumunda verdiği onayı
          kaldırabilir. Bu değişikliğin nasıl yapılacağına ilişkin ayrıntılı
          bilgi gönderilen bilgilendirme ve tanıtım iletilerinde yer almaktadır.
        </p>
        <div class="header">MADDE 5: ÜCRETLER</div>
        <p>
          5.1 Kart Satış Ücreti: Anlaşmalı Satış Noktalarından ya da İninal Web
          Sitesi üzerinden alınan Kart için belirlenmiş satış fiyatıdır.
          Anlaşmalı Satış Noktalarında Kart satış ücretinin nasıl ödeneceği
          ilgili nokta bazında değişebilir.
        </p>
        <p>
          5.2 Kart Yükleme Ücreti: Kart’ın içine her para yükleme işleminde,
          işlem adedi ya da işlem tutarı doğrultusunda ödenecek ücrettir.
        </p>
        <p>
          5.3 Aylık Kullanım Ücreti: Kart’ın kullanım bedeli karşılığı olarak,
          Kart bakiyesinden aylık olarak otomatik düşecek ücrettir.
        </p>
        <p>
          5.4 Fatura Ödeme Ücreti: Her fatura ödeme işleminde, işlem adedi ya da
          işlem tutarı doğrultusunda ödenecek ücrettir.
        </p>
        <p>
          5.5 Yurtdışı Döviz İşlem Komisyonu: Yabancı para birimiyle yapılan
          alışverişlerde Karta yansıyacak döviz kuru ödeme anındaki TC Merkez
          Bankası döviz satış kuruna %7 ilave komisyon eklenmesiyle hesaplanır.
          Diğer taraftan, harcama bakiyelerinin yurtdışı takasa girme süresine
          göre, karttan çekilen bakiye değişiklik gösterebilir.
        </p>
        <p>
          Yabancı para cinsinden yapılmış tüm işlem ve ödemeler, ilgili para
          cinsi üzerinden yapılır. Bununla birlikte, T.C. Kanunlarının veya
          yönetmeliklerinin zorlayıcı hükümler getirmesi halinde, bu hesaplardan
          ödemeler, İninal’ın inisiyatifi dışında Türk Parası üzerinden
          yapılabilir. İninal her durumda Türk Parasının Kıymetini Koruma
          Kanunu; Sermaye Hareketleri Mevzuatı ve yabancı para işlemleri ile
          bağlantılı diğer kanun ve yönetmeliklerin hükümleri doğrultusunda
          hareket eder. Bu gibi durumlarda; farklı para birimlerinin birbirine
          çevrilmesi işlemi (arbitraj) için kullanılacak oran ve/veya çapraz
          kurlar; hem yasaların ilgili hükümleri hem de İninal’a tanınmış olan
          takdir hakları birlikte göz önüne alınarak tespit edilir. Söz konusu
          dönüştürme işlemleri sonucunda kullanıcıların uğramış olabilecekleri
          muhtemel kayıp ve zararlar, vergi ve harçlar, komisyon ödemeleri, vb
          gibi giderler kendilerine aittir ve İninal’dan
        </p>
        <p class="page_number">Sayfa 9 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          bu yönde bir tazmin talebi yapılamaz. İninal yine adı geçen bu mevzuat
          çerçevesinde gerektiği hallerde veya kanun emrederse tek taraflı ve
          tam yetkili olarak (önceden bir kullanıcı talimatı olmaksızın veya var
          olan kullanıcı talimatlarına aykırı olsa bile) muameleler
          gerçekleştirebilir, işlemler yürütebilir, fon-vergi-masraf-komisyon
          tahsilatı yapabilir. Bu gibi yasal ve zorunlu uygulamalar neticesinde
          doğabilecek her türlü hak kaybından kullanıcılar sorumludur;
          İninal’dan bu yönde herhangi bir tazmin veya zarar telafisi talebinde
          bulunulamaz.
        </p>
        <p>
          5.6 Diğer Hizmet Ücretleri: Diğer hizmetler için alınacak işlem adedi
          veya tutar bazlı ücretlerdir.
        </p>
        <p>
          Sözleşme kapsamında sunulan hizmetlere ilişkin Kullanıcınin ödemesi
          gereken ve uygulanan ücretlerin bilgisi İninal Web Sitesi’nde
          https://www.ininal.com/kart-ucretleri/ duyurulmaktadır. Kullanıcı
          İninal Web Sitesi’nde duyurulan ve güncel olan ücretleri Kart kullanım
          süresi boyunca ödemeyi peşinen kabul eder. Kullanıcılar;
          <strong>
            Finansal Tüketicilerden Alınacak Ücretlere İlişkin Usûl ve Esaslar
            Hakkında Yönetmelik
          </strong>
          hükümleri gereğince İninal’ın https://www.ininal.com/kart-ucretleri/
          sayfasında yer alan fiyatlamaları herhangi bir bildirime gerek
          kalmaksızın kendileri takip etmekle yükümlüdür.
        </p>
        <p>
          İninal, ürün ve hizmetler ile işlemlerden alınacak ücretleri, ilgili
          mevzuatta ve Sözleşme’nin değişiklik yapılmasına dair hükümlerinde yer
          alan değişiklik esasına uygun olarak, tek taraflı olarak
          değiştirebilir.
        </p>
        <div class="header">MADDE 6: GENEL HÜKÜMLER</div>
        <p>
          6.1 İşbu Sözleşme, İninal Kullanıcı’nin Kartını ilgili noktalardan
          teslim alması veya sanal kartını oluşturmak için hesap açmasını
          takiben online kabul edilerek yürürlüğe girecektir.
        </p>
        <p>
          6.2 Kullanıcı, İninal Kart kullanımının Sözleşme’de yer alan hüküm ve
          koşullara tabi olduğunu kabul, beyan ve taahhüt eder. İninal,
          Sözleşme’nin onaylanması sonrası Kullanıcı’ya Sözleşme’nin bir
          örneğini Kullanıcı’nın tanımlı e-posta adresine gönderecek ve İninal
          Web Sitesi üzerinden her an erişime hazır bulunduracaktır.
        </p>
        <p>
          6.3 Kullanıcı, Sözleşme’nin onaylandığı tarihten itibaren on dört (14)
          gün içinde herhangi bir gerekçe göstermeden ve cezai şart ödemeden
          cayma hakkına sahip bulunmaktadır. Bunun için Kullanıcı’nin İninal’ın
          Müşteri İletişim Merkezi’ne bildirimde bulunması yeterlidir. İninal
          tarafından Kart iptali yapılır.
        </p>
        <p>
          6.4 Kullanıcı üyelik hesabı açarken girmiş olduğu bilgilerin doğru
          olduğunu, kayıtlı bilgilerle yapılan işlemlerin ve bildirimlerin
          geçerli sayılacağını kabul eder.
        </p>
        <p>
          6.5 Kullanıcı, Kart’ını, İninal’ın üyesi bulunduğu ve/veya bulunacağı
          ulusal ve uluslararası kart kuruluşları tarafından belirlenen kurallar
          ve Sözleşme hükümlerine uygun kullanmayı ve bu kuruluşların
          kurallarına tabi olmayı kabul eder.
        </p>
        <p>
          6.6 Kullanıcı, İninal’a ait ünvan, işletme adı, marka, patent, logo,
          tasarım, kod, bilgi ve yöntem gibi tescilli veya tescilsiz fikri
          mülkiyet haklarına ilişkin hiçbir unsuru İninal’ın onayı olmadan her
          hangi bir web sitesinde ya da farklı bir mecrada kullanmamayı,
          kopyalamamayı, çoğaltmamayı, işlememeyi, dağıtmamayı veya bunlardan
          türemiş çalışmalar yapmamayı veya hazırlamamayı ve hiçbir şekilde
          anılan fikri mülkiyet haklarını ihlal etmemeyi kabul ve taahhüt eder.
          İninal’ın fikri mülkiyet haklarından kaynaklı haksız kullanımın söz
          konusu olması halinde
        </p>
        <p class="page_number">Sayfa 10 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          Kullanıcı bu kullanımdan kaynaklı zararı tazmin edeceğini kabul ve
          beyan eder.
        </p>
        <p>
          6.7 İninal, kendisi tarafından öngörülemeyen veya engellenemeyen
          durumlar, olağanüstü haller ve mücbir sebep neticesinde meydana gelen
          gecikmelerden, Kart kullanımının gerçekleştirilememesinden veya
          yapılan işlemde kendi kusuru dışında hata meydana gelmesinden veya
          bunların sonucunda meydana gelen zararlardan sorumlu olmayacaktır.
        </p>
        <p>
          6.8 İninal Sözleşme’yi 7 (yedi) gün önceden ihbar ederek her hangi bir
          tazminat ödemeksizin her zaman sona erdirebilir. Bu durumda Kullanıcı
          Sözleşme kapsamında kullandığı Kart’ını iade etmek durumundadır.
        </p>
        <p>
          6.9 İninal’ın Yürürlükteki Mevzuat kapsamındaki faaliyet izninin
          herhangi bir nedenle sonlanması halinde, Sözleşme İninal’a herhangi
          bir tazminat yükümlülüğü doğurmaksızın İninal tarafından yapılan
          bildirime istinaden feshedilecektir.
        </p>
        <p>
          6.10 İninal, kart özelliklerinde ve ücretlerde her türlü değişikliği
          yapma hakkına sahiptir ve revize edilmiş sözleşmeyi, kart
          özelliklerini ve güncel ücret tablosunu İninal Web Sitesi’nde
          https://www.ininal.com/kart-ucretleri/ yayımlayacaktır. Ücret
          bilgilerinin takibi kullanıcının sorumluluğundadır. İninal Sözleşme’de
          ve/veya kart özelliklerinde Kullanıcı’ya değişikliğin kapsamını
          ve/veya bu değişikliklerin yürürlük tarihini bildirir. Kullanıcı’nın
          yürürlük tarihine kadar ilave ücret ödemeden Sözleşmeyi fesih hakkı
          vardır. Yürürlük tarihine kadar fesih hakkını kullanmaması halinde
          Kullanıcı değişikliği kabul etmiş sayılır. Ayrıca, İninal’ın, Sözleşme
          ve Sözleşmenin ayrılmaz parçası olan ve atıf yapılan
          açıklamaları/açıklamaları tek taraflı olarak değiştirme, güncelleme
          hakkı saklıdır. Ancak söz konusu değişiklikler yahut mevzuat ile
          belirlenen/belirlenecek yükümlülükler kapsamında uygulamada yapılacak
          değişiklikler işbu Sözleşme koşullarında bir değişikliğe sebep olacak
          ise, Kullanıcıya ilgili değişikliğin yürürlüğe girmesinden 30 (otuz)
          gün öncesinde değişikliğin kapsamı, yürürlük tarihi ve Kullanıcının
          Sözleşme’yi fesih hakkına ilişkin bilgileri içeren bir bildirim
          yapılacaktır. Bu durumda Kullanıcı Sözleşme’yi feshedebilecektir. 30
          (otuz) günlük süre içinde fesih bildiriminde bulunmaması halinde,
          Kullanıcının ilgili değişikliği kabul ettiği varsayılacaktır. Bu
          durumda Kullanıcı, İninal’dan herhangi bir talep hakkı olmayacağını
          kabul eder. Mevzuat kapsamında gereken herhangi bir değişiklik için
          ilgili mevzuatta 30 (otuz) günden daha kısa süre verilmesi halinde bu
          husus Kullanıcıya iletilecek bildirimde belirtilecek ve işbu maddede
          belirtilen süre yerine mevzuatın öngördüğü süre uygulanacaktır.
        </p>
        <p>
          6.11 Kullanıcı, Sözleşme ile Sözleşme’den doğan hak ve
          yükümlülüklerini kısmen veya tamamen üçüncü kişilere devir ve temlik
          edemez.
        </p>
        <p>
          6.12 Kullanıcı’nın, iletişim bilgilerinde meydana gelen değişiklikleri
          derhal İninal’ın bildireceği kanallardan ya da açmış olduğu üyelik
          kaydı üzerinden güncellemesi gerekmektedir. Aksi halde eski iletişim
          bilgilerine yapılacak bildirimler geçerli kabul edilecektir. Ayrıca,
          Kullanıcının işbu Sözleşme ile yürürlükte bulunan düzenlemelere aykırı
          hareket etmesi nedeniyle İninal’ın mahkum edileceği ve/veya maruz
          kalacağı her türlü ceza, masraf ve tazminat vb. mali yükümlülükleri
          (her türlü doğrudan ve dolaylı zararlar ve Kurum tarafından
          uygulanabilecek yaptırımlar dahil) hiçbir hüküm istihsaline gerek
          kalmadan ve İninal’ın ilk yazılı talebini takip eden 10 (on) gün
          içinde Kullanıcı karşılayacağını kabul, beyan ve taahhüt eder.
        </p>
        <p>
          6.13 Sözleşme kapsamındaki kart kullanımına ilişkin her türlü
          ihtilafta İninal’ın kendi veri tabanında, sunucularında tuttuğu
          elektronik ve sistem kayıtlarının, ticari kayıtlarının, defter
        </p>
        <p class="page_number">Sayfa 11 / 12</p>
      </div>
    </page>

    <page size="A4">
      <div class="border">
        <p>
          kayıtlarının, mikrofilm, mikrofiş ve bilgisayar kayıtları delil teşkil
          edecek olup, Sözleşme’nin tarafları bu maddenin H.M.K. Madde 193
          anlamında bir delil sözleşmesi teşkil ettiğini kabul ederler.
        </p>
        <p>
          6.14 Kullanıcı, kendi adına ve kendi hesabına hareket ettiğini,
          başkası hesabına hareket etmesi halinde 5549 sayılı Kanun’a uygun
          olarak İninal’a yazılı olarak bildireceğini ve sistemde kayıtlı
          hattını 3. kişiye devretmesi halinde kimlik, iletişim ve diğer kimlik
          tespitine konu bilgilerinin değişmesi halinde bu durumu İninal’a
          yazılı olarak bildireceğini ve Kullanıcının işbu madde kapsamındaki
          bildirimine istinaden, İninal tarafından kimlik tespit/ bilgi temin
          talebinde bulunulabileceğini kabul eder. Aksi halde Kullanıcı,
          İninal’ın Kullanıcı nezdinde gerçekleşen yetkisiz, hatalı işlemler, 3.
          kişilerin haksız, hukuka aykırı kullanımı vb. işlemler dahil hiçbir
          hukuki /cezai sorumluluğunun olmayacağını, işbu Sözleşmeyi tek taraflı
          olarak fesih etme hakkı bulunduğunu kabul ve beyan eder.
        </p>
        <p>
          6.15 Sözleşmenin feshi veya herhangi bir nedenle sona ermesi,
          Taraflar’ın fesih tarihinden önceki yükümlülüklerini ortadan
          kaldırmaz. Taraflar’ın işbu Sözleşme’de yer alan gizlilik ve bilgi
          güvenliğine ilişkin yükümlülükleri Sözleşme’nin sona ermesi veya
          feshinden sonra da devam edecektir. İşbu Sözleşme’den kaynaklanan her
          türlü hukuki uyuşmazlığın çözümünde İstanbul Çağlayan Mahkemeleri ve
          İcra Daireleri yetkilidir.
        </p>
        <p>
          Bu sözleşme kapsamında kullanıcı her türlü hesabında kendi adına ve
          hesabına hareket ettiğini tüzel ya da gerçek başka kişi adına ya da
          hesabına hareket etmediğini beyan eder. Başka kişi adına ya da
          hesabına hareket edilen hallerde, 5549 sayılı Kanun’un 15. maddesine
          uygun olarak, hesabına işlem yapılan tüzel ya da gerçek kişinin kimlik
          bilgileri derhal ve yazılı olarak İninal’a bildirilir.
        </p>
        <p>
          İşbu Sözleşmeyi imzalamaya ve yukarıda belirtilen işlemi yapmaya ehil
          olduğumu, sözleşmeyi okuyup anladığımı bu kapsamda yukarıdaki bilgi ve
          hükümler çerçevesinde işlem yapılmasını kabul ettiğimi beyan ederim.
          İşbu Sözleşme 5651 sayılı Kanun gereğince Kullanıcının işbu
          Sözleşme'yi anladığını ve kabul ettiğini beyan ettiğine yönelik olarak
          gerçekleştirdiği “Sistemsel Onay” dahilinde veya “İmza” dahilinde veya
          “Kullanıcı Limit Artırım Talebi Sözleşmesi”nin imzalanması dahilinde
          yürürlüğe girer.
        </p>
        <p>
          İşbu Sözleşmeyi imzalamaya ve yukarıda belirtilen işlemi yapmaya ehil
          olduğumu, sözleşmeyi okuyup anladığımı bu kapsamda yukarıdaki bilgi ve
          hükümler çerçevesinde işlem yapılmasını kabul ettiğimi beyan ederim.
        </p>
        <table style="border-spacing: 0; width: 100%; font-size: 14px;">
          <tr>
            <td
              style="border: 1px solid; border-bottom: none; padding: 5px; height: 30px;"
            >
              Müşterinin Adı Soyadı:
            </td>
          </tr>
          <tr>
            <td
              style="border: 1px solid; border-top: none; padding: 5px; height: 30px;"
            >
              TC Kimlik No:
            </td>
          </tr>
          <tr>
            <td
              style="border: 1px solid; border-top: 0; height: 150px; vertical-align: top; width: 50%; padding: 5px"
            >
              Digital İmza
            </td>
            <td
              style="border: 1px solid; height: 150px; vertical-align: top; border-left: 0; padding: 5px;"
            >
              Digital İmza
            </td>
          </tr>
        </table>

        <p class="page_number">Sayfa 12 / 12</p>
      </div>
    </page>
  </body>
</html>`;
