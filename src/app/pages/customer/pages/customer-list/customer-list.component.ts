import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public resolverData$: Observable<any>;
  constructor(private activatedRoute: ActivatedRoute) {
    this.resolverData$ = this.activatedRoute.data;
    this.activatedRoute.data.subscribe(items => {
      console.log(items);
    });
  }

  ngOnInit(): void {}

}
