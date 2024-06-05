import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon],
  styles: `
    mat-toolbar {
      display: flex;
      justify-content: flex-end;
    }
  `,
  template: `
    <nav class="toolbar-primary">
      <mat-toolbar>
        <button mat-icon-button (click)="logout()"><mat-icon>power_settings_new</mat-icon></button>
      </mat-toolbar>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
