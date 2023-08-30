import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService as APIAuthService, User } from '../api/main/v1';
import { shareReplay, tap } from 'rxjs';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authService: APIAuthService, private router: Router) {}

  login(username: string, password: string) {
    localStorage.clear();
    return (
      this.authService.signIn({
        username,
        password,
      })
        // Set session storage

        // this is just the HTTP call,
        // we still need to handle the reception of the token
        .pipe(tap((res) => this.setSession(res.access_token)), shareReplay())
    );
  }

  private setSession(accessToken?: string) {
    if (!accessToken) {
      return;
    }
    const decoded = jwtDecode(accessToken) as any;
    switch (decoded.role) {
      case User.RoleEnum.Admin:
        this.storeItems(accessToken, decoded);
        this.router.navigate(['/staff']);
        break;
      case User.RoleEnum.Student:
        this.storeItems(accessToken, decoded);
        this.router.navigate(['/student']);
        break;
      case User.RoleEnum.Staff:
        this.storeItems(accessToken, decoded);
        this.router.navigate(['/staff']);
        break;
      default:
        this.router.navigate(['staff/auth/login']);
        break;
    }
  }

  private storeItems(accessToken: string, decoded: any) {
    const expiresAt = moment().add(decoded.exp, 'second');
    localStorage.setItem('role', decoded.role)
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(decoded.user as User))
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public get isLoggedIn() {
    const accessToken = localStorage.getItem('access_token')
    if(!accessToken) return false;
    const decoded = jwtDecode(accessToken) as any;
    if(decoded.role === User.RoleEnum.Admin || decoded.role === User.RoleEnum.Staff)
    {
      return moment().isBefore(this.getExpiration());
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return moment();
  }
}
