import { environment } from '@env';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromCustomer from './reducers/customer.reducer';


export interface AppState {

  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromCustomer.customersFeatureKey]: fromCustomer.CustomerState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromCustomer.customersFeatureKey]: fromCustomer.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
