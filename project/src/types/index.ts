export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  color: string;      // Altera de "colors" para "color"
  material: string;
  tamanho: string;    // Altera de "sizes" para "tamanho"
}



export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  assemblyOption: 'self' | 'onsite' | 'disassemble';
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