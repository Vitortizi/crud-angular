import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { ClientDetailsComponent } from './pages/client-details/client-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: ListComponent,
    loadChildren: () => import('./pages/users.module').then(m => m.UsersModule)
  },
  {
    path: 'register',
    component: ClientDetailsComponent,
    loadChildren: () => import('./pages/users.module').then(m => m.UsersModule)
  },
  {
    path: 'update',
    component: ClientDetailsComponent,
    loadChildren: () => import('./pages/users.module').then(m => m.UsersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
