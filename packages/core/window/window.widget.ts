import { QMainWindow } from '@nodegui/nodegui/dist/lib/QtWidgets/QMainWindow';

export interface WindowSize {
  height: number;
  width: number;
}

interface WindowProps {
  fixedSize?: WindowSize | null;
  minSize?: WindowSize;
  maxSize?: WindowSize;
}

export class WindowWidget extends QMainWindow {
  /*set minSize({ width, height }: WindowSize) {
    this.setMinimumSize(width, height);
  }

  set maxSize({ width, height }: WindowSize) {
    this.setMaximumSize(width, height);
  }

  set fixedSize(size: WindowSize | null) {
    if (size) {
      this.setFixedSize(size.width, size.height);
    } else {
      const minSize: WindowSize = {
        width: 0,
        height: 0,
      };

      const maxSize: WindowSize = {
        width: 16777215,
        height: 16777215
      };

      this.minSize = minSize;
      this.maxSize = maxSize;
    }
  }

  set viewProps(props: any) {
    if (this.centralWidget) {
      // const oldViewProps = oldProps.viewProps || {};
      // this.centralWidget
      // setViewProps(window.centralWidget, viewProps, oldViewProps);
    } else {
      console.warn(
        "Trying to set wiewProps for main window but no central widget set."
      );
    }
  }*/
}
