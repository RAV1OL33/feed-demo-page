import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.sass']
})
export class FeedCardComponent implements OnInit {
  @Input() post: any
  date_format: string =''
  constructor() { }

  ngOnInit(): void {
    let date = this.post.publishedDate.split('T')[0].split('-')
    this.date_format= `${date[2]}.${date[1]}.${date[0]}`
  }

}
