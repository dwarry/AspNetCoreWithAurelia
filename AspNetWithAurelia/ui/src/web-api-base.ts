import * as env from './environment';
import * as LogManager from 'aurelia-logging';
import { HttpClient, HttpClientConfiguration } from 'aurelia-fetch-client';

export class WebApiBase {
    protected _apiBase = env.default.apiBaseUrl;
    protected _httpClient = new HttpClient();
    protected _log = LogManager.getLogger("WebApi");

    constructor() {
    }

    initializeHttpClient() {
        this._httpClient.configure(config => {
            config
                .withBaseUrl(this._apiBase)
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .withInterceptor({
                    request(request) {
                        this._log.debug(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response) {
                        this.log.debug(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });
    }
}