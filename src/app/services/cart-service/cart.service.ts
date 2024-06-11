import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CartItem } from '../../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<CartItem[]>([]);
  private showCart = false
  total = 0

  constructor(private localStorage:LocalStorageService) {
    const cart = localStorage.getItem("cart") ? localStorage.getItem("cart") : ''
    if(cart){
      const parseCart = JSON.parse(cart)
    if(parseCart.length > 0){
      this.cart.next(parseCart)
    }
    this.calculateTotalPrice(this.cart.getValue())
    }
   }

   openCart(){
    this.showCart = true
   }

  closeCart(){
    this.showCart = false
  }

  showCartFunc(){
    return this.showCart
  }

  // getCart(){
  //   const cart = this.localStorage.getItem("cart") || ""
  //   this.cart = JSON.parse(cart)
  //   this.calculateTotalPrice(this.cart.getValue())
  //   return this.cart.getValue();
  // }

  addToCart(item:any,quantity:number){
    if(this.cart.getValue().some((product:any) => product.id === item.id)){
      this.cart.next(this.cart.getValue().map((i:any)=>{
        if(i.id === item.id){
          return {...i,quantity:i.quantity+quantity}
        }else{
          return i
        }
      }))
    }else{
      const {id,title,price,thumbnail} = item
      this.cart.next([...this.cart.getValue(),{id,title,price,img:thumbnail,quantity:quantity}])
    } 
    this.setCart(this.cart.getValue())
  }

  setCart(cart:CartItem[]){
    this.calculateTotalPrice(cart)
    this.cart.next(cart)
    this.localStorage.setItem("cart",JSON.stringify(cart))
  }

  calculateTotalPrice(cart:CartItem[]){
    let price = 0
    cart.map((item:any)=>{
      price+= item.price *item.quantity
    })
    this.total = parseFloat(price.toFixed(2))
  }

  clearCart(){
    this.setCart([])
  }
}
