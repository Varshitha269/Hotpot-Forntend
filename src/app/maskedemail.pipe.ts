import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskedemail',
  standalone: true
})
export class MaskedemailPipe implements PipeTransform {

  transform(value:string): string {
    if(!value) return "";
    const [localPart, domain] = value.split("@");
    const maskedLocalPart = localPart.length > 2 
        ? localPart[0] + "*".repeat(localPart.length - 2) + localPart[localPart.length - 1]
        : localPart;
        return `${maskedLocalPart}@${domain}`;
      
  }

}
