import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService)
  const authToken = localStorage.getItem("user_token");

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq);
};
