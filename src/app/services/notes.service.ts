import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _jsonURL = "assets/notes.json";

  constructor(private http: HttpClient) {
  }

  getNotes() : Observable<any> {
    // return this.http.get('localhost:3100/notes');
    return this.http.get(this._jsonURL);
  }
}