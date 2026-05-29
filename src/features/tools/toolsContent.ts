import type { LanguageCode } from "../mail/i18n";

export const standaloneToolSlugs = [
  "email-dns-checker",
  "what-is-my-ip",
  "password-generator",
] as const;

export type StandaloneToolSlug = (typeof standaloneToolSlugs)[number];

type ToolPageCopy = {
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
};

export type ToolsCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  onlineTools: string;
  temporaryEmailTools: string;
  temporaryEmailCardDescription: string;
  openTool: string;
  backToTools: string;
  moreTools: string;
  homepage: string;
  common: {
    copy: string;
    copied: string;
    refresh: string;
    loading: string;
    error: string;
    check: string;
  };
  dns: ToolPageCopy & {
    domainLabel: string;
    domainPlaceholder: string;
    selectorLabel: string;
    selectorPlaceholder: string;
    checkButton: string;
    invalidDomain: string;
    missing: string;
    found: string;
    explanationTitle: string;
    explanation: string;
    sections: { title: string; body: string }[];
  };
  ip: ToolPageCopy & {
    yourIp: string;
    privacyTitle: string;
    privacyNote: string;
    explanationTitle: string;
    explanation: string;
  };
  password: ToolPageCopy & {
    length: string;
    uppercase: string;
    lowercase: string;
    numbers: string;
    symbols: string;
    generate: string;
    strength: string;
    weak: string;
    medium: string;
    strong: string;
    localNote: string;
    chooseOne: string;
    explanationTitle: string;
    explanation: string;
  };
};

const en: ToolsCopy = {
  title: "Free Online Tools - Instant Mail",
  description:
    "Use free online tools from Instant Mail, including email DNS checker, IP address checker, and secure password generator.",
  h1: "Free Online Tools",
  intro:
    "Quick privacy, email, and security utilities from Instant Mail. Use the tools below without creating an account.",
  onlineTools: "Online tools",
  temporaryEmailTools: "Temporary email tools",
  temporaryEmailCardDescription:
    "Open a dedicated Instant Mail temporary email page with a live inbox, copy button, and privacy-focused workflow.",
  openTool: "Open Tool",
  backToTools: "All tools",
  moreTools: "More free tools",
  homepage: "Instant Mail homepage",
  common: {
    copy: "Copy",
    copied: "Copied",
    refresh: "Refresh",
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
    check: "Check",
  },
  dns: {
    navLabel: "Email DNS Checker",
    hubTitle: "Email DNS Checker",
    hubDescription: "Check MX, SPF, DKIM, and DMARC records for any domain.",
    openTool: "Open Tool",
    toolsLabel: "Email deliverability",
    emailToolsLabel: "DNS records",
    moreTools: "More free tools",
    homeLabel: "Instant Mail homepage",
    title: "Email DNS Checker - Check MX, SPF, DKIM & DMARC Records",
    description:
      "Check email DNS records for any domain. Use Instant Mail to verify MX, SPF, DKIM, and DMARC records online.",
    h1: "Email DNS Checker",
    domainLabel: "Domain",
    domainPlaceholder: "example.com",
    selectorLabel: "DKIM selector (optional)",
    selectorPlaceholder: "default",
    checkButton: "Check DNS records",
    invalidDomain: "Enter a valid domain, such as example.com.",
    missing: "Missing",
    found: "Found",
    explanationTitle: "What this checks",
    explanation:
      "Email DNS records help receiving mail servers understand where to deliver email and whether messages are authorized.",
    sections: [
      { title: "MX records", body: "MX records tell the internet which mail servers receive email for a domain." },
      { title: "SPF", body: "SPF is a TXT record that lists which servers are allowed to send email for a domain." },
      { title: "DKIM", body: "DKIM uses a selector record to publish a public key for email signature verification." },
      { title: "DMARC", body: "DMARC tells receivers how to handle messages that fail SPF or DKIM checks." },
    ],
  },
  ip: {
    navLabel: "What Is My IP",
    hubTitle: "What Is My IP",
    hubDescription: "See the public IP address websites can see when you visit them.",
    openTool: "Open Tool",
    toolsLabel: "Network utility",
    emailToolsLabel: "Public IP",
    moreTools: "More free tools",
    homeLabel: "Instant Mail homepage",
    title: "What Is My IP Address? - Check Your Public IP Online",
    description:
      "Instantly check your public IP address online with Instant Mail. Fast, simple, and free IP lookup tool.",
    h1: "What Is My IP Address?",
    yourIp: "Your public IP address",
    privacyTitle: "Privacy note",
    privacyNote: "This tool only displays the IP address visible to websites you visit.",
    explanationTitle: "What is a public IP address?",
    explanation:
      "Your public IP address is the network address websites see when your browser connects to them. It may belong to your home network, mobile carrier, VPN, or office connection.",
  },
  password: {
    navLabel: "Password Generator",
    hubTitle: "Password Generator",
    hubDescription: "Generate strong passwords locally in your browser.",
    openTool: "Open Tool",
    toolsLabel: "Security utility",
    emailToolsLabel: "Password safety",
    moreTools: "More free tools",
    homeLabel: "Instant Mail homepage",
    title: "Secure Password Generator - Create Strong Passwords Online",
    description:
      "Generate strong, secure passwords online with Instant Mail. Free password generator with custom length, symbols, numbers, and letters.",
    h1: "Secure Password Generator",
    length: "Length",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    generate: "Generate password",
    strength: "Strength",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    localNote: "Passwords are generated locally in your browser and are never sent to any server.",
    chooseOne: "Select at least one character type.",
    explanationTitle: "How to use this generator",
    explanation:
      "Use longer passwords with multiple character types for important accounts. Store unique passwords in a trusted password manager.",
  },
};

export const toolsContent: Record<LanguageCode, ToolsCopy> = {
  en,
  pt: {
    ...en,
    title: "Ferramentas Online Grátis - Instant Mail",
    description:
      "Use ferramentas online grátis do Instant Mail, incluindo verificador DNS de email, consulta de IP e gerador de senhas seguras.",
    h1: "Ferramentas Online Grátis",
    intro: "Utilitários rápidos de privacidade, email e segurança do Instant Mail. Use sem criar conta.",
    onlineTools: "Ferramentas online",
    temporaryEmailTools: "Ferramentas de email temporário",
    temporaryEmailCardDescription:
      "Abra uma página dedicada de email temporário com caixa ativa, botão de copiar e fluxo focado em privacidade.",
    openTool: "Abrir ferramenta",
    backToTools: "Todas as ferramentas",
    moreTools: "Mais ferramentas grátis",
    homepage: "Página inicial do Instant Mail",
    common: { ...en.common, copy: "Copiar", copied: "Copiado", refresh: "Atualizar", loading: "Carregando...", error: "Algo deu errado. Tente novamente.", check: "Verificar" },
    dns: { ...en.dns, navLabel: "Verificador DNS de Email", hubTitle: "Verificador DNS de Email", hubDescription: "Verifique registros MX, SPF, DKIM e DMARC de qualquer domínio.", h1: "Verificador DNS de Email", domainLabel: "Domínio", selectorLabel: "Selector DKIM (opcional)", checkButton: "Verificar DNS", invalidDomain: "Digite um domínio válido, como example.com.", missing: "Ausente", found: "Encontrado", explanationTitle: "O que esta ferramenta verifica", explanation: "Registros DNS de email ajudam servidores a saber onde entregar mensagens e se o envio está autorizado." },
    ip: { ...en.ip, navLabel: "Qual é meu IP", hubTitle: "Qual é meu IP", hubDescription: "Veja o IP público que sites conseguem enxergar quando você os acessa.", h1: "Qual é meu endereço IP?", yourIp: "Seu IP público", privacyTitle: "Nota de privacidade", privacyNote: "Esta ferramenta apenas mostra o endereço IP visível para os sites que você visita.", explanationTitle: "O que é um IP público?", explanation: "Seu IP público é o endereço de rede que sites veem quando seu navegador se conecta a eles." },
    password: { ...en.password, navLabel: "Gerador de Senhas", hubTitle: "Gerador de Senhas", hubDescription: "Gere senhas fortes localmente no navegador.", h1: "Gerador de Senhas Seguras", length: "Tamanho", uppercase: "Maiúsculas", lowercase: "Minúsculas", numbers: "Números", symbols: "Símbolos", generate: "Gerar senha", strength: "Força", weak: "Fraca", medium: "Média", strong: "Forte", chooseOne: "Selecione pelo menos um tipo de caractere.", explanationTitle: "Como usar este gerador", explanation: "Use senhas longas e únicas para contas importantes. Guarde-as em um gerenciador de senhas confiável." },
  },
  es: {
    ...en,
    title: "Herramientas Online Gratis - Instant Mail",
    description:
      "Usa herramientas online gratis de Instant Mail, incluyendo verificador DNS de email, consulta de IP y generador de contraseñas seguras.",
    h1: "Herramientas Online Gratis",
    intro: "Utilidades rápidas de privacidad, email y seguridad de Instant Mail. Úsalas sin crear una cuenta.",
    onlineTools: "Herramientas online",
    temporaryEmailTools: "Herramientas de correo temporal",
    temporaryEmailCardDescription:
      "Abre una página dedicada de correo temporal con bandeja activa, botón de copiar y flujo enfocado en privacidad.",
    openTool: "Abrir herramienta",
    backToTools: "Todas las herramientas",
    moreTools: "Más herramientas gratis",
    homepage: "Inicio de Instant Mail",
    common: { ...en.common, copy: "Copiar", copied: "Copiado", refresh: "Actualizar", loading: "Cargando...", error: "Algo salió mal. Inténtalo de nuevo.", check: "Verificar" },
    dns: { ...en.dns, navLabel: "Verificador DNS de Email", hubTitle: "Verificador DNS de Email", hubDescription: "Comprueba registros MX, SPF, DKIM y DMARC de cualquier dominio.", h1: "Verificador DNS de Email", domainLabel: "Dominio", selectorLabel: "Selector DKIM (opcional)", checkButton: "Verificar DNS", invalidDomain: "Introduce un dominio válido, como example.com.", missing: "Falta", found: "Encontrado", explanationTitle: "Qué verifica", explanation: "Los registros DNS de email ayudan a saber dónde entregar mensajes y si el envío está autorizado." },
    ip: { ...en.ip, navLabel: "Cuál es mi IP", hubTitle: "Cuál es mi IP", hubDescription: "Consulta la IP pública que los sitios pueden ver cuando los visitas.", h1: "¿Cuál es mi dirección IP?", yourIp: "Tu IP pública", privacyTitle: "Nota de privacidad", privacyNote: "Esta herramienta solo muestra la IP visible para los sitios que visitas.", explanationTitle: "¿Qué es una IP pública?", explanation: "Tu IP pública es la dirección de red que ven los sitios cuando tu navegador se conecta." },
    password: { ...en.password, navLabel: "Generador de Contraseñas", hubTitle: "Generador de Contraseñas", hubDescription: "Genera contraseñas fuertes localmente en tu navegador.", h1: "Generador de Contraseñas Seguras", length: "Longitud", uppercase: "Mayúsculas", lowercase: "Minúsculas", numbers: "Números", symbols: "Símbolos", generate: "Generar contraseña", strength: "Seguridad", weak: "Débil", medium: "Media", strong: "Fuerte", chooseOne: "Selecciona al menos un tipo de carácter.", explanationTitle: "Cómo usar este generador", explanation: "Usa contraseñas largas y únicas para cuentas importantes. Guárdalas en un gestor de contraseñas confiable." },
  },
  fr: {
    ...en,
    title: "Outils en Ligne Gratuits - Instant Mail",
    description:
      "Utilisez les outils gratuits d'Instant Mail, dont un vérificateur DNS email, un outil d'adresse IP et un générateur de mots de passe.",
    h1: "Outils en Ligne Gratuits",
    intro: "Des utilitaires rapides de confidentialité, email et sécurité par Instant Mail, sans création de compte.",
    onlineTools: "Outils en ligne",
    temporaryEmailTools: "Outils d'email temporaire",
    temporaryEmailCardDescription:
      "Ouvrez une page dédiée d'email temporaire avec boîte active, bouton de copie et parcours axé sur la confidentialité.",
    openTool: "Ouvrir l'outil",
    backToTools: "Tous les outils",
    moreTools: "Plus d'outils gratuits",
    homepage: "Accueil Instant Mail",
    common: { ...en.common, copy: "Copier", copied: "Copié", refresh: "Actualiser", loading: "Chargement...", error: "Une erreur est survenue. Réessayez.", check: "Vérifier" },
    dns: { ...en.dns, navLabel: "Vérificateur DNS Email", hubTitle: "Vérificateur DNS Email", hubDescription: "Vérifiez les enregistrements MX, SPF, DKIM et DMARC d'un domaine.", h1: "Vérificateur DNS Email", domainLabel: "Domaine", selectorLabel: "Sélecteur DKIM (optionnel)", checkButton: "Vérifier les DNS", invalidDomain: "Entrez un domaine valide, comme example.com.", missing: "Manquant", found: "Trouvé", explanationTitle: "Ce que cet outil vérifie", explanation: "Les enregistrements DNS email aident les serveurs à livrer les messages et à vérifier les expéditeurs autorisés." },
    ip: { ...en.ip, navLabel: "Quelle est mon IP", hubTitle: "Quelle est mon IP", hubDescription: "Affichez l'adresse IP publique visible par les sites web.", h1: "Quelle est mon adresse IP ?", yourIp: "Votre IP publique", privacyTitle: "Note de confidentialité", privacyNote: "Cet outil affiche seulement l'adresse IP visible par les sites que vous visitez.", explanationTitle: "Qu'est-ce qu'une IP publique ?", explanation: "Votre IP publique est l'adresse réseau que les sites voient lorsque votre navigateur se connecte." },
    password: { ...en.password, navLabel: "Générateur de Mots de Passe", hubTitle: "Générateur de Mots de Passe", hubDescription: "Générez des mots de passe forts localement dans votre navigateur.", h1: "Générateur de Mots de Passe Sécurisés", length: "Longueur", uppercase: "Majuscules", lowercase: "Minuscules", numbers: "Chiffres", symbols: "Symboles", generate: "Générer", strength: "Force", weak: "Faible", medium: "Moyenne", strong: "Forte", chooseOne: "Sélectionnez au moins un type de caractère.", explanationTitle: "Comment utiliser ce générateur", explanation: "Utilisez des mots de passe longs et uniques pour les comptes importants, idéalement avec un gestionnaire fiable." },
  },
  de: {
    ...en,
    title: "Kostenlose Online-Tools - Instant Mail",
    description:
      "Nutzen Sie kostenlose Online-Tools von Instant Mail, darunter E-Mail-DNS-Prüfer, IP-Abfrage und sicherer Passwortgenerator.",
    h1: "Kostenlose Online-Tools",
    intro: "Schnelle Datenschutz-, E-Mail- und Sicherheitswerkzeuge von Instant Mail, ohne Konto.",
    onlineTools: "Online-Tools",
    temporaryEmailTools: "Temporäre E-Mail-Tools",
    temporaryEmailCardDescription:
      "Öffnen Sie eine spezielle Instant-Mail-Seite mit Live-Postfach, Kopierbutton und datenschutzfreundlichem Ablauf.",
    openTool: "Tool öffnen",
    backToTools: "Alle Tools",
    moreTools: "Weitere kostenlose Tools",
    homepage: "Instant Mail Startseite",
    common: { ...en.common, copy: "Kopieren", copied: "Kopiert", refresh: "Aktualisieren", loading: "Laden...", error: "Etwas ist schiefgelaufen. Bitte erneut versuchen.", check: "Prüfen" },
    dns: { ...en.dns, navLabel: "E-Mail-DNS-Prüfer", hubTitle: "E-Mail-DNS-Prüfer", hubDescription: "Prüfen Sie MX-, SPF-, DKIM- und DMARC-Einträge für Domains.", h1: "E-Mail-DNS-Prüfer", domainLabel: "Domain", selectorLabel: "DKIM-Selector (optional)", checkButton: "DNS prüfen", invalidDomain: "Geben Sie eine gültige Domain ein, z. B. example.com.", missing: "Fehlt", found: "Gefunden", explanationTitle: "Was geprüft wird", explanation: "E-Mail-DNS-Einträge helfen Servern bei Zustellung und Absenderprüfung." },
    ip: { ...en.ip, navLabel: "Wie ist meine IP", hubTitle: "Wie ist meine IP", hubDescription: "Sehen Sie die öffentliche IP-Adresse, die Websites sehen können.", h1: "Wie ist meine IP-Adresse?", yourIp: "Ihre öffentliche IP", privacyTitle: "Datenschutzhinweis", privacyNote: "Dieses Tool zeigt nur die IP-Adresse, die für besuchte Websites sichtbar ist.", explanationTitle: "Was ist eine öffentliche IP?", explanation: "Ihre öffentliche IP ist die Netzwerkadresse, die Websites sehen, wenn Ihr Browser eine Verbindung herstellt." },
    password: { ...en.password, navLabel: "Passwortgenerator", hubTitle: "Passwortgenerator", hubDescription: "Erzeugen Sie starke Passwörter lokal im Browser.", h1: "Sicherer Passwortgenerator", length: "Länge", uppercase: "Großbuchstaben", lowercase: "Kleinbuchstaben", numbers: "Zahlen", symbols: "Symbole", generate: "Passwort erzeugen", strength: "Stärke", weak: "Schwach", medium: "Mittel", strong: "Stark", chooseOne: "Wählen Sie mindestens einen Zeichentyp.", explanationTitle: "So verwenden Sie den Generator", explanation: "Nutzen Sie lange, einzigartige Passwörter für wichtige Konten und speichern Sie sie in einem vertrauenswürdigen Passwortmanager." },
  },
  id: {
    ...en,
    title: "Alat Online Gratis - Instant Mail",
    description:
      "Gunakan alat online gratis dari Instant Mail, termasuk pemeriksa DNS email, pemeriksa alamat IP, dan generator password aman.",
    h1: "Alat Online Gratis",
    intro: "Utilitas cepat untuk privasi, email, dan keamanan dari Instant Mail tanpa membuat akun.",
    onlineTools: "Alat online",
    temporaryEmailTools: "Alat email sementara",
    temporaryEmailCardDescription:
      "Buka halaman email sementara khusus dengan inbox aktif, tombol salin, dan alur yang berfokus pada privasi.",
    openTool: "Buka alat",
    backToTools: "Semua alat",
    moreTools: "Alat gratis lainnya",
    homepage: "Beranda Instant Mail",
    common: { ...en.common, copy: "Salin", copied: "Disalin", refresh: "Muat ulang", loading: "Memuat...", error: "Terjadi kesalahan. Coba lagi.", check: "Periksa" },
    dns: { ...en.dns, navLabel: "Pemeriksa DNS Email", hubTitle: "Pemeriksa DNS Email", hubDescription: "Periksa record MX, SPF, DKIM, dan DMARC untuk domain apa pun.", h1: "Pemeriksa DNS Email", domainLabel: "Domain", selectorLabel: "Selector DKIM (opsional)", checkButton: "Periksa DNS", invalidDomain: "Masukkan domain valid, seperti example.com.", missing: "Tidak ada", found: "Ditemukan", explanationTitle: "Apa yang diperiksa", explanation: "Record DNS email membantu server mengirim email dan memverifikasi pengirim yang diizinkan." },
    ip: { ...en.ip, navLabel: "Apa IP Saya", hubTitle: "Apa IP Saya", hubDescription: "Lihat alamat IP publik yang dapat dilihat website.", h1: "Apa alamat IP saya?", yourIp: "IP publik Anda", privacyTitle: "Catatan privasi", privacyNote: "Alat ini hanya menampilkan IP yang terlihat oleh website yang Anda kunjungi.", explanationTitle: "Apa itu IP publik?", explanation: "IP publik adalah alamat jaringan yang dilihat website saat browser Anda terhubung." },
    password: { ...en.password, navLabel: "Generator Password", hubTitle: "Generator Password", hubDescription: "Buat password kuat secara lokal di browser.", h1: "Generator Password Aman", length: "Panjang", uppercase: "Huruf besar", lowercase: "Huruf kecil", numbers: "Angka", symbols: "Simbol", generate: "Buat password", strength: "Kekuatan", weak: "Lemah", medium: "Sedang", strong: "Kuat", chooseOne: "Pilih minimal satu jenis karakter.", explanationTitle: "Cara memakai generator ini", explanation: "Gunakan password panjang dan unik untuk akun penting, lalu simpan di password manager tepercaya." },
  },
  hi: {
    ...en,
    title: "Free Online Tools - Instant Mail",
    description:
      "Instant Mail के free online tools इस्तेमाल करें, जिनमें email DNS checker, IP address checker और secure password generator शामिल हैं.",
    h1: "Free Online Tools",
    intro: "Instant Mail के privacy, email और security tools बिना account बनाए इस्तेमाल करें.",
    onlineTools: "Online tools",
    temporaryEmailTools: "Temporary email tools",
    temporaryEmailCardDescription:
      "Live inbox, copy button और privacy-focused flow वाली dedicated temporary email page खोलें.",
    openTool: "Tool खोलें",
    backToTools: "सभी tools",
    moreTools: "More free tools",
    homepage: "Instant Mail homepage",
    common: { ...en.common, copy: "Copy", copied: "Copied", refresh: "Refresh", loading: "Loading...", error: "कुछ गलत हुआ. फिर कोशिश करें.", check: "Check" },
    dns: { ...en.dns, navLabel: "Email DNS Checker", hubTitle: "Email DNS Checker", hubDescription: "किसी भी domain के MX, SPF, DKIM और DMARC records check करें.", h1: "Email DNS Checker", domainLabel: "Domain", selectorLabel: "DKIM selector (optional)", checkButton: "DNS records check करें", invalidDomain: "Valid domain डालें, जैसे example.com.", missing: "Missing", found: "Found", explanationTitle: "यह क्या check करता है", explanation: "Email DNS records mail delivery और authorized senders को verify करने में मदद करते हैं." },
    ip: { ...en.ip, navLabel: "What Is My IP", hubTitle: "What Is My IP", hubDescription: "वह public IP देखें जो websites को दिखाई देती है.", h1: "मेरा IP address क्या है?", yourIp: "आपका public IP", privacyTitle: "Privacy note", privacyNote: "यह tool केवल वह IP दिखाता है जो visited websites को दिखाई देता है.", explanationTitle: "Public IP क्या है?", explanation: "Public IP वह network address है जिसे websites आपके browser connection पर देखती हैं." },
    password: { ...en.password, navLabel: "Password Generator", hubTitle: "Password Generator", hubDescription: "Browser में locally strong passwords generate करें.", h1: "Secure Password Generator", length: "Length", uppercase: "Uppercase", lowercase: "Lowercase", numbers: "Numbers", symbols: "Symbols", generate: "Password generate करें", strength: "Strength", weak: "Weak", medium: "Medium", strong: "Strong", chooseOne: "कम से कम एक character type चुनें.", explanationTitle: "इस generator का उपयोग कैसे करें", explanation: "Important accounts के लिए long और unique passwords use करें और trusted password manager में save करें." },
  },
};

export function isStandaloneToolSlug(value: string | undefined): value is StandaloneToolSlug {
  return !!value && standaloneToolSlugs.includes(value as StandaloneToolSlug);
}

export function getStandaloneToolCopy(code: LanguageCode, slug: StandaloneToolSlug) {
  const copy = toolsContent[code];
  if (slug === "email-dns-checker") return copy.dns;
  if (slug === "what-is-my-ip") return copy.ip;
  return copy.password;
}
