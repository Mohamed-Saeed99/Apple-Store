import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No token found in localStorage.');
      return false;
    }

    try {
      const decodedToken: any = jwt_decode(token);
      console.log('Decoded Token:', decodedToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const isValid = decodedToken.exp > currentTime;
      console.log('Token Expiration:', decodedToken.exp, 'Current Time:', currentTime, 'Is Valid:', isValid);
      // localStorage.removeItem('authToken');
      return isValid;

    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
