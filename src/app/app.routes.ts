import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RestruantpageComponent } from './restruantpage/restruantpage.component';

import { LoginComponent } from './login/login.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';

import { RestaurantCardsComponent } from './restaurantcards/restaurantcards.component';
import { RestaruantsComponent } from './restaruants/restaruants.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CartitemsComponent } from './cartitems/cartitems.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ListordersComponent } from './listorders/listorders.component';
import { ListpaymentsComponent } from './listpayments/listpayments.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { RestraruantDashboardComponent } from './restraruant-dashboard/restraruant-dashboard.component';
import { EditrestaruantaddressComponent } from './editrestaruantaddress/editrestaruantaddress.component';
import { RestaruantprofileComponent } from './restaruantprofile/restaruantprofile.component';
import { RratingsComponent } from './rratings/rratings.component';
import { ListrordersComponent } from './listrorders/listrorders.component';
import { OngoingordersComponent } from './ongoingorders/ongoingorders.component';
import { ReportComponent } from './report/report.component';
import { MenuComponent } from './menu/menu.component';
import { MenuitemsComponent } from './menuitems/menuitems.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminmanagementComponent } from './adminmanagement/adminmanagement.component';
import { AdminoverviewComponent } from './adminoverview/adminoverview.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { CustomeroverviewComponent } from './customeroverview/customeroverview.component';
import { MenumanagementComponent } from './menumanagement/menumanagement.component';
import { NgModule } from '@angular/core';
import { ReportsadminComponent } from './reportsadmin/reportsadmin.component';
import { OrderoverviewComponent } from './orderoverview/orderoverview.component';
import { MenuOverviewComponent } from './menuoverview/menuoverview.component';
import { RestuarantoverviewComponent } from './restuarantoverview/restuarantoverview.component';



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
        path: 'app-restruantpage/:id',
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
        path: 'app-footer',
        component: FooterComponent
    },
    {
        path: 'app-cartitems',
        component: CartitemsComponent
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
    },
    {
        path:'app-restraruant-dashboard',
        component:RestraruantDashboardComponent
    },
    {
        path:'app-editrestaruantaddress',
        component:EditrestaruantaddressComponent
    },
    {
        path:'app-restaruantprofile',
        component:RestaruantprofileComponent
    },
    {
        path:'app-rratings',
        component:RratingsComponent
    },
    {
        path:'app-listrorders',
        component:ListrordersComponent
    },
    {
        path:'app-ongoingorders',
        component:OngoingordersComponent
    },
    {
        path:'app-report',
        component:ReportComponent
    },
    {
        path:'app-menu',
        component:MenuComponent
    },
    {
        path:'app-menuitems',
        component:MenuitemsComponent
    },
    {
        path:'app-feedback/:id',
        component:FeedbackComponent
    },
    {path:'app-admindashboard', component:AdmindashboardComponent},
    {path:'app-adminmanagement', component:AdminmanagementComponent},
    {path:'app-adminoverview', component:AdminoverviewComponent},
    {path:'app-adminprofile', component:AdminprofileComponent},
    {path:'app-customeroverview', component:CustomeroverviewComponent},
    {path:'app-menumanagement', component:MenumanagementComponent},
    {path:'app-reportsadmin', component:ReportsadminComponent},
    {path:'app-orderoverview', component:OrderoverviewComponent},
    {path:'app-menuoverview', component:MenuOverviewComponent},
    {path:'app-restuarantoverview', component:RestuarantoverviewComponent},
    {
        path:'app-report', component:ReportComponent
    }

   
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
