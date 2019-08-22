import { QLabel, QPixmap, AspectRatioMode } from '@nodegui/nodegui';

export class ImageLabel extends QLabel {
  protected originalPixmap?: QPixmap;
  protected aspectRatioMode?: AspectRatioMode;

  setPixmap(pixmap: QPixmap): void {
    super.setPixmap(pixmap);
    this.originalPixmap = pixmap;
  }

  protected setAspectRatioMode(mode: AspectRatioMode): void {
    this.aspectRatioMode = mode;
  }

  protected scalePixmap(width: number, height: number): void {
    if (this.originalPixmap) {
      super.setPixmap(
        this.originalPixmap.scaled(width, height, this.aspectRatioMode)
      );
    }
  }
}