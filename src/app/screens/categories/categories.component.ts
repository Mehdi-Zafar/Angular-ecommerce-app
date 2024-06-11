import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products-service/products-service.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories$:any

  constructor(private productsService:ProductsService){

  }

  ngOnInit(): void {
    this.categories$ = this.productsService.getProductCategories()
    // this.route.queryParamMap.subscribe(params => {
    //   const searchParam = params.get('search');
    //   if(searchParam){
    //     this.products$ = this.productsService.getProducts(searchParam);
    //   }else{
    //     this.products$ = this.productsService.getProducts();
    //   }
    // });
  }
}
