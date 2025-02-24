// src/pages/CartPage.tsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2 } from 'lucide-react';

export function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

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
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <img
              src={`http://localhost:8080${item.image || '/images/placeholder.jpg'}`}
              alt={item.name || 'Produto sem nome'} // Alterado de item.nome para item.name
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3> {/* Alterado de item.nome para item.name */}
              <p className="text-sm text-gray-500">
                {item.selectedColor} - {item.selectedSize}
              </p>
              <p className="text-sm text-gray-500">
                Material: {item.selectedMaterial}
              </p>
              <p className="text-sm text-gray-500">
                Montagem: {item.assemblyOption}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(String(item.id), Number(e.target.value))
                }
                className="rounded-md border-gray-300 shadow-sm"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)} {/* Alterado para usar item.price */}
              </p>
              <button
                onClick={() => removeItem(String(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <div>
          <p className="text-lg font-semibold">Total: ${total().toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            Ou 12x de R${(total() / 12).toFixed(2)}
          </p>
        </div>
        <Link
          to="/checkout"
          className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          Ir para o Checkout
        </Link>
      </div>
    </div>
  );
}
