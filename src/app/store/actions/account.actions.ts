import { AuthRequest, User } from '@core/models';
import { createAction, props } from '@ngrx/store';

/**
 * ****************************************************
 * AUTH LOGIN ACTIONS
 * ****************************************************
 */

export const accountAlredyExists = createAction(
  '[ Account Create ] create new account Failure'
);


export const accountSuccessfullyRemoved = createAction(
  '[ Account Deleted ] Account Delete'
);

export const accountStatusSuccessfullyChanged = createAction(
  '[ Account Status Change ] Account status changed'
);

export const createAccountSuccessfully = createAction(
  '[ Account create ] Account craete successfully'
);


