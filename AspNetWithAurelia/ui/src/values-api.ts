import { WebApiBase } from './web-api-base';

export class ValuesApi extends WebApiBase {
    constructor() {
        super("ValuesApi");
    }

    retrieveValues() {
        const result = this._httpClient.fetch("values").then(
            response => response.status === 200 ? response.json() : null
        );

        return result;
    }
}