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
  userid:number=1040;

  constructor(private fb: FormBuilder,private userService: UserService) {
    this.userForm = this.fb.group({
      userID:[1028],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phNo:[''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      createdDate:[new Date()],
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

  if (!userdata.userID || userdata.userID <= 0) {
    console.error('Invalid UserID:', userdata.userID);
    alert('Please provide a valid User ID before updating.');
    return;
  }
    this.userService.updateUserDetails(userdata).subscribe(
      response=>{
        console.log('User details updated successfully:', response);
        
        alert('User details updated successfully!');
       
        this.userForm.reset();

      },
      (error) => {
        // Error callback
        console.error('Error Updating user details:', error);
        alert('An error occurred while updating user details. Please try again.');
        this.userForm.reset();
      });
  }
  deleteuserdetails()
      {
        this.userService.deleteUserDetails(this.userid).subscribe(
          response=>{
            console.log('User details deleted successfully:', response);
            
            alert('User details deleted successfully!');
           
            this.userForm.reset();
    
          },
          (error) => {
            // Error callback
            console.error('Error deleted user details:', error);
            alert('An error occurred while deleted user details. Please try again.');
            
          }

        );
       

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
