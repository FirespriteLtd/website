import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlatforms'
})
export class PlatformsPipe implements PipeTransform {

  transform(value: any[], platform:any): any {

    if(!platform.value || platform.value === 'all'){
      return value;
    }
    return value.filter(item => item.value.indexOf(platform.value) !== -1);
  }

}
