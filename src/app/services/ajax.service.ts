import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class AjaxService {

  private urlBase: string;

  constructor(public http: Http) {
    this.urlBase = environment.api.url;
  }

  buildUrl(endpoint) {
    if (endpoint.param) {
      return this.urlBase + endpoint.id + '/' + endpoint.param;
    }

    return this.urlBase + endpoint;
  }

  /**
   * Request method
   * @param  {string}                 method
   * @param  {string | Object}        endpoint   Could be an string or an object (if composed url)
   * @param  {any}                    data
   * @param  {Object}                 options
   * @return {Promise<any>}           Request response
   */
  request(method: string, endpoint, data?, options?: Object): Promise<any> {

    const url = this.buildUrl(endpoint);

    return this.http[method](url, data, options)
        .toPromise()
        .then(response => response.json());
  }

  get(endpoint): Promise<any> {
    return this.request('get', endpoint);
  }

  post(endpoint, data: Object): Promise<any> {
    return this.request('post', endpoint, data);
  }

  put(endpoint, data: Object): Promise<any> {
    return this.request('put', endpoint, data);
  }
}
