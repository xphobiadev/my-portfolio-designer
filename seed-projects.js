require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const img = (keyword) => `https://images.unsplash.com/photo-${keyword}?w=800&h=600&fit=crop&auto=format&q=80`;

const projectsByCategory = {
    "Photographie": [
        { title: "Lumière Dorée — Portraits", description: "Série de portraits cinématiques photographiée sur les toits de Marrakech, mélangeant lumière naturelle et textures architecturales.", cover_image: img("1506929562872-bb421503ef21"), tags: ["portraits", "golden hour", "marrakech"] },
        { title: "Âmes Monochromes", description: "Photographie de rue en noir et blanc à fort contraste documentant l'énergie de la vie nocturne casablancaise.", cover_image: img("1509281373149-e957c6296406"), tags: ["rue", "n&b", "casablanca"] },
        { title: "Sommets de l'Atlas", description: "Expédition photographique documentaire à travers le Haut Atlas, capturant les villages berbères et les paysages spectaculaires.", cover_image: img("1464822759023-fed4e83a8a07"), tags: ["paysage", "montagnes", "documentaire"] },
        { title: "Reflets Néon", description: "Photographie nocturne explorant les rues éclairées au néon et les ruelles pluvieuses de Rabat.", cover_image: img("1514565131-fce0801e5785"), tags: ["urbain", "nuit", "néon"] },
        { title: "La Mer Bleue", description: "Série de photographies minimalistes le long de la côte atlantique, mettant en valeur l'horizon et l'océan.", cover_image: img("1505118380757-91f5f5632de0"), tags: ["océan", "minimaliste", "atlantique"] },
        { title: "Souks & Ombres", description: "Photographie documentaire au cœur des souks marocains — artisans et jeux d'ombre.", cover_image: img("1504893524553-b855bce32c67"), tags: ["documentaire", "souks", "culture"] },
        { title: "Campagne Mode SS26", description: "Séance éditoriale pour une marque de luxe marocaine, style avant-gardiste et architecture brutaliste.", cover_image: img("1469334031218-e382a71b716b"), tags: ["mode", "éditorial", "luxe"] },
        { title: "Élégance Industrielle", description: "Photographie architecturale d'espaces industriels transformés en lieux de luxe — acier et béton brut.", cover_image: img("1486406146926-c627a92ad1ab"), tags: ["architecture", "industriel", "intérieur"] },
        { title: "Nuits Célestes", description: "Astrophotographie longue exposition depuis le désert du Sahara, capturant la Voie Lactée.", cover_image: img("1419242902214-272b3f66ee7a"), tags: ["astro", "désert", "nuit"] },
        { title: "Héritage Artisanal", description: "Projet explorant l'identité culturelle à travers trois générations d'artisans.", cover_image: img("1531746020798-e6953c6d8e04"), tags: ["portraits", "culture", "héritage"] },
    ],
    "Production Vidéo": [
        { title: "NOIR — Marque de Luxe", description: "Film de marque cinématique de 3 minutes pour une maison de parfums de luxe tourné sur RED Komodo.", cover_image: img("1492691527238-f9e06764d5b3"), tags: ["film de marque", "luxe", "commercial"] },
        { title: "Rythme de la Médina", description: "Documentaire visuel explorant l'atmosphère de la médina antique de Fès.", cover_image: img("1536440136628-849c177e76a1"), tags: ["documentaire", "culture", "fès"] },
        { title: "Vélocité — Automobile", description: "Publicité très dynamique pour une marque automobile dans les paysages désertiques.", cover_image: img("1503376780353-7e6692767b70"), tags: ["automobile", "publicité", "drone"] },
        { title: "Échos — Court Métrage", description: "Court métrage primé explorant la mémoire par une narration non linéaire.", cover_image: img("1478720568477-152d9b164e26"), tags: ["court métrage", "récit", "festival"] },
        { title: "Ascension — Campagne Sport", description: "Campagne dynamique utilisant le slow-motion et l'hyperlapse pour des athlètes.", cover_image: img("1534438327276-14e5300c3a48"), tags: ["sport", "campagne", "slow-mo"] },
        { title: "Cinéma de Mariage Privé", description: "Un pack vidéo de mariage luxueux, montage de qualité hollywoodienne.", cover_image: img("1519741497674-611481863552"), tags: ["mariage", "cinéma", "luxe"] },
        { title: "Béton & Verre — Architecture", description: "Vidéos spectaculaires par drone dévoilant l'architecture contemporaine marocaine.", cover_image: img("1487958449943-2429e8be8625"), tags: ["architecture", "vidéo", "drone"] },
        { title: "Série Gastronomique", description: "Série en 6 épisodes pour un restaurant étoilé, l'art culinaire au plus haut niveau.", cover_image: img("1414235077428-338989a2e8c0"), tags: ["gastronomie", "série", "restaurant"] },
        { title: "Festival Mawazine 2026", description: "Vidéos de présentation (aftermovie) capturant le plus grand festival musical.", cover_image: img("1459749411175-04bf5292ceea"), tags: ["festival", "musique", "événement"] },
        { title: "Film Corporate Vision", description: "Récit vidéo transformant les rapports annuels en expérience impactante.", cover_image: img("1553877522-43269d4ea984"), tags: ["entreprise", "business", "vision"] },
    ],
    "Ingénierie Audio": [
        { title: "Mixage Studio Gnaoua", description: "Session de mixage et mastering pour un album de fusion gnaoua et musique électronique.", cover_image: img("1598488035139-bdbb2231cb64"), tags: ["mixage", "gnaoua", "musique"] },
        { title: "Podcast TechTalks", description: "Production complète du podcast tech marocain (enregistrement, sound design).", cover_image: img("1478737270239-2f02b77fc618"), tags: ["podcast", "tech", "production"] },
        { title: "Bande Originale Film", description: "Composition de la bande sonore originale pour un court métrage local.", cover_image: img("1507838153414-b4b713384a76"), tags: ["composition", "film", "musique"] },
        { title: "Ingénierie Son Festival", description: "Design et encadrement du son live pour un festival devant 5000 spectateurs.", cover_image: img("1470229722913-7c0e2dbbafd3"), tags: ["live", "festival", "ingénierie"] },
        { title: "Voix-Off Publicitaire", description: "Traitement et mixage de voix-off pour campagnes radio et télévision nationales.", cover_image: img("1589903308904-1010c2294adc"), tags: ["voix-off", "publicité", "télévision"] },
        { title: "Audio Spatial 3D (VR)", description: "Conception de l'audio immersif 360° pour une exposition en réalité virtuelle.", cover_image: img("1558618666-fcd25c85f82e"), tags: ["spatial", "vr", "immersif"] },
        { title: "Beatmaking Hip-Hop", description: "Production de 20 instrumentales originales pour des rappeurs émérgents.", cover_image: img("1571330735066-03aaa9429d89"), tags: ["beat", "hip-hop", "instrumentales"] },
        { title: "Sound Design Interface", description: "Effets sonores (UI/UX) créés sur mesure pour une application fintech.", cover_image: img("1551288049-bebda4e38f71"), tags: ["ui/ux", "sound design", "app"] },
        { title: "Acoustique Studio", description: "Traitement, analyse et design acoustique pour un studio professionnel à Casablanca.", cover_image: img("1598653222000-6b7b7a552625"), tags: ["acoustique", "studio", "design"] },
        { title: "Mastering Vinyle", description: "Préparation audio analogique premium de morceaux pour pressage de vinyles.", cover_image: img("1539375665275-f9de415ef9ac"), tags: ["mastering", "vinyle", "analogique"] },
    ],
    "Motion Design": [
        { title: "Générique Logo Hôtel", description: "Animations ultra-chics et élégantes révélant l'identité d'un hôtel 5 étoiles.", cover_image: img("1558591710-4b4a1ae0f04d"), tags: ["animation", "logo", "luxe"] },
        { title: "Infographie Animée", description: "Tableaux et données d'entreprise traduits en graphiques animés fluides.", cover_image: img("1551288049-bebda4e38f71"), tags: ["infographie", "données", "entreprise"] },
        { title: "Pack Réseaux Sociaux", description: "Création de 30 maquettes animées adaptables pour TikTok et Instagram.", cover_image: img("1611162617474-5b21e879e113"), tags: ["social", "templates", "animation"] },
        { title: "Générique Documentaire", description: "Séquence d'ouverture stylisée pour un documentaire sur l'histoire visuelle du Maroc.", cover_image: img("1536240478700-b869070f9279"), tags: ["générique", "documentaire", "motion"] },
        { title: "Lancement Produit 3D", description: "Animation de modèlisation de produits High Tech présentée lors du lancement en 3D.", cover_image: img("1633356122102-3fe601e05bd2"), tags: ["3D", "produit", "lancement"] },
        { title: "Vidéo Explicative SaaS", description: "Animation 2D simplifiant complètement le fonctionnement d'une startup.", cover_image: img("1460925895917-afdab827c52f"), tags: ["explication", "saas", "2d"] },
        { title: "Arrière-plans Festival", description: "Boucles visuelles conçues pour des écrans LED massifs lors de concerts.", cover_image: img("1492684223f0-e1f6e18e5a67"), tags: ["led", "concerts", "live"] },
        { title: "Typographie Calligraphique", description: "Animation cinétique fusionnant texte moderne et calligraphie arabe.", cover_image: img("1555949963-ff9fe0c870eb"), tags: ["typographie", "musique", "arabe"] },
        { title: "Interface Animée (UX)", description: "50 animations de chargement et de transition douces pour développeurs.", cover_image: img("1550745165-9bc0b252726f"), tags: ["ui", "micro-interaction", "web"] },
        { title: "Visite Immobilière 3D", description: "Traversée photoréaliste d'une immense villa non encore construite.", cover_image: img("1545324418-cc1a3fa10c00"), tags: ["3d", "architecture", "immobilier"] },
    ],
    "Développement Web": [
        { title: "Plateforme E-Commerce Luxe", description: "Site complexe Next.js avec CMS headless et Shopify pour une collection d'art de luxe.", cover_image: img("1460925895917-afdab827c52f"), tags: ["e-commerce", "next.js", "stripe"] },
        { title: "CMS Agence Créative", description: "Générateur dynamique de portfolio gérant les galeries et vidéos, très rapide.", cover_image: img("1547658719-da2b51169166"), tags: ["portfolio", "cms", "agence"] },
        { title: "Site Immobilier 360", description: "Plateforme d'annonces combinant filtrage robuste et intégration Maps API Google.", cover_image: img("1560518883-ce09059eeffa"), tags: ["immobilier", "maps", "plateforme"] },
        { title: "Dashboard SaaS Analytics", description: "Tableau de bord de data en direct avec gestion d'accès rôle-par-rôle.", cover_image: img("1551288049-bebda4e38f71"), tags: ["saas", "dashboard", "données"] },
        { title: "Système de Réservation", description: "Plateforme de gestion de tables pour de multiples restaurants locaux en temps réel.", cover_image: img("1517248135467-4c7edcad34c4"), tags: ["réservation", "restaurant", "full-stack"] },
        { title: "Éducation & E-learning", description: "LMS conçu depuis zéro pour les étudiants universitaires avec suivi de la progression.", cover_image: img("1501504905252-473c47e087f8"), tags: ["lms", "éducation", "vidéo"] },
        { title: "Réseau Social Artisans", description: "Communauté de niche reliant designers et artisans traditionnels au Maroc.", cover_image: img("1522202176988-66273c2fd55f"), tags: ["social", "réseau", "artisans"] },
        { title: "Portail Médical Sécurisé", description: "Système de suivi médical RGPD avec ordonnances en direct pour des cliniques.", cover_image: img("1576091160399-112ba8d25d1d"), tags: ["médical", "santé", "télémédecine"] },
        { title: "Agrégateur Info IA", description: "Base de presse propulsée par un algorithme regroupant l'actualité selon les préférences.", cover_image: img("1504711434969-e33886168d3c"), tags: ["actualité", "ia", "algorithme"] },
        { title: "Billetterie d'Événements", description: "Logiciel de vente en ligne massif utilisant QR Code au scan physique, très évolutif.", cover_image: img("1540575467063-178a50c2df87"), tags: ["événements", "billet", "QR"] },
    ],
    "Ingénierie Logicielle": [
        { title: "Architecture Microservices", description: "Planification en microservices cloud-native via Kubernetes pour startup fintech.", cover_image: img("1558494949-ef010cbdcc31"), tags: ["microservices", "fintech", "cloud"] },
        { title: "Pipeline DevOps (CI/CD)", description: "Génération de déploiements automatiques par Github Actions vers Docker via AWS.", cover_image: img("1667372393119-3d4c48d07fc9"), tags: ["devops", "ci/cd", "kubernetes"] },
        { title: "Application Mobile Flutter", description: "Développement cross-platform avec focus strict sur le modèle offline-first natif.", cover_image: img("1512941937-f968f07c355a"), tags: ["mobile", "flutter", "ios"] },
        { title: "API Gateway (GraphQL)", description: "Interface unifiée regroupant les points REST/GraphQL avec Rate Limiting total.", cover_image: img("1555949963-ff9fe0c870eb"), tags: ["api", "graphql", "backend"] },
        { title: "Optimisation de BDD", description: "Restructuration PostgreSQL, réduction par 10 des temps de latences de requêtes.", cover_image: img("1544383835-bda2bc66a55d"), tags: ["bdd", "postgresql", "optimisation"] },
        { title: "Chat Temps-Réel WebSockets", description: "Architecture asynchrone pour du texte et des données live via Redis.", cover_image: img("1611746872915-64382b5c76da"), tags: ["chat", "temps réel", "websockets"] },
        { title: "Passerelle Bancaire Multipaiements", description: "Serveurs Node.js gérant des APIs de paiement complexes Stripe/Paypal/Banques Locales.", cover_image: img("1563013544-824ae1b704d3"), tags: ["paiements", "stripe", "finance"] },
        { title: "Script Automatisation Tests", description: "Bibliothèque entière E2E effectuant des tests de régression visuels via Playwright.", cover_image: img("1516116216565-8f4e3dc3f9b8"), tags: ["qa", "automatisation", "tests"] },
        { title: "Migration AWS vers Azure", description: "Travail complexe d'infrastructure cloud pour le secteur public sans aucune interruption de service.", cover_image: img("1451187580459-43490279c0fa"), tags: ["cloud", "migration", "azure"] },
        { title: "Smart Contracts Ethereum", description: "Ingénierie Solidity optimisée avec des frais bas pour plateforme NFT dédiée à l'art marocain", cover_image: img("1639762681485-074b7f938ba0"), tags: ["blockchain", "nft", "solidity"] },
    ],
    "Ingénieur IA & Prompting": [
        { title: "Vision par Ordinateur", description: "Réseau de neurones YOLOv8 dédié au contrôle qualité détectant parfaitement les défauts de production des machines.", cover_image: img("1555949963-ff9fe0c870eb"), tags: ["vision", "yolo", "qualité"] },
        { title: "Chatbot de Service NLP", description: "Agent de discussion intelligent formé sur GPT, gérant les questions urgentes des utilisateurs avec le dialecte approprié.", cover_image: img("1531746790095-6c900e73bfbc"), tags: ["nlp", "chatbot", "gpt"] },
        { title: "Moteur de Recommandation", description: "Projet de Machine Learning servant pour un hub E-commerce adaptant l'univers de vente au comportement du client.", cover_image: img("1527474305167-f8b9d7d75611"), tags: ["ml", "vente", "recommandation"] },
        { title: "Analyse Prédictive Stocks", description: "Prévision extrêmement précise des perturbations sur la chaîne locale via des modèles logiques logistiques.", cover_image: img("1454165804606-c3d57bc86b40"), tags: ["prédictif", "data", "logistique"] },
        { title: "IA Générative Copywriting", description: "Plateforme orientée Marketing qui génère du français, arabe et anglais fluide, parfaitement formatté pour le web social.", cover_image: img("1677442136019-21780ecad995"), tags: ["llm", "génération", "marketing"] },
        { title: "Analyse et Reconnaissance Darija", description: "ASR entrainé aux milliers d'heures vocales dialectales marocaines transformant efficacement la voix native en données textuelles nettes.", cover_image: img("1589903308904-1010c2294adc"), tags: ["voix", "asr", "darija"] },
        { title: "Navigation Drone IA", description: "Navigation aérienne et algorithmes gérant les déplacements physiques robotiques de capture LiDAR.", cover_image: img("1473968512647-3e447244af8f"), tags: ["drone", "ia", "agriculture"] },
        { title: "Détection de Fraude Financière", description: "Engine ML complexe identifiant des paternes douteuses, bloquant des transactions bancaires de haute-risque instantanément.", cover_image: img("1563013544-824ae1b704d3"), tags: ["fraude", "finance", "sécurité"] },
        { title: "OCR Français & Arabe", description: "Numérisation très massive des documents officiels nationaux en format données rééditables (Accuracy > 96%).", cover_image: img("1456513080510-7bf3a84b82f8"), tags: ["ocr", "arabe", "pdf"] },
        { title: "Plateforme MLOps", description: "Dashboard backend dédié au déploiement des modèles formés, et qui effectue toute une traçabilité versionée en continu.", cover_image: img("1518432031352-d6fc5c10da5a"), tags: ["mlops", "déploiement", "modèle"] },
    ],
    "Design UI/UX": [
        { title: "Refonte d'Application Bancaire", description: "Remaniement architectural et prototypage visuel, augmentant infiniment l'interaction mobile par une meilleure hiérarchisation.", cover_image: img("1512941937-f968f07c355a"), tags: ["banque", "app", "refonte"] },
        { title: "Design System Central", description: "Librairie Figma d'envergure internationale avec guides atomiques et éléments interactifs natifs pour l'entité entière.", cover_image: img("1558655146-9f40138edfeb"), tags: ["design system", "figma", "entreprise"] },
        { title: "Audit Expérience E-commerce", description: "Étude et amélioration continue orientée produit qui a rehaussé toutes les interfaces d'une marque vitrine en perdition.", cover_image: img("1460925895917-afdab827c52f"), tags: ["audit", "e-commerce", "ux"] },
        { title: "Dashboard Objet-Connecté", description: "Tableau de commande épuré, structurant parfaitement un déluge de données industrielles par un confort de teinte adaptatif.", cover_image: img("1551288049-bebda4e38f71"), tags: ["dashboard", "iot", "monitoring"] },
        { title: "Cinématique d'Accueil", description: "Pacing UX fluide implémentant un micro-interaction d'animation réduisant le stress lors du temps de création de compte via mobile.", cover_image: img("1616469829518-05b8b4a396cb"), tags: ["onboarding", "mobile", "ux"] },
        { title: "Mise à Norme d'Accessibilité", description: "Amélioration intégrale pour répondre méticuleusement au protocole strict d'accessibilité WCAG AA numérique via contrastes/lisibilité optimale.", cover_image: img("1573164713988-8665fc963095"), tags: ["accessibilité", "wcag", "inclusif"] },
        { title: "A/B Testing Conversion", description: "Affinement de la méthode de vente SAAS menant sur un grand succès psychologique grâce aux maquettes très orientées au détail typographique.", cover_image: img("1553877522-43269d4ea984"), tags: ["prix", "saas", "conversion"] },
        { title: "Prototypage AR Commerce", description: "Paradigme nouveau dans un concept visuel simulant de manière frappante un environnement d'achat augmenté via mobile de lentilles optiques ou parures.", cover_image: img("1633356122102-3fe601e05bd2"), tags: ["ar", "prototype", "achat"] },
        { title: "Recherche UX Personas", description: "Base de sondage terrain et numérisation des traits caractéristiques fondateurs déterminant précisément le client réel typique.", cover_image: img("1552664730-d307ca884978"), tags: ["recherche", "personas", "fintech"] },
        { title: "Wireframe Kit Startup", description: "Boîte à outils d'interface complète spécialisée pour l'écosystème web, compatible à 100% avec des langages droitiers comme l'Arabe (RTL).", cover_image: img("1581291518857-4e27b48ff24e"), tags: ["wireframe", "kit", "startup"] },
    ],
    "Design Print": [
        { title: "Identité de Marque Riad Luxe", description: "Graphisme complet, direction lettrée, et habillage pour un lieu paradisiaque Marrakech — Logotype / papeterie.", cover_image: img("1524758631624-e2822e304c36"), tags: ["branding", "riad", "luxe"] },
        { title: "Mise en Page Magazine", description: "Layout de magasine prestigieux d'architecture intérieure et décoration: Gestion des espacements et typographies éditoriales minutieuses.", cover_image: img("1586075010923-2dd4570fb338"), tags: ["magazine", "éditorial", "architecture"] },
        { title: "Packaging Bio & Luxe", description: "Étude et fabrication de conception physique d'une box de produits de beauté s'orientant dans la durabilité premium et le relief en or estampillé.", cover_image: img("1556909114-f6e7ad7d3136"), tags: ["packaging", "cosmétique", "durable"] },
        { title: "Design de Conférence Tech", description: "Déploiement événementiel gigantesque en terme de communication physique: Badges de prestige / Totems imprimables / signalisation unifiée.", cover_image: img("1540575467063-178a50c2df87"), tags: ["événement", "tech", "print"] },
        { title: "Couvertures de Livres", description: "Artbook pour 5 romans de renommée avec des visuels qui ont tous une estampation propre en feuille d'or, illustrés fidèlement à la main.", cover_image: img("1544947950-fa07a98d237f"), tags: ["couverture", "illustration", "dorure"] },
        { title: "Menu de Restaurant Étoilé", description: "Conception de carte de type cuir véritable et impression d'un lettrage complexe misant sur l'essence du goût pur de chaque produit.", cover_image: img("1414235077428-338989a2e8c0"), tags: ["menu", "restaurant", "typographie"] },
        { title: "Rapport Annuel Entreprise", description: "Édition physique annuelle d'un groupe financier imposant alliant données, charisme exécutif en photographie, et clarté.", cover_image: img("1553877522-43269d4ea984"), tags: ["rapport", "corporate", "finance"] },
        { title: "Invitation au Mariage", description: "Série classique somptueuse incluant RSVP et enveloppes, dont un texte au lettrage script authentique manuscrit d'époque, très sophistiqué.", cover_image: img("1519741497674-611481863552"), tags: ["mariage", "invitation", "calligraphie"] },
        { title: "Affichage Extérieur XXL", description: "Création publicitaire urbaine massive misant sur un slogan fort aux dimensions spectaculaires, imposant un standard local inégalable.", cover_image: img("1486406146926-c627a92ad1ab"), tags: ["publicité", "outdoor", "immobilier"] },
        { title: "Collection Cartes de Visites", description: "Set de 10 modèles graphiques épurés tirant profits d'encre UV réfléchissante / bosselage et un papier ultra épais luxueux local.", cover_image: img("1558655146-9f40138edfeb"), tags: ["cartes visuelles", "premium", "impression"] },
    ],
    "Design Scénique": [
        { title: "Tournée Scénique Nationale", description: "Direction imposante scénographique lors de gros concerts. Cadrage sur des dalles écrans immenses synchronisées sur un signal musical.", cover_image: img("1459749411175-04bf5292ceea"), tags: ["concert", "tournée", "led"] },
        { title: "Cérémonie de Gala Award", description: "Organisation luxueuse et structurelle de salle, englobant lumières interactives de l'ensemble d'un grand hôtel.", cover_image: img("1540575467063-178a50c2df87"), tags: ["gala", "awards", "projection"] },
        { title: "Défilé de Mode Runway", description: "Chemin de scène immersif enveloppé de miroirs infinis et l'aménagement d'une couche nébuleuse théâtrale pour de la Haute Couture en France.", cover_image: img("1469334031218-e382a71b716b"), tags: ["mode", "runway", "immersif"] },
        { title: "Scène Festival Massif", description: "Plan structurel en loge de métal ultra massives dédiées à des festivals d'Électro accueillants d'innombrables visiteurs à la belle étoile au Maroc.", cover_image: img("1470229722913-7c0e2dbbafd3"), tags: ["festival", "plein-air", "scène"] },
        { title: "Keynote de Conférence Digitale", description: "Lancement tech calquant le dynamisme fluide style grand plateau sobre de marque, favorisant massivement les éléments audiovisuels minimalistes.", cover_image: img("1633356122102-3fe601e05bd2"), tags: ["lancement tech", "keynote", "événement"] },
        { title: "Plateau de Théâtre Contemporain", description: "Scène conçue physiquement afin d'abriter de manière spectaculaire le mécanisme modulaire d'un drame historique se reconfigurant lui même durant l'instant", cover_image: img("1478720568477-152d9b164e26"), tags: ["théâtre", "décor", "drame"] },
        { title: "Décor Plateau d'Échanges", description: "Scénario classique et percutant de type « TED » utilisant la dominance monochrome un peu feutrée avec la projection focale sur les figures de présentateurs de fond.", cover_image: img("1475721027785-f74eccf877e2"), tags: ["conférence", "discours", "fond scène"] },
        { title: "Cabines Musicales Immenses (DJs)", description: "Projet de nuit complexe d'intégrer dans le bar d'accueil un vaisseau musical englobé de LEDs organiques programmées sur le tempo live.", cover_image: img("1470225620780-dba8ba36b745"), tags: ["club", "dj", "leds immersifs"] },
        { title: "Convention Vitrine Constructeurs", description: "Environnement corporate pour divers fabricants technologiques offrant zones privatives sonores, stands massifs colorés avec structures démontables complexes ergonomiques", cover_image: img("1486406146926-c627a92ad1ab"), tags: ["stand exposition", "salon", "module pro"] },
        { title: "Installation Artistique Sonore et Visuelle", description: "Structure de Musée qui capture la vue intégrale en offrant une chambre ronde à 360°, qui joue avec de la modélisation spatiale audio en temps pur. Une bulle d'ambience visuelle totale.", cover_image: img("1558618666-fcd25c85f82e"), tags: ["art immersif", "installation", "visuel"] },
    ]
};

async function seed() {
    console.log("🧹 Clearing projects and categories from Supabase (French DB refresh)...");

    // We will clear existing projects and categories, then insert everything fresh
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    let totalInserted = 0;

    for (const [category, projects] of Object.entries(projectsByCategory)) {
        console.log(`\n📁 Catégorie: ${category}`);

        // Ensure category exists
        const catSlug = category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const { error: catErr } = await supabase.from('categories').insert([{ name: category, slug: catSlug }]);
        if (catErr) console.log(`Error inserting category: ${catErr.message}`);

        for (const project of projects) {
            const slug = project.title.toLowerCase()
                .replace(/[—–]/g, '-')
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');

            const { error } = await supabase.from('projects').insert([{
                title: project.title,
                subtitle: category,
                category: category,
                slug: slug,
                description: project.description,
                cover_image: project.cover_image,
                video_url: null,
                audio_url: null,
                tags: project.tags,
                tools: [],
                gallery: []
            }]);

            if (error) {
                console.log(`   ❌ ${project.title}: ${error.message}`);
            } else {
                console.log(`   ✅ ${project.title}`);
                totalInserted++;
            }
        }
    }

    console.log(`\n🎉 Succès! Inséré ${totalInserted} projets en Français.`);
}

seed();
