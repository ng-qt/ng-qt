import { WindowType, WidgetAttribute } from '@nodegui/nodegui/dist/lib/QtEnums';
import { QWidget, QWidgetEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QWidget';
import { createWidgetAttributes, createWidgetEvents } from '../../index';

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

// Available widget attributes and what they map to
export const ViewAttrs = Object.freeze({
  id: 'setObjectName',
  mouseTracking: 'setMouseTracking',
  enabled: 'setEnabled',
  windowFlags: 'setWindowFlags',
  attributes: 'setAttributes',
  style: 'setInlineStyle',
  styleSheet: 'setStyleSheet',
  // geometry: 'geometry',
  windowOpacity: 'setWindowOpacity',
  visible: 'setVisible',
});

export class View extends QWidget {
  static readonly events = createWidgetEvents(QWidgetEvents);
  static readonly attrs = createWidgetAttributes(ViewAttrs);

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
