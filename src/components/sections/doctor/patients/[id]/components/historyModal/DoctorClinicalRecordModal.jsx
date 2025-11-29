'use client';

import { useState, useEffect } from 'react';
import ModalContainer from './components/ModalContainer';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import FooterActions from './components/FooterActions';
import { X, FileText, CalendarIcon, Search } from 'lucide-react';
import ShortVersion from './components/ShortVersion';
import FullVersion from './components/FullVersion';
import { useModalClose } from '@/hooks/useModalClose';
import { useCreateClinicalRecordDoctor } from '@/hooks/clinicalRecords/useCreateClinicalRecordDoctor';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/useGetAllQuestions';

export default function DoctorClinicalRecordModal({
  onClose,
  record,
  specialty,
  readOnly,
  patientId,
  mode = 'view',
}) {
  // Single source of truth
  const [isReadOnly, setIsReadOnly] = useState(!!readOnly);
  const [activeTab, setActiveTab] = useState('basico');

  // Close Modal Handler
  const { handleOverlayClick } = useModalClose(onClose);

  const isCreate = mode === 'create';

  const [formData, setFormData] = useState({
    1: '',
    6: '',
    7: '',
    8: '',
    18: '',
    19: '',
    122: '',
    123: '',
    125: '',
    126: '',
    133: '',
    148: '',
    149: '',
  });

  useEffect(() => {
    if (record?.answers) {
      const initial = {};
      record.answers.forEach((ans) => {
        initial[ans.question?.questionId] = ans.value || '';
      });
      setFormData(initial);
    }
  }, [record]);

  const { submit, isSubmitting, error } = useCreateClinicalRecordDoctor();
  const { questions } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'short' && q.specialty === specialty);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = Object.entries(formData).map(([questionId, value]) => {
      const question = filtered?.find((q) => q.questionId === parseInt(questionId));
      return {
        questionId: question?._id,
        value,
      };
    });
    const result = await submit({
      patientId,
      specialty,
      version: 'short',
      answers,
    });
    if (result.ok) {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader
          title={
            record
              ? isReadOnly
                ? 'Ver Historial Clínico'
                : isCreate
                  ? 'Nuevo Historial Clínico'
                  : 'Editar Historial Clínico'
              : 'Nuevo Historial Clínico'
          }
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Search className="h-5 w-5 text-blue-600" />
            Dietas y ejercicios asignados a este paciente:
          </h3>
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          {/* Short Version */}
          {activeTab === 'basico' && (
            <ShortVersion
              specialty={specialty}
              isReadOnly={isReadOnly}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* Full Version */}
          {activeTab === 'completo' && (
            <FullVersion
              specialty={specialty}
              isReadOnly={isReadOnly}
              formData={formData}
              setFormData={setFormData}
              patientId={patientId}
            />
          )}

          {!isReadOnly && activeTab === 'basico' && (
            <FooterActions
              onCancel={onClose}
              submitLabel={isCreate ? 'Guardar nuevo registro' : 'Guardar cambios'}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </ModalContainer>
    </div>
  );
}
