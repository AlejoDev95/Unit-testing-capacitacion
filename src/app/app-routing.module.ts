import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'private',
    component: LayoutComponent,
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('./feature/movies/movies.module').then(m => m.MoviesModule),
      },
      {
        path: 'imc',
        loadChildren: () =>
          import('./feature/imc/imc.module').then(m => m.ImcModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
