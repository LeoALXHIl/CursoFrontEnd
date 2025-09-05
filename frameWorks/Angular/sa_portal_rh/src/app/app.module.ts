import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './view/login/login.component';
import { RegistroComponent } from './view/registro/registro.component';
import { VagasComponent } from './view/vagas/vagas.component';
import { HttpClientModule } from '@angular/common/http';
import { PainelVagasComponent } from './view/painel-vagas/painel-vagas.component';
import { FormsModule } from '@angular/forms';
import { CurriculosComponent } from './view/curriculos/curriculos.component';
<<<<<<< HEAD
import { HomeComponent } from './view/home/home.component';
=======
import { PainelCurriculosComponent } from './view/painel-curriculos/painel-curriculos.component';
import { LoginComponent } from './view/login/login.component';
import { RegistroComponent } from './view/registro/registro.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { CurriculoComponent } from './view/curriculo/curriculo.component';
import { AdminVagasComponent } from './view/admin-vagas/admin-vagas.component';
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurriculosCadastroComponent } from './view/curriculos-cadastro/curriculos-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    VagasComponent,
    PainelVagasComponent,
    CurriculosComponent,
<<<<<<< HEAD
    CurriculosCadastroComponent
=======
    PainelCurriculosComponent,
    CurriculosCadastroComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    CurriculoComponent,
    AdminVagasComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  NgbModule,
  HttpClientModule,
  FormsModule,
  RouterModule,
  BrowserAnimationsModule,
  MatSnackBarModule
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
