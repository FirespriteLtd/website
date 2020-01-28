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

  constructor(
    private http: HttpClient
  ) { }

  getAllItems(){
    console.log('test', environment)
    if(!this.allItems.length) {
      return this.http.get(`${environment.apiUrl}/knowledgebase/index.json`).pipe(
        map((value: any) => {
          console.log('all items', value);
          this.allItems = value.data.items;
          this.allItems$.next(value.data.items);
          return value;
        })
      );
    } else {
      this.allItems$.next(this.allItems);
      return of(this.allItems);
    }
  }

  getAllPlatforms(){
    return this.http.get(`${environment.apiUrl}/knowledgebase/index.json`).pipe(
      map( (value:any) => {
        let platforms = [];
        value.data.items.forEach((i)=>{
          i.platforms.forEach((p) =>{
            if(!platforms.includes(p)){
              platforms.push(p);
            }
          })
        })
        return platforms;
      } )
    );
  }


  getAllGames(){
    return this.http.get(`${environment.apiUrl}/knowledgebase/index.json`).pipe(
      map( (value:any) => {
        let platforms = [];
        value.data.items.forEach((i)=>{
          console.log('i', i.game)
          if(!platforms.includes(i.game)){
            platforms.push(i.game);
          }
        })
        return platforms;
      } )
    );
  }

  getDetailContent(id){
    return this.http.get(`${environment.apiUrl}/${id}`).pipe(
      map( (value:any) => {
        console.log('value', value.data.body)
        return value.data.body;
      } )
    );
  }

}
