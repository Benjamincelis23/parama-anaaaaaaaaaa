import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecerbaPageRoutingModule } from './recerba-routing.module';

import { RecerbaPage } from './recerba.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecerbaPageRoutingModule
  ],
  declarations: [RecerbaPage]
})
export class RecerbaPageModule {}
