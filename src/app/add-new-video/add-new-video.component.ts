import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  warningMessage: string;
  private _warning = new Subject<string>();

  constructor(private videoService: VideoService, private messageService: MessageService) { }

  ngOnInit() {
    this._warning.subscribe((message) => this.warningMessage = message);
    this._warning.pipe(
      debounceTime(3000)
    ).subscribe(() => this.warningMessage = null);
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
    if (!title) {
      this._warning.next(`Title is empty.`);
      return;
    }
    if (!url) {
      this._warning.next(`Url is empty.`);
      return;
    }
    if (!this.isURL(url)) {
      this._warning.next(`Url is not correct.`);
      return;
    }
    const likes = 0;
    const unlikes = 0;
    this.videoService.addVideo({ title, url, likes, unlikes } as Video)
      .subscribe(video => {
        this.videos.push(video);
        this.messageService.sendMessage('reload', null);
      });
  }

  delete(video: Video): void {
    this.videos = this.videos.filter(h => h !== video);
    this.videoService.deleteVideo(video).subscribe(res => {
      this.messageService.sendMessage('reload', null);
    });
  }

  edit(): void {
    const id = this.selectedVideo.id;
    const title = this.selectedVideo.title;
    const url = this.selectedVideo.url;
    const approve = 'no';
    if (!title) {
      this._warning.next(`Title is empty.`);
      return;
    }
    if (!url) {
      this._warning.next(`Url is empty.`);
      return;
    }
    if (!this.isURL(url)) {
      this._warning.next(`Url is not correct.`);
      return;
    }
    this.videoService.updateVideo({ id, title, url, approve } as Video).subscribe(res => {
      this.getVideos();
      this.selectedVideo = null;
      this.messageService.sendMessage('reload', null);
    });
  }

  cancelEdit(): void {
    this.selectedVideo = null;
  }

  approve(video: Video): void {
    video.approve = 'yes';
    this.videoService.updateVideo(video).subscribe(res => {
      this.messageService.sendMessage('reload', null);
    });
  }

  isURL(url: string): boolean {
    const strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
    const re = new RegExp(strRegex);
    if (re.test(url)) {
      return (true);
    } else {
      return (false);
    }
  }
}
