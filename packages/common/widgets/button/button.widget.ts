import { QIcon, QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { CustomViewClass, TextNode, Widget } from '@ng-qt/common';

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
export class Button extends QPushButton implements CustomViewClass<TextNode> {
  insertChild(text: TextNode) {
    this.setText(text.value);
  }

  removeChild(child: TextNode): void {
    this.setText('');
  }

  createIcon(iconUrl: string): void {
    const icon = new QIcon(iconUrl);
    this.setIcon(icon);
  }
}
