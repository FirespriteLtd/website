import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platformName'
})
export class PlatformNamePipe implements PipeTransform {

  transform(value: string): any {
    return value.replace('-', ' ');
  }

}
