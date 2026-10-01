import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark = signal(false);

  constructor() {
    const saved = localStorage.getItem('bankease_theme');
    const dark = saved === 'dark' || (!saved && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    this.setDark(dark);
  }

  toggle() { this.setDark(!this.dark()); }

  private setDark(value: boolean) {
    this.dark.set(value);
    document.documentElement.dataset['theme'] = value ? 'dark' : 'light';
    localStorage.setItem('bankease_theme', value ? 'dark' : 'light');
  }
}
