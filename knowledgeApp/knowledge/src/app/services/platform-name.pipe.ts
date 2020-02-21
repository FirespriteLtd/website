import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platformName'
})
export class PlatformNamePipe implements PipeTransform {

  transform(value: string): any {
    const s = value.replace('-', ' ');
    return s.charAt(0).toUpperCase() + s.substring(1);
  }

}
