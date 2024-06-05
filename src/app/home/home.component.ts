import { Component } from '@angular/core';
import { MyCardComponent, MyCardHeaderDirective } from '../my-card/my-card.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MyCardComponent, MyCardHeaderDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
