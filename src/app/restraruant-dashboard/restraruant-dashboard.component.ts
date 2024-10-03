import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditrestaruantaddressComponent } from '../editrestaruantaddress/editrestaruantaddress.component';
import { RestaruantprofileComponent } from '../restaruantprofile/restaruantprofile.component';
import { RratingsComponent } from '../rratings/rratings.component';
import { ListrordersComponent } from '../listrorders/listrorders.component';
import { OngoingordersComponent } from '../ongoingorders/ongoingorders.component';
import { ReportComponent } from '../report/report.component';
import { PayloadService } from '../service/payload.service';
import { MenuComponent } from '../menu/menu.component';
import { MenuitemsComponent } from '../menuitems/menuitems.component';


@Component({
  selector: 'app-restraruant-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,EditrestaruantaddressComponent,RestaruantprofileComponent,RratingsComponent,ListrordersComponent,OngoingordersComponent,ReportComponent,MenuComponent,MenuitemsComponent],
  templateUrl: './restraruant-dashboard.component.html',
  styleUrl: './restraruant-dashboard.component.css'
})
export class RestraruantDashboardComponent {

  name:string| null='';
  constructor(private payload:PayloadService){
    this.name=this.payload.extractRestaurantName()
  }

  currentSection: string = 'reports'; // Default section

  displaySection(section: string): void {
    this.currentSection = section;
  }
  

  logout(): void {
    this.payload.logout();
    
  }

}
