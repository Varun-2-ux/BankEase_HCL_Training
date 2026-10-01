import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { ThemeToggleComponent } from '../shared/ui';

@Component({selector:'app-shell',standalone:true,imports:[RouterOutlet,RouterLink,RouterLinkActive,ThemeToggleComponent],template:`
<div class="app-shell" [class.sidebar-open]="menuOpen">
  <div class="mobile-overlay" *ngIf="menuOpen" (click)="menuOpen=false"></div>
  <aside class="sidebar">
    <div class="sidebar-head">
      <a class="brand" routerLink="/dashboard" (click)="menuOpen=false"><span class="brand-mark">B</span><span>Bank<span>Ease</span></span></a>
      <button class="mobile-close" type="button" aria-label="Close navigation" (click)="menuOpen=false">×</button>
    </div>

    <div class="side-label">WORKSPACE</div>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6V11h-6v9Zm0-13h6V4h-6v3Z" stroke="currentColor" stroke-width="1.8"/></svg><em>Overview</em>
      </a>
      <a routerLink="/accounts" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3 10h18M7 15h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><em>Accounts</em>
      </a>
      <a routerLink="/beneficiaries" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 19c.7-3 2.5-4.5 5.5-4.5S13.8 16 14.5 19M16 8h5M18.5 5.5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><em>Beneficiaries</em>
      </a>
      <a routerLink="/transfers" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><path d="M4 8h12M13 5l3 3-3 3M20 16H8m3-3-3 3 3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><em>Transfers</em>
      </a>
      <a routerLink="/bills" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" stroke="currentColor" stroke-width="1.8"/><path d="M9 8h6M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><em>Bill payments</em>
      </a>
      <a routerLink="/loans" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9Z" stroke="currentColor" stroke-width="1.8"/><path d="M8 12h8M12 9v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><em>Loans</em>
      </a>
      <a routerLink="/investments" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 19V9M12 19V5M19 19v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="m4 7 5-3 5 3 6-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><em>Investments</em>
      </a>
    </nav>

    @if(auth.user()?.role==='ADMIN'){
      <div class="side-label" style="margin-top:22px">ADMINISTRATION</div>
      <a routerLink="/admin" routerLinkActive="active" class="nav-item" (click)="menuOpen=false">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 14 5l2.5-.2.8 2.4 2.2 1.3-.8 2.4.8 2.4-2.2 1.3-.8 2.4-2.5-.2-2 1.5-2-1.5-2.5.2-.8-2.4-2.2-1.3.8-2.4-.8-2.4 2.2-1.3.8-2.4 2.5.2L12 3.5Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.6"/></svg><em>Admin center</em>
      </a>
    }

    <div class="side-bottom">
      <div class="secure"><span class="secure-dot"></span><div><b>Secure session</b><small>JWT protected</small></div></div>
      <button class="logout" (click)="logout()"><svg viewBox="0 0 24 24" fill="none"><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Sign out</span></button>
    </div>
  </aside>

  <main class="main-area">
    <header class="topbar">
      <div class="top-left"><button class="menu-button" type="button" aria-label="Open navigation" (click)="menuOpen=true">☰</button><div><span class="crumb">BankEase</span><span class="sep">/</span><strong>Digital Banking</strong></div></div>
      <div class="top-actions"><app-theme-toggle/><div class="profile"><div class="avatar">{{(auth.user()?.name||'U').charAt(0)}}</div><div><b>{{auth.user()?.name||'User'}}</b><small>{{auth.user()?.role||'USER'}}</small></div></div></div>
    </header>
    <div class="content"><router-outlet/></div>
  </main>
</div>`})
export class ShellComponent{
  menuOpen=false;
  constructor(public auth:AuthService,private router:Router){}
  logout(){this.auth.logout();this.router.navigateByUrl('/login');}
}
