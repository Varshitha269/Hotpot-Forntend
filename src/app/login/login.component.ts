import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PayloadService } from '../service/payload.service'; // Import the PayloadService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private payloadService: PayloadService // Inject PayloadService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue],
    });
  }

  navigateToCreateAccount() {
    this.router.navigate(['/app-reactiveform']);
  }

  decodeToken() {
    const decodedToken = this.authservice.decodeToken();
    if (decodedToken) {
      console.log('Decoded Token:', decodedToken);
      return decodedToken;
    } else {
      console.log('No token found or unable to decode');
      return null;
    }
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password) {
      this.authservice.login(username, password).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            const token = response.token;
            this.authservice.setToken(token);
            const decodedToken = this.decodeToken();

            if (decodedToken) {
              // Set the username in PayloadService
              this.payloadService.setUserName(decodedToken.unique_name);
              this.navigateBasedOnRole(decodedToken.role);
            } else {
              console.error('Unable to retrieve role from the token.');
            }
          } else {
            alert("Invalid details. Please check and try again.");
            console.error('Invalid response');
          }
        },
        error: (error: any) => {
          console.error(error);
          alert("Login failed. Please check your credentials.");
        },
        complete: () => {
          console.log('Request completed');
        },
      });
    } else {
      alert("Invalid details. Please check and try again.");
      console.error('Invalid form values');
    }
  }

  navigateBasedOnRole(role: string): void {
    switch (role) {
      case 'user':
        this.router.navigate(['/']); // User dashboard
        break;
      case 'Admin':
        this.router.navigate(['/app-admindashboard']); // Admin dashboard
        break;
      case 'Restaurant':
        this.router.navigate(['/app-restraruant-dashboard']); // Restaurant dashboard
        break;
      default:
        alert('Unknown role. Please contact support.');
        console.error('Unknown role:', role);
        break;
    }
  }
}
