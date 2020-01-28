import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

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
    this.knowledgeService.allPlatforms$.subscribe(value =>
      {
        this.platforms = value;
      }
    );
    this.knowledgeService.allGames$.subscribe(value =>
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

    form.valueChanges.subscribe(v => {
        this.onSearch.emit(v);
    })

    return form;
  }

}
