import { QIcon, QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { Widget } from '@ng-qt/common';

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
export class Button extends QPushButton {
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
