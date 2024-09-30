import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormControl,FormGroup,FormsModule, ReactiveFormsModule, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent implements OnInit {
  signupForm!: FormGroup; // FormGroup for the reactive form

  constructor(private fb: FormBuilder,private router: Router,private userService: UserService) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validators
    this.signupForm = this.fb.group({

      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phNo:[''],
      addressLine: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      country: [''],
      createdDate:[new Date().toISOString()],
      role:['user'],
      isActive:[true],
      //terms: [false, [Validators.requiredTrue]] // Terms checkbox validation
    });
  }
  navigateTologinAccount()
  {
    this.router.navigate(['/app-login']);

  }

  Adduserdetails(){

    const userdata=this.signupForm.value;
    console.log('Form Data:', userdata);
    this.userService.addUserDetails(userdata).subscribe(
      (response)=>{
        console.log('User details Added successfully:', response);
        
        this.navigateTologinAccount()
       
        this.signupForm.reset();

      },
      (error) => {
        // Error callback
        console.error('Error adding user details:', error);
        alert('An error occurred while adding user details. Please try again.');
        //this.signupForm.reset();
      }
    );
  }

  // Submit handler
  onSubmit() {
    if (this.signupForm.valid) {
     this.Adduserdetails();
    } else {
      console.log('Form is invalid');
    }
  }
}
