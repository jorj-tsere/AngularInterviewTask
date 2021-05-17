import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {} from 'primeng/';
import { AppState } from '@store-barrel';
import { select, Store } from '@ngrx/store';
import { logoutUser } from '@store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { authViewModel } from '@store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] = [];
  userModel: any;
  userModel$: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) {
    const sub = this.store.pipe(select(authViewModel)).subscribe((model) => {
      this.userModel = model;
      this.items = [
        {
          label: model.user?.username,
          items: [
            {
              label: 'sign out',
              icon: 'pi pi-sign-out',
              command: () => {
                this.logout();
              },
            },
          ],
        },
      ];
    });
    this.subscriptions.push(sub);
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }

  ngOnInit(): void {

  }
}
