import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { products } from '../../data/products';
import { ActivatedRoute } from '@angular/router';
import { collections } from '../../data/collections';
import { Collection } from '../../models/collection';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ProductCardComponent],
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
      }]
    };

  constructor(private route: ActivatedRoute) {}

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
}
