import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products-service/products-service.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent,CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products$!: Observable<any>;
  categories$!: Observable<any>;
  searchText = ''
  categoryText = ''

  constructor(private productsService:ProductsService,private route:ActivatedRoute,private router:Router){

  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const searchParam = params.get('search') || '' 
      const categoryParam = params.get('category') || ''
      this.categoryText = categoryParam
      this.searchText = searchParam

      if(categoryParam){
        this.products$ = this.productsService.getProductsByCategory(categoryParam)
      }
      if(searchParam){
        this.products$ = this.productsService.getProducts(searchParam);
      }
      
      if(!(categoryParam || searchParam)){
        this.products$ = this.productsService.getProducts();
      }
    });

    this.categories$ = this.productsService.getProductCategories()
  }

  categoryClick(event:any){
    const category = event.target.value
    if(category){
      this.router.navigateByUrl(`/products?category=${category}`)
    }else{
      this.router.navigateByUrl(`/products`)
    }
  }

}
