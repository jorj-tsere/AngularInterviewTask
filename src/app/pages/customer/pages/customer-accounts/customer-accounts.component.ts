import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lookups } from '@core/models';
import { LookupService } from '@core/services/lookup.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.scss'],
})
export class CustomerAccountsComponent implements OnInit {
  customerId: number;
  lookups: Lookups;
  uuid = uuidv4();

  constructor(
    private route: ActivatedRoute,
    private lookupService: LookupService
  ) {
    console.log();
    this.customerId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getCollectionLists();
  }
  // tslint:disable-next-line:typedef
  async getCollectionLists() {
    this.lookups = await this.lookupService.lookups().toPromise();
    console.log('this.lookups', this.lookups);
  }
}
