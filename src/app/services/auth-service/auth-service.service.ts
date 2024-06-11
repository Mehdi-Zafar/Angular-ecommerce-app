import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LoginUser } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://dummyjson.com/auth'
  constructor(private http:HttpClient,private localStorage:LocalStorageService) { }

  loginUser(data:LoginUser):Observable<any>{
    return this.http.post(`${this.url}/login`,data)
  }

  isUserLogged():string{
    const token = this.localStorage.getItem("user_token") || ''
    return token
  }

  logoutUser():void{
    this.localStorage.removeItem("user_id")
    this.localStorage.removeItem("user_token")
  }

  getAuthUser():Observable<any>{
    return this.http.get(`${this.url}/me`)
  }

  refreshAuthToken():Observable<any>{
    return this.http.post(`${this.url}/refresh`,{})
  }
}
