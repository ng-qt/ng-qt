import { QLabel, QLabelEvents, QPixmap } from '@nodegui/nodegui';
import { CustomViewClass, Widget } from '@ng-qt/common';

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
export class Text extends QLabel implements CustomViewClass<string> {
  insertChild(text: string) {
    this.setText(text);
  }

  removeChild(child: string): void {
    // TODO
  }
}
