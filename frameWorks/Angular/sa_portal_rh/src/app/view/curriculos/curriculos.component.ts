import { Component, OnInit } from '@angular/core';
import { curriculo } from 'src/app/models/curriculo.model';
import { curriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent implements OnInit{
  public curriculos: curriculo[] = [];
  public curriculoSelecionado: curriculo | null = null;
  public erroCarregamento: boolean = false; // novo

  constructor(private _curriculoservice: curriculosService) {}

  ngOnInit(): void {
    this.listarcurriculos();
  }

  listarcurriculos() {
    this._curriculoservice.getcurriculos().subscribe(
      (retornaCurriculo: curriculo[]) => {
        console.log('Curriculos recebidos:', retornaCurriculo); // debug
        this.curriculos = retornaCurriculo;
        this.erroCarregamento = false;
      },
      (err) => {
        console.error('Erro ao buscar curriculos:', err);
        this.erroCarregamento = true;
        this.curriculos = [];
      }
    );
  }
}
