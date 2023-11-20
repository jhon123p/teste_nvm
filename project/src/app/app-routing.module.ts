import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UpdateItemPage } from './update-item/update-item.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'new-lembrete',
    loadChildren: () => import('./new-lembrete/new-lembrete.module').then( m => m.NewLembretePageModule)
  },
  {
    path: 'update-item',
    loadChildren: () => import('./update-item/update-item.module').then( m => m.UpdateItemPageModule)
  },
  { path: 'update-item/:id', component: UpdateItemPage } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
