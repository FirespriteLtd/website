import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  $entries: Observable<any>;
  platforms: any;
  currentPanel:string;

  constructor(private knowledgeService: KnowledgeService) { }

  ngOnInit() {
    this.knowledgeService.getAllItems().subscribe();
    this.$entries =  this.knowledgeService.allItems$;

    this.knowledgeService.getAllPlatforms().pipe(take(1)).subscribe(value =>
      {
        this.platforms = value;
      }
    );
  }




  openGroup(event, index, platform){
    console.log('event', event, index)
    this.currentPanel = `${platform}-${index}`;
  }

}
