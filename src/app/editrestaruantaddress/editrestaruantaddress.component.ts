import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editrestaruantaddress',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editrestaruantaddress.component.html',
  styleUrl: './editrestaruantaddress.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditrestaruantaddressComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Handle form submission
    } else {
      console.log('Form is invalid');
    }
  }

}
