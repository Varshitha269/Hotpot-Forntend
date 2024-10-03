
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { ListordersComponent } from '../listorders/listorders.component';
import { ListpaymentsComponent } from '../listpayments/listpayments.component';
import { ChangeAddressComponent } from '../change-address/change-address.component';
import { PayloadService } from '../service/payload.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [FormsModule,CommonModule,EditprofileComponent,ListordersComponent,ListpaymentsComponent,ChangeAddressComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UserprofileComponent {
  currentSection: string = 'editProfile'; // Default section to display

  displaySection(section: string): void {
    this.currentSection = section;
  }
constructor(private payload:PayloadService,private router:Router){}
  logout(): void {
    this.payload.logout();
  }
  

}
