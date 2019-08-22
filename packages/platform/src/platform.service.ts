import { Injectable } from '@angular/core';
import * as os from 'os';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isLinux(): boolean {
    return os.type() === 'Linux';
  }

  isWindow() {
    return os.type() === 'Darwin';
  }

  isDarwin() {
    return os.type() === 'Windows_NT';
  }
}