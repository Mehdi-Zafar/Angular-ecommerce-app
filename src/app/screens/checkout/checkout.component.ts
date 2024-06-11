import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { NavbarService } from '../../services/navbar-service/navbar.service';
import { Router } from '@angular/router';
import { CartItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit,OnDestroy {
  cart:CartItem[] = [];
  shippingAddress = ""
  defaultAddress = true
  paymentMethod = ""
  shippingFee = 2
  user:any = {}

  constructor(private cartService:CartService,private authService:AuthService,private navbarService:NavbarService,private location:Location,private router:Router){
    this.cartService.cart.subscribe((data)=>{
      this.cart = data
    })
  }

  ngOnInit(){
    this.navbarService.hideNavbar()
    this.getUser()
  }

  totalPrice(){
    return this.cartService.total
  }

  ngOnDestroy() {
    this.navbarService.showNavbar()
  }

  placeOrder(event:any){
    event.preventDefault()
    if(this.paymentMethod && this.shippingAddress){
      this.cartService.clearCart()
      alert("Order Placed Successfully!")
      this.router.navigateByUrl("/products")
    }else{
      alert("All Fields are required!")
    }
  }

  getUser(){
    this.authService.getAuthUser().subscribe((data)=>{
      this.user = data
      this.addressChange()
    },(err)=>{
      if(err.status === 401){
        this.authService.refreshAuthToken().subscribe((data)=>{
          // if(data?.token){
          //   this.localStorageService.setItem("user_token",data?.token)
          // }
          console.log(data)
          
        },(err)=>{
          alert(`${err.error.message}. Please Sign In Again!`)
          this.authService.logoutUser()
          this.router.navigateByUrl("/sign-in")
        }
      )
      }
    })
  }

  addressChange(){
    if(this.defaultAddress){
      this.shippingAddress = `${this.user?.address?.address}, ${this.user?.address?.city}`
    }else{
      this.shippingAddress = ''
    }
  }

  goBack(){
    this.location.back()
  }
}
