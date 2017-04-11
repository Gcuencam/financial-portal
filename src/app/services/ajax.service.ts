import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";


@Injectable()
export class AjaxService {

  private urlBase: string;
  private result;

  constructor(public http: Http) {
    this.urlBase = environment.api.url;
  }

  /**
   * buildUrl - Build all the url with the base and the variable.
   *
   * @param  {string} endpoint
   * @return {string}
   */
  buildUrl(endpoint) {

    if (endpoint.param) {
      return this.urlBase + endpoint.id + '/' + endpoint.param;
    }

    return this.urlBase + endpoint;

  }

  /**
   * getRequest - Generates ajax request.
   *
   * @param  {string} endpoint
   * @return {Observable}
   */
  getRequest(endpoint): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('JsonStub-User-Key', '9facef2e-9583-4a83-9f08-c87159f1c113');
    headers.append('JsonStub-Project-Key', '6ed070c1-b334-4612-8fa8-169c5e45baef');

    return this.http.get(this.buildUrl(endpoint), { headers: headers });

  }


}
