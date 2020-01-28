import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGames'
})
export class GamesPipe implements PipeTransform {

  transform(value: any, game: any): any {
    if(!game){
      return value.filter(item => (item.game.indexOf('<no value>') !== -1 || (item.game.length === 0)) );
    }
    return value.filter(item => item.game.indexOf(game) !== -1);
  }

}
