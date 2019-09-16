import { Component, HostListener, OnInit } from '@angular/core';
import { NativeEvent } from '@nodegui/nodegui';
import { BehaviorSubject } from 'rxjs';

export type Operator = '+' | '-' | '*' | '/' | '=' | '=' | '~';

export interface Button {
  id: string;
  text: string | number;
  clicked: Function;
}

export interface View {
  id: string;
  buttons: Button[];
}

@Component({
  selector: 'App',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  total$ = new BehaviorSubject<number>(0);
  display$ = new BehaviorSubject<string>('0');
  pendingOp$ = new BehaviorSubject<Operator>('~');
  valueBuffer$ = new BehaviorSubject<number | null>(null);

  show = true;
  backgroundColor = 'red';
  styles = 'border: none';

  views: View[] = [
    {
      id: 'row1',
      buttons: [
        this.createValueBtn(7),
        this.createValueBtn(8),
        this.createValueBtn(9),
        this.createOperatorBtn('/', '/'),
      ],
    },
    {
      id: 'row',
      buttons: [
        this.createValueBtn(4),
        this.createValueBtn(5),
        this.createValueBtn(6),
        this.createOperatorBtn('x', '*'),
      ],
    },
    {
      id: 'row',
      buttons: [
        this.createValueBtn(1),
        this.createValueBtn(2),
        this.createValueBtn(3),
        this.createOperatorBtn('-', '-'),
      ],
    },
    {
      id: 'row',
      buttons: [
        this.createValueBtn(0),
        this.createValueBtn('.'),
        {
          id: 'opBtn',
          text: '=',
          clicked: () => this.onOperator('='),
        },
        this.createOperatorBtn('+', '+'),
      ],
    },
  ];

  private createOperatorBtn(text: string, op: Operator): Button {
    return {
      id: 'opBtnY',
      text,
      clicked: () => this.onOperator(op),
    };
  }

  private createValueBtn(value: number | string): Button {
    return {
      id: 'valueBtn',
      text: value,
      // @ts-ignore
      clicked: () => this.onValue(value),
    };
  }

  @HostListener('keyRelease', ['$event.target'])
  keyRelease(e: NativeEvent) {
    console.log(e);
  }

  onValue(value: number) {
    const pendingOp = this.pendingOp$.getValue();
    const valueBuffer = this.valueBuffer$.getValue();
    const display = this.display$.getValue();

    if (pendingOp === '=') {
      this.pendingOp$.next('~');
    }

    if (!valueBuffer) {
      this.display$.next(`${value}`);
      this.valueBuffer$.next(value);
    } else {
      this.display$.next(`${display}` + `${value}`);
      this.valueBuffer$.next(value);
    }
  }

  onOperator(operator: Operator) {
    const valueBuffer = this.valueBuffer$.getValue() || 0;
    const pendingOp = this.pendingOp$.getValue();
    let total = this.total$.getValue();

    switch (pendingOp) {
      case '*':
        total *= valueBuffer;
        break;
      case '+':
        total += valueBuffer;
        break;
      case '-':
        total -= valueBuffer;
        break;
      case '/':
        total /= valueBuffer || 1;
        break;
      case '=':
        break;
      case '~':
        total = valueBuffer;
        break;
      default:
        break;
    }

    this.valueBuffer$.next(null);
    this.display$.next(operator);

    if (operator === '=') {
      this.display$.next(`${total}`);
      this.total$.next(total);
    }

    this.pendingOp$.next(operator);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.backgroundColor = 'green';

      setTimeout(() => {
        this.backgroundColor = 'red';

        setTimeout(() => {
          delete this.backgroundColor;

          setTimeout(() => {
            this.show = false;
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
}
