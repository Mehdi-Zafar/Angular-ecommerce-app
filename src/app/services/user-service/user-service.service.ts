import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://dummyjson.com/users'

  constructor(private http:HttpClient) { }

  registerUser(data:RegisterUser){
    return this.http.post(`${this.url}/add`,data)
  }

  getUser(id:number){
    return this.http.get(`${this.url}/${id}`)
  }
}
