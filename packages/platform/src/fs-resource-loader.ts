import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { bindNodeCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class FileSystemResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    return bindNodeCallback(fs.readFile)(url)
      .pipe(map(buffer => buffer.toString()))
      .toPromise();
  }
}
