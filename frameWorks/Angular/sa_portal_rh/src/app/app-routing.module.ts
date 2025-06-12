import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './view/inicio/inicio.component';
import { VagasComponent } from './view/vagas/vagas.component';
import { PainelVagasComponent } from './view/painel-vagas/painel-vagas.component';
import { curriculosComponent } from './view/curriculos/curriculos.component';
import { PainelCurriculosComponent } from './view/painel-curriculos/painel-curriculos.component';
import { CurriculosCadastroComponent } from './view/curriculos-cadastro/curriculos-cadastro.component';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "vagas", component: VagasComponent},
  {path: "vaga-listar", component: PainelVagasComponent},
  {path: "curriculos", component: curriculosComponent},
  {path: "curriculos-listar", component: PainelCurriculosComponent},
  {path: "curriculos-cadastro", component: CurriculosCadastroComponent},
  {path: "curriculos-editar/:cpf", component: CurriculosCadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
