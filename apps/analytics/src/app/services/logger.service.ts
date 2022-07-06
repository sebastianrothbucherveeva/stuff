import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export interface Toast {
  id: string;
  classname: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  get toasts(): Toast[] {
    return Array.from(this._toasts.values());
  }

  private _toasts: Map<string, Toast> = new Map();

  success(message: string): void {
    const id = uuidv4();
    this._toasts.set(uuidv4(), {
      id,
      classname: 'bg-success text-light',
      label: message,
    });
  }

  critical(error: Error, message: string): void {
    const id = uuidv4();
    this._toasts.set(id, {
      id,
      classname: 'bg-danger text-light',
      label: message,
    });

    this.collectLog(error);
  }

  remove(toastID: string): void {
    this._toasts.delete(toastID);
  }

  private collectLog(error: Error): void {
    // In a real life situation, we would send the log to some kind of external
    // log collector.
    console.error(error);
  }
}
