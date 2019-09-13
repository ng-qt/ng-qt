import { QWidget } from '@nodegui/nodegui';

export abstract class InvisibleNode extends QWidget {
  constructor(public value: string | number) {
    super();
  }
}

export class TextNode extends InvisibleNode {}

export class CommentNode extends InvisibleNode {}
