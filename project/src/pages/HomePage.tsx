import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HomeCategories } from '../components/HomeCategories';

export function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Modern living room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Bem Vindo a loja de imoveis Nossa Senhora das Graças</h1>
            <p className="text-xl mb-8">Fundada em 1989</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100"
            >
              Compre Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Escolha a categoria</h2>
        <HomeCategories />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Entrega grátis</h3>
              <p className="text-gray-600">Acima de R$1500</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
              Montagem especializada</h3>
              <p className="text-gray-600">Instalação profissional disponível</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
              Pagamento Flexível</h3>
              <p className="text-gray-600">Múltiplas opções de pagamento</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}