import { Product } from "./product.model";

export interface Collection {
    id: number;
    cardTitle: string;
    cardImage: string;
    title: string;
    description: string;
    products: Product[];
    filters: string[];
}