import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const API_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) {}

  public folderList(): Observable < any > {
    return this.http.get(API_URL + '/folderList/').pipe(map(res => res));
  }

  public ImagesPath(path): Observable < any > {
    return this.http.get(API_URL + '/' + path).pipe(map(res => res));
  }

}
