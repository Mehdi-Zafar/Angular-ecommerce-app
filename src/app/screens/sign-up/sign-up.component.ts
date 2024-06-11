import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service/user-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username = ""
  email = ""
  password = ""
  confirmPassword = ""
  contactNumber = ""

  constructor(private userService:UserService,private router:Router){

  }

  registerUser(){
    const data = {username:this.username,email:this.email,password:this.password,phone:this.contactNumber}
    if(!(this.email && this.username && this.password && this.contactNumber)){
      alert("Please fill all fields!")
    }else{
      if(this.password !== this.confirmPassword){
        alert("Passwords do not match!")
      }else{
        this.userService.registerUser(data).subscribe((data:any)=>{
          if(data?.id){
            alert("Sign Up successful!")
            this.router.navigateByUrl("/sign-in")
          }else{
            alert("Sign Up Failed!")
          }
        })
      }
    }
  }
}
