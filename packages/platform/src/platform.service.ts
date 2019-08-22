import { Injectable } from '@angular/core';
import * as os from 'os';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isLinux(): boolean {
    return os.type() === 'Linux';
  }

  isWindow(): boolean {
    return os.type() === 'Darwin';
  }

  isDarwin(): boolean {
    return os.type() === 'Windows_NT';
  }
}