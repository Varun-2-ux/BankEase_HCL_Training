import { Component, Input } from '@angular/core';
import { ThemeService } from '../core/theme.service';

@Component({selector:'app-spinner',standalone:true,template:'<div class="loading"><span class="spinner"></span><span>{{label}}</span></div>'})
export class SpinnerComponent{ @Input() label='Loading...'; }

@Component({selector:'app-status',standalone:true,template:'<span class="badge" [class]="statusClass">{{status}}</span>'})
export class StatusComponent{ @Input() status=''; get statusClass(){return 'badge '+String(this.status).toLowerCase();} }

@Component({selector:'app-empty',standalone:true,template:'<div class="empty"><div class="empty-icon">＋</div><h3>{{title}}</h3><p>{{text}}</p></div>'})
export class EmptyComponent{ @Input() title='Nothing here yet'; @Input() text='Your records will appear here.'; }

@Component({selector:'app-theme-toggle',standalone:true,template:`
<button type="button" class="theme-toggle" (click)="theme.toggle()" [attr.aria-label]="theme.dark() ? 'Switch to light mode' : 'Switch to dark mode'">
  @if(theme.dark()){
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <span class="theme-label">Light</span>
  } @else {
    <svg viewBox="0 0 24 24" fill="none"><path d="M20 15.2A8 8 0 0 1 8.8 4a8.1 8.1 0 1 0 11.2 11.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
    <span class="theme-label">Dark</span>
  }
</button>`})
export class ThemeToggleComponent { constructor(public theme: ThemeService) {} }
