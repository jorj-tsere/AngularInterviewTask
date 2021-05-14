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

  on(CustomerActions.loadCustomers, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.loadCustomersSuccess, (state, action) =>
    adapter.setAll(action.customers, {
      ...state,
      loading: false,
    })
  ),
  on(CustomerActions.loadCustomersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
  // on(CustomerActions.addCustomer,
  //   (state, action) => adapter.addOne(action.customer, state)
  // ),
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
