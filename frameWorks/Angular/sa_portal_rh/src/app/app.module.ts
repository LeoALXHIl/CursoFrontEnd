import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './view/inicio/inicio.component';
import { VagasComponent } from './view/vagas/vagas.component';
import { HttpClientModule } from '@angular/common/http';
import { PainelVagasComponent } from './view/painel-vagas/painel-vagas.component';
import { FormsModule } from '@angular/forms';
import { CurriculosComponent } from './view/curriculos/curriculos.component';
import { PainelCurriculosComponent } from './view/painel-curriculos/painel-curriculos.component';
import { LoginComponent } from './view/login/login.component';
import { RegistroComponent } from './view/registro/registro.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { CurriculoComponent } from './view/curriculo/curriculo.component';
import { AdminVagasComponent } from './view/admin-vagas/admin-vagas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurriculosCadastroComponent } from './view/curriculos-cadastro/curriculos-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    VagasComponent,
    PainelVagasComponent,
    CurriculosComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
