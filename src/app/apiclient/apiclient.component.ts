

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../service/asset.service';
@Component({ selector: 'app-apiclient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apiclient.component.html',
  styleUrl: './apiclient.component.css'
})
 export class ApiclientComponent implements OnInit{
  assets:any[]=[];
  constructor(private assetservice:AssetService){}
  ngOnInit(): void {
    this.assets=this.assetservice.getAssets();
  }




  
  }