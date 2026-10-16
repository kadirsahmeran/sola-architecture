import { media } from "@/lib/media";
import type { Post } from "@/types/content";

export const posts: Post[] = [
  {
    slug: "isik-bir-malzemedir",
    title: "Işık Bir Malzemedir",
    excerpt:
      "Pencere bir delik değil, mekânın gün içindeki halini kuran bir ölçü aletidir.",
    category: "Mimari Tasarım",
    publishedAt: "2026-02-12",
    updatedAt: "2026-03-02",
    author: "SOLA Yayın Masası",
    cover: media(
      "hero",
      "Alacakaranlıkta camlarından iç ışık görünen ahşap kaplamalı bir ev. Yazı kapağı.",
    ),
    relatedServiceSlugs: ["mimari-tasarim", "villa-tasarimi"],
    blocks: [
      {
        type: "p",
        text: "Bir mekânı ilk anda güzel gösteren şey çoğu zaman mobilya değildir. Işığın duvara değdiği saat, zemindeki gölgenin uzunluğu ve akşam olduğunda odanın hâlâ okunup okunmadığıdır. Bu yazı, pencereyi bir manzara çerçevesi gibi değil, bir malzeme gibi düşünmek için tutulmuş bir stüdyo notudur.",
      },
      { type: "h2", id: "yon", text: "Yön, programdan önce gelir" },
      {
        type: "p",
        text: "Kuzey ışığı sabırlıdır. Çizim, okuma ve uzun masa için uygundur. Güney ışığı ise cömert ve kontrolsüzdür; saçak, panjur ya da bir ağaç olmadan yazın içeri dolabilir. Batı, akşamı kızartır. Doğu, sabahı kısa tutar. Program bu yönlere göre yazılmazsa, en pahalı doğrama bile odayı kurtarmaz.",
      },
      {
        type: "p",
        text: "Yerleşim çalışırken ilk soru “manzara nerede?” değildir. “Bu oda günün hangi saatinde kullanılacak?” sorusu daha çok işe yarar. Yatak odasının erken ışığa, mutfağın ise uzun bir sabaha ihtiyacı olabilir. Çalışma köşesi, ekranın karşısına gelen batı penceresinden zarar görür.",
      },
      { type: "h2", id: "olcu", text: "Açıklığın ölçüsü" },
      {
        type: "p",
        text: "Yerden tavana cam, her işin doğru cevabı değildir. Açıklık büyüdükçe gölge, mahremiyet ve ısı da büyür. İyi bir pencere, baktığı yeri seçer. Bazen bir avlu duvarı, uzak bir denizden daha sakin bir manzaradır.",
      },
      {
        type: "h3",
        id: "golge",
        text: "Gölge sonradan eklenmez",
      },
      {
        type: "p",
        text: "Perde, hatalı bir saçağın örtüsü olmamalıdır. Saçak, ağaç, derin söve ya da bir avlu duvarı ışığı daha plan aşamasında yumuşatır. İçerideki tül, bu kararın yerine geçmez; yalnızca ince ayarını yapar.",
      },
      { type: "h2", id: "aksam", text: "Akşam başka bir mekândır" },
      {
        type: "p",
        text: "Gündüz doğru görünen bir oda, akşam tavandaki tek bir noktayla dağılabilir. Aydınlatma, mobilya bittikten sonra seçilen bir avize değildir. Duvarı yalayan bir ışık, masanın üzerindeki bir ışık ve gece dolaşımı için alçak bir ışık ayrı işler görür.",
      },
      {
        type: "p",
        text: "Görselleştirme tam da burada işe yarar: aynı kadrajın sabah, öğle ve akşam halleri. Amaç daha parlak bir resim değil, hangi saatin mekânı yorduğunu görmektir.",
      },
    ],
  },
  {
    slug: "esik-nedir",
    title: "Eşik, Kapıdan Daha Fazlasıdır",
    excerpt:
      "İyi bir iç mekân, odaları yan yana dizmez. Bir yerden diğerine geçişi hissettirir.",
    category: "İç Mimarlık",
    publishedAt: "2026-03-18",
    updatedAt: "2026-03-18",
    author: "SOLA Yayın Masası",
    cover: media("stairs", "Ahşap basamaklı bir merdiven. Yazı kapağı."),
    relatedServiceSlugs: ["ic-mimarlik"],
    blocks: [
      {
        type: "p",
        text: "Daire planlarında koridor çoğu zaman kaybedilmiş bir alan sayılır. Oysa eşik, iki farklı ritmi birbirine çarpmadan bağlayan yerdir. Ayakkabının durduğu çizgi, sesin alçaldığı nokta ve ışığın değiştiği adım burada kurulur.",
      },
      { type: "h2", id: "giris", text: "Giriş bir antre broşürü değildir" },
      {
        type: "p",
        text: "Kapı açıldığında tüm ev görünmek zorunda değildir. Kısa bir duvar, bir niş ya da zemindeki malzeme değişimi, içeri gireni bir an yavaşlatır. Bu yavaşlama gösteriş için değil, evin geri kalanını korumak içindir.",
      },
      {
        type: "p",
        text: "Depolama burada çözülmezse, yaşam alanına taşar. Palto, çanta ve mevsimlik eşya görünür bir askılıktan çok, kapının yanında biten bir dolapta daha sakin durur.",
      },
      { type: "h2", id: "gecis", text: "Malzeme geçişi" },
      {
        type: "p",
        text: "Taştan ahşaba, mat zeminden daha yumuşak bir yüzeye geçmek, kapı olmadan da bir eşik kurar. Geçişin derzi düzgünse, mekân bölünmüş değil, sıralanmış hisseder.",
      },
      { type: "h3", id: "ses", text: "Ses de bir eşiktir" },
      {
        type: "p",
        text: "Mutfak ile oturmanın aynı hacimde olması, sesin de ortak olması demek değildir. Tezgâhın yönü, masa ile ocak arasındaki mesafe ve yumuşak bir yüzey, görünmeyen bir kapı işlevi görür.",
      },
      { type: "h2", id: "olcu-esik", text: "Az eleman, net sınır" },
      {
        type: "p",
        text: "Eşik, daha fazla dekorasyon istemez. Bir kot farkı, bir saçak, bir dolap sırtı yeter. İç mimarlıkta sadelik, bu sınırların doğru yerde olmasından gelir.",
      },
    ],
  },
  {
    slug: "eski-yapiyi-okumak",
    title: "Eski Yapıyı Okumak",
    excerpt:
      "Renovasyon, yıkım listesiyle değil, korunacak izin haritasıyla başlar.",
    category: "Renovasyon",
    publishedAt: "2026-04-09",
    updatedAt: "2026-05-01",
    author: "SOLA Yayın Masası",
    cover: media(
      "city-arch",
      "Su kenarında, taş ve tuğla dokulu eski bir ev. Yazı kapağı.",
    ),
    relatedServiceSlugs: ["renovasyon", "ic-mimarlik"],
    blocks: [
      {
        type: "p",
        text: "Eski bir yapıya girildiğinde ilk dürtü, onu bugünün görüntüsüne benzetmektir. Bu dürtü çoğu zaman hem yapının karakterini hem de bütçeyi bozar. Okumak, beğenmekten önce gelir.",
      },
      { type: "h2", id: "uc-renk", text: "Üç renkli bir harita" },
      {
        type: "ul",
        items: [
          "Korunan: strüktür, taş, özgün doğrama, avlunun kotu.",
          "Onarılan: sıva, çatı, eşik, bozulmuş ama durması gereken parça.",
          "Eklenen: ıslak hacim, tesisat, gün ışığı yetmeyen oda, yeni eşik.",
        ],
      },
      {
        type: "p",
        text: "Bu üçlü ayrım çizimde renk olarak durur ve şantiyede de aynı adlarla anılır. Böylece “yenileme” kelimesi, her yüzeyi silmek anlamına gelmez.",
      },
      { type: "h2", id: "taklit", text: "Taklit eden malzeme" },
      {
        type: "p",
        text: "Eski taşın üzerine taş görünümlü bir kaplama yapıştırmak, yapıyı onarmaz. Yeni malzeme kendi zamanını söylemeli, eski malzemenin yanında durmalıdır. Meşe, eski ahşabın kopyası olmak zorunda değildir; tonu yakın, detayı ise bugüne ait olabilir.",
      },
      { type: "h2", id: "surpriz", text: "Şantiyedeki sürpriz" },
      {
        type: "p",
        text: "Söküm, çizimde görünmeyen bir hatıl, nem ya da zayıf bir döşeme çıkarabilir. İyi süreç, bunu başarısızlık saymaz. Not düşer, kapsamı günceller, işverene aynı hafta gösterir. Renovasyonda şeffaflık, sürprizi yok etmek değil, onu gizlemekten vazgeçmektir.",
      },
      { type: "h3", id: "belge", text: "Belge olmadan çizim olmaz" },
      {
        type: "p",
        text: "Ruhsat, tescil ve tapu durumu estetik bir ayrıntı değildir. Belirsiz bir yapıda güzel bir plan, uygulanamaz bir plan olabilir. Okumanın ilk sayfası budur.",
      },
    ],
  },
  {
    slug: "proje-briefi",
    title: "Bir Proje Brief’i Nasıl Yazılır?",
    excerpt:
      "İyi bir başlangıç dosyası, beğenilen görsellerden çok, günün nasıl yaşandığını anlatır.",
    category: "Proje Rehberleri",
    publishedAt: "2026-06-04",
    updatedAt: "2026-06-20",
    author: "SOLA Yayın Masası",
    cover: media(
      "detail",
      "İç mekânda malzeme ve birleşim detayı. Yazı kapağı.",
    ),
    relatedServiceSlugs: ["mimari-tasarim", "ic-mimarlik"],
    blocks: [
      {
        type: "p",
        text: "Stüdyoya gelen ilk not çoğu zaman bir moodboard’tur. Bu yararlıdır ama yeterli değildir. Brief, beğenilen köşelerin listesi değil, kısıtların ve gündelik ritmin yazıldığı kısa bir metindir.",
      },
      { type: "h2", id: "ritim", text: "Önce bir gün yazın" },
      {
        type: "p",
        text: "Sabah ilk ışığı kim alır, öğlen kim evdedir, akşam masa kaç kişiliktir? Bu üç cümle, pek çok plan kararını görsellerden daha hızlı netleştirir. Evde çalışan biri varsa, onun masası misafir yolunun üzerinde olmamalıdır.",
      },
      { type: "h2", id: "sinir", text: "Sınırları baştan koyun" },
      {
        type: "ul",
        items: [
          "Parsel ya da dairenin ölçüsü ve yönü",
          "Korunması istenen ağaç, duvar ya da eşya",
          "Yaklaşık bütçe aralığı, tek bir sayı olmasa da",
          "Taşınmak ya da açılmak istenen tarih",
          "Kesinlikle istenmeyenler: açık mutfak, yüksek eşik, koyu zemin",
        ],
      },
      { type: "h2", id: "gorsel", text: "Görseli nasıl eklemeli?" },
      {
        type: "p",
        text: "Beğenilen fotoğrafın altına tek bir cümle yazın: ışığı mı, boşluğu mu, yoksa bir malzemeyi mi seviyorsunuz? Bu cümle olmadan görsel, stüdyoyu yanlış bir yere götürebilir. Aynı koltuk, farklı bir planda bambaşka durur.",
      },
      { type: "h3", id: "kisa", text: "Kısa olsun" },
      {
        type: "p",
        text: "İki sayfa yeter. Uzun kataloglar, kararı geciktirir. Brief bir sözleşme değil, ilk konuşmanın zeminidir. Eksik kalan yer, birlikte sorulur.",
      },
    ],
  },
  {
    slug: "sakin-palet",
    title: "Sakin Bir Palet Nasıl Kurulur?",
    excerpt:
      "Trend bir renk yılı değil. Bir arada yaşlanabilen az sayıda malzeme.",
    category: "Tasarım Trendleri",
    publishedAt: "2026-08-14",
    updatedAt: "2026-09-01",
    author: "SOLA Yayın Masası",
    cover: media(
      "kitchen-oak",
      "Meşe doğrama ve sıcak tonlu bir mutfak. Yazı kapağı.",
    ),
    relatedServiceSlugs: ["ic-mimarlik", "mimari-gorsellestirme"],
    blocks: [
      {
        type: "p",
        text: "Her yıl yeni bir renk ilan edilir. Mekânlar bu kadar hızlı eskimez. Sakin bir palet, moda bir bej değil; ışıkta, elde ve tamirde birbirini tutan az sayıda malzemedir.",
      },
      { type: "h2", id: "uc", text: "Üçten fazla ana malzeme" },
      {
        type: "p",
        text: "Bir odada zemin, duvar ve tek bir doğrama malzemesi çoğu zaman yeter. Dördüncü malzeme, ancak bir iş görüyorsa girer: ıslak hacimde taş, eşikte metal, gölgede ahşap. Gerisi aksesuar olarak kalabilir ve sonra değişebilir.",
      },
      { type: "h2", id: "isik-palet", text: "Aynı numune, üç ışık" },
      {
        type: "p",
        text: "Mağaza ışığında sıcak duran bir taş, kuzey penceresinin önünde grileşebilir. Numuneyi sabah, öğleden sonra ve akşam lambasıyla görmek, katalogdaki adı okumaktan daha doğru bir karardır.",
      },
      { type: "h3", id: "tamir", text: "Tamir edilebilirlik" },
      {
        type: "p",
        text: "Masif ahşap çizilir ve yenilenir. Bazı kaplamalar ilk günden pürüzsüz, beş yıl sonra ise değiştirilmek zorundadır. Paletin sakinliği, ilk fotoğraftaki uyum kadar, on yıl sonraki tamirinde de belli olur.",
      },
      { type: "h2", id: "trend", text: "Trendi nereye koymalı?" },
      {
        type: "p",
        text: "Değişebilir şeylere: tekstil, seramik obje, bir kapı kolunun ince detayı. Duvar, zemin ve sabit mobilya daha yavaş bir zamana ait olmalıdır. Böylece mekân, bir yıla değil, içinde geçecek günlere benzer.",
      },
    ],
  },
];
