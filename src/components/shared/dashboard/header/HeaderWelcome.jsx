'use client';

import { useTranslation } from 'react-i18next';

export default function HeaderWelcome({ role, fullName }) {
  const { t, i18n } = useTranslation('dashboard');
  
  const today = new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      {role === 'doctor' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {t('welcome.titleDoctor', { name: fullName })}
        </h1>
      )}
      {(role === 'patient' || role === 'employee') && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {t('welcome.title', { name: fullName })}
        </h1>
      )}
      <p className="text-sm text-gray-600 md:text-base capitalize">{today}</p>
    </div>
  );
}
