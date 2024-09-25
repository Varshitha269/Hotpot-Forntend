import { Component, OnInit  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-restaruantprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './restaruantprofile.component.html',
  styleUrl: './restaruantprofile.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaruantprofileComponent implements OnInit {
  restaurantForm: FormGroup;
  currentStep: number = 1;

  constructor(private fb: FormBuilder) {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      phNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      operatingHours: ['', Validators.required],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      console.log(this.restaurantForm.value);
      // Handle form submission
    } else {
      console.log('Form is invalid');
    }
  }

}
