import { Component, OnInit} from '@angular/core';
//, trigger, state, style, transition, group, animate 
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { SpotifyService } from './spotify.service';
import { Artist} from './artist';
import { Album} from './album';
import { Track} from './track';

@Component({
    moduleId: module.id,
    selector: 'albums',
    templateUrl: 'albums.component.html',
    styleUrls: ['albums.component.css']
})
export class AlbumsComponent implements OnInit {
    constructor(
        private spotifyService: SpotifyService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    albums: Observable<Album[]>;
    albumsTemp: Album[];
    albumTracks: Track[];
    selectedAlbum: Album;
    private searchTerms = new BehaviorSubject<string>('');
    
    
    searchAlbums(term: string) { 
        console.log(term);
        this.searchTerms.next(term);
    this.router.navigate(['/albums'], {queryParams: { q: term}});
    }

    showTracks(album: any){
        this.spotifyService.getAlbumTracks(album)
        .subscribe( track => this.albumTracks = track) ;
    }
    onSelect(album: Album): void {
        this.selectedAlbum!=album ?
        this.selectedAlbum = album :
        this.selectedAlbum = null;
    }


    ngOnInit() { 
        let urlParam = this.route.snapshot.queryParams['q'];

        if(urlParam){
            this.searchTerms.next(urlParam);
        }

        this.albums = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( term => term ?
        this.spotifyService.searchAlbums(term)
        :
        Observable.of<Album[]>([]));

        


    }
}