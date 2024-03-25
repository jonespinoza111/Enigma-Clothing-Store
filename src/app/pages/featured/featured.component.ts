import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product.model';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [HttpClientModule, RouterLink, RouterLinkActive, RouterOutlet, NgxSkeletonLoaderModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log('here are the products, ', this.products);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );

  }
}
