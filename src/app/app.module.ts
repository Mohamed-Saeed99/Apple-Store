import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { IphoneComponent } from './iphone/iphone.component';
import { IpadComponent } from './ipad/ipad.component';
import { MacComponent } from './mac/mac.component';
import { WatchComponent } from './watch/watch.component';
import { AirpodsComponent } from './airpods/airpods.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DBServices } from './db.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { SginINComponent } from './sgin-in/sgin-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    IphoneComponent,
    IpadComponent,
    MacComponent,
    WatchComponent,
    AirpodsComponent,
    FooterComponent,
    LoginComponent,
    ProductsComponent,
    SginINComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ChatbotComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DBServices,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
