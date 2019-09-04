import { WidgetAttribute, WindowType } from '@nodegui/nodegui/dist/lib/QtEnums';
import { QWidget, QWidgetEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QWidget';
import { Widget } from '@ng-qt/common';

export interface ViewAttrs {
  id?: string;
  mouseTracking?: boolean;
  enabled?: boolean;
  windowFlags?: WindowType[];
  attributes?: WidgetAttribute[];
  style?: string;
  styleSheet?: string;
  // geometry?: Geometry;
  windowOpacity?: number;
  visible?: boolean;
}

@Widget({
  events: QWidgetEvents,
})
export class View extends QWidget {
  private oldAttributes: WidgetAttribute[] = [];
  private oldFlags: WindowType[] = [];

  setVisible(visible: boolean) {
    visible ? this.show() : this.hide();
  }

  setWindowFlags(windowFlags: WindowType[] = []) {
    this.oldFlags.forEach(flag => this.setWindowFlag(flag, false));
    windowFlags.forEach(flag => this.setWindowFlag(flag, true));

    this.oldFlags = windowFlags;
  }

  setAttributes(attributes: WidgetAttribute[] = []) {
    this.oldAttributes.forEach(attr => this.setAttribute(attr, false));
    attributes.forEach(attr => this.setAttribute(attr, true));

    this.oldAttributes = attributes;
  }
}
