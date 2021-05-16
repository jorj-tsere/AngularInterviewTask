import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Customer } from '@core/models';

/**
 *  CUSTOMER LIST
 *
 */

export const loadCustomers = createAction(
  '[Customer list page -- Customer List page] Load Customers'
);

export const loadCustomersSuccess = createAction(
  '[Customer list || Effect] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer list || Effect] Load Customers Failure',
  props<{ error: any }>()
);

/**
 *  CUSTOMER
 *
 */

export const loadCustomer = createAction(
  '[Customer Details Page] Load Customer Details',
  props<{ id: number }>()
);

export const loadCustomerSuccess = createAction(
  '[Customer Details Page || Effect] Load Customer Success',
  props<{ customer: Customer }>()
);

export const loadCustomerFailure = createAction(
  '[Customer Details Page || Effect] Load Customer Failure',
  props<{ error: any }>()
);

/**
 *  CREATE CUSTOMER
 *
 */

export const createCustomer = createAction(
  '[Create Customer Page] Create Customer',
  props<{ customer: Customer }>()
);

export const createCustomerSuccess = createAction(
  '[Create Customer || Effect ] Create Customer Success',
  props<{ customer: Customer }>()
);

export const createCustomerFailure = createAction(
  '[Create Customer || Effect] Load Customer Failure',
  props<{ error: any }>()
);

// export const addUsersPage = createAction(
//   '[UsersPage/API] Add UsersPage',
//   props<{ usersPage: UsersPage }>()
// );

// export const upsertUsersPage = createAction(
//   '[UsersPage/API] Upsert UsersPage',
//   props<{ usersPage: UsersPage }>()
// );

// export const addUsersPages = createAction(
//   '[UsersPage/API] Add UsersPages',
//   props<{ usersPages: UsersPage[] }>()
// );

// export const upsertUsersPages = createAction(
//   '[UsersPage/API] Upsert UsersPages',
//   props<{ usersPages: UsersPage[] }>()
// );

// export const updateUsersPage = createAction(
//   '[UsersPage/API] Update UsersPage',
//   props<{ usersPage: Update<UsersPage> }>()
// );

// export const updateUsersPages = createAction(
//   '[UsersPage/API] Update UsersPages',
//   props<{ usersPages: Update<UsersPage>[] }>()
// );

// export const deleteUsersPage = createAction(
//   '[UsersPage/API] Delete UsersPage',
//   props<{ id: string }>()
// );

// export const deleteUsersPages = createAction(
//   '[UsersPage/API] Delete UsersPages',
//   props<{ ids: string[] }>()
// );

// export const clearUsersPages = createAction(
//   '[UsersPage/API] Clear UsersPages'
// );

// export const loadCustomers = createAction(
//   '[Customer/API] Load Customers',
//   props<{ customers: Customer[] }>()
// );

// export const addCustomer = createAction(
//   '[Customer/API] Add Customer',
//   props<{ customer: Customer }>()
// );

// export const upsertCustomer = createAction(
//   '[Customer/API] Upsert Customer',
//   props<{ customer: Customer }>()
// );

// export const addCustomers = createAction(
//   '[Customer/API] Add Customers',
//   props<{ customers: Customer[] }>()
// );

// export const upsertCustomers = createAction(
//   '[Customer/API] Upsert Customers',
//   props<{ customers: Customer[] }>()
// );

// export const updateCustomer = createAction(
//   '[Customer/API] Update Customer',
//   props<{ customer: Update<Customer> }>()
// );

// export const updateCustomers = createAction(
//   '[Customer/API] Update Customers',
//   props<{ customers: Update<Customer>[] }>()
// );

// export const deleteCustomer = createAction(
//   '[Customer/API] Delete Customer',
//   props<{ id: string }>()
// );

// export const deleteCustomers = createAction(
//   '[Customer/API] Delete Customers',
//   props<{ ids: string[] }>()
// );

// export const clearCustomers = createAction(
//   '[Customer/API] Clear Customers'
// );
