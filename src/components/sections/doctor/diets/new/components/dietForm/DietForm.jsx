'use client';

import { useState } from 'react';
import BasicInfoSection from './components/BasicInfoSection';
import DescriptionSection from './components/DescriptionSection';
import AllowedLiquidsSection from './components/AllowedLiquidsSection';
import IngredientsSection from './components/IngredientsSection';
import NotesSection from './components/NotesSection';
import ImagesSection from './components/ImagesSection';
import { Check, FileText, CheckCircle, ShoppingBasket, Search } from 'lucide-react';
import InputText from './components/InputText';
import AllowedFoodsSection from './components/AllowedFoodsSection';
import ForbiddenFoodsSection from './components/ForbiddenFoodsSection';
import ForbiddenLiquidsSection from './components/ForbiddenLiquidsSection';

export default function DietForm() {
  const [ingredients, setIngredients] = useState(['']);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    description: '',
    benefits: '',
    instructions: '',
    ingredients: [''],
    allowedFoods: '',
    allowedFoodsNote: '',
    forbiddenFoods: '',
    forbiddenFoodsNote: '',
    allowedLiquids: '',
    allowedLiquidsNote: '',
    forbiddenLiquids: '',
    forbiddenLiquidsNote: '',
    notes: '',
    images: [],
  });

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages([...images, event.target?.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-full bg-linear-to-br from-gray-50 to-white">
      <form className="mx-auto max-w-5xl space-y-8 p-4 md:p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Crear Plan Nutricional
          </h1>
          <p className="text-gray-600">
            Completa los detalles del nuevo plan dietético para tus pacientes
          </p>
        </div>

        {/* Basic info section */}
        <BasicInfoSection formData={formData} />

        {/* Description section */}
        <InputText
          title="Descripción"
          Icon={FileText}
          placeholder="Escribe una descripción del plan nutricional"
        />

        {/* Benefits section */}
        <InputText
          title="Beneficios"
          Icon={CheckCircle}
          placeholder="Escribe los beneficios del plan nutricional"
        />

        {/* Instructions section */}
        <InputText
          title="Instrucciones"
          Icon={Search}
          placeholder="Escribe las instrucciones del plan nutricional"
        />

        {/* Ingredients - Optional */}
        <IngredientsSection />

        {/* Allowed Foods */}
        <AllowedFoodsSection />

        {/* Allowed Liquids */}
        <AllowedLiquidsSection />

        {/* Forbidden Foods */}
        <ForbiddenFoodsSection />

        {/* Forbidden Liquids */}
        <ForbiddenLiquidsSection />

        {/* Medical Notes */}
        <NotesSection />

        {/* Images - Optional */}
        <ImagesSection
          images={images}
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
        />

        {/* Actions */}
        <div className="flex flex-col gap-4 pb-8 sm:flex-row">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <Check className="h-5 w-5" />
            Crear Plan Dietético
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
