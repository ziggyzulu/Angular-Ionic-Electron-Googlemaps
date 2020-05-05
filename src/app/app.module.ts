import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    //API for google maps, through the AngularGoogleMaps package
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    HttpClientModule,
    IonicStorageModule.forRoot({ name: 'pinpoint' }),
    NgxElectronModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //To ensure that google maps is loaded before we can use it
    //Create a new provder object which is an app initializer
    { provide: APP_INITIALIZER,
      //The factory function to call, initialized below
      useFactory: initMaps,
      //Have it depend on the map loader, which is available from the AGM core
      deps: [MapsAPILoader],
      //An angular app can provide more than one app initializer, so we have to set multi to true
      multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

//The facotry function itself returns the promise returned by calling the map API
// loader's load function
function initMaps(mapLoader:MapsAPILoader): () => Promise<void> {
  return () => mapLoader.load();
}
