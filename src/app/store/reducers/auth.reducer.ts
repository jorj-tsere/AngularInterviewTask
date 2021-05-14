import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  error: any;
}

export const initialState: AuthState = {
  error: null,
};

export const reducer = createReducer(
  initialState

  // on(AuthActions.login, state => state),
  // on(AuthActions.loadAuthsSuccess, (state, action) => state),
  // on(AuthActions.loadAuthsFailure, (state, action) => state),
);
