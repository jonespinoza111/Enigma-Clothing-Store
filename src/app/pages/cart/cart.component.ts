import { Component } from '@angular/core';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartItems: any[] = [];
  public cartTotal: number = 0;
  constructor(private cartService: CartService) {
  }
  ngOnInit() {
    // Component initialization logic
    this.cartItems = this.cartService.getCartItems();
    this.cartService.cartTotal$.subscribe((total: number) => {
      this.cartTotal = total;
      console.log('these are all the cart items: ', this.cartItems);
    });;
  }
}
