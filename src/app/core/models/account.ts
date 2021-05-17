export interface Account {
  id?: number;
  customerId: number;
  accountTypeId: number;
  accountType: string;
  ccyId: number;
  ccy: string;
  accountStatusID: number;
  accountStatus: string;
}
