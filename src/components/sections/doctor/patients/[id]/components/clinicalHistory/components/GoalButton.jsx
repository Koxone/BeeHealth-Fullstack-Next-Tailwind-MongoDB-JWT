import { Plus } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function GoalButton({ onClick }) {
  const { t } = useTranslation('clinicalRecords');

  return (
    <button
      onClick={onClick}
      className="bg-beehealth-green-secondary-dark hover:bg-beehealth-green-secondary-dark-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      {t('history.newGoal')}
    </button>
  );
}
