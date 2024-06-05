import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MyCardBodyDirective,
  MyCardComponent,
  MyCardFooterDirective,
  MyCardHeaderDirective,
} from '../my-card/my-card.component';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MyCardComponent,
    MyCardHeaderDirective,
    MyCardBodyDirective,
    MatButton,
    MyCardFooterDirective,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  counter = 0;
  pokemonList$ = inject(HttpClient)
    .get<{ results: { name: string }[] }>('https://pokeapi.co/api/v2/pokemon?limit=10')
    .pipe(map((data) => data.results.map(({ name }) => name)));

  timer = toSignal(timer(0, 1000), { initialValue: 0 });

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 0) this.counter--;
  }

  reset() {
    this.counter = 0;
  }
}
