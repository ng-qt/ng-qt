import * as fs from 'fs';
import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class FileSystemResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(url, (err, buffer) => {
        if (err) return reject(err);

        resolve(buffer.toString());
      });
    });
  }
}