// Página de administração de vagas para administradores
import { Component, OnInit } from '@angular/core';
import { VagasAdminService, Vaga } from '../../services/vagas-admin.service';

@Component({
  selector: 'app-admin-vagas',
  templateUrl: './admin-vagas.component.html',
  styleUrls: ['./admin-vagas.component.scss']
})
export class AdminVagasComponent implements OnInit {
  // Lista de vagas
  vagas: Vaga[] = [];
  // Vaga em edição
  editVaga: Vaga | null = null;
  // Vaga do formulário
  novaVaga: Vaga = { id: '', nome: '', foto: '', descricao: '', salario: 0 };

  // Injeta serviço de vagas
  constructor(private vagasService: VagasAdminService) {}

  // Carrega vagas ao iniciar
  ngOnInit() {
    this.carregarVagas();
  }

  // Busca vagas do backend
  carregarVagas() {
    this.vagasService.getVagas().subscribe(vagas => this.vagas = vagas);
  }

  // Adiciona ou atualiza vaga
  salvarVaga() {
    if (this.novaVaga.id) {
      this.vagasService.updateVaga(this.novaVaga).subscribe(() => {
        this.novaVaga = { id: '', nome: '', foto: '', descricao: '', salario: 0 };
        this.carregarVagas();
      });
    } else {
      const vagaParaSalvar = { ...this.novaVaga, id: Date.now().toString() };
      this.vagasService.addVaga(vagaParaSalvar).subscribe(() => {
        this.novaVaga = { id: '', nome: '', foto: '', descricao: '', salario: 0 };
        this.carregarVagas();
      });
    }
  }

  // Preenche formulário para edição
  editarVaga(vaga: Vaga) {
    this.novaVaga = { ...vaga };
  }

  // Exclui vaga
  excluirVaga(id: string) {
    this.vagasService.deleteVaga(id).subscribe(() => this.carregarVagas());
  }
}
