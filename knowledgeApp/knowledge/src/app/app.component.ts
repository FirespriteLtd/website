import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/services/knowledge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'knowledge';

  constructor(private knowledgeService: KnowledgeService) {
  }

  ngOnInit(): void {

    this.knowledgeService.getAllItems().subscribe(v=> {
      console.log('my data', v);
    })

  }


}
