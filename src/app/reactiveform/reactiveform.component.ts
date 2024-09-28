import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormControl,FormGroup,FormsModule, ReactiveFormsModule, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent implements OnInit {
  signupForm!: FormGroup; // FormGroup for the reactive form

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validators
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, [Validators.requiredTrue]] // Terms checkbox validation
    });
  }
  navigateTologinAccount()
  {
    this.router.navigate(['/app-login']);

  }

  // Submit handler
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      // Implement form submission logic here (e.g., send data to API)
    } else {
      console.log('Form is invalid');
    }
  }
}
