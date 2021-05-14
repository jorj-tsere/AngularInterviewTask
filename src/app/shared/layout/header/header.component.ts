import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {} from 'primeng/';
import { AppState } from '@store-barrel';
import { select, Store } from '@ngrx/store';
import { logoutUser } from '@store/actions/auth.actions';
import { Observable } from 'rxjs';
import { authViewModel } from '@store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] = [];
  userModel$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.userModel$ = this.store.pipe(select(authViewModel));
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'user',
        items: [{ label: 'Profile', icon: 'pi pi-fw pi-plus' }],
      },
      {
        label: 'Quit',
        items: [
          {
            label: 'sign out',
            icon: 'pi pi-sign-out',
            command: (e) => {
              console.log('e', e);
              this.logout();
            },
          },
        ],
      },
    ];
  }
}
