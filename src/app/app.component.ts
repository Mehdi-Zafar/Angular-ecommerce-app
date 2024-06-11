import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart-service/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarService } from './services/navbar-service/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,CartComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-app';

  showNav = true
  sub:Subscription;

  constructor(private cartService:CartService,private navbarService:NavbarService){
    this.sub = this.navbarService.isnavbarVisible.subscribe((value)=>{
      this.showNav = value
    })
  }

  showCart(){
    return this.cartService.showCartFunc()
  }

  

}
