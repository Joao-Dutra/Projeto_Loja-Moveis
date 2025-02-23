import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ShoppingCart, ChevronDown, Phone, MapPin } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CategoryMenu } from './CategoryMenu';

export function Header() {
  const cartItems = useCartStore((state) => state.items);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              (031) 123-4567
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Rua Marechal Floriano Peixoto, 207, São Sebastião 
            </span>
          </div>
          <div>Seg-Sex: 8:00-17:00 | Sáb: 08:00-12:00</div>
        </div>
      </div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-bold text-xl text-gray-800">
            My Father's Store
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">
              Shop
            </Link>

            <CategoryMenu />

            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>

            <Link 
              to="/cart" 
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}