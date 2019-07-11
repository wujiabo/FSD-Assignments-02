import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const videos = [
      { id: 1, title: 'MiG-31: The Near-Space Plane.', url: 'https://www.youtube.com/watch?v=h_w_0zUs9ac', approve: 'yes' },
      { id: 2, title: 'The very Best Smart Watch', url: 'https://www.youtube.com/watch?v=_GpXYRcBZYc', approve: 'yes' },
      { id: 2, title: 'Chasing 300 - The World’s Fastest Motorcycle', url: 'https://www.youtube.com/watch?v=E8RpedLHvc4', approve: 'yes' },
      { id: 2, title: '21st Century Hackers - Documentary 2018', url: 'https://www.youtube.com/watch?v=koi54cPRlhQ', approve: 'yes' }
    ];
    return {videos};
  }

  genId(videos: Video[]): number {
    return videos.length > 0 ? Math.max(...videos.map(video => video.id)) + 1 : 11;
  }
}
