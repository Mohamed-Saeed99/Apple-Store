import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IphoneComponent } from './iphone/iphone.component';
import { HomeComponent } from './home/home.component';
import { MacComponent } from './mac/mac.component';
import { IpadComponent } from './ipad/ipad.component';
import { WatchComponent } from './watch/watch.component';
import { AirpodsComponent } from './airpods/airpods.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';
import { SginINComponent } from './sgin-in/sgin-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserSginGuard } from './user-sgin.guard';


const routes: Routes = [
  {path:'', redirectTo:"/Home", pathMatch:'full'},
  {path:'Home', component:HomeComponent},
  {path:'Iphone', component:IphoneComponent},
  {path:'Mac', component:MacComponent},
  {path:'Ipad', component:IpadComponent},
  {path:'Watch', component:WatchComponent},
  {path:'AirPods', component:AirpodsComponent},
  {path:'Login', component:LoginComponent},
  {path:'SignIN', component:SginINComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'SignUP', component:SignUpComponent},
  {path: 'chatbot', component: ChatbotComponent },
  {path: 'Checkout', component: CheckoutComponent , canActivate: [UserSginGuard]},
  {path:'products', component: ProductsComponent , canActivate: [AuthGuard]}, // Guard applied here ,
  {path: '**', redirectTo: '/Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
