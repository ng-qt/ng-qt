import { QIcon, QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { CustomViewClass, Widget } from '@ng-qt/common';

export interface ButtonAttrs {
  text?: string;
  icon?: string;
  isFlat?: boolean;
}

@Widget({
  events: QPushButtonEvents,
  attrs: {
    text: 'setText',
    flat: 'setFlat',
    icon: 'createIcon',
  },
})
export class Button extends QPushButton implements CustomViewClass<string> {
  insertChild(text: string) {
    this.setText(text);
  }

  removeChild(child: string): void {
    // TODO
  }

  createIcon(iconUrl: string): void {
    const icon = new QIcon(iconUrl);
    this.setIcon(icon);
  }
}
