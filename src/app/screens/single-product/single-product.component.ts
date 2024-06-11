import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service/products-service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule,ReviewCardComponent,ProductCardComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent implements OnInit {
  product!: any;
  relatedProducts$!: Observable<any>;
  currentImg:any;
  quantity = 1

  constructor(private productService:ProductsService,private route:ActivatedRoute, private cartService:CartService){}

  ngOnInit(){
    this.route.paramMap.subscribe(param=>{
      const id = param.get('id') || ''
      this.productService.getProductById(parseInt(id)).subscribe((data:any)=>{
        this.product = data
        this.relatedProducts$ = this.productService.getProductsByCategory(data?.category)
        this.currentImg = data?.images[0]
      })
    })
  }

  changeImg(i:number){
    this.currentImg = this.product?.images[i]
  }

  addToCart(item:any){
    this.cartService.addToCart(item,this.quantity)
  }

  filterProduct(products:any){
    return products.filter((i:any)=>i.id !== this.product.id)
  }

  decrementQuantity(){
    this.quantity-=1
  }

  incrementQuantity(){
    this.quantity+=1
  }
}
