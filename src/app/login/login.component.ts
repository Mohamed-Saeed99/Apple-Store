import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  apiUrl: string = 'https://new-world.runasp.net/api/Admin/Login';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    const userData = {
      name: this.name,
      password: this.password
    };

    this.http.post(this.apiUrl, userData).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/products']);
        } else {
          alert('Invalid credentials.');
        }
      },
      error: (error) => {
        console.error('Error Details:', error);
        alert('An error occurred while logging in.');
      }
    });
  }
}
