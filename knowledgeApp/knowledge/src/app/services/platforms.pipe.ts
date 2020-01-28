import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlatforms'
})
export class PlatformsPipe implements PipeTransform {

  transform(value: any[], platform:string): any {

    if(!platform || platform === 'all'){
      return value;
    }
    return value.filter(item => item.indexOf(platform) !== -1);
  }

}
