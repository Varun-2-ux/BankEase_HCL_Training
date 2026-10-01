import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ApiService } from "../../core/api.service";
import { AuthService } from "../../core/auth.service";
import { Account, Investment, Transfer } from "../../core/models";
import {
  SpinnerComponent,
  StatusComponent,
  EmptyComponent,
} from "../../shared/ui";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SpinnerComponent,
    StatusComponent,
    EmptyComponent,
  ],
  template: `
<div class="dashboard-intro page-head">
  <div><span class="eyebrow dark">PERSONAL FINANCE</span><h1>Welcome back, {{firstName}}.</h1><p>Your BankEase workspace, summarized for today.</p></div>
  <a routerLink="/transfers" class="primary">Start a transfer</a>
</div>
@if(error){<div class="alert error">{{error}}</div>}
@if(loading){<app-spinner label="Preparing your financial overview..."/>} @else {
<section class="balance-hero card">
  <div class="balance-main"><span class="eyebrow dark">TOTAL AVAILABLE BALANCE</span><strong>₹{{totalBalance|number:'1.2-2'}}</strong><span>{{accounts.length}} account{{accounts.length===1?'':'s'}} connected to your workspace</span></div>
  <div class="balance-meta"><div><small>Invested value</small><b>₹{{invested|number:'1.2-2'}}</b></div><div><small>Recent transfers</small><b>{{transfers.length}}</b></div><div><small>Session</small><b class="online">Secure</b></div></div>
</section>
<div class="stats-grid compact-stats">
  <div class="stat-card"><div class="stat-top"><span>Accounts</span><span class="stat-icon">01</span></div><strong>{{accounts.length}}</strong><small>Connected accounts</small></div>
  <div class="stat-card"><div class="stat-top"><span>Investments</span><span class="stat-icon">02</span></div><strong>{{investments.length}}</strong><small>Current holdings</small></div>
  <div class="stat-card"><div class="stat-top"><span>Transfers</span><span class="stat-icon">03</span></div><strong>{{transfers.length}}</strong><small>Recorded activity</small></div>
  <div class="stat-card"><div class="stat-top"><span>Banking status</span><span class="stat-icon success">✓</span></div><strong>Active</strong><small>JWT protected session</small></div>
</div>
<div class="dashboard-grid">
  <section class="card hero-card"><div class="card-head"><div><span class="eyebrow dark">YOUR ACCOUNTS</span><h2>Account overview</h2><p>Available balances and account details</p></div><a routerLink="/accounts" class="text-link">Manage accounts →</a></div>
    <div class="account-list">@for(a of accounts;track a.id){<div class="account-row"><div class="account-icon">₹</div><div><b>{{a.accountType}} account</b><span>•••• {{a.accountNumber.slice(-4)}} · {{a.ifscCode}}</span></div><strong>₹{{a.balance|number:'1.2-2'}}</strong></div>} @empty {<app-empty title="No accounts yet" text="Open your first account to start banking."/>}</div>
  </section>
  <section class="card quick-card"><div class="card-head"><div><span class="eyebrow dark">SHORTCUTS</span><h2>Quick actions</h2><p>Jump straight into a task</p></div></div><div class="quick-grid"><a routerLink="/accounts"><span>▣</span>Accounts</a><a routerLink="/beneficiaries"><span>◇</span>Beneficiary</a><a routerLink="/transfers"><span>⇄</span>Transfer</a><a routerLink="/bills"><span>▤</span>Pay bill</a><a routerLink="/loans"><span>◫</span>Loan</a><a routerLink="/investments"><span>◈</span>Invest</a></div></section>
</div>
<section class="card table-card"><div class="card-head"><div><span class="eyebrow dark">ACTIVITY</span><h2>Recent transfers</h2><p>Your latest money movement</p></div><a routerLink="/transfers" class="text-link">View all →</a></div>@if(transfers.length){<div class="table-wrap"><table><thead><tr><th>Reference</th><th>Destination</th><th>Mode</th><th>Amount</th><th>Status</th></tr></thead><tbody>@for(t of transfers.slice(0,5);track t.id){<tr><td class="mono">{{t.referenceNumber}}</td><td>{{t.destinationAccountNumber}}</td><td>{{t.mode}}</td><td class="amount">₹{{t.amount|number:'1.2-2'}}</td><td><app-status [status]="t.status"/></td></tr>}</tbody></table></div>}@else{<app-empty title="No transfers yet" text="Your money movement will appear here."/>}</section>
} `
})
export class DashboardComponent implements OnInit {
  loading = true;
  error = "";
  accounts: Account[] = [];
  transfers: Transfer[] = [];
  investments: Investment[] = [];
  constructor(
    private api: ApiService,
    public auth: AuthService,
  ) {}
  get firstName() {
    return (this.auth.user()?.name || "there").split(" ")[0];
  }
  get totalBalance() {
    return this.accounts.reduce((s, a) => s + Number(a.balance || 0), 0);
  }
  get invested() {
    return this.investments.reduce(
      (s, i) => s + Number(i.currentValue || 0),
      0,
    );
  }
  ngOnInit() {
    Promise.all([
      this.api.accounts.list().toPromise(),
      this.api.transfers.list().toPromise(),
      this.api.investments.list().toPromise(),
    ])
      .then(([a, t, i]) => {
        this.accounts = a || [];
        this.transfers = t || [];
        this.investments = i || [];
      })
      .catch(
        (e) => (this.error = e?.error?.message || "Unable to load dashboard."),
      )
      .finally(() => (this.loading = false));
  }
}
