import { AuthRequest, User } from '@core/models';
import { createAction, props } from '@ngrx/store';

/**
 * ****************************************************
 * AUTH LOGIN ACTIONS
 * ****************************************************
 */

export const accountAlredyExists = createAction(
  '[Account Create ] create new account Failure'
);


