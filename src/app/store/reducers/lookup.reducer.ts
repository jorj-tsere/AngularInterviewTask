import { ListObject } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';
import { loadLookupsSuccess } from '@store/actions/lookup.actions';

export const lookupFeatureKey = 'lookup';

export interface LookupState {
  gender: ListObject[];
  ccy: ListObject[];
  account_types: ListObject[];
  account_statuses: ListObject[];
  loaded: boolean;
}

export const initialState: LookupState = {
  gender: [],
  ccy: [],
  account_types: [],
  account_statuses: [],
  loaded: false
};

export const reducer = createReducer(
  initialState,
  on(loadLookupsSuccess, (state, { payload }) => {
    return {
      ...state,
      account_statuses: payload.account_statuses,
      account_types: payload.account_types,
      ccy: payload.ccy,
      gender: payload.gender,
      loaded: true
    };
  })
);
