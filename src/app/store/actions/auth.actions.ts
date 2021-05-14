import { AuthRequest, User } from '@core/models';
import { createAction, props } from '@ngrx/store';

/**
 * ****************************************************
 * AUTH LOGIN ACTIONS
 * ****************************************************
 */

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

/**
 * ****************************************************
 * AUTH LOGOUT ACTIONS
 * ****************************************************
 */

export const logoutUser = createAction('[Header Component] Logout User');

export const logoutUserSuccess = createAction('[Header Component] Logout User Success');

export const logoutUserFailure = createAction('[Header Component] Logout User Failure');

/**
 * ****************************************************
 * AUTH LOGOUT ACTIONS
 * ****************************************************
 */

export const browserReload = createAction(
  '[Core Component] Browser Reload',
  props<{ user: User }>()
);
