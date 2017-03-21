import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';

import { Artist} from './artist';
import { Album} from './album';
import { SpotifyService } from './spotify.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit{
   
    constructor() {}
    ngOnInit(){
    }
    
}
