import { QIcon, QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { createWidgetAttributes, createWidgetEvents } from '../../index';
import { ViewAttrs } from '../view';

export interface ButtonAttrs {
  // text?: string;
  icon?: string;
  isFlat?: boolean;
}

export const ButtonAttrs = Object.freeze({
  // text: 'setText',
  flat: 'setFlat',
  icon: 'createIcon',
});

export class Button extends QPushButton {
  static readonly events = createWidgetEvents(QPushButtonEvents);
  static readonly attrs = createWidgetAttributes({
    ...ViewAttrs,
    ...ButtonAttrs,
  });

  meta = {
    insertChild(text: string) {
      this.setText(text);
    },
  };

  createIcon(iconUrl: string): void {
    const icon = new QIcon(iconUrl);
    this.setIcon(icon);
  }
}
