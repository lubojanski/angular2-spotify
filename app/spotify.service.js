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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var SpotifyService = (function () {
    function SpotifyService(http) {
        this.http = http;
        this.baseUrl = 'https://api.spotify.com/v1/';
    }
    SpotifyService.prototype.searchTracks = function (term) {
        return this.http.get(this.baseUrl + 'search?q=artist:' + term + '&type=track')
            .map(function (res) { return res.json().tracks.items; });
    };
    SpotifyService.prototype.searchAlbums = function (term) {
        return this.http.get(this.baseUrl + 'search?q=' + term + '&type=album')
            .map(function (res) { return res.json().albums.items; });
    };
    SpotifyService.prototype.getAlbumTracks = function (term) {
        return this.http.get(term)
            .map(function (res) { return res.json().tracks.items; });
    };
    SpotifyService.prototype.getRelatedArtists = function (term) {
        var _this = this;
        var artistID = this.http.get(this.baseUrl + 'search?q=' + term + '&type=artist&offset=0&limit=1')
            .map(function (res) { return res.json().artists.items[0].id; });
        return artistID.switchMap(function (id) { return _this.http.get(_this.baseUrl + 'artists/' + id + '/related-artists')
            .map(function (res) { return res.json().artists; }); });
    };
    return SpotifyService;
}());
SpotifyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SpotifyService);
exports.SpotifyService = SpotifyService;
//# sourceMappingURL=spotify.service.js.map