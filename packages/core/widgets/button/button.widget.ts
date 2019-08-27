import { QIcon, QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { createWidgetAttributes, createWidgetEvents } from '../../src';
import { ViewAttrs } from '../view';

export interface ButtonAttrs {
  text?: string;
  icon?: string;
  isFlat?: boolean;
}

export const ButtonAttrs = Object.freeze({
  text: 'setText',
  flat: 'setFlat',
  icon: 'createIcon',
});

export class Button extends QPushButton {
  static readonly events = createWidgetEvents(QPushButtonEvents);
  static readonly attrs = createWidgetAttributes({
    ...ViewAttrs,
    ...ButtonAttrs,
  });

  createIcon(iconUrl: string): void {
    const icon = new QIcon(iconUrl);
    this.setIcon(icon);
  }
}
