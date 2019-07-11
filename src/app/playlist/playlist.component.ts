import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  videos: Video[];
  currentVideoId: number;

  constructor(private videoService: VideoService, private messageService: MessageService) {
    this.messageService.getMessage().subscribe(message => {
      if (message.operate === 'reload') {
        this.getVideos();
      }
    });
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos.filter(video => video.approve === 'yes'));
    this.videoService.getHistories().subscribe(history => {
      if (history.length > 0) {
        this.currentVideoId = history[history.length - 1].videoId;
        this.videoService.getVideo(this.currentVideoId).subscribe(video => {
          this.messageService.sendMessage('video', video);
        });
      }
    });
  }

  onSelect(video: Video): void {
    this.messageService.sendMessage('video', video);
    this.currentVideoId = video.id;
  }
}
