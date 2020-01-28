import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent implements OnInit {

  platforms$: Observable<any>;
  games$: Observable<any>;

  searchForm: FormGroup;
  games: Array<any>;
  platforms: Array<any>;

  constructor(
    private knowledgeService: KnowledgeService,
    private formbuilder: FormBuilder
  ) {
      this.searchForm = this.createForm();
  }

  ngOnInit() {



    this.knowledgeService.getAllPlatforms().pipe(take(1)).subscribe(value =>
      {
        this.platforms = value;
      }
    );
    this.knowledgeService.getAllGames().pipe(take(1)).subscribe(value =>
      {
        this.games = value;
      }
    );

  }

  createForm(){
    const form = this.formbuilder.group({
      platforms: '',
      games: ''
    });
    form.controls['games'].setValue('all');
    form.controls['platforms'].setValue('all');
    return form;
  }

}
