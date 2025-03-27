
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Available languages
export type Language = 'en' | 'es' | 'fr' | 'hi';

// Translation dictionaries
export const translations = {
  en: {
    home: "Home",
    detectBreed: "Detect Breed",
    smartCattleManagement: "Smart Cattle Management with AI",
    uploadImage: "Upload Image",
    exploreFeatures: "Explore Features",
    aiPoweredAnalysis: "AI-Powered Analysis",
    breedDetection: "Breed Detection",
    cattleDetection: "Cattle Detection",
    uploadDescription: "Upload an image of cattle to get breed identification, breeding recommendations, and nutrition guidance powered by AI.",
    howItWorks: "How it works",
    step1: "1. Upload a cattle image to detect the breed using your local YOLOv8 model.",
    step2: "2. View AI-generated breeding matches, nutrition plans, and reproductive insights.",
    step3: "3. Chat with our AI assistant for more detailed cattle management advice.",
    bestBreedingMatches: "Best Breeding Matches",
    reproductiveBenefits: "Reproductive Benefits",
    nutritionPlan: "Nutrition Plan",
    chatWithAI: "Chat with AI",
    companyName: "CattleVision",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: "© 2024 CattleVision. All rights reserved.",
    languageSelector: "Language",
  },
  es: {
    home: "Inicio",
    detectBreed: "Detectar Raza",
    smartCattleManagement: "Gestión Inteligente de Ganado con IA",
    uploadImage: "Subir Imagen",
    exploreFeatures: "Explorar Características",
    aiPoweredAnalysis: "Análisis Impulsado por IA",
    breedDetection: "Detección de Razas",
    cattleDetection: "Detección de Ganado",
    uploadDescription: "Sube una imagen de ganado para obtener identificación de raza, recomendaciones de cría y orientación nutricional impulsada por IA.",
    howItWorks: "Cómo funciona",
    step1: "1. Sube una imagen de ganado para detectar la raza usando tu modelo YOLOv8 local.",
    step2: "2. Ve las coincidencias de cría generadas por IA, planes de nutrición e información reproductiva.",
    step3: "3. Chatea con nuestro asistente de IA para obtener consejos más detallados sobre la gestión del ganado.",
    bestBreedingMatches: "Mejores Coincidencias de Cría",
    reproductiveBenefits: "Beneficios Reproductivos",
    nutritionPlan: "Plan de Nutrición",
    chatWithAI: "Chatear con IA",
    companyName: "CattleVision",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    copyright: "© 2024 CattleVision. Todos los derechos reservados.",
    languageSelector: "Idioma",
  },
  fr: {
    home: "Accueil",
    detectBreed: "Détecter la Race",
    smartCattleManagement: "Gestion Intelligente du Bétail avec l'IA",
    uploadImage: "Télécharger une Image",
    exploreFeatures: "Explorer les Fonctionnalités",
    aiPoweredAnalysis: "Analyse Alimentée par l'IA",
    breedDetection: "Détection de Race",
    cattleDetection: "Détection de Bétail",
    uploadDescription: "Téléchargez une image de bétail pour obtenir l'identification de la race, des recommandations d'élevage et des conseils nutritionnels alimentés par l'IA.",
    howItWorks: "Comment ça marche",
    step1: "1. Téléchargez une image de bétail pour détecter la race à l'aide de votre modèle YOLOv8 local.",
    step2: "2. Consultez les correspondances d'élevage générées par l'IA, les plans nutritionnels et les informations sur la reproduction.",
    step3: "3. Discutez avec notre assistant IA pour obtenir des conseils plus détaillés sur la gestion du bétail.",
    bestBreedingMatches: "Meilleures Correspondances d'Élevage",
    reproductiveBenefits: "Avantages pour la Reproduction",
    nutritionPlan: "Plan de Nutrition",
    chatWithAI: "Discuter avec l'IA",
    companyName: "CattleVision",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    copyright: "© 2024 CattleVision. Tous droits réservés.",
    languageSelector: "Langue",
  },
  hi: {
    home: "होम",
    detectBreed: "नस्ल पहचानें",
    smartCattleManagement: "AI के साथ स्मार्ट पशुधन प्रबंधन",
    uploadImage: "छवि अपलोड करें",
    exploreFeatures: "सुविधाएँ देखें",
    aiPoweredAnalysis: "AI-संचालित विश्लेषण",
    breedDetection: "नस्ल पहचान",
    cattleDetection: "पशुधन पहचान",
    uploadDescription: "AI द्वारा संचालित नस्ल पहचान, प्रजनन अनुशंसाओं और पोषण मार्गदर्शन प्राप्त करने के लिए पशुधन की छवि अपलोड करें।",
    howItWorks: "यह कैसे काम करता है",
    step1: "1. अपने स्थानीय YOLOv8 मॉडल का उपयोग करके नस्ल का पता लगाने के लिए पशुधन छवि अपलोड करें।",
    step2: "2. AI द्वारा उत्पन्न प्रजनन मैच, पोषण योजनाओं और प्रजनन अंतर्दृष्टि देखें।",
    step3: "3. अधिक विस्तृत पशुधन प्रबंधन सलाह के लिए हमारे AI सहायक से चैट करें।",
    bestBreedingMatches: "सर्वोत्तम प्रजनन मैच",
    reproductiveBenefits: "प्रजनन लाभ",
    nutritionPlan: "पोषण योजना",
    chatWithAI: "AI के साथ चैट करें",
    companyName: "कैटलविज़न",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    copyright: "© 2024 कैटलविज़न। सर्वाधिकार सुरक्षित।",
    languageSelector: "भाषा",
  }
};

type TranslationKeys = keyof typeof translations.en;
type TranslationsType = Record<Language, Record<TranslationKeys, string>>;

// Define the context shape
interface LanguageContextType {
  language: Language;
  t: (key: TranslationKeys) => string;
  changeLanguage: (lang: Language) => void;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: TranslationKeys): string => {
    return (translations as TranslationsType)[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
