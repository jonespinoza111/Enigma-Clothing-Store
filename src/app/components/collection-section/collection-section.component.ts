import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../product.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-collection-section',
  standalone: true,
  imports: [ProductCardComponent, RouterOutlet, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './collection-section.component.html',
  styleUrl: './collection-section.component.css',
})
export class CollectionSectionComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response.slice(0,3);
        console.log('here are the products, ', this.products);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );

  }

}
