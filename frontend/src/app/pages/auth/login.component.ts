import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/auth.service";
import { ThemeToggleComponent } from "../../shared/ui";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ThemeToggleComponent],
  template: `
<div class="auth-page">
  <app-theme-toggle class="auth-theme"/>
  <section class="auth-art">
    <div class="auth-brand-row">
      <a routerLink="/login" class="brand light auth-brand"><span class="brand-mark">B</span><span>Bank<span>Ease</span></span></a>
      <span class="auth-mini">PRIVATE BANKING WORKSPACE</span>
    </div>
    <div class="art-copy">
      <span class="eyebrow">YOUR FINANCIAL COMMAND CENTER</span>
      <h1>Banking that stays clear, calm and in control.</h1>
      <p>Move money, manage accounts, explore investments and keep everyday finances organized from one secure workspace.</p>
      <div class="art-points">
        <div class="art-point"><b>Protected access</b><span>JWT-secured account sessions</span></div>
        <div class="art-point"><b>One workspace</b><span>Accounts, transfers and payments together</span></div>
        <div class="art-point"><b>Clear visibility</b><span>Balances and activity at a glance</span></div>
        <div class="art-point"><b>Built for action</b><span>Fast routes to common banking tasks</span></div>
      </div>
    </div>
  </section>
  <section class="auth-panel">
    <div class="auth-box">
      <span class="eyebrow dark">WELCOME BACK</span>
      <h1>Sign in</h1>
      <p class="muted">Use your BankEase credentials to access your workspace.</p>
      <div class="alert error" *ngIf="error">{{ error }}</div>
      <form (ngSubmit)="submit()">
        <label>Email<input type="email" name="email" [(ngModel)]="email" required autocomplete="email" placeholder="you@example.com" /></label>
        <label>Password<input type="password" name="password" [(ngModel)]="password" required autocomplete="current-password" placeholder="Enter your password" /></label>
        <button class="primary full" [disabled]="busy">{{ busy ? "Signing in..." : "Continue to BankEase" }}</button>
      </form>
      <p class="switch">New to BankEase? <a routerLink="/register">Create an account</a></p>
    </div>
  </section>
</div>`,
})
export class LoginComponent {
  email = ""; password = ""; busy = false; error = "";
  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    this.busy = true; this.error = "";
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigateByUrl("/dashboard"),
      error: (e) => { this.error = e?.error?.message || "Invalid email or password."; this.busy = false; },
      complete: () => (this.busy = false),
    });
  }
}
