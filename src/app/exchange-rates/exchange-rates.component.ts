import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.retrieveExchangeRates();
  }

  retrieveExchangeRates() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "ZAR") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
      this.rates = result.data && result.data.rates;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
