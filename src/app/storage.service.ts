import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'
import uuid from 'uuid/v1';

import { Address } from './address';
import { ElectronService } from 'ngx-electron';
import { EndPoint } from './end-point';
import { DispatcherService } from './dispatcher.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private electron: ElectronService, private dispatcher: DispatcherService) { }

  //Takes an address and returns an endpoint wrapped by a promise
  async provisionAddressAsync(address:Address):Promise<EndPoint>{

    //Make sure we have a valid address id, if we  don't we'll call save address to generate one
    if(!address.addressId){
      address = await this.saveAddress(address);
    };

    //Get the saved endpoint, and assign the address into it
    const endpoint = await this.getEndpoint();
    endpoint.address = address;

    //Now pass the entire endpoint object into the dispatcher service
    return this.dispatcher.saveEndpointAsync(endpoint);

  }

  async saveAddress(address: Address): Promise<Address> {

    //If the addres paramter does not already contain an address ID - meaning its new, assign it one

    if(!address.addressId){

      address.addressId = uuid();

    }

    //Ionic storage serialises our storage ti JSON so we don't have to.
    //All storage functions return a promise, so await it.

    await this.storage.set(address.addressId, address);

    //Send the address list to the electron process tier. Any the Ionic app requests the address list from storage,
    //or changes it in any way, eg deleting an item - we want to let the Electron app know about it.

    this.updateAddressMenu();
    
    return address;

  }

  //Retrieve all addresses from storage
  //Async as we're awaiting the forEach loop

  async getAddresses(): Promise<Address[]> {


    const addresses = [];

    //Take each address and store them in a local array

    await this.storage.forEach(address => {

      //Because anything can be stored in arrays, only add an item to an array if it has an addressId value

      if(address.addressId){

        addresses.push(address);
      }

    });

    this.updateAddressMenu(addresses);

    //Return the array of addresses

    return addresses;

  }

  //Return a single address passing the addressId as the database key
  //This does not meed to be marked async as we're not awaiting anything

  getAddress(addressId: string): Promise<Address>{

    return this.storage.get(addressId);

  }

  async deleteAddress(addressId: string): Promise<any> {

    await this.storage.remove(addressId);

    this.updateAddressMenu();

  }

  //Let the electron process know about any changes to the address list.

  async updateAddressMenu(addressList: Address[] = null){

    //Check with NgxElectron to see if we're running inside Electron before sending a message

    if(this.electron.isElectronApp){

      //Check to see if the caller passed us an address list paramater - if not, we'll get i from storage using
      // the getAddresses function

      const addresses = addressList || await this.getAddresses();

      //We then use the ipc Renderer object to send the list of addresses to electron, on the 'address' channel.

      this.electron.ipcRenderer.send('addresses', addresses);

    }

  }

  //Save the endpoint to the local storage, using the word 'endpoint' as the storage key
  setEndpoint(endpoint:EndPoint): Promise<void> {

    return this.storage.set('endpoint', endpoint);

  }

  //Retrieve a value fro the localstore using the endpoint key
  async getEndpoint(): Promise<EndPoint> {
    
    const endpoint = await this.storage.get('endpoint');
    //Return an empty object if it's null
    return endpoint || {};
  }

}
