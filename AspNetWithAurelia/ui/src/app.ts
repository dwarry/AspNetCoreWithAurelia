import { autoinject } from 'aurelia-framework';
import { ValuesApi } from './values-api';

@autoinject
export class App {
  message = 'Hello World!';

  values: string[];

  errorMessage = null;

  constructor(private _valuesApi: ValuesApi) { }

  activate() {
    this._valuesApi.retrieveValues().then(
      data => {
        this.values = data || [];
        this.errorMessage = null;
      },
      reason => {
        this.values = [];
        this.errorMessage = reason;
      });
  }
}
