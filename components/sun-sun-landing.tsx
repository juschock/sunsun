'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, BookOpen, Globe, Megaphone } from "lucide-react"

// First, define the structure of your content object
type ContentType = {
  title: string;
  subtitle: string;
  cta: string;
  featuredTitle: string;
  contentTypes: {
    fiction: string;
    news: string;
    blogs: string;
    articles: string;
    ads: string;
  };
};

type ContentLanguages = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi' | 'bn' | 'ta';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
]

// Define the content object with the correct type
const content: Record<ContentLanguages, ContentType> = {
  en: {
    title: "Sun Sun",
    subtitle: "Radiant content that illuminates across languages",
    cta: "Brighten Your Experience",
    featuredTitle: "Trending Rays",
    contentTypes: {
      fiction: "Sunbeam Fiction",
      news: "Daybreak News",
      blogs: "Sunny Blogs",
      articles: "Radiant Articles",
      ads: "Glowing Ads"
    }
  },
  es: {
    title: "Sun Sun",
    subtitle: "Contenido radiante que ilumina a través de los idiomas",
    cta: "Ilumina Tu Experiencia",
    featuredTitle: "Rayos Tendencia",
    contentTypes: {
      fiction: "Ficción Radiante",
      news: "Noticias del Amanecer",
      blogs: "Blogs Soleados",
      articles: "Artículos Brillantes",
      ads: "Anuncios Resplandecientes"
    }
  },
  fr: {
    title: "Sun Sun",
    subtitle: "Du contenu radieux qui illumine à travers les langues",
    cta: "Illuminez Votre Expérience",
    featuredTitle: "Rayons Tendance",
    contentTypes: {
      fiction: "Fiction Ensoleillée",
      news: "Nouvelles de l'Aube",
      blogs: "Blogs Lumineux",
      articles: "Articles Rayonnants",
      ads: "Pubs Éclatantes"
    }
  },
  de: {
    title: "Sun Sun",
    subtitle: "Strahlende Inhalte, die über Sprachen hinweg leuchten",
    cta: "Erhellen Sie Ihr Erlebnis",
    featuredTitle: "Trending Strahlen",
    contentTypes: {
      fiction: "Sonnenschein-Fiktion",
      news: "Tagesanbruch-Nachrichten",
      blogs: "Sonnige Blogs",
      articles: "Strahlende Artikel",
      ads: "Leuchtende Werbung"
    }
  },
  zh: {
    title: "Sun Sun",
    subtitle: "跨越语言障碍的光芒四射内容",
    cta: "点亮您的体验",
    featuredTitle: "热门光芒",
    contentTypes: {
      fiction: "阳光小说",
      news: "黎明新闻",
      blogs: "阳光博客",
      articles: "光芒文章",
      ads: "闪耀广告"
    }
  },
  hi: {
    title: "सन सन",
    subtitle: "भाषाओं के पार चमकने वाली सामग्री",
    cta: "अपने अनुभव को उज्जवल करें",
    featuredTitle: "ट्रेंडिंग किरणें",
    contentTypes: {
      fiction: "सूर्यकिरण कथा",
      news: "प्रभात समाचार",
      blogs: "सुनहरे ब्लॉग",
      articles: "तेजस्वी लेख",
      ads: "चमकते विज्ञापन"
    }
  },
  bn: {
    title: "সান সান",
    subtitle: "ভাষার মাধ্যমে আলোকিত বিষয়বস্তু",
    cta: "আপনার অভিজ্ঞতা উজ্জ্বল করুন",
    featuredTitle: "ট্রেন্ডিং রশ্মি",
    contentTypes: {
      fiction: "সূর্যরশ্মি কাহিনী",
      news: "ভোরের সংবাদ",
      blogs: "রৌদ্রোজ্জ্বল ব্লগ",
      articles: "উজ্জ্বল প্রবন্ধ",
      ads: "দীপ্তিমান বিজ্ঞাপন"
    }
  },
  ta: {
    title: "சன் சன்",
    subtitle: "மொழிகளைக் கடந்து ஒளிரும் உள்ளடக்கம்",
    cta: "உங்கள் அனுபவத்தை ஒளிரச் செய்யுங்கள்",
    featuredTitle: "டிரெண்டிங் கதிர்கள்",
    contentTypes: {
      fiction: "சூரியக்கதிர் புனைகதை",
      news: "விடியல் செய்திகள்",
      blogs: "சூரிய வலைப்பதிவுகள்",
      articles: "ஒளிரும் கட்டுரைகள்",
      ads: "பிரகாசமன விளம்பரங்கள்"
    }
  },
}

const featuredContent = {
  fiction: [
    { title: "The Polyglot's Dawn", language: "English", author: "Emma Sunwriter" },
    { title: "Ecos de un Amanecer", language: "Español", author: "Carlos Solaris" },
    { title: "Les Rayons du Destin", language: "Français", author: "Marie Lumière" },
    { title: "भाषाओं का सूर्योदय", language: "हिन्दी", author: "अमित प्रकाश" },
    { title: "ভাষার আলোকময় যাত্রা", language: "বাংলা", author: "দীপা রায়" },
    { title: "மொழிகளின் சூரியோதயம்", language: "தமிழ்", author: "கவி ஒளி" },
  ],
  news: [
    { title: "Global Language AI: The Sunrise of Communication", language: "English", source: "World Tech Glow" },
    { title: "La revolución energética: Un amanecer de innovación", language: "Español", source: "El Futuro Brillante" },
    { title: "Sommet sur la diversité linguistique: Une aurore culturelle", language: "Français", source: "Le Globe Rayonnant" },
    { title: "भाषा तकनीक: संचार का नया सवेरा", language: "हिन्दी", source: "तकनीकी उदय" },
    { title: "ভাষা বৈচিত্র্য: একটি নতুন সকালের সূচনা", language: "বাংলা", source: "প্রযুক্তি আলো" },
    { title: "மொழி தொழில்நுட்பம்: தகவல் பரிமாற்றத்தின் புதிய காலை", language: "தமிழ்", source: "அறிவியல் ஒளி" },
  ],
  blogs: [
    { title: "Linguistic Sunspots: Hilarious Translation Fails", language: "English", author: "Lila Lightheart" },
    { title: "Sueños que brillan en varios idiomas", language: "Español", author: "Miguel Mentebrillante" },
    { title: "Voyage culinaire: Une explosion de saveurs ensoleillées", language: "Français", author: "Sophie Saveursoleil" },
    { title: "भाषाई यात्रा: विविधता में एकता की खोज", language: "हिन्दी", author: "रोशनी शर्मा" },
    { title: "ভাষার রঙিন দুনিয়া: এক ব্লগারের অভিজ্ঞতা", language: "বাংলা", author: "আলো মিত্র" },
    { title: "மொழிகளின் வண்ண உலகம்: ரு பயககிப��பு", language: "தமிழ்", author: "ஒளி குமார்" },
  ],
  articles: [
    { title: "The Neuroscience of Multilingual Illumination", language: "English", publication: "Brain & Language Glow Journal" },
    { title: "IA y creatividad: Una combinación radiante", language: "Español", publication: "Letras Luminosas" },
    { title: "L'impact économique du multilinguisme: Un rayonnement mondial", language: "Français", publication: "Économie Éclatante" },
    { title: "बहुभाषिकता का महत्व: एक वैश्विक परिप्रेक्ष्य", language: "हिन्दी", publication: "भाषा विज्ञान प्रकाश" },
    { title: "বহুভাষিকতার শক্তি: একটি আন্তর্জাতিক দৃষ্টিকোণ", language: "বাংলা", publication: "ভাষা বিজ্ঞান আলো" },
    { title: "பன்மொழித் திறனின் முக்கியத்துவம்: ஒரு உலகளாவிய பார்வை", language: "தமிழ்", publication: "மொழியியல் ஒளி" },
  ],
  ads: [
    { title: "LinguaGlow Pro: Illuminate Language Barriers!", language: "English", brand: "LinguaGlow" },
    { title: "¡Ilumina tu cocina con sabores globales!", language: "Español", brand: "Sun Gourmet Box" },
    { title: "Faites briller vos horizons linguistiques!", language: "Français", brand: "SunLingua Mobile" },
    { title: "भाषा सेतु: दुनिया से जुड़ें, अपनी भाषा में!", language: "हिन्दी", brand: "लिंगुआ ब्रिज" },
    { title: "ভাষার আলো: বিশ্বের সাথে যোগাযোগের সেতু!", language: "বাংলা", brand: "লিঙ্গুয়া কানেক্ট" },
    { title: "மொழி ஒளி: உலகத்துடன் இணையுங்கள்!", language: "தமிழ்", brand: "லிங்குவா லிங்க்" },
  ],
}

const handleLanguageChange = (value: string) => {
  if (isContentLanguage(value)) {
    setCurrentLang(value);
  }
};

// Add this type guard function
function isContentLanguage(value: string): value is ContentLanguages {
  return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'bn', 'ta'].includes(value);
}

export function SunSunLandingComponent() {
  const [currentLang, _setCurrentLang] = useState<ContentLanguages>('en')

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 to-white text-gray-800 font-sans">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-yellow-200 bg-indigo-600">
        <a className="flex items-center justify-center" href="#">
          <Sun className="h-8 w-8 text-yellow-400" />
          <span className="ml-2 text-2xl font-bold text-white">Sun Sun</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Select value={currentLang} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-white text-indigo-600 border-indigo-300">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-white text-indigo-600 border-indigo-300">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-black">
                {content[currentLang].title}
              </h1>
              <p className="mx-auto max-w-[700px] text-xl md:text-2xl text-black">
                {content[currentLang].subtitle}
              </p>
              <Button size="lg" className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700 text-lg px-8 py-3">
                {content[currentLang].cta}
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-indigo-600">
              {content[currentLang].featuredTitle}
            </h2>
            <Tabs defaultValue="fiction" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-indigo-50 rounded-lg mb-8">
                {Object.entries(content[currentLang].contentTypes).map(([key, value]) => (
                  <TabsTrigger key={key} value={key} className="text-indigo-600 data-[state=active]:bg-yellow-400 data-[state=active]:text-indigo-900 text-sm md:text-base">
                    {value}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(featuredContent).map(([key, items]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                      <Card key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-indigo-600 text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-indigo-700">{item.language}</p>
                          <p className="text-sm text-indigo-800 mt-2">{item.author || item.source || item.publication || item.brand}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-indigo-50 to-sky-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-white border-yellow-200 shadow-lg">
                <CardHeader>
                  <BookOpen className="h-12 w-12 mb-4 text-yellow-500" />
                  <CardTitle className="text-indigo-600 text-2xl">Radiant Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 text-base">Immerse yourself in illuminating fiction, daybreak news, sunny blogs, radiant articles, and glowing ads all on one brilliant platform.</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-yellow-200 shadow-lg">
                <CardHeader>
                  <Globe className="h-12 w-12 mb-4 text-orange-500" />
                  <CardTitle className="text-indigo-600 text-2xl">Global Illumination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 text-base">Experience enlightening shifts in perspective with our curated blend of international viewpoints and cultural insights that shine across borders.</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-yellow-200 shadow-lg">
                <CardHeader>
                  <Megaphone className="h-12 w-12 mb-4 text-red-400" />
                  <CardTitle className="text-indigo-600 text-2xl">Sunbeams: Worldwide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 text-base">Illuminate language barriers and connect with a global audience through our multilingual platform, spreading light one story at a time.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-yellow-200 bg-indigo-600 text-white">
        <p className="text-xs">
          © 2023 Sun Sun. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm hover:underline underline-offset-4 text-yellow-200 hover:text-yellow-100" href="#">
            Terms of Service
          </a>
          <a className="text-sm hover:underline underline-offset-4 text-yellow-200 hover:text-yellow-100" href="#">
            Privacy Policy
          </a>
          <a className="text-sm hover:underline underline-offset-4 text-yellow-200 hover:text-yellow-100" href="#">
            Content Guidelines
          </a>
        </nav>
      </footer>
    </div>
  )
}