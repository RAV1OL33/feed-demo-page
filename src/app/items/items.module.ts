import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedContainerComponent } from './feed-container/feed-container.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedCardComponent } from './feed-card/feed-card.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    FeedContainerComponent,
    FeedItemComponent,
    FeedCardComponent
  ],
  imports: [
    InfiniteScrollModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ]
})
export class ItemsModule { }
