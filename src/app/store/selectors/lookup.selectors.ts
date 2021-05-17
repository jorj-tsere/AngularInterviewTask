import { Lookups } from '@core/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLookup from '@store/reducers/lookup.reducer';

export const selectAuthState = createFeatureSelector<fromLookup.LookupState>(
  fromLookup.lookupFeatureKey
);


export const isLoaded = createSelector(
  selectAuthState,
  (state: fromLookup.LookupState): boolean => {
    console.log('state', state);
    return state.loaded;
  }
);


export const Lookup = createSelector(
  selectAuthState,
  isLoaded,
  (state: fromLookup.LookupState, alreadyLoaded: boolean): Lookups => {
    return {
      gender: state.gender,
      ccy: state.ccy,
      account_types: state.account_types,
      account_statuses: state.account_statuses,
      loaded: alreadyLoaded
    };
  }
);
