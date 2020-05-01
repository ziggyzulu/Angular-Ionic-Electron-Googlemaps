import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Address} from '../address';
import { MapsService } from '../maps.service';
import {MouseEvent} from '@agm/core';
import { StorageService } from '../storage.service';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import {ElectronService} from 'ngx-electron';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { EndPoint } from '../end-point';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  endpoint: EndPoint = {};
  endpointForm: FormGroup;

  //A variable that represents the HTML textbox for the name field.
  //By decorating a variable declaration with the viewChild decarator, we tell Angular that this variable
  //is connected to a HTML element inside the view idenfieid by the word 'endpointName'.
  @ViewChild('endpointName', {static:false}) nameField: IonInput;

  selectedAddress: Address = {

    addressLine1: '4 Yawkey Way',
    city: 'Boston',
    state: 'MA',
    zipCode: '02215',
    latitude: '42.3466764',
    longitude: '-71.0994065'
  };

  //Create address variable as an array of Address objects, initialize as empty.
  addresses: Address[] = [];

  highlightedAddress: Address;

  constructor(private maps: MapsService, 
    private storage: StorageService, 
    private alertController: AlertController, 
    private electron: ElectronService,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toastController: ToastController) {

      this.initEndpointForm();

    }

    initEndpointForm() {
      const phonePattern = /^1[0-9]{10}$/;
  
      this.endpointForm = this.fb.group({
        name: [this.endpoint.name, Validators.required],
        elin: [this.endpoint.elin, [Validators.required, Validators.pattern(phonePattern)]]
      });
    }
  
  async ngOnInit() {

    //On init, await a call to the storage service and assign it's return value to the addresses array
    this.addresses = await this.storage.getAddresses();

    //Load the endpoint and populate the form when the app starts
    await this.loadEndpoint();
    //If there is no endpoint, we won't have a name - and in that case we can remind the user to provide it.
    if(!this.endpoint.name){
      this.promptForInfo();
    }

    if(this.electron.isElectronApp){

      //Listen to data from Electron on the 'setAddress' channel. This triggers when an address is clicked on 
      //from the system tray menu, setting the address to be the selected address - panning the location to it.
      this.electron.ipcRenderer.on('setAddress', (evt, addressId) =>{

        //Some functions and changes happen outside the knowlegde of Angular, and it doesn't know to update
        //the view. Calling a function from ngZone.run will let angular know that it needs to run change detection as
        //part of the operation
        this.ngZone.run(() => this.setAddressById(addressId));

      })

    }

  }

  //Display a toast notifaction to remind the user to fill in the form
  async promptForInfo(){

    //Call the toast controllers create method, passing in the options object
    const toast = await this.toastController.create({

      position: 'bottom', // 'top, 'middle'
      duration: 5000, //Time in ms
      buttons:[{text: 'OK', role: 'cancel'}],
      header: 'Provide Your Info', //Title of the toast
      message: 'Pinpoint needs your name and phone number to set your current address.'

    });

    //Set the focus of the browser to the name field
    this.nameField.setFocus();

    await toast.present();

  }

  async setAddressById(addressId: string){

    const address = await this.storage.getAddress(addressId);

    if(address){

      this.provisionAsync(address);

    }

  }

  
  //This is to set an address as your current address. (This app is a theoretical emergency services app that lets a user
  // save commonly visited addresses and set one as a current address for emergency services purposes)
  async provisionAsync(address:Address){

    //First ensure we really do have a valid enpoint by checking both properties
    if(this.endpoint.elin && this.endpoint.name){

      //If so, call the provison function in the storage serverice, which we
      //must await as it returns a promise
      await this.storage.provisionAddressAsync(address);

      //Once we get a response, we can set both the selected and highlighted addresses to the endpoint returned
      this.selectedAddress = address;
      this.highlightedAddress = address;

    }else{

      //If we still don't have a valid endpoint, prompt the user to provide those values again.
      this.promptForInfo();

    }

  }

  //This is called from the (mapClick) property set in in AGM in the HTML file, having the event passed into it

  public async onMapClick(event: MouseEvent){

    //Seeing as MouseEvent is imported from agm/core, the event has placeId and coord objects.

    const place = event.placeId || event.coords

    //Now pass either of these these to the map service geocode function.
    // This function returns a promise, so we'll await it, and set the result equal
    //to a local constanst called 'address'

    const address = await this.maps.geocode(place);

    //Save the address using the storage service, which assigns it an addressId

    this.highlightedAddress = await this.storage.saveAddress(address);

    //Now push this address into our array of addresses

    this.addresses.push(this.highlightedAddress);

  }

  async onDeleteClick(address : Address){

    //Create an alert to display when the user clicks the delete button

    const alert = this.alertController.create({

      header: 'Delete address?',
      message: 're you sure you want to delete this address?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        },{
        text: 'Delete it',
        handler: () => this.doDelete(address)
        }
      ]

    });

    // await a call to the present function, display it on the screen and wait for a user to take action
    // It's not really blocking the UI, so we have to await it.

    await (await alert).present();


  }

  async doDelete(address: Address){

    //Delete an address using it's address ID - which is assigned to it when saved.

    await this.storage.deleteAddress(address.addressId);

    this.highlightedAddress = null;

    //Use the filter function to remove the address from our array list.

    this.addresses = this.addresses.filter(addr => addr.addressId !== address.addressId);

    //In the likelyhood that some other process is adding and deleting addresses, 
    // you could call the getAddresses() function from the storage service again

    // this.addresses = await this.storage.getAddresses();

  }

  async saveEndpoint(){

    //Pass the form's value and pass it to the storage service
    await this.storage.setEndpoint(this.endpointForm.value);

    return this.loadEndpoint();

  };

  //Calls getenpoint from storage, sets the local variable, and then rests the form so that Angular
  //no longer considers it dirty. This is a common pattern whenever a form submitted remains visible on the screen.
  async loadEndpoint(){

    this.endpoint = await this.storage.getEndpoint();

    this.endpointForm.reset(this.endpoint);

  }

}
