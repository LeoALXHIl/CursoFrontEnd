import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { HomeComponent } from './view/home/home.component';
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
    CurriculosCadastroComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
