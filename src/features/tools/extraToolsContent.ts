import type { LanguageCode } from "../mail/i18n";

// Copy for the newer standalone tools (fake data generator, QR code
// generator). Kept in a dedicated module so the large existing toolsContent.ts
// stays untouched and lower-risk. Shape mirrors the ToolPageCopy fields the
// shared ToolPageFrame / ToolsHub / nav rely on, plus per-tool extras.
type BaseToolCopy = {
  navLabel: string;
  hubTitle: string;
  hubDescription: string;
  openTool: string;
  toolsLabel: string;
  emailToolsLabel: string;
  moreTools: string;
  homeLabel: string;
  title: string;
  description: string;
  h1: string;
  privacyTitle: string;
  privacyBody: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  explanationTitle: string;
  explanation: string;
  sections: { title: string; body: string }[];
};

export type FakeDataCopy = BaseToolCopy & {
  generate: string;
  regenerate: string;
  copyJson: string;
  copied: string;
  countLabel: string;
  note: string;
  fields: {
    fullName: string;
    email: string;
    username: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zip: string;
    company: string;
    jobTitle: string;
    dateOfBirth: string;
    uuid: string;
    ipAddress: string;
    website: string;
  };
};

export type QrCodeCopy = BaseToolCopy & {
  inputLabel: string;
  inputPlaceholder: string;
  sizeLabel: string;
  downloadPng: string;
  emptyHint: string;
};

const fakeDataEn: FakeDataCopy = {
  navLabel: "Fake Data Generator",
  hubTitle: "Fake Data Generator",
  hubDescription: "Generate random names, emails, addresses, and test profiles for development and QA.",
  openTool: "Open Tool",
  toolsLabel: "Developer utility",
  emailToolsLabel: "Test data",
  moreTools: "More free tools",
  homeLabel: "Instant Mail homepage",
  title: "Fake Data Generator - Random Test Data, Names & Profiles",
  description:
    "Free fake data generator. Instantly create random names, emails, addresses, phone numbers, and developer test profiles in your browser. No signup, copy as JSON.",
  h1: "Fake Data Generator",
  privacyTitle: "Privacy note",
  privacyBody:
    "All data is generated randomly in your browser and is completely fictitious. Nothing is sent to a server, and Instant Mail does not store, log, or transmit the values you generate.",
  faqTitle: "Fake Data Generator FAQ",
  faq: [
    {
      question: "What is a fake data generator used for?",
      answer:
        "Developers and QA testers use fake data to fill forms, seed databases, build demos, and test sign-up flows without using real personal information. Pair it with a temporary email address for end-to-end testing.",
    },
    {
      question: "Is the generated data real?",
      answer:
        "No. Every name, address, phone number, and email is randomly assembled and fictitious. It does not correspond to a real person, household, or account.",
    },
    {
      question: "Can I generate several profiles at once?",
      answer:
        "Yes. Choose how many profiles you need and copy the full set as JSON, ready to paste into test scripts, fixtures, or spreadsheets.",
    },
    {
      question: "Does this generate credit card numbers?",
      answer:
        "No. This tool intentionally avoids financial and government identifiers. It focuses on safe, neutral fields like names, emails, and addresses for development and testing.",
    },
  ],
  explanationTitle: "How to use the fake data generator",
  explanation:
    "Pick how many profiles you need and click generate. Each profile contains a random name, username, email, phone number, address, company, job title, date of birth, UUID, and IP address. Copy a single field or export the whole batch as JSON. Everything is generated locally in your browser, so it works offline and never touches a server.",
  sections: [
    {
      title: "For developers",
      body: "Seed a database, build a demo, or fill a form without inventing data by hand. The JSON export drops straight into fixtures, mock APIs, and test scripts.",
    },
    {
      title: "For QA and testing",
      body: "Test sign-up, checkout, and validation flows with realistic-looking but fictitious data. Combine it with an Instant Mail temporary inbox to receive verification codes.",
    },
    {
      title: "For design and demos",
      body: "Populate mockups, dashboards, and CRM demos with believable placeholder profiles instead of repeating 'John Doe' everywhere.",
    },
    {
      title: "Privacy by design",
      body: "Because the data is fictitious and generated locally, you avoid exposing real personal information in test environments, screenshots, and shared demos.",
    },
  ],
  generate: "Generate",
  regenerate: "Regenerate",
  copyJson: "Copy as JSON",
  copied: "Copied",
  countLabel: "How many profiles",
  note: "All values are randomly generated and fictitious. Do not treat them as real personal data.",
  fields: {
    fullName: "Full name",
    email: "Email",
    username: "Username",
    phone: "Phone",
    address: "Street address",
    city: "City",
    country: "Country",
    zip: "Postal code",
    company: "Company",
    jobTitle: "Job title",
    dateOfBirth: "Date of birth",
    uuid: "UUID",
    ipAddress: "IP address",
    website: "Website",
  },
};

const qrCodeEn: QrCodeCopy = {
  navLabel: "QR Code Generator",
  hubTitle: "QR Code Generator",
  hubDescription: "Create a free QR code from any link or text and download it as a PNG.",
  openTool: "Open Tool",
  toolsLabel: "Utility",
  emailToolsLabel: "QR codes",
  moreTools: "More free tools",
  homeLabel: "Instant Mail homepage",
  title: "QR Code Generator - Free Custom QR Codes (PNG Download)",
  description:
    "Free online QR code generator. Turn any URL, text, email, or phone number into a high-resolution QR code and download it as a PNG. No signup, no watermark.",
  h1: "QR Code Generator",
  privacyTitle: "Privacy note",
  privacyBody:
    "QR codes are generated entirely in your browser. The text or link you enter is never sent to a server, stored, or logged by Instant Mail.",
  faqTitle: "QR Code Generator FAQ",
  faq: [
    {
      question: "How do I create a QR code?",
      answer:
        "Type or paste any link, text, email, or phone number into the field. The QR code updates instantly, and you can download it as a PNG image to print or share.",
    },
    {
      question: "Are these QR codes free to use?",
      answer:
        "Yes. The QR codes are free, have no watermark, and never expire because the data is encoded directly into the image rather than through a redirect.",
    },
    {
      question: "Do the QR codes expire?",
      answer:
        "No. These are static QR codes that encode your content directly, so they keep working as long as the destination link or text is valid.",
    },
    {
      question: "What can I put in a QR code?",
      answer:
        "Any short text works: website URLs, Wi-Fi logins, email addresses, phone numbers, plain notes, or app links. Shorter content produces a simpler, easier-to-scan code.",
    },
  ],
  explanationTitle: "How to use the QR code generator",
  explanation:
    "Enter a URL or any text, choose a size, and your QR code is created instantly in the browser. Download it as a transparent-friendly PNG to use on posters, packaging, business cards, menus, or slides. Because the content is encoded directly into the image, the code is static, free, and never expires.",
  sections: [
    {
      title: "Links and websites",
      body: "Turn a long URL into a scannable code for flyers, slides, packaging, or shop windows so people can open it without typing.",
    },
    {
      title: "Contact and Wi-Fi",
      body: "Encode an email address, phone number, or a short note. Scanners on most phones detect the type and offer the right action automatically.",
    },
    {
      title: "Print friendly",
      body: "The PNG export is high resolution, so the code stays crisp from business-card size up to posters and banners.",
    },
    {
      title: "Static and private",
      body: "Your content is encoded into the image itself with no tracking redirect, so the code works offline, never expires, and keeps your data private.",
    },
  ],
  inputLabel: "Link or text",
  inputPlaceholder: "https://example.com",
  sizeLabel: "Size",
  downloadPng: "Download PNG",
  emptyHint: "Enter a link or some text above to generate your QR code.",
};

type ExtraTools = { fakeData: FakeDataCopy; qrCode: QrCodeCopy };

export const extraToolsContent: Record<LanguageCode, ExtraTools> = {
  en: { fakeData: fakeDataEn, qrCode: qrCodeEn },
  pt: {
    fakeData: {
      ...fakeDataEn,
      navLabel: "Gerador de Dados Falsos",
      hubTitle: "Gerador de Dados Falsos",
      hubDescription: "Gere nomes, emails, endereços e perfis de teste aleatórios para desenvolvimento e QA.",
      toolsLabel: "Utilitário para devs",
      title: "Gerador de Dados Falsos - Dados de Teste, Nomes e Perfis",
      description:
        "Gerador de dados falsos grátis. Crie nomes, emails, endereços, telefones e perfis de teste aleatórios no navegador. Sem cadastro, copie em JSON.",
      h1: "Gerador de Dados Falsos",
      privacyTitle: "Nota de privacidade",
      privacyBody:
        "Todos os dados são gerados aleatoriamente no seu navegador e são fictícios. Nada é enviado a servidores, e o Instant Mail não armazena nem registra os valores.",
      explanationTitle: "Como usar o gerador de dados falsos",
      explanation:
        "Escolha quantos perfis você precisa e clique em gerar. Cada perfil traz nome, usuário, email, telefone, endereço, empresa, cargo, data de nascimento, UUID e IP aleatórios. Copie um campo ou exporte tudo em JSON. Tudo é gerado localmente no seu navegador.",
      generate: "Gerar",
      regenerate: "Gerar novamente",
      copyJson: "Copiar em JSON",
      copied: "Copiado",
      countLabel: "Quantos perfis",
      note: "Todos os valores são aleatórios e fictícios. Não os trate como dados pessoais reais.",
    },
    qrCode: {
      ...qrCodeEn,
      navLabel: "Gerador de QR Code",
      hubTitle: "Gerador de QR Code",
      hubDescription: "Crie um QR code grátis a partir de qualquer link ou texto e baixe em PNG.",
      toolsLabel: "Utilitário",
      title: "Gerador de QR Code - QR Codes Grátis (Download PNG)",
      description:
        "Gerador de QR code online grátis. Transforme qualquer link, texto, email ou telefone em um QR code em alta resolução e baixe em PNG. Sem cadastro, sem marca d'água.",
      h1: "Gerador de QR Code",
      privacyTitle: "Nota de privacidade",
      privacyBody:
        "Os QR codes são gerados inteiramente no seu navegador. O texto ou link informado nunca é enviado a servidores nem registrado pelo Instant Mail.",
      explanationTitle: "Como usar o gerador de QR code",
      explanation:
        "Digite um link ou texto, escolha o tamanho e o QR code é criado na hora no navegador. Baixe em PNG para usar em cartazes, embalagens, cartões e slides. O conteúdo é codificado direto na imagem, então o código é estático, grátis e nunca expira.",
      inputLabel: "Link ou texto",
      sizeLabel: "Tamanho",
      downloadPng: "Baixar PNG",
      emptyHint: "Digite um link ou texto acima para gerar seu QR code.",
    },
  },
  es: {
    fakeData: {
      ...fakeDataEn,
      navLabel: "Generador de Datos Falsos",
      hubTitle: "Generador de Datos Falsos",
      hubDescription: "Genera nombres, emails, direcciones y perfiles de prueba aleatorios para desarrollo y QA.",
      toolsLabel: "Utilidad para desarrolladores",
      title: "Generador de Datos Falsos - Datos de Prueba, Nombres y Perfiles",
      description:
        "Generador de datos falsos gratis. Crea nombres, emails, direcciones, teléfonos y perfiles de prueba aleatorios en el navegador. Sin registro, copia en JSON.",
      h1: "Generador de Datos Falsos",
      privacyTitle: "Nota de privacidad",
      privacyBody:
        "Todos los datos se generan aleatoriamente en tu navegador y son ficticios. Nada se envía a un servidor y Instant Mail no almacena ni registra los valores.",
      explanationTitle: "Cómo usar el generador de datos falsos",
      explanation:
        "Elige cuántos perfiles necesitas y pulsa generar. Cada perfil incluye nombre, usuario, email, teléfono, dirección, empresa, puesto, fecha de nacimiento, UUID e IP aleatorios. Copia un campo o exporta todo en JSON. Todo se genera localmente en tu navegador.",
      generate: "Generar",
      regenerate: "Generar de nuevo",
      copyJson: "Copiar en JSON",
      copied: "Copiado",
      countLabel: "Cuántos perfiles",
      note: "Todos los valores son aleatorios y ficticios. No los trates como datos personales reales.",
    },
    qrCode: {
      ...qrCodeEn,
      navLabel: "Generador de Códigos QR",
      hubTitle: "Generador de Códigos QR",
      hubDescription: "Crea un código QR gratis a partir de cualquier enlace o texto y descárgalo en PNG.",
      toolsLabel: "Utilidad",
      title: "Generador de Códigos QR - Códigos QR Gratis (Descarga PNG)",
      description:
        "Generador de códigos QR online gratis. Convierte cualquier URL, texto, email o teléfono en un código QR de alta resolución y descárgalo en PNG. Sin registro ni marca de agua.",
      h1: "Generador de Códigos QR",
      privacyTitle: "Nota de privacidad",
      privacyBody:
        "Los códigos QR se generan por completo en tu navegador. El texto o enlace que introduces nunca se envía a un servidor ni lo registra Instant Mail.",
      explanationTitle: "Cómo usar el generador de códigos QR",
      explanation:
        "Introduce un enlace o texto, elige un tamaño y el código QR se crea al instante en el navegador. Descárgalo en PNG para carteles, embalajes, tarjetas y diapositivas. El contenido se codifica en la imagen, así que el código es estático, gratis y no caduca.",
      inputLabel: "Enlace o texto",
      sizeLabel: "Tamaño",
      downloadPng: "Descargar PNG",
      emptyHint: "Introduce un enlace o texto arriba para generar tu código QR.",
    },
  },
  fr: {
    fakeData: {
      ...fakeDataEn,
      navLabel: "Générateur de Données Fictives",
      hubTitle: "Générateur de Données Fictives",
      hubDescription: "Générez des noms, emails, adresses et profils de test aléatoires pour le développement et le QA.",
      toolsLabel: "Utilitaire développeur",
      title: "Générateur de Données Fictives - Données de Test, Noms et Profils",
      description:
        "Générateur de données fictives gratuit. Créez des noms, emails, adresses, téléphones et profils de test aléatoires dans le navigateur. Sans inscription, copie en JSON.",
      h1: "Générateur de Données Fictives",
      privacyTitle: "Note de confidentialité",
      privacyBody:
        "Toutes les données sont générées aléatoirement dans votre navigateur et sont fictives. Rien n'est envoyé à un serveur, et Instant Mail n'enregistre pas les valeurs.",
      explanationTitle: "Comment utiliser le générateur de données fictives",
      explanation:
        "Choisissez le nombre de profils et cliquez sur générer. Chaque profil contient un nom, identifiant, email, téléphone, adresse, entreprise, poste, date de naissance, UUID et IP aléatoires. Copiez un champ ou exportez le tout en JSON. Tout est généré localement dans votre navigateur.",
      generate: "Générer",
      regenerate: "Régénérer",
      copyJson: "Copier en JSON",
      copied: "Copié",
      countLabel: "Combien de profils",
      note: "Toutes les valeurs sont aléatoires et fictives. Ne les traitez pas comme de vraies données personnelles.",
    },
    qrCode: {
      ...qrCodeEn,
      navLabel: "Générateur de QR Code",
      hubTitle: "Générateur de QR Code",
      hubDescription: "Créez un QR code gratuit à partir de n'importe quel lien ou texte et téléchargez-le en PNG.",
      toolsLabel: "Utilitaire",
      title: "Générateur de QR Code - QR Codes Gratuits (Téléchargement PNG)",
      description:
        "Générateur de QR code en ligne gratuit. Transformez une URL, un texte, un email ou un téléphone en QR code haute résolution et téléchargez-le en PNG. Sans inscription ni filigrane.",
      h1: "Générateur de QR Code",
      privacyTitle: "Note de confidentialité",
      privacyBody:
        "Les QR codes sont générés entièrement dans votre navigateur. Le texte ou le lien saisi n'est jamais envoyé à un serveur ni enregistré par Instant Mail.",
      explanationTitle: "Comment utiliser le générateur de QR code",
      explanation:
        "Saisissez un lien ou un texte, choisissez une taille et le QR code est créé instantanément dans le navigateur. Téléchargez-le en PNG pour affiches, emballages, cartes et diapositives. Le contenu est encodé dans l'image, donc le code est statique, gratuit et n'expire jamais.",
      inputLabel: "Lien ou texte",
      sizeLabel: "Taille",
      downloadPng: "Télécharger le PNG",
      emptyHint: "Saisissez un lien ou un texte ci-dessus pour générer votre QR code.",
    },
  },
  de: {
    fakeData: {
      ...fakeDataEn,
      navLabel: "Testdaten-Generator",
      hubTitle: "Testdaten-Generator",
      hubDescription: "Erzeugen Sie zufällige Namen, E-Mails, Adressen und Testprofile für Entwicklung und QA.",
      toolsLabel: "Entwickler-Tool",
      title: "Testdaten-Generator - Zufällige Testdaten, Namen & Profile",
      description:
        "Kostenloser Testdaten-Generator. Erzeugen Sie zufällige Namen, E-Mails, Adressen, Telefonnummern und Testprofile im Browser. Ohne Anmeldung, Export als JSON.",
      h1: "Testdaten-Generator",
      privacyTitle: "Datenschutzhinweis",
      privacyBody:
        "Alle Daten werden zufällig im Browser erzeugt und sind fiktiv. Nichts wird an einen Server gesendet, und Instant Mail speichert die Werte nicht.",
      explanationTitle: "So verwenden Sie den Testdaten-Generator",
      explanation:
        "Wählen Sie die Anzahl der Profile und klicken Sie auf Generieren. Jedes Profil enthält zufälligen Namen, Benutzernamen, E-Mail, Telefon, Adresse, Firma, Position, Geburtsdatum, UUID und IP. Kopieren Sie ein Feld oder exportieren Sie alles als JSON. Alles wird lokal im Browser erzeugt.",
      generate: "Generieren",
      regenerate: "Neu generieren",
      copyJson: "Als JSON kopieren",
      copied: "Kopiert",
      countLabel: "Wie viele Profile",
      note: "Alle Werte sind zufällig und fiktiv. Behandeln Sie sie nicht als echte personenbezogene Daten.",
    },
    qrCode: {
      ...qrCodeEn,
      navLabel: "QR-Code-Generator",
      hubTitle: "QR-Code-Generator",
      hubDescription: "Erstellen Sie einen kostenlosen QR-Code aus Link oder Text und laden Sie ihn als PNG herunter.",
      toolsLabel: "Werkzeug",
      title: "QR-Code-Generator - Kostenlose QR-Codes (PNG-Download)",
      description:
        "Kostenloser Online-QR-Code-Generator. Wandeln Sie URL, Text, E-Mail oder Telefon in einen hochauflösenden QR-Code um und laden Sie ihn als PNG herunter. Ohne Anmeldung, ohne Wasserzeichen.",
      h1: "QR-Code-Generator",
      privacyTitle: "Datenschutzhinweis",
      privacyBody:
        "QR-Codes werden vollständig im Browser erzeugt. Der eingegebene Text oder Link wird nie an einen Server gesendet oder von Instant Mail gespeichert.",
      explanationTitle: "So verwenden Sie den QR-Code-Generator",
      explanation:
        "Geben Sie einen Link oder Text ein, wählen Sie eine Größe, und der QR-Code wird sofort im Browser erstellt. Laden Sie ihn als PNG für Plakate, Verpackungen, Karten und Folien herunter. Der Inhalt wird in das Bild codiert, daher ist der Code statisch, kostenlos und läuft nie ab.",
      inputLabel: "Link oder Text",
      sizeLabel: "Größe",
      downloadPng: "PNG herunterladen",
      emptyHint: "Geben Sie oben einen Link oder Text ein, um Ihren QR-Code zu erzeugen.",
    },
  },
  id: {
    fakeData: {
      ...fakeDataEn,
      navLabel: "Generator Data Palsu",
      hubTitle: "Generator Data Palsu",
      hubDescription: "Buat nama, email, alamat, dan profil uji acak untuk pengembangan dan QA.",
      toolsLabel: "Alat developer",
      title: "Generator Data Palsu - Data Uji, Nama & Profil Acak",
      description:
        "Generator data palsu gratis. Buat nama, email, alamat, nomor telepon, dan profil uji acak di browser. Tanpa daftar, salin sebagai JSON.",
      h1: "Generator Data Palsu",
      privacyTitle: "Catatan privasi",
      privacyBody:
        "Semua data dibuat secara acak di browser Anda dan bersifat fiktif. Tidak ada yang dikirim ke server, dan Instant Mail tidak menyimpan nilainya.",
      explanationTitle: "Cara memakai generator data palsu",
      explanation:
        "Pilih berapa profil yang Anda butuhkan lalu klik buat. Setiap profil berisi nama, username, email, telepon, alamat, perusahaan, jabatan, tanggal lahir, UUID, dan IP acak. Salin satu kolom atau ekspor semua sebagai JSON. Semua dibuat lokal di browser Anda.",
      generate: "Buat",
      regenerate: "Buat ulang",
      copyJson: "Salin sebagai JSON",
      copied: "Disalin",
      countLabel: "Berapa profil",
      note: "Semua nilai acak dan fiktif. Jangan perlakukan sebagai data pribadi asli.",
    },
    qrCode: {
      ...qrCodeEn,
      navLabel: "Generator Kode QR",
      hubTitle: "Generator Kode QR",
      hubDescription: "Buat kode QR gratis dari tautan atau teks apa pun dan unduh sebagai PNG.",
      toolsLabel: "Alat",
      title: "Generator Kode QR - Kode QR Gratis (Unduh PNG)",
      description:
        "Generator kode QR online gratis. Ubah URL, teks, email, atau telepon menjadi kode QR resolusi tinggi dan unduh sebagai PNG. Tanpa daftar, tanpa watermark.",
      h1: "Generator Kode QR",
      privacyTitle: "Catatan privasi",
      privacyBody:
        "Kode QR dibuat sepenuhnya di browser Anda. Teks atau tautan yang Anda masukkan tidak pernah dikirim ke server atau dicatat oleh Instant Mail.",
      explanationTitle: "Cara memakai generator kode QR",
      explanation:
        "Masukkan tautan atau teks, pilih ukuran, dan kode QR dibuat seketika di browser. Unduh sebagai PNG untuk poster, kemasan, kartu, dan slide. Konten dikodekan langsung ke gambar, jadi kode bersifat statis, gratis, dan tidak pernah kedaluwarsa.",
      inputLabel: "Tautan atau teks",
      sizeLabel: "Ukuran",
      downloadPng: "Unduh PNG",
      emptyHint: "Masukkan tautan atau teks di atas untuk membuat kode QR Anda.",
    },
  },
  hi: {
    fakeData: {
      ...fakeDataEn,
      navLabel: "Fake Data Generator",
      hubTitle: "Fake Data Generator",
      hubDescription: "Development और QA के लिए random नाम, email, address और test profiles बनाएं.",
      toolsLabel: "Developer utility",
      title: "Fake Data Generator - Random Test Data, Names & Profiles",
      description:
        "मुफ़्त fake data generator. Browser में random नाम, email, address, phone और test profiles बनाएं. कोई signup नहीं, JSON में copy करें.",
      h1: "Fake Data Generator",
      privacyTitle: "Privacy note",
      privacyBody:
        "सारा data आपके browser में randomly बनता है और काल्पनिक है. कुछ भी server पर नहीं भेजा जाता और Instant Mail values को store नहीं करता.",
      explanationTitle: "Fake data generator का उपयोग कैसे करें",
      explanation:
        "कितने profiles चाहिए चुनें और generate दबाएं. हर profile में random नाम, username, email, phone, address, company, job title, जन्मतिथि, UUID और IP होते हैं. एक field copy करें या पूरा JSON export करें. सब कुछ आपके browser में locally बनता है.",
      generate: "Generate करें",
      regenerate: "फिर से generate करें",
      copyJson: "JSON में copy करें",
      copied: "Copied",
      countLabel: "कितने profiles",
      note: "सभी values random और काल्पनिक हैं. इन्हें असली personal data न मानें.",
    },
    qrCode: {
      ...qrCodeEn,
      navLabel: "QR Code Generator",
      hubTitle: "QR Code Generator",
      hubDescription: "किसी भी link या text से मुफ़्त QR code बनाएं और PNG में download करें.",
      toolsLabel: "Utility",
      title: "QR Code Generator - मुफ़्त QR Codes (PNG Download)",
      description:
        "मुफ़्त online QR code generator. किसी भी URL, text, email या phone को high-resolution QR code में बदलें और PNG download करें. कोई signup या watermark नहीं.",
      h1: "QR Code Generator",
      privacyTitle: "Privacy note",
      privacyBody:
        "QR codes पूरी तरह आपके browser में बनते हैं. आपका text या link कभी server पर नहीं भेजा जाता और Instant Mail इसे store नहीं करता.",
      explanationTitle: "QR code generator का उपयोग कैसे करें",
      explanation:
        "एक link या text डालें, size चुनें, और QR code browser में तुरंत बन जाता है. Posters, packaging, cards और slides के लिए PNG download करें. Content सीधे image में encode होता है, इसलिए code static, मुफ़्त और कभी expire न होने वाला है.",
      inputLabel: "Link या text",
      sizeLabel: "Size",
      downloadPng: "PNG download करें",
      emptyHint: "अपना QR code बनाने के लिए ऊपर link या text डालें.",
    },
  },
};
