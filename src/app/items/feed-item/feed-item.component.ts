import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FeedItemComponent implements OnInit {
  post: any
  posts: any
  post__text: any
  constructor(
    private route: ActivatedRoute,
    private service: HttpService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.router.url)
    this.route.paramMap.subscribe(params => {
      let url = params.get('url');
      console.log(url)
      this.service.getPost(url)
        .subscribe(response => {
          this.post = response;
          this.titleService.setTitle(this.post.title)
          this.post__text = this.sanitizer.bypassSecurityTrustHtml(this.post.text);
        });
    })
    this.service.getPosts(5)
    .subscribe(response => {
      this.posts = response;
    });
  }

}
