import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlatforms'
})
export class PlatformsPipe implements PipeTransform {

  transform(value: any[], platform:string): any {

    console.log('filter platform', value, platform,(!platform))

    if(!platform){
      return value;
    }
    console.log('Filtered:', value.filter(item => item.indexOf(platform) !== -1))
    return value.filter(item => item.indexOf(platform) !== -1);
  }

}
