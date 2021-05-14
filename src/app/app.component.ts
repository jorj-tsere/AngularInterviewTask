import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { browserReload } from '@store/actions/auth.actions';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-interview-task';

  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store<AppState>,
    private jwtHelper: JwtHelperService
  ) {
    const accessToken = this.jwtHelper.tokenGetter();
    if (accessToken) {
      const user = this.jwtHelper.decodeToken(accessToken);
      this.store.dispatch(browserReload({ user }));
    }
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
