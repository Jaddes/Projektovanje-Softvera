import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Profile, ProfilePayload } from './model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileClientService {

  private readonly touristUrl = `${environment.apiHost}tourist/profile`;
  private readonly authorUrl = `${environment.apiHost}author/profile`;

  constructor(private readonly http: HttpClient) { }

  getTouristProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.touristUrl);
  }

  updateTouristProfile(payload: ProfilePayload): Observable<Profile> {
    return this.http.put<Profile>(this.touristUrl, payload);
  }

  getAuthorProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.authorUrl);
  }

  updateAuthorProfile(payload: ProfilePayload): Observable<Profile> {
    return this.http.put<Profile>(this.authorUrl, payload);
  }
}
