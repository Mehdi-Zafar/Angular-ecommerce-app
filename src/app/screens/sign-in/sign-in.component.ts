import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username = ""
  password = ""

  constructor(private authService:AuthService,private router:Router,private localStorageService:LocalStorageService){}

  loginUser(){
    const data = {username:this.username,password:this.password}
    if(!(this.username && this.password)){
      alert("Please fill all fields!")
    }else{
      this.authService.loginUser(data).subscribe((data:any)=>{
        if(data?.token){
          this.localStorageService.setItem("user_id",data?.id)
          this.localStorageService.setItem("user_token",data?.token)
          alert("Sign In successful!")
          this.router.navigateByUrl("/")
        }else{
          alert("Sign In Failed!")
        }
      },(err) => {
        alert(err.error.message+"!")
      })
    }
  }

}
