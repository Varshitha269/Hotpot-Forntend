import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestruantpageComponent } from './restruantpage/restruantpage.component';
import { RestaurantCardsComponent } from './restaurantcards/restaurantcards.component';
import { PayloadService } from './service/payload.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,HeaderComponent,FooterComponent,RestaurantCardsComponent,RouterLink,RouterLinkActive,RestruantpageComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit{
  title = 'HotPot';
  isAdminOrRestaurant: boolean = false;
  constructor(private payloadService: PayloadService) {}
  ngOnInit() {
    this.payloadService.userRole$.subscribe(role => {
      this.isAdminOrRestaurant = role === 'Admin' || role === 'Restaurant';
    });
  }
  onInternNameSelection(name:any){
    const selectedIndex = name.target.selectedIndex;
    const selectedText = name.target.options[selectedIndex].text;
    alert(selectedText);
  }
}
