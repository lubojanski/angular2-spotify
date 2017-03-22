"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var spotify_service_1 = require("./spotify.service");
var TracksComponent = (function () {
    function TracksComponent(spotifyService, route, router) {
        this.spotifyService = spotifyService;
        this.route = route;
        this.router = router;
        this.searchTerms = new BehaviorSubject_1.BehaviorSubject('');
    }
    TracksComponent.prototype.searchTracks = function (term) {
        this.searchTerms.next(term);
        this.router.navigate(['/tracks'], { queryParams: { q: term } });
        console.log("poszlo" + this.relatedArtists);
    };
    TracksComponent.prototype.ngOnInit = function () {
        var _this = this;
        var urlParam = this.route.snapshot.queryParams['q'];
        if (urlParam) {
            this.searchTerms.next(urlParam);
        }
        this.tracks = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return term ?
            _this.spotifyService.searchTracks(term)
            :
                Observable_1.Observable.of([]); });
        this.relatedArtists = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return term ?
            _this.spotifyService.getRelatedArtists(term)
            :
                Observable_1.Observable.of([]); });
    };
    return TracksComponent;
}());
TracksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tracks',
        templateUrl: 'tracks.component.html',
        styleUrls: ['tracks.component.css']
    }),
    __metadata("design:paramtypes", [spotify_service_1.SpotifyService,
        router_1.ActivatedRoute,
        router_1.Router])
], TracksComponent);
exports.TracksComponent = TracksComponent;
//# sourceMappingURL=tracks.component.js.map