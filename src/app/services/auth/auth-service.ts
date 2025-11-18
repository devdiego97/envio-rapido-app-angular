import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../environment/environment';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http = inject(HttpClient);
  private api = `${enviroment.apiURl}/auth`;
  private tokenKey = 'auth_token';
  private nomeKey = 'auth_nome';
  private emailKey = 'auth_email';
 private userIdKey = 'auth_userId';


  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  saveSession(res: any) {
    localStorage.setItem(this.tokenKey, res.token);
    localStorage.setItem(this.nomeKey, res.nome);
    localStorage.setItem(this.emailKey, res.email);
    localStorage.setItem(this.userIdKey, res.id);
    console.log(localStorage.getItem('auth_userId'))

    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserNome(): string | null {
    return localStorage.getItem(this.nomeKey);
  }

   getUserId(): number | null {
    const id=localStorage.getItem(this.userIdKey)
    return id ? Number(id) :null;
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }
 isLoggedIn():boolean{
   return !!this.getToken()
 }
 
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.nomeKey);
    localStorage.removeItem(this.emailKey);
    this.loggedIn.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}