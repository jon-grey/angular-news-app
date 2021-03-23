import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatProgressBarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';

import { NgnewsModule } from 'angular-news-api';
import { NewsApiKeyConfig } from 'angular-news-api';
import { SharedModule } from './shared';


const newsApiKey = '6aab955601ae425d9c7ad00e4a2ae51b';

 
const newsApiConfig: NewsApiKeyConfig = {
    key: newsApiKey,
  };

@NgModule({
    declarations: [
        AppComponent,
        NewsDetailComponent,
        NewsComponent
    ],
    imports: [
        NgnewsModule.forRoot(newsApiConfig),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
