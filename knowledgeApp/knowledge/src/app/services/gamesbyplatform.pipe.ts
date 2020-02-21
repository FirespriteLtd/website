import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGamesByPlatform'
})
export class GamesbyplatformPipe implements PipeTransform {

  transform(value: any, platform): any {

    if(!platform){
      return value;
    }

   // console.log('Filter game by platform', value, platform,  value.filter(item => item.platforms.includes(platform)))

    return value.filter(item => item.platforms.includes(platform));
  }

}
