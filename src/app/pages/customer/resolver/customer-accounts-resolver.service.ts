import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '@core/services/account.service';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerAccountsResolverService {
  constructor(private accuntService: AccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id = route.parent?.params.id;
    if (this.isNumber(id)) {
      return this.accuntService.getAccountsByCustomerId(+id);
    }
  }

  isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
