import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = '';
  password: string = '';
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const signUpData = {
      name: this.name,
      password: this.password,
      email: this.email
    };

    this.http.post('http://new-world.runasp.net/api/SignUp', signUpData).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Sign-up successful!', response);

          localStorage.setItem('userName', this.name);

          this.router.navigate(['/Home']);
        } else {
          alert(response.message || 'Sign-up failed.');
        }
      },
      (error) => {
        console.error('Sign-in error:', error);

        const errorMessage = error.error?.message || error.message || 'An error occurred during sign-in.';
        alert(`Sign-in failed: ${errorMessage}`);
      }
    );
  }


}
