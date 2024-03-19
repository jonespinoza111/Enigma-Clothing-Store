import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { collections } from '../../data/collections';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  description: string = `Introducing our "Azure Breeze Men's Sweater" – a perfect blend of style and comfort. Crafted with utmost care, this light blue sweater is made from premium quality, soft fabric that feels gentle against the skin. Its classic design showcases a versatile style that can be dressed up or down effortlessly. Whether you're heading to a casual outing or a formal occasion, this sweater will keep you cozy while making a fashionable statement. Elevate your wardrobe with the Azure Breeze Men's Sweater and experience the perfect combination of sophistication and comfort.`;
  truncatedDescription: string = '';
  truncated: boolean = true;
  outputDescription: string = '';
  products: Product[] = [];
  productInfo: any;
  currentVariation: any;
  // products: Product[] = collections[0].products.slice(0, 4);

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let productId = params['id'];
      console.log()
      
        this.productInfo = this.productService.getProductById(productId)
        .subscribe(
          (response: Product) => {
            this.productInfo = response;
            this.currentVariation = response.variations[0];
            console.log('here is the productInfo, ', this.productInfo);
          },
          (error: any) => {
            console.error('Error fetching products:', error);
          }
        )
    })
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response.slice(0, 4);;
        console.log('here are the products, ', this.products);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );;
  }

  ngOnInit() {
    // Assuming you have assigned the description value from your data source
    this.truncateDescription(30);
    this.outputDescription = this.truncatedDescription;
  }

  truncateDescription(wordsLimit: number) {
    const words = this.description.split(' ');
    const truncatedWords = words.slice(0, wordsLimit);
    this.truncatedDescription = truncatedWords.join(' ');
  }

  onReadMore() {
    this.outputDescription = this.description;
    this.truncated = false;
  }

  onReadLess() {
    this.outputDescription = this.truncatedDescription;
    this.truncated = true;
  }
}
