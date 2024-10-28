import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { PayloadService } from '../service/payload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditprofileComponent implements OnInit {
  userForm: FormGroup;
  currentStep: number = 1;
  
  constructor(private fb: FormBuilder, private userService: UserService, private payloaddata: PayloadService) {
    this.userForm = this.fb.group({
      userID: [this.payloaddata.getUserId],  // Initialize with User ID
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Add validation for phone number
      password: ['', [Validators.required, Validators.minLength(6)]],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      createdDate: [new Date()],
      role: ['user'],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    // Fetch user data from service and patch to form
    this.userService.getUserDetails(Number(this.payloaddata.getUserId())).subscribe(userData => {
      this.userForm.patchValue({
        userID: userData.userID,
        username: userData.username,
        email: userData.email,
        phNo: userData.phNo,
        password: userData.password,
        addressLine: userData.addressLine,
        city: userData.city,
        state: userData.state,
        postalCode: userData.postalCode,
        country: userData.country,
        createdDate: userData.createdDate,
        role: userData.role,
        isActive: userData.isActive
      });
    });
    console.log(this.userForm);
  }

  updateuserdetails() {
    const userdata = this.userForm.value;

    if (!userdata.userID || userdata.userID <= 0) {
      console.error('Invalid UserID:', userdata.userID);
      Swal.fire({
        title: 'Invalid User ID',
        text: 'Please provide a valid User ID before updating.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.userService.updateUserDetails(userdata).subscribe(
      response => {
        console.log('User details updated successfully:', response);
        Swal.fire({
          title: 'Success',
          text: 'User details updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.userForm.reset();
        });
      },
      (error) => {
        console.error('Error updating user details:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating user details. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          this.userForm.reset();
        });
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
}
