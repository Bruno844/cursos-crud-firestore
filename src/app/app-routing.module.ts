import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './pages/cursos/cursos.component';
import { HeadersComponent } from './vistas/headers/headers.component';

const routes: Routes = [
  {
    path: "cursos" , component: CursosComponent
  },
  {
    path: "headers", component: HeadersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
