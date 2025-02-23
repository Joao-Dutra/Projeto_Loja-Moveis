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
  priceRange: string;
  inStock: boolean;
}

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    category: searchParams.get('category') || '',
    color: '',
    size: '',
    material: '',
    priceRange: '',
    inStock: false,
  });

  const priceRanges = [
    { min: 0, max: 299.99, label: 'Menos R$300' },
    { min: 300, max: 599.99, label: 'R$300 - R$599' },
    { min: 600, max: 999.99, label: 'R$600 - R$999' },
    { min: 1000, max: 1499.99, label: 'R$1000 - R$1499' },
    { min: 1500, max: Infinity, label: 'R$1500+' },
  ];

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const data = await fetchProdutos();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    loadProdutos();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedFilters.category) {
      filtered = filtered.filter(
        (product) => product.category === selectedFilters.category
      );
    }
    if (selectedFilters.color) {
      filtered = filtered.filter(
        (product) => product.color === selectedFilters.color
      );
    }
    if (selectedFilters.size) {
      filtered = filtered.filter(
        (product) => product.tamanho === selectedFilters.size
      );
    }
    if (selectedFilters.material) {
      filtered = filtered.filter(
        (product) => product.material === selectedFilters.material
      );
    }
    if (selectedFilters.priceRange) {
      const range = priceRanges.find(
        (r) => r.label === selectedFilters.priceRange
      );
      if (range) {
        filtered = filtered.filter(
          (product) =>
            product.price >= range.min && product.price < range.max
        );
      }
    }
    if (selectedFilters.inStock) {
      filtered = filtered.filter((product) => product.estoque > 0);
    }

    setFilteredProducts(filtered);
  }, [selectedFilters, products, priceRanges]);

  const handleFilterChange = (
    filterType: keyof SelectedFilters,
    value: string | boolean
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: '',
      color: '',
      size: '',
      material: '',
      priceRange: '',
      inStock: false,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Shop Furniture</h1>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <ProductFilters
            categories={[
              'Sala de Estar',
              'Cadeira',
              'Mesa',
              'Poltrona',
              'Cama',
              'Guarda-Roupa',
            ]}
            colors={[
              'Vermelho',
              'Azul',
              'Verde',
              'Amarelo',
              'Preto',
              'Branco',
              'Cinza',
            ]}
            sizes={['Pequeno', 'Médio', 'Grande']}
            materials={['Madeira', 'Metal']}
            priceRanges={priceRanges}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
          />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Nenhum produto encontrado com os filtros aplicados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
