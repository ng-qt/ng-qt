import { QIcon, QPushButton } from '@nodegui/nodegui';

export class ButtonWidget extends QPushButton {
  set icon(url: string) {
    const icon = new QIcon(url);
    this.setIcon(icon);
  }
}
