import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecerbaPage } from './recerba.page';

const routes: Routes = [
  {
    path: '',
    component: RecerbaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecerbaPageRoutingModule {}
