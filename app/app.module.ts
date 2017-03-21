import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }  from './app.component';
import {TracksComponent} from './tracks.component';
import {AlbumsComponent} from './albums.component';
import { SpotifyService } from './spotify.service';

import './rxjs-extensions';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TracksComponent,
    AlbumsComponent
  ],
  providers: [
    SpotifyService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 


  
}