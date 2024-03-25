import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { products } from '../../data/products';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { collections } from '../../data/collections';
import { Collection } from '../../models/collection';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../collection.service';
import { Subscription } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterOutlet, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit, OnDestroy  {
  products: Product[] = [];

  collection: Collection | undefined = undefined;
    // {
    //   id: 0,
    //   cardTitle: 'boo',
    //   cardImage: '',
    //   title: 'hello',
    //   description: 'tonight is the night we go to the place over there',
    //   products: [{
    //     _id: '0',
    //     name: 'Running Shoes',
    //     description: 'Some running sneakers for the park',
    //     imageUrl: '',
    //     variations: [{
    //       _id: '5432',
    //       price: 66,
    //       color: 'Blue',
    //       size: 'M',
    //       stockQuantity: 20,
    //       productId: '123',
    //       available: true,
    //     }],
    //     category: ''
    //   }],
    //   filters: ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5']
    // };

  constructor(private route: ActivatedRoute, private cartService: CartService, private collectionService: CollectionService) {
  }

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
    
  //   this.route.params.subscribe(params => {
  //     let collectionId = params['id'];
  //     this.collectionService.getCollectionById(collectionId).subscribe(collection => {
  //       console.log('in subscribe', collection);
  //       if (collection) {
  //         this.collection = collection;
  //         console.log('collection value final:', this.collection);
  //       }
  //     });
  //       console.log('param value: ', params, collectionId);
  //       console.log('collection value second: ', this.collection);
  //   })

  // }

  private collectionSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const collectionId = +params['id'];
      this.collectionSubscription = this.collectionService.getCollectionById(collectionId).subscribe(collection => {
        if (collection) {
          this.collection = collection;
          console.log('collection value:', this.collection);
        } else {
          console.log('Collection not found');
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.collectionSubscription) {
      this.collectionSubscription.unsubscribe();
    }
  }

  addToCart(event: MouseEvent, item: any) {
    event.stopPropagation();
    console.log('my cart item here: ', item);
    
    let cartItem = {
      id: item._id,
      name: item.name,
      color: item.variations[0].color,
      size: item.variations[0].size,
      price: item.variations[0].price,
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
