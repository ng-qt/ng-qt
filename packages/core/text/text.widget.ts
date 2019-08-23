import { QLabel } from '@nodegui/nodegui';

export class TextWidget extends QLabel {
  // @ts-ignore
  set children(text: string | number) {
    this.setText(text);
  }

  set wordWrap(shouldWrap: boolean) {
    this.setWordWrap(shouldWrap);
  }
}