import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemComponentRoutingModule } from './item-component-routing.module';
import { ItemComponentComponent } from './item-component.component';
import { ItemComponentFormModalComponent } from './item-component-form-modal/item-component-form-modal.component';

@NgModule({
  declarations: [ItemComponentComponent, ItemComponentFormModalComponent],
  imports: [
    SharedModule,
    ItemComponentRoutingModule
  ]
})
export class ItemComponentModule { }