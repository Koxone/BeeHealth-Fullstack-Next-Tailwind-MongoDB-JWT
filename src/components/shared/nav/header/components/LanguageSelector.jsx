'use client';

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import '@/lib/i18n'; // Ensure i18n is initialized

export default function LanguageSelector() {
  const { t, i18n } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentLang = i18n.language;

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 rounded-xl border-2 border-transparent p-2 transition-all duration-200 hover:border-blue-200 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 active:scale-95"
        title={t('language')}
      >
        <Globe className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
          {currentLang === 'es' ? 'ES' : 'EN'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 origin-top-right rounded-xl border border-gray-100 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => toggleLanguage('es')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                currentLang === 'es'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">🇪🇸</span>
              {t('languages.es')}
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                currentLang === 'en' || currentLang?.startsWith('en')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">🇺🇸</span>
              {t('languages.en')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
