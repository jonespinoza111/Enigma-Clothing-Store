import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { products } from '../../data/products';

@Component({
  selector: 'app-collection-section',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './collection-section.component.html',
  styleUrl: './collection-section.component.css',
})
export class CollectionSectionComponent {
  products: Product[] = [];
}
