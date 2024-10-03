import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestaurantService } from '../service/restaurant.service';
import { PayloadService } from '../service/payload.service';

@Component({
  selector: 'app-restaruantprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './restaruantprofile.component.html',
  styleUrls: ['./restaruantprofile.component.css'], // Corrected 'styleUrl' to 'styleUrls'
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaruantprofileComponent implements OnInit {
  restaurantForm: FormGroup;
  currentStep: number = 1;
  restid: Number = 0;

  constructor(private fb: FormBuilder, private payloaddata: PayloadService, private restarunatservice: RestaurantService) {
    // Initialize the form group
    this.restaurantForm = this.fb.group({
      restaurantID: [null], // Initialize as null, will set it later
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      phNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      operatingHours: ['', Validators.required],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      createdDate: [new Date()],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.restarunatservice.getRestaurantByName().subscribe({
      next: (restaurantId) => {
        this.restid = restaurantId; // Store the restaurant ID
        console.log(Number(this.restid));

        // Use restid to fetch restaurant details
        this.restarunatservice.getRestaruantDetails(Number(this.restid)).subscribe(restaurantData => {
          // Set restaurantID in the form
          this.restaurantForm.patchValue({
            restaurantID: this.restid, // Set the restaurantID from restid
            name: restaurantData.name,
            description: restaurantData.description,
            phNo: restaurantData.phNo,
            email: restaurantData.email,
            operatingHours: restaurantData.operatingHours,
            addressLine: restaurantData.addressLine,
            city: restaurantData.city,
            state: restaurantData.state,
            postalCode: restaurantData.postalCode,
            country: restaurantData.country,
            createdDate: restaurantData.createdDate,
            isActive: restaurantData.isActive
          });
        });
      },
      error: (err) => {
        console.error('Error fetching restaurant ID:', err);
      }
    });
  }

  updateRestaurantDetails() {
    const restaurantData = this.restaurantForm.value;

    // Validate restaurantID
    if (!restaurantData.restaurantID || restaurantData.restaurantID <= 0) {
      console.error('Invalid RestaurantID:', restaurantData.restaurantID);
      alert('Please provide a valid Restaurant ID before updating.');
      return;
    }

    // Update restaurant details
    this.restarunatservice.updateRestarunatDetails(restaurantData).subscribe(
      response => {
        console.log('Restaurant details updated successfully:', response);
        alert('Restaurant details updated successfully!');
        // this.restaurantForm.reset();
      },
      (error) => {
        console.error('Error updating restaurant details:', error);
        alert('An error occurred while updating restaurant details. Please try again.');
        // this.restaurantForm.reset();
      }
    );
  }

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
