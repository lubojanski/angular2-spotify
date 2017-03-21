import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import  { Artist }      from './artist';
import  { Album }      from './album';
import  { Track }      from './track';

@Injectable()
export class SpotifyService {
    private baseUrl = 'https://api.spotify.com/v1/'; 

    constructor(private http: Http) { }
   
    searchTracks(term:string){
        return this.http.get(this.baseUrl+'search?q=artist:'+term+'&type=track')
        .map(res => res.json().tracks.items as Track[]);
    }

    searchAlbums(term:string){
        return this.http.get(this.baseUrl+'search?q='+term+'&type=album')
        .map(res => res.json().albums.items as Album[]);
    }
    getAlbumTracks(term: string){
        return this.http.get(term)
        .map(res =>  res.json().tracks.items as Track[]);
    }

    getRelatedArtists(term:string){

        let artistID: Observable<string> = this.http.get(this.baseUrl+'search?q='+term+'&type=artist&offset=0&limit=1')
        .map(res => res.json().artists.items[0].id as string);

        return artistID.switchMap( id => this.http.get(this.baseUrl+'artists/'+id+'/related-artists')
        .map( res => res.json().artists as Artist[]));

    }
    

}
