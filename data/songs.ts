import { Song } from "../types/song";

export const songs: Song[] = [
  {
    id: "1",
    title: { en: "Gayatri Mantra", ta: "காயத்ரி மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/gayatri.png"),
    audio: require("../assets/audio/gayatri.mp3"),
    description: {
      en: "The most sacred Vedic mantra, a prayer to Savitr (the sun) for divine illumination of the mind and intellect.",
      ta: "சூரிய தேவனை நோக்கி மனத்தையும் புத்தியையும் ஒளிரச் செய்யும்படி வேண்டும் புனித வேத மந்திரம்.",
    },
    lyrics: {
      en: "Om Bhur Bhuvaḥ Svaḥ\nTat Savitur Vareṇyam\nBhargo Devasya Dhīmahi\nDhiyo Yo Naḥ Prachodayāt",
      ta: "ஓம் பூர் புவஃ ஸ்வஃ\nதத் சவிதுர் வரேண்யம்\nபர்கோ தேவஸ்ய தீமஹி\nதியோ யோ நஃ பிரசோதயாத்",
    },
  },
  {
    id: "2",
    title: { en: "Mrityunjaya Mantra", ta: "மிருத்யுஞ்சய மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/maha-vrityunjaya.png"),
    audio: require("../assets/audio/maha-vrityunjaya.mp3"),
    description: {
      en: "A powerful Shiva mantra for health, longevity, and liberation from the cycle of birth and death.",
      ta: "ஆரோக்கியம், நீண்ட ஆயுள் மற்றும் மறுபிறப்பிலிருந்து விடுதலைக்காக சிவனை வேண்டும் சக்திவாய்ந்த மந்திரம்.",
    },
    lyrics: {
      en: "Om Tryambakam Yajamahe\nSugandhim Pushtivardhanam\nUrvarukamiva Bandhanan\nMrityor Mukshiya Mamritat",
      ta: "ஓம் த்ரயம்பகம் யஜாமஹே\nசுகந்திம் புஷ்டிவர்தனம்\nஊர்வாருகமிவ பந்தனன்\nம்ருத்யோர் முக்ஷிய மாம்ருதாத்",
    },
  },
  {
    id: "3",
    title: { en: "Om Ganapathyye", ta: "ஓம் கணபதியே" },
    category: "Devotional",
    image: require("../assets/images/covers/om-gan-ganpataye.png"),
    audio: require("../assets/audio/om-gan-ganpataye.mp3"),
    description: {
      en: "A salutation to Ganesha, remover of obstacles, chanted before beginning any new endeavour.",
      ta: "எந்த புதிய செயலையும் தொடங்குமுன் தடைகளை நீக்கும் கணேஷையை வணங்கும் மந்திரம்.",
    },
    lyrics: {
      en: "Om Gam Ganapataye Namaha\nOm Gam Ganapataye Namaha\nSri Siddhi Vinayaka Namaha",
      ta: "ஓம் கம் கணபதயே நமஃ\nஓம் கம் கணபதயே நமஃ\nஸ்ரீ சித்தி விநாயக நமஃ",
    },
  },
  {
    id: "4",
    title: { en: "Om Namah Shivaya", ta: "ஓம் நமஃ சிவாய" },
    category: "Devotional",
    image: require("../assets/images/covers/om-namh-shivaya.png"),
    audio: require("../assets/audio/om-namh-shivaya.mp3"),
    description: {
      en: "The Panchakshara — five-syllable mantra of Shiva representing the five elements of creation.",
      ta: "படைப்பின் ஐந்து பூதங்களை உள்ளடக்கிய சிவனின் பஞ்சாட்சர மந்திரம்.",
    },
    lyrics: {
      en: "Om Namah Shivaya\nOm Namah Shivaya\nOm Namah Shivaya\nShivaya Namaha",
      ta: "ஓம் நமஃ சிவாய\nஓம் நமஃ சிவாய\nஓம் நமஃ சிவாய\nசிவாய நமஃ",
    },
  },
  {
    id: "5",
    title: { en: "Guru Bramha Guru Vishnu", ta: "குரு பிரம்ம குரு விஷ்ணு" },
    category: "Devotional",
    image: require("../assets/images/covers/guru-bramha-guru-vishnu.png"),
    audio: require("../assets/audio/guru-bramha-guru-vishnu.mp3"),
    description: {
      en: "A guru vandana that equates the spiritual teacher with the divine Trinity — Brahma, Vishnu, and Shiva.",
      ta: "ஆன்மீக குருவை திருமூர்த்திகளான பிரம்மா, விஷ்ணு, சிவன் ஆகியோருடன் ஒப்பிடும் குரு வந்தனம்.",
    },
    lyrics: {
      en: "Guru Brahma Guru Vishnu\nGuru Devo Maheshwara\nGuru Sakshat Param Brahma\nTasmai Shri Gurave Namaha",
      ta: "குரு பிரம்மா குரு விஷ்ணு\nகுரு தேவோ மஹேஸ்வரா\nகுரு சாக்ஷாத் பரம் பிரம்ம\nதஸ்மை ஸ்ரீ குரவே நமஃ",
    },
  },
  {
    id: "6",
    title: { en: "Om Namo Narayana", ta: "ஓம் நமோ நாராயண" },
    category: "Devotional",
    image: require("../assets/images/covers/om-namo-narayana.png"),
    audio: require("../assets/audio/om-namo-narayana.mp3"),
    description: {
      en: "The Ashtakshara mantra of Vishnu — an eightfold surrender to the preserver of the universe.",
      ta: "பிரபஞ்சத்தை காக்கும் விஷ்ணுவை எட்டு எழுத்துக்களால் சரண் அடையும் அஷ்டாக்ஷர மந்திரம்.",
    },
    lyrics: {
      en: "Om Namo Narayanaya\nOm Namo Narayanaya\nNarayana Narayana\nJaya Narayana",
      ta: "ஓம் நமோ நாராயணாய\nஓம் நமோ நாராயணாய\nநாராயண நாராயண\nஜய நாராயண",
    },
  },
  {
    id: "7",
    title: { en: "Hanuman Chalisa", ta: "ஹனுமான் சாலீசா" },
    category: "Devotional",
    image: require("../assets/images/covers/hanuman-chalisa.png"),
    audio: require("../assets/audio/hanuman-chalisa.mp3"),
    description: {
      en: "A 40-verse hymn composed by Tulsidas in praise of Hanuman, granting strength, courage, and protection.",
      ta: "துளசிதாசரால் இயற்றப்பட்ட 40 பாடல்களில் ஹனுமானை போற்றும் துதி — வலிமை, தைரியம் மற்றும் பாதுகாப்பை வழங்கும்.",
    },
    lyrics: {
      en: "Shri Guru Charan Saroj Raj\nNij Man Mukar Sudhaari\nBarnau Raghuvar Bimal Jasu\nJo Daayak Phal Chaari\n\nBuddhi heen tanu jaanike\nSumirou Pawan Kumar\nBal buddhi vidya dehu mohe\nHarahu kalesh bikaar",
      ta: "ஸ்ரீ குரு சரண் சரோஜ் ரஜ்\nநிஜ மன் முகர் சுதாரி\nபர்னவ் ரகுவர் பிமல் ஜஸு\nஜோ தாயக் பல் சாரி\n\nபுத்தி ஹீன் தனு ஜான்கே\nசுமிரவ் பவன் குமார்\nபல் புத்தி வித்யா தேஹு மோஹே\nஹரஹு கலேஷ் பிகார்",
    },
  },
  {
    id: "8",
    title: { en: "Om Saravana Bhav", ta: "ஓம் சரவண பவ" },
    category: "Devotional",
    image: require("../assets/images/covers/om-saravana.png"),
    audio: require("../assets/audio/om-saravana.mp3"),
    description: {
      en: "The six-syllable mantra of Murugan (Kartikeya), the Tamil god of war and victory.",
      ta: "போர் மற்றும் வெற்றியின் தமிழ் கடவுளான முருகனின் ஆறு எழுத்து மந்திரம்.",
    },
    lyrics: {
      en: "Om Saravana Bhava\nOm Saravana Bhava\nShara Vana Bhava\nOm Saravana Bhava",
      ta: "ஓம் சரவண பவ\nஓம் சரவண பவ\nஷர வண பவ\nஓம் சரவண பவ",
    },
  },
  {
    id: "9",
    title: { en: "Vishnu Sahasranama", ta: "விஷ்ணு சஹஸ்ரநாமம்" },
    category: "Devotional",
    image: require("../assets/images/covers/vishnu-sahasranama.png"),
    audio: require("../assets/audio/vishnu-sahasranama.mp3"),
    description: {
      en: "A devotional hymn listing the 1000 names of Vishnu from the Mahabharata, said to confer all blessings.",
      ta: "மஹாபாரதத்திலிருந்து விஷ்ணுவின் ஆயிரம் திருநாமங்களை உள்ளடக்கிய ஒரு பக்தி துதி.",
    },
    lyrics: {
      en: "Vishvam Vishnur Vashatkaro\nBhuta-Bhavya-Bhavat-Prabhuh\nBhutakrit Bhutabhrit Bhavah\nBhutatma Bhutabhavanah",
      ta: "விஷ்வம் விஷ்ணுர் வஷட்காரோ\nபூத-பவ்ய-பவத்-பிரபுஹு\nபூதக்ருத் பூதபிருத் பாவஹ\nபூதாத்மா பூதபாவனஹ",
    },
  },
  {
    id: "10",
    title: { en: "Om", ta: "ஓம்" },
    category: "Devotional",
    image: require("../assets/images/covers/om-chanting.png"),
    audio: require("../assets/audio/om-chanting.mp3"),
    description: {
      en: "The primordial sound of the universe — the seed syllable that encompasses all of existence.",
      ta: "பிரபஞ்சத்தின் ஆதி ஒலி — அனைத்து இருப்பையும் உள்ளடக்கிய வித்து எழுத்து.",
    },
    lyrics: {
      en: "Om... Om... Om...\n\nThe sound of the universe.\nWhere all begins and all returns.",
      ta: "ஓம்... ஓம்... ஓம்...\n\nபிரபஞ்சத்தின் ஒலி.\nயாவும் தொடங்கி யாவும் மீளும் இடம்.",
    },
  },
  {
    id: "11",
    title: { en: "Kundalini Mantra", ta: "குண்டலினி மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/kundalini-mantra.png"),
    audio: require("../assets/audio/kundalini-mantra.mp3"),
    description: {
      en: "A Kundalini Yoga mantra that awakens the dormant spiritual energy at the base of the spine.",
      ta: "முதுகெலும்பின் அடிப்பகுதியில் உறங்கும் ஆன்மீக சக்தியை எழுப்பும் குண்டலினி யோக மந்திரம்.",
    },
    lyrics: {
      en: "Ong Namo Guru Dev Namo\nOng Namo Guru Dev Namo\nOng Namo Guru Dev Namo",
      ta: "ஓங் நமோ குரு தேவ் நமோ\nஓங் நமோ குரு தேவ் நமோ\nஓங் நமோ குரு தேவ் நமோ",
    },
  },
  {
    id: "12",
    title: { en: "Shanti Mantra", ta: "சாந்தி மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/shanti-mantra.png"),
    audio: require("../assets/audio/shanti-mantra.mp3"),
    description: {
      en: "A Vedic peace invocation seeking harmony in body, mind, and spirit across all planes of existence.",
      ta: "உடல், மனம், ஆன்மா ஆகிய அனைத்திலும் நிம்மதியை வேண்டும் வேத சாந்தி மந்திரம்.",
    },
    lyrics: {
      en: "Om Saha Navavatu\nSaha Nau Bhunaktu\nSaha Viryam Karavavahai\nTejasvi Navadhitamastu\nMa Vidvishavahai\nOm Shanti Shanti Shantihi",
      ta: "ஓம் சஹ நாவவவது\nசஹ நவு புனக்து\nசஹ வீர்யம் கரவாவஹை\nதேஜஸ்வி நவதீதமஸ்து\nமா வித்விஷாவஹை\nஓம் சாந்தி சாந்தி சாந்திஹி",
    },
  },
  {
    id: "13",
    title: { en: "Ganesh Gayatri Mantra", ta: "கணேஷ் காயத்ரி மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/ganesh-gayatri-mantra.png"),
    audio: require("../assets/audio/ganesh-gayatri-mantra.mp3"),
    description: {
      en: "The Gayatri form of Ganesha's mantra, seeking his blessings for wisdom and the removal of obstacles.",
      ta: "ஞானம் மற்றும் தடைகளை நீக்கும் கணேஷின் காயத்ரி வடிவ மந்திரம்.",
    },
    lyrics: {
      en: "Om Ekadantaya Vidmahe\nVakratundaya Dhimahi\nTanno Dantih Prachodayat",
      ta: "ஓம் ஏகதந்தாய வித்மஹே\nவக்ரதுண்டாய தீமஹி\nதன்னோ தந்திஹ் பிரசோதயாத்",
    },
  },
  {
    id: "14",
    title: { en: "Krishna Mantra", ta: "கிருஷ்ண மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/krishna-mantra.png"),
    audio: require("../assets/audio/krishna-mantra.mp3"),
    description: {
      en: "A devotional chant to Krishna, the eighth avatar of Vishnu, invoking divine love and bliss.",
      ta: "விஷ்ணுவின் எட்டாவது அவதாரமான கிருஷ்ணனை வேண்டி தெய்வீக அன்பையும் ஆனந்தத்தையும் அழைக்கும் மந்திரம்.",
    },
    lyrics: {
      en: "Om Krishnaya Namaha\nHare Krishna Hare Krishna\nKrishna Krishna Hare Hare\nHare Rama Hare Rama\nRama Rama Hare Hare",
      ta: "ஓம் கிருஷ்ணாய நமஃ\nஹரே கிருஷ்ண ஹரே கிருஷ்ண\nகிருஷ்ண கிருஷ்ண ஹரே ஹரே\nஹரே ராம ஹரே ராம\nராம ராம ஹரே ஹரே",
    },
  },
  {
    id: "15",
    title: { en: "Murugan Gayatri Mantra", ta: "முருகன் காயத்ரி மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/murugan-gayatri-mantra.png"),
    audio: require("../assets/audio/murugan-gayatri-mantra.mp3"),
    description: {
      en: "The Gayatri mantra of Lord Murugan, son of Shiva, invoking courage, grace, and spiritual clarity.",
      ta: "சிவனின் மகனான முருகனின் காயத்ரி மந்திரம் — தைரியம், அருள், ஆன்மீக தெளிவை வேண்டும்.",
    },
    lyrics: {
      en: "Om Tatpurushaya Vidmahe\nMahasenanaya Dhimahi\nTanno Skanda Prachodayat",
      ta: "ஓம் தத்புருஷாய வித்மஹே\nமஹாசேனாய தீமஹி\nதன்னோ ஸ்கந்த பிரசோதயாத்",
    },
  },
  {
    id: "16",
    title: { en: "Vishnu Mantra", ta: "விஷ்ணு மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/vishnu-mantra.png"),
    audio: require("../assets/audio/vishnu-mantra.mp3"),
    description: {
      en: "A mantra to Vishnu, the preserver of the universe, seeking his protection and blessings.",
      ta: "பிரபஞ்சத்தை காக்கும் விஷ்ணுவை வேண்டி அவரின் பாதுகாப்பையும் ஆசீர்வாதத்தையும் அழைக்கும் மந்திரம்.",
    },
    lyrics: {
      en: "Om Namo Bhagavate Vasudevaya\nOm Namo Bhagavate Vasudevaya\nVasudevaya Namaha",
      ta: "ஓம் நமோ பகவதே வாசுதேவாய\nஓம் நமோ பகவதே வாசுதேவாய\nவாசுதேவாய நமஃ",
    },
  },
  {
    id: "17",
    title: { en: "Narasimha Mantra", ta: "நரசிம்ம மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/narasimha-mantra.png"),
    audio: require("../assets/audio/narasimha-mantra.mp3"),
    description: {
      en: "A fierce protective mantra to Narasimha, the lion-man avatar of Vishnu who dispels all fears.",
      ta: "அனைத்து அச்சங்களையும் நீக்கும் விஷ்ணுவின் நரசிம்ம அவதாரத்திற்கான சக்திவாய்ந்த பாதுகாப்பு மந்திரம்.",
    },
    lyrics: {
      en: "Om Ugram Viram Maha-Vishnum\nJvalantam Sarvato Mukham\nNrisimham Bhishanam Bhadram\nMrityor Mrityum Namamyaham",
      ta: "ஓம் உக்ரம் வீரம் மஹா-விஷ்ணும்\nஜ்வலந்தம் சர்வதோ முகம்\nநரசிம்ஹம் பீஷணம் பத்ரம்\nம்ருத்யோர் ம்ருத்யும் நமாம்யஹம்",
    },
  },
  {
    id: "18",
    title: { en: "Om Saravana Bhava", ta: "ஓம் சரவண பவ" },
    category: "Devotional",
    image: require("../assets/images/covers/om-saravana-II.png"),
    audio: require("../assets/audio/om-saravana-II.mp3"),
    description: {
      en: "An alternate rendition of the Saravana Bhava mantra of Murugan with extended chanting.",
      ta: "முருகனின் சரவண பவ மந்திரத்தின் நீட்டிக்கப்பட்ட வேறொரு பாடல் வடிவம்.",
    },
    lyrics: {
      en: "Om Saravana Bhava\nShara Vana Bhava\nOm Saravana Bhava\nMuruganukku Arogara",
      ta: "ஓம் சரவண பவ\nஷர வண பவ\nஓம் சரவண பவ\nமுருகனுக்கு ஆரோகரா",
    },
  },
  {
    id: "19",
    title: { en: "Shiva Gayatri Mantra", ta: "சிவ காயத்ரி மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/shiva-gayatri-mantra.png"),
    audio: require("../assets/audio/shiva-gayatri-mantra.mp3"),
    description: {
      en: "The Gayatri mantra addressed to Shiva (Mahadeva), seeking liberation and divine consciousness.",
      ta: "சிவனை (மஹாதேவனை) நோக்கி விடுதலையும் தெய்வீக உணர்வும் வேண்டும் காயத்ரி மந்திரம்.",
    },
    lyrics: {
      en: "Om Tatpurushaya Vidmahe\nMahadevaya Dhimahi\nTanno Rudrah Prachodayat",
      ta: "ஓம் தத்புருஷாய வித்மஹே\nமஹாதேவாய தீமஹி\nதன்னோ ருத்ரஹ் பிரசோதயாத்",
    },
  },
  {
    id: "20",
    title: { en: "Shiva Panchaksharam Mantra", ta: "சிவ பஞ்சாக்ஷர மந்திரம்" },
    category: "Devotional",
    image: require("../assets/images/covers/shiva-panchaksharam-mantra.png"),
    audio: require("../assets/audio/shiva-panchaksharam-mantra.mp3"),
    description: {
      en: "The five sacred syllables Na-Ma-Shi-Va-Ya, the heart of Shaiva worship and the essence of Shiva.",
      ta: "ந-ம-சி-வ-ய என்ற ஐந்து புனித எழுத்துக்கள், சைவ வழிபாட்டின் உள்ளம் மற்றும் சிவனின் சாரம்.",
    },
    lyrics: {
      en: "Nagendra Haraya Trilochanaya\nBhasmanga Ragaya Maheshvaraya\nNityaya Shuddhaya Digambaraya\nTasmai Nakara Ya Namah Shivaya\n\nNamah Shivaya\nNamah Shivaya",
      ta: "நாகேந்திர ஹாராய திரிலோசனாய\nபஸ்மாங்க ராகாய மஹேஸ்வராய\nநித்யாய சுத்தாய திகம்பராய\nதஸ்மை நகார ய நமஃ சிவாய\n\nநமஃ சிவாய\nநமஃ சிவாய",
    },
  },
  {
    id: "21",
    title: { en: "Shivaya Om Shivya", ta: "சிவாய ஓம் சிவய" },
    category: "Devotional",
    image: require("../assets/images/covers/shivaya-om-shivya.png"),
    audio: require("../assets/audio/shivaya-om-shivya.mp3"),
    description: {
      en: "A meditative Shiva chant combining Om with the Panchakshara, ideal for deep meditation sessions.",
      ta: "ஓமையும் பஞ்சாக்ஷரத்தையும் இணைத்த தியான சிவ மந்திரம் — ஆழ்ந்த தியானத்திற்கு ஏற்றது.",
    },
    lyrics: {
      en: "Shivaya Om\nOm Shivaya\nShivaya Om Namaha\nOm Namah Shivaya\nShivaya Om",
      ta: "சிவாய ஓம்\nஓம் சிவாய\nசிவாய ஓம் நமஃ\nஓம் நமஃ சிவாய\nசிவாய ஓம்",
    },
  },
];
