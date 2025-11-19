import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { TutorProfile, TutorProfilePayload } from './model/tutor-profile.model';

@Injectable({
  providedIn: 'root'
})
export class TutorProfileService {

  private readonly resourceUrl = `${environment.apiHost}tutors/me`;

  constructor(private readonly http: HttpClient) { }

  getMyProfile(): Observable<TutorProfile> {
    return this.http.get<TutorProfile>(this.resourceUrl);
  }

  updateMyProfile(payload: TutorProfilePayload): Observable<TutorProfile> {
    return this.http.put<TutorProfile>(this.resourceUrl, payload);
  }
}
