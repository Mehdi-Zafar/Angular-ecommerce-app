import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product:any

  constructor(private cartService:CartService){

  }

  addToCart(event:any,item:any){
    event.stopPropagation()
    this.cartService.addToCart(item,1)
  }
}
