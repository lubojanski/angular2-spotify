import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }        from 'rxjs/Subject';

import { SpotifyService } from './spotify.service';
import { Artist} from './artist';
import { Album} from './album';
import {Track} from './track';


@Component({
    moduleId: module.id,
    selector: 'tracks',
    templateUrl: 'tracks.component.html',
    styleUrls: ['tracks.component.css']
})
export class TracksComponent implements OnInit {
    constructor(
        private spotifyService: SpotifyService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    tracks: Observable<Track[]>;
    relatedArtists: Observable<Artist[]>;
    private searchTerms = new Subject<string>();
    
    searchTracks(term: string) { 
        this.searchTerms.next(term);
        this.router.navigate(['/tracks'], { queryParams: { q : term}});
        console.log("poszlo"+this.relatedArtists);
    }

    ngOnInit() { 
        let urlParam = this.route.snapshot.queryParams['q'];
        if(urlParam){
            setTimeout( () => {
                this.searchTerms.next(urlParam);
            }, 0);
        }

        this.tracks = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( term => term ?
        this.spotifyService.searchTracks(term)
        :
        Observable.of<Track[]>([]));

        this.relatedArtists = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( term => term ?
        this.spotifyService.getRelatedArtists(term)
        :
        Observable.of<Artist[]>([]));
    }
}