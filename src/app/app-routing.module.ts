import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SharedModule } from './shared/shared.module';
import { AppPreloader } from './app-routing-loader'
import { MainComponent } from './core/components/main/main.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthenticationGuard } from '@core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/components/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./features/components/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'item-component',
        loadChildren: () => import('./features/components/item-component/item-component.module').then(m => m.ItemComponentModule),
      },
      {
        path: 'item-component/form/:itemComponentId?',
        loadChildren: () => import('./features/components/item-component-form/item-component-form.module').then(m => m.ItemComponentFormModule),
      },
      {
        path: 'item-component/form',
        loadChildren: () => import('./features/components/item-component-form/item-component-form.module').then(m => m.ItemComponentFormModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ],
  }
]

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloader }),
  ],
  exports: [RouterModule],
  providers: [AppPreloader],
})
export class AppRoutingModule {}
