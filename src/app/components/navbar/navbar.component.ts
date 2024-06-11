import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service/cart.service';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { CartItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  search=""
  cart:CartItem[]= []

  constructor(private router:Router, public cartService:CartService,private authService:AuthService){
    this.cartService.cart.subscribe((data:CartItem[])=>{
      this.cart = data
    })
  }

  searchProducts(){
    if(this.search){
      this.router.navigateByUrl(`/products?search=${this.search}`)
    }
  }

  openCart(){
    this.cartService.openCart()
  }

  isUserLogged(){
    return Boolean(this.authService.isUserLogged())
  }
}
