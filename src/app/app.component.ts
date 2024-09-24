import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestruantpageComponent } from './restruantpage/restruantpage.component';
import { RestaurantCardsComponent } from './restaurantcards/restaurantcards.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,HeaderComponent,FooterComponent,RestaurantCardsComponent,RouterLink,RouterLinkActive,RestruantpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'HotPot';
  onInternNameSelection(name:any){
    const selectedIndex = name.target.selectedIndex;
    const selectedText = name.target.options[selectedIndex].text;
    alert(selectedText);
  }
}
