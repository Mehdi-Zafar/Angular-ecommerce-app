import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isnavbarVisible = new BehaviorSubject(true)
  constructor() { }

  hideNavbar(){
    this.isnavbarVisible.next(false)
  }

  showNavbar(){
    this.isnavbarVisible.next(true)
  }
}
