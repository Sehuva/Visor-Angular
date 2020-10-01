import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponentFormComponent } from './item-component-form.component';

const routes: Routes = [{ path: '', component: ItemComponentFormComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemComponentFormRoutingModule { }