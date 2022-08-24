import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedCardComponent } from './items/feed-card/feed-card.component';
import { FeedContainerComponent } from './items/feed-container/feed-container.component';
import { FeedItemComponent } from './items/feed-item/feed-item.component';

const routes: Routes = [
  
  {path: 'avto-novosti/:url', component: FeedItemComponent},
  {path: '', component: FeedContainerComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
