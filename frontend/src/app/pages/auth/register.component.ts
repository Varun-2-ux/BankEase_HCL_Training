import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ThemeToggleComponent } from '../../shared/ui';

@Component({selector:'app-register',standalone:true,imports:[CommonModule,FormsModule,RouterLink,ThemeToggleComponent],template:`
<div class="auth-page">
  <app-theme-toggle class="auth-theme"/>
  <section class="auth-art">
    <div class="auth-brand-row">
      <a routerLink="/login" class="brand light auth-brand"><span class="brand-mark">B</span><span>Bank<span>Ease</span></span></a>
      <span class="auth-mini">GET STARTED</span>
    </div>
    <div class="art-copy">
      <span class="eyebrow">A BETTER WAY TO BANK</span>
      <h1>Everything important, organized in one place.</h1>
      <p>Create your BankEase profile and get a clean, secure workspace for everyday banking.</p>
      <div class="art-points">
        <div class="art-point"><b>Accounts</b><span>Track balances and account status</span></div>
        <div class="art-point"><b>Transfers</b><span>Manage trusted destinations and payments</span></div>
        <div class="art-point"><b>Growth</b><span>Explore loans and investments</span></div>
        <div class="art-point"><b>Security</b><span>Protected access with JWT</span></div>
      </div>
    </div>
  </section>
  <section class="auth-panel">
    <div class="auth-box wide">
      <span class="eyebrow dark">NEW CUSTOMER</span>
      <h1>Create your account</h1>
      <p class="muted">Enter the details you will use to sign in.</p>
      <div class="alert error" *ngIf="error">{{error}}</div>
      <form (ngSubmit)="submit()">
        <div class="form-grid">
          <label>First name<input name="firstName" [(ngModel)]="form.firstName" required autocomplete="given-name"></label>
          <label>Last name<input name="lastName" [(ngModel)]="form.lastName" required autocomplete="family-name"></label>
        </div>
        <label>Email<input type="email" name="email" [(ngModel)]="form.email" required autocomplete="email" placeholder="you@example.com"></label>
        <label>Phone number<input name="phoneNumber" [(ngModel)]="form.phoneNumber" required pattern="[6-9][0-9]{9}" placeholder="10-digit mobile number" autocomplete="tel"></label>
        <label>Password<input type="password" name="password" [(ngModel)]="form.password" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters"></label>
        <button class="primary full" [disabled]="busy">{{busy?'Creating...':'Create BankEase account'}}</button>
      </form>
      <p class="switch">Already have an account? <a routerLink="/login">Sign in</a></p>
    </div>
  </section>
</div>`})
export class RegisterComponent{busy=false;error='';form={firstName:'',lastName:'',email:'',password:'',phoneNumber:''};constructor(private auth:AuthService,private router:Router){}submit(){this.busy=true;this.error='';this.auth.register(this.form).subscribe({next:r=>{if(r?.token)this.router.navigateByUrl('/dashboard');else this.router.navigateByUrl('/login')},error:e=>{this.error=e?.error?.message||'Registration failed.';this.busy=false},complete:()=>this.busy=false});}}
