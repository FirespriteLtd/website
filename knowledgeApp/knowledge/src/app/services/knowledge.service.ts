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

}
