import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodcategory',
  standalone: true
})
export class FoodcategoryPipe implements PipeTransform {

  transform(value:any): string {
    if(!value||!value.Category)
    return "Unknown Category";
  else 
  return value.Category;
  }

}
