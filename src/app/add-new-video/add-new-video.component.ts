import { Component, OnInit } from '@angular/core';

import { Video } from '../video';
import { VideoService } from '../video.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-new-video',
  templateUrl: './add-new-video.component.html',
  styleUrls: ['./add-new-video.component.css']
})
export class AddNewVideoComponent implements OnInit {
  videos: Video[];
  selectedVideo: Video;

  constructor(private videoService: VideoService, private messageService: MessageService) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos);
  }
  onSelect(video: Video): void {
    this.selectedVideo = JSON.parse(JSON.stringify(video));
  }

  add(title: string, url: string): void {
    title = title.trim();
    url = url.trim();
    if (!title) { return; }
    if (!url) { return; }
    this.videoService.addVideo({ title, url } as Video)
      .subscribe(video => {
        this.videos.push(video);
      });
    this.messageService.sendMessage('reload', null);
  }

  delete(video: Video): void {
    this.videos = this.videos.filter(h => h !== video);
    this.videoService.deleteVideo(video).subscribe();
    this.messageService.sendMessage('reload', null);
  }

  edit(): void {
    const id = this.selectedVideo.id;
    const title = this.selectedVideo.title;
    const url = this.selectedVideo.url;
    const approve = 'no';
    if (!title) { return; }
    if (!url) { return; }
    this.videoService.updateVideo({ id, title, url, approve } as Video).subscribe();
    this.getVideos();
    this.selectedVideo = null;
    this.messageService.sendMessage('reload', null);
  }

  cancelEdit(): void {
    this.selectedVideo = null;
  }

  approve(video: Video): void {
    video.approve = 'yes';
    this.videoService.updateVideo(video).subscribe();
    this.messageService.sendMessage('reload', null);
  }
}
