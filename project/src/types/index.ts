export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  variations: Variation[]; // Array de variações
  images: Image[]; // Array de imagens
}

export interface Variation {
  id: number;
  productId: number; // Referência ao produto
  color: string;
  size: string;
  material: string;
  price: number;
  stock: number;
}

export interface Image {
  id: number;
  productId: number;  // Referência ao produto
  variationId?: number; // Caso a imagem pertença a uma variação específica
  url: string;
}
export interface CartItem {
  id: number;
  name: string;    // Alterado de 'nome' para 'name'
  image: string;
  price: number;   // <- Adicionado para armazenar o preço da variação selecionada
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  selectedMaterial: string;
  assemblyOption: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface DeliveryOption {
  type: 'pickup' | 'delivery';
  address?: string;
  date: string;
  timeSlot: string;
}

export interface PaymentInfo {
  method: 'credit' | 'debit' | 'pix' | 'bank-transfer';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  installments?: number;
  pixKey?: string;
  bankAccount?: {
    bank: string;
    accountNumber: string;
    routingNumber: string;
  };
}
