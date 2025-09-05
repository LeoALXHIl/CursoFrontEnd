// Página de envio de currículo para usuários comuns
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { curriculosService } from '../../services/curriculos.service';
import { curriculo } from '../../models/curriculo.model';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.scss']
})
export class CurriculoComponent {
  // Campos do formulário
  cpf = '';
  nome = '';
  email = '';
  experiencia = '';
  funcao = '';
  foto = '';
  enviado = false;
  erro = '';

  // Injeta serviços necessários
  constructor(
    private authService: AuthService,
    private router: Router,
    private curriculosService: curriculosService
  ) {}

  // Envia currículo para o backend
  enviar() {
    const novoCurriculo: curriculo = {
      cpf: this.cpf,
      nome: this.nome,
      email: this.email,
      experiencia: this.experiencia,
      funcao: this.funcao,
      foto: this.foto
    };
    this.curriculosService.cadastrarcurriculo(novoCurriculo).subscribe({
      next: () => {
        this.enviado = true;
        this.erro = '';
      },
      error: () => {
        this.erro = 'Erro ao enviar currículo.';
      }
    });
  }
}
