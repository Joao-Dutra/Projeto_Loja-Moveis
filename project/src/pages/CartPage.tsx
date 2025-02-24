import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2 } from 'lucide-react';
import { fetchProdutoById } from '../data/apiService';

export function CartPage() {
  const { items, removeItem, updateQuantity, total, updateAssemblyOption } = useCartStore();
  const [stockMap, setStockMap] = useState<{ [key: string]: number }>({});

  // Função para carregar o estoque de cada item no carrinho
  useEffect(() => {
    const loadStock = async () => {
      const stockData: { [key: string]: number } = {};
      await Promise.all(
        items.map(async (item) => {
          try {
            const product = await fetchProdutoById(item.id.toString());
            const variation = product.variacoes.find(
              (v: any) =>
                v.cor === item.selectedColor &&
                v.tamanho === item.selectedSize &&
                v.material === item.selectedMaterial
            );
            if (variation) {
              stockData[item.id] = variation.estoque;
            } else {
              stockData[item.id] = 0;
            }
          } catch (error) {
            console.error('Erro ao buscar estoque:', error);
            stockData[item.id] = 0;
          }
        })
      );
      setStockMap(stockData);
    };

    loadStock();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio.</h2>
        <Link
          to="/shop"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          Continue comprando!
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Carrinho</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const maxQuantity = stockMap[item.id] || 1;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border"
            >
              <img
                src={item.image ? `http://localhost:8080${item.image}` : '/images/placeholder.jpg'}
                alt={item.name || 'Produto sem nome'}
                className="w-20 h-20 object-cover rounded"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.selectedColor} - {item.selectedSize}
                </p>
                <p className="text-sm text-gray-500">Material: {item.selectedMaterial}</p>

                {/* Seleção de Tipo de Montagem */}
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Montagem
                  </label>
                  <select
                    value={item.assemblyOption}
                    onChange={(e) => updateAssemblyOption(String(item.id), e.target.value)}
                    className="w-32 h-8 text-sm font-semibold border border-gray-300 rounded bg-gray-900 text-white px-2"
                  >
                    <option value="Desmontado">Desmontado</option>
                    <option value="Pré Montado">Pré Montado</option>
                    <option value="No Local">No Local</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(String(item.id), Number(e.target.value))}
                  className="w-16 h-8 rounded-md border-gray-300 text-sm"
                >
                  {Array.from({ length: maxQuantity }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(String(item.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <div>
          <p className="text-lg font-semibold">Total: ${total().toFixed(2)}</p>
          <p className="text-sm text-gray-500">Ou 12x de R${(total() / 12).toFixed(2)}</p>
        </div>
        <Link
          to="https://mpago.la/2T4CM4L"
          className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          Ir para o Checkout
        </Link>
      </div>
    </div>
  );
}
