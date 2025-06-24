import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sgin-in',
  templateUrl: './sgin-in.component.html',
  styleUrls: ['./sgin-in.component.css']
})
export class SginINComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  name: string = '';
  password: string = '';
  apiUrl: string = 'https://new-world.runasp.net/api/SignIN/Sgin';

  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.name || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    const userData = {
      name: this.name,
      password: this.password,
    };

    this.http.post(this.apiUrl, userData).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('logincheck', 'loggedin');
          if (localStorage.getItem('cartItems')=== null) {
            this.router.navigate(['/Home']);
          } else {
          this.router.navigate(['/Checkout']);
          }
        }
        else {
          alert('Invalid credentials.');
        }
      },
      error: (error:any) => {
        console.error('Error Details:', error);
        alert('An error occurred while logging in.');
      }
    });
  }
  onSignUp() {
    this.router.navigate(['/SignUP']);
  }
  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
