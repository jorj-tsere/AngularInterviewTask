import { state } from '@angular/animations';
import { User } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from '@store/actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loading: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  loading: false,
  user: null,
};

export const reducer = createReducer(
  initialState,
  // tslint:disable-next-line:no-shadowed-variable
  on(authActions.loginPage, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(
    authActions.loginSuccess,
    // tslint:disable-next-line:no-shadowed-variable
    authActions.browserReload, (state, action) => {
    return {
      ...state,
      user: action.user,
      loading: false,
    };
  }),
  // tslint:disable-next-line:no-shadowed-variable
  on(authActions.loginFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
   // tslint:disable-next-line:no-shadowed-variable
   on(authActions.logoutUser, (state) => {
    return {
      ...state,
      user: null,
      loading: false,
    };
  })
);
