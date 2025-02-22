import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern Leather Sofa',
    description: 'Elegant leather sofa with clean lines and premium comfort. Features high-resilience foam cushions and solid wood frame.',
    price: 1299.99,
    category: 'Living Room',
    colors: ['Black', 'Brown', 'White', 'Tan'],
    sizes: ['3-Seater', '2-Seater', 'Sectional'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'
    ],
    stock: 10,
    material: 'Leather',
    style: 'Modern'
  },
  {
    id: '2',
    name: 'Queen Platform Bed',
    description: 'Contemporary platform bed with wooden frame and upholstered headboard. Includes under-bed storage.',
    price: 899.99,
    category: 'Bedroom',
    colors: ['Natural', 'Walnut', 'White', 'Gray'],
    sizes: ['Queen', 'King', 'California King'],
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'
    ],
    stock: 8,
    material: 'Wood',
    style: 'Contemporary'
  },
  {
    id: '3',
    name: 'Executive Desk',
    description: 'Spacious executive desk with built-in storage and cable management system.',
    price: 749.99,
    category: 'Office',
    colors: ['Black', 'Oak', 'Mahogany'],
    sizes: ['Standard', 'Large'],
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'
    ],
    stock: 5,
    material: 'Wood',
    style: 'Traditional'
  },
  {
    id: '4',
    name: 'Velvet Dining Chairs',
    description: 'Luxurious velvet dining chairs with gold-finished steel legs. Sold in sets of two.',
    price: 399.99,
    category: 'Dining Room',
    colors: ['Emerald', 'Navy', 'Blush', 'Gray'],
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    ],
    stock: 12,
    material: 'Velvet',
    style: 'Luxury'
  },
  {
    id: '5',
    name: 'Outdoor Lounge Set',
    description: 'Weather-resistant wicker lounge set including sofa, two chairs, and coffee table.',
    price: 1599.99,
    category: 'Outdoor',
    colors: ['Brown', 'Gray', 'Black'],
    sizes: ['4-Piece', '6-Piece'],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    ],
    stock: 4,
    material: 'Wicker',
    style: 'Contemporary'
  },
  {
    id: '6',
    name: 'Storage Ottoman',
    description: 'Multifunctional ottoman with hidden storage space and tufted top.',
    price: 249.99,
    category: 'Living Room',
    colors: ['Charcoal', 'Cream', 'Navy', 'Brown'],
    sizes: ['Small', 'Large'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1958&q=80'
    ],
    stock: 15,
    material: 'Fabric',
    style: 'Traditional'
  },
  {
    id: '7',
    name: 'Glass Dining Table',
    description: 'Modern glass dining table with brushed steel base. Perfect for contemporary spaces.',
    price: 899.99,
    category: 'Dining Room',
    colors: ['Clear', 'Frosted'],
    sizes: ['6-Seater', '8-Seater'],
    images: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    ],
    stock: 6,
    material: 'Glass',
    style: 'Modern'
  },
  {
    id: '8',
    name: 'Bookshelf with Ladder',
    description: 'Floor-to-ceiling bookshelf with sliding ladder. Perfect for home libraries.',
    price: 1299.99,
    category: 'Living Room',
    colors: ['Walnut', 'White', 'Black'],
    sizes: ['Standard', 'Wide'],
    images: [
      'https://images.unsplash.com/photo-1594620302200-1d739436b221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    ],
    stock: 3,
    material: 'Wood',
    style: 'Classic'
  }
];