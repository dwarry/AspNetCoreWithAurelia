import * as env from './environment';
import * as LogManager from 'aurelia-logging';
import { HttpClient, HttpClientConfiguration } from 'aurelia-fetch-client';

export class WebApiBase {
    protected _apiBase = env.default.apiBaseUrl;
    protected _httpClient = new HttpClient();
    protected _log: LogManager.Logger;

    protected constructor(logName: string) {
        this._log = LogManager.getLogger(logName);

        this.initializeHttpClient();
    }

    initializeHttpClient() {
        const log = this._log;

        this._httpClient.configure(config => {
            config
                .withBaseUrl(this._apiBase)
                .withDefaults({
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    },
                    mode: 'cors'

                })
                .withInterceptor({
                    request(request) {
                        log.debug(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response) {
                        log.debug(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });
    }
}