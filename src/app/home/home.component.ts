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
import { map } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class HomeComponent {
  counter = 0;
  pokemonList: string[] | null = null;

  constructor() {
    inject(HttpClient)
      .get<{ results: { name: string }[] }>('https://pokeapi.co/api/v2/pokemon?limit=10')
      .subscribe((data) => {
        this.pokemonList = data.results.map(({ name }) => name);
      });
  }

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
