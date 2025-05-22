import { Component, OnInit } from '@angular/core';
import { vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit{
  public vagas: vaga[] = [];

  constructor(private _vagaService:VagasService) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas() {
    this._vagaService.getVagas().subscribe(
      (retornaVaga) => {
        this.vagas = retornaVaga.map(
          (item) => {
            return new vaga(
              item.id,
              item.nome,
              item.foto,
              item.descricao,
              item.salario
            );
          }
        );
      }
    )
  }

}
