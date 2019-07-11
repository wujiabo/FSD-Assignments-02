import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  constructor() { }
  sendMessage(operate: string, video: Video) {
    this.subject.next({ operate, video });
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
