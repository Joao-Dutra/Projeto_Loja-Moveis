import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import filtroIcon from './filtro.png';
import { colorMap } from '../types/constants';


interface FiltersProps {
  categories: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  styles: string[];
  priceRanges: { min: number; max: number; label: string }[];
  selectedFilters: {
    category: string;
    color: string;
    size: string;
    material: string;
    style: string;
    priceRange: string;
  };
  onFilterChange: (filterType: keyof FiltersProps['selectedFilters'], value: string) => void;
}

export function ProductFilters({
  categories,
  colors,
  sizes,
  materials,
  styles,
  priceRanges,
  selectedFilters,
  onFilterChange,
}: FiltersProps) {

  const handleClearFilters = () => {
    onFilterChange('category', '');
    onFilterChange('priceRange', '');
    onFilterChange('material', '');
    onFilterChange('style', '');
    onFilterChange('color', '');
    onFilterChange('size', '');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <button
          onClick={handleClearFilters}
          className="flex items-center text-blue-600 hover:underline"
        >
          <img
            src={filtroIcon}
            alt="Limpar Filtros"
            style={{ width: '28px', height: '28px' }}
          />

        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Categoria</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  checked={selectedFilters.category === category}
                  onChange={() => onFilterChange('category', category)}
                  className="h-4 w-4 text-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Faixa de Preço</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  checked={selectedFilters.priceRange === range.label}
                  onChange={() => onFilterChange('priceRange', range.label)}
                  className="h-4 w-4 text-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Material</h3>
          <select
            value={selectedFilters.material}
            onChange={(e) => onFilterChange('material', e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
          >
            <option value="">Todos os Materiais</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Cor</h3>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onFilterChange('color', color)}
                className={`h-8 w-8 rounded-full border ${selectedFilters.color === color
                    ? 'ring-2 ring-offset-2 ring-gray-500'
                    : ''
                  }`}
                style={{ backgroundColor: colorMap[color] || '#808080' }} // Usa o colorMap ou cinza como fallback
                title={color}
              />
            ))}
          </div>
        </div>


        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Tamanho</h3>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onFilterChange('size', size)}
                className={`px-4 py-2 text-sm rounded-md ${selectedFilters.size === size
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
