import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart:CartItem[] = []
  constructor(private cartService:CartService,private router:Router){
    this.cartService.cart.subscribe((data:CartItem[])=>{
      this.cart = data
    })
  }

  closeCart(){
    this.cartService.closeCart()
  }

  incrementQuantity(id:number){
    this.cart = this.cart.map((item:CartItem)=>{
      if(item.id === id){
        return {...item,quantity:item.quantity+1}
      }else{
        return item
      }
    })
    this.cartService.setCart(this.cart)
  }

  decrementQuantity(id:number){
    this.cart = this.cart.map((item:CartItem)=>{
      if(item.id === id){
        return {...item,quantity:item.quantity-1}
      }else{
        return item
      }
    })
    this.cartService.setCart(this.cart)
  }

  totalPrice(){
    return this.cartService.total
  }

  deleteItem(id:number){
    this.cart = this.cart.filter((item:CartItem)=>item.id!==id)
    this.cartService.setCart(this.cart)
  }

  goToCheckout(){
    this.closeCart()
    this.router.navigateByUrl("/checkout")
  }

  clearCart(){
    this.closeCart()
    this.cartService.clearCart()
  }

}


    