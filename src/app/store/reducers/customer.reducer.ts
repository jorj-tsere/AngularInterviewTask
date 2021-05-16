import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as CustomerActions from '../actions/customer.actions';
import { Customer } from '@core/models';

export const customersFeatureKey = 'customers';

export interface CustomerState extends EntityState<Customer> {
  error: any;
  loading: boolean;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: CustomerState = adapter.getInitialState({
  error: null,
  loading: true,
});

export const reducer = createReducer(
  initialState,
  /**
   * LOAD CUSTOMERS
   */
  on(
    CustomerActions.loadCustomers,
    CustomerActions.loadCustomer,
    CustomerActions.createCustomer,
    CustomerActions.updateCustomer,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),
  on(CustomerActions.loadCustomersSuccess, (state, action) =>
    adapter.setAll(action.customers, {
      ...state,
      loading: false,
    })
  ),
  on(
    CustomerActions.loadCustomersFailure,
    CustomerActions.loadCustomerFailure,
    CustomerActions.createCustomerFailure,
    CustomerActions.updateCustomerFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(CustomerActions.loadCustomerSuccess, (state, { customer }) =>
    adapter.addOne(customer, {
      ...state,
      loading: false,
    })
  ),
  /**
   * ADD CUSTOMERS
   */

  on(CustomerActions.createCustomerSuccess, (state, { customer }) => {
    return adapter.addOne(customer, {
      ...state,
      loading: false,
    });
  }),

  /**
   * REMOVE CUSTOMERS
   */
  on(CustomerActions.removeCustomer, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.removeCustomerSuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      loading: false,
    });
  }),
  on(CustomerActions.createCustomerFailure, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(CustomerActions.updateCustomerSuccess, (state, { customer }) => {
    return adapter.upsertOne(customer, state);
  })
  // on(CustomerActions.upsertCustomer,
  //   (state, action) => adapter.upsertOne(action.customer, state)
  // ),
  // on(CustomerActions.addCustomers,
  //   (state, action) => adapter.addMany(action.customers, state)
  // ),
  // on(CustomerActions.upsertCustomers,
  //   (state, action) => adapter.upsertMany(action.customers, state)
  // ),
  // on(CustomerActions.updateCustomer,
  //   (state, action) => adapter.updateOne(action.customer, state)
  // ),
  // on(CustomerActions.updateCustomers,
  //   (state, action) => adapter.updateMany(action.customers, state)
  // ),
  // on(CustomerActions.deleteCustomer,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(CustomerActions.deleteCustomers,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  // on(CustomerActions.loadCustomers,
  //   (state, action) => adapter.setAll(action.customers, state)
  // ),
  // on(CustomerActions.clearCustomers,
  //   state => adapter.removeAll(state)
  // ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
