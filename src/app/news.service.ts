import { Injectable } from '@angular/core';
import { NewsApiService } from 'angular-news-api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private newsApiService: NewsApiService) {}

    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */

     topHeadlines(data: any) {
         return this.newsApiService.topHeadlines({
             q: data.q,
             sources: data.sources,
             category: data.category,
             country: data.country,
             language: !!data.language ? data.language : 'en',
         });
       }
        

    getArticles(data: any) {
        return this.newsApiService.everything({
            page: data.page,
            q: data.q,
            language: 'en',
        });
    }
}
