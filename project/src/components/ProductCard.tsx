import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={`http://localhost:8080${product.images[0]}`} // URL completa do back-end
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'http://localhost:8080/images/default-image.jpg'; // Imagem padrão em caso de erro
          }}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
