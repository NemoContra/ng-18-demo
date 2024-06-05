import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MyCardBodyDirective, MyCardComponent, MyCardHeaderDirective } from '../my-card/my-card.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MyCardBodyDirective,
    MyCardComponent,
    MyCardHeaderDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  loginGroup = inject(NonNullableFormBuilder).group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginGroup.events.subscribe(console.log);
  }

  async onLogin() {
    const { username, password } = this.loginGroup.value;
    let success = false;

    if (this.loginGroup.valid && username && password) {
      success = this.authService.login({ username, password });
    }

    if (success) void this.router.navigate(['/home']);
  }
}
