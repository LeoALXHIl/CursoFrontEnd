import { Component, OnInit } from '@angular/core';
import { curriculo } from 'src/app/models/curriculo.model';
import { curriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class curriculosComponent implements OnInit{
  public curriculos: curriculo[] = [];

  constructor(private _curriculoservice: curriculosService) {}

  ngOnInit(): void {
    this.listarcurriculos();
  }

  listarcurriculos() {
    this._curriculoservice.getcurriculos().subscribe(
      (retornaCurriculo: curriculo[]) => {
        this.curriculos = retornaCurriculo;
      },
      (err) => {
        console.error('Erro ao buscar curriculos:', err);
      }
    );
  }
}
