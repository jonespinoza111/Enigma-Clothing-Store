import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, take } from 'rxjs/operators';
import { Collection } from './models/collection';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'https://enigma-backend.fly.dev/collections';
  private collectionsSubject: BehaviorSubject<Collection[]> = new BehaviorSubject<Collection[]>([]);
  collections$ = this.collectionsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.fetchCollections();
  }

  private fetchCollections(): void {
    this.httpClient.get<{ success: boolean, data: Collection[] }>(this.apiUrl)
      .pipe(
        map(res => res.data)
      )
      .subscribe({
        next: (collections: Collection[]) => {
          this.collectionsSubject.next(collections);
        },
        error: (error: any) => {
          console.error('Error fetching collections:', error);
        }
      });
  }

  // getCollectionById(id: number): any {
  //   console.log('hello collectionById');
  //   if (this.collections) {
  //     console.log('here is current ocllection: ', this.collections.find(collection => collection.id == id));
  //     return this.collections.find(collection => collection.id == id);
  //   }
  // }

  // getCollectionById(id: number): any {
  //   console.log('hello collectionById');
  //   let collectionById: Collection | undefined;
  //   this.collections$
  //     .subscribe((collections: Collection[]) => {
  //       console.log('here is current collection: ', collections.find(collection => collection.id == id));
  //       collectionById = collections.find(collection => collection.id == id);
  //       return collectionById;
  //     });
  // }

  getCollectionById(id: number): Observable<Collection | undefined> {
    console.log('hello collectionById');
    return this.collections$.pipe(
      map((collections: Collection[]) => collections.find(collection => collection.id === id)),
      filter(collection => !!collection),
      take(1)
    );
  }
}
