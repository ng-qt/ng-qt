import {
  QLabel,
  QLabelEvents,
  AspectRatioMode,
  QPixmap,
} from '@nodegui/nodegui';
import { Widget } from '@ng-qt/common';

export interface ImageAttrs {
  src: string;
  aspectRatioMode: AspectRatioMode;
  height: number;
  width: number;
}

@Widget({
  events: QLabelEvents,
  attrs: {
    src: 'setSrc',
    aspectRatioMode: 'setAspectRatioMode',
    height: 'setHeight',
    width: 'setWidth',
  },
})
export class Image extends QLabel {
  private originalPixmap: QPixmap;
  private aspectRatioMode: AspectRatioMode;

  private scalePixmap(width: number, height: number) {
    if (this.originalPixmap) {
      super.setPixmap(
        this.originalPixmap.scaled(width, height, this.aspectRatioMode),
      );
    }
  }

  setAspectRatioMode(mode: AspectRatioMode) {
    this.aspectRatioMode = mode;
  }

  setPixmap(pixMap: QPixmap): void {
    super.setPixmap(pixMap);
    this.originalPixmap = pixMap;
  }

  setSrc(url: string) {
    const pixMap = new QPixmap(url);

    //if (isUrl(url)) {
    // not implemented *facepalm*
    //  pixMap.native.loadFromData(url);
    //} else {
    //  pixMap.load(url);
    //}

    this.setPixmap(pixMap);
    const size = this.size();
    this.scalePixmap(size.width, size.height);
  }

  setHeight(height: number) {
    const { width } = this.size();

    this.scalePixmap(width, height);
  }

  setWidth(width: number) {
    const { height } = this.size();

    this.scalePixmap(width, height);
  }

  /*private readonly subs = new Subscription();
  private originalPixmap: QPixmap;

  @Input() aspectRatioMode?: AspectRatioMode;
  @Input() src: string;

  private scalePixmap(width: number, height: number): void {
    if (this.originalPixmap) {
      super.setPixmap(
        this.originalPixmap.scaled(width, height, this.aspectRatioMode)
      );
    }
  }

  setPixmap(pixmap: QPixmap): void {
    super.setPixmap(pixmap);
    this.originalPixmap = pixmap;
  }

  ngOnInit(): void {
    this.subs.add(
      fromEvent(this, QLabelEvents.Resize)
        .subscribe(() => {
          const size = this.size();
          this.scalePixmap(size.width, size.height);
        })
    );
  }

  ngOnChanges({ src, aspectRatioMode }: SimpleChanges): void {
    if (src.currentValue !== src.previousValue) {
      const pixMap = new QPixmap(src.currentValue);
      this.setPixmap(pixMap);

      const size = this.size();
      this.scalePixmap(size.width, size.height);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }*/
}
