import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService:AuthService){}

}
