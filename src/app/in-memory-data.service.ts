import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const videos = [
      { id: 1, title: 'mov01', url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4', approve: 'yes', likes: 0, unlikes: 0 },
      { id: 2, title: 'mov02', url: 'http://www.w3school.com.cn/i/movie.ogg', approve: 'yes', likes: 0, unlikes: 0 }
    ];
    return { videos };
  }

  genId(videos: Video[]): number {
    return videos.length > 0 ? Math.max(...videos.map(video => video.id)) + 1 : 11;
  }
}
