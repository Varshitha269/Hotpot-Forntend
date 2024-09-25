import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private assets: any =[
    {id:1,name:'Asset 1',price:200},
    {id:2,name:'Asset 2',price:200},
    {id:3,name:'Asset 3',price:300},
    {id:4,name:'Asset 4',price:400}
  ];
  getAssets()
  {
    return this.assets;
  }
}
