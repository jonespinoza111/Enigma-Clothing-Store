export interface Variation {
    _id: string;
    size: string;
    color: string;
    price: number;
    stockQuantity: number;
    available: boolean;
    productId: string;
  }
  
export interface Product {
    _id: string;
    name: string;
    description: string;
    variations: Variation[];
    imageUrl: string;
    category: string;
}