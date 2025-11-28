'use client';

import { useState, useEffect, useCallback } from 'react';
import ModalOverlay from './components/ModalOverlay';
import ModalContainer from './components/ModalContainer';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import QuestionnaireSection from './components/QuestionnaireSection';
import FooterActions from './components/FooterActions';
import { X, FileText, Stethoscope, ClipboardList } from 'lucide-react';
import useAuthStore from '@/zustand/useAuthStore';
import ShortVersion from './components/ShortVersion';

export default function DoctorClinicalRecordModal({
  onClose,
  onSaved,
  record,
  specialty,
  readOnly,
  patientId,
  mode = 'view',
}) {
  const { user } = useAuthStore();

  // Single source of truth
  const [answersDraft, setAnswersDraft] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(!!readOnly);
  const [activeTab, setActiveTab] = useState('basico');

  const isCreate = mode === 'create';

  const [form, setForm] = useState();

  useEffect(() => {
    const base = record?.answers ? { ...record.answers } : {};
    setAnswersDraft(base);
    setIsReadOnly(!!readOnly);
  }, [record, readOnly]);

  // Helpers
  const getAnswer = useCallback(
    (id) => {
      const v = answersDraft?.[id];
      return v ?? '';
    },
    [answersDraft]
  );

  const setAnswer = useCallback((id, value) => {
    setAnswersDraft((prev) => {
      if (prev?.[id] === value) return prev;
      return { ...(prev || {}), [id]: value };
    });
  }, []);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseBody = {
        doctor: user?.id || null,
        specialty: user?.specialty || record?.specialty || 'weight',
        version: record ? record.version || 'full' : 'full',
        answers: answersDraft,
      };

      let res;

      // Create New Record
      if (isCreate) {
        res = await fetch(`/api/clinical-records/${patientId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(baseBody),
        });
      } else {
        // Edit Patient Record
        res = await fetch(`/api/clinical-records/record/${record._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(baseBody),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al guardar el historial clínico');
      }

      await res.json();

      if (onSaved) onSaved();
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(error.message);
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />

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

        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          {/* Short Version */}
          {activeTab === 'basico' && (
            <ShortVersion specialty={specialty} record={record} isReadOnly={isReadOnly} />
          )}

          {/* Full Version */}
          {activeTab === 'completo' && (
            <QuestionnaireSection
              record={record}
              isReadOnly={isReadOnly}
              getAnswer={getAnswer}
              setAnswer={setAnswer}
              icons={{ ClipboardList }}
            />
          )}

          {!isReadOnly && (
            <FooterActions
              onCancel={onClose}
              submitLabel={isCreate ? 'Guardar nuevo registro' : 'Guardar cambios'}
            />
          )}
        </form>
      </ModalContainer>
    </>
  );
}
