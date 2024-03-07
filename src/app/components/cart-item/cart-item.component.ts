import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem.model';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input({ required: true }) cartItem!: CartItem;

  constructor(private cartService: CartService) {
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  subtractQuantity(item: any) {
    if (item.quantity <= 1) {
      this.removeFromCart(item);
    }
    const newQuantity = item.quantity - 1; 
    this.cartService.updateQuantity(item.id, newQuantity);
  }

  addQuantity(item: any) {
    const newQuantity = item.quantity + 1;
    this.cartService.updateQuantity(item.id, newQuantity);
  }
}
