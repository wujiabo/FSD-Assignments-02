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

  constructor(private videoService: VideoService,private messageService: MessageService) {
    this.messageService.getMessage().subscribe(message => {
      if (message.operate === 'video') {
        this.video = message.video;
      }
      if (message.operate === 'play') {
        this.videoPlayer();
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

  videoPlayer(): void {
    this.videoRef.nativeElement.play();
  }
}
