import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { RegistroComponent } from './view/registro/registro.component';
import { VagasComponent } from './view/vagas/vagas.component';
import { PainelVagasComponent } from './view/painel-vagas/painel-vagas.component';
import { CurriculosComponent } from './view/curriculos/curriculos.component';
import { CurriculosCadastroComponent } from './view/curriculos-cadastro/curriculos-cadastro.component';

const routes: Routes = [
  {path: '', component: VagasComponent}, // Página pública de vagas
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: "vagas", component: VagasComponent},
  {path: "vaga-listar", component: PainelVagasComponent},
  {path: "curriculos", component: CurriculosComponent},
  {path: "curriculos-cadastro", component: CurriculosCadastroComponent},
  {path: "curriculos-editar/:cpf", component: CurriculosCadastroComponent},
];


