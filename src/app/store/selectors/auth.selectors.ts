import { User } from '@core/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const isLogged = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState): boolean => state.user != null
);

export const authViewModel = createSelector(
  selectAuthState,
  isLogged,
  (state: fromAuth.AuthState, logged: boolean) => {
    return {
      loading: state.loading,
      isLogged: logged,
      user: state.user,
    };
  }
);
