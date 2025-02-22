import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

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
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
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
          <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
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
            <option value="">All Materials</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Style</h3>
          <select
            value={selectedFilters.style}
            onChange={(e) => onFilterChange('style', e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
          >
            <option value="">All Styles</option>
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onFilterChange('color', color)}
                className={`h-8 w-8 rounded-full border ${
                  selectedFilters.color === color
                    ? 'ring-2 ring-offset-2 ring-gray-500'
                    : ''
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onFilterChange('size', size)}
                className={`px-4 py-2 text-sm rounded-md ${
                  selectedFilters.size === size
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