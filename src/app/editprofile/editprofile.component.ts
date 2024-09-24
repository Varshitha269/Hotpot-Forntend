import { CommonModule} from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, 
    ReactiveFormsModule,
   ],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditprofileComponent implements OnInit {
  userForm: FormGroup;
  currentStep: number = 1;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Handle form submission
    } else {
      console.log('Form is invalid');
    }
  }
 
}
