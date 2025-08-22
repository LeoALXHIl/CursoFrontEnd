import { Component, OnInit } from '@angular/core';
import { VagasAdminService, Vaga } from '../../services/vagas-admin.service';

@Component({
  selector: 'app-admin-vagas',
  templateUrl: './admin-vagas.component.html',
  styleUrls: ['./admin-vagas.component.scss']
})
export class AdminVagasComponent implements OnInit {
  vagas: Vaga[] = [];
  editVaga: Vaga | null = null;
  novaVaga: Vaga = { id: '', nome: '', foto: '', descricao: '', salario: 0 };

  constructor(private vagasService: VagasAdminService) {}

  ngOnInit() {
    this.carregarVagas();
  }

  carregarVagas() {
    this.vagasService.getVagas().subscribe(vagas => this.vagas = vagas);
  }

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

  editarVaga(vaga: Vaga) {
    this.novaVaga = { ...vaga };
  }

  excluirVaga(id: string) {
    this.vagasService.deleteVaga(id).subscribe(() => this.carregarVagas());
  }
}
