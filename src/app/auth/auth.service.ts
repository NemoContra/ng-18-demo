import { inject, Injectable, makeEnvironmentProviders } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

export interface Credentials {
  username: string;
  password: string;
}

const TOKEN = 'token';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

@Injectable()
export abstract class AuthService {
  abstract getToken(): string | null;
  abstract setToken(token: string): void;
  abstract removeToken(): void;
  checkCredentials(credentials: Credentials): boolean {
    return !!(credentials.username && credentials.password);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  login(credentials: Credentials) {
    const credentialsAreValid = this.checkCredentials(credentials);
    if (credentialsAreValid) this.setToken(token);
    return credentialsAreValid;
  }

  logout() {
    this.removeToken();
  }
}

@Injectable()
export class ClientAuthService extends AuthService {
  localStorage = inject(LOCAL_STORAGE);

  setToken(token: string) {
    this.localStorage.setItem(TOKEN, token);
  }

  removeToken() {
    this.localStorage.removeItem(TOKEN);
  }

  getToken() {
    return this.localStorage.getItem(TOKEN);
  }
}

@Injectable()
export class ServerAuthService extends AuthService {
  #token: string | null = null;

  setToken(token: string) {
    this.#token = token;
  }

  removeToken() {
    this.#token = null;
  }

  getToken() {
    return this.#token;
  }
}

export const provideClientAuth = () =>
  makeEnvironmentProviders([{ provide: AuthService, useClass: ClientAuthService }]);

export const provideServerAuth = () =>
  makeEnvironmentProviders([{ provide: AuthService, useClass: ServerAuthService }]);
