import { media } from "@/lib/media";
import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "mimari-tasarim",
    number: "01",
    title: "Mimari Tasarım",
    summary: "Arsanın ışığı, yapının oturuşu ve gündelik dolaşım tek bir planda buluşur.",
    description: [
      "Mimari tasarım, cepheyi süslemekten önce yerin nasıl okunacağıdır. Güneş, rüzgâr, komşu yapı ve eşik, planın ilk çizgileridir.",
      "SOLA’nın bu hizmeti; yeni yapı, ek ve yerleşim kararlarını aynı ölçü disiplini içinde ilerletir. Çizim, anlatılması zor bir fikrin değil, birlikte karar verilmiş bir düzenin kaydıdır.",
    ],
    scope: [
      "Yer okuması ve yerleşim alternatifleri",
      "Ön proje, kesin proje ve uygulama çizimleri",
      "Kesit, cephe ve malzeme notları",
      "Belediye ve danışman ekiplerle koordinasyon",
    ],
    approach: [
      "İlk toplantıda çözüm vaat edilmez. Parsel gezilir, varsa mevcut yapı ölçülür, günün farklı saatlerindeki ışık not edilir.",
      "Alternatifler çok sayıda üretilip seyreltilmez. İki ya da üç güçlü yerleşim, aynı kriterlerle karşılaştırılır: ışık, mahremiyet, maliyet ve yapım kolaylığı.",
    ],
    process: [
      { title: "Yer", text: "Arsa, imar ve mevcut izler birlikte okunur." },
      { title: "Yerleşim", text: "Kütle, avlu ve giriş az sayıda alternatifte netleşir." },
      { title: "Çizim", text: "Plan, kesit ve cephe aynı kararı tekrar eder." },
      { title: "Uygulama", text: "Detay ve malzeme notları şantiyeye aynı dille gider." },
    ],
    faqs: [
      {
        question: "Mimari tasarım ne zaman başlar?",
        answer:
          "Parsel, mevcut yapı ya da net bir program olduğunda başlar. Henüz arsa yoksa önce ihtiyaç notu çıkarılır; çizim acele edilmez.",
      },
      {
        question: "Uygulama projesi bu hizmetin içinde midir?",
        answer:
          "Evet. Ön proje onaylandıktan sonra uygulama çizimleri, malzeme notları ve danışman koordinasyonu aynı işin devamıdır.",
      },
      {
        question: "İç mimarlık ayrıca mı yürür?",
        answer:
          "Yapının kabuğu ile iç mekân aynı anda düşünülür. Ayrıntılı sabit mobilya ve malzeme işi, iç mimarlık hizmetinde derinleşir.",
      },
    ],
    image: media(
      "concrete",
      "Cam ve beyaz kaplamalı, açılı kütleli bir yapı.",
    ),
    relatedProjectSlugs: ["sahil-konutu", "yali-evi", "zeytin-evi"],
  },
  {
    slug: "ic-mimarlik",
    number: "02",
    title: "İç Mimarlık",
    summary: "Işık, sabit mobilya ve gündelik kullanım, duvar renginden önce kurulur.",
    description: [
      "İç mimarlık, boş bir hacme eşya dizmek değildir. Eşikler, depolama, oturma yüksekliği ve ışığın duvara değdiği yer birlikte çizilir.",
      "Bu hizmet, yeni yapıların içini olduğu gibi mevcut daire ve ofislerin yeniden düzenini de kapsar. Amaç, mekânı daha dolu göstermek değil, daha okunur kılmaktır.",
    ],
    scope: [
      "İç yerleşim ve sabit mobilya",
      "Malzeme, döşeme ve aydınlatma paleti",
      "Islak hacim ve mutfak düzeni",
      "Uygulama çizimleri ve numune takibi",
    ],
    approach: [
      "Palet erken daraltılır. Bir mekânda birbirine rakip üç malzeme olmaz.",
      "Aydınlatma, mobilya planı bittikten sonra eklenmez. Masa, okuma köşesi ve gece dolaşımı ayrı katmanlardır.",
    ],
    process: [
      { title: "Gün", text: "Evin ya da ofisin gerçek ritmi dinlenir." },
      { title: "Plan", text: "Dolaşım, depolama ve oturma aynı çizimde çözülür." },
      { title: "Numune", text: "Malzemeler gün ışığında ve akşam ışığında görülür." },
      { title: "Yerleşim", text: "Sabit işler biter, gevşek eşya en sona kalır." },
    ],
    faqs: [
      {
        question: "Yalnızca mobilya seçimi yapıyor musunuz?",
        answer:
          "Hayır. İş, yerleşim ve sabit elemanlarla başlar. Gevşek mobilya, bu iskelet kurulduktan sonra seçilir.",
      },
      {
        question: "Mevcut bir dairede ne kadar müdahale gerekir?",
        answer:
          "Her dairede yıkım gerekmez. Işık, depolama ve ıslak hacim doğruysa müdahale ince kalabilir. Karar, keşif notundan sonra verilir.",
      },
      {
        question: "Görseller karar için yeterli midir?",
        answer:
          "Görseller yön gösterir. Nihai karar, numune ve yerinde ışık ile verilir.",
      },
    ],
    image: media(
      "living-linen",
      "Açık tonlu, sade bir oturma odası.",
    ),
    relatedProjectSlugs: ["nord-isik", "loft-yedi", "gun-mutfagi"],
  },
  {
    slug: "villa-tasarimi",
    number: "03",
    title: "Villa ve Konut Tasarımı",
    summary: "Yazlık ile sürekli ev arasındaki fark, planın ilk gününde konuşulur.",
    description: [
      "Villa tasarımı, manzarayı her odaya dağıtmak değildir. Hangi saatin dışarıda, hangi saatin içeride geçeceği planı belirler.",
      "Konut işlerinde mahremiyet, servis ve misafir aynı kapıdan geçmek zorunda değildir. Eşikler, evin ölçüsünü büyümeden kurar.",
    ],
    scope: [
      "Yerleşim, avlu ve saçak kararları",
      "Konut planı ve cephe düzeni",
      "Peyzaj eşiği ile yapının ilişkisi",
      "İç mimari ile eşzamanlı malzeme paleti",
    ],
    approach: [
      "Ağaç, eğim ve rüzgâr, program kadar bağlayıcıdır. Kütle bunlara göre parçalanır ya da toplanır.",
      "Büyük cam, ancak gölgesi çözülmüşse önerilir. Aksi halde manzara, yazın kullanılamayan bir duvar olur.",
    ],
    process: [
      { title: "Parsel", text: "Eğim, rüzgâr ve mevcut bitki örtüsü not edilir." },
      { title: "Program", text: "Sürekli yaşam ile mevsimlik kullanım ayrılır." },
      { title: "Kütle", text: "Avlu, saçak ve kat yüksekliği birlikte kurulur." },
      { title: "İç", text: "Mutfak, eşik ve özel odalar aynı planda netleşir." },
    ],
    faqs: [
      {
        question: "Villa ile apartman dairesi aynı hizmet midir?",
        answer:
          "Hayır. Villa işi yer, saçak ve dış mekânla birlikte yürür. Daire işi iç mimarlık kapsamında ele alınır.",
      },
      {
        question: "Peyzajı da çiziyor musunuz?",
        answer:
          "Yapının eşiği, avlu ve sert zemin bu işin parçasıdır. Geniş peyzaj projesi gerektiğinde ayrı bir danışmanla birlikte ilerlenir.",
      },
      {
        question: "İmar durumu yoksa başlanır mı?",
        answer:
          "İmar notu olmadan kütle kesinleşmez. Önce okuma yapılır, çizim sınırı bilindikten sonra ilerlenir.",
      },
    ],
    image: media(
      "villa-dusk",
      "Havuzlu beyaz bir villa.",
    ),
    relatedProjectSlugs: ["yali-evi", "zeytin-evi", "sahil-konutu"],
  },
  {
    slug: "ticari-mekan-tasarimi",
    number: "04",
    title: "Ticari Mekân Tasarımı",
    summary: "Vitrin, çalışma ve servis birbirine karışmadan aynı adreste durur.",
    description: [
      "Ticari mekân, markanın duvara basılmış hali değildir. Müşterinin ritmi ile ekibin ritmi ayrı eşiklerden geçer.",
      "Ofis, atölye ve satış alanı aynı reçeteyle çözülmez. Her birinde akustik, depolama ve ışık farklı bir iş görür.",
    ],
    scope: [
      "Program ve kullanıcı akışı",
      "Çalışma, karşılama ve servis ayrımı",
      "Malzeme, aydınlatma ve akustik",
      "Uygulama çizimleri ve yerinde kontrol",
    ],
    approach: [
      "Önce bir günün senaryosu yazılır: kim girer, nerede durur, nerede uzun kalır.",
      "Görsel kimlik, mekânın tamamını boyamaz. Az yüzeyde, doğru malzemede kalır.",
    ],
    process: [
      { title: "Ritim", text: "Müşteri, ekip ve servis ayrı izler olarak çizilir." },
      { title: "Eşik", text: "Vitrin ile derin çalışma birbirinden ayrılır." },
      { title: "Ses", text: "Tavan, masa aralığı ve bölücü birlikte düşünülür." },
      { title: "Uygulama", text: "İş yeri açıkken sürecek bir takvim kurulur." },
    ],
    faqs: [
      {
        question: "İş yeri çalışırken uygulama olur mu?",
        answer:
          "Olabilir. İş, etaplara bölünür. Hangi gün hangi bölgenin kapanacağı baştan yazılır.",
      },
      {
        question: "Marka kimliğini siz mi üretiyorsunuz?",
        answer:
          "Hayır. Grafik kimlik ayrıca yürür. Mekân, bu kimliğin taşınacağı yüzeyi ve ölçüyü kurar.",
      },
      {
        question: "Küçük bir dükkân için de çalışır mısınız?",
        answer:
          "Ölçekten çok, mekânın bir karar gerektirmesi önemlidir. Kısa bir keşif notu bunun için yeterlidir.",
      },
    ],
    image: media(
      "office",
      "Aydınlık bir çalışma mekânı.",
    ),
    relatedProjectSlugs: ["atolye-on-iki", "linye-ofis"],
  },
  {
    slug: "renovasyon",
    number: "05",
    title: "Renovasyon ve Dönüşüm",
    summary: "Eski iz korunur. Yeni olan, kendisini eski olanın yerine koymaz.",
    description: [
      "Renovasyon, yapıyı yeni göstermek için değil, bugün kullanılabilir kılmak için yapılır. Korunan, onarılan ve eklenen parçalar çizimde ayrı durur.",
      "Bu hizmet, daire içinden avlu evine kadar değişen ölçeklerde yürür. Her işte ilk belge, müdahale haritasıdır.",
    ],
    scope: [
      "Mevcut yapı okuması",
      "Koruma, onarım ve ek ayrımı",
      "Yeni tesisat ve ıslak hacim stratejisi",
      "Uygulama çizimleri ve şantiye notları",
    ],
    approach: [
      "Yıkım, bir başlangıç coşkusu değildir. Ancak taşıyıcı, ışık ya da kullanım gerçekten tıkanmışsa önerilir.",
      "Yeni malzeme, eski malzemenin taklidi olmaz. Yan yana durur, ikisi de okunur.",
    ],
    process: [
      { title: "Okuma", text: "Yapının izi, hasarı ve potansiyeli yazılır." },
      { title: "Harita", text: "Korunan, onarılan ve eklenen ayrılır." },
      { title: "Ek", text: "Yeni hacim, eski siluetin gerisinde kalır." },
      { title: "Şantiye", text: "Sökülen her parça not edilir, sürpriz kayıt altına alınır." },
    ],
    faqs: [
      {
        question: "Ruhsatlı bir yapı şart mıdır?",
        answer:
          "Çizimden önce yasal durum bilinmelidir. Kaçak ya da belirsiz kısımlar, işin kapsamına girmeden önce açıklığa kavuşur.",
      },
      {
        question: "Tarihi yapı da çalışıyor musunuz?",
        answer:
          "Tescilli yapılarda koruma kurulu ve ilgili uzmanlarla birlikte ilerlenir.",
      },
      {
        question: "İç mimarlık renovasyondan ayrı mıdır?",
        answer:
          "Kabuk değişiyorsa renovasyon öndedir. Yalnızca iç düzen değişiyorsa iç mimarlık yeterlidir. Sınır, keşifte netleşir.",
      },
    ],
    image: media(
      "stone-house",
      "Avlulu, verandalı beyaz bir ev.",
    ),
    relatedProjectSlugs: ["tas-avlu", "kuyu-avlu"],
  },
  {
    slug: "mimari-gorsellestirme",
    number: "06",
    title: "3D Mimari Görselleştirme",
    summary: "Görsel bir afiş değil, ışığın ve ölçünün kontrolüdür.",
    description: [
      "Görselleştirme, henüz kurulmamış bir mekânı abartmak için değil, kararı görmek için kullanılır. Malzeme, gölge ve açıklık burada sınanır.",
      "Bu hizmet tek başına bir katalog üretimi değildir. Tasarım süreci içindeki kontrol araçlarından biridir. Çizim yoksa, görsel de erken kalır.",
    ],
    scope: [
      "Kütle ve iç mekân modelleri",
      "Gün ışığı ve akşam ışığı denemeleri",
      "Malzeme alternatiflerinin karşılaştırması",
      "Sunum paftaları",
    ],
    approach: [
      "Kamera, mekânı olduğundan büyük göstermez. Göz yüksekliği ve gerçek açıklık ölçüleri korunur.",
      "Bitki, eşya ve ışık, tasarım kararını örtmez. Görsel, plandaki seçimi doğrulamalıdır.",
    ],
    process: [
      { title: "Model", text: "Onaylı plandan, süslü bir tahminden değil." },
      { title: "Işık", text: "Sabah, öğle ve akşam ayrı ayrı bakılır." },
      { title: "Malzeme", text: "İki alternatif yan yana, aynı kadrajda durur." },
      { title: "Revizyon", text: "Görsel, çizim değiştikçe güncellenir." },
    ],
    faqs: [
      {
        question: "Yalnızca görsel üretimi alınabilir mi?",
        answer:
          "Ölçülü bir model ve net bir malzeme notu varsa alınabilir. Eskiz düzeyindeki bir fikir, fotogerçekçi bir sonuç gibi sunulmaz.",
      },
      {
        question: "Görseller uygulama garantisi midir?",
        answer:
          "Hayır. Görsel, karar vermeyi kolaylaştırır. Uygulamadaki işçilik ve numune ayrıca kontrol edilir.",
      },
      {
        question: "Kaç revizyon vardır?",
        answer:
          "Işık ve malzeme için sınırlı, kayıtlı revizyon turu tanımlanır. Kapsam baştan yazılır.",
      },
    ],
    image: media(
      "material",
      "Yüksek pencereli, ahşap merdivenli bir yaşam alanı.",
    ),
    relatedProjectSlugs: ["nord-isik", "zeytin-evi", "sahil-konutu"],
  },
];
