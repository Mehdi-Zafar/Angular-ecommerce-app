import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service.service';
import { CartService } from '../services/cart-service/cart.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if(auth.isUserLogged()){
    return true
  }else{
    router.navigateByUrl("/sign-in")
    return false
  }
};

export const unAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if(!auth.isUserLogged()){
    return true
  }else{
    router.navigateByUrl("/")
    return false
  }
};

export const cartGuard: CanActivateFn = () => {
  const cartService = inject(CartService)
  const router = inject(Router)
  if(cartService.cart.getValue().length > 0){
    return true
  }else{
    router.navigateByUrl("/sign-in")
    return false
  }
};