import { Injectable } from '@angular/core';
//Import the blank module we made so it knows to look for googlemaps
import {} from 'googlemaps';
import { resolve } from 'url';
import {Address} from './address';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private geocoder = new google.maps.Geocoder();

  constructor() { }

  //Call this whenever a user clicks on the map
  //It can take either a string - which means the user clicked on an item on the map that has a google place ID,
  // or they clicked on a location that has a raw lat/lang location
  //This geocode function is asynchronous, and returns a promise containing an address

  public geocode(placeIdOrLoction: string | google.maps.LatLngLiteral): Promise<Address> {

    //Create the promise to return

    return new Promise<Address>((resolve,reject) => {

      //Analyse the type of the paramater, setting the location property or place ID
      const params: google.maps.GeocoderRequest = typeof placeIdOrLoction === 'string'
        ? {placeId: placeIdOrLoction}
        : {location: placeIdOrLoction};

        //Now we pass it to the geocoder's geocode function (part of the maps API),
        // and returns a place based on the information we provide
        this.geocoder.geocode(params, (results, status) => {

          //If it's successful, it returns status.ok in the callback,
          //if there's an error, we grab it and reject the promise

          if(status !== google.maps.GeocoderStatus.OK){
            return reject(status);
          }

          //If the call is successful, we'll parse the first result in the array of results
          //as google maps could return more than one result

          const result = results[0];

          console.debug('Geocoding returned', result);

          //The result is parsed into an address
          //And passed to the caller when we resolve the promise
          //The parser function (below)loops through the list of key/value pairs from the result
          // and constructs an address object from the important /relevant pieces

          const address = this.parseResult(result);
          resolve(address);

        });

    });

  }

  private parseResult(result: google.maps.GeocoderResult): Address {

    const components = result.address_components;

    //Createa new map where key/values are both strings
    const parsed = new Map<string, string>();

    //for each compoent of the google result,
    // add them as a new key/value to the parse map.

    for(const component of components){

      for(const type of component.types){

        parsed.set(type, component.short_name);

      }

    }

    //Construct an address object using the key's of the parse map, and the raw lat/lang data from the result

    const address = {

      addressLine1: parsed.get('street_address') || `${parsed.get('street_number')} ${parsed.get('route')}`,
      city: parsed.get('locality'),
      state: parsed.get('administrrative_are_level_1'),
      zipCode: parsed.get('postal_code'),
      placeId: result.place_id,
      latitude: result.geometry.location.lat().toString(),
      longitude: result.geometry.location.lng().toString()

    };

    return address;


  }


}
