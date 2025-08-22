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
  cpf = '';
  nome = '';
  email = '';
  experiencia = '';
  funcao = '';
  foto = '';
  enviado = false;
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private curriculosService: curriculosService
  ) {}

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
