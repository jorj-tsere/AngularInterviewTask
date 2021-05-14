import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '@core/models';
import { Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { loginPage } from '@store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
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
