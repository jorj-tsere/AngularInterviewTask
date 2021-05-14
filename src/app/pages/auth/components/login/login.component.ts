import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '@core/models';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { loginPage } from '@store/actions/auth.actions';
import { authViewModel } from '@store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public authUserViewModel$: Observable<any>;



  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.authUserViewModel$ = this.store.pipe(select(authViewModel));
    this.form = this.fb.group({
      username: ['test1@gmail.com', Validators.required],
      password: ['test1', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    const credentials: AuthRequest = this.form.getRawValue();
    console.log('credentials', credentials);
    this.store.dispatch(loginPage({ payload: credentials }));
  }
}
