import { Component } from '@angular/core';
import {
  MyCardBodyDirective,
  MyCardComponent,
  MyCardFooterDirective,
  MyCardHeaderDirective,
} from '../my-card/my-card.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MyCardComponent, MyCardHeaderDirective, MyCardBodyDirective, MatButton, MyCardFooterDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 0) this.counter--;
  }
}
