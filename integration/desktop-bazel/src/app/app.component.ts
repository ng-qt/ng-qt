import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NativeEvent } from '@nodegui/nodegui';

export type Operator = '+' | '-' | '*' | '/' | '=' | '=' | '~';

@Component({
  selector: 'App',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  result$ = new BehaviorSubject<number>(0);

  onKeyRelease(e: NativeEvent) {}

  onValue(value: number) {
    console.log('CLICKED');
  }

  onOperator(operator: Operator) {}
}
