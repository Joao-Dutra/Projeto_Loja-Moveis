import React, { useState, useEffect } from 'react';
import { ProductFilters } from './ProductFilters';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface SelectedFilters {
  category: string;
  color: string;
  size: string;
  material: string;
  priceRange: string;
  inStock: boolean;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    category: '',
    color: '',
    size: '',
    material: '',
    priceRange: '',
    inStock: false,
  });

  // Geração dos filtros a partir dos produtos carregados
  const categories = Array.from(new Set(products.map(p => p.category)));
  const colors = Array.from(new Set(products.map(p => p.color)));
  const sizes = Array.from(new Set(products.map(p => p.tamanho))); // 'tamanho' conforme o banco
  const materials = Array.from(new Set(products.map(p => p.material)));
  const priceRanges = [
    { label: 'Até R$50', min: 0, max: 50 },
    { label: 'R$50 - R$100', min: 50, max: 100 },
    { label: 'Acima de R$100', min: 100, max: Infinity },
  ];

  // Carrega os produtos via API
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  // Aplica os filtros sempre que os produtos ou filtros selecionados mudam
  useEffect(() => {
    let filtered = products;

    if (selectedFilters.category) {
      filtered = filtered.filter(
        product => product.category === selectedFilters.category
      );
    }
    if (selectedFilters.color) {
      filtered = filtered.filter(
        product => product.color === selectedFilters.color
      );
    }
    if (selectedFilters.size) {
      filtered = filtered.filter(
        product => product.tamanho === selectedFilters.size
      );
    }
    if (selectedFilters.material) {
      filtered = filtered.filter(
        product => product.material === selectedFilters.material
      );
    }
    if (selectedFilters.priceRange) {
      const range = priceRanges.find(
        r => r.label === selectedFilters.priceRange
      );
      if (range) {
        filtered = filtered.filter(
          product =>
            product.price >= range.min && product.price < range.max
        );
      }
    }
    if (selectedFilters.inStock) {
      filtered = filtered.filter(
        product => product.stock > 0 // Use product.stock em vez de product.estoque
      );
    }
    
    setFilteredProducts(filtered);
    console.log('Filtros aplicados:', selectedFilters);
    console.log('Produtos filtrados:', filtered);
  }, [selectedFilters, products, priceRanges]);

  // Permite alternar (ativar/desativar) um filtro
  function handleFilterChange(
    filterType: keyof SelectedFilters,
    value: string | boolean
  ) {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  }

  // Função para limpar todos os filtros
  function clearAllFilters() {
    setSelectedFilters({
      category: '',
      color: '',
      size: '',
      material: '',
      priceRange: '',
      inStock: false,
    });
  }

  return (
    <div className="container mx-auto p-4">
      <ProductFilters
        categories={categories}
        colors={colors}
        sizes={sizes}
        materials={materials}
        priceRanges={priceRanges}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearAllFilters}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado com os filtros aplicados.</p>
        )}
      </div>
    </div>
  );
}
