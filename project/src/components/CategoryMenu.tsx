import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Quarto',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'Sala de Jantar',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
  },
  {
    name: 'Escritório',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'Quintal',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
  },
];

export function CategoryMenu() {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center text-gray-600 hover:text-gray-900">
        Categorias
        <ChevronDown className="ml-1 h-4 w-4" />
      </Menu.Button>
      <Menu.Items className="absolute z-10 mt-2 w-96 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="grid grid-cols-2 gap-2 p-4">
          {categories.map((category) => (
            <Menu.Item key={category.name}>
              {({ active }) => (
                <div
                  onClick={() => navigate(`/shop?category=${category.name}`)}
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } cursor-pointer rounded-lg overflow-hidden`}
                >
                  <div className="relative h-32">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {category.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}