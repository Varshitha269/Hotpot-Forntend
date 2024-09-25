import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditrestaruantaddressComponent } from '../editrestaruantaddress/editrestaruantaddress.component';
import { RestaruantprofileComponent } from '../restaruantprofile/restaruantprofile.component';
import { RratingsComponent } from '../rratings/rratings.component';
import { ListrordersComponent } from '../listrorders/listrorders.component';
import { OngoingordersComponent } from '../ongoingorders/ongoingorders.component';

@Component({
  selector: 'app-restraruant-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,EditrestaruantaddressComponent,RestaruantprofileComponent,RratingsComponent,ListrordersComponent,OngoingordersComponent],
  templateUrl: './restraruant-dashboard.component.html',
  styleUrl: './restraruant-dashboard.component.css'
})
export class RestraruantDashboardComponent {
  currentSection: string = 'reports'; // Default section

  displaySection(section: string): void {
    this.currentSection = section;
  }

  logout(): void {
    console.log('Logging out...');
    // Implement logout logic here
  }

}
