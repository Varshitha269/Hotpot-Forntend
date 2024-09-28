import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
  
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private authservice:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }
  navigateToCreateAccount() {
    this.router.navigate(['/app-reactiveform']);
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
            this.router.navigate(['/app-apiclient']);
          } else {
            console.error('Invalid response');
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    } else {
      console.error('Invalid form values');
    }
   }

  }
  
