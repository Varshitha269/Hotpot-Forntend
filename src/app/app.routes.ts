import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RestruantpageComponent } from './restruantpage/restruantpage.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';

import { RestaurantCardsComponent } from './restaurantcards/restaurantcards.component';
import { RestaruantsComponent } from './restaruants/restaruants.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CartitemsComponent } from './cartitems/cartitems.component';
import { ApiclientComponent } from './apiclient/apiclient.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ListordersComponent } from './listorders/listorders.component';
import { ListpaymentsComponent } from './listpayments/listpayments.component';
import { ChangeAddressComponent } from './change-address/change-address.component';

export const routes: Routes = [
    {
        path: '',
        component: RestaurantCardsComponent
    },
    {
        path: 'app-restaruants/:name',
        component: RestaruantsComponent
    },
    {
        path: 'app-restruantpage/:rname',
        component: RestruantpageComponent
    },
    {
        path: 'app-reactiveform',
        component: ReactiveformComponent
    },
    {
        path: 'app-contact',
        component: ContactComponent
    },
    {
        path: 'app-about',
        component: AboutComponent
    },
    {
        path: 'app-login',
        component: LoginComponent
    },
    {
        path: 'app-header',
        component: HeaderComponent
    },
    {
        path: 'app-test',
        component: TestComponent
    },
    {
        path: 'app-footer',
        component: FooterComponent
    },
    {
        path: 'app-cartitems',
        component: CartitemsComponent
    },
    {
        path: 'app-apiclient',
        component: ApiclientComponent
    },
    {
        path: 'app-userprofile',
        component:UserprofileComponent
        
    },
    {
        path:'app-editprofile',
        component:EditprofileComponent
    },
    {
        path:'app-listorders',
        component:ListordersComponent
    },
    {
        path:'app-listpayments',
        component:ListpaymentsComponent
    },
    {
        path:'app-change-address',
        component:ChangeAddressComponent
    }
   
];
