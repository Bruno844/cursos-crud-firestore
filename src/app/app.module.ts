import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms'


import { AppComponent } from './app.component';

//component
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CursosComponent } from './pages/cursos/cursos.component';
import { HeadersComponent } from './vistas/headers/headers.component';
@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    HeadersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
