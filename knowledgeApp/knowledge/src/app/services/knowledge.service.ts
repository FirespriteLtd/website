import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  constructor(
    private http: HttpClient
  ) { }

  getAllItems(){
    console.log('test', environment)
    return this.http.get(`${environment.apiUrl}/index.json`).pipe(
      map( (value) => {
        console.log('all items', value);
        return value;
      } )
    );
  }

  getAllPlatforms(){
    return this.http.get(`${environment.apiUrl}/index.json`).pipe(
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
    return this.http.get(`${environment.apiUrl}/index.json`).pipe(
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

}
