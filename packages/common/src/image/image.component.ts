import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AspectRatioMode, QPixmap, QLabelEvents } from '@nodegui/nodegui';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ImageLabel } from './image-label';

@Component({
  selector: 'Image',
  template: ``,
})
export class ImageComponent implements OnInit, OnChanges, OnDestroy {
  private readonly subs = new Subscription();
  private widget: ImageLabel;

  @Input() src: string;
  @Input() aspectRatioMode?: AspectRatioMode;
  @Input() debounceResizeTime: number = 0;

  ngOnInit(): void {
    this.widget = new ImageLabel();

    this.subs.add(
      fromEvent(this.widget, QLabelEvents.Resize)
        .pipe(debounceTime(this.debounceResizeTime))
        .subscribe(() => {
          const size = this.widget.size();
          this.widget.scalePixmap(size.width, size.height);
        })
    );
  }

  ngOnChanges({ src, aspectRatioMode }: SimpleChanges): void {
    if (aspectRatioMode.currentValue !== aspectRatioMode.previousValue) {
      this.widget.setAspectRatioMode(aspectRatioMode.currentValue);
    }

    if (src.currentValue !== src.previousValue) {
      const pixMap = new QPixmap(src.currentValue);
      this.widget.setPixmap(pixMap);

      const size = this.widget.size();
      this.widget.scalePixmap(size.width, size.height);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}