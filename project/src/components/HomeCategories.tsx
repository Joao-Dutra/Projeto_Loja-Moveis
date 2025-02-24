import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Sala de Estar',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    description: 'Crie o seu espaço de vida perfeito',
    filter: 'Sala de Estar'
  },
  {
    name: 'Quarto',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
    description: 'Descanse com estilo e conforto',
    filter: 'Quarto'
  },
  {
    name: 'Sala de Jantar',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
    description: 'Reúna-se com elegância',
    filter: 'Sala de Jantar'
  },
  {
    name: 'Escritório',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
    description: 'Soluções profissionais para espaços de trabalho',
    filter: 'Escritório'
  },
  {
    name: 'Quintal',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
    description: 'Desfrute do ar livre com estilo',
    filter: 'Quintal'
  }
];

export function HomeCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (filter: string) => {
    navigate(`/shop?category=${encodeURIComponent(filter)}`);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => handleCategoryClick(category.filter)}
          className="cursor-pointer group"
        >
          <div className="relative h-64 overflow-hidden rounded-lg">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
