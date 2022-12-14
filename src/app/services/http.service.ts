import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class HttpService{
    private url = 'https://webapi.autodoc.ru/api/news/1/10';

    constructor(private http: HttpClient){ }
      
    getPosts(page:any){
      console.log(`https://webapi.autodoc.ru/api/news/1/${page}`)
      return this.http.get(`https://webapi.autodoc.ru/api/news/1/${page}`)
    }
    getPost(url:any){
      console.log(`https://webapi.autodoc.ru/api/news/item${url}`)
      return this.http.get(`https://webapi.autodoc.ru/api/news/item${url}`)
    }
}
