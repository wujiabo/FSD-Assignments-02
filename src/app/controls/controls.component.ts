import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Video } from '../video';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  isPlay: boolean;
  isMuted: boolean;
  video: Video;
  noVideo: boolean;
  percent: number;

  constructor(private messageService: MessageService) {
    this.messageService.getMessage().subscribe(message => {
      if (message.operate === 'reload') {
        this.isPlay = false;
        this.isMuted = false;
        this.video = new Video();
        this.noVideo = true;
      }
      if (message.operate === 'video') {
        this.video = message.video;
        this.noVideo = false;
        this.isPlay = false;
      }
      if (message.operate === 'ended') {
        this.isPlay = false;
        this.percent = 0;
      }
      if (message.operate === 'percent') {
        this.percent = message.video.percent;
      }

    });
  }

  ngOnInit() {
    this.isPlay = false;
    this.isMuted = false;
    this.video = new Video();
    this.noVideo = true;
    this.percent = 0;
  }

  play(): void {
    this.messageService.sendMessage('play', null);
    this.isPlay = true;
  }
  pause(): void {
    this.messageService.sendMessage('pause', null);
    this.isPlay = false;
  }
  plus(): void {
    this.messageService.sendMessage('plus', null);
  }
  minus(): void {
    this.messageService.sendMessage('minus', null);
  }
  refresh(): void {
    this.messageService.sendMessage('refresh', null);
    this.isPlay = true;
  }
  muted(): void {
    this.messageService.sendMessage('muted', null);
    if (this.isMuted) {
      this.isMuted = false;
    } else {
      this.isMuted = true;
    }
  }
  thumbsUp(): void {
    this.messageService.sendMessage('thumbsUp', null);
  }
  thumbsDown(): void {
    this.messageService.sendMessage('thumbsDown', null);
  }
}
