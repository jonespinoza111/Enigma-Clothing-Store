import { Component, OnInit } from '@angular/core';
import { HeroImageComponent } from '../../components/hero-image/hero-image.component';
import { CollectionSectionComponent } from '../../components/collection-section/collection-section.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { Category } from '../../models/category.model';
import { Collection } from '../../models/collection';
import { CollectionService } from '../../collection.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroImageComponent, CollectionSectionComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: Category[] = [
    {
      id: 1,
      name: 'Men',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'assets/images/category-image-1.png',
    },
    {
      id: 2,
      name: 'Women',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'assets/images/category-image-2.png',
    },
    {
      id: 3,
      name: 'Kids',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'assets/images/category-image-3.png',
    },
  ];
  collections: Collection[] = [];

  constructor(private collectionService: CollectionService) {
  }

  ngOnInit() {
    this.collectionService.collections$
      .subscribe((collections: Collection[]) => {
        console.log('ngonint collectionsss: ', collections);
        this.collections = collections;
        console.log('home collections', this.collections);
    });

  }

}
