import React from 'react';
import { CheckoutForm } from '../components/CheckoutForm';

export function CheckoutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}