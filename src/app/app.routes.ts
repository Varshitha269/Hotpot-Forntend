import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RestruantpageComponent } from './restruantpage/restruantpage.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';

import { RestaurantCardsComponent } from './restaurantcards/restaurantcards.component';
import { RestaruantsComponent } from './restaruants/restaruants.component';

export const routes: Routes = [
    {
        path:'app-restaurantcards',
        component:RestaurantCardsComponent
    },
    {
        path:'app-restaruants',
        component:RestaruantsComponent
    },
    
    {
        path:'app-reactiveform',
        component:ReactiveformComponent
    },
    {
        path:'app-login',
        component:LoginComponent
    },

    {
        path:'app-header',
        component:HeaderComponent
    },
    {
        path:'app-test',
        component:TestComponent

    },
    {
        path:'app-footer',
        component:FooterComponent

    },
   
    {
        path:'app-restruantpage',
        component:RestruantpageComponent
    }
];
