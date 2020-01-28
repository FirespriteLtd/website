import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchUiComponent } from './components/search-ui/search-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { AccordionModule } from 'ngx-foundation';
import { ResultsDetailComponent } from './components/results/results-detail/results-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchUiComponent,
    ResultsComponent,
    ResultsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
