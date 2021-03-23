import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NewsService } from '../news.service';
import { Article,TopHeadlinesResponse } from 'angular-news-api';


export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    public articles: Article[] = [];
    public search: string;

    isLoading = false;
    updatedResponse: NewsResponse;
    pages: number;
    totalResults = 0;
    currentPage = "";
    query = '';
    constructor(
        private newsServices: NewsService,
        private router: Router,
        private currentRoute: ActivatedRoute
    ) { }
    public ngOnInit() {
        this.fetchArticles();
    }


    private fetchArticles(search?: string): void {
        this.isLoading = true;
        this.newsServices
            .topHeadlines({ q: search })
            // .subscribe(data => console.log(data));
            .subscribe((response: TopHeadlinesResponse) => {
                this.updatedResponse = response;
                this.articles = response.articles;
                this.pages = Math.ceil(response.totalResults / 10);
                this.isLoading = false;
                this.totalResults = response.totalResults;
            });
        const onNavigationEnd = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        );
        onNavigationEnd.subscribe((event: NavigationEnd) => {
            const params = this.currentRoute.snapshot.queryParams;
            if (!params['q'] && !params['page']) {
                this.articles = this.updatedResponse.articles;
                this.totalResults = this.updatedResponse.totalResults;
            }
        });
    }

    onSearch(form: NgForm) {
        if (!form.value.q) {
            this.articles = this.updatedResponse.articles;
            this.totalResults = this.updatedResponse.totalResults;
            return;
        }
        this.router.navigate([], {
            relativeTo: this.currentRoute,
            queryParamsHandling: 'merge',
            queryParams: {
                q: form.value.q,
                page: 1
            }
        });

        this.isLoading = true;
        this.query = form.value.q;
        this.newsServices
            .topHeadlines({ q: this.query, page: this.currentPage })
            .subscribe((response: TopHeadlinesResponse) => {
                this.articles = response.articles;
                this.pages = Math.ceil(response.totalResults / 10);
                this.isLoading = false;
                this.totalResults = response.totalResults;
            });

        form.reset();
    }



}
