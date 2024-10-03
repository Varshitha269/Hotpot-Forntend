import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ReportsadminComponent } from '../reportsadmin/reportsadmin.component';
import { CustomeroverviewComponent } from '../customeroverview/customeroverview.component';
import { RestuarantoverviewComponent } from '../restuarantoverview/restuarantoverview.component';
import { MenumanagementComponent } from '../menumanagement/menumanagement.component';
import { MenuOverviewComponent } from '../menuoverview/menuoverview.component';
import { ReportComponent } from '../report/report.component';
import { PayloadService } from '../service/payload.service';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterLink, RouterModule,CommonModule,FormsModule,ReportsadminComponent,CustomeroverviewComponent,RestuarantoverviewComponent
    ,MenumanagementComponent,MenuOverviewComponent,ReportComponent
  ],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent  {

  constructor(private payload:PayloadService){
  }

  currentSection: string = 'reports'; // Default section

  displaySection(section: string): void {
    this.currentSection = section;
  }
  

  logout(): void {
    this.payload.logout();
    
  }
}