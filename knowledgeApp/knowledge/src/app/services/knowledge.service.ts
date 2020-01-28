import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  allItems$: BehaviorSubject<Array<any>> = new BehaviorSubject<any>([]);
  allItems: Array<any> = [];
  allPlatforms$: BehaviorSubject<Array<any>> = new BehaviorSubject<any>([]);
  allPlatforms: Array<any> = [];
  allGames$: BehaviorSubject<Array<any>> = new BehaviorSubject<any>([]);
  allGames: Array<any> = []

  constructor(
    private http: HttpClient
  ) { }

  getAllItems(){
    if(!this.allItems.length) {
      return this.http.get(`${environment.apiUrl}/knowledgebase/index.json`).pipe(
        map((value: any) => {
          this.allItems = value.data.items;
          this.allItems$.next(value.data.items);
          return value;
        }),
        map( (value:any) => {
          let platforms = [];
          value.data.items.forEach((i)=>{
            i.platforms.forEach((p) =>{
              if(!platforms.includes(p)){
                platforms.push(p);
              }
            })
          })
          this.allPlatforms$.next(platforms);
          return value;
        }),
        map( (value:any) => {
          let games = [];
          value.data.items.forEach((i)=>{
            if(i.game !== '<no value>' && i.game.length !== 0) {
              if (!games.includes(i.game)) {
                games.push(i.game);
              }
            }
          })
          this.allGames$.next(games);
          return value;
        } )

      );
    } else {
      this.allItems$.next(this.allItems);
      return of(this.allItems);
    }
  }

  getDetailContent(id){
    return this.http.get(`${environment.apiUrl}/${id}`).pipe(
      map( (value:any) => {
        return value.data.body;
      } )
    );
  }

}
