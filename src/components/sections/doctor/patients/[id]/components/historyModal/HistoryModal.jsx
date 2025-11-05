'use client';

import { useState } from 'react';
import ModalOverlay from './components/ModalOverlay';
import ModalContainer from './components/ModalContainer';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import BasicInfoSection from './components/BasicInfoSection';
import VitalsSection from './components/VitalsSection';
import DiagnosisSection from './components/DiagnosisSection';
import QuestionnaireSection from './components/QuestionnaireSection';
import FooterActions from './components/FooterActions';

export default function HistoryModal({ onClose, icons }) {
  // Form state
  const [form, setForm] = useState({
    recordDate: new Date().toISOString().split('T')[0],
    currentWeight: '',
    iMC: '',
    bloodPressure: '',
    glucose: '',
    colesterol: '',
    notes: '',
    diagnosis: '',
    treatment: '',
  });

  // Mode state
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);

  // Record open handler
  const openRecord = (record, readOnly) => {
    setIsReadOnly(readOnly);
    setEditingHistory(record);
    if (record) {
      setForm({
        recordDate: record.recordDateRegistro?.split('T')[0] || '',
        currentWeight: record.currentWeight || '',
        iMC: record.IMC || '',
        bloodPressure: record.bloodPressure || '',
        glucose: record.glucose || '',
        colesterol: record.colesterol || '',
        notes: record.notes || '',
        diagnosis: record.diagnosis || '',
        treatment: record.treatment || '',
      });
    } else {
      setForm({
        recordDate: new Date().toISOString().split('T')[0],
        currentWeight: '',
        iMC: '',
        bloodPressure: '',
        glucose: '',
        colesterol: '',
        notes: '',
        diagnosis: '',
        treatment: '',
      });
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(editingHistory ? 'Historial actualizado (mock)' : 'Historial creado (mock)');
    onClose();
  };

  // Tabs
  const [activeTab, setActiveTab] = useState('basico');

  // Icons
  const { X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope, ClipboardList } = icons;

  return (
    <>
      {/* Overlay */}
      <ModalOverlay onClick={onClose} />

      {/* Container */}
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <ModalHeader
          title={editingHistory ? 'Editar Historial Clínico' : 'Nuevo Historial Clínico'}
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Tabs */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          {activeTab === 'basico' && (
            <div className="space-y-6">
              {/* Basic */}
              <BasicInfoSection
                form={form}
                setForm={setForm}
                isReadOnly={isReadOnly}
                icons={{ CalendarIcon, Scale, Heart }}
              />

              {/* Vitals */}
              <VitalsSection
                form={form}
                setForm={setForm}
                isReadOnly={isReadOnly}
                icons={{ Activity }}
              />

              {/* Diagnosis */}
              <DiagnosisSection
                form={form}
                setForm={setForm}
                isReadOnly={isReadOnly}
                icons={{ Stethoscope }}
              />
            </div>
          )}

          {activeTab === 'completo' && (
            <QuestionnaireSection isReadOnly={isReadOnly} icons={{ ClipboardList }} />
          )}

          {!isReadOnly && (
            <FooterActions
              onCancel={onClose}
              submitLabel={editingHistory ? 'Actualizar Registro' : 'Guardar Registro'}
            />
          )}
        </form>
      </ModalContainer>
    </>
  );
}
