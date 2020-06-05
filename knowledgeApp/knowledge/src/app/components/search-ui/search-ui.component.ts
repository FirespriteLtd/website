import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private formbuilder: FormBuilder,
    private router: ActivatedRoute
  ) {
      this.searchForm = this.createForm();
  }

  ngOnInit() {

    this.router.queryParams.subscribe(v => {
      console.log('router', v)
      if(v) {
        if(v.platforms) {
          this.searchForm.controls['platforms'].setValue(v.platforms)
        }
        if(v.games) {
          this.searchForm.controls['games'].setValue(v.games)
        }
      }
    })

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
      const filter = {platforms: {name: 'all', value: 'all'}, games: v.games};
      this.platforms.forEach(d => {
        if(d.value === v.platforms){
          filter.platforms = d;
        }
      })
      this.onSearch.emit(filter);
    })

    return form;
  }

}
