import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn:'root'
})
export class DBServices
{
  constructor(private http:HttpClient){}
getAllDataIphone(){
return this.http.get('https://api.myjson.online/v1/records/9502bd92-4e15-4962-b760-7446ef2d20fe');
}
getAllDataMac(){
return this.http.get('https://api.myjson.online/v1/records/56086608-069e-44ba-832b-f3c066b67034');
}
getAllDataIpad(){
return this.http.get('https://api.myjson.online/v1/records/36a5a757-e6a0-4ce2-afa2-87b4a18dcf5b');
}
getAllDataWatch(){
return this.http.get('https://api.myjson.online/v1/records/3b97e3a6-1bca-4f98-b3c8-cd7805a6bb53');
}
getAllDataAirPods(){
return this.http.get('https://api.myjson.online/v1/records/89ba7bcb-c2d2-43c0-a023-cf202c302874');
}
}
