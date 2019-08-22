import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { QLabel, AspectRatioMode, QPixmap, QLabelEvents } from '@nodegui/nodegui';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'Image',
  template: ``,
})
export class ImageComponent extends QLabel implements OnInit, OnChanges, OnDestroy {
  private readonly subs = new Subscription();
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
  }
}