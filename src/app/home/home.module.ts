import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {ReactiveFormsModule} from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
