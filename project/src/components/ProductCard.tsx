import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
          <img
            src={`http://localhost:8080${product.imagens?.[0]?.url || '/images/placeholder.jpg'}`}
            alt={product.nome || 'Produto sem nome'}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'http://localhost:8080/images/default-image.jpg'; // Imagem padrão em caso de erro
            }}
          />
        </div>
      </Link>
      <h3 className="text-lg font-bold mt-2 line-clamp-1">{product.nome}</h3>
      <p className="text-gray-600 line-clamp-2">{product.descricao}</p>
      <p className="text-xl font-semibold text-gray-900 mt-2">
        {product.variacoes?.[0]?.preco !== undefined
          ? `$${product.variacoes[0].preco.toFixed(2)}`
          : "Preço não disponível"}
      </p>
    </div>
  );
}
