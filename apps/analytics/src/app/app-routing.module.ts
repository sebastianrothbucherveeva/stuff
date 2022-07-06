import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PageStatsComponent } from './views/page-stats/page-stats.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'page/:pageID',
    component: PageStatsComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Contains all the routes of the application
 */
export class AppRoutingModule {}
