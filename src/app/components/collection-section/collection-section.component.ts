import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-collection-section',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './collection-section.component.html',
  styleUrl: './collection-section.component.css',
})
export class CollectionSectionComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 9.99,
      imageUrl: 'assets/images/product-image-1.png',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 19.99,
      imageUrl: 'assets/images/product-image-2.png',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 29.99,
      imageUrl: 'assets/images/product-image-3.png',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 39.99,
      imageUrl: 'assets/images/product-image-4.png',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 14.99,
      imageUrl: 'assets/images/product-image-5.png',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 10.99,
      imageUrl: 'assets/images/product-image-6.png',
    },
    // Add more product objects as needed
  ];
}
