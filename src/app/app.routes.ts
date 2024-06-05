import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => (inject(AuthService).isLoggedIn() ? '/home' : '/login'),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
];
