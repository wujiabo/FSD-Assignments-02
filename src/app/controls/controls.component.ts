import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(private messageService: MessageService) {
    this.messageService.getMessage().subscribe(message => {
      if (message.operate === 'reload') {
      }
    });
  }

  ngOnInit() {
  }

  play(): void {
    this.messageService.sendMessage('play', null);
  }
  pause(): void {
    this.messageService.sendMessage('pause', null);
  }
  plus(): void {
    this.messageService.sendMessage('plus', null);
  }
  minus(): void {
    this.messageService.sendMessage('minus', null);
  }
  refresh(): void {
    this.messageService.sendMessage('refresh', null);
  }
  muted(): void {
    this.messageService.sendMessage('muted', null);
  }
  thumbsUp(): void {
    this.messageService.sendMessage('thumbsUp', null);
  }
  thumbsDown(): void {
    this.messageService.sendMessage('thumbsDown', null);
  }
}
