import { Lookups } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const loadLookups = createAction(
  '[ Lookup || App bootstrap component ] Load Lookups'
);

export const loadLookupsSuccess = createAction(
  '[ Lookup || Effect ] Load Lookups Success',
  props<{ payload: Lookups }>()
);

export const loadLookupsFailure = createAction(
  '[ Lookup || Effect ] Load Lookups Failure',
  props<{ error: any }>()
);
