import { Customer } from '@core/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomer from '@store/reducers/customer.reducer';

export const selectCustomersState =
  createFeatureSelector<fromCustomer.CustomerState>(
    fromCustomer.customersFeatureKey
  );

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomer.selectAll
);

export const selectAllIDs = createSelector(
  selectCustomersState,
  fromCustomer.selectIds
);

export const selectAllEntities = createSelector(
  selectCustomersState,
  fromCustomer.selectEntities
);

export const selectLoadingStatus = createSelector(
  selectCustomersState,
  (state): boolean => {
    return state.loading;
  }
);

export const selectError = createSelector(
  selectCustomersState,
  (state): boolean => {
    return state.error;
  }
);

export const selectEntity = createSelector(
  selectAllEntities,
  (entities: any, props: any) => entities[props.id]
);

export const entityExists = createSelector(
  selectAllEntities,
  (entities: any, props: any): boolean => {
    return entities[props.id] !== undefined ? true : false;
  }
);

export const selectEntityById = createSelector(
  selectAllEntities,
  (entities: any, props: any): Customer => {
    console.log('props', props, 'then', entities, entities[props.id]);
    return entities[props.id];
  }
);

export const selectAllCustomersViewModel = createSelector(
  selectAllCustomers,
  selectLoadingStatus,
  selectError,
  (Customers: Customer[], loading: boolean, error: any): any => {
    return {
      Customers,
      loading,
      error,
    };
  }
);
