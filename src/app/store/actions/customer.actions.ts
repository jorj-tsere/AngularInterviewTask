import { createAction, props } from '@ngrx/store';
import { Customer } from '@core/models';

/**
 * ********************************************
 *  CUSTOMER LIST
 * ********************************************
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
 * ********************************************
 *  CUSTOMER LOAD CUSTOMER
 * ********************************************
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
 * ********************************************
 * CREATE CUSTOMER
 * ********************************************
 */

export const createCustomer = createAction(
  '[Customer Details component]  Create Customer',
  props<{ customer: Customer }>()
);

export const createCustomerSuccess = createAction(
  '[Customer Details || EFFECT ] Create Customer Success',
  props<{ customer: Customer }>()
);

export const createCustomerFailure = createAction(
  '[Customer Details || EFFECT ]  Create Customer Failure',
  props<{ error: any }>()
);

/**
 * ********************************************
 *  UPDATE CUSTOMER
 * ********************************************
 */

export const updateCustomer = createAction(
  '[Customer Details component] Update Customer',
  props<{ customer: Customer; id: number }>()
);

export const updateCustomerSuccess = createAction(
  '[Customer Details || Effect ] Update Customer Success',
  props<{ customer: Customer }>()
);

export const updateCustomerFailure = createAction(
  '[Customer Details || Effect ] Update Customer Failure',
  props<{ error: any }>()
);

/**
 * ********************************************
 *  REMOVE CUSTOMER
 * ********************************************
 */

export const removeCustomer = createAction(
  '[Customer List Page] Remove Customer',
  props<{ id: string }>()
);

export const removeCustomerSuccess = createAction(
  '[Customer List || Effect] Remove Customer Success',
  props<{ id: string }>()
);

export const removeCustomerFailure = createAction(
  '[Customer List || Effect] Remove Customer Failure',
  props<{ error: any }>()
);
