import { NodeWidget } from '@nodegui/nodegui';

export interface AppRootView extends NodeWidget {
  setHostObjectName(name: string): void;
}
