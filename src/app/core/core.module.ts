import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'
import { CoreRoutingModule } from './core-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MainComponent } from './components/main/main.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { LoginComponent } from './components/login/login.component'

const COMPONENTS = [MainComponent, NotFoundComponent, LoginComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreRoutingModule,
  ],
})
export class CoreModule {}
