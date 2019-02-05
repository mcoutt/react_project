import React from 'react';

import * as serviceWorker from './serviceWorker';


const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('802c9f63a55d4a1c82195500d1aa2956');
const API_KEY = '802c9f63a55d4a1c82195500d1aa2956';

export class NewsService {

    _apiBase = 'https://newsapi.org/v2';

    async getResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
    };

    async getTopHeadlines() {
        // To query /v2/top-headlines
        // All options passed to topHeadlines are optional, but you need to include at least one of them
        await newsapi.v2.topHeadlines({
            // sources: 'bbc-news,the-verge',
            // q: 'bitcoin',
            category: 'business',
            language: 'ru',
            country: 'ru'
        }).then(response => {
            return response.articles.forEach((data) => console.log(data.description));
            // return response;
            /*
              {
                status: "ok",
                articles: console.log(response)
              }
            */
        });
        // const res = await this.getResource(`${this._apiBase}/top-headlines?country=us&category=business&apiKey=${API_KEY}`)
        // return res.articles;
    }

    async getEverything(country) {
        const res = await this.getResource(`${this._apiBase}/top-headlines?country=${country}&apiKey=${API_KEY}`);
        return res.articles;
    }


}

const swapiNews = new NewsService();

// swapi.getAllnews().then((author) => {
//     author.forEach((a) => {
//         console.log(a.source.name)
//     })
// });
//
// swapi.getCountry('ru').then((res) => {
//     res.forEach((c) => {
//         console.log(c.source.name)
//     })
// });

// swapi.getTopHeadlines();



// serviceWorker.unregister();