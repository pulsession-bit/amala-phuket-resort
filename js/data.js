// Resort Accommodations, Dining, and Experiences Data
const CURRENCY_RATES = {
  EUR: { symbol: "€", rate: 1 / 38.5, code: "EUR" },
  THB: { symbol: "฿", rate: 1, code: "THB" },
  USD: { symbol: "$", rate: 1 / 35.5, code: "USD" }
};

let currentCurrency = "EUR";
let currentLang = "fr";

const RESORT_CONTACT = {
  phone: "+66 76 390 906",
  whatsapp: "+66953362244",
  whatsappFormatted: "+66 95 336 2244",
  email: "info@amalagrandbleu.com",
  address: "Kamala Hillside, Kathu District, Phuket 83120, Thailand"
};

const VILLAS_DATA = [
  {
    id: "deluxe-partial-seaview-pool-suite",
    category: "seaview",
    title: {
      fr: "Deluxe Partial Seaview Pool Suite",
      en: "Deluxe Partial Seaview Pool Suite",
      th: "ดีลักซ์ พาร์เชียล ซีวิว พูลสวีท"
    },
    shortDesc: {
      fr: "Suite élégante de 65 m² avec terrasse privative, piscine plongeante intime et vue partielle sur la baie turquoise de Kamala.",
      en: "Refined 65 sqm suite featuring private terrace, secluded plunge pool, and partial vistas of turquoise Kamala Bay.",
      th: "สวีทหรูขนาด 65 ตร.ม. พร้อมสระว่ายน้ำส่วนตัวและวิวทะเลบางส่วนของอ่าวกมลา"
    },
    longDesc: {
      fr: "Un havre d'intimité idéal pour les couples. Profitez de votre piscine privative sur terrasse en teck, d'un lit King Size ultra-confortable, d'une salle de bain moderne avec baignoire balnéo et des senteurs de la forêt tropicale environnante.",
      en: "An intimate sanctuary crafted for romantic getaways. Relax in your private teak deck plunge pool, ultra-plush King bed, and modern spa bathroom surrounded by lush tropical greenery.",
      th: "สวรรค์แห่งการพักผ่อนสำหรับคู่รัก ผ่อนคลายในสระว่ายน้ำส่วนตัวบนระเบียงไม้สัก เตียงคิงไซส์ และห้องน้ำสไตล์สปา"
    },
    priceTHB: 4800,
    size: "65 m²",
    guests: "2 Adultes",
    bed: "1 Lit King Size",
    view: {
      fr: "Vue Mer Partielle",
      en: "Partial Ocean View",
      th: "วิวทะเลบางส่วน"
    },
    image: "assets/images/deluxe-suite.jpg",
    features: [
      { fr: "Piscine privée sur terrasse", en: "Private terrace plunge pool", th: "สระว่ายน้ำส่วนตัวบนระเบียง" },
      { fr: "Baignoire Spa jacuzzi & douche pluie", en: "Jacuzzi spa tub & rain shower", th: "อ่างจากุซซี่และเรนชาวเวอร์" },
      { fr: "Climatisation silencieuse individuelle", en: "Individual silent A/C", th: "เครื่องปรับอากาศเงียบสนิท" },
      { fr: "Wi-Fi fibre optique gratuit", en: "Free high-speed fiber Wi-Fi", th: "อินเทอร์เน็ตไวไฟความเร็วสูง" },
      { fr: "Machine à espresso & minibar", en: "Espresso machine & minibar", th: "เครื่องชงกาแฟและมินิบาร์" },
      { fr: "Service de chambre 07:00 - 22:30", en: "Room service 7 AM - 10:30 PM", th: "รูมเซอร์วิส 07:00 - 22:30 น." }
    ]
  },
  {
    id: "grand-seaview-pool-suite",
    category: "seaview",
    title: {
      fr: "Grand Seaview Pool Suite",
      en: "Grand Seaview Pool Suite",
      th: "แกรนด์ ซีวิว พูลสวีท"
    },
    shortDesc: {
      fr: "Suite panoramique de 85 m² avec piscine à débordement suspendue et vue imprenable à 180° sur la mer d'Andaman et le coucher de soleil.",
      en: "Spectacular 85 sqm suite with suspended infinity pool and unobstructed 180° panoramic views of the Andaman Sea.",
      th: "ห้องพักวิวพาโนรามา 85 ตร.ม. พร้อมสระว่ายน้ำอินฟินิตี้และวิวทะเลอันดามัน 180 องศา"
    },
    longDesc: {
      fr: "La signature emblématique de l'Amala Grand Bleu Resort. Admirez les couchers de soleil dorés directement depuis votre piscine privée à débordement. Comprend un grand salon panoramique, des bains de soleil extérieurs et un jacuzzi vue mer.",
      en: "The signature retreat of Amala Grand Bleu Resort. Witness world-class Andaman sunsets directly from your private infinity pool deck. Features an open-concept lounge, sun loungers, and deep oceanview jacuzzi tub.",
      th: "ห้องพักซิกเนเจอร์อันเป็นเอกลักษณ์ ชมวิวพระอาทิตย์ตกดินจากสระว่ายน้ำส่วนตัว พร้อมพื้นที่นั่งเล่นกว้างขวางและอ่างจากุซซี่"
    },
    priceTHB: 6900,
    size: "85 m²",
    guests: "2 à 3 Adultes",
    bed: "1 Lit King + Canapé Lounge",
    view: {
      fr: "Vue Mer Panoramique 180°",
      en: "180° Panoramic Ocean View",
      th: "วิวทะเลพาโนรามา 180 องศา"
    },
    image: "assets/images/hero.jpg",
    features: [
      { fr: "Piscine privée à débordement face à la mer", en: "Private oceanfront infinity pool", th: "สระว่ายน้ำอินฟินิตี้ส่วนตัววิวทะเล" },
      { fr: "Terrasse panoramique avec transats", en: "Panoramic sun deck with loungers", th: "ระเบียงชมวิวพร้อมเตียงอาบแดด" },
      { fr: "Baignoire balnéo jacuzzi vue mer", en: "Oceanview jacuzzi tub", th: "อ่างจากุซซี่ชมวิวทะเล" },
      { fr: "Smart TV 55\" avec Netflix", en: "55\" Smart TV with Netflix", th: "สมาร์ททีวี 55 นิ้ว" },
      { fr: "Service petit-déjeuner flottant disponible", en: "Floating breakfast service available", th: "บริการอาหารเช้าลอยน้ำ" },
      { fr: "Navette express offerte pour Kamala & Patong", en: "Complimentary Kamala & Patong shuttle", th: "บริการรถรับส่งฟรี" }
    ]
  },
  {
    id: "garden-view-pool-suite",
    category: "suites",
    title: {
      fr: "Garden View Pool Suite",
      en: "Garden View Pool Suite",
      th: "การ์เดน วิว พูลสวีท"
    },
    shortDesc: {
      fr: "Oasis tropicale de 60 m² entourée de jardins exotiques luxuriants avec piscine privée et intimité absolue.",
      en: "Serene 60 sqm tropical haven enveloped in lush exotic gardens with secluded plunge pool.",
      th: "โอเอซิสเขตร้อนขนาด 60 ตร.ม. ท่ามกลางสวนธรรมชาติอันร่มรื่น พร้อมสระว่ายน้ำส่วนตัว"
    },
    longDesc: {
      fr: "Plongez dans la sérénité végétale des collines de Phuket. Cette suite offre un calme incomparable à l'abri des regards avec une piscine privative immergée dans un écrin de fleurs tropicales et de palmiers.",
      en: "Immerse yourself in verdant rainforest tranquility. Offers absolute seclusion with a private plunge pool nestled amidst vibrant bougainvillea, orchids, and tropical palms.",
      th: "สัมผัสความเงียบสงบท่ามกลางธรรมชาติ สระว่ายน้ำส่วนตัวที่รายล้อมด้วยสวนเมืองร้อนและต้นไม้นานาพันธุ์"
    },
    priceTHB: 4200,
    size: "60 m²",
    guests: "2 Adultes",
    bed: "1 Lit King Size",
    view: {
      fr: "Vue Jardin Tropical",
      en: "Tropical Garden View",
      th: "วิวสวนเขตร้อน"
    },
    image: "assets/images/deluxe-suite.jpg",
    features: [
      { fr: "Piscine privée intimiste en terrasse", en: "Secluded private terrace pool", th: "สระว่ายน้ำส่วนตัวบนระเบียง" },
      { fr: "Jardin tropical privatif", en: "Private tropical garden corner", th: "มุมสวนธรรมชาติส่วนตัว" },
      { fr: "Douche italienne à effet de pluie", en: "Walk-in tropical rain shower", th: "เรนชาวเวอร์สไตล์ทรอปิคอล" },
      { fr: "Climatisation & Wi-Fi haut débit", en: "Air conditioning & fast Wi-Fi", th: "เครื่องปรับอากาศและไวไฟความเร็วสูง" }
    ]
  },
  {
    id: "two-bedroom-seaview-pool-villa",
    category: "grand",
    title: {
      fr: "Two Bedroom Seaview Pool Villa",
      en: "Two Bedroom Seaview Pool Villa",
      th: "ทูเบดรูม ซีวิว พูลวิลล่า"
    },
    shortDesc: {
      fr: "Superbe villa familiale de 160 m² avec 2 chambres spacieuses, grand salon, terrasse panoramique et piscine privée vue mer.",
      en: "Expansive 160 sqm 2-bedroom pool villa with grand living lounge, panoramic deck, and private sea-facing pool.",
      th: "วิลล่าสำหรับครอบครัวขนาด 160 ตร.ม. 2 ห้องนอนใหญ่ สระว่ายน้ำส่วนตัวและวิวทะเลกว้างไกล"
    },
    longDesc: {
      fr: "Conçue pour les petites familles ou deux couples d'amis, cette villa dispose de deux chambres de maître avec salles de bains privatives, d'un espace lounge décloisonné et d'une belle piscine privée face à l'océan.",
      en: "Crafted for families or couples traveling together, offering two en-suite master bedrooms, open-plan living lounge, and a generous private pool gazing out over the Andaman Sea.",
      th: "ออกแบบสำหรับครอบครัวหรือกลุ่มเพื่อน 2 ห้องนอนใหญ่พร้อมห้องน้ำในตัว สระว่ายน้ำส่วนตัวขนาดใหญ่และวิวทะเล"
    },
    priceTHB: 11500,
    size: "160 m²",
    guests: "4 à 5 Personnes",
    bed: "2 Lits King Size",
    view: {
      fr: "Vue Mer Panoramique",
      en: "Panoramic Ocean View",
      th: "วิวทะเลพาโนรามา"
    },
    image: "assets/images/floating-breakfast.jpg",
    features: [
      { fr: "Piscine privée face à l'océan", en: "Private sea-facing pool", th: "สระว่ายน้ำส่วนตัววิวทะเล" },
      { fr: "2 chambres indépendantes avec salle de bain", en: "2 master bedrooms with en-suite baths", th: "2 ห้องนอนใหญ่พร้อมห้องน้ำในตัว" },
      { fr: "Grand salon & terrasse extérieure", en: "Spacious lounge & outdoor deck", th: "ห้องนั่งเล่นกว้างขวางและระเบียง" },
      { fr: "Navette quotidienne offerte", en: "Complimentary daily shuttle", th: "บริการรถรับส่งฟรีทุกวัน" }
    ]
  },
  {
    id: "four-bedroom-seaview-pool-villa",
    category: "grand",
    title: {
      fr: "Four Bedroom Seaview Pool Villa Royale",
      en: "Four Bedroom Seaview Pool Villa Royale",
      th: "โฟร์เบดรูม ซีวิว พูลวิลล่า รอยัล"
    },
    shortDesc: {
      fr: "Résidence de prestige sur 2 niveaux (280 m²) avec 4 suites privatives, immense piscine à débordement de 14m et vue féerique sur tout le golfe.",
      en: "Prestigious two-story 280 sqm villa featuring 4 en-suite suites, 14m grand infinity pool, and breathtaking hilltop bay vistas.",
      th: "คฤหาสน์วิลล่าหรู 2 ชั้น ขนาด 280 ตร.ม. 4 ห้องนอน สระว่ายน้ำยาว 14 เมตรและวิวอ่าวกมลาแบบพาโนรามา"
    },
    longDesc: {
      fr: "La quintessence du luxe à Kamala. Conçue pour les réunions de famille d'exception ou les séjours entre amis, cette villa d'architecte propose 4 chambres indépendantes de prestige, une cuisine moderne, un salon de réception, un espace barbecue et une immense piscine privée à débordement.",
      en: "The pinnacle of bespoke tropical luxury. Designed for family gatherings or celebrations, offering 4 private master suites, contemporary kitchen, entertainment lounge, barbecue terrace, and majestic infinity pool.",
      th: "ที่สุดแห่งความหรูหรา 4 ห้องนอนมาสเตอร์สวีท สระว่ายน้ำอินฟินิตี้ขนาดใหญ่ ครัวทันสมัยและพื้นที่สังสรรค์วิวทะเล"
    },
    priceTHB: 18500,
    size: "280 m²",
    guests: "8 à 10 Personnes",
    bed: "4 Lits King Size",
    view: {
      fr: "Vue Panoramique Baie & Coucher de Soleil",
      en: "Full Bay & Sunset Panorama",
      th: "วิวพาโนรามาอ่าวกมลาและพระอาทิตย์ตก"
    },
    image: "assets/images/grand-villa.jpg",
    features: [
      { fr: "Grande piscine privée à débordement (14m)", en: "14m grand private infinity pool", th: "สระว่ายน้ำส่วนตัวขนาดยาว 14 เมตร" },
      { fr: "4 suites parentales avec dressing & jacuzzi", en: "4 master suites with dressing & jacuzzi", th: "4 ห้องนอนใหญ่พร้อมอ่างจากุซซี่" },
      { fr: "Cuisine équipée & vaste salle à manger", en: "Fully-equipped kitchen & dining hall", th: "ครัวยุโรปครบครันและโต๊ะรับประทานอาหาร" },
      { fr: "Transferts aéroport Phuket offerts", en: "Complimentary Phuket airport transfers", th: "บริการรับส่งสนามบินฟรี" }
    ]
  }
];

const REVIEWS_DATA = [
  {
    name: "Alexandre & Sophie",
    country: "France 🇫🇷",
    rating: 5,
    date: "Mars 2026",
    comment: {
      fr: "Un séjour magique pour notre voyage de noces ! La vue depuis notre piscine privée au coucher de soleil est tout simplement à couper le souffle. Le petit-déjeuner flottant était délicieux et le personnel d'une gentillesse incroyable.",
      en: "Magical honeymoon stay! The sunset view from our private plunge pool was breathtaking. The floating breakfast was delicious and staff were wonderfully attentive.",
      th: "ทริปฮันนีมูนที่น่าประทับใจมาก วิวพระอาทิตย์ตกจากสระว่ายน้ำส่วนตัวสวยงามสุดๆ อาหารเช้าลอยน้ำอร่อย พนักงานบริการดีเยี่ยม"
    },
    stayedIn: "Grand Seaview Pool Suite"
  },
  {
    name: "David K.",
    country: "United Kingdom 🇬🇧",
    rating: 5,
    date: "Février 2026",
    comment: {
      fr: "Hôtel boutique calme et très préservé sur les collines. La navette pour la plage de Kamala et Patong fonctionne parfaitement. Le restaurant halal sur place propose des plats savoureux. Nous reviendrons sans hésiter !",
      en: "Quiet hilltop boutique resort. The scheduled shuttles to Kamala Beach and Patong worked smoothly. Fantastic halal dining at the panoramic restaurant. Will definitely return!",
      th: "รีสอร์ทสวยงามเงียบสงบบนเนินเขา รถรับส่งไปหาดกมลาและป่าตองสะดวกมาก อาหารฮาลาลอร่อยมาก จะกลับมาพักอีกแน่นอน"
    },
    stayedIn: "Deluxe Partial Seaview Pool Suite"
  },
  {
    name: "Fatima & Omar",
    country: "Émirats Arabes Unis 🇦🇪",
    rating: 5,
    date: "Janvier 2026",
    comment: {
      fr: "Intimité totale respectée dans la villa, nourriture 100% Halal d'une grande fraîcheur, et service 24h/24 très attentionné. Idéal pour les familles qui souhaitent la tranquillité tout en étant proches de la mer.",
      en: "Complete villa privacy, 100% halal certified food, and attentive 24h assistance. Perfect for families looking for peaceful luxury near Kamala.",
      th: "ความเป็นส่วนตัวยอดเยี่ยม อาหารฮาลาลแท้ 100% คุณภาพสดใหม่ บริการประทับใจตลอด 24 ชั่วโมง เหมาะสำหรับครอบครัว"
    },
    stayedIn: "Four Bedroom Seaview Pool Villa Royale"
  }
];
