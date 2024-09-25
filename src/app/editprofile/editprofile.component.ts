import { CommonModule} from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, 
    ReactiveFormsModule
   ],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditprofileComponent implements OnInit {
  userForm: FormGroup;
  currentStep: number = 1;

  constructor(private fb: FormBuilder,private userService: UserService) {
    this.userForm = this.fb.group({
      // userID:[1028],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phNo:[''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      role:['user'],
      isActive:[true]
      
    });
  }


  Adduserdetails(){

    const userdata=this.userForm.value;
    this.userService.addUserDetails(userdata).subscribe(
      (response)=>{
        console.log('User details Added successfully:', response);
        
        alert('User details Added successfully!');
       
        this.userForm.reset();

      },
      (error) => {
        // Error callback
        console.error('Error adding user details:', error);
        alert('An error occurred while adding user details. Please try again.');
        this.userForm.reset();
      }
    );
  }

  updateuserdetails(){

    const userdata=this.userForm.value;
    this.userService.updateUserDetails(userdata).subscribe(
      response=>{
        console.log('User details updated successfully:', response);
        
        alert('User details updated successfully!');
       
        this.userForm.reset();

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

 
 
}
