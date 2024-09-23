import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
    
  };

  onSubmit(contactForm: NgForm) {
    if (contactForm.form.valid) {
      alert(`Hii ${this.contact.fullName} !! Thank You for contacting Us....!!!!`);
      contactForm.resetForm();
    } 
    else {
      alert('Please fill in all the required fields');
    }
  }

}
