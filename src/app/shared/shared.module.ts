
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { LoadingComponent } from './components/loading/loading.component'

const MODULES = [CommonModule, RouterModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule]
const COMPONENTS = [LoadingComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
