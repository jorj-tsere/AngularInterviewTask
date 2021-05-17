import { ListObject } from '.';

export interface Lookups {
  account_statuses: ListObject[];
  account_types: ListObject[];
  ccy: ListObject[];
  gender: ListObject[];
  loaded?: boolean;
}
