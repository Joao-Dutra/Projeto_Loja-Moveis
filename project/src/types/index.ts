export interface Product {
  id: number;              // Back-end envia como número
  name: string;            // Mapeado com @JsonProperty("name")
  description: string;     // Mapeado com @JsonProperty("description")
  price: number;           // Mapeado com @JsonProperty("price")
  category: string | null; // Pode ser null, então deixamos como opcional
  images: string[];        // Recebe um array do back-end
  stock: number;           // Mapeado com @JsonProperty("stock")
  colors?: string[];       // Campos adicionais do front-end
  sizes?: string[];
  material?: string;
  style?: string;
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