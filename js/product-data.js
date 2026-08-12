'use strict';
/* ─── Product Database — Wotaku Mart ─── */

const WA_NUMBER = '6281385811993';

const PLATFORMS_META = {
  shopee:    { name: 'Shopee',     color: '#EE4D2D', url: 'https://shopee.co.id/' },
  tokopedia: { name: 'Tokopedia',  color: '#42B549', url: 'https://www.tokopedia.com/' },
  lazada:    { name: 'Lazada',     color: '#0F146D', url: '#' },
  blibli:    { name: 'Blibli',     color: '#0081C8', url: '#' },
  facebook:  { name: 'Facebook',   color: '#1877F2', url: 'https://www.facebook.com/profile.php?id=61590757362041' },
  instagram: { name: 'Instagram',  color: '#E1306C', url: 'https://www.instagram.com/mnd.shop_global/' },
  tiktok:    { name: 'TikTok Shop',color: '#010101', url: '#' },
  etsy:      { name: 'Etsy',       color: '#F56400', url: '#' }
};

function makePlatforms(overrides) {
  const base = {};
  Object.keys(PLATFORMS_META).forEach(k => { base[k] = PLATFORMS_META[k].url; });
  return Object.assign(base, overrides || {});
}

// ─── Review pools by category ───
const R = {
  figure: [
    { name: 'Rizki A.', loc: 'Jakarta', r: 5, date: '15 Jul 2026', text: 'Detail cat sangat presisi dan packaging aman double bubble wrap! Pengiriman super cepat. Figure-nya jauh lebih keren aslinya daripada foto. Highly recommended!' },
    { name: 'Meilani S.', loc: 'Surabaya', r: 5, date: '2 Jul 2026', text: 'Udah lama cari figure berkualitas begini. Persis foto bahkan lebih bagus. Seller responsif dan ramah, display stand sudah termasuk. Puas banget!' },
    { name: 'Dicky P.', loc: 'Bandung', r: 4, date: '28 Jun 2026', text: 'Figure bagus dan detail oke banget. Sangat worth it untuk harganya. Pengiriman agak lama tapi produknya jelas recommended untuk kolektor!' }
  ],
  cosplay: [
    { name: 'Hana W.', loc: 'Jakarta', r: 5, date: '10 Jul 2026', text: 'Kain berkualitas tinggi! Ukuran sesuai size chart dan detail kostumnya keren banget. Udah langsung dipakai event cosplay dan banyak yang memuji!' },
    { name: 'Ayu K.', loc: 'Yogyakarta', r: 5, date: '5 Jul 2026', text: 'Paket super lengkap dan rapi sekali. Bahan nyaman dan tidak mudah sobek. Cocok banget buat cosplay dan photoshoot! Seller fast response.' },
    { name: 'Reza M.', loc: 'Medan', r: 4, date: '22 Jun 2026', text: 'Material oke, jahitan rapi. Kualitas melebihi ekspektasi untuk harganya. Pengiriman cepat dan packaging aman. Pasti balik lagi beli!' }
  ],
  acrylic: [
    { name: 'Fani R.', loc: 'Surabaya', r: 5, date: '12 Jul 2026', text: 'Akrilik tebal dan gambar super jelas! Warna tidak mudah pudar. Sudah dipajang di meja dan hasilnya keren banget. Stand-nya kokoh!' },
    { name: 'Budi S.', loc: 'Jakarta', r: 5, date: '8 Jul 2026', text: 'Kualitas print bagus, warna cerah dan tajam. Packing aman bubble wrap tebal. Worth every penny buat koleksi anime!' },
    { name: 'Clara T.', loc: 'Bandung', r: 5, date: '1 Jul 2026', text: 'Cantik banget! Detail karakter bagus dan ukuran pas. Harga sangat terjangkau untuk kualitas segini. Langsung pesan lagi!' }
  ],
  tshirt: [
    { name: 'Andre P.', loc: 'Jakarta', r: 5, date: '14 Jul 2026', text: 'Bahan tebal dan adem! Gambar tidak luntur setelah dicuci berkali-kali. Potongan oke dan nyaman dipakai harian. Best purchase!' },
    { name: 'Sari L.', loc: 'Makassar', r: 4, date: '7 Jul 2026', text: 'Kualitas kain bagus dan sablon rapi. Ukuran sesuai deskripsi. Pengiriman cepat dan seller fast response. Recommended!' },
    { name: 'Iqbal M.', loc: 'Surabaya', r: 5, date: '29 Jun 2026', text: 'Design keren dan bahan premium. Sudah dapat banyak compliment waktu dipake! Seller responsif dan pengiriman cepat. 5 bintang!' }
  ],
  streetwear: [
    { name: 'Kevin A.', loc: 'Jakarta', r: 5, date: '13 Jul 2026', text: 'Material tebal dan jahitan rapi! Desain keren dan cutting bagus. Langsung dapat compliment waktu dipakai. Kualitas top banget!' },
    { name: 'Nadia P.', loc: 'Bandung', r: 5, date: '6 Jul 2026', text: 'Sesuai foto bahkan lebih keren aslinya. Bahan premium dan nyaman sepanjang hari. Pengiriman cepat dan packing aman!' },
    { name: 'Farhan K.', loc: 'Surabaya', r: 4, date: '27 Jun 2026', text: 'Kualitas oke banget untuk harganya. Desain trendy dan bahan tidak mudah rusak. Overall sangat puas, recommended seller!' }
  ],
  harajuku: [
    { name: 'Yuki S.', loc: 'Jakarta', r: 5, date: '11 Jul 2026', text: 'Outfit lengkap dan berkualitas tinggi! Cocok banget untuk street fashion. Bahan nyaman dan tidak panas di cuaca tropis.' },
    { name: 'Putri M.', loc: 'Bali', r: 5, date: '4 Jul 2026', text: 'Sesuai ekspektasi bahkan lebih! Detail outfit Harajuku authentic banget. Seller baik dan pengiriman cepat. Love it!' },
    { name: 'Dian F.', loc: 'Surabaya', r: 4, date: '25 Jun 2026', text: 'Kualitas oke dan style keren abis. Teman-teman langsung suka waktu dipakai ke event. Recommended seller!' }
  ],
  plushie: [
    { name: 'Indah R.', loc: 'Jakarta', r: 5, date: '16 Jul 2026', text: 'Bonekanya super lembut dan gemoy! Detail karakternya persis aslinya. Packaging aman dan bonekanya wangi. Langsung jadi favorit!' },
    { name: 'Rini S.', loc: 'Surabaya', r: 5, date: '9 Jul 2026', text: 'Kualitas premium, bulu sangat halus. PP Cotton-nya empuk dan mempertahankan bentuk. Seller cepat respon dan kirimnya cepat!' },
    { name: 'Maya T.', loc: 'Yogyakarta', r: 5, date: '3 Jul 2026', text: 'Lucu banget dan ukurannya sesuai deskripsi. Bahan aman untuk anak. Sangat worth it, langsung beli lagi buat kado!' }
  ],
  sanrio: [
    { name: 'Lina K.', loc: 'Jakarta', r: 5, date: '15 Jul 2026', text: 'Figure Sanrio berkualitas tinggi! Detail karakter cute dan cat rapi. Cocok untuk koleksi dan pajangan. Packaging gift-ready!' },
    { name: 'Tika A.', loc: 'Bandung', r: 5, date: '6 Jul 2026', text: 'Packaging cantik dan figure-nya detail! Persis karakter aslinya. Seller responsive dan fast shipping. Love this shop!' },
    { name: 'Dara M.', loc: 'Surabaya', r: 4, date: '28 Jun 2026', text: 'Oke banget kualitasnya! Warna cerah dan tidak mudah pudar. Recommended untuk penggemar Sanrio. Pasti order lagi!' }
  ]
};

// ─── Spec builders ───
const S = {
  figure: (h, sc) => [['Tinggi', h||'25 cm'], ['Material', 'High-grade PVC'], ['Skala', sc||'1/7'], ['Asal', 'Japan Import'], ['Berat', '350 gram (dengan box)'], ['Garansi', '7 hari retur']],
  cosplay: (inc) => [['Ukuran', 'S / M / L / XL'], ['Material', 'Polyester Premium'], ['Include', inc||'Kostum + Aksesoris'], ['Asal', 'Japan Import'], ['Berat', '500 gram'], ['Garansi', '7 hari retur']],
  acrylic: (sz, inc) => [['Ukuran', sz||'10 × 15 cm'], ['Material', 'Acrylic 5mm'], ['Print', 'UV Full Color'], ['Include', inc||'Stand Acrylic'], ['Berat', '100 gram'], ['Garansi', '7 hari retur']],
  tshirt: () => [['Ukuran', 'S / M / L / XL / XXL'], ['Bahan', 'Cotton Combed 30s'], ['Sablon', 'DTF Print'], ['Asal', 'Local Brand'], ['Berat', '200 gram'], ['Perawatan', 'Gentle cycle / cuci tangan']],
  streetwear: (mat, wt, sz) => [['Ukuran', sz||'S / M / L / XL'], ['Bahan', mat||'Japanese Fleece'], ['Style', 'Oversize Fit'], ['Asal', 'Local Brand'], ['Berat', wt||'400 gram'], ['Perawatan', 'Gentle cycle / cuci tangan']],
  harajuku: () => [['Ukuran', 'S / M / L / XL'], ['Bahan', 'Mix Material Premium'], ['Style', 'Harajuku Layer'], ['Asal', 'Local Brand'], ['Include', 'Full Set'], ['Berat', '350 gram']],
  plushie: (h, wt) => [['Tinggi', h||'30 cm'], ['Material', 'Super Soft Plush'], ['Isi', 'PP Cotton Premium'], ['Asal', 'Japan / Korea'], ['Berat', wt||'250 gram'], ['Garansi', '7 hari retur']],
  sanrio: (ch, h) => [['Tinggi', h||'10 cm'], ['Material', 'PVC Premium'], ['Karakter', ch||'Sanrio Official'], ['Asal', 'Japan Import'], ['Berat', '150 gram'], ['Garansi', '7 hari retur']]
};

// ─── Product Database ───
const PRODUCT_DB = [
  // ══ WOTAKU SHOP - FIGURE ══
  { id:'kitsune-figure', name:'Kitsune Spirit Anime Figure', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Figure', badge:'new', price:385000, originalPrice:450000, rating:4.8, reviewCount:24, stock:12,
    images:['assets/images/prod_figure.webp','assets/images/prod_cosplay.webp','assets/images/prod_acrylic.webp'],
    description:'Kitsune Spirit Anime Figure adalah koleksi figure premium yang terinspirasi dari mitologi Jepang tentang rubah penjaga (Kitsune). Dibuat dengan material PVC berkualitas tinggi dan detail cat yang presisi untuk menangkap esensi karakter dengan sempurna.\n\nCocok untuk kolektor anime, penggemar mitologi Jepang, dan dekorasi ruangan bertema Jepang. Setiap figure dikemas dengan box premium anti-crush yang dilengkapi display stand transparan berkualitas.\n\n✓ Original product bukan KW\n✓ Box premium double-layer protection\n✓ Display stand transparan included\n✓ Certificate of authenticity',
    specs:S.figure('25 cm','1/7'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.figure,
    related:['dragon-figure','samurai-figure','sakura-cosplay','anime-acrylic'] },

  { id:'dragon-figure', name:'Dragon Premium Collector Figure', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Figure', badge:'limited', price:680000, originalPrice:null, rating:4.9, reviewCount:31, stock:5,
    images:['assets/images/prod_figure.webp','assets/images/prod_acrylic.webp','assets/images/prod_figure.webp'],
    description:'Dragon Premium Collector Figure adalah masterpiece koleksi naga dalam skala besar. Setiap detail sisik, cakar, dan sayap dibuat dengan teknik sculpting tangan oleh pengrajin master di Jepang.\n\nEdisi terbatas dengan sertifikat keaslian dan nomor seri unik untuk setiap piece. Perfect centerpiece untuk vitrin koleksi premium kamu.\n\n✓ Edisi terbatas bernomor seri\n✓ Certificate of authenticity eksklusif\n✓ Box premium museum-grade\n✓ White glove packaging service',
    specs:S.figure('35 cm','1/5'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.figure,
    related:['kitsune-figure','samurai-figure','sakura-cosplay','anime-acrylic'] },

  { id:'samurai-figure', name:'Samurai Mini Figure Set', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Figure', badge:'new', price:295000, originalPrice:null, rating:4.7, reviewCount:18, stock:20,
    images:['assets/images/prod_figure.webp','assets/images/prod_acrylic.webp','assets/images/prod_cosplay.webp'],
    description:'Samurai Mini Figure Set menghadirkan set 3 figure samurai premium dalam ukuran chibi yang menggemaskan. Setiap figure menampilkan samurai dengan baju besi detail dan senjata tradisional Jepang.\n\nSet terdiri dari 3 karakter berbeda: Shogun, Ronin, dan Ninja — masing-masing dengan pose khas yang unik dan menawan.\n\n✓ Set 3 figure berbeda karakter\n✓ Pose unik masing-masing karakter\n✓ Display base premium termasuk\n✓ Gift box ready',
    specs:S.figure('8 cm (each)','Non-scale'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.figure,
    related:['kitsune-figure','dragon-figure','anime-acrylic','sakura-keychain'] },

  // ══ WOTAKU SHOP - COSPLAY ══
  { id:'sakura-cosplay', name:'Sakura Kimono Cosplay Set', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Cosplay', badge:'limited', price:520000, originalPrice:null, rating:4.9, reviewCount:37, stock:8,
    images:['assets/images/prod_cosplay.webp','assets/images/prod_figure.webp','assets/images/prod_harajuku.webp'],
    description:'Sakura Kimono Cosplay Set adalah kostum kimono premium dengan motif bunga sakura yang indah dan autentik. Terinspirasi dari kimono tradisional Jepang dengan sentuhan modern.\n\nSet lengkap terdiri dari kimono utama, obi (ikat pinggang), dan aksesoris rambut bunga sakura. Kain polyester premium yang nyaman dipakai seharian di berbagai event.\n\n✓ Full set kimono + obi + aksesoris rambut\n✓ Material polyester premium breathable\n✓ Cocok untuk cosplay, event, photoshoot\n✓ Available ukuran S hingga XL',
    specs:S.cosplay('Kimono + Obi + Aksesoris Rambut Sakura'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.cosplay,
    related:['kitsune-mask','samurai-figure','torii-tee','harajuku-outfit'] },

  { id:'kitsune-mask', name:'Kitsune Fox Mask Set', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Cosplay', badge:'new', price:380000, originalPrice:null, rating:4.6, reviewCount:22, stock:15,
    images:['assets/images/prod_cosplay.webp','assets/images/prod_acrylic.webp','assets/images/prod_figure.webp'],
    description:'Kitsune Fox Mask Set menghadirkan topeng rubah Jepang autentik yang dicat tangan oleh pengrajin lokal berbakat. Motif tradisional Kitsune dengan sentuhan modern yang sangat aesthetic.\n\nCocok untuk cosplay, festival budaya, photoshoot bertema Jepang, atau dijadikan dekorasi dinding yang unik.\n\n✓ Hand-painted oleh seniman lokal\n✓ Set topeng + tali premium + kotak display\n✓ Material kayu ringan berkualitas\n✓ Cocok untuk dekorasi & cosplay',
    specs:S.cosplay('Topeng + Tali Premium + Kotak Display'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.cosplay,
    related:['sakura-cosplay','kitsune-figure','anime-acrylic','torii-tee'] },

  // ══ WOTAKU SHOP - ACRYLIC ══
  { id:'anime-acrylic', name:'Anime Acrylic Standee Collection', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Acrylic', badge:'new', price:95000, originalPrice:null, rating:4.8, reviewCount:45, stock:50,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_figure.webp','assets/images/prod_tshirt.webp'],
    description:'Anime Acrylic Standee Collection adalah koleksi standee akrilik premium dengan karakter anime pilihan. Dicetak dengan teknologi UV printing full color untuk hasil yang tajam, cerah, dan tahan lama.\n\nCocok untuk dekorasi meja, rak koleksi, atau hadiah untuk pecinta anime. Setiap standee dilengkapi stand akrilik yang kokoh dan elegan.\n\n✓ UV Print full color tahan pudar\n✓ Akrilik tebal 5mm premium\n✓ Stand akrilik kokoh termasuk\n✓ Pilihan berbagai karakter anime',
    specs:S.acrylic('12 × 18 cm','Stand Akrilik Premium'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.acrylic,
    related:['sakura-keychain','kitsune-figure','samurai-figure','torii-tee'] },

  { id:'sakura-keychain', name:'Sakura Character Keychain Acrylic', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'Acrylic', badge:'', price:75000, originalPrice:null, rating:4.7, reviewCount:63, stock:100,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_cosplay.webp','assets/images/prod_figure.webp'],
    description:'Sakura Character Keychain Acrylic adalah gantungan kunci akrilik premium dengan desain karakter anime sakura yang imut dan colorful. Material akrilik tebal 5mm dengan UV print yang tajam dan tidak mudah pudar.\n\nDilengkapi ring gantungan berkualitas tinggi yang kuat. Tersedia dalam berbagai desain karakter pilihan yang bisa dikustomisasi.\n\n✓ Akrilik 5mm premium grade\n✓ UV print full color anti-pudar\n✓ Ring gantungan stainless premium\n✓ Pilihan desain beragam',
    specs:S.acrylic('6 × 8 cm','Ring Gantungan Stainless'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.acrylic,
    related:['anime-acrylic','kitsune-figure','torii-tee','samurai-tee'] },

  // ══ WOTAKU SHOP - T-SHIRT ══
  { id:'torii-tee', name:'Torii Gate Graphic Tee', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'T-Shirt', badge:'sale', price:145000, originalPrice:195000, rating:4.7, reviewCount:52, stock:30,
    images:['assets/images/prod_tshirt.webp','assets/images/prod_hoodie.webp','assets/images/prod_acrylic.webp'],
    description:'Torii Gate Graphic Tee menampilkan ilustrasi gerbang torii ikonik Jepang yang digambar oleh seniman lokal berbakat dalam gaya sumi-e (tinta Jepang) yang artistik dan dramatic.\n\nBahan cotton combed 30s yang adem dan nyaman untuk cuaca tropis Indonesia. Tersedia dalam warna hitam, putih, dan abu-abu.\n\n✓ Desain original oleh seniman lokal\n✓ Cotton combed 30s premium\n✓ DTF Print anti-crack dan anti-pudar\n✓ Tersedia ukuran S hingga 2XL',
    specs:S.tshirt(), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.tshirt,
    related:['samurai-tee','anime-acrylic','tokyo-hoodie','sakura-streetwear'] },

  { id:'samurai-tee', name:'Samurai Ink Art Graphic Tee', brand:'Wotaku Shop', brandLogo:'assets/images/logo_wotaku.webp', store:'wotaku', cat:'T-Shirt', badge:'new', price:165000, originalPrice:null, rating:4.6, reviewCount:28, stock:25,
    images:['assets/images/prod_tshirt.webp','assets/images/prod_acrylic.webp','assets/images/prod_hoodie.webp'],
    description:'Samurai Ink Art Graphic Tee menampilkan ilustrasi samurai dalam gaya seni tinta tradisional Jepang yang dramatis dan powerful. Dibuat oleh seniman street art lokal dengan pengalaman di Japanese art.\n\nBahan cotton premium dengan sablon DTF yang tidak mudah pudar meski dicuci berkali-kali. Cocok untuk pecinta budaya Jepang.\n\n✓ Desain original street art lokal\n✓ Cotton premium combed 30s\n✓ DTF Print tahan lama\n✓ Tersedia ukuran S hingga 3XL',
    specs:S.tshirt(), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.tshirt,
    related:['torii-tee','anime-acrylic','tokyo-hoodie','shibuya-cargo'] },

  // ══ MND.ID - STREETWEAR ══
  { id:'tokyo-hoodie', name:'Tokyo Kanji Oversized Hoodie', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Streetwear', badge:'new', price:295000, originalPrice:null, rating:4.9, reviewCount:67, stock:20,
    images:['assets/images/prod_hoodie.webp','assets/images/prod_tshirt.webp','assets/images/prod_harajuku.webp'],
    description:'Tokyo Kanji Oversized Hoodie adalah hoodie premium oversize dengan print kanji Tokyo yang bold dan stylish. Dibuat dengan bahan Japanese fleece premium yang hangat namun tidak gerah.\n\nDesain oversize trendy cocok untuk street style sehari-hari. Print kanji menggunakan screen printing tahan lama. Kapuzon adjustable dengan drawstring premium.\n\n✓ Japanese fleece premium\n✓ Potongan oversize trendy\n✓ Screen print kanji tahan lama\n✓ Kapuzon + kantong kangguru',
    specs:S.streetwear('Japanese Fleece Premium','450 gram'), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.streetwear,
    related:['shibuya-cargo','sakura-streetwear','harajuku-outfit','k-style-jacket'] },

  { id:'shibuya-cargo', name:'Shibuya Night Cargo Pants', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Streetwear', badge:'', price:335000, originalPrice:null, rating:4.8, reviewCount:43, stock:18,
    images:['assets/images/prod_hoodie.webp','assets/images/prod_harajuku.webp','assets/images/prod_tshirt.webp'],
    description:'Shibuya Night Cargo Pants terinspirasi dari street fashion Shibuya yang edgy dan modern. Cargo pants dengan banyak kantong fungsional dan detail jahitan yang presisi.\n\nBahan ripstop premium yang tahan lama namun ringan. Desain relaxed fit cocok untuk berbagai aktivitas dari casual hangout hingga fashion event.\n\n✓ Ripstop premium ringan & kuat\n✓ Multi-pocket fungsional (6 kantong)\n✓ Relaxed fit flattering\n✓ Adjustable waistband',
    specs:S.streetwear('Ripstop Premium','350 gram','S / M / L / XL / XXL'), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.streetwear,
    related:['tokyo-hoodie','sakura-streetwear','k-style-jacket','harajuku-outfit'] },

  { id:'sakura-streetwear', name:'Sakura Streetwear Graphic Tee', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Streetwear', badge:'sale', price:125000, originalPrice:165000, rating:4.7, reviewCount:89, stock:35,
    images:['assets/images/prod_tshirt.webp','assets/images/prod_hoodie.webp','assets/images/prod_harajuku.webp'],
    description:'Sakura Streetwear Graphic Tee memadukan elemen street art modern dengan motif bunga sakura Jepang yang timeless. Desain eksklusif dari kolaborasi dengan seniman street art Jakarta terbaik.\n\nBahan cotton combed premium yang lembut di kulit. Print berkualitas tinggi yang tahan dicuci berulang kali tanpa memudar.\n\n✓ Desain kolaborasi seniman street art\n✓ Cotton combed premium 30s\n✓ Print anti-crack dan anti-pudar\n✓ Bestseller di semua platform',
    specs:S.tshirt(), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.streetwear,
    related:['tokyo-hoodie','shibuya-cargo','torii-tee','samurai-tee'] },

  // ══ MND.ID - HARAJUKU ══
  { id:'harajuku-outfit', name:'Harajuku Layer Outfit Set', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Harajuku', badge:'new', price:445000, originalPrice:null, rating:4.9, reviewCount:41, stock:12,
    images:['assets/images/prod_harajuku.webp','assets/images/prod_hoodie.webp','assets/images/prod_tshirt.webp'],
    description:'Harajuku Layer Outfit Set menghadirkan set outfit layering ala Harajuku yang authentic dan fashion-forward. Terinspirasi langsung dari street style distrik Harajuku Tokyo yang penuh warna dan ekspresi diri.\n\nSet terdiri dari outer layer, inner tee, dan aksesoris koordinat yang bisa dipadukan berbagai cara.\n\n✓ Full set layering outfit\n✓ Mix material premium nyaman\n✓ Authentic Harajuku style\n✓ Bisa dipadupadankan berbagai cara',
    specs:S.harajuku(), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.harajuku,
    related:['harajuku-tote','kawaii-accessory','tokyo-hoodie','korean-dress'] },

  { id:'harajuku-tote', name:'Harajuku Graphic Tote Bag Set', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Harajuku', badge:'new', price:380000, originalPrice:null, rating:4.8, reviewCount:28, stock:22,
    images:['assets/images/prod_harajuku.webp','assets/images/prod_tshirt.webp','assets/images/prod_hoodie.webp'],
    description:'Harajuku Graphic Tote Bag Set adalah set tas tote bergaya Harajuku dengan print grafis yang eye-catching. Warna-warna cerah khas Harajuku style dipadu dengan canvas premium yang kuat.\n\nSet terdiri dari 2 tote bag berbeda ukuran (large & small) yang bisa dipakai bersamaan sebagai statement outfit.\n\n✓ Set 2 tote bag (large & small)\n✓ Canvas premium 12oz tahan lama\n✓ DTF print full color tidak luntur\n✓ Handle panjang & pendek',
    specs:[['Ukuran Large','40 × 45 cm'],['Ukuran Small','25 × 30 cm'],['Material','Canvas Premium 12oz'],['Print','DTF Full Color'],['Include','2 Tote Bags'],['Berat','300 gram']],
    platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.harajuku,
    related:['harajuku-outfit','kawaii-accessory','kawaii-tote','korean-dress'] },

  { id:'kawaii-accessory', name:'Kawaii Street Accessory Set', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Harajuku', badge:'', price:290000, originalPrice:null, rating:4.7, reviewCount:35, stock:40,
    images:['assets/images/prod_harajuku.webp','assets/images/prod_acrylic.webp','assets/images/prod_tshirt.webp'],
    description:'Kawaii Street Accessory Set adalah koleksi aksesoris street fashion bergaya kawaii yang lengkap dan berkualitas. Set terdiri dari berbagai aksesoris yang bisa dipadukan untuk look Harajuku yang sempurna.\n\nTermasuk hairclips, pins, strap phone case, dan kalung charm. Semua item material premium dan tahan lama.\n\n✓ 8 piece aksesoris complete set\n✓ Material mix premium (Acrylic, Metal, Resin)\n✓ Cocok untuk semua ukuran\n✓ Gift-ready packaging',
    specs:[['Isi Set','8 piece aksesoris'],['Material','Mix (Acrylic, Metal, Resin)'],['Style','Kawaii / Harajuku'],['Cocok untuk','Semua ukuran'],['Berat','150 gram'],['Garansi','7 hari']],
    platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.harajuku,
    related:['harajuku-outfit','harajuku-tote','kawaii-tote','kawaii-keychain'] },

  // ══ MND.ID - KOREAN STYLE ══
  { id:'korean-dress', name:'Korean Harajuku Dress Set', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Korean Style', badge:'limited', price:510000, originalPrice:null, rating:4.9, reviewCount:33, stock:7,
    images:['assets/images/prod_harajuku.webp','assets/images/prod_tshirt.webp','assets/images/prod_hoodie.webp'],
    description:'Korean Harajuku Dress Set memadukan estetika K-Fashion dengan sentuhan Harajuku untuk tampilan unik dan trendi. Dress set yang cocok untuk berbagai kesempatan dari casual hangout hingga fashion event.\n\nMaterial premium berkualitas Korea dengan jahitan rapi. Set terdiri dari dress utama dan outer layer matching yang bisa dipakai terpisah.\n\n✓ Full set dress + outer matching\n✓ Material premium Korea\n✓ Cocok casual & fashion event\n✓ Limited stock!',
    specs:S.harajuku(), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.harajuku,
    related:['k-style-jacket','seoul-tee','harajuku-outfit','harajuku-tote'] },

  { id:'k-style-jacket', name:'K-Style Oversized Jacket', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Korean Style', badge:'new', price:420000, originalPrice:null, rating:4.8, reviewCount:19, stock:16,
    images:['assets/images/prod_hoodie.webp','assets/images/prod_harajuku.webp','assets/images/prod_tshirt.webp'],
    description:'K-Style Oversized Jacket adalah jaket oversize bergaya Korean fashion yang clean dan minimalis namun tetap sangat stylish. Terinspirasi dari label Korea ternama dengan sentuhan street style lokal.\n\nBahan premium wool-blend yang hangat untuk musim hujan namun tetap bisa dipakai di cuaca Indonesia.\n\n✓ Bahan wool-blend premium\n✓ Potongan oversize Korean style\n✓ Desain minimalis serbaguna\n✓ Cocok dipadupadankan berbagai outfit',
    specs:S.streetwear('Wool-Blend Premium','600 gram'), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.streetwear,
    related:['korean-dress','seoul-tee','tokyo-hoodie','shibuya-cargo'] },

  { id:'seoul-tee', name:'Seoul Minimal Graphic Tee', brand:'mnd.id', brandLogo:'assets/images/logo_mnd.webp', store:'mnd', cat:'Korean Style', badge:'sale', price:185000, originalPrice:230000, rating:4.7, reviewCount:58, stock:30,
    images:['assets/images/prod_tshirt.webp','assets/images/prod_hoodie.webp','assets/images/prod_harajuku.webp'],
    description:'Seoul Minimal Graphic Tee adalah t-shirt dengan desain minimalis bergaya Seoul fashion yang clean dan modern. Tipografi Korea yang simple namun impactful cocok untuk daily wear maupun street style.\n\nBahan cotton premium yang lembut dengan sablon kualitas tinggi. Potongan semi-oversize flattering untuk semua body type.\n\n✓ Desain tipografi Korea eksklusif\n✓ Cotton premium semi-oversize\n✓ Print tahan lama anti-crack\n✓ Bestseller Korean style collection',
    specs:S.tshirt(), platforms:makePlatforms({ facebook:'https://www.facebook.com/profile.php?id=61590992671577' }), waNumber:WA_NUMBER, reviews:R.streetwear,
    related:['k-style-jacket','korean-dress','torii-tee','samurai-tee'] },

  // ══ AIKOKU - PLUSHIE ══
  { id:'rilakkuma-plushie', name:'Rilakkuma Plushie XL', brand:'Aikoku', brandLogo:'assets/images/logo_AIKOKU.webp', store:'aikoku', cat:'Plushie', badge:'new', price:185000, originalPrice:null, rating:5.0, reviewCount:48, stock:25,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_acrylic.webp','assets/images/prod_figure.webp'],
    description:'Rilakkuma Plushie XL hadir dengan boneka Rilakkuma ukuran besar yang super lembut dan nyaman dipeluk. Detail karakter yang authentic dan menggemaskan dengan bahan super soft premium.\n\nBahan aman untuk semua usia, tidak mengandung zat berbahaya. PP Cotton premium mempertahankan bentuk meski dipeluk berulang kali.\n\n✓ Super soft premium plush material\n✓ PP Cotton premium long-lasting\n✓ Aman untuk semua usia\n✓ Detail karakter authentic',
    specs:S.plushie('45 cm','400 gram'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.plushie,
    related:['cinnamoroll-plushie','kuromi-figure','hello-kitty','kawaii-keychain'] },

  { id:'cinnamoroll-plushie', name:'Cinnamoroll Plushie Medium', brand:'Aikoku', brandLogo:'assets/images/logo_AIKOKU.webp', store:'aikoku', cat:'Plushie', badge:'sale', price:135000, originalPrice:165000, rating:4.9, reviewCount:72, stock:30,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_figure.webp','assets/images/prod_acrylic.webp'],
    description:'Cinnamoroll Plushie Medium hadir dengan boneka Cinnamoroll menggemaskan dalam ukuran medium yang pas untuk dipeluk. Telinga floppy khas Cinnamoroll dibuat dengan detail yang sangat akurat.\n\nBahan plush yang lembut dan hypoallergenic, aman untuk anak-anak. Ekspresi wajah imut yang selalu bikin senyum!\n\n✓ Detail authentic karakter Cinnamoroll\n✓ Hypoallergenic, aman untuk anak\n✓ Telinga floppy khas super detail\n✓ Gift-ready packaging cantik',
    specs:S.plushie('30 cm','250 gram'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.plushie,
    related:['rilakkuma-plushie','kuromi-figure','hello-kitty','kawaii-tote'] },

  // ══ AIKOKU - SANRIO ══
  { id:'kuromi-figure', name:'Kuromi Mini Figure Set', brand:'Aikoku', brandLogo:'assets/images/logo_AIKOKU.webp', store:'aikoku', cat:'Sanrio', badge:'limited', price:120000, originalPrice:null, rating:4.8, reviewCount:39, stock:15,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_figure.webp','assets/images/prod_acrylic.webp'],
    description:'Kuromi Mini Figure Set menghadirkan set figure mini karakter Kuromi dari Sanrio dalam berbagai pose menggemaskan dengan ekspresi yang beragam.\n\nSet terdiri dari 3 figure mini dengan ukuran berbeda. Material PVC premium dengan detail cat yang akurat. Packaging cantik yang cocok dijadikan hadiah spesial.\n\n✓ Set 3 figure Kuromi berbeda pose\n✓ PVC premium detail cat akurat\n✓ Gift box cantik siap kirim\n✓ Limited edition!',
    specs:S.sanrio('Kuromi (Sanrio)','Set: 5-8 cm'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.sanrio,
    related:['hello-kitty','rilakkuma-plushie','cinnamoroll-plushie','kawaii-keychain'] },

  { id:'hello-kitty', name:'Hello Kitty Collector Set', brand:'Aikoku', brandLogo:'assets/images/logo_AIKOKU.webp', store:'aikoku', cat:'Sanrio', badge:'new', price:145000, originalPrice:null, rating:4.9, reviewCount:55, stock:20,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_figure.webp','assets/images/prod_acrylic.webp'],
    description:'Hello Kitty Collector Set adalah koleksi figure dan aksesoris Hello Kitty premium sempurna untuk para fans karakter ikonik Sanrio ini.\n\nSet berisi figure Hello Kitty berbagai pose, mini acrylic stand, dan keychain eksklusif. Packaging premium bergaya gift box yang siap dijadikan hadiah spesial.\n\n✓ Set figure + acrylic stand + keychain\n✓ Packaging premium gift-ready\n✓ Koleksi eksklusif Aikoku x Sanrio\n✓ Cocok untuk hadiah dan koleksi',
    specs:S.sanrio('Hello Kitty (Sanrio)','Figure: 10 cm'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.sanrio,
    related:['kuromi-figure','rilakkuma-plushie','cinnamoroll-plushie','kawaii-tote'] },

  // ══ AIKOKU - KEYCHAIN & TOTE ══
  { id:'kawaii-keychain', name:'Kawaii Acrylic Keychain Set', brand:'Aikoku', brandLogo:'assets/images/logo_AIKOKU.webp', store:'aikoku', cat:'Keychain', badge:'limited', price:65000, originalPrice:null, rating:4.7, reviewCount:91, stock:80,
    images:['assets/images/prod_acrylic.webp','assets/images/prod_acrylic.webp','assets/images/prod_figure.webp'],
    description:'Kawaii Acrylic Keychain Set adalah set gantungan kunci akrilik bergaya kawaii dengan berbagai desain karakter Sanrio dan karakter kawaii Jepang lainnya yang imut dan colorful.\n\nSet berisi 5 keychain berbeda dengan desain yang lucu. Akrilik tebal dengan UV print yang tidak mudah pudar. Ring gantungan kuat dan tahan lama.\n\n✓ Set 5 keychain berbeda desain\n✓ Akrilik premium 5mm\n✓ UV print anti-pudar\n✓ Ring gantungan stainless kuat',
    specs:S.acrylic('5 × 7 cm each','5 Keychain per Set'), platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.acrylic,
    related:['hello-kitty','kuromi-figure','kawaii-tote','anime-acrylic'] },

  { id:'kawaii-tote', name:'Kawaii Sanrio Tote Bag', brand:'Aikoku', brandLogo:'assets/images/logo_AIKOKU.webp', store:'aikoku', cat:'Tote Bag', badge:'new', price:95000, originalPrice:null, rating:4.8, reviewCount:44, stock:55,
    images:['assets/images/prod_harajuku.webp','assets/images/prod_acrylic.webp','assets/images/prod_harajuku.webp'],
    description:'Kawaii Sanrio Tote Bag adalah tas canvas bergaya kawaii dengan print karakter Sanrio yang cute dan colorful. Desain eksklusif yang tidak akan kamu temukan di tempat lain!\n\nBahan canvas premium yang kuat dan tahan lama. Ukuran pas untuk membawa perlengkapan sehari-hari. Handle panjang dan pendek yang bisa diatur.\n\n✓ Desain eksklusif print Sanrio\n✓ Canvas premium 12oz kuat\n✓ Full color DTF print\n✓ Dual handle (pendek & panjang)',
    specs:[['Ukuran','35 × 40 cm'],['Material','Canvas 12oz Premium'],['Print','Full Color DTF'],['Handle','Dual (Pendek & Panjang)'],['Kapasitas','±15 liter'],['Berat','200 gram']],
    platforms:makePlatforms(), waNumber:WA_NUMBER, reviews:R.plushie,
    related:['kawaii-keychain','hello-kitty','harajuku-tote','harajuku-outfit'] }
];

function getProduct(id) {
  return PRODUCT_DB.find(function(p){ return p.id === id; }) || null;
}

function getRelated(product, count) {
  count = count || 4;
  if (!product || !product.related) return [];
  return product.related
    .map(function(id){ return PRODUCT_DB.find(function(p){ return p.id === id; }); })
    .filter(Boolean)
    .slice(0, count);
}

// Name → ID map for auto-assigning on shop/home pages
const NAME_TO_ID = {};
PRODUCT_DB.forEach(function(p){ NAME_TO_ID[p.name] = p.id; });
