import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { products } from '../../data/products';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { collections } from '../../data/collections';
import { Collection } from '../../models/collection';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  products: Product[] = products;

  collection: Collection = 
    {
      id: 0,
      title: 'hello',
      description: 'tonight is the night we go to the place over there',
      products: [{
        id: 0,
        name: 'Running Shoes',
        description: 'Some running sneakers for the park',
        price: 13.99,
        imageUrl: '',
      }],
      filters: ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5']
    };

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe(params => {
      let collectionId = params['id'];
      console.log('param value: ', params, collectionId);
      console.log('collection value: ', collections[collectionId]);
      this.collection = collections.filter(collection => collection.id == collectionId)[0];
    })
  }

  addToCart(event: MouseEvent, item: any) {
    event.stopPropagation();
    console.log('my cart item here: ', item);
    
    let cartItem = {
      id: item.id,
      name: item.name,
      color: 'Blue',
      size: 'M',
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1
    }


    let alreadyInCart = this.cartService.getCartItemById(item.id);
    if (alreadyInCart) {
      this.cartService.updateQuantity(item.id, alreadyInCart.quantity + 1);
    } else {
      console.log('new cart item getting added: ', cartItem);
      this.cartService.addToCart(cartItem);
    }

  }
}
