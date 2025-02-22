import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { fetchProdutos } from '../data/apiService';

interface SelectedFilters {
  category: string;
  color: string;
  size: string;
  material: string;
  style: string;
  priceRange: string;
}

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    category: searchParams.get('category') || '',
    color: '',
    size: '',
    material: '',
    style: '',
    priceRange: ''
  });

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const data = await fetchProdutos();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    loadProdutos();
  }, []);

  const handleFilterChange = (filterType: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Shop Furniture</h1>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <ProductFilters
            categories={['Sofas', 'Chairs', 'Tables']}  // Substitua pelos seus valores reais
            colors={['Red', 'Blue', 'Green']}
            sizes={['Small', 'Medium', 'Large']}
            materials={['Wood', 'Metal', 'Fabric']}
            styles={['Modern', 'Classic', 'Rustic']}
            priceRanges={[
              { min: 0, max: 299.99, label: 'Under $300' },
              { min: 300, max: 599.99, label: '$300 - $599' },
              { min: 600, max: 999.99, label: '$600 - $999' },
              { min: 1000, max: 1499.99, label: '$1000 - $1499' },
              { min: 1500, max: Infinity, label: '$1500+' }
            ]}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
}
