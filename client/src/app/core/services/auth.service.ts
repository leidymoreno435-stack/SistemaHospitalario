import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_BASE_URL;
  private tokenKey = 'authToken';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.setUserFromToken(token);
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.setUserFromToken(response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setUserFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userSubject.next({
        id_usuario: payload.sub,
        rol: payload.rol,
        username: payload.username,
        id_paciente: payload.id_paciente
      });
    } catch (e) {
      this.logout();
    }
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  hasRole(rol: string): boolean {
    let currentUser: any;
    this.user$.subscribe(user => {
      currentUser = user;
    }).unsubscribe();
    return currentUser?.rol?.toLowerCase() === rol.toLowerCase();
  }

  getUsuarioActual(): any {
    let currentUser: any;
    this.user$.subscribe(user => {
      currentUser = user;
    }).unsubscribe();
    return currentUser;
  }
}