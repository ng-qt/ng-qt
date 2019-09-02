import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NativeEvent } from '@nodegui/nodegui';

export type Operator = '+' | '-' | '*' | '/' | '=' | '=' | '~';

@Component({
  selector: 'App',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // TODO
  result$ = new BehaviorSubject<number>(0);

  // TODO
  views = [
    {
      id: 'row1',
      buttons: [
        {
          id: 'valueBtn',
          text: '7',
          clicked: () => this.onValue(7),
        },
        {
          id: 'valueBtn',
          text: '8',
          clicked: () => this.onValue(8),
        },
        {
          id: 'valueBtn',
          text: '9',
          clicked: () => this.onValue(9),
        },
        {
          id: 'opBtnY',
          text: '/',
          clicked: () => this.onOperator('/'),
        },
      ],
    },
  ];

  onKeyRelease(e: NativeEvent) {}

  onValue(value: number) {
    console.log(value);
  }

  onOperator(operator: Operator) {}
}
