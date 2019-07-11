import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Video } from '../video';
import { MessageService } from '../message.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  video: Video;
  @ViewChild('player', { static: false }) videoRef: ElementRef;

  constructor(private videoService: VideoService, private messageService: MessageService) {
    this.messageService.getMessage().subscribe(message => {
      if (message.operate === 'reload') {
        this.video = new Video();
        this.video.url = '';
        this.videoRef.nativeElement.src = this.video.url;
      }
      if (message.operate === 'video') {
        this.video = message.video;
        this.videoRef.nativeElement.src = this.video.url;
      }
      if (message.operate === 'play') {
        this.videoPlay();
      }
      if (message.operate === 'pause') {
        this.videoPause();
      }
    });
  }


  ngOnInit() {
    this.initVideo();
  }

  initVideo(): void {
    this.video = new Video();
    this.video.url = '';
  }

  videoPlay(): void {
    this.videoRef.nativeElement.play();
  }

  videoPause(): void {
    this.videoRef.nativeElement.pause();
  }
}
