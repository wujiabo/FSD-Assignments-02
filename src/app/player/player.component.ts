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
      if (message.operate === 'plus') {
        this.videoPlus();
      }
      if (message.operate === 'minus') {
        this.videoMinus();
      }
      if (message.operate === 'refresh') {
        this.videoRefresh();
      }
      if (message.operate === 'muted') {
        this.videoMuted();
      }
      if (message.operate === 'thumbsUp') {
        this.videoThumbsUp();
      }
      if (message.operate === 'thumbsDown') {
        this.videoThumbsDown();
      }
    });
  }


  ngOnInit() {
    this.initVideo();
  }

  ngAfterViewInit() {
    this.videoRef.nativeElement.addEventListener('ended', () => {
      this.messageService.sendMessage('ended', this.video);
    });
    this.videoRef.nativeElement.addEventListener('timeupdate', () => {
      let pValue: number = 0;
      if (isNaN(this.videoRef.nativeElement.duration)) {
        pValue = 0;
      } else {
        pValue = Math.round((this.videoRef.nativeElement.currentTime / this.videoRef.nativeElement.duration) * 100);
      }
      this.video.percent = pValue;
      this.messageService.sendMessage('percent', this.video);
    });
  }

  initVideo(): void {
    this.video = new Video();
    this.video.url = '';
  }

  videoPlay(): void {
    this.videoRef.nativeElement.play();
    this.videoService.addHistory(this.video.id).subscribe();
  }

  videoPause(): void {
    this.videoRef.nativeElement.pause();
  }

  videoPlus(): void {
    if (this.videoRef.nativeElement.volume <= 0.9) {
      this.videoRef.nativeElement.volume = this.videoRef.nativeElement.volume + 0.1;
    }
  }

  videoMinus(): void {
    if (this.videoRef.nativeElement.volume >= 0.1) {
      this.videoRef.nativeElement.volume = this.videoRef.nativeElement.volume - 0.1;
    }
  }

  videoRefresh(): void {
    this.videoRef.nativeElement.load();
    this.videoRef.nativeElement.play();
    this.videoService.addHistory(this.video.id).subscribe();
  }
  videoMuted(): void {
    if (this.videoRef.nativeElement.muted) {
      this.videoRef.nativeElement.muted = false;
    } else {
      this.videoRef.nativeElement.muted = true;
    }
  }

  videoThumbsUp(): void {
    this.video.likes = this.video.likes + 1;
    this.videoService.updateVideo(this.video).subscribe();
  }
  videoThumbsDown(): void {
    this.video.unlikes = this.video.unlikes + 1;
    this.videoService.updateVideo(this.video).subscribe();
  }
}
