import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() customClass!: string;  


  constructor(private cartService: CartService) {
  }

  addToCart(item: any) {
    let alreadyInCart = this.cartService.getCartItemById(item.id);
    if (alreadyInCart) {
      console.log('already in the cart');
    }
    this.cartService.addToCart(item);
  }
}
