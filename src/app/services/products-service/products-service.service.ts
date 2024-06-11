import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = 'https://dummyjson.com/products'

  constructor(private http:HttpClient) { 

  }

  getProducts(search?:string){
    if(search){
      return this.http.get(`${this.url}/search?q=${search}`).pipe(
        map(response => response)
      );
    }
    return this.http.get(this.url).pipe(
      map(response => response)
    );
  }

  getProductById(id:number){
    return this.http.get(`${this.url}/${id}`)
  }

  getProductCategories(){
    return this.http.get(`${this.url}/categories`)
  }

  getProductsByCategory(category:string){
    return this.http.get(`${this.url}/category/${category}`)
  }

  getProductsByCategoryAndSearch(category:string,search:string){
    return this.http.get(`${this.url}/category/${category}?q=${search}`)
  }
}
