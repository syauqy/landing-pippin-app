const wet = [
  {
    nilai: 7,
    detail:
      "Jika seseorang memiliki jumlah neptu 7, maka orang tersebut memiliki watak senang bepergian jauh untuk berlibur atau bekerja. Orang dengan jumlah neptu 7 memiliki sebutan Pendito Kang Lelaku.",
  },
  {
    nilai: 8,
    detail:
      "Jika seseorang memiliki jumlah neptu 8 orang tersebut suka memendam sesuatu. Seorang dengan neptu 8 bagaikan bara api yang awalnya kecil namun kelak bisa membakar manusia lainnya, dengan seperti itu orang dengan neptu 8 memiliki sebutan Lakune Geni.",
  },
  {
    nilai: 9,
    detail:
      "Jika seseorang memiliki jumlah neptu 9 maka dirinya memiliki karakter yang mudah dipengaruhi oleh orang lain dan tidak memiliki pendirian hidup yang tetap. Hal tersebut membuat orang berneptu 9 mendapatkan julukan Lakune Angin.",
  },
  {
    nilai: 10,
    detail:
      "Jika seseorang memiliki jumlah neptu 10 maka ia memiliki watak suka menasehati namun tidak mau menerima saran dari orang lain. Orang dengan jumlah neptu 10 memiliki julukan Pendito Mbangun Teki.",
  },
  {
    nilai: 11,
    detail:
      "Jika seseorang memiliki jumlah neptu 11 maka ia memiliki watak yang tidak dapat dijadikan pemimpin karena plin plan tidak memiliki pendirian dan tidak memiliki jiwa kepemimpinan. Orang dengan neptu 11 dijuluki dengan Lakune Setan.",
  },
  {
    nilai: 12,
    detail:
      "Watak seseorang dengan neptu 12 adalah suka mengalah dan suka menebarkan kedamaian kepada orang lain sehingga ia dijuluki Lakune Kembang.",
  },
  {
    nilai: 13,
    detail:
      "Orang dengan neptu 13 memiliki pesona yang luar biasa namun tidak dapat dijadikan pemimpin. Kharisma yang ia miliki tidak sepadan dengan rendahnya kemampuan memimpinnya. Orang yang memiliki hari lahir dengan jumlah neptu 13 dijuluki dengan Lakune Lintang.",
  },
  {
    nilai: 14,
    detail:
      "Watak orang berneptu 14 adalah dapat menjadi pencerah bagi orang banyak. Dialah tempat mencari solusi saat beragam masalah tiba sehingga ia dijuluki dengan watak Lakune Mbulan.",
  },
  {
    nilai: 15,
    detail:
      "Jika seseorang memiliki jumlah neptu 15 maka ia memiliki watak yang mudah marah dan mudah dendam pada orang lain sehingga wataknya dijuluki Lakune Geni.",
  },
  {
    nilai: 16,
    detail:
      "Orang dengan hari lahir berjumlah neptu 16 memiliki watak yang mudah diatur dan suka mengayomi. Ia memiliki karakter yang sangat baik untuk dijadikan pemimpin sehingga wataknya dijuluki Lakune Bumi.",
  },
  {
    nilai: 17,
    detail:
      "Watak orang dengan jumlah neptu 17 memiliki sifat mudah diatur jika bisa meraih hatinya. Menghadapi manusia seperti ini harus hati-hati karena moody sehingga dijuluki dengan watak Lakune Gunung.",
  },
  {
    nilai: 18,
    detail:
      "Jumlah neptu 18 adalah jumlah neptu tertinggi. Seseorang yang memiliki jumlah neptu 18 memiliki watak yang mendominasi pada kekuasaan dengan segala permintaannya harus dipenuhi bahkan dengan berbagai cara. Watak seperti ini dijuluki dengan Lakune Paripurna.",
  },
];

const jodoh = [
  {
    nama: "Pegat",
    nilai: [1, 9, 10, 18, 19, 27, 28, 36],
    detail:
      "Kategori pegat menurut primbon Jawa mengindikasikan adanya kemungkinan kamu dan pasanganmu sering mendapat masalah dalam kehidupan.",
  },
  {
    nama: "Ratu",
    nilai: [2, 11, 20, 29],
    detail:
      "Kategori ratu menafsirkan kamu dan pasanganmu sebagai jodoh sejati.Kamu akan memiliki hubungan yang sangat harmonis, bahagia, dan bahkan membuat iri banyak orang di sekelilingmu!",
  },
  {
    nama: "Jodoh",
    nilai: [3, 12, 21, 30],
    detail:
      "Kategori jodoh ini dalam primbon Jawa memiliki arti bahwa kamu dan pasanganmu berjodoh.Lebih dari itu, kamu dan pasanganmu dapat memiliki kehidupan rumah tangga yang selalu rukun setiap waktu.",
  },
  {
    nama: "Topo",
    nilai: [4, 13, 22, 31],
    detail:
      "Jika angka yang keluar masuk dalam kategori topo, kamu perlu ekstra waspada.Pasalnya, primbon Jawa meramalkan kamu dan pasanganmu akan mendapatkan kesulitan di awal berumah tangga.",
  },
  {
    nama: "Tinari",
    nilai: [5, 14, 23, 32],
    detail:
      "Hasil perhitungan weton tinari ini termasuk kabar bahagia.Kebahagiaan tersebut hadir dalam wujud kecukupan rezeki dalam kehidupan rumah tangga kelak.Bahkan, kamu sekeluarga akan diberi kemudahan dalam mencari rezeki.",
  },
  {
    nama: "Padu",
    nilai: [6, 15, 24, 33],
    detail:
      "kecocokan dengan pasangan menurut primbon Weton jodoh padu ini mengindikasikan ramalan yang buruk bagi kehidupan rumah tangga kamu dan pasangan. Kendati demikian, hal ini tidak akan berujung pada perceraian. Syukurlah!",
  },
  {
    nama: "Sujanan",
    nilai: [7, 16, 25, 34],
    detail:
      "Bagi yang hasil perhitungan wetonnya berjumlah 7, 16, 25, atau 34 juga wajib waspada. Menurut primbon, mereka yang berada di kategori ini berada dalam ancaman pertengkaran besar dalam rumah tangga akibat perselingkuhan.",
  },
  {
    nama: "Pesthi",
    nilai: [8, 17, 26, 35],
    detail:
      "Berdasarkan perhitungan weton jodoh, mereka yang berada dalam kategori pesthi konon akan memiliki rumah tangga yang rukun.",
  },
];

const nep = [
  {
    nama: "Wasesa Segara",
    nilai: 1,
    detail: "diramalkan akan besar budi, berwibawa, dan lancar rezeki.",
  },
  {
    nama: "Tunggak Semi",
    nilai: 2,
    detail: "konon akan tersendat rezekinya.",
  },
  {
    nama: "Satria Wibawa",
    nilai: 3,
    detail: "diramalkan akan dihormati dan disegani.",
  },
  {
    nama: "Sumur Sinaba",
    nilai: 4,
    detail: "konon akan penuh inspirasi, hidup harmonis, jadi panutan.",
  },
  {
    nama: "Satria Wirang",
    nilai: 5,
    detail: "diramalkan akan kerap menghadapi berbagai kesulitan.",
  },
  {
    nama: "Bumi Kepetak",
    nilai: 6,
    detail: "konon akan membutuhkan kerja keras dalam hidup.",
  },
  {
    nama: "Lebu Ketiup Angin",
    nilai: 7,
    detail:
      "konon akan menghadapi kesulitan terutama dalam meraih cita-cita karena sulit mendapatkan ketenteraman.",
  },
];

const wukusifat = [
  {
    Sinta:
      "Sanghyang Batara Yamadipati = wataknya seperti raja dan pendita,  banyak kemauan, keras, cepat bahagia, bakat kaya harta benda. Memanggul tunggul = mudah mendapatkan kesenangan hidup. Kaki belakang direndam dalam air = perintahnya panas didepan dingin belakang. Pohonnya : Kendayakan = jadi pelindung orang susah, dan orang minggat.Burungnya : Gagak = mengerti petunjuk gaib. Gedungnya didepan = memperlihatkan simbul kekayaannya, pradah hanya lahir. Bahayanya : Berada di pertengahan  umur. Tangkalnya : selamatan nasi pulen beras sepitrah dikukus, lauknya daging kerbau seharga 21 keteng dimasak pindang, membelinya tidak menawar. Selawatnya 4 keteng. Doanya : Tolak bilahi. Candranya : Endra = gemar bertapa brata, angkuh, suka kepada kepanditan. Ketika kala wuku berada ditimu laut, selama 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Landep:
      "Sanghyang Batara Mahadewa = bagus rupanya, terang hatinya, gemar bersemadi. Kakinya direndam dalam air  = perintahnya keras didepan dingin dibelakang, kasih sayang. Pohonnya : Kendajakan = jadi pelindung orang sakit, orang sengsara dan orang minggat. Burungnya : Atatkembang = jadi kesukaan para agung, jika menghambakan diri jadi kesayangan. Gedungnya didepan = memperlihatkan kekayaannya, pradah hanya lahir.Bahayannya : korobohan pohon. Tangkalnya : Selamatan tumpeng beras sepitrah dikukus. Lauknya daging rusa dicacah lalu dibakar. Selawatnya 4 keteng. Doanya : Kabul. Candranya : Surating raditya = tajam ingatannya, dapat mengerjakan segala pekerjaan, dapat menggrirangkan hati orang lain.",
  },
  {
    Wukir:
      "Sanghyang Batara Mahayekti = besar hatinya, menghendaki lebih dari sesama. Tunggalnya : didepan = akhirnya hidup senang. Menghadapi air di jembung besar = baik budi pekertinya. Pohonnya : Nagasari = bagus rupaya, sopan-santun, jika bekerja dicintai oleh majikannya. Burungnya : Manyar = tak mau kalah dengan sesama, dapat mengerjakan segala pekerjaan. Gedungnya didepan = memperlihatkan kekayaannya, pradah hanya lahir. Bahayanya : dianiaya.Penangkalnya : selamatan nasi uli, beras sepritah dikukus, daging ayam ayam putih dimasak pakai santan dan sayur lima macam. Selawatnya 4 keteng. Doanya rajukna. Candranya : Gunung artinya jika didekati sulit dan berbahaya jika dilihat dari jauh menyedapkan pemandangan. Ketika kolo wuku berada ditenggara, dalam 7 hari tidak boleh mendatangi tempat kolo.",
  },
  {
    Kurantil:
      "Sanghyang Batara Langsur = pemarah. Memanggul tunggal = akhirnya mendapat kesenangan hidup. Air dalam jimbung besar disebelah kiri = serong hatinya. Pohonnya : Ingas = tak dapat untuk berlindung, karena panas. Burungnya : Salinditan = tangkas. Gedungnya terbalik didepan = murah hati. Bahayanya : jatuh memanjat.Penangkalnya : selamatan tumpeng beras sepitrah dikukus, lauknya daging ayam lereng dipecal. Selawatnya 7 keteng. Doanya : rajukna dan pina. Candranya : Woh-wohan = tak tentu rejekinya.Ketika kolo wuku berada dibawah, dalam 7 hari tak boleh turun dari gunung dan tak boleh menggali tanah.",
  },
  {
    Tolu: "Sanghyang Batara Bayu = dapat menyenangkan hati orang lain, kalau marah berbahaya, tak dapat dicegah, Tunggulnya : dibelakang = kebahagiannya terdapat dibelakang hari. Pohonnya : Wijayamulya = sangat indah rupanya, tajam roman mukanya, tinggi adat-istiadatnya, teliti, suka pada kesunyian, selamat hatinya. Burungnya : Branjangan = riang tangan, cepat bekerjanya. Gedungnya didepan = suka memperlihatkan kekayaannya, pradah hanya lahir. Bahayanya = ditanduk atau disiung.Penangkalnya : selamatan nasi uduk beras sepitrah dikukus, lauknya daging ayam dimasak dengan santan. Selawatnya 3 keteng. Doanya : Kabul. Candranya : Wangkawa = angkuh, tidak tetap, suka bohong.Ketika kolo wuku berada dibarat-laut, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Gumbreg:
      "Sanghyang Batara cakra = keras budinya, segala yang dikehendakinya segera tercapai, tak mau dicegah, pengasih. Kakai sebelah yang didepan direndam dalam air = perintahnya dingin didepan, panas dibelakang. Pohonnya : beringin = jadi pelindung keluarganya, budinya tinggi. Burungnya : ayam hutan = liar, dicintai oleh para agung, suka tinggal ditempat sunyi. Gedungnya dikirikan = penyayang, jika marah taka sayang kepada harta bendanya.Bahayanya : tenggelam atau kejatuhan dalam. Tangkalnya : selametan nasi pulen beras sepitrah dikukus, lauknya daging ayam berumbun yang masih muda dan daun-daun 9 macam. Selawatnya 4 keteng. Doanya : Rajukna. Candranya : Geter nekger ing wijati = hening pikirannya, perkataannya nyata redhoan.Ketika “kala wuku” berada di Selatan menghadap utara, dalam 7 hari tidak boleh memandang wajah kala.",
  },
  {
    Warigalit:
      "Sanghyang Batara asmara = bagus rupanya,senang asmara, cemburuan, hatinya mudah tersentuh, Pohonnya : sulastri = bagus rupanya, banyak yang cinta. Burungnya : kepodong – cemburuan, tak suka berkumpul dengan orang banyak. Bahayanya : tersangkut suatu perkara.Tangkalnya : selametan nasi urap beras sepitrah dikukus, lauknya daging kerbau ranjapan (pembelian bersama-sama), dimasak getjok. Selawatnya 8 keteng. Doanya : tolak bilahi. Candranya : kaju kemladean ngajak sempal = dimana-mana dapat tumbuh. Ketika “kala wuku” berada diatas, dalam 7 hari tidak boleh mendatangani tempat kala",
  },
  {
    Warigagung:
      "sanghyang mahajekti = berat tanggungannya, berkeinginan. Tunggulnya : dibelakang – rejekinya dibelakang hari. Pohonnya : cemara = rame bicaranya, lemah lembut perintahnya dan dihormati. Burungnya : betet = keras kemauannya, pandai mencari kehidupan. Gedungnya dua buah dibelakang  dan didepan = ichlasnya hanya setengah. Bahayanya : dimarahi temannya.Penangkalnya : selamatan nasi uduk bers sepitrah dikukus, lauknya daging bebek dimasak gurih dan daun-daunan 5 macam. Selawatnya 5 keteng. Doanya : rasul. Candranya : Ketug lindu = menepati perkataannya, jika marah menakutkan, tidak mau menerima takdir. Ketika “kala wuku” berada di utara menghadap ke selatan, dalam 7 hari tidak boleh mendatangani tempat kala.",
  },
  {
    Julungwangi:
      "sanghyang sambu = tinggi perasaannya, tidak boleh disamai. Mengahadap air dijembung = pradah ikhlasan, akan tetapi harus diperlihatkan harum = dicintai oleh orang banyak. Burungnya kutilang = banyak bicara dan perkataannya dipercayai orang, dicintai para pembesar.Bahayanya : diterkam harimau. Tangkalnya : selamatan nasi pulen beras sepitrah dikukus, lauknya daging ayam brumbun dan uang suwang (+/- 81 ½ sen). Selawatnya : kucing. Doanya Tolak bilahi. Candranya : kasturi arum angambar = segala kehendaknya belum terjadi telah tersiar banyak yang cinta.",
  },
  {
    Sungsang:
      "sanghyang gana = pemaranh, gelap hati. Air dijebung didepannya +/- pradah, ikhlasan, harus diperlihatkan pemberiannya, banyak rejekinya. Pohonnya : tanganan = tak suka menganggur, keras budinya, suka kepada kepunyaan orang lain. Burungnya : nori = pemboros, jauh kebahagiaannya, murka. Gedungnya terbalik dibelakang = ikhlasan dengan tidak pakai perhitungan.Bahayanya : kena besi. Tangkalnya : selamatan nasi megana dan tumpeng betas 2 pitrah, daun-daunan 9 macam dicampur dalam tumpeng. Selawatnya 10 keteng. Doanya : Kabul. Candranya : sekar wora-wari bang = besar amarahnya, tetapi mudah dicegah. Ketika “kala wuku” berada di timur dalam 7 hari tidak boleh mendatangani tempat kala.",
  },
  {
    Galungan:
      "Sanghyang Batara Komajaya = teguh hatinya, dapat melegakan hati orang susah, cinta pada perbuatan baik, jauh kepada perbuatan jahat. Memangku air dalam bokor =suka bersedekah, pengasih, namun sedikit rejekinya. Pohonnya : Tanganan  = ringan tangan, keras budinya, gampang suka pada kepunyaan orang lain. Burungnya : Bido = besar nafsunya, murka.Bahayanya : berselisih.Penangkalnya : selamatan nasi beras sepitrah dikukus, lauknya daging kambing. Doanya : Selamat pina. Candranya : peksi wonten ing luhur = jika mencari hasil dengan menundukkan kepala, sebab gora-goda. Ketika kolo wuku berada di selatan daya, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Kuningan:
      "Sanghyang Batara Indra = melebihi sesama, tinggi derajatnya. Pohonnya : Wijayakusuma = rupanya sangat indah, sangat puaka, tinggi budinya dan teliti, menghindari keramaian, selamat hatinya. Burungnya : Urang-urangan = cepat bekerjanya, lekas marah, pemalu.Gedungnya dibelakang, jendelanya tertutup = hemat. Bahayanya = diamuk..Penangkalnya : selamatan nasi punar beras sepitrah dikukus, lauknya daging kerbau membelinya beramai-ramai, digoreng. Selawatnya 11 keteng. Doanya : Kabul. Candranya : Garojogan = rame bicaranya, banyak bohong.Ketika kolo wuku berada di Barat, dalam 7 hari tak boleh mendatangi tempat kala",
  },
  {
    Langkir:
      "Sanghyang Batara Kala menggigit bahunya sendiri = besar nafsunya, tidak sayang kepada badannya sendiri, yang melihat takut, buruk adat-istiadatnya, tidak mau menurut, murka, banyak larangan. Pohonnya : Ingas dan cemara tumbang = panas hati, tak boleh didekati orang.Penangkalnya : selamatan nasi uduk beras sepitrah dikukus, lauknyadaging kambing dan ikan dimasak pakai santan, sayuran secukupnya. Selawatnya 5 keteng. Doanya : Slametpina. Candranya : Redi gumaludug = bicaranya menakutkan, tetapi tidak mengapa.Ketika kolo wuku berada di selatan daya, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Mandasia:
      "Sanghyang Batara Brama, kuat budinya, pemaran, tak mau memberi ampun, jika marah tak dapat dicegah, tegaan. Pohonnya : Asam = kuat dan dicintai orang banyak, jadi pelindung sengsara. Burungnya : Platukbawang = kuat budinya, cepat pekerjaannya, tidak sabaran. Gedungnya terguling didepan = hemat dan banyak rejekinya. Bahayanya : Kena api dan dijahili orang.Penangkalnya : selamatan nasi merah beras sepitrah dikukus, sayur bayam merah, daging ayam merah dipindang dan bunga setaman yang merah. Selawatnya uang baru 40 keteng. Doanya : Slamat. Candranya : Watu item munggeng papreman lan wreksa gung lebet tancepnya = sabar, tetapi jika marah kejam.Ketika kolo wuku berada diatas, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Djulungpujut:
      "Sanghyang Batara guretno, = suka kepada keramaian, tersiar baik, mempunyai kedudukan yang lumayan. Menghendaki bukit = besar kemaunnya, tak suka diatasi, menghendaki memerintah. Pohonnya : Rembuknya = indah warnanya, tidak berbau, dimana-mana jadi kunjungan orang. Burung : Prijohan = besar kemauannya, halus budinya. Bahayanya : diteluhPenangkalnya : selamatan tumpeng beras sepitrah dikukus, daging ayam merah dipanggang, daun- daunan 9 macam.Selawatnya 30 keteng. Doanya : Balasrewu dan Kunut. Candranya : Palwa ing samodra = kesana-kemari mencari nafkah, rejekinya tidak kurang.Ketika kolo wuku, berada di utara dan selatan, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Pahang:
      "Sanghyang Batara tantra = perkataannya melebihi sesama, tidak sabaran menepati janji. Jembungnya disebelah kiri dibelakangnya = suka jalan serong. Memanggul senjata tajam = waspada, kasar perkataannya, panas hati, suka bertikai. Pohonya : Kendayaan = jadi pelindung orang sakit, orang sengsara dan orang minggat. Burung : Cocak = gelatak bicaranya. Gedung telentang = boros.Bahayanya : dianiaya.Penangkalnya : selamatan nasi uduk beras sepitrah, lauknya daging ayam dimasak sansan, daun-daunan 11 macem. Selawatnya 9 keteng. Doanya : Rasul.Candranya : Pulo katinggal saking tebih = tersiar semua tingkah lakunya, lahirnya suci, batinnya kotor, angkuh, selalu susah.Ketika kolo wuku berada di Barat-Laut dalam 7 hari tak boleh mengunjungi tempat kala.",
  },
  {
    Kuruwelut:
      "sanhyang wisnu : tajam ciptanya, tinggi dan selamat budinya, melebihi sesama dewa. Memanggul : cakra = tajam hatinya, berhati-hati. Pohonnya : parijata = jadi pelindung dan besar kebahagiaannya. Burungnya : puter = jika berbicara mula-mula kalah, akhirnya menang, tidak pernah bohong, tidak suka terhadap perkataan yang remeh. Gedungnya didepan = memperlihatkan kekayaannya, puaka tak dapat dipermudah.Bahayanya : kena racun daun. Tangkalnya : selamatan bermacam-macam sayuran, jajan pasar, sekar boreh, tindihnya uang lama sebaranDoanya : tawil. Candranya : tirta wening = sedikit bicaranya, suci hatinya, diturut perintahnya, jadi tempat pengungsian. Ketika “kala wuku” berada diatas, dalam 7 hari tidak boleh mendatangitempat kala.",
  },
  {
    Mrakeh:
      "sangsyang surenggana = tawakal hatinya, agak ingatan, berkesanggupan, berani kepada kesulitan. Tunggulnya membalik = lekas hidup senang. Pohonnya : Trengguli = buahnya tidak berguna. Tak mempunyai burung = tak boleh disuruh jauh, tentu mendapat bahaya. Gedungnya dipanggul = memperlihatkan pemberian. Bahayanya : tenggelam.Tangkalnya : selamatan nasi uduk, daging ayam mulus dimasak dengan santan dan bermacam-macam ketan. Selawatnya 100 keteng.Doanya : tolak bilahi. Candranya : pandam ageng amerapit = tawakal, mempunyai hati kasihan kepada orang miskin. Ketika “kala wuku” berada di utara, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Tambir:
      "sanghyang siwa = lahir dan batinnya terkadang berlainan. Pohonnya : Upas = bukan tempat perlindungan, tajam perkataannya. Burungnya : prenjak = tahu petunjuk gaib, suka membuat perkabaran yang mengherankan.Gedongnya ditengah = tinggi percaya dirinya  Bahayanya : terkena pasangan. Tangkalnya : selamatan nasi pulen beras sepitrah diliwet, lauknya daging bebek dan ayam dipindang, kuah merah dan putih dan ketimun 25 buah. Selawatnya : pisau baja dan jarum satu. Doanya : slamet dina. Candranya : idune lir upas ratjun = dihargai semua perkataannya. Ketika “kala wuku” berada di barat daya, dalam 7 hari tidak boleh mengunjungi tempat kala.",
  },
  {
    Madangkungan:
      "sanghyang basuki : ahli bicara, tawakal, tetap hatinya. Pohonnya : plasa = hanya jadi perhiasan hutan, tidak ada gunanya. Burungnya : pelug = suka tinggal di air, suka tinggal ditempat sunyi. Gedungnya di atas = mendewa-dewakan kekayaannya, tawakal, hemat. Bahayanya : dibunuh pada waktu malam.Tangkalnya: Selamatan nasi punar beras sepitrah dikukus, lauknya daging ayam kuning (wiring kuning) dan berumbun, digoreng, jenang merah pada waktu hari kelahirannya. Selawatnya : 5 keteng. Doanya : ngumur. Candranya : umajang kang tetabuhan = menepati perkataan, dan dapat menyenangkan hati orang lain. Ketika “kaa wuku” berada di timur, dalam 7 hari tak boleh mendatangi kala",
  },
  {
    Maktal:
      "sanghyang sakri = lurus hatinya, baik pekerjaannya. Pohonnya : nagasari = bagus rupanya, lemah lembut tutur katanya, dicintai oleh pembesar. Burungnya : ayam hutan = liar dan tinggi budinya, banyak tanda-tandanya akan mendapat bahagia, suka tinggal ditempat sunyi. Gedungnya ditumpangi tunggal = kaya benda dan dihormati. Bahayanya = bertikai.Tangkalnya : selamatan nasi uduk, daging ayam dan bebek dimasak 2 macam, dipindang dan dimasak dengan santan, niatnya : ngrasul. Selawatnya 4 keteng. Doanya : rasul. Candranya : lesus awor lan pancawara = lebar pemandangannya, dalam pikirannya. Ketika “kala wuku” berada di timur laut, dalam 7 hari tak boleh mendatangi kala",
  },
  {
    Wuje: "betara kuwera = menggirangkan hati orang lain, perkataannya lurus dan mengherankan, singkat hati, tetapi sebentar baik. Memasang keris terhunus disebelah kaki = waspada dan tajam hatinya. Pohonnya : Tal = panjang umurnya, besar tanda kebahagiannya, kuat dan tetap hatinya. Burungnya : gogik = cemburuan, tak suka kepada keramaian. Gedungnya terlentang didepan = pengasih.Bahayanya : diteluh. Tangkalnya : selamatan jajan pasar secukupnya dan bermacam-macam ketan seharga sataksawe (+/- 10 sen). Yang dibeli dahulu madu untuk selanunggal rum arum = peteng hati, sukar dijalani, suka kepada bau harum, besar kehendaknya. Ketika “kala wuku “ berada di barat, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Manahil:
      "Sanghyang Batara Citragatra = menjunjung diri sendiri, dapat berkumpul ditempat ramai, bakat angkuh, selalu bersedia-sedia untuk membela diri. Air dijembung dibelakangnya = Arum perintahnya, akan tetapi tak mempunyai pangkat. Memangku tombak terhunus = waspada dan tajam hatinya.Pohonnya : Tageron = sedikit faedahnya, liat hatinya. Burungnya : Sepahan = liar budinya, tajam pikirannya. Bahayannya : terkena senjata tajam.Penangkalnya : selamatan nasi liwet beras sepitrah, lauknya daging ayam dan ikan, sayuran secukupnya, sambal gepeng. Selawatnya 8 keteng. Doanya : Selamat tolak bilahi. Candranya : Trenggana abra ing wijit = sabar segala kemauannya, tak suka menganggur, banyak kemauannya.Ketika kala wuku berapa di Tenggara, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Prangbakat:
      "Sanghyang Batara Bisma = pemarah, tangkas, pemalu, memperlihatkan watak prajurit, menghendaki jadi pemimpin orang, lurus pembicaraannya, segala yang dikehendaki tak ada sukarnya. Kakinya kanan direndam dalam air jembung = perintahnya dingin didepan panas dibelakang. Pohonnya : Tirisan = panjang umurnya, cukup rejekinya, tetap pikiranya.Burungnya : urang-urangan = cepat kerjanya. Bahayanya : memanjat atu karena tingkahnya sendiri. Tangkalnya : selamatan nasi tumpeng beras sepitrah, lauknya daging sapi, dimasak bumbu manis, sayuran secukupnya. Selawatnya : pacul. Doanya : aelamat pina. Candranya : wesi trate pulasani = keras hatinya, cepat kerjanya, pemberi, jujur, belas kasihan. Ketika “kala wuku” berada dibawah, dalam 7 hari tak boleh turun dari gunung dan menggali tanah.",
  },
  {
    Bala: "Sanghyangbatari Durga = suka berbuat huru-hara,membuat berita, jahil, suka bercampur dengan kejahatan, tak ada yang ditakuti, pandai sekali bertindak jahat. Pohonnya : cemara = ramai bicaranya, lemah lembut perintahnya dan dihormati.Burungnya : Ayam hutan = liar budinya, dicintai oleh pembesar, tinggi budinya, banyak tanda-tanda akan mendapat bahagia, suka tinggal ditempat yang sunyi. Gedungnya didepan = memperlihatkan kekayaannya, pradah dilahir. Bahayanya : diteluh dan kena upas.Penangkalnya : selamatan nasi tumpeng beras sepitrah dikukus, sayur 7 macam, panggang ayam hitam. Selawatnya 40 keteng. Doanya : Rajukna : Udan salah mangsa = rejekinya dari jual beli.Ketika kala wuku berada di Barat-Laut, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Wugu: "Sanghyang Batara Singajala = banyak akal, lekas mengerti, baik budinya. Pohonya : Wuni sedang berbuah = siapa yang melihat bagaikan mengidam, akan tetapi jika telah makan, sering mencela, banyak rejekinya. Burungnya : Podang = cemburuan, tidak suka berkumpul. Gedungnya tertutup dibelakang = hemat dan pendia. Bahayanya : digigit ular dan disia-sia.Penangkalnya : selamatan nasi pulen beras sepitrah dikukus dan bermacam-macam ketan, jajan pasar, lauknya daging bebek putih sejodoh dimasak dengan santan. Selawatnya 10 keteng. Doanya: Selamat. Candranya : awang-uwung = baik budinya.Ketika kala wuku berada di sebelah Selatan, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Wayang:
      "Sanghyang batari Sri = banyak rejekinya, pradah, bakti, teliti, dingin perintahnya dicintai oleh orang banyak. Jembung berisi air didepan dan duduk disitu = sejuk hatinya, sabar, rela hati, akan tetapi harus diperlihatkan pemberiannya. Pasang keris terhunus = perintahnya mudah didepan, sukar dibelakang. Pohonnya = Cempaka = dicintai oleh orang banyakBurungnya = Ayam hutan = dicintai oleh pembesar, liar budinya, berbakat angkuh, senang tinggal ditempat yang sunyi. Bahayanya : kenah tulah dan difitnah.Penangkalnya : selamatan nasi tumpeng beras sepitrah dikukus, daging kambing kendit dimasak macam-macam ketan, ayam dimasak sesukanya, sayuran secukupnya. Selawatnya 40 keteng. Doanya : selamat. Candranya : damar murub, bumi langit = selamat, banyak ilmunya.Ketika kolo wuku berada diatas, dalam 7 hari tak boleh naik.",
  },
  {
    Kulawu:
      "Sanghyang Batara Sadana = kuat budinya, besar harapannya. Duduk dijembung berisi air ditepi kolam = sejuk hatinya, dingin perintahnya. Membelakangi senjata tajam = pikirannya terdapat dibelakang, kurang pandai. Pohonnya : Tal = panjang umurnya, besar harapannya, kuat budinya.Burungnya : Nori, boros, murka. Gedungnya didepan = memperlihatkan kekayaannya, pradah hanya lahir. Bahayanya : terkena bisa. Penangkalnya : selamatannasi golong beras sepitrah dikukus, lauknya daging ayam dan bebek yang berwarna merah, ikan dan daging burung, dimasak sekehendahnya. Selawatnya 5 keteng. Doanya : Kabula. Candranya : Bun tumetes ing sendang = ketika kecil miskin, akhirnya besar kebahagiannya, banyak rejekinya.Ketika kala wuku berada di Utara, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Dukut:
      "Sanghyang Batara Sakri = keras hatinya. Menghadapi keris terhunus = waspada, tajam pikirannya, segala yang dilihatnya berhasrat dipunyainya. Pohonnya : Pandan wangi = kiri tempatnya, dengki, tak boleh didekati. Burungnya : Ayam hutan = dicintai oleh para pembesar, liar dan tinggi budinya, besar harapannya, suka tinggal ditempat sunyi.Membelakangi gedungnya = hemat dan pendiam. Bahayanya : dimedan perang.Penangkalnya : selamatan nasi tumpeng beras sepitrah dikukus, lauknya panggang ayam putih mulus dan ayam brumbun. Selawatnya satakswawe. Doanya : Slamet. Candranya : tunggul asri sesengkeraning nata = bagus rupanya, penakut.Ketika kala wuku berada di Barat, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
  {
    Watugunung:
      "Sanghyang Batara Antaboga dan batari Nagagini. Antaboga = senang tinggal alam untuk bertapa. Nagagini = gemar kepada asamara. Menghendaki janji = suka bertapa ditempat yang sunyi, jika menjadi pendita, mendapat kehormatan, gemar bersemedi, sering bersedih hati. Pohonnya : Wijayakusuma = rupawan, tinggi budinya, tidak suka pada keramaian, terlihat angkuh, teliti. Burungnya : Gogik = cemburuan. Bilahinya : teraniaya.Penangkalnya : selamatan beras sepitrah dikukus, lauknya daging binatang yang diburu, binatang berliang, burung, semuanya yang halal, dimasak bermacam-macam jenang, daun-daunan 7 macam. Selawatnya 9 keteng. Doanya : Mubarak. Candranya : Lintang wulan keraianan = terang hatinya, tetapi tidak bercahaya.Ketika kala wuku berapa di timur, dalam 7 hari tak boleh mendatangi tempat kala.",
  },
];

const hariLahir = {
  Senin:
    "Tidak pelit, ikhlas hati dalam memberi, tidak bisa menyimpan uang, senang membela kebenaran, mudah tersinggung dan tidak pandai bicara.",
  Selasa:
    "Mudah terpengaruh, tidak mempunyai pendirian tetap, gampang naik darah, tidak sabaran dan selalu mau menang sendiri.",
  Rabu: "Pendiam namun kalau sudah bicara tidak terduga, tidak suka mencampuri urusan orang lain, baik hati, suka menolong dan banyak rejeki.",
  Kamis:
    "Pendiriannya tidak tetap, suka dipuji, mudah emosi, mudah terbujuk oleh rayuan halus dan tidak sabaran.",
  Jumat:
    "Disukai orang banyak, kuat mental, suka menolong, suka memberi nasehat yang baik dan suka mempelajari ilmu pengetahuan.",
  Sabtu:
    "Giat bekerja, rajin pandai mencarari rejeki, ditakuti orang banyak, pandai menempatkan diri dan bisa menyelesaikan apa yang menjadi tanggung jawabnya dengan baik.",
  Minggu:
    "Pandai bergaul, disukai orang banyak, berjiwa besar, suka merendahkan diri, pandai berbicara dan dapat mengatasi masalah yang dihadapiya dengan baik.",
};

const hariWeton = {
  "Minggu Kliwon":
    "orang yang lahir dengan weton minggu kliwon memiliki sifat teguh terhadap pendirian, lurus pemikirannya , adil dalam pertimbangannya. didalam sebuah komunitas atau lingkungan menjadi orang yang terpandang sebagai orang yang lebih tua, walaupun usianya mungkin masih lebih muda dari pada yang lain karena sifat kedewasaannya tersebut. kejelekannya adalah: tidak mau mendahului pikiran (pendapat) maupun tindakannya oleh orang lain, sebab ia akan kecewa dan kesal hatinya sejak saat itu.",
  "Senin Legi":
    "apa bila seorang laki laki yang memiliki weton ini maka pikirannya pendek, hatinya kurang jujur namun jika seorang wanita tabiatnya tergolong pertengahan. dalam pergaulan hidup cukup akrab dengan teman kenalannya, seperti pada umumnya.",
  "Selasa Pahing":
    "jika laki laki ia tidak bersahaja pikirannya, banyak tingkah lakunya yang kurang baik jika ia perempuan maka memiliki sifat pada tutur katanya yang suka melampaui batas, berani terhadap lelaki/ suami dan juga hatinya kurang baik.",
  "Rabu Pon":
    "baik laki laki maupun wanita yang memiliki weton ini menjadi orang yang pemalu, mampu mencari rezeki sendiri-sendiri, apabila dalam rumah tangga yang kebetulan sama hari dan pasaran kelahirannya rabu pon maka sama – sama pandai mencari rezeki karena rajin dalam pekerjaanserta jujur dan bik hati.",
  "Kamis Wage":
    "orang yang lahir pada kamis wage otaknya selalu bekerja meski dalam diam sekalipun, baik merancang sesuatu ataupun menilai dan menimbang dengan seksama segala hal , apabila sekali saja mendengarkan suara , kata katanya dapat mengenai sasaran. crangnya cekatan dan tangkas dalam menghadapi kesulitan atau bahaya.",
  "jumat Kliwon":
    "apabila laki-laki, orangnya kurang suka berbicara bila dirasa tidak perlu benar. dalam pergaulan juga kurang lincah. apabila perempuan tutur dan sepak terjangnya bebas dan terlalu berani terhadap laki-laki.",
  "Sabtu Legi":
    "orangnya mudah sekali marah namun pandai mencari rezeki, berbakat untuk menjadi orang kaya apabila berkenaan dihatinya , sangat pemurah ia didalam memberikan kepada orang lain. cocok apabila memelihara kuda karena akan cepat kaya.",
  "Minggu Pahing":
    "orangnya cerdik, lincah dan tangkas. sayang sedikit memiliki rasa ke kakuan yang berlebihan sifatnya, seolah-olah ia menjadi tokoh yang sudah sempat menjelajahi dunia.",
  "Senin Pon":
    "lincah serta cekatan dalam mencari rezeki. pandai menyesuaikan diri dengan alam dan lingkungannya, pandai pula mengenakan hati orang . perkataannya halus dan menarik hati.",
  "Selasa Wage":
    "seseorang yang memiliki weton selasa wage tidak ramah baik dalam sikap maupun perkataannya , tidak suka mendengar nasehat serta tidak dapat menghargai budi kebaikan orang lain . jangankan niat untu menghargan malahan terkadang di balas dengan perbuatan yang buruk. namun apabila ia seorang perempuan memiliki sifat yang bagus yaitu baik, gemar menabung dan tingkah lakunya cukup serasi dalam pergaulan.",
  "Rabu Kliwon":
    "pikirannya hidup, lincah dan pandai menyesuaikan diri dalam pergaulan. sayang sekali terhadap perempuan/ istri hatinya kurang jujur. pada pertengahan umur biasanya apabila telah seringkali terbentur -bentur hidupnya , kemudian memilih hidup tenang bersemedi.",
  "Kamis Legi":
    "luas pikirannya tetapi tidak mau ditandingi. apalagi sampai jumpa orang yang melebihinya sikap ramah-tamahnya bisa mendadak lenyapberganti mendung meliputi wajahnya. jika ia seorang wanita wataknya tidak jujur, berani terhadap laki-laki/ suami.",
  "jumat Pahing":
    "rajin bekerja apabila sempat bersekolah tinggi (sampai menjadi orang pandai) banyak orang yang berguru kepadanya . sifat pendiam , jika di hinggapi sifat buruk, kejahatannya tak kepalang tanggung. bakat menjadi pengarang besar atau ahli nujum dan lain sebagainya ada padanya.",
  "Sabtu Pon":
    "rajin dalam segala pekerjaan yang menjadi beban kewajibannya, lincah dan tidak mau duduk diam. pada siang hari ada saja acara atau sesuatu yang dikerjakannya. apabila ia seorang wanita maka pintar dalam mencari rejeki dan lincah dalam bekerja namun juga memiliki sifat jelek yaitu kurang jujur hatinya.",
  "Minggu Wage":
    "besar kemauannya, sukar dihalangi kehendaknya artinya pendiriannya pantang dihalang karena akan diterjang dan di babat. wanita yang berkelahiran ini juga kurang jujur hatinya.",
  "senin Kliwon":
    "pendiam akan tetapi sekali bicara cukup mengandung arti dalam dan luas tutur cakapnya. bila kurang mendapat pendidikan baik bicaranya yang sangat langka itu mudah menimbulkan sakit hati atau mematahkan semangat orang. semasa muda tampaknya tumpul pikirannya, tetapi setelah meningkat usiannya, biasanya bangkit akal pikirannya, pandai dan halus budi pekertinya.",
  "Selasa Legi":
    "kurang lincah dalam pergaulan/ agak kaku. apabila banyak mendapat nasehat dari orang lain. teladan dan didikan baik besar harapan ia akan menjadi masyarakat banyak jasa pembelaannya dengan tenaga atau pikirannya. akalnya banyak, pikirannya jernih, hatinyapun baik tetapi apabila dihinggapi sikap masa bodoh segala sifat baik tersebut diatas tidak bakal terdapat bahkan ia menjdai seorang yang tidak disukai dalam pergaulan.",
  "Rabu Pahing":
    "cerdas, kuat daya pikirnya , tetapi tak suka melihat orang lain melebihi dirinya dan suka sekali pada pujian dan sanjungan.",
  "Kamis Pon":
    "pendiam, hemat dalam hidupnya, punya anggapan diri serba melebihi orang lain. terutama dalam soal kebersihan ( danandanan dan memelihara tubuh) maupun pekerjaan – pekerjaan lainnya.",
  "jumat Wage":
    "memili sifat seorang pandita atau orang berilmu tinggi. ada di miliki mereka yang lahir pada jum’at wage. lincah, ramah sikap tingkah maupun tutur bicaranya. banyak cakapnya tetapi serba dipertimbangkan baik buruknya terlebih dahulu. tegas dalam tindakannya walaupun kadang-kadang terlalu keras dan kejam terasanya bagi yang bersangkutan. dalam hal menolong ini tidak jarang pula menimbulkan kesulitan hidupnya sendiri.",
  "Sabtu Kliwon":
    "walaupun bodoh biasanya lebih suka berlagak pandai, orangnya pelupa dan kurang lincah gerak lakunya namun begitu ia seorang yang rajin dan jujru hatinya.",
  "Minggu Legi":
    "kurang berkembang akal pikirannya tetapi apabila sempat mendapat bimbingan dan pendidikan, dapat menonjol kepandaiannya, dibandingkan dengan orang yang ada disekitarnya. kejelekannya suka main permepuan dan tindakan-tindakan kurang baik lainnya.",
  "senin Pahing":
    "dalam pekerjaan ia kadang – kadang bersifat serakah ingin melakukan segala-galanya . akal pikirannya berkembang seperti lazim dan kebanyakan orang lain pada umumnya. wanita kelahiran senin pahing lebih banyak memiliki sifat-sifat baik dan kelebihan-kelebihan dari kaum pria.",
  "Selasa Pon":
    "sering mengambil keputusan/ tindakan terburu-buru, kurang dipertimbangkan sebelumnya(terlalu ceroboh) apabila menghadapi suatau masalahj yang besar. wanita yang memiliki weton selasa pon wataknya lebih baik juga berbakat menjadi istri ke 2 atau istri ke 3 dari orang yang berpangkat, kaya atau bangsawan.",
  "Rabu Wage":
    "cukup berkembang akal pikirannya, rajin menghadapi segala pekerjaan yang menjdai tugas kewajibannya. tetapi apabila wanita kelahiran ini terlalu berani terhadap lelaki atau suami.",
  "Kamis Kliwon":
    "akal pikirannyaa kurang berkembang, tetapi giat bekerja . wanita wataknya termasuk golongan sedang.",
  "jumat Legi":
    "bagaimanapun ia banting tulang mengusahakannya, sukarlah baginya menemukan buah pikiran sendiri didalam perjalanan hidupnya. apabila menghadapi kegagalan , biasanya sampai lama merenungkan tapi pikirannya buntu tidak bisa menemukan jalan keluar.",
  "Sabtu Pahing":
    "baik laki-laki maupun perempuan mempunyai kelincahan , kepandaian dalam mencari rizki, hemat dan suka menyimpan dalam sikap maupun tutur sapa dapat lembut dapat pula kasar.",
  "Minggu Pon":
    "mudah percaya pada tutur kata orang, mudah pula kena bujukan manis tanpa memikirkan akibat yang acap kali ternyata pahit dikemudian hari. wanita yang lahir pada minggu pon mempunyai sifat yang lebih baik, pandai menyimpan/ memanfaatkan segala hasil pendapatan sang suami.",
  "senin Wage":
    "kaku hati dan pendiriannya , keras kemauannya ( pantang mundur apabila memiliki niat) . sering melakukan tindakan- tindakan yang kurang dipertimbangkan sebelumnya, berani mati mati membela keyakinannya. wanita yang lahir pada weton ini bertabiat baik pada umumnya.",
  "Selasa Kliwon":
    "jika jahat tidak tanggung-tanggung. tetapi bila menjadi orang baik juga sampai menyerupai seorang dermawan atau ksatria yang pandai, suka menolong dan menasehati sesamanya juga ada bakat menjadi pujangga sastrawan atau pemimpin agama.",
  "Rabu Legi":
    "sederhana (bersahaja) , meminta mau memberipun rela. pikirannya adil, hatinya cerah. jika wanita cerdas dan manis budi.",
  "Kamis Pahing":
    "pendiam, jujur, hemat dan rajin bekerja . hidupnya mengutamakan keselarasan dan keserasian. apabila menjadi karyawan atau punya kedudukan , sangat dekat dengan atasan maupun pembesar-pembesar.",
  "jumat Pon":
    "akal pikirannya hidup, banyak ide-idenya yang baik. kejelekannya senang tampak pada wajahnya , tetapi bila tidak menyukai orang terang – terangan ia menyatakannya.",
  "Sabtu Wage":
    "memiliki sifat pelupa, namun rajin pula untuk mencobanya daya dan kemampuan pikiran untuk mengatasinya. hatinya kadang beku kaku bagaikan batu. mudah marah, tetapi cepat pula mereda kembali.",
};

const dataweton = [
  [
    "Minggu Legi",
    "Menurut primbon Jawa, seseorang yang lahir di hari Minggu Legi dapat dipengaruhi oleh Bintang Kala Sungsang, lakunya pendita sakti, memiliki watak yang pendiam, cerdas dan senang dalam bidang ilmu mistik. Orang yang lahir pada minggu Legi ini sangat jarang sekali orang yang diperkenankan untuk mengetahui isi hatinya yang paling dalam. Orang yang lahir dalam golongan ini termasuk orang yang tegas dan pendiam. Anda tampak sangat tenang dan terkontrol, bahkan ketika anda tampak sangat marah, senyuman yang tampak misterius itu tidak akan pernah lepas dari bibir anda. oleh karena itu, ketika anda merasa patah hati ataupun benci, hal ini akan menjadi pengalaman yang luar biasa bagi orang-orang di sekeliling anda. untuk anda yang lahir di minggu legi ini memiliki sifat yang cerdik, bahkan terkadang licik, dan sangat pandai mengorek/mencari informasi yang sifatnya rahasiah. untuk jodoh yang baik dan ideal adalah dengan orang yang lahir pada minggu wage, selasa pon, dan jum’at legi. Dalam hal urusan mencari rezeki untuk weton Minggu Legi/manis adalah dari arah Timur dan utara. Rejeki juga akan bertambah jika sudah memiliki anak. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Senin Pahing",
    "Berdasarkan primbon Jawa kelahiran untuk senin pahing, akan mendapat pengaruh dari Bintang Kukus, lakunya Bintang, Kencang dalam berbicara tetapi lembut hatinya. Orang yang lahir di senin pahing ini suka dalam hal menyampaikan pendapat dengan tegas, dan tidak mudah terpengaruh oleh perkataan orang lain bila tidak menemukan alasan untuk mempercayainya. Bagi orang yang lahir di senin pahing ini adalah seorang yang jujur, perasa, beriba, dan memiliki cita-cita yang tinggi. Anda juga seorang yang pekerja keras, dan tidak suka berfoya-foya. Cobalah untuk bisa mengendalikan perasaan yang sensitif agar tidak mudah tersinggung dari setiap perkataan atau tindakan orang lain. Sedangkan untuk urusan asmara/jodoh menurut weton sening pahing adalah jodoh yang baik dengan pasangan yang Timur dan Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Selasa Pon",
    "Berdasarkan primbon jawa, weton selasa pon mendapat pengaruh dari Bintang Asu, lakunya Pandita Sakti, Satria Wibawa, memiliki sifat yang keras dan pendiam. Dikalangan ini sangat menyukai materi dan kemewahan. Tingkat pemborosan mereka biasanya tergantung pada kemampuan finansial yang ada, akan tetapi keinginan mereka yang kuat untuk memiliki kehidupan yang serba mewah akan selalu mereka rasakan. Meski perasaan mereka cenderung untuk melindungi diri sendiri, mereka juga bisa menjadi sangat setia dan murah hati kepada siapa saja yang sesuai dengan standar pribadi mereka. Akan tetapi, sekali saja anda dekat berarti anda telah menjadi milik mereka seutuhnya, karena dikalangan ini sering merasa khawatir akan ancaman (baik nyata maupun hanya khayalan), sehingga tidak heran jika rasa cemburu yang berlebihan selalu menyertai mereka dalam setiap hubungan. Orang yang lahir di hari selasa pon memiliki sifat tertutup dan percaya dengan sesuatu hal yang irasional, mereka dapat bersikap ramah dalam bersosialisasi, mereka juga memiliki pendirian yang sangat kuat. Sedangkan untuk urusan jodoh yang ideal untuk kelahiran selasa pon adalah dengan orang yang lahir pada minggu wage, selasa pon, dan jum’at legi. Sedangkan untuk rezeki adalah dari arah Timur dan Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Rabu Wage",
    "Berdasarkan primbon Jawa, kelahiran orang ini mendapat pengaruh dari bintang Kartika, Satria Wibawa, mereka yang lahir pada rabu wage memiliki watak yang baik hati dan ramah dalam bergaul. Namun terkadang kata-kata mereka agak keras, biasanya mereka mudah dalam bergaul dengan orang lain dan menjunjung tinggi kejujuran dan niat baik. orang yang lahir di rabu wage ini suka menimbang pilihan mereka terlebih dulu dengan cermat sebelum melaksanakannya dan mereka juga memiliki sikap yang bijaksana. Walaupun mereka suka dengan barang-barang dan pelayanan yang mewah, tetapi mereka bukan tipe orang yang boros. Mereka sangat menghargai uang yang mereka miliki, dan terkadang sebagian dari mereka juga ada yang bersikap sangat hemat sehingga mereka terkadang dianggap orang yang pelit. Untuk urusan asmara/jodoh yang cocok dengan orang yang kelahiran selasa legi dan jum’at legi, apabila sesuai dengan jodohnya maka akan memiliki banyak anak dan akan bertambah banyak rezekinya dan arah rezekinya adalah ke arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Kamis Kliwon",
    "Menurut primbon jawa untuk kelahiran kamis kliwon ini dipengaruhi oleh Bintang Naga, lakunya air, sesuai dengan sifat yang dimiliki air, orang yang lahir pada kamis kliwon ini adalah tipe orang yang pantang menyerah, memiliki rencana besar dalam hidupnya. Namun, terkadang cita-cita yang ingin diraih terlalu besar sehingga anda menjadi korban dari imajinasi anda yang jauh berada diluar jangkauan anda. Meski demikian, bagi orang yang memiliki weton kelahiran kamis Kliwon ini tdak mudah menyerah, sikap yang optimis dan terhormat akan membuat anda diterima dengan baik oleh banyak orang. Anda suka menjadi seorang pemimpin, tetapi anda harus bisa menerima pendapat dari orang lain yang mungkin memiliki pendapat/ mempunyai sudut pandang yang berbeda dari pendapat anda. Namun anda memiliki sifat yang mudah tersinggung dan pemalas. Jodoh yang baik untuk weton kamis kliwon ini adalah dengan orang yang kelahiran jumlah neptunya dibawah jumlah enam belas. Akan tetapi harus diimbangi dengan kasih sayang yang tulus akan dapat membawa kebahagiaan dikemudian hari. Untuk urusan mencari rezeki adalah ke arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Jumat Legi",
    "Kelahiran pada hari Jum’at Legi/manis ini mendapat pengaruh dari bintang banyak Angrem, sifat yang lebih ditonjolkannya adalah kejujuran. Bagi orang yang lahir pada Jum’t Legi ini cenderung memiliki sifat yang jujur. Bahkan, kemungkinan mereka terkadang terlalu jujur sekali, karena mereka adalah orang yang suka mengumbar pembicaraan tanpa pandang bulu. Pendirian mereka cukup teguh, namun sikap yang seperti ini terkadang akan menghambat kemampuan yang mereka miliki untuk menerima orang lain secara apa adanya. Sebaiknya jangan memancing amarah mereka, karena ketika sedang naik darah, mereka bisa bertindak ekstrim. Meskipun begitu, mereka orang yang setia dan murah hati kepada orang-orang yang dicintainya. Sifat Simpati mereka mudah sekali timbul sehingga mereka tidak keberatan untuk membantu teman ataupun orang asing. Ramalan Asmara yang ideal untuk weton ini adalah dengan kelahira legi dan jum’at legi. Sedangkan arah untuk mencari rezeki adalah ke arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Sabtu Pahing",
    "Primbon weton Sabtu Pahing ini bintangnya Ru, Lakunya Api, Satria Wibawa, karena memiliki sikap api akibatnya cepat marah. Sehingga bagi anda yang lahir pada hari sabtu pahing, kemungkinan anda mudah naik darah. Namun, untungnya ketika anda cepat marah dan secara cepat pula anda melupakan penyebabnya. Semoga saja orang lain dapat memaafkan anda dengan mudah juga, karena bukan sesuatu hal yang mudah untuk mengakui kesalahan yang kita lakukan. Bahkan meski anda memiliki semangat hidup yang tinggi dan terkadang akan berakibat pada kecerobohan, anda akan bersikap lebih waspada lagi bila menyangkut masalah materi. orang yang lahir pada sabtu pahing ini merupakan salah satu tipe orang yang selalu siap membantu teman yang sedang mengalami kesusahan. Sedangkan Ramalan Asmara yang cocok adalah Rebo wage, kamis wage, selasa wage, dan minggu wage. Sedangkan Untuk mencari rezeki yang sesuai adalah ke arah timur dan ke Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Minggu Pon",
    "Menurut primbon jawa hari weton dan pasarannya Minggu Pon dipengaruhi oleh bintang paterem, lakunya bumi, sifatnya tidak banyak bicara, tapi bagi orang yang lahir pada minggu pon ini termasuk tipe orang yang sensitif karena terkadang bisa terbawa emosi. Kemungkinan ia merasa takut disakiti, orang yang wetonnya minggu pon ini selalu menjaga perasaannya, untuk masalah hati dan pikirannya juga begitu dalam, tapi terkadang orang lain bisa menganggap anda orang yang tertutup. kemungkinan anda sudah bisa mengembangkan penilaian baik buruknya sifat pada manusia. Dengan memiliki bakat ini, anda bisa menjadi seorang diplomat yang handal tapi mampu berbelit-belit dalam berbicara atau bisa menjadi seorang manipulator yang licik. Namun, anda selalu berusaha untuk bisa menampilkan yang terbaik di hadapan teman-teman anda. Walaupun mungkin saja anda mampu mengambil cara yang tidak langsung atau mungkin saja anda menunggu waktu yang tepat, akan tetapi lama kelamaan anda pasti akan merebut kesempatan untuk memperlihatkan kelebihan anda, baik dari segi material atau intelektual. Sedangkan untuk urusan jodoh/asmara yang cocok adalah dengan orang yang lahir pada selasa kliwon, jum’at kliwon, selasa legi dan jum’at legi. Ramalan untuk mencari rezeki adalah ke arah Barat dan ke Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Senin Wage",
    "Menurut primbon jawa, sifat, watak, dan rezeki dari weton senin wage dipengaruhi oleh bintang lembu, lakunya api, hal ini dapat mengakibatkan cepat marah tapi tidak mudah keburu napsu. Bagi anda yang lahir pada hari senin wage anda akan jarang terjebak dalam keadaan yang memalukan. Hal ini dikarenakan anda suka sekali merencanakan dan menimbang-nimbang pilihan anda dengan berhati-hati sebelum mengambil tindakan yang lebih jauh. Cukup dengan kejujuran saja dan tidak keberatan menjadi seorang pendengar yang baik untuk permasalahan orang lain. Karena berkat pendekatan anda yang tenang, sehingga anda bisa tampil meyakinkan di hadapan masyarakat. Agar anda bisa memiliki kemampuan untuk menjadi seorang diplomat yang handal. Meskipun begitu, sekali saja anda marah, anda tidak mau menerima alasan dalam hal apapun. Untuk ramalan perjodohan yang paling serasi adalah dengan orang yang lahirannya selasa dan jum’at apapun pasarannya. Sedangkan arah yang sesuai untuk mencari rezeki yaitu dari arah Timur dan dari arah utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Selasa Kliwon",
    "Menurut primpon jawa kelahiran pada hari selasa kliwon ini diayomi oleh bintang pedati, lakunya suatu kecocokan sehingga mudah mendapatkan kasih sayang/empati dari orang lain. Karena bagi orang yang lahir pada hari selasa kliwon ini dikenal memiliki sifat yang ramah. Ia begitu pandai dalam mengungkapkan kata-kata dalam berbagai situasi dan kondisi sehingga membuat orang lain mudah menyukainya. tapi, mereka juga dikenal memiliki pendirian yang keras, walaupun mungkin pada kesan pertama tidak menunjukkan hal yang demikian. Bagi orang yang lahir pada selasa kliwon ini memiliki sikap yang sangat kritis terhadap orang lain pada saat-saat tertentu. Walaupun demikian, anda jangan tersinggung bila menjadi sasaran kritikan yang tajam karena mereka hanya menunjukkan kesalahan anda dengan cara inilah mereka bisa membantu anda menjadi seseorang yang lebih baik lagi. Bagi yang lahir pada hari selasa kliwon urusan asmara yang cocok adalah dengan orang yang lahir pada hari selasa legi dan jum’at legi. Sedangkan arah yang baik untuk mencari rezeki adalah arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Rabu Legi",
    "Berdasarkan hari weton dan pasarannya mendapatkan pengaruh dari bintang Tangis, berkelakuan sopan, mudah mendapatkan teman, memiliki sikap adil dan bijaksana. Orang yang lahir pada hari Rabu Legi ini sangat menghormati tata krama dan berpegang teguh pada falsafah hidup anda. Kejujuran merupakan salah satu prioritas utama, sehingga anda tidak menyukai adanya ketidakadilan. Anda juga merupakan orang yang sangat setia terhadap teman sehingga anda banyak sekali memiliki teman. Bagi orang yang memiliki Weton ini sangat dikagumi sekali oleh semua orang karena kata-katanya bijaksana. Namun orang berweton ini selalu ingin mencampuri urusan orang lain. Ramalan asmara yang cocok adalah dengan pasangan yang lahir pada hari selasa kliwon, jum’at kliwon, selasa legi dan jum’at legi. Sedang arah yang baik untuk mencari rezeki adalah dari arah Barat dan Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Kamis Pahing",
    "Menurut primbon jawa, weton kamis pahing ini dipengaruhi oleh bintangnya salah ukur. Weton ini memiliki cita-cita yang tinggi dan disertai dengan semangat yang kuat untuk mewujudkannya. Anda selalu mencari kesempatan yang baik untuk mewujudkannya. akan tetapi hal ini bukanlah untuk diri sendiri melainkan untuk keluarga dan akan selalu siap untuk membantu saudara yang sedang membutuhkan perlindungan ataupun pengasuhan. Dalam hal pergaulan, ada suatu dorongan untuk membantah tanpa dipikirkan lebih dahulu resikonya, sehingga kemungkinan dapat membuat orang lain merasa tidak dihargai. Cara anda dalam penyampaian secara ketus dan salah terka sangat berpengaruh dan dapat menyinggung perasaan orang lain. Untuk urusan asmara yang ideal adalah dengan orang yang lahir pada rabu pon, kamis legi, dan jum’at legi. Sedangkan arah yang cocok untuk mencari rezeki adalah dari arah Barat dan Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Jumat Pon",
    "Berdasarkan weton ini banyak dipengaruhi oleh bintang perahu putus, perilakunya bintang, pendiam dan berhati lembut serta tenggang rasa. Berdasarkan kepercayaan jawa, Orang yang lahir pada hari Jum’at Pon itu perlu banyak bersosialisasi dengan berbagai macam orang. Konon, mereka berpembawaan tenang, bijaksana dalam bertutur kata dan serius. Orang yang dilahirkan pada Jum’at Pon ini adalah tipe orang yang memiliki jiwa sosial, murni, jujur, dan mudah bersimpati terhadap orang-orang yang kesusahan. Weton ini mudah beradaptasi dengan orang-orang yang ada disekitarnya dan dapat menyesuaikan diri dengan berbagai situasi dan kondisi. Namun, sifat seperti ini juga dapat menjadi kelemahan bagi mereka, karena jika tidak disertai dengan rasa percaya diri yang kuat mereka bisa dengan mudah dapat dipengaruhi oleh kebiasaan buruk dari orang lain. Sedangkan untuk ramalan jodohnya yang cocok adalah dengan kelahiran Rabu Kliwon, Kamis Pahing, dan Sabtu Pahing. Arah yang sesuai untuk mencari rezeki adalah arah Selatan dan Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Sabtu Wage",
    "Berdasarkan Primbon Jawa Weton Sabtu Wage bintangnya burung Puyuh Atarung (berkelahi), Satria Wibawa, suka mengatur hal-hal yang baik. Bagi anda yang lahir pada sabtu wage maka anda bersifat teguh pada pendirian dan mudah sekali naik darah jika apa yang sudah direncanakan tidak sesuai dengan harapan. Weton sabtu wage ini memiliki sifat cemburuan, karena anda sedikit memiliki masalah kepercayaan dan rasa memiliki yang berlebihan. Meskipun begitu, anda adalah orang yang setia dan murah hati kepada siapa saja orang yang disukai. Selain itu juga anda mempunyai bakat yang besar dalam mengatur rumah tangga supaya tetap berjalan dengan baik. Orang yang kelahirannya pada hari sabtu wage ini menyukai hal kemewahan dan sangat menghargai barang-barang yang berkualitas tinggi. primbon jodohnya ialah dengan kelahiran sabtu pahing, rabu kliwon, dan kamis pahing. Jika tidak ada, maka jodoh selanjutnya adalah kelahiran neptu senin wage, jum’at wage, selasa pon, senin kliwon, kamis wage, minggu pon, rabu pon, jum’at kliwon, sabtu legi, minggu pahing , kamis kliwon, dan sabtu pon, serta rabu pahing. Sedangkan untuk mencari rezeki adalah dari arah Timur dan Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Minggu Kliwon",
    "Berdasarkan weton minggu kliwon dipengaruhi oleh binatang lawehan, perilakunya bintang, pendiam dan lembut hatinya. Tipe pendiam ini memiliki pendirian yang tegas dan memiliki kemauan yang keras. Kelahiran Minggu Kliwon ini sangat pandai dalam membuat orang selalu menduga-duga perasaan anda yang sebenarnya. Anda memiliki sifat yang sensitif, akan tetapi jangan berharap orang lain akan mempercayainya saat mendengar anda beradu pendapat. Weton minggu kliwon ini pintar bersosialisasi, pandai berbicara dan diplomatis, oleh karena itu mereka sangat berbakat dalam dunia politik. Karena kemampuannya ini sehingga mereka dapat mencapai kedudukan yang tinggi. Primbon asmaranya yang sesuai adalah dengan kelahiran rabu kliwon, kamis pahing, sabtu pahing, dan minggu wage, serta senin legi. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Senin Legi",
    "Primbon weton senin legi mendapat pengaruh dari bintang kelapa, perilakunya angin, sopan, murah hati dan dermawan. Bagi orang yang kelahirannya hari senin legi mereka suka merantau berkeliling dunia, baik itu secara fisik ataupun secara intelektual. Mereka ini suka berdebat. Tetapi, mereka tidak jahat, bahkan mereka ini sangat sopan, dan murah hati. Mereka memiliki kepribadian yang baik jika mereka mau berhenti mencampuri urusan orang lain dan berhenti berdebat. Sedangkan untuk urusan asmara yang sesuai dengan weton senin legi ini adalah dengan kelahiran minggu, senin terutama minggu kliwon. Kemudian arah untuk mencari rezeki adalah dari arah Timur dan Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Selasa Pahing",
    "Berdasarkan primbon weton selasa pahing mendapat pengaruh oleh bintang kepiting/yuyu, lakunya suatu kecocokan. Untuk orang yang lahir pada hari selasa pahing bersifat santai dan bisa menerima orang lain apa adanya. Mereka sangat terampil dan suka menolong, serta mau berkorban demi orang yang mereka sayangi. Berhati-hatilah dengan orang yang kelahirannya pada selasa pahing, karena ketika mereka dibuat marah, maka mereka bisa membalas dendam secara membabibuta. Meskipun demikian, mereka cukup beruntung karena mereka mudah mendapatkan banyak rezeki, merek a juga harus belajar untuk bisa mengendalikan hasrat pribadi mereka yang kemungkinan dapat membuat mereka menjadi serakah. Dikemudian hari mereka dapat hidup dengan tenang dan berbahagia, dengan dikelilingi banyak teman yang baik. primbon asmara yang cocok adalah kelahiran selasa kliwon, jum’at kliwon, selasa legi, dan jum’at legi. Arah rezekinya ialah ke Barat dan ke Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Rabu Pon",
    "Dalam Primbon Jawa Weton Rabu Pon dipengaruhi oleh bintang lumbung, perilakunya bumi ialah dalam berperilaku sopan santun. Bagi anda yang lahir pada hari Rabu Pon merupakan orang yang penuh dengan keberuntungan, karena anda selalu merencanakan semua tindakan dengan berhati-hati, tidak mudah berputus asa, dan terbuka dalam peluang yang baru. Mereka juga memiliki keterampilan sosial, sehingga biarpun anda memiliki wajah yang jelek kemungkinan besar anda masih bisa bergaul dengan orang lain, dari sifat buruknya adalah anda suka selali pamer. Kemungkinan sejak kecil anda kurang perhatan, sehingga sekarang anda harus membuat kagum semua orang dengan kepintaran atau kekayaan yang anda miliki. Jadilah diri anda sendiri sehingga orang lain akan menyukai anda apa adanya. Dan akan lebih baik lagi jika anda berusaha sendiri dan tidak terlalu menyalahkan orang lain yang tidak sengaja telah menyakiti perasaan anda. Primbon Jodoh yang sesuai dengan kelahiran rabu pon adalah dengan orang yang lahir dihari apa saja, tapi yang paling utama adalah dengan sabtu kliwon. Kemudian untuk arah mencari rezeki adalah ke arah Timur dan ke Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Kamis Wage",
    "Orang yang kelahirannya pada hari kamis wage ini dipengaruhi oleh bintang kumba (tempat air), lakunya suatu perjodohan atau kecocokan. Bagi orang yang lahir di hari Kamis Wage ini memiliki cita-cita yang sangat tinggi.Oleh karena keinginan mereka yang tinggi itulah mereka mentaati aturan yang ada dan sangat berhati-hati dalam mewujudkan keinginan mereka sehingga sering tercapai tujuan mereka. Orang yang lahir di Kamis wage ini mungkin saja pandai, namun mereka sering terpaku pada jalan mereka dan mereka juga tidak menerima saran yang tidak mereka inginkan. Walaupun begitu, mereka dapat menebarkan pesona kepada orang lain dengan kesopanannya dan dapat bergaul dengan baik. Weton Kamis Wage ini tidak suka menunjukkan perasaan mereka yang sebenarnya, namun mereka dapat dibujuk dengan rayuan. Sedangkan untuk asamara weton kamis wage ini yang cocok adalah dengan kelahiran selasa kliwon, jum’at kliwon, selasa legi, dan jum’at legi. Untuk mencari rezeki yang baik adalah ke arah Barat dan ke Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Jumat Kliwon",
    "Bagi anda yang lahirnya pada jum’at kliwon akan mendapat pengaruh dari bintang udang, lakunya bulan, cara berpikir merekapun luas. Mereka adalah orang yang sabar dan murah hati, pandai juga dalam berkata-kata, sehingga orang mudah menyukai anda. Ketika anda muda kurang berhasil, namun setelah dewasa anda mampu menjadi seorang pemimpin yang baik, karena anda memiliki kemampuan, anda mampu berpikir seara luas, serta anda pandai dalam mempengaruhi banyak orang. Mungkin anda memliki sifat sedikit malas, namun orang-orang tetap menyukai anda. Sedangkan untuk ramalan asmara adalah dengan orang yang lahir pada hari senin legi, selasa wage, selasa pahing, rabu pon, kamis wage, kamis pahing, jum’at kliwon, sabtu legi, sabtu kliwon, minggu pahing, dan minggu pon, serta minggu wage. Arah yang cocok untuk mencari rezeki adalah harus dari arah Timur dan ke Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Sabtu Legi",
    "Menurut Primbon Jawa Weton Sabtu Legi mendapat pengaruh dari bintang Bgoong, lakunya bulan, Ia pandai dalam berbagai pekerjaan. Orang yang lahir di Sabtu Legi ini adalah salah satu orang yang gemar dengan gaya hidup yang santai dan mewah. Bagi mereka, kualitas adalah yang paling pentng daripada harga yang murah. Hal ini berlaku untuk kehidupan sosial anda, anda ingin berada disekitar orang-orang yang memiliki kepintaran/IQ nya tinggi. Sehingga anda tidak kalah juga dari segi otak. Anda juga dapat menghargai pendapat orang lain. Perkataan untuk kelahiran Sabtu Legi ini terkadang sedikit tajam dan suka mencampuri urusan orang, karena hal inilah anda terkadang mendapatkan fitnah. Primbon jodohnya yang sesuai dengan kelahiran sabtu legi ini adalah dengan kelahiran apasaja, terutama sabtu kliwon. Sedangkan urusan mencari rezeki yang cocok adalah dari arah Timur dan Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Minggu Pahing",
    "Primbon Jawa menurut weton Minggu Pahing mendapat pengaru dari bintang Gajah, Lakunya Bulan, Orang ini mempunyai kemampuan yang luar biasa dibidang apa saja yang digelutinya. Orang yang lahir di Minggu Pahing ini mampu mempertahankan pendapatnya dengan kuat dalam keadaan sesulit apapun. Namun mereka juga berpikiran yang luas, mereka juga menyukai ilmu mistik dan mereka juga diterima dengan baik dalam lingkungan sosial. Bagi orang yang kelahiran Minggu Pahing ini mampu menyembunyikan perasaan mereka yang tidak nyaman seperti kemarahan, penyesalan, bahkan kesedihan. Meraka dapat mengontrol diri mereka dan dengan sifat seperti inilah yang sangat menguntungkan bagi mereka yang berkerja sebagai seorang politikus, dokter UGD, atau agen rahasia. Akan tetapi sifat seperti ini semoga tidak berakibat pada perasaan mereka yang terpendam, yang seharusnya mereka tunjukkan secara terbuka kepada orang-orang yang mereka cintai. Untuk masalah jodoh minggu pahing ini yang baik adalah dengan minggu wage, selasa pon dan jum’at legi. Sedangkan untuk arah mencari rezeki yang cocok adalah ke arah Timur dan ke Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Senin Pon",
    "Menurut Primbon Jawa bagi orang yang lahir pada hari Senin Pon dipengaruhi oleh Bintang Kiriman, Perilakunya Sumur Sinaba yaitu suka dipuji-puji. Anda merupakan seorang yang penuh kontradiksi. Mungkin anda tampak seperti orang yang kuat, tangguh, bahkan dengan bangganya memperlihatkan kekayaan yang anda miliki. Akan tetapi, anda yang sebenarnya ialah seorang yang sangat perasa. Orang lain akan mereasa terkejut bila melihat betapa sopan dan ramahnya anda, serta bertanggung jawab. Jika anda mengetahui dan mampu melihat sifat-sifat pemberani anda dapat terapkan pada hal-ha yang berguna, sehingga kesuksesan bisa anda raih. Ramalan asmara yang lahir pada hari senin pon ini cocok dengan kelahiran selasa legi, dan jum’at legi. Rezeki akan mudah didapat dengan diawali dari arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Selasa Wage",
    "Berdasarkan primbon jawa Weton Selasa Wage dipengaruhi oleh bintang jong sarat (perahu sarat) atau perahu yang bermuatan yang sangat berat, Prilakunya bumi, tidak banyak berbicara dan tidak suka menyombongkan diri. Meskipun begitu, anda lebih sering mengalah kepada orang yang lebih cerewet daripada mempermasalahkan hal-hal yang remeh. Bagi orang-orang yang tidak kenal dengan anda mungkin menganggap anda orang yang kaku. Di samping itu juga anda cenderung bersikap cemburu. Walaupun demikian, terkadang kawan-kawan anda pun mengagumi anda yang memiliki keinginan yang besar terhadap ilmu pengetahuan dan bertekad kuat untuk mencari tahu hal-hal yang menarik perhatian anda secara lebih dalam. Jika keadaan mulai memburuk, anda akan tetap bertahan. Primbon Jodoh yang baik untuk kelahiran pada hari selasa wage adalah dengan siapa saja, asalkan jangan berpasaran dengan wage. Arah untuk mencari rezeki yang sesuai adalah ke arah Timur dan ke utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Rabu Kliwon",
    "Weton Rabu Kliwon dipengaruhi oleh Bintang Tiwa-Tiwa, lakunya Matahari (Surya), sengan dipuji. Orang yang lahir pada Rabu Kliwon merupakan seorang pemikir sejati dengan sikap lembut yang disertai dengan gaya yang mempesona, sehingga membuat orang lain menjadi mudah tertarik dengan anda. Karena bakat alami yang ada pada diri anda akan bahasa dan kepekaan terhadap perasaan orang lain, maka anda memiliki potensi yang besar untuk menjadi seorang pembicara sukses. Bagi orang yang wetonnya Rabu Kliwon ini diantaranya sudah banyak yang menjadi seorang orator atau penulis yang handal. Anda senang sekali bila mendapatkan pujian, tetapi anda harus belajar lagi untuk tidak mudah tersinggung dan jangan terlalu memasukkan kritikan yang membuat telinga pedas ke dalam hati. Berhati-hatilah dan tetaplah waspada supaya kelemahan anda terhadap rayuan manis tidak membuat anda mudah untuk diperdaya. Sedangkan jodohnya yang baik dengan siapa saja yang sesuai dengan kasih sayang dan firasat anda sendiri mampu mendapatkan jodoh yang baik untuk anda. Untuk arah mencari rezeki yang baik adalah sebaiknya dari arah Barat, karena dari arah itulah yang sangat sesuai untuk mencari rezeki, selain dari arah tersebut tidak banyak untuk mendapatkan rezeki. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Kamis Legi",
    "Berdasarkan Primbon Jawa Weton Kamis Legi mendapat pengaruh dari Bintang Sangka Tikel, perilakunya Bintang, Satria Wibawa, tidak banyak bicara dan mempunyai kemauan yang kuat. Weton kamis legi ini memiliki cita-cita yang tinggi dan mulia, walaupun disetiap ide atau dalam pekerjaan jarang berhasil. Mereka memiliki sifat yang sangat bijaksana karena kemampuannya dalam melihat prospek dalam suatu hal untuk waktu jangka panjang. Meskipun demikian, mereka harus tetap bersikap sabar dan lebih berhati-hati dalam melihat prospek yang besar. Akan tetapi, walaupun wetonnya kamis legi ini cenderung memiliki pandangan yang luas, mereka selalu saja terjerumus dalam pernik-pernik kehidupan sehari-hari. Kelahiran Kamis Legi ini merupakan tipe orang yang yang selalu ingin dipuji. Tetapi, kemungkinan dukungan tidak terlalu sulit untuk didapatkannya, karena mereka biasa dikelilingi oleh banyak teman, sebab mereka dikenal memiliki kemampuan bergaul yang asyik, akan tetapi mereka juga suka mencampuri urusan orang lain. Primbon jodoh yang baik adalah dengan kelahiran rabu kliwon, kamis pahing, dan sabtu pahing. Orang yang lahir pada kamis legi ini sangat cocok bila mencari rezeki di mulai dari arah Timur dan Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Jumat Pahing",
    "Weton Jum’at Pahing mendapat pengaruh oleh bintang Bubu Bolong, perilakunya Surya (matahari). Dalam pergaulannya seorang yang ramah, lemah lembut dalam berbicara. Anda merupakan pembicara yang menyenangkan, memiliki cita-cita yang tinggi, dan jujur, namun anda seorang yang mudah tersinggung. Anda akan memperoleh banyak poin untuk mendapatkan keberhasilan. Orang yang weton Jum’at Pahing ini sangat mudah dimanfaatkan, sehingga orang tidak akan percaya bahwa anda mampu bekerja keras. Selain itu juga anda bisa bersikap marah ketika mengalami hal-hal yang menjengkelkan. Bagi orang yang lahir jum’at pahing ini mendapat pengaruh dari bintang bubu bolong, karena anda banyak mendapatkan uang. Akan tetapi cepat pula untuk menghabiskannya. untuk Asmaranya cocok dengan siapa saja, sesuai dengan cinta dan kasih anda yang tulus dan tergantung dari firasat bathin anda sendiri yang nantinya bisa membawa dalam kebaikan. Sedangkan arah untuk mencari rezeki adalah harus dari arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Sabtu Pon",
    "Menurut isi dari Primbon Jawa mengenai Weton Sabtu Pon dipengaruhi dari Bintang Srengenge (bunga matahari), lakunya air, bercita-cita agung. Weton Sabtu Pon ini memiliki ego yang tinggi dan selalu saja ingin menjadi seorang penguasa di dalam lingkungannnya. Walaupun begitu, anda bukan tipe orang yang sulit jika seseorang yang yang memngecewakan anda, anda cepat memaafkan dan melupakan dengan mudah, namun asalkan mereka mau mengakui kesalahnya dan meminta maaf di kaki anda. Anda suka menghayalkan diri anda menjadi orang kaya dan sangat terkenal. Hal ini bukan berarti anda seorang yang meterialistis. Primbon Jodoh yang paling sesuai adalah dengan kelahiran yang jumlah neptunya kurang dari 16, dibarengi dengan rasa kasih dan sayang yang firasat bathin yang dapat membawakan anda dalam kehidupan anda yang lebih bahagia. Arah rezeki yang baik adalah ke arah Barat, sedangkan kearah yang lain tidak begitu banyak menghasilkan rezeki. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Minggu Wage",
    "Menurut Primbon Jawa, Weton Minggu Wage ini mendapat pengaruh dari bintang uluku/tenggala, lakunya angin, Satria Wibawa, dermawan. Bagi orang yang lahir di hari Minggu Wage memiliki sifat pemurah dan mudah tersentuh hatinya. mereka ini tahu bagaimana cara menghibur orang yang sedang menderita. Weton minggu Wage ini merupakan seorang yang pekerja keras. Tetapi mereka ini memiliki pendirian yang teguh dan juga keras kepala kepada orang yang menentang pendapatnya. Berdasarkan Primbon jodohnya yang cocok dengan seseorang yang neptunya selasa pon, jum’at wage, minggu pon, rabu legi, senin kliwon, rabu pon, jum’at kliwon, sabtu legi, minggu pahing, dan sabtu pon. Sedang arah utnuk mencari rezeki yang baik adalah arah Timur dan Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Senin Kliwon",
    "Menurut Weton Senin kliwon ini diayomi oleh bintang pedati, lakunya suatu perjodohan/kecocokan. Prinsip untuk kelahiran Senin Kliwon ini adalah Kehormatan keluarga. Mereka ini dikenal karena pengabdiannya terhadap orang tua, anak, kakak-adik, bahkan keluarga dari jauh. Mereka bersedia mengorbankan apa saja untuk membela keluarganya. Mereka memiliki perasaan yang sangat kuat terhadap asal usulnya, bahkan mungkin terhadap negara tempat lahir mereka. Namun, mereka ini orang yang mudah tersinggung. Terkadang membutuhkan waktu untuk membuat mereka kembali tenang. Walaupun begitu, pada dasarnya mereka yang lahir pada senin kliwon ini mudah memaafkan dan tidak mendendam. Sedangkan menurut Primbon Asmaranya yang baik adalah dengan seseorang yang lahir pada selasa kliwon, jum’at kliwon, selasa legi, dan jum’at legi. Arah untuk mencari rezeki yang sesuai adalah ke arah Barat dan ke Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Selasa Legi",
    "Menurut isi Primbon Jawa Weton Selasa Legi dipengaruhi oleh bintang Kuda, lakunya Api, wataknya cepat marah. Pada dasarnya, weton selasa legi ini memiliki kepribadian yang kuat, namun pencemburu. Mereka ini tidak menyukai ada orang yang menghalanginya, dan tidak mau mengalah walaupun dalam hal yang sepele supaya orang lain tidak merasa sakit hati. Sebenarnya Ketenaran orang yang lahir selasa legi ini tidak akan menurun/berkurang, jika saja mereka ini mau belajar sedikit berbagi. Sehingga dorongan untuk berkuasa dapat membuat anda membuang banyak tenaga untuk beradu kekuatan dengan pasangan, teman, atapun yang lainnya. Akan tetapi, meskipun dalam kekurangan, anda merupakan seorang yang jujur dan suka bekerja keras, serta memiliki cita-cita yang tinggi, keinginan yang besar terhadap ilmu pengetahuan. Sedangkan menurut asmaranya yang ideal adalah dengan seseorang yang lahir pada hari selasa dan jum’at. Arah yang baik untuk mencari rezeki adalah ke arah Timur dan ke Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Rabu Pahing",
    "Berdasarkan Primbon Jawa mengenai weton rabu pahing ini mendapat pengaruh dari bintang Gajah Mina, perilakunya seperti air muka yang jernih yang artinya suka mempertimbangkan segala sesuatunya sebelum melakukan suatu tindakan. Mereka merenungkan segala kemungkinan sampai mereka merasa puas dengan hasil yang dapat dicapai. Mungkin mereka ini terlihat cukup santai, tapi jangan terkecoh. Mungkin saja karena mereka kurang percaya diri sehingga mereka bersikap angkuh. Namun, tidak dapat dipungkiri banyak yang mengatakan bahwa mereka ini tidak suka berbagi dengan orang lain. Mungkin kewaspadaan mereka ini terlihat sangat berlebihan ketika rasa curiga mereka timbul. Mereka ini perlu belajar lagi untuk bisa bersikap lebih santai dan menurunkan kewaspadaan mereka yang berlebihan. Untung saja mereka yang lahir pada rabu pahing ini memiliki prinsip yang baik untuk tidak mencampuri urusan orang lain. Primbon jodohnya yang ideal adalah dengan kelahiran yang neptunya dibawah jumlah 16, dapat tertuang dengan cinta sejati dan akan membawa kebaikan dikemudian hari. Arah unuk mencari rezeki yang sesuai adalah ke arah Barat. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Kamis Pon",
    "Berdasarkan weton kamis pon ini dipengaruhi oleh bintang Bade (sejenis pengusung jenazah) yang dihias rapi, ramah dan lemah lembut. Orang yang lahir pada hari Kamis Pon ini memiliki tujuan yang tinggi dan memiliki cita-cita tinggi dengan berusaha untuk mewujudkannya. mereka yang lahir pada kamis pon ini memiliki pikiran yang cerdas dan rasa ingin tahunya begitu kuat. Meraka ini juga suka mempelajarai sesuatu yang baru untuk mendapatkan wawasan yang luas. Meskipun begitu, kecenderungan mereka untuk berpikir dan bertindak dalam sesuatu yang besar, dengan kebanggaan dan rasa percaya terhadap kekayaan materi dan kepandaian yang dimiliki dapat dengan mudah menjadi kelemahan anda suatu saat nanti. Weton Kamis Pon ini bukanlah tipe orang yang suka mencampuri urusan orang lain dan tidak suka banyak bergaul. Mereka ini merasa sudah cukup puas dengan mengandalkan kemampuan pribadi mereka untuk memahami situasi dan menghindari diri dari pengaruh orang lain. Menurut Primbon jodohnya yang sesuai adalah dengan siapa saja akan memperoleh kebaikan dan kebahagiaan dengan cinta yang tulus serta firasat anda sendiri. Untuk urusan mencari rezeki yang sesuai ke arah barat.",
  ],
  [
    "Jumat Wage",
    "Primbon Jawa Weton Jum’at Wage berdasarkan jodoh, sifat, watak dan rezekinya adalah orang yang weton Jum’at Wage dipengaruhi oleh bintangnya Magelut atau berangkul-rangkulan, perilakunya pendeta sakti, memiliki sifat cerdas, tapi pendiam. Mereka ini dikenal sangat mengasihi dan mudah merasa iba kepada sesama manusia, selalu bersedia membantu kepada mereka yang membutuhkan. Orang yang lahir pada hari jum’at wage memliki karakter yang sangat jujur, memiliki kemurnian hati, dan juga kesetiaan. mereka tidak pernah memamerkan kemampuannya, namun didalam hati anda sesungguhnya merupakan orang yang tegar.  Mereka ini sangat sulit untuk mengubah suatu keputusan yang sudah mereka tetapkan. Keyakinan mereka ini sangat kuat, oleh karena itu mereka perlu belajar untuk menerima saran dari orang lain untuk tujuan yang baik. untuk urusan asmara yang ideal adalah dengan seseorang yang lahir pada Minggu wage, selasa pon, dan jum’t legi. Kemudian arah yang sesuai untuk mencari rezeki adalah ke arah Timur dan ke Selatan. Weton Kelahiran Dan Perwatakannya.",
  ],
  [
    "Sabtu Kliwon",
    "Dalam primbon jawa orang yang lahir pada sabtu kliwon dipengaruhi oleh bintang pegelangan, lakunya bumi, mereka ini sangat hati-hati dalam tindakannya, sifatya ramah, sopan, dan mudah terkesan, sehingga mereka dengan mudah membuat orang lain merasa nyaman dan betah berada di rumah anda. mereka juga pandai dalam mengucapkan kata yang membuat senang. Mereka ini adalah salah satu orang yang memiliki bakat alamiah dalam hal berbicara dan menulis, sehingga bakat seperti ini dapat dijadikan sebagai pekerjaan. orang yang lahir pada sabtu kliwon ini memperlakukan semua orang dengan baik, bahkan dengan musuh mereka sendiri. Mereka ini bukanlah sebagai seorang yang tegar yang berpegang pada pendirian mereka. Akan lebih baik jika mereka mau mengembangkan sedikit ketegasan dan keberanian, karena mereka cenderung mudah menyerah dan mudah putus asa pada rintangan pertama dan mereka cenderung tidak mau mengambil resiko. Menurut urusan asmaranya yang baik ialah dengan seorang yang lahir rabu pon, kamis legi, dan jum’at legi. Arah yang baik untuk menambah rezeki adalah ke arah Barat dan Utara. Weton Kelahiran Dan Perwatakannya.",
  ],
];
