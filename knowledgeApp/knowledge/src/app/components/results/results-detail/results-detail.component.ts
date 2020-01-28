import { Component, Input, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.scss']
})
export class ResultsDetailComponent implements OnInit {

  @Input() id: string;
  @Input() set active(v){
    if(v){
     console.log('load now');
      this.getDetailContent(this.id)
    }
    this._active = v;
  };

  _active: boolean;
  _content: string;

  constructor(private knowledgeService: KnowledgeService) { }

  ngOnInit() {
  }

  getDetailContent(id){
    if(!this._content) {
      this.knowledgeService.getDetailContent(id).pipe(take(1)).subscribe(v => {
        this._content = v;
      });
    }
  }

}
