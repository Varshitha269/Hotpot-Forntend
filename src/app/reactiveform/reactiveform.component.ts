import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormControl,FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent implements OnInit {
  userForm!:FormGroup
  ngOnInit(): void {
    this.userForm=new FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      password:new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$')])
      });
  }
 
  onSubmit()
  {
    if(this.userForm.valid)
    {
      alert('Form Submitted:'+this.userForm.value);
    }
    else{
      alert('Form is Invalid');
    }
  }

}
