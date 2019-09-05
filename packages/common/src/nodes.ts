import { QWidget } from '@nodegui/nodegui';

export abstract class InvisibleNode extends QWidget {}

export class TextNode extends InvisibleNode {
  constructor(private readonly value: string) {
    super();
  }
}

export class CommentNode extends InvisibleNode {
  constructor(private readonly value: string) {
    super();
  }
}
