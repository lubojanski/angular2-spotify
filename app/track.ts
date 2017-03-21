import {Artist} from './artist';

export class Track {
  constructor(
    public id: number,
    public name: string,
    public track_number: number,
    public preview_url: string,
    artists: Artist[]
  ) {  }
}