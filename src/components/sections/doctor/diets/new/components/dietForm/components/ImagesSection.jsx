import { ImageIcon } from 'lucide-react';
import React, { useState } from 'react';

function ImagesSection() {
  const [images, setImages] = useState([]);

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
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-pink-600"></div>
        Imágenes
        <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
          <input
            type="file"
            accept="image/*"
            onChange={handleAddImage}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center gap-2">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Haz clic para subir imágenes</span>
            <span className="text-xs text-gray-500">PNG, JPG o GIF (máx. 5MB)</span>
          </label>
        </div>

        {/* Images preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image, index) => (
              <div key={index} className="group relative">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ImagesSection;
