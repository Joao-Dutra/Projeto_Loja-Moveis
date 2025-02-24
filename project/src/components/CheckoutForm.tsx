import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import InputMask from 'react-input-mask';
import { PaymentInfo, DeliveryOption, CustomerInfo } from '../types';
import { createPedido } from '../data/apiService';

export function CheckoutForm() {
  const { items, total, clearCart } = useCartStore();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    installments: 1
  });
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>({
    type: 'pickup',
    date: '',
    timeSlot: ''
  });
  const [assemblyOption, setAssemblyOption] = useState<'self' | 'onsite' | 'disassemble'>('self');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (items.length === 0) {
        alert('O carrinho está vazio.');
        return;
      }

      const pedido = {
        usuarioId: 1, // Trocar pelo ID real do usuário
        total: total(),
        itens: items.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantity,
        })),
        customerInfo,
        paymentInfo,
        deliveryOption,
        assemblyOption
      };

      await createPedido(pedido);
      clearCart();
      alert('Pedido realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
      alert('Erro ao finalizar o pedido. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Informação do comprador</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Primeiro nome</label>
              <input
                type="text"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Segundo nome</label>
              <input
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <InputMask
                mask="(999) 999-9999"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Metodo de pagamento</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de pagamento</label>
              <select
                value={paymentInfo.method}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value as PaymentInfo['method'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="credit">Cartão de crédito</option>
                <option value="debit">Cartão de debito</option>
                <option value="pix">PIX</option>
                <option value="bank-transfer">Transferencia</option>
              </select>
            </div>

            {(paymentInfo.method === 'credit' || paymentInfo.method === 'debit') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <InputMask
                      mask="99/99"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <InputMask
                      mask="999"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                </div>
                {paymentInfo.method === 'credit' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Installments</label>
                    <select
                      value={paymentInfo.installments}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, installments: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}x of ${(total() / (i + 1)).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {paymentInfo.method === 'pix' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">PIX Key</label>
                <input
                  type="text"
                  value={paymentInfo.pixKey}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, pixKey: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
            )}

            {paymentInfo.method === 'bank-transfer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                  <input
                    type="text"
                    value={paymentInfo.bankAccount?.bank}
                    onChange={(e) => setPaymentInfo({
                      ...paymentInfo,
                      bankAccount: { ...paymentInfo.bankAccount, bank: e.target.value } as any
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Number</label>
                  <input
                    type="text"
                    value={paymentInfo.bankAccount?.accountNumber}
                    onChange={(e) => setPaymentInfo({
                      ...paymentInfo,
                      bankAccount: { ...paymentInfo.bankAccount, accountNumber: e.target.value } as any
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Routing Number</label>
                  <input
                    type="text"
                    value={paymentInfo.bankAccount?.routingNumber}
                    onChange={(e) => setPaymentInfo({
                      ...paymentInfo,
                      bankAccount: { ...paymentInfo.bankAccount, routingNumber: e.target.value } as any
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Method</label>
              <select
                value={deliveryOption.type}
                onChange={(e) => setDeliveryOption({
                  ...deliveryOption,
                  type: e.target.value as 'pickup' | 'delivery'
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="pickup">Pickup at Store</option>
                <option value="delivery">Home Delivery</option>
              </select>
            </div>

            {deliveryOption.type === 'delivery' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={customerInfo.state}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <InputMask
                    mask="99999-9999"
                    value={customerInfo.zipCode}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, zipCode: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Assembly Option</label>
              <select
                value={assemblyOption}
                onChange={(e) => setAssemblyOption(e.target.value as 'self' | 'onsite' | 'disassemble')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="self">Self Assembly</option>
                <option value="onsite">Assembly on Site</option>
                <option value="disassemble">Disassemble</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </form>
  );
}