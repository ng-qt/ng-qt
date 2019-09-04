import { QLabel, QLabelEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QLabel';
import { Widget } from '@ng-qt/common';

@Widget({
  events: QLabelEvents,
})
export class Image extends QLabel {
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
