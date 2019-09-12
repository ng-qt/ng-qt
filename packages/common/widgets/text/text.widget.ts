import { QLabel, QLabelEvents, QPixmap } from '@nodegui/nodegui';
import { CustomViewClass, TextNode, Widget } from '@ng-qt/common';

export interface TextAttrs {
  value?: string;
  wordWrap?: boolean;
  pixmap?: QPixmap;
}

@Widget({
  events: QLabelEvents,
  attrs: {
    value: 'setText',
    wordWrap: 'setWordWrap',
    pixMap: 'setPixmap',
  },
})
export class Text extends QLabel implements CustomViewClass<TextNode> {
  insertChild(text: TextNode) {
    this.setText(text.value);
  }

  removeChild(child: TextNode): void {
    this.setText('');
  }
}
