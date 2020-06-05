import { Component, Input, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() set search(data){
    console.log('SEARCH', data)
    if(data) {
      this.filterGame = data.games;
      this.filterPlatform = data.platforms;
    }
  }

  $entries: Observable<any>;
  platforms: any;
  currentPanel:string;

  filterGame: string = 'all';
  filterPlatform: any = {name: 'all', value: 'all'};

  constructor(private knowledgeService: KnowledgeService) { }

  ngOnInit() {
    this.$entries =  this.knowledgeService.allItems$;
    this.knowledgeService.allPlatforms$.subscribe(value =>
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
