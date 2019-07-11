import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Video } from './video';
import { History } from './history';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) { }

  /** GET videoes from the server */
  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl)
      .pipe(
        tap(_ => this.log('fetched videos')),
        catchError(this.handleError<Video[]>('getVideos', []))
      );
  }

  /** GET video by id. Return `undefined` when id not found */
  getVideoNo404<Data>(id: number): Observable<Video> {
    const url = `${this.videosUrl}/?id=${id}`;
    return this.http.get<Video[]>(url)
      .pipe(
        map(videos => videos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} video id=${id}`);
        }),
        catchError(this.handleError<Video>(`getVideo id=${id}`))
      );
  }

  /** GET video by id. Will 404 if id not found */
  getVideo(id: number): Observable<Video> {
    const url = `${this.videosUrl}/${id}`;
    return this.http.get<Video>(url).pipe(
      tap(_ => this.log(`fetched video id=${id}`)),
      catchError(this.handleError<Video>(`getVideo id=${id}`))
    );
  }

  /* GET videos whose name contains search term */
  searchVideos(term: string): Observable<Video[]> {
    if (!term.trim()) {
      // if not search term, return empty video array.
      return of([]);
    }
    return this.http.get<Video[]>(`${this.videosUrl}/?title=${term}`).pipe(
      tap(_ => this.log(`found videos matching "${term}"`)),
      catchError(this.handleError<Video[]>('searchVideos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new video to the server */
  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.videosUrl, video, httpOptions).pipe(
      tap((newVideo: Video) => this.log(`added video w/ id=${newVideo.id}`)),
      catchError(this.handleError<Video>('addVideo'))
    );
  }

  /** DELETE: delete the video from the server */
  deleteVideo(video: Video | number): Observable<Video> {
    const id = typeof video === 'number' ? video : video.id;
    const url = `${this.videosUrl}/${id}`;

    return this.http.delete<Video>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted video id=${id}`)),
      catchError(this.handleError<Video>('deleteVideo'))
    );
  }

  /** PUT: update the video on the server */
  updateVideo(video: Video): Observable<any> {
    const id = typeof video === 'number' ? video : video.id;
    const url = `${this.videosUrl}/${id}`;

    return this.http.put(url, video, httpOptions).pipe(
      tap(_ => this.log(`updated video id=${video.id}`)),
      catchError(this.handleError<any>('updateVideo'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
  }


  getHistories(): Observable<History[]> {
    return this.http.get<History[]>('http://localhost:3000/histories')
      .pipe(
        tap(_ => this.log('fetched histories')),
        catchError(this.handleError<History[]>('getHistories', []))
      );
  }

  addHistory(id: number): Observable<History> {
    const history = new History();
    history.videoId = id;
    history.createTime = new Date();
    return this.http.post<History>('http://localhost:3000/histories', history, httpOptions).pipe(
      tap((newHistory: History) => this.log(`added history w/ id=${newHistory.videoId}`)),
      catchError(this.handleError<History>('addHistory'))
    );
  }
}
