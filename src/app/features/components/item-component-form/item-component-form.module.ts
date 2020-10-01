import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemComponentFormRoutingModule } from './item-component-form-routing.module';
import { ItemComponentFormComponent } from './item-component-form.component';

@NgModule({
  declarations: [ItemComponentFormComponent],
  imports: [
    SharedModule,
    ItemComponentFormRoutingModule
  ]
})
export class ItemComponentFormModule { }
