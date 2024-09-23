import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out'))
    ])
  ]
  
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible: boolean = false; // For show/hide password
  passwordErrorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  formvalid() {
    const passwordControl = this.loginForm.get('pass');
    const password = passwordControl?.value;

    if (password.length < 8 || password.length > 20) {
      this.passwordErrorMessage = "Password must be between 8 and 20 characters";
    } else {
      this.passwordErrorMessage = '';
    }
  }

  show() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Submit form logic (you can replace the logic to handle actual login)
  onSubmit() {
    if (this.loginForm.valid) {
      // Logic for form submission, e.g., make an API call
      console.log("Form Submitted:", this.loginForm.value);
    }
  }
  loginState = 'out';

  // Toggle login modal
  toggleLogin() {
    this.loginState = this.loginState === 'out' ? 'in' : 'out';
  }

  // Close the modal specifically when "X" is clicked
  closeModal() {
    this.loginState = 'out';
  }
  
}
