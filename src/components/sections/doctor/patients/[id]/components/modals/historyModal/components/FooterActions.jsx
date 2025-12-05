'use client';
import { useTranslation } from 'react-i18next';

export default function FooterActions({ onCancel, submitLabel, isSubmitting }) {
  const { t } = useTranslation('clinicalRecords');

  return (
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition active:scale-95 disabled:opacity-50"
      >
        {t('modal.cancel')}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-beehealth-blue-primary-solid flex-1 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50"
      >
        {isSubmitting ? t('modal.saving') : submitLabel}
      </button>
    </div>
  );
}
