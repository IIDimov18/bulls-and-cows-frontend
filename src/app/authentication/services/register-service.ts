import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { registerParams } from '../models/register.model';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private isLoadedSubject = new BehaviorSubject<boolean>(false);
  isLoaded$ = this.isLoadedSubject.asObservable();

  private destroySubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  Register<T>( options?: registerParams): Observable<T> {
    this.isLoadingSubject.next(true);

    return this.http.post<T>('http://localhost:8000/register', options)
      .pipe(
        tap((response: T) => {
            console.log('API Response:', response); // Log the response here
            this.isLoadedSubject.next(true);
          }),
        catchError(error => {
          // Handle error here
          console.error('API Error:', error);
          throw error;
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
          this.destroySubject.next(); // Notify subscribers that this service is being destroyed
        })
      );
  }

  ngOnDestroy() {
    this.destroySubject.next(); // Notify subscribers that this service is being destroyed
  }
}