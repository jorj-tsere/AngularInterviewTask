
import { AuthRequest, User } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const loginPage = createAction(
  '[Login Component] Login User',
  props<{ payload: AuthRequest }>()
);

export const loginSuccess = createAction(
  '[Login || Effect] Login User Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login || Effect] Login User Failure',
  props<{ error: any }>()
);
