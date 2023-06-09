import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { CustomResponse } from "../interfaces/Custom-response";
import { Product } from '../interfaces/Product.interface';
import { ProductCategory } from '../interfaces/Product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'https://jabak-lah-app.herokuapp.com/api/products';

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<CustomResponse> {

    return this.httpClient.get<CustomResponse>(`${this.baseUrl}/getCategories`).pipe(
      tap(console.log)
    );
  }

  getProducts(): Observable<CustomResponse> {
    const searchUrl = `${this.baseUrl}/products`;

    return this.httpClient.get<CustomResponse>(searchUrl).pipe(
      tap(console.log)
    );
  }

  addProduct(product: Product): Observable<CustomResponse> {
    const searchUrl = `${this.baseUrl}/saveProduct`;

    return this.httpClient.post<CustomResponse>(searchUrl, product).pipe(
      tap(console.log)
    );
  }

  updateProduct(product: Product, productId: number) {
    const searchUrl = `${this.baseUrl}/updateProduct`;

    return this.httpClient.put<CustomResponse>(`${searchUrl}/${productId}`, product).pipe(
      tap(console.log)
    );
  }

  addCategory(category: ProductCategory): Observable<CustomResponse> {
    const searchUrl = `${this.baseUrl}/saveCategory`;

    return this.httpClient.post<CustomResponse>(searchUrl, category).pipe(
      tap(console.log)
    );
  }


  getProduct(id: number): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseUrl}/${id}`).pipe(
      tap(console.log)
    );
  }

  deleteProduct(id: number): Observable<CustomResponse> {
    return this.httpClient.delete<CustomResponse>(`${this.baseUrl}/deleteProduct/${id}`).pipe(
      tap(console.log)
    );
  }
  deleteCategory(id: number): Observable<CustomResponse> {
    return this.httpClient.delete<CustomResponse>(`${this.baseUrl}/deleteCategory/${id}`).pipe(
      tap(console.log)
    );
  }

  filterProducts$ = (item: string, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        const filteredProducts = (response.data.products as Product[]).filter(product =>
          product?.name!.toLowerCase().includes(item.toLowerCase()) ||
          product?.category?.categoryName.toLowerCase().includes(item.toLowerCase()) ||
          product?.unitsInStock!.toString().includes(item)
        );
        const filteredResponse: CustomResponse = {
          ...response,
          message: filteredProducts.length > 0
            ? `products filtered by "${item}"`
            : `No products found with name "${item}"`,
          data: { products: filteredProducts },
        };

        subscriber.next(filteredResponse);
        subscriber.complete();

      }
    )
      .pipe(
        tap(console.log),
      );

      
}
