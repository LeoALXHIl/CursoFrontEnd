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
  public curriculo: any = { cpf: '', nome: '', email: '', foto: '' };
  public curriculos: any[] = [];
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

  listarCurriculoUnico(curriculo: any) {
    // Preenche o formulário com o currículo selecionado
    this.curriculo = { ...curriculo };
  }

  camposInvalidos(): boolean {
    if (
      this.curriculo.cpf === undefined ||
      this.curriculo.cpf === null ||
      this.curriculo.cpf.trim().length === 0
    ) {
      return true;
    }
    if (!this.curriculo.nome || this.curriculo.nome.trim().length < 3) return true;
    if (!this.curriculo.email || !this.validarEmail(this.curriculo.email)) return true;
    if (!this.curriculo.foto || this.curriculo.foto.trim().length < 1) return true;
    return false;
  }

  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  cadastrar() {
    if (this.camposInvalidos()) {
      this.snackBar.open('Preencha o formulário corretamente', 'Fechar', this.snackConfig);
      return;
    }
    // Não envie o campo id no cadastro
    const { cpf, nome, email, foto } = this.curriculo;
    const curriculoToSend = { cpf, nome, email, foto };
    this._curriculosService.cadastrarcurriculo(curriculoToSend).subscribe(
      () => {
        this.curriculo = { cpf: '', nome: '', email: '', foto: '' };
        this.listarCurriculos();
        this.snackBar.open('Currículo cadastrado com sucesso!', 'Fechar', this.snackConfig);
      },
      (err) => {
        this.snackBar.open('Erro ao cadastrar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }

  Atualizar() {
    if (this.camposInvalidos()) {
      this.snackBar.open('Preencha o formulário corretamente', 'Fechar', this.snackConfig);
      return;
    }
    // Use o id do currículo selecionado se existir, senão use o cpf
    const identificador = this.curriculo.id ? this.curriculo.id : this.curriculo.cpf;
    this._curriculosService.atualizarcurriculo(identificador, this.curriculo).subscribe(
      () => {
        this.curriculo = { cpf: '', nome: '', email: '', foto: '' };
        this.listarCurriculos();
        this.snackBar.open('Currículo atualizado com sucesso!', 'Fechar', this.snackConfig);
      },
      (err) => {
        this.snackBar.open('Erro ao atualizar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }

  excluir() {
    // Use o id do currículo selecionado se existir, senão use o cpf
    const identificador = this.curriculo.id ? this.curriculo.id : this.curriculo.cpf;
    this._curriculosService.removercurriculo(identificador).subscribe(
      () => {
        this.curriculo = { cpf: '', nome: '', email: '', foto: '' };
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

