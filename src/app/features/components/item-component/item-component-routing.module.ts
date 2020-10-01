import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponentComponent } from './item-component.component';

const routes: Routes = [{ path: '', component: ItemComponentComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemComponentRoutingModule { }