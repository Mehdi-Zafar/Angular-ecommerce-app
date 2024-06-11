import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private authService:AuthService,private router:Router){}

  logout(){
    this.authService.logoutUser()
    this.router.navigateByUrl("/sign-in")
  }
}
