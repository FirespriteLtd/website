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
import { PlatformsPipe } from './services/platforms.pipe';
import { GamesPipe } from './services/games.pipe';
import { GamesbyplatformPipe } from './services/gamesbyplatform.pipe';
import { PlatformNamePipe } from './services/platform-name.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SearchUiComponent,
    ResultsComponent,
    ResultsDetailComponent,
    PlatformsPipe,
    GamesPipe,
    GamesbyplatformPipe,
    PlatformNamePipe
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
