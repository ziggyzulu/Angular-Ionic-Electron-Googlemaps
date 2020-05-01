import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EndPoint} from './end-point';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  //This lets a user set an address as their current address for this theoretical
  //emergency services app

  constructor(private http: HttpClient) { }

  //Each of these functions take an endpoint and return an endpoint wrapped in a promise

  public async saveEndpointAsync(endpoint: EndPoint){

    //Use a ternary conditional to determine are we saving or updating an existing endpoint
    //by checking wether or not the endppint has an id. If it has - update, if not - add.
    //The appropriate function is awaited and it's response assigned to the 'saved' constant.
    const saved = endpoint.id
                ? await this.updateAsync(endpoint)
                : await this.addAsync(endpoint);

    //Once it's saved, pass it to the provisionAsync
    return this.provisionAsync(saved);

  }


  private async addAsync(endpoint: EndPoint){

    //Get the dispatchers base url from the environment to construct the route
    const url = `${environment.dispatcherUrl}/endpoints`;

    //Build the request itself using the HTTP client, converting the observable returned
    // to a promise and awaiting it
    const ep = await this.http.post<EndPoint>(url, endpoint).toPromise();

    //Assign the id of the endpoint returned to the id of the original paramter. 
    endpoint.id = ep.id;

    return endpoint;

  }


  private async updateAsync(endpoint: EndPoint){

    //Get the dispatchers base url from the environment to construct the route
    const url = `${environment.dispatcherUrl}/endpoints`;

    //Use http.put mtehod for updating
    const ep = await this.http.put<EndPoint>(url, endpoint).toPromise();

    //Return the endpoint object
    return endpoint;

  };


  private async provisionAsync(endpoint: EndPoint){

    //Get the dispatchers base url from the environment to construct the route
    const url = `${environment.dispatcherUrl}/endpoints/${endpoint.id}`;

    const ep = await this.http.put<EndPoint>(url, endpoint).toPromise();

    //The address status off the address object in the endpoint will have a new status value
    //so copy it into the endppoint provided, updating it.
    endpoint.address.addressStatus = ep.address.addressStatus;

    return endpoint;

  };

}
