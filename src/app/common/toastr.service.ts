import { InjectionToken } from '@angular/core';

export let TOSTER_TOKEN = new InjectionToken<any>('toastrtoken');
export interface Toastr  {
      success(message: string, title?: string): void;
      info(message: string, title?: string): void;
      warning(message: string, title?: string): void;
      error(message: string, title?: string): void;
}
