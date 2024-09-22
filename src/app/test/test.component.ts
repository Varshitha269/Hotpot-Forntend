import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, PercentPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable,interval,map } from 'rxjs';
import { MaskedemailPipe } from '../maskedemail.pipe';
import { FoodcategoryPipe } from '../foodcategory.pipe';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [UpperCasePipe,DatePipe,CurrencyPipe,JsonPipe,AsyncPipe,MaskedemailPipe,PercentPipe,SlicePipe,FoodcategoryPipe],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  name:string='Sunil';
  today:Date=new Date();
  currencyinr:number=123.456;
  currencyusd:number=1200.33;
  currentTime:Observable<Date>=new Observable<Date>();
  email:string='sunilganeshreddy@gmail.com';
  per:number=0.123456;
  array:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  Intern:any={
    Id:2,
    name:'sunil',
    city:'Tirupati'
  }

  Food:any={
    name:'Dosa',
    Category:'Breakfast',
    Restaruant:'Restaruant1'
  }
  constructor()
  {
    this.currentTime=interval(1000).pipe(map(()=>new Date()));
  }
}
