import { EventEmitter, Injectable, Output } from '@angular/core';
import { CartItem } from './models/cartItem.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  cartSize$ = this.cartSizeSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
    this.calculateCartSize();
    this.calculateSubtotal();
    // console.log("cartSizeSubject now: ", this.cartSizeSubject.asObservable());
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(item: CartItem): void {
    this.cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateCartSize();
    this.calculateSubtotal();
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.calculateCartSize();
      this.calculateSubtotal();
    }
  }

  getCartSizeObservable(): Observable<number> {
    return this.cartSize$;
  }

  getCartTotalObservable(): Observable<number> {
    return this.cartSize$;
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      // Calculate the total based on item prices or other properties
      total += item.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }

  updateQuantity(productInfo: CartItem, quantity: number): void {
    const foundItem = this.cartItems.filter((item) => item.id === productInfo.id).find((item) => item.color == productInfo.color && item.size == productInfo.size);
    console.log('here is founditem in updateQuantity: ', foundItem);
    if (foundItem) {
      foundItem.quantity = quantity;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateSubtotal();
  }

  getCartItemById(itemId: number): any {
    console.log('all cartItems in getId: ', this.cartItems);
    return this.cartItems.find((item) => item.id === itemId);
  }

  getAlreadyInCart(itemId: number, color: string, size: string): any {
    return this.cartItems.filter((item) => item.id === itemId).find((item) => item.color == color && item.size == size);
  }


  isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  getCartSize(): number {
    return this.cartItems.length;
  }

  private calculateCartSize(): void {
    const cartSize = this.cartItems.length;
    this.cartSizeSubject.next(cartSize);
  }

  private calculateSubtotal(): void {
    let subtotal = 0;
    for (const item of this.cartItems) {
      subtotal += (item.price * item.quantity);
    }
    this.cartTotalSubject.next(subtotal); 
  }
}
