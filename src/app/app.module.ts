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
import { ReactiveFormsModule } from '@angular/forms';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    DBServices,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
