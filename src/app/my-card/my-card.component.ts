import { Component, Directive } from '@angular/core';

@Directive({ standalone: true, selector: '[header]' })
export class MyCardHeaderDirective {}

@Directive({ standalone: true, selector: '[body]' })
export class MyCardBodyDirective {}

@Directive({ standalone: true, selector: '[footer]' })
export class MyCardFooterDirective {}

@Component({
  selector: 'my-card',
  standalone: true,
  imports: [MyCardHeaderDirective, MyCardBodyDirective, MyCardFooterDirective],
  styles: `
    :host {
      display: inline-grid;
      grid-template-rows: auto 1fr auto;
      grid-gap: 24px;
      padding: 16px;
      margin: 16px;
      border: 1px solid black;
      border-radius: 8px;
    }
  `,
  template: `
    <div class="header">
      <ng-content select="[header]">
        <h1>Default Header</h1>
      </ng-content>
    </div>
    <div class="body">
      <ng-content select="[body]">
        <p>Default Body</p>
      </ng-content>
    </div>
    <div class="footer">
      <ng-content select="[footer]">
        <p>Default Footer</p>
      </ng-content>
    </div>
  `,
})
export class MyCardComponent {}
