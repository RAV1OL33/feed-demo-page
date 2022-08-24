import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.sass']
})
export class FeedContainerComponent implements OnInit {

  constructor(private service: HttpService, private formBuilder: FormBuilder) { }
  // @ts-ignore
  @ViewChild('fileInput') fileInput:ElementRef;

 
  feedGroup: any
  created_posts: any[] = []
  posts: any
  base64Output: string = ''
  pages = 10

  test = false

  ngOnInit() {
    this.created_posts = JSON.parse(localStorage.getItem('created_posts') || '[]')
    this.service.getPosts(this.pages)
      .subscribe(response => {
        this.posts = response;
      });
    this.feedGroup = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(35)])],
      description: ['', Validators.required],
    })
  }

  onScroll(): void {
    this.pages += 10
    this.service.getPosts(this.pages)
      .subscribe(response => {
        this.posts = response;
      });

  }
  resetSelectedFile(){
    this.fileInput.nativeElement.value = null
  }
  onSubmit() {
    console.log('onSubmit')
    let res = {
      title: this.feedGroup.value.title,
      description: this.feedGroup.value.description,
      publishedDate: `${formatDate(new Date(), 'yyyy-MM-dd', 'en-US')}T00:00:00`,
      titleImageUrl: `data:image/jpeg;base64,${this.base64Output}`
    }
    this.created_posts.unshift(res)
    console.log(this.created_posts)
    localStorage.setItem('created_posts', JSON.stringify(this.created_posts))
    this.feedGroup.reset()
  }

  onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64
    })
    console.log(this.base64Output)
  }
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1)
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (event) => {
      if (event.target != null && event.target.result != null) {
        result.next(btoa(event.target.result.toString()))
      }
    }
    return result
  }
  get title() {
    return this.feedGroup.get('title')
  }
  get description() {
    return this.feedGroup.get('description')
  }
}
