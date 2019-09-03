export class InvisibleNode {
  meta = {
    skipAddToDom: true,
  };
}

export class TextNode extends InvisibleNode {}

export class CommentNode extends InvisibleNode {}
