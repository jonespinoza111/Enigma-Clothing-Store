import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://enigma-server-3rxw.onrender.com/products';
  httpClient = inject(HttpClient);

  constructor() {}

  getAllProducts(): any {
    console.log('trying to get all products....');
    let response = this.httpClient.get<{ success: boolean, data: Product[] }>(this.apiUrl);
    console.log('here is get all products response: ', response);

    return response.pipe(map(res => res.data));
  }

  getProductById(id: String): any {
    let response = this.httpClient.get<{
      success: boolean, data: Product[]
    }>(`https://enigma-server-3rxw.onrender.com/products/${id}`);

    console.log('this final product response: ' , response.pipe(map(res => res.data)));
    return response.pipe(map(res => res.data))
  }
}
