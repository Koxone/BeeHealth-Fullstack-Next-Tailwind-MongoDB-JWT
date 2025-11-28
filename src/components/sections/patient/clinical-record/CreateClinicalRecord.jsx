'use client';

import { useMemo, useState, useCallback, memo } from 'react';
import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/useGetAllQuestions';

// Inputs to render
import Text from './components/inputs/Text';
import Number from './components/inputs/Number';
import Date from './components/inputs/Date';
import Select from './components/inputs/Select';
import Radio from './components/inputs/Radio';

export default function CreateClinicalRecord({ currentUser }) {
  // Local States
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('weight');

  // Fetch all questions
  const { questions } = useGetAllQuestions();

  // Active Questions filter by active tab
  const activeQuestions = useMemo(() => {
    const list = questions || [];
    const filtered = list
      .filter((q) => {
        return q.specialty === activeTab && q.version === 'full';
      })
      .sort((a, b) => a.questionId - b.questionId);
    return filtered;
  }, [questions, activeTab]);

  // setter
  const handleChange = useCallback((id, val) => {
    setFormData((prev) => {
      if (prev[id] === val) return prev;
      return { ...prev, [id]: val };
    });
  }, []);

  // Render helper
  const QuestionComponents = {
    text: Text,
    date: Date,
    number: Number,
    select: Select,
    radio: Radio,
  };

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Crea tu primer Historial Clinico
          </h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* card */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form className="grid grid-cols-2 items-center space-x-4 p-4 md:p-8">
            {/* Fields to render */}
            {activeQuestions?.map((question) => {
              const Component = QuestionComponents[question.type];
              if (!Component) return null;

              return (
                <Component
                  key={question?._id}
                  question={question?.text}
                  value={formData[question?._id] || ''}
                  onChange={(val) => handleChange(question?._id, val)}
                  options={question?.options}
                />
              );
            })}

            {/* Actions */}
            <ActionButtons activeTab={activeTab} />
          </form>
        </div>

        {/* progress */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

// Filter questions by type
//   const questionsByType = useMemo(() => {
//     const result = {};
//     activeQuestions.forEach((q) => {
//       if (!result[q.type]) {
//         result[q.type] = [];
//       }
//       result[q.type].push(q);
//     });
//     return result;
//   }, [activeQuestions]);
