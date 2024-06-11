import { Routes } from '@angular/router';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { ProductsComponent } from './screens/products/products.component';
import { HomeComponent } from './screens/home/home.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { PostsComponent } from './screens/posts/posts.component';
import { SingleProductComponent } from './screens/single-product/single-product.component';
import { CategoriesComponent } from './screens/categories/categories.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { authGuard, cartGuard, unAuthGuard } from './guards/route-guard.guard';
import { ProfileComponent } from './screens/profile/profile.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"sign-in",component:SignInComponent,canActivate:[unAuthGuard]},
    {path:"sign-up",component:SignUpComponent,canActivate:[unAuthGuard]},
    {path:"products",children:[
        {path:"",component:ProductsComponent},
        {path:":id",component:SingleProductComponent}
    ]},
    {path:"posts",component:PostsComponent},
    {path:"products",component:ProductsComponent},
    {path:"categories",component:CategoriesComponent},
    {path:"checkout",component:CheckoutComponent,canActivate:[cartGuard,authGuard]},
    {path:"profile",component:ProfileComponent,canActivate:[authGuard]},
    {path:"**",component:NotFoundComponent},
];
