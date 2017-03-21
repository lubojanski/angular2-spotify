import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {TracksComponent} from './tracks.component';
import {AlbumsComponent} from './albums.component';



const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/albums',
    pathMatch: 'full' 
  },
  {
    path: 'tracks',
    component: TracksComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}