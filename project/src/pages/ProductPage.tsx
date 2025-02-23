import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { fetchProdutoById } from "../data/apiService";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProdutoById(id).then((prod) => {
        setProduct(prod);
      });
    }
  }, [id]);

  // Quando o produto for carregado, seta as opções de cor e tamanho (se existirem) automaticamente.
  useEffect(() => {
    if (product) {
      if (product.color) {
        setSelectedColor(product.color);
      }
      if (product.tamanho) {
        setSelectedSize(product.tamanho);
      }
    }
  }, [product]);

  if (!product) {
    return <div>Carregando produto...</div>;
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Selecione uma cor e um tamanho.");
      return;
    }

    addItem({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
      assemblyOption: "self",
    });

    navigate("/cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div>
        <img
          src={`http://localhost:8080${product.imagens}`}
          alt={product.name}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-gray-900 mb-4">
          ${product.price.toFixed(2)}
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Cor</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Selecione uma cor</option>
            {product.color && (
              <option value={product.color}>{product.color}</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Tamanho</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Selecione um tamanho</option>
            {product.tamanho && (
              <option value={product.tamanho}>{product.tamanho}</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
