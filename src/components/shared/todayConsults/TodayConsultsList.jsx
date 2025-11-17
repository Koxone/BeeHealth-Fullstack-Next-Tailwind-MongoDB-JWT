'use client';
import React, { useState, useMemo, useEffect } from 'react';
import SearchAddBar from './SearchAddBar';
import ConsultsTable from './ConsultsTable';
import ConsultationsMobile from './ConsultationsMobile';
import EmptyState from './EmptyState';
import EmployeeDeleteConsultModal from '@/components/sections/employee/consultations/components/modals/employeeDeleteConsultModal/EmployeeDeleteConsultModal';
import { FileText, Edit2, Trash2, AlertCircle } from 'lucide-react';
import {
  filterConsults,
  openCreate,
  openEdit,
  askDelete,
  handleCreateAction,
  handleUpdateAction,
  handleDeleteAction,
  todayISO,
} from './utils/helpers';

// Modals
import EmployeeCreateConsultModal from '@/components/sections/employee/consultations/components/modals/employeeCreateConsultModal/EmployeeCreateConsultModal';
import EmployeeEditConsultModal from '@/components/sections/employee/consultations/components/modals/employeeEditConsultModal/EmployeeEditConsultModal';

export default function TodayConsultsList({ totals, consultsData }) {
  const [consults, setConsults] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter consultas based on search term
  useEffect(() => {
    setConsults(consultsData);
  }, [consultsData]);

  const filteredConsults = useMemo(
    () => filterConsults(consults, searchTerm),
    [consults, searchTerm]
  );

  const handleCreate = (form) => {
    handleCreateAction(form, todayISO, setConsults, setShowModal);
  };

  const handleUpdate = (form) => {
    handleUpdateAction(form, editingItem, setConsults, setShowModal, setEditingItem);
  };

  const handleDelete = () => {
    handleDeleteAction(itemToDelete, setConsults, setShowDeleteModal, setItemToDelete);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchAddBar
        value={searchTerm}
        onChange={setSearchTerm}
        onAdd={() => openCreate(setEditingItem, setShowModal)}
      />

      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
        <ConsultsTable
          rows={filteredConsults}
          totals={totals}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <ConsultationsMobile
          rows={filteredConsults}
          icons={{ Edit2, Trash2 }}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <EmptyState visible={filteredConsults.length === 0} icons={{ FileText }} />
      </div>

      {showModal && !editingItem && (
        <EmployeeCreateConsultModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}

      {showModal && editingItem && (
        <EmployeeEditConsultModal
          editingItem={editingItem}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <EmployeeDeleteConsultModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          icons={{ AlertCircle }}
        />
      )}
    </div>
  );
}
