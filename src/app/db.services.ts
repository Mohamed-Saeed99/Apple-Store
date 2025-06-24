import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

export interface Airpods {
  id: number;
  name: string;
  price: number;
  image?: string;
  color?: string;
  chip?: string;
  connectivity?: string;
}

export interface Watch {
  id: number;
  name: string;
  price?: number;
  image?: string;
  color?: string;
  display?: string;
  gps?: string;
}

export interface Ipad {
  id: number;
  name: string;
  price?: number;
  image?: string;
  color?: string;
  display?: string;
  usb?: string;
}
export interface Mac {
  id: number;
  name: string;
  price?: number;
  image?: string;
  color?: string;
  weight?: string;
  type?: string;
}
export interface Iphone {
  id: number;
  name: string;
  price?: number;
  image?: string;
  color?: string;
  storage?: number;
  ram?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DBServices {
  private airpodsApiUrl = 'https://new-world.runasp.net/api/Airpods';
  private iphoneApiUrl = 'https://new-world.runasp.net/api/Iphone';
  private macApiUrl = 'https://new-world.runasp.net/api/Mac';
  private ipadApiUrl = 'https://new-world.runasp.net/api/Ipad';
  private watchApiUrl = 'https://new-world.runasp.net/api/Watch';

  constructor(private http: HttpClient) {}

  getAllAirpods(): Observable<Airpods[]> {
    return this.http.get<Airpods[]>(this.airpodsApiUrl);
  }

  getAllDataIphone(): Observable<Iphone[]> {
    return this.http.get<Iphone[]>(this.iphoneApiUrl);
  }

  getAllDataMac(): Observable<Mac[]> {
    return this.http.get<Mac[]>(this.macApiUrl);
  }

  getAllDataIpad(): Observable<Ipad[]> {
    return this.http.get<Ipad[]>(this.ipadApiUrl);
  }

  getAllDataWatch(): Observable<Watch[]> {
    return this.http.get<Watch[]>(this.watchApiUrl);
  }

  searchIphones(query: string): Observable<any> {
    return this.http.get<any>(`/api/Iphone/search?name=${encodeURIComponent(query)}`);
  }

  searchIpads(query: string): Observable<any> {
    return this.http.get<any>(`/api/Ipad/search?name=${encodeURIComponent(query)}`);
  }

  searchMacs(query: string): Observable<any> {
    return this.http.get<any>(`/api/Mac/search?name=${encodeURIComponent(query)}`);
  }
  searchWatches(query: string): Observable<any> {
    return this.http.get<any>(`/api/Watch/search?name=${encodeURIComponent(query)}`);
  }
  searchAirpods(query: string): Observable<any> {
    return this.http.get<any>(`/api/Airpods/search?name=${encodeURIComponent(query)}`);
  }
}
