import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { curriculo } from 'src/app/models/curriculo.model';
import { curriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss']
})
export class PainelCurriculosComponent implements OnInit {
  public curriculo: curriculo = { id: 0, nome: '', email: '', foto: '' };
  public curriculos: curriculo[] = [];
  public mostrarLista: boolean = false;

  private snackConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };

  constructor(
    private _curriculosService: curriculosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculosService.getcurriculos().subscribe(
      (retornaCurriculos) => {
        this.curriculos = retornaCurriculos;
      }
    );
  }

  listarCurriculoUnico(curriculo: curriculo) {
    this.curriculo = { ...curriculo };
  }

  camposInvalidos(): boolean {
    if (!this.curriculo.id || this.curriculo.id === 0) return true;
    if (!this.curriculo.nome || this.curriculo.nome.trim().length < 3) return true;
    if (!this.curriculo.email || !this.validarEmail(this.curriculo.email)) return true;
    if (!this.curriculo.foto || this.curriculo.foto.trim().length < 1) return true;
    return false;
  }

  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showErrors(erros: string[]) {
    if (erros.length > 0) {
      this.snackBar.open(erros.join(' '), 'Fechar', this.snackConfig);
    }
  }

  cadastrar() {
    if (this.camposInvalidos()) {
      this.snackBar.open('Preencha o formulário corretamente', 'Fechar', this.snackConfig);
      return;
    }
    this._curriculosService.cadastrarcurriculo(this.curriculo).subscribe(
      () => {
        this.curriculo = { id: 0, nome: '', email: '', foto: '' };
        this.listarCurriculos();
        this.snackBar.open('Currículo cadastrado com sucesso!', 'Fechar', this.snackConfig);
      },
      (err) => {
        this.snackBar.open('Erro ao cadastrar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }

  Atualizar(id: any) {
    if (this.camposInvalidos()) {
      this.snackBar.open('Preencha o formulário corretamente', 'Fechar', this.snackConfig);
      return;
    }
    this._curriculosService.atualizarcurriculo(id, this.curriculo).subscribe(
      () => {
        this.curriculo = { id: 0, nome: '', email: '', foto: '' };
        this.listarCurriculos();
        this.snackBar.open('Currículo atualizado com sucesso!', 'Fechar', this.snackConfig);
      },
      (err) => {
        this.snackBar.open('Erro ao atualizar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }

  excluir(id: any) {
    this._curriculosService.removercurriculo(id).subscribe(
      () => {
        this.listarCurriculos();
        this.snackBar.open('Currículo deletado com sucesso!', 'Fechar', this.snackConfig);
      },
      (err) => {
        this.snackBar.open('Erro ao deletar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }
}

