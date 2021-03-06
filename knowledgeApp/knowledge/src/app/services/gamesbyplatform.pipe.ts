import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGamesByPlatform'
})
export class GamesbyplatformPipe implements PipeTransform {

  transform(value: any, platform): any {
    if(!platform || platform === 'all'){
      return  value.filter(item => item.platforms.length === 0);
    }

    return value.filter(item => item.platforms.includes(platform));
  }

}
