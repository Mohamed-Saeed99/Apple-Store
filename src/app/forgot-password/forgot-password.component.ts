import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  apiUrl = 'https://new-world.runasp.net/api/ForgetPass/forgot-password';

  constructor(private http: HttpClient , private router: Router ) {}

  onSubmit(forgotPasswordForm: NgForm) {
    console.log("Form Submitted!");

    if (forgotPasswordForm.invalid) {
      console.log("Form is invalid, stopping submission");
      return;
    }

    const requestData = {
      email: this.email,
      newPassword: this.newPassword,
    };

    console.log("Request Data:", requestData);

    this.http.post(this.apiUrl, requestData).subscribe(
      (response: any) => {
        console.log("Response:", response);


        if (response.message === 'Password updated successfully.') {
          this.router.navigate(['/SignIN']);
          forgotPasswordForm.resetForm();
        } else {
          alert('An unexpected response was received.');
        }
      },
      (error) => {
        console.log("Error:", error);
        alert(error.error || 'An error occurred. Please try again.');
      }
    );

  }




}
