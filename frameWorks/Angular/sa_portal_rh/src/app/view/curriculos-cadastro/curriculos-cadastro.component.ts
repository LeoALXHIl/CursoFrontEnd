import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { curriculo } from 'src/app/models/curriculo.model';
import { curriculosService } from 'src/app/services/curriculos.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-curriculos-cadastro',
  templateUrl: './curriculos-cadastro.component.html',
  styleUrls: ['./curriculos-cadastro.component.scss']
})
export class CurriculosCadastroComponent implements OnInit {
  public curriculo: curriculo = { cpf: '', nome: '', email: '', foto: '', experiencia: '', funcao: '' };
  public curriculos: curriculo[] = [];
  public mostrarLista: boolean = false;

  private snackConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };

  constructor(
    private _curriculosService: curriculosService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCurriculos();
    this.route.paramMap.subscribe(params => {
      const cpf = params.get('cpf');
      if (cpf) {
        this.carregarCurriculo(cpf);
      }
    });
  }

  listarCurriculos() {
    this._curriculosService.getcurriculos().subscribe(
      (retornaCurriculos) => {
        this.curriculos = retornaCurriculos;
      }
    );
  }

  carregarCurriculo(cpf: string) {
    this._curriculosService.getcurriculos().subscribe(curriculos => {
      // Busca todos os currículos com o CPF informado
      const encontrados = curriculos.filter(c => c.cpf === cpf);
      if (encontrados.length > 0) {
        // Se houver mais de um, pega o primeiro (ou ajuste conforme sua regra)
        this.curriculo = { ...encontrados[0] };
      } else {
        this.snackBar.open('Currículo não encontrado.', 'Fechar', this.snackConfig);
        this.router.navigate(['/curriculos-cadastro']);
      }
    });
  }

  limparFormulario() {
    this.curriculo = { cpf: '', nome: '', email: '', foto: '', experiencia: '', funcao: '' };
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
    if (!this.curriculo.experiencia || this.curriculo.experiencia.trim().length < 1) return true;
    if (!this.curriculo.funcao || this.curriculo.funcao.trim().length < 1) return true;
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
    // Verifica se já existe um currículo com o mesmo CPF
    const existe = this.curriculos.some(c => c.cpf === this.curriculo.cpf);
    if (existe) {
      this.snackBar.open('Já existe um currículo com este CPF.', 'Fechar', this.snackConfig);
      return;
    }
    // Não envie o campo id no cadastro
    const { cpf, nome, email, foto, experiencia, funcao } = this.curriculo;
    const curriculoToSend = { cpf, nome, email, foto, experiencia, funcao };
    this._curriculosService.cadastrarcurriculo(curriculoToSend).subscribe(
      () => {
        this.limparFormulario();
        this.listarCurriculos();
        this.snackBar.open('Currículo cadastrado com sucesso!', 'Fechar', this.snackConfig);
      },
      (err) => {
        this.snackBar.open('Erro ao cadastrar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }

  Atualizar(cpf: any) {
    if (this.camposInvalidos()) {
      this.snackBar.open('Preencha o formulário corretamente', 'Fechar', this.snackConfig);
      return;
    }
    // Busca todos os currículos com o CPF informado
    const encontrados = this.curriculos.filter(c => c.cpf === cpf);
    // Use o id do primeiro encontrado, se existir
    const curriculoOriginal = encontrados.length > 0 ? encontrados[0] : null;
    const curriculoToSend = { ...this.curriculo };
    const identificador = (curriculoOriginal && (curriculoOriginal as any).id) ? (curriculoOriginal as any).id : cpf;
    this._curriculosService.atualizarcurriculo(identificador, curriculoToSend).subscribe(
      () => {
        this.limparFormulario();
        this.listarCurriculos();
        this.snackBar.open('Currículo atualizado com sucesso!', 'Fechar', this.snackConfig);
        this.router.navigate(['/curriculos']);
      },
      (err) => {
        this.snackBar.open('Erro ao atualizar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }

  excluir(cpf: any) {
    // Busca todos os currículos com o CPF informado
    const encontrados = this.curriculos.filter(c => c.cpf === cpf);
    const curriculoOriginal = encontrados.length > 0 ? encontrados[0] : null;
    const identificador = (curriculoOriginal && (curriculoOriginal as any).id) ? (curriculoOriginal as any).id : cpf;
    this._curriculosService.removercurriculo(identificador).subscribe(
      () => {
        this.limparFormulario();
        this.listarCurriculos();
        this.snackBar.open('Currículo deletado com sucesso!', 'Fechar', this.snackConfig);
        this.router.navigate(['/curriculos']);
      },
      (err) => {
        this.snackBar.open('Erro ao deletar currículo.', 'Fechar', this.snackConfig);
        console.error("Exception: ", err);
      }
    );
  }
}
