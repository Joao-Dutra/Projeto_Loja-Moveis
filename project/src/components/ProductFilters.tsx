import React from 'react';
import filtroIcon from './filtro.png'; // Ajuste o caminho conforme necessário

interface FiltersProps {
  categories: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  priceRanges: { min: number; max: number; label: string }[];
  selectedFilters: {
    category: string;
    color: string;
    size: string;
    material: string;
    priceRange: string;
    inStock: boolean;
  };
  onFilterChange: (
    filterType: keyof FiltersProps['selectedFilters'],
    value: string | boolean
  ) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  categories,
  colors,
  sizes,
  materials,
  priceRanges,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* Cabeçalho com título e ícone para limpar filtros */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <div className="flex items-center cursor-pointer" onClick={onClearFilters}>
          <img
            src={filtroIcon}
            alt="Limpar Filtros"
            style={{ width: '28px', height: '28px' }}
          />
         
        </div>
      </div>

      {/* Filtro por Categoria (Radio padrão) */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Categoria</h3>
        <div className="space-y-2">
          {categories.map((categoria) => (
            <label key={categoria} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={categoria}
                checked={selectedFilters.category === categoria}
                onChange={() => onFilterChange('category', categoria)}
                className="h-4 w-4 text-gray-900"
              />
              <span className="ml-2 text-sm text-gray-700">{categoria}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtro por Faixa de Preço (Radio padrão) */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Faixa de Preço</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                checked={selectedFilters.priceRange === range.label}
                onChange={() => onFilterChange('priceRange', range.label)}
                className="h-4 w-4 text-gray-900"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtro por Material (Select) */}
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

      {/* Filtro por Cor (Botões) */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Cor</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onFilterChange('color', color)}
              className={`h-8 w-8 rounded-full border ${
                selectedFilters.color === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Filtro por Tamanho (Botões) */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Tamanho</h3>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onFilterChange('size', size)}
              className={`px-4 py-2 text-sm rounded-md ${
                selectedFilters.size === size ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro: Em estoque (Checkbox padrão) */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Em estoque</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedFilters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="h-4 w-4"
          />
          <span className="ml-2 text-sm text-gray-700">Somente produtos com estoque</span>
        </label>
      </div>
    </div>
  );
}
