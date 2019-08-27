import { QWidget } from '@nodegui/nodegui/dist/lib/QtGui/QWidget';

export type ListenerMap = Record<string, Function>;

export class ViewWidget extends QWidget {}