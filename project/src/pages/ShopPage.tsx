// ShopPage.tsx
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
    category: decodeURIComponent(searchParams.get('category') || ''),
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

  useEffect(() => {
    const category = decodeURIComponent(searchParams.get('category') || '');
    setSelectedFilters((prev) => ({ ...prev, category }));
  }, [searchParams]);

  const handleFilterChange = (filterType: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedFilters.category || product.categoria?.toLowerCase().includes(selectedFilters.category.toLowerCase())) &&
      (!selectedFilters.color || product.variacoes?.some((v: any) => v.cor?.toLowerCase() === selectedFilters.color.toLowerCase())) &&
      (!selectedFilters.size || product.variacoes?.some((v: any) => v.tamanho?.toLowerCase() === selectedFilters.size.toLowerCase())) &&
      (!selectedFilters.material || product.variacoes?.some((v: any) => v.material?.toLowerCase() === selectedFilters.material.toLowerCase())) &&
      (!selectedFilters.style || product.estilo?.toLowerCase() === selectedFilters.style.toLowerCase()) &&
      (!selectedFilters.priceRange || product.variacoes?.some((v: any) => {
        const price = Number(v.preco);
        switch (selectedFilters.priceRange) {
          case 'Abaixo de R$300': return price < 300;
          case 'R$300 - R$599': return price >= 300 && price <= 599;
          case 'R$600 - R$999': return price >= 600 && price <= 999;
          case 'R$1000 - R$1499': return price >= 1000 && price <= 1499;
          case 'R$1500+': return price >= 1500;
          default: return true;
        }
      }))
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Loja de Móveis</h1>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <ProductFilters
            categories={['Sala de Estar', 'Quarto', 'Sala de Jantar', 'Escritório', 'Quintal']}
            colors={['Cinza', 'Marrom', 'Branco', 'Bege', 'Natural']}
            sizes={['Pequeno', 'Médio', 'Grande']}
            materials={['Madeira', 'Madeira Maciça', 'Madeira Nobre', 'Tecido']}
            styles={['Moderno', 'Clássico', 'Rústico']}
            priceRanges={[
              { min: 0, max: 299.99, label: 'Abaixo de R$300' },
              { min: 300, max: 599.99, label: 'R$300 - R$599' },
              { min: 600, max: 999.99, label: 'R$600 - R$999' },
              { min: 1000, max: 1499.99, label: 'R$1000 - R$1499' },
              { min: 1500, max: Infinity, label: 'R$1500+' }
            ]}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
