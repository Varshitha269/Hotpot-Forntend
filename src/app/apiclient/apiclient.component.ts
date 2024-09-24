

import { Component } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
@Component({ selector: 'app-apiclient',
  standalone: true,
  imports: [],
  templateUrl: './apiclient.component.html',
  styleUrl: './apiclient.component.css'
}) export class ApiclientComponent {
   users:any[] = [];
    constructor(private http:HttpClient){ }
     FetchUserData(){
       this.http.get('https://localhost:7121/api/MenuItem').subscribe((result:any)=>{ this.users=result; }); 
    } 
  }