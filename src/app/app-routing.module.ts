import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IphoneComponent } from './iphone/iphone.component';
import { HomeComponent } from './home/home.component';
import { MacComponent } from './mac/mac.component';
import { IpadComponent } from './ipad/ipad.component';
import { WatchComponent } from './watch/watch.component';
import { AirpodsComponent } from './airpods/airpods.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path:'Home', component:HomeComponent},
  {path:'Iphone', component:IphoneComponent},
  {path:'Mac', component:MacComponent},
  {path:'Ipad', component:IpadComponent},
  {path:'Watch', component:WatchComponent},
  {path:'AirPods', component:AirpodsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
