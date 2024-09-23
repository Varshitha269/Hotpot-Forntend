import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restruantpage',
  standalone: true,
  imports: [],
  templateUrl: './restruantpage.component.html',
  styleUrl: './restruantpage.component.css'
})
export class RestruantpageComponent {
  restarauntName:string="";
  constructor(private activatedroute:ActivatedRoute )
  {
    this.activatedroute.params.subscribe((res:any)=>{
      this.restarauntName=res.rname;


    })

  }

}
